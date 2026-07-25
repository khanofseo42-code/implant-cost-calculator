// Domain types for the pricing engine. Config JSON under src/config/pricing/*
// is validated against these shapes (see defaults.ts) so a bad admin edit
// fails loudly instead of silently corrupting an estimate.

export type TreatmentId =
  | "single-implant"
  | "multiple-implants"
  | "implant-bridge"
  | "implant-supported-denture"
  | "all-on-4"
  | "all-on-6"
  | "all-on-8"
  | "full-mouth-restoration";

export type BrandTier = "economy" | "standard" | "premium";
export type ImplantMaterial = "titanium" | "zirconia";

export type ProcedureId =
  | "bone-graft"
  | "sinus-lift"
  | "extraction"
  | "ct-scan"
  | "sedation"
  | "temporary-crown"
  | "permanent-crown"
  | "digital-impressions"
  | "prf"
  | "socket-preservation";

export interface CountryConfig {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  costMultiplier: number;
  taxRate: number;
  taxLabel: string;
  states: StateConfig[];
}

export interface StateConfig {
  code: string;
  name: string;
  costMultiplier: number;
}

export interface CityAdjustment {
  countryCode: string;
  stateCode: string;
  city: string;
  adjustmentPct: number;
}

export interface BrandConfig {
  id: string;
  name: string;
  tier: BrandTier;
  material: ImplantMaterial;
  costPerImplantUSD: number;
  abutmentCostUSD: number;
  crownCostUSD: number;
  description: string;
}

export interface TreatmentConfig {
  id: TreatmentId;
  name: string;
  category: "single-site" | "multi-site" | "full-arch";
  fixedImplantCount: number | null;
  baseCostUSD: number;
  appointments: number;
  durationWeeks: number;
  successRatePct: number;
  variancePct: number;
  perImplantBulkDiscountPct: number;
  description: string;
}

export interface ProcedureConfig {
  id: ProcedureId;
  name: string;
  unit: "flat" | "per-arch" | "per-implant";
  baseCostUSD: number;
  variancePct: number;
  comboDiscounts?: { withProcedureId: ProcedureId; discountPct: number }[];
}

export interface InsuranceProviderConfig {
  id: string;
  name: string;
  typicalCoveragePct: number;
  typicalAnnualMaxUSD: number;
}

export interface FinanceRateConfig {
  id: string;
  label: string;
  aprPct: number;
  minMonths: number;
  maxMonths: number;
}

export interface CampaignConfig {
  id: string;
  name: string;
  discountPct: number;
  appliesToTreatmentIds: TreatmentId[] | "all";
  active: boolean;
  startDate: string;
  endDate: string;
}

export interface PricingConfig {
  countries: CountryConfig[];
  cities: CityAdjustment[];
  brands: BrandConfig[];
  treatments: TreatmentConfig[];
  procedures: ProcedureConfig[];
  insuranceProviders: InsuranceProviderConfig[];
  financeRates: FinanceRateConfig[];
  campaigns: CampaignConfig[];
  meta: {
    version: string;
    updatedAt: string;
    globalVariancePct: number;
    riskSurchargePct: {
      smoking: number;
      diabetesUncontrolled: number;
      poorBoneCondition: number;
    };
  };
}

// ---- Calculator input (collected across the 7 steps) ----

export interface LocationInput {
  countryCode: string;
  stateCode: string;
  city: string;
}

export type BoneCondition = "healthy" | "mild-loss" | "moderate-loss" | "severe-loss";
export type DiabetesStatus = "none" | "controlled" | "uncontrolled";

export interface PatientInput {
  age: number;
  gender?: "female" | "male" | "prefer-not-to-say";
  smoking: boolean;
  diabetes: DiabetesStatus;
  boneCondition: BoneCondition;
  missingTeethUpper: number;
  missingTeethLower: number;
}

export interface TreatmentInput {
  treatmentId: TreatmentId;
}

export interface ImplantDetailsInput {
  brandId: string;
}

export interface ExtraProceduresInput {
  procedureIds: ProcedureId[];
}

export interface InsuranceInput {
  hasInsurance: boolean;
  providerId?: string;
  coveragePct?: number;
  annualMaxUSD?: number;
  remainingBenefitUSD?: number;
  deductibleUSD?: number;
}

export type PaymentMethod = "cash" | "monthly";

export interface FinanceInput {
  paymentMethod: PaymentMethod;
  financeRateId?: string;
  months?: number;
  downPaymentUSD?: number;
}

export interface CalculatorInput {
  location: LocationInput;
  patient: PatientInput;
  treatment: TreatmentInput;
  implant: ImplantDetailsInput;
  extras: ExtraProceduresInput;
  insurance: InsuranceInput;
  finance: FinanceInput;
}

// ---- Estimate output ----

export interface BreakdownLine {
  id: string;
  label: string;
  category:
    | "implants"
    | "crowns"
    | "abutments"
    | "lab-fees"
    | "surgery"
    | "bone-graft"
    | "sedation"
    | "ct-scan"
    | "other-procedures"
    | "discount"
    | "tax";
  amount: number;
  min: number;
  max: number;
}

export interface FinanceResult {
  method: PaymentMethod;
  totalFinanced: number;
  downPaymentUSD: number;
  months: number;
  aprPct: number;
  monthlyPaymentUSD: number;
  totalInterestUSD: number;
  totalRepaymentUSD: number;
}

export interface InsuranceResult {
  applied: boolean;
  coveragePct: number;
  grossDeductionUSD: number;
  deductibleUSD: number;
  netDeductionUSD: number;
  remainingBenefitAfterUSD: number;
}

export interface EstimateResult {
  currency: string;
  currencySymbol: string;
  subtotal: number;
  taxAmount: number;
  totalBeforeInsurance: number;
  min: number;
  average: number;
  max: number;
  outOfPocket: number;
  breakdown: BreakdownLine[];
  insurance: InsuranceResult;
  finance: FinanceResult;
  timeline: {
    appointments: number;
    durationWeeks: number;
    successRatePct: number;
  };
  maintenance: {
    annualCareCostUSD: number;
    tenYearOwnershipCostUSD: number;
  };
  explanations: string[];
}
