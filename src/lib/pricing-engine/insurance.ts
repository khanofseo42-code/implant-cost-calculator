import type { InsuranceInput, InsuranceResult } from "./types";

/**
 * Applies dental insurance coverage to a treatment total.
 * Coverage is capped by whichever is smallest: the coverage percentage of the
 * bill, the plan's remaining benefit for the year, or the annual maximum.
 */
export function applyInsurance(
  totalBeforeInsurance: number,
  input: InsuranceInput
): InsuranceResult {
  if (!input.hasInsurance) {
    return {
      applied: false,
      coveragePct: 0,
      grossDeductionUSD: 0,
      deductibleUSD: 0,
      netDeductionUSD: 0,
      remainingBenefitAfterUSD: 0,
    };
  }

  const coveragePct = input.coveragePct ?? 0;
  const deductible = input.deductibleUSD ?? 0;
  const annualMax = input.annualMaxUSD ?? Infinity;
  const remainingBenefit = input.remainingBenefitUSD ?? annualMax;

  const billableAfterDeductible = Math.max(0, totalBeforeInsurance - deductible);
  const coverageShare = billableAfterDeductible * (coveragePct / 100);

  const grossDeduction = Math.min(coverageShare, remainingBenefit, annualMax);
  const netDeduction = Math.max(0, grossDeduction);

  return {
    applied: true,
    coveragePct,
    grossDeductionUSD: grossDeduction,
    deductibleUSD: deductible,
    netDeductionUSD: netDeduction,
    remainingBenefitAfterUSD: Math.max(0, remainingBenefit - netDeduction),
  };
}
