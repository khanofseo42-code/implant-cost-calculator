import { Card } from "@/components/ui/Card";
import { formatCompactCurrency } from "@/lib/utils/currency";
import type { EstimateResult } from "@/lib/pricing-engine/types";

export function BreakdownTable({ estimate }: { estimate: EstimateResult }) {
  const { currencySymbol } = estimate;

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-foreground">Itemized Breakdown</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border-subtle text-left text-xs uppercase tracking-wide text-foreground-muted">
              <th scope="col" className="py-2 pr-4 font-medium">
                Line Item
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">
                Low
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-medium">
                Estimated
              </th>
              <th scope="col" className="py-2 text-right font-medium">
                High
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {estimate.breakdown.map((line) => (
              <tr key={line.id}>
                <td className="py-3 pr-4 text-foreground">{line.label}</td>
                <td className="py-3 pr-4 text-right tabular-nums text-foreground-muted">
                  {formatCompactCurrency(line.min, currencySymbol)}
                </td>
                <td className="py-3 pr-4 text-right font-medium tabular-nums text-foreground">
                  {formatCompactCurrency(line.amount, currencySymbol)}
                </td>
                <td className="py-3 text-right tabular-nums text-foreground-muted">
                  {formatCompactCurrency(line.max, currencySymbol)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border-strong font-semibold">
              <td className="py-3 pr-4 text-foreground">Total</td>
              <td className="py-3 pr-4 text-right tabular-nums text-foreground">
                {formatCompactCurrency(estimate.min, currencySymbol)}
              </td>
              <td className="py-3 pr-4 text-right tabular-nums text-brand-700">
                {formatCompactCurrency(estimate.average, currencySymbol)}
              </td>
              <td className="py-3 text-right tabular-nums text-foreground">
                {formatCompactCurrency(estimate.max, currencySymbol)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  );
}
