import { CalendarDays, ShieldCheck, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { EstimateResult } from "@/lib/pricing-engine/types";

export function TimelineCard({ estimate }: { estimate: EstimateResult }) {
  const { timeline, maintenance, currencySymbol } = estimate;

  const stats = [
    {
      icon: Stethoscope,
      label: "Appointments",
      value: `${timeline.appointments}`,
      hint: "Estimated clinic visits",
    },
    {
      icon: CalendarDays,
      label: "Treatment Duration",
      value: `${timeline.durationWeeks} wks`,
      hint: "From consult to final restoration",
    },
    {
      icon: ShieldCheck,
      label: "Success Rate",
      value: `${timeline.successRatePct}%`,
      hint: "Typical long-term clinical success",
    },
  ];

  return (
    <Card className="p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-foreground">Recovery Timeline</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-surface-muted p-4">
            <s.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
            <p className="mt-3 text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm font-medium text-foreground">{s.label}</p>
            <p className="mt-0.5 text-xs text-foreground-muted">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border-subtle p-4">
          <p className="text-sm font-medium text-foreground-muted">Annual Maintenance</p>
          <p className="mt-1 text-xl font-bold text-foreground">
            {currencySymbol}
            {maintenance.annualCareCostUSD.toLocaleString()}/yr
          </p>
          <p className="mt-0.5 text-xs text-foreground-muted">Cleanings, checkups & monitoring</p>
        </div>
        <div className="rounded-2xl border border-border-subtle p-4">
          <p className="text-sm font-medium text-foreground-muted">10-Year Ownership Cost</p>
          <p className="mt-1 text-xl font-bold text-foreground">
            {currencySymbol}
            {maintenance.tenYearOwnershipCostUSD.toLocaleString()}
          </p>
          <p className="mt-0.5 text-xs text-foreground-muted">
            Treatment + a decade of upkeep & one prosthetic refresh
          </p>
        </div>
      </div>
    </Card>
  );
}
