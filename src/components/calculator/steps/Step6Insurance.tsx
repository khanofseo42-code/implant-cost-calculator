"use client";

import { useMemo } from "react";
import { StepShell } from "@/components/calculator/StepShell";
import { Toggle } from "@/components/ui/Toggle";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { Input } from "@/components/ui/Input";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";

export function Step6Insurance({ errors }: { errors: Record<string, string> }) {
  const { insurance, setInsurance } = useCalculatorStore();
  const config = useMemo(() => loadPricingConfig(), []);

  const applyProviderDefaults = (providerId: string) => {
    const provider = config.insuranceProviders.find((p) => p.id === providerId);
    setInsurance({
      providerId,
      coveragePct: provider?.typicalCoveragePct,
      annualMaxUSD: provider?.typicalAnnualMaxUSD,
      remainingBenefitUSD: provider?.typicalAnnualMaxUSD,
    });
  };

  return (
    <StepShell
      title="Do you have dental insurance?"
      description="If you have coverage, we'll deduct your plan's contribution from the total treatment cost before showing your out-of-pocket estimate."
    >
      <div className="rounded-2xl border border-border-subtle p-5">
        <Toggle
          id="hasInsurance"
          checked={insurance.hasInsurance}
          onChange={(v) => setInsurance({ hasInsurance: v })}
          label="I have dental insurance"
          description="Toggle on to factor your plan into the estimate"
        />
      </div>

      {insurance.hasInsurance && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Select
            label="Insurance provider"
            placeholder="Select your provider"
            value={insurance.providerId ?? ""}
            options={config.insuranceProviders.map((p) => ({ value: p.id, label: p.name }))}
            onChange={(e) => applyProviderDefaults(e.target.value)}
          />
          <div className="flex items-end">
            <Slider
              label="Coverage percentage"
              value={insurance.coveragePct ?? 0}
              min={0}
              max={100}
              formatValue={(v) => `${v}%`}
              onChange={(v) => setInsurance({ coveragePct: v })}
            />
          </div>
          {errors.coveragePct && (
            <p className="-mt-3 text-sm text-danger sm:col-span-2" role="alert">
              {errors.coveragePct}
            </p>
          )}
          <Input
            type="number"
            label="Maximum annual benefit ($)"
            value={insurance.annualMaxUSD ?? ""}
            onChange={(e) => setInsurance({ annualMaxUSD: Number(e.target.value) })}
          />
          <Input
            type="number"
            label="Remaining benefit this year ($)"
            value={insurance.remainingBenefitUSD ?? ""}
            onChange={(e) => setInsurance({ remainingBenefitUSD: Number(e.target.value) })}
          />
          <Input
            type="number"
            label="Deductible ($)"
            value={insurance.deductibleUSD ?? ""}
            onChange={(e) => setInsurance({ deductibleUSD: Number(e.target.value) })}
          />
        </div>
      )}
    </StepShell>
  );
}
