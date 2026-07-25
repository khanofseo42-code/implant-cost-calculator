import { z } from "zod";

export const locationSchema = z.object({
  countryCode: z.string().min(1, "Select a country"),
  stateCode: z.string().min(1, "Select a state or region"),
  city: z.string().min(1, "Select a city"),
});

export const patientSchema = z.object({
  age: z
    .number({ message: "Enter your age" })
    .int()
    .min(18, "Must be 18 or older")
    .max(100, "Enter a valid age"),
  gender: z.enum(["female", "male", "prefer-not-to-say"]).optional(),
  smoking: z.boolean(),
  diabetes: z.enum(["none", "controlled", "uncontrolled"]),
  boneCondition: z.enum(["healthy", "mild-loss", "moderate-loss", "severe-loss"]),
  missingTeethUpper: z.number().int().min(0).max(16),
  missingTeethLower: z.number().int().min(0).max(16),
}).refine((data) => data.missingTeethUpper + data.missingTeethLower > 0, {
  message: "Select at least one missing tooth",
  path: ["missingTeethUpper"],
});

export const treatmentSchema = z.object({
  treatmentId: z.enum([
    "single-implant",
    "multiple-implants",
    "implant-bridge",
    "implant-supported-denture",
    "all-on-4",
    "all-on-6",
    "all-on-8",
    "full-mouth-restoration",
  ], { message: "Select a treatment type" }),
});

export const implantDetailsSchema = z.object({
  brandId: z.string().min(1, "Select an implant brand"),
});

export const extraProceduresSchema = z.object({
  procedureIds: z.array(
    z.enum([
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
    ])
  ),
});

export const insuranceSchema = z
  .object({
    hasInsurance: z.boolean(),
    providerId: z.string().optional(),
    coveragePct: z.number().min(0).max(100).optional(),
    annualMaxUSD: z.number().min(0).optional(),
    remainingBenefitUSD: z.number().min(0).optional(),
    deductibleUSD: z.number().min(0).optional(),
  })
  .refine((data) => !data.hasInsurance || data.coveragePct !== undefined, {
    message: "Enter your coverage percentage",
    path: ["coveragePct"],
  });

export const financeSchema = z
  .object({
    paymentMethod: z.enum(["cash", "monthly"]),
    financeRateId: z.string().optional(),
    months: z.number().int().positive().optional(),
    downPaymentUSD: z.number().min(0).optional(),
  })
  .refine((data) => data.paymentMethod !== "monthly" || Boolean(data.financeRateId), {
    message: "Select a financing plan",
    path: ["financeRateId"],
  });

export const calculatorInputSchema = z.object({
  location: locationSchema,
  patient: patientSchema,
  treatment: treatmentSchema,
  implant: implantDetailsSchema,
  extras: extraProceduresSchema,
  insurance: insuranceSchema,
  finance: financeSchema,
});

export const leadFormSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  country: z.string().min(1, "Select your country"),
  consent: z.literal(true, {
    message: "You must consent to be contacted to continue",
  }),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
