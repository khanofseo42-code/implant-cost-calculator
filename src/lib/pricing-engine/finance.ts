import type { FinanceInput, FinanceRateConfig, FinanceResult } from "./types";

/**
 * Standard amortizing-loan monthly payment formula. When APR is 0 (common
 * promotional financing for elective dental work), falls back to a straight
 * division to avoid a divide-by-zero in the compound-interest formula.
 */
export function calculateMonthlyPayment(
  principal: number,
  aprPct: number,
  months: number
): number {
  if (months <= 0) return principal;
  const monthlyRate = aprPct / 100 / 12;
  if (monthlyRate === 0) return principal / months;

  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function calculateFinance(
  outOfPocket: number,
  input: FinanceInput,
  financeRates: FinanceRateConfig[]
): FinanceResult {
  if (input.paymentMethod === "cash") {
    return {
      method: "cash",
      totalFinanced: 0,
      downPaymentUSD: outOfPocket,
      months: 0,
      aprPct: 0,
      monthlyPaymentUSD: 0,
      totalInterestUSD: 0,
      totalRepaymentUSD: outOfPocket,
    };
  }

  const rate = financeRates.find((r) => r.id === input.financeRateId) ?? financeRates[0];
  const months = Math.min(
    Math.max(input.months ?? rate.minMonths, rate.minMonths),
    rate.maxMonths
  );
  const downPayment = Math.min(input.downPaymentUSD ?? 0, outOfPocket);
  const financed = Math.max(0, outOfPocket - downPayment);

  const monthlyPayment = calculateMonthlyPayment(financed, rate.aprPct, months);
  const totalRepayment = monthlyPayment * months + downPayment;
  const totalInterest = Math.max(0, totalRepayment - outOfPocket);

  return {
    method: "monthly",
    totalFinanced: financed,
    downPaymentUSD: downPayment,
    months,
    aprPct: rate.aprPct,
    monthlyPaymentUSD: monthlyPayment,
    totalInterestUSD: totalInterest,
    totalRepaymentUSD: totalRepayment,
  };
}
