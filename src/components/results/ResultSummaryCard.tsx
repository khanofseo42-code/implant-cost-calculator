"use client";

import { Card } from "@/components/ui/Card";
import { AnimatedNumber } from "./AnimatedNumber";
import { formatCompactCurrency } from "@/lib/utils/currency";
import type { EstimateResult } from "@/lib/pricing-engine/types";

export function ResultSummaryCard({ estimate }: { estimate: EstimateResult }) {
  const { min, average, max, currencySymbol } = estimate;
  const range = max - min || 1;
  const avgPct = ((average - min) / range) * 100;

  return (
    <Card elevated className="overflow-hidden">
      <div className="bg-gradient-to-br from-brand-600 to-accent-600 px-6 py-8 text-white sm:px-10 sm:py-10">
        <p className="text-sm font-medium uppercase tracking-wide text-white/80">
          Your Estimated Treatment Cost
        </p>
        <div className="mt-2 flex items-baseline gap-3">
          <AnimatedNumber
            value={average}
            format={(v) => formatCompactCurrency(v, currencySymbol)}
            className="text-5xl font-bold tracking-tight sm:text-6xl"
          />
          <span className="text-sm text-white/80">estimated average</span>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-sm text-white/80">
            <span>Minimum</span>
            <span>Maximum</span>
          </div>
          <div className="relative mt-2 h-2 rounded-full bg-white/25">
            <div className="absolute inset-y-0 left-0 rounded-full bg-white" style={{ width: "100%" }} />
            <div
              className="absolute -top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-brand-700 bg-white shadow-lg"
              style={{ left: `${avgPct}%` }}
              aria-hidden="true"
            />
          </div>
          <div className="mt-2 flex justify-between text-lg font-semibold">
            <span>{formatCompactCurrency(min, currencySymbol)}</span>
            <span>{formatCompactCurrency(max, currencySymbol)}</span>
          </div>
        </div>
      </div>

      {estimate.insurance.applied && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface-muted px-6 py-4 text-sm sm:px-10">
          <span className="text-foreground-muted">
            After an estimated {formatCompactCurrency(estimate.insurance.netDeductionUSD, currencySymbol)} insurance
            deduction
          </span>
          <span className="text-lg font-semibold text-accent-700">
            {formatCompactCurrency(estimate.outOfPocket, currencySymbol)} out of pocket
          </span>
        </div>
      )}
    </Card>
  );
}
