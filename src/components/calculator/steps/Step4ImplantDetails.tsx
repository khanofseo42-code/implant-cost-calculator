"use client";

import { useMemo } from "react";
import { StepShell } from "@/components/calculator/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";
import { cn } from "@/lib/utils/cn";

const tierLabels: Record<string, string> = {
  premium: "Premium",
  standard: "Standard",
  economy: "Economy",
};

export function Step4ImplantDetails({ errors }: { errors: Record<string, string> }) {
  const { implant, setImplant } = useCalculatorStore();
  const config = useMemo(() => loadPricingConfig(), []);

  const grouped = ["premium", "standard", "economy"].map((tier) => ({
    tier,
    brands: config.brands.filter((b) => b.tier === tier),
  }));

  return (
    <StepShell
      title="Choose your implant brand & material"
      description="Implant systems vary widely in cost, longevity data, and material. Premium tiers use globally established systems with the deepest long-term research."
    >
      <div className="space-y-7">
        {grouped.map(({ tier, brands }) => (
          <div key={tier}>
            <div className="mb-3 flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                  tier === "premium" && "bg-accent-100 text-accent-800",
                  tier === "standard" && "bg-brand-100 text-brand-800",
                  tier === "economy" && "bg-surface-muted text-foreground-muted"
                )}
              >
                {tierLabels[tier]}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {brands.map((b) => (
                <RadioCard
                  key={b.id}
                  name="brand"
                  value={b.id}
                  checked={implant.brandId === b.id}
                  onChange={(v) => setImplant({ brandId: v })}
                  title={b.name}
                  description={b.description}
                  badge={b.material === "zirconia" ? "Metal-free" : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      {errors.brandId && (
        <p className="mt-3 text-sm text-danger" role="alert">
          {errors.brandId}
        </p>
      )}
    </StepShell>
  );
}
