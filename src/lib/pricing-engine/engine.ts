import type {
  BreakdownLine,
  CalculatorInput,
  EstimateResult,
  PricingConfig,
  ProcedureConfig,
  TreatmentConfig,
} from "./types";
import { applyInsurance } from "./insurance";
import { calculateFinance } from "./finance";

function resolveImplantCount(treatment: TreatmentConfig, input: CalculatorInput): number {
  if (treatment.fixedImplantCount !== null) return treatment.fixedImplantCount;
  const fromMissingTeeth =
    input.patient.missingTeethUpper + input.patient.missingTeethLower;
  return Math.max(2, fromMissingTeeth || 2);
}

function resolveLocationMultiplier(config: PricingConfig, input: CalculatorInput) {
  const country = config.countries.find((c) => c.code === input.location.countryCode);
  if (!country) throw new Error(`Unknown country: ${input.location.countryCode}`);
  const state = country.states.find((s) => s.code === input.location.stateCode) ?? country.states[0];
  const cityAdj = config.cities.find(
    (c) =>
      c.countryCode === country.code &&
      c.stateCode === state.code &&
      c.city === input.location.city
  );
  const cityAdjustmentPct = cityAdj?.adjustmentPct ?? 0;
  const multiplier = country.costMultiplier * state.costMultiplier * (1 + cityAdjustmentPct / 100);
  return { country, state, cityAdjustmentPct, multiplier };
}

function arachesForProcedures(treatment: TreatmentConfig, input: CalculatorInput): number {
  if (treatment.id === "full-mouth-restoration") return 2;
  if (treatment.category === "full-arch") return 1;
  const upper = input.patient.missingTeethUpper > 0 ? 1 : 0;
  const lower = input.patient.missingTeethLower > 0 ? 1 : 0;
  return Math.max(1, upper + lower);
}

function computeRiskSurchargePct(config: PricingConfig, input: CalculatorInput): {
  pct: number;
  reasons: string[];
} {
  const { smoking, diabetesUncontrolled, poorBoneCondition } = config.meta.riskSurchargePct;
  let pct = 0;
  const reasons: string[] = [];

  if (input.patient.smoking) {
    pct += smoking;
    reasons.push(
      `Smoking adds a ${smoking}% complexity surcharge because nicotine measurably slows osseointegration and healing.`
    );
  }
  if (input.patient.diabetes === "uncontrolled") {
    pct += diabetesUncontrolled;
    reasons.push(
      `Uncontrolled diabetes adds a ${diabetesUncontrolled}% surcharge due to elevated infection risk and the need for closer monitoring.`
    );
  }
  if (
    input.patient.boneCondition === "severe-loss" ||
    input.patient.boneCondition === "moderate-loss"
  ) {
    pct += poorBoneCondition;
    reasons.push(
      `${
        input.patient.boneCondition === "severe-loss" ? "Severe" : "Moderate"
      } bone loss adds a ${poorBoneCondition}% surcharge reflecting the added surgical planning this typically requires.`
    );
  }
  return { pct, reasons };
}

