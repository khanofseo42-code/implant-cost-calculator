import { z } from "zod";
import countriesJson from "@/config/pricing/countries.json";
import citiesJson from "@/config/pricing/cities.json";
import brandsJson from "@/config/pricing/brands.json";
import treatmentsJson from "@/config/pricing/treatments.json";
import proceduresJson from "@/config/pricing/procedures.json";
import insuranceJson from "@/config/pricing/insurance.json";
import financeJson from "@/config/pricing/finance.json";
import campaignsJson from "@/config/pricing/campaigns.json";
import type { PricingConfig } from "./types";

const stateSchema = z.object({
  code: z.string(),
  name: z.string(),
  costMultiplier: z.number().positive(),
});

const countrySchema = z.object({
  code: z.string(),
  name: z.string(),
  currency: z.string(),
  currencySymbol: z.string(),
  costMultiplier: z.number().positive(),
  taxRate: z.number().min(0).max(1),
  taxLabel: z.string(),
  states: z.array(stateSchema).min(1),
});

const citySchema = z.object({
  countryCode: z.string(),
  stateCode: z.string(),
  city: z.string(),
  adjustmentPct: z.number(),
});

const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.enum(["economy", "standard", "premium"]),
  material: z.enum(["titanium", "zirconia"]),
  costPerImplantUSD: z.number().positive(),
  abutmentCostUSD: z.number().nonnegative(),
  crownCostUSD: z.number().nonnegative(),
  description: z.string(),
});

const treatmentSchema = z.object({
  id: z.enum([
    "single-implant",
    "multiple-implants",
    "implant-bridge",
    "implant-supported-denture",
    "all-on-4",
    "all-on-6",
    "all-on-8",
    "full-mouth-restoration",
  ]),
  name: z.string(),
  category: z.enum(["single-site", "multi-site", "full-arch"]),
  fixedImplantCount: z.number().nullable(),
  baseCostUSD: z.number().nonnegative(),
  appointments: z.number().positive(),
  durationWeeks: z.number().positive(),
  successRatePct: z.number().min(0).max(100),
  variancePct: z.number().min(0).max(100),
  perImplantBulkDiscountPct: z.number().min(0).max(100),
  description: z.string(),
});

const procedureSchema = z.object({
  id: z.enum([
    "bone-graft",
    "sinus-lift",
    "extraction",
    "ct-scan",
    "sedation",
    "temporary-crown",
    "permanent-crown",
    "digital-impressions",
    "prf",
    "socket-preservation",
  ]),
  name: z.string(),
  unit: z.enum(["flat", "per-arch", "per-implant"]),
  baseCostUSD: z.number().nonnegative(),
  variancePct: z.number().min(0).max(100),
  comboDiscounts: z
    .array(z.object({ withProcedureId: z.string(), discountPct: z.number() }))
    .optional(),
});

const insuranceProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  typicalCoveragePct: z.number().min(0).max(100),
  typicalAnnualMaxUSD: z.number().nonnegative(),
});

const financeRateSchema = z.object({
  id: z.string(),
  label: z.string(),
  aprPct: z.number().min(0),
  minMonths: z.number().positive(),
  maxMonths: z.number().positive(),
});

const treatmentIdEnum = z.enum([
  "single-implant",
  "multiple-implants",
  "implant-bridge",
  "implant-supported-denture",
  "all-on-4",
  "all-on-6",
  "all-on-8",
  "full-mouth-restoration",
]);

const campaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  discountPct: z.number().min(0).max(100),
  appliesToTreatmentIds: z.union([z.array(treatmentIdEnum), z.literal("all")]),
  active: z.boolean(),
  startDate: z.string(),
  endDate: z.string(),
});

const pricingConfigSchema = z.object({
  countries: z.array(countrySchema).min(1),
  cities: z.array(citySchema),
  brands: z.array(brandSchema).min(1),
  treatments: z.array(treatmentSchema).min(1),
  procedures: z.array(procedureSchema).min(1),
  insuranceProviders: z.array(insuranceProviderSchema).min(1),
  financeRates: z.array(financeRateSchema).min(1),
  campaigns: z.array(campaignSchema),
  meta: z.object({
    version: z.string(),
    updatedAt: z.string(),
    globalVariancePct: z.number(),
    riskSurchargePct: z.object({
      smoking: z.number(),
      diabetesUncontrolled: z.number(),
      poorBoneCondition: z.number(),
    }),
  }),
});

const rawConfig = {
  countries: countriesJson,
  cities: citiesJson,
  brands: brandsJson,
  treatments: treatmentsJson,
  procedures: proceduresJson,
  insuranceProviders: insuranceJson,
  financeRates: financeJson,
  campaigns: campaignsJson,
  meta: {
    version: "1.0.0",
    updatedAt: new Date().toISOString(),
    globalVariancePct: 12,
    riskSurchargePct: {
      smoking: 6,
      diabetesUncontrolled: 8,
      poorBoneCondition: 10,
    },
  },
};

let cachedConfig: PricingConfig | null = null;

export function loadPricingConfig(): PricingConfig {
  if (cachedConfig) return cachedConfig;
  const parsed = pricingConfigSchema.parse(rawConfig);
  cachedConfig = parsed as PricingConfig;
  return cachedConfig;
}

export function invalidatePricingConfigCache() {
  cachedConfig = null;
}

export { pricingConfigSchema };

/** Per-section array schemas, keyed by config filename (without extension). Used by the admin API to validate a single edited section before writing it back to disk. */
export const sectionSchemas = {
  countries: z.array(countrySchema).min(1),
  cities: z.array(citySchema),
  brands: z.array(brandSchema).min(1),
  treatments: z.array(treatmentSchema).min(1),
  procedures: z.array(procedureSchema).min(1),
  insurance: z.array(insuranceProviderSchema).min(1),
  finance: z.array(financeRateSchema).min(1),
  campaigns: z.array(campaignSchema),
} as const;

export type PricingSectionName = keyof typeof sectionSchemas;
