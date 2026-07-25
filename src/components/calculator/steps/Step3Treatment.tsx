"use client";

import { useMemo } from "react";
import { StepShell } from "@/components/calculator/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";
import type { TreatmentId } from "@/lib/pricing-engine/types";

export function Step3Treatment({ errors }: { errors: Record<string, string> }) {
  const { treatment, setTreatment } = useCalculatorStore();
  const config = useMemo(() => loadPricingConfig(), []);

  return (
    <StepShell
      title="Which treatment do you need?"
      description="Select the option that best matches your case. Not sure? Pick your best guess — you can always adjust it later."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {config.treatments.map((t) => (
          <RadioCard
            key={t.id}
            name="treatment"
            value={t.id}
            checked={treatment.treatmentId === t.id}
            onChange={(v) => setTreatment({ treatmentId: v as TreatmentId })}
            title={t.name}
            description={t.description}
            badge={t.fixedImplantCount ? `${t.fixedImplantCount} implants` : undefined}
          />
        ))}
      </div>
      {errors.treatmentId && (
        <p className="mt-3 text-sm text-danger" role="alert">
          {errors.treatmentId}
        </p>
      )}
    </StepShell>
  );
}
