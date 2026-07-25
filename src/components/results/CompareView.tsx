"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/LinkButton";
import { useSavedEstimatesStore } from "@/lib/store/savedEstimatesStore";
import { formatCompactCurrency } from "@/lib/utils/currency";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";

export function CompareView() {
  const saved = useSavedEstimatesStore((s) => s.saved);
  const removeEstimate = useSavedEstimatesStore((s) => s.removeEstimate);
  const config = loadPricingConfig();

  if (saved.length === 0) {
    return (
      <Card className="p-10 text-center">
        <h2 className="text-xl font-semibold text-foreground">No saved estimates yet</h2>
        <p className="mt-2 text-foreground-muted">
          Run the calculator and click &ldquo;Save Estimate&rdquo; on your results to compare
          different treatment options side by side.
        </p>
        <LinkButton href="/calculator" className="mt-6 inline-flex">
          Start an Estimate
        </LinkButton>
      </Card>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="p-0"></th>
            {saved.map((s) => {
              const treatment = config.treatments.find((t) => t.id === s.input.treatment.treatmentId);
              return (
                <th key={s.id} className="px-4 pb-4 text-left">
                  <div className="flex items-start justify-between gap-2 rounded-t-2xl border border-b-0 border-border-subtle bg-surface-muted p-4">
                    <div>
                      <p className="text-xs text-foreground-muted">
                        {new Date(s.savedAt).toLocaleDateString()}
                      </p>
                      <p className="font-semibold text-foreground">{treatment?.name ?? "Treatment"}</p>
                    </div>
                    <button
                      onClick={() => removeEstimate(s.id)}
                      aria-label="Remove saved estimate"
                      className="focus-ring text-foreground-muted hover:text-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-sm">
          {[
            { label: "Estimated average", get: (s: (typeof saved)[number]) => formatCompactCurrency(s.estimate.average, s.estimate.currencySymbol) },
            { label: "Range", get: (s: (typeof saved)[number]) => `${formatCompactCurrency(s.estimate.min, s.estimate.currencySymbol)} – ${formatCompactCurrency(s.estimate.max, s.estimate.currencySymbol)}` },
            { label: "Out of pocket", get: (s: (typeof saved)[number]) => formatCompactCurrency(s.estimate.outOfPocket, s.estimate.currencySymbol) },
            { label: "Appointments", get: (s: (typeof saved)[number]) => `${s.estimate.timeline.appointments}` },
            { label: "Duration", get: (s: (typeof saved)[number]) => `${s.estimate.timeline.durationWeeks} weeks` },
            { label: "Success rate", get: (s: (typeof saved)[number]) => `${s.estimate.timeline.successRatePct}%` },
            { label: "Monthly payment", get: (s: (typeof saved)[number]) => s.estimate.finance.method === "monthly" ? `${formatCompactCurrency(s.estimate.finance.monthlyPaymentUSD, s.estimate.currencySymbol)}/mo` : "Pay in full" },
          ].map((row, i) => (
            <tr key={row.label}>
              <th scope="row" className="whitespace-nowrap border-b border-border-subtle py-3 pr-6 text-left font-medium text-foreground-muted">
                {row.label}
              </th>
              {saved.map((s) => (
                <td
                  key={s.id}
                  className={`border-b border-border-subtle bg-surface px-4 py-3 font-medium text-foreground ${
                    i === 0 ? "text-lg text-brand-700" : ""
                  }`}
                >
                  {row.get(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-sm text-foreground-muted">
        Want another comparison? <Link href="/calculator" className="font-medium text-brand-600 hover:underline">Run a new estimate</Link>.
      </p>
    </div>
  );
}
