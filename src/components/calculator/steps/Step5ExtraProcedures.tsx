"use client";

import { useMemo } from "react";
import { StepShell } from "@/components/calculator/StepShell";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";
import type { ProcedureId } from "@/lib/pricing-engine/types";
import { Checkbox } from "@/components/ui/Checkbox";

export function Step5ExtraProcedures() {
  const { extras, setExtras } = useCalculatorStore();
  const config = useMemo(() => loadPricingConfig(), []);

  const toggle = (id: ProcedureId, checked: boolean) => {
    const set = new Set(extras.procedureIds);
    if (checked) set.add(id);
    else set.delete(id);
    setExtras({ procedureIds: Array.from(set) });
  };

  return (
    <StepShell
      title="Any additional procedures?"
      description="These are commonly needed alongside implant placement. Select any that apply — your clinician will confirm exact needs at consultation."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {config.procedures.map((proc) => (
          <div
            key={proc.id}
            className="rounded-2xl border border-border-subtle bg-surface p-4 transition-colors hover:border-brand-300"
          >
            <Checkbox
              id={proc.id}
              checked={extras.procedureIds.includes(proc.id)}
              onChange={(checked) => toggle(proc.id, checked)}
              label={proc.name}
              description={`From $${proc.baseCostUSD.toLocaleString()} ${
                proc.unit === "per-implant" ? "per implant" : proc.unit === "per-arch" ? "per arch" : "flat fee"
              }`}
            />
          </div>
        ))}
      </div>
    </StepShell>
  );
}
