import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCompactCurrency } from "@/lib/utils/currency";
import type { EstimateResult } from "@/lib/pricing-engine/types";

export function FinanceCard({ estimate }: { estimate: EstimateResult }) {
  const { finance, insurance, outOfPocket, currencySymbol } = estimate;

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5 text-brand-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">Payment Summary</h3>
      </div>

      <dl className="mt-5 divide-y divide-border-subtle text-sm">
        <div className="flex justify-between py-2.5">
          <dt className="text-foreground-muted">Total treatment cost</dt>
          <dd className="font-medium text-foreground">
            {formatCompactCurrency(estimate.totalBeforeInsurance, currencySymbol)}
          </dd>
        </div>
        {insurance.applied && (
          <div className="flex justify-between py-2.5">
            <dt className="text-foreground-muted">Insurance deduction</dt>
            <dd className="font-medium text-accent-700">
              −{formatCompactCurrency(insurance.netDeductionUSD, currencySymbol)}
            </dd>
          </div>
        )}
        <div className="flex justify-between py-2.5">
          <dt className="font-medium text-foreground">Out-of-pocket cost</dt>
          <dd className="font-semibold text-foreground">
            {formatCompactCurrency(outOfPocket, currencySymbol)}
          </dd>
        </div>

        {finance.method === "monthly" ? (
          <>
            <div className="flex justify-between py-2.5">
              <dt className="text-foreground-muted">Down payment</dt>
              <dd className="font-medium text-foreground">
                {formatCompactCurrency(finance.downPaymentUSD, currencySymbol)}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-foreground-muted">
                Financed over {finance.months} months @ {finance.aprPct}% APR
              </dt>
              <dd className="font-medium text-foreground">
                {formatCompactCurrency(finance.totalFinanced, currencySymbol)}
              </dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-foreground-muted">Total interest</dt>
              <dd className="font-medium text-foreground">
                {formatCompactCurrency(finance.totalInterestUSD, currencySymbol)}
              </dd>
            </div>
            <div className="flex justify-between py-3 text-base">
              <dt className="font-semibold text-foreground">Estimated monthly payment</dt>
              <dd className="font-bold text-brand-700">
                {formatCompactCurrency(finance.monthlyPaymentUSD, currencySymbol)}/mo
              </dd>
            </div>
          </>
        ) : (
          <div className="flex justify-between py-2.5">
            <dt className="text-foreground-muted">Payment method</dt>
            <dd className="font-medium text-foreground">Pay in full</dd>
          </div>
        )}
      </dl>
    </Card>
  );
}
