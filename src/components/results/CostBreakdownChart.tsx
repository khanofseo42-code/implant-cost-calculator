"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { Card } from "@/components/ui/Card";
import { formatCompactCurrency } from "@/lib/utils/currency";
import type { BreakdownLine, EstimateResult } from "@/lib/pricing-engine/types";

interface CategoryBucket {
  key: string;
  label: string;
  amount: number;
  color: string;
}

const CATEGORY_ORDER: { categories: BreakdownLine["category"][]; label: string; color: string }[] = [
  { categories: ["implants"], label: "Implant Fixtures", color: "var(--chart-series-1)" },
  { categories: ["abutments"], label: "Abutments", color: "var(--chart-series-2)" },
  { categories: ["crowns"], label: "Crowns", color: "var(--chart-series-3)" },
  { categories: ["lab-fees"], label: "Lab Fees", color: "var(--chart-series-4)" },
  { categories: ["surgery"], label: "Surgical Fee", color: "var(--chart-series-5)" },
  { categories: ["bone-graft"], label: "Bone Graft", color: "var(--chart-series-6)" },
  { categories: ["sedation"], label: "Sedation", color: "var(--chart-series-7)" },
  {
    categories: ["ct-scan", "other-procedures", "tax"],
    label: "Other & Taxes",
    color: "var(--chart-series-8)",
  },
];

function buildBuckets(breakdown: BreakdownLine[]): CategoryBucket[] {
  return CATEGORY_ORDER.map(({ categories, label, color }) => ({
    key: label,
    label,
    color,
    amount: breakdown
      .filter((line) => categories.includes(line.category))
      .reduce((sum, l) => sum + l.amount, 0),
  })).filter((b) => b.amount > 0);
}

function ChartTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  total: number;
}) {
  if (!active || !payload?.length) return null;
  const entry = payload[payload.length - 1];
  const pct = total > 0 ? ((entry.value ?? 0) / total) * 100 : 0;
  return (
    <div className="rounded-xl border border-border-subtle bg-surface px-3 py-2 text-sm shadow-premium-lg">
      <div className="flex items-center gap-2 font-medium text-foreground">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
        {entry.name}
      </div>
      <p className="mt-0.5 text-foreground-muted">
        ${Math.round(entry.value ?? 0).toLocaleString()} ({pct.toFixed(0)}%)
      </p>
    </div>
  );
}

export function CostBreakdownChart({ estimate }: { estimate: EstimateResult }) {
  const buckets = buildBuckets(estimate.breakdown);
  const total = buckets.reduce((sum, b) => sum + b.amount, 0);
  const chartData = [Object.fromEntries(buckets.map((b) => [b.key, b.amount]))];

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-foreground">Cost Breakdown</h3>
      <p className="mt-1 text-sm text-foreground-muted">
        What makes up your treatment cost, before any discounts or insurance
      </p>

      <div className="mt-6 h-14 w-full overflow-hidden rounded-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" barSize={28} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis type="number" hide domain={[0, total]} />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<ChartTooltip total={total} />}
            />
            {buckets.map((b) => (
              <Bar
                key={b.key}
                dataKey={b.key}
                name={b.label}
                stackId="cost"
                fill={b.color}
                stroke="var(--chart-surface)"
                strokeWidth={3}
                isAnimationActive
                animationDuration={700}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4" aria-label="Cost breakdown legend">
        {buckets.map((b) => (
          <li key={b.key} className="flex items-start gap-2">
            <span
              className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: b.color }}
              aria-hidden="true"
            />
            <span className="text-sm">
              <span className="block text-foreground-muted">{b.label}</span>
              <span className="font-semibold text-foreground">
                {formatCompactCurrency(b.amount, estimate.currencySymbol)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