export function calculateEstimate(
  input: CalculatorInput,
  config: PricingConfig
): EstimateResult {
  const treatment = config.treatments.find((t) => t.id === input.treatment.treatmentId);
  if (!treatment) throw new Error(`Unknown treatment: ${input.treatment.treatmentId}`);

  const brand = config.brands.find((b) => b.id === input.implant.brandId);
  if (!brand) throw new Error(`Unknown brand: ${input.implant.brandId}`);

  const implantCount = resolveImplantCount(treatment, input);
  const { country, state, cityAdjustmentPct, multiplier: locationMultiplier } =
    resolveLocationMultiplier(config, input);

  const explanations: string[] = [];
  const lines: (BreakdownLine & { variancePct: number })[] = [];

  // --- Core surgical / prosthetic base cost ---
  let surgeryBase: number;
  if (treatment.fixedImplantCount === null) {
    const effectiveUnits =
      1 + (implantCount - 1) * (1 - treatment.perImplantBulkDiscountPct / 100);
    surgeryBase = treatment.baseCostUSD * effectiveUnits;
    explanations.push(
      `${treatment.name} for ${implantCount} implants applies a ${treatment.perImplantBulkDiscountPct}% bulk-placement discount on implants after the first.`
    );
  } else {
    surgeryBase = treatment.baseCostUSD;
  }

  const risk = computeRiskSurchargePct(config, input);
  const surgeryWithRisk = surgeryBase * (1 + risk.pct / 100);
  explanations.push(...risk.reasons);

  lines.push({
    id: "surgery",
    label: `${treatment.name} — Surgical & Clinical Fee`,
    category: "surgery",
    amount: surgeryWithRisk * locationMultiplier,
    min: 0,
    max: 0,
    variancePct: treatment.variancePct,
  });

  // --- Implant hardware, abutments, crowns (brand-driven) ---
  const implantsAmount = brand.costPerImplantUSD * implantCount * locationMultiplier;
  lines.push({
    id: "implants",
    label: `${brand.name} Implant Fixtures (×${implantCount})`,
    category: "implants",
    amount: implantsAmount,
    min: 0,
    max: 0,
    variancePct: 10,
  });

  const abutmentsAmount = brand.abutmentCostUSD * implantCount * locationMultiplier;
  lines.push({
    id: "abutments",
    label: `Abutments (×${implantCount})`,
    category: "abutments",
    amount: abutmentsAmount,
    min: 0,
    max: 0,
    variancePct: 10,
  });

  if (treatment.category !== "full-arch") {
    const crownsAmount = brand.crownCostUSD * implantCount * locationMultiplier;
    lines.push({
      id: "crowns",
      label: `Crowns (×${implantCount})`,
      category: "crowns",
      amount: crownsAmount,
      min: 0,
      max: 0,
      variancePct: 12,
    });
  }

  explanations.push(
    `${brand.name} was selected, pricing implant hardware, abutments${
      treatment.category !== "full-arch" ? ", and crowns" : ""
    } accordingly.`
  );

  const hardwareSubtotal = lines
    .filter((l) => ["implants", "abutments", "crowns"].includes(l.category))
    .reduce((sum, l) => sum + l.amount, 0);
  const labFeesAmount = hardwareSubtotal * 0.08;
  lines.push({
    id: "lab-fees",
    label: "Dental Lab Fees",
    category: "lab-fees",
    amount: labFeesAmount,
    min: 0,
    max: 0,
    variancePct: 15,
  });

  // --- Extra procedures ---
  const arches = arachesForProcedures(treatment, input);
  const selectedProcedures = input.extras.procedureIds
    .map((id) => config.procedures.find((p) => p.id === id))
    .filter((p): p is ProcedureConfig => Boolean(p));

  for (const proc of selectedProcedures) {
    let quantity = 1;
    if (proc.unit === "per-arch") quantity = arches;
    if (proc.unit === "per-implant") quantity = implantCount;

    let amount = proc.baseCostUSD * quantity;

    for (const combo of proc.comboDiscounts ?? []) {
      if (input.extras.procedureIds.includes(combo.withProcedureId)) {
        amount *= 1 - combo.discountPct / 100;
      }
    }

    amount *= locationMultiplier;

    const category =
      proc.id === "bone-graft"
        ? "bone-graft"
        : proc.id === "sedation"
        ? "sedation"
        : proc.id === "ct-scan"
        ? "ct-scan"
        : "other-procedures";

    lines.push({
      id: proc.id,
      label: proc.name,
      category,
      amount,
      min: 0,
      max: 0,
      variancePct: proc.variancePct,
    });
  }

  if (selectedProcedures.length > 0) {
    explanations.push(
      `${selectedProcedures.length} additional procedure(s) selected: ${selectedProcedures
        .map((p) => p.name)
        .join(", ")}.`
    );
  }

  explanations.push(
    `Location adjustment for ${input.location.city}, ${state.name}, ${country.name}: base country factor ${country.costMultiplier.toFixed(
      2
    )}×, regional factor ${state.costMultiplier.toFixed(2)}×, city adjustment ${
      cityAdjustmentPct >= 0 ? "+" : ""
    }${cityAdjustmentPct}%.`
  );

  // --- Active discount campaign ---
  const now = new Date();
  const campaign = config.campaigns
    .filter((c) => c.active && new Date(c.startDate) <= now && now <= new Date(c.endDate))
    .filter((c) => c.appliesToTreatmentIds === "all" || c.appliesToTreatmentIds.includes(treatment.id))
    .sort((a, b) => b.discountPct - a.discountPct)[0];

  if (campaign) {
    const preDiscountSubtotal = lines.reduce((sum, l) => sum + l.amount, 0);
    const discountAmount = preDiscountSubtotal * (campaign.discountPct / 100);
    lines.push({
      id: "campaign-discount",
      label: campaign.name,
      category: "discount",
      amount: -discountAmount,
      min: 0,
      max: 0,
      variancePct: 0,
    });
    explanations.push(
      `${campaign.name} applies a ${campaign.discountPct}% discount, saving $${discountAmount.toFixed(0)}.`
    );
  }

  // --- Variance bands per line ---
  for (const line of lines) {
    const variance = line.variancePct / 100;
    line.min = line.amount * (1 - variance);
    line.max = line.amount * (1 + variance);
  }

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const subtotalMin = lines.reduce((sum, l) => sum + l.min, 0);
  const subtotalMax = lines.reduce((sum, l) => sum + l.max, 0);

  const taxAmount = subtotal * country.taxRate;
  const taxMin = subtotalMin * country.taxRate;
  const taxMax = subtotalMax * country.taxRate;

  if (country.taxRate > 0) {
    lines.push({
      id: "tax",
      label: country.taxLabel,
      category: "tax",
      amount: taxAmount,
      min: taxMin,
      max: taxMax,
      variancePct: 0,
    });
    explanations.push(`${country.taxLabel} of ${(country.taxRate * 100).toFixed(0)}% applied: $${taxAmount.toFixed(0)}.`);
  }

  const totalBeforeInsurance = subtotal + taxAmount;
  const min = subtotalMin + taxMin;
  const max = subtotalMax + taxMax;

  // --- Insurance ---
  const insuranceResult = applyInsurance(totalBeforeInsurance, input.insurance);
  const outOfPocket = totalBeforeInsurance - insuranceResult.netDeductionUSD;

  if (insuranceResult.applied) {
    explanations.push(
      `Insurance covers ${insuranceResult.coveragePct}% of your bill (after any deductible), reducing your cost by $${insuranceResult.netDeductionUSD.toFixed(
        0
      )} within your available benefit.`
    );
  }

  // --- Finance ---
  const financeResult = calculateFinance(outOfPocket, input.finance, config.financeRates);
  if (financeResult.method === "monthly") {
    explanations.push(
      `Financing $${financeResult.totalFinanced.toFixed(0)} over ${financeResult.months} months at ${financeResult.aprPct}% APR results in an estimated monthly payment of $${financeResult.monthlyPaymentUSD.toFixed(
        2
      )}.`
    );
  }

  // --- Maintenance / long-term ownership ---
  const annualCareCostUSD = Math.round(120 * implantCount + 80);
  const crownsLine = lines.find((l) => l.id === "crowns");
  const tenYearOwnershipCostUSD = Math.round(
    totalBeforeInsurance + annualCareCostUSD * 10 + (crownsLine ? crownsLine.amount * 0.4 : 0)
  );

  return {
    currency: country.currency,
    currencySymbol: country.currencySymbol,
    subtotal,
    taxAmount,
    totalBeforeInsurance,
    min,
    average: totalBeforeInsurance,
    max,
    outOfPocket,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    breakdown: lines.map(({ variancePct, ...line }) => line),
    insurance: insuranceResult,
    finance: financeResult,
    timeline: {
      appointments: treatment.appointments,
      durationWeeks: treatment.durationWeeks,
      successRatePct: treatment.successRatePct,
    },
    maintenance: {
      annualCareCostUSD,
      tenYearOwnershipCostUSD,
    },
    explanations,
  };
}
