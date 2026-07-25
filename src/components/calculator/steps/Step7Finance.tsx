"use client";

import { useMemo } from "react";
import { StepShell } from "@/components/calculator/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { Select } from "@/components/ui/Select";
import { Slider } from "@/components/ui/Slider";
import { Input } from "@/components/ui/Input";
import { Banknote, CreditCard } from "lucide-react";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";
import type { PaymentMethod } from "@/lib/pricing-engine/types";

export function Step7Finance({ errors }: { errors: Record<string, string> }) {
  const { finance, setFinance } = useCalculatorStore();
  const config = useMemo(() => loadPricingConfig(), []);
  const selectedRate = config.financeRates.find((r) => r.id === finance.financeRateId);

  return (
    <StepShell
      title="How would you like to pay?"
      description="Compare paying in full versus spreading the cost. We'll calculate a real estimated monthly payment based on your plan."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <RadioCard
          name="paymentMethod"
          value="cash"
          checked={finance.paymentMethod === "cash"}
          onChange={(v) => setFinance({ paymentMethod: v as PaymentMethod })}
          title="Pay in full"
          description="One upfront payment, no interest"
          icon={<Banknote className="h-4.5 w-4.5" />}
        />
        <RadioCard
          name="paymentMethod"
          value="monthly"
          checked={finance.paymentMethod === "monthly"}
          onChange={(v) => setFinance({ paymentMethod: v as PaymentMethod })}
          title="Monthly payments"
          description="Finance your treatment over time"
          icon={<CreditCard className="h-4.5 w-4.5" />}
        />
      </div>

      {finance.paymentMethod === "monthly" && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Select
            label="Financing plan"
            placeholder="Select a plan"
            value={finance.financeRateId ?? ""}
            error={errors.financeRateId}
            options={config.financeRates.map((r) => ({
              value: r.id,
              label: `${r.label} (${r.aprPct}% APR)`,
            }))}
            onChange={(e) =>
              setFinance({ financeRateId: e.target.value, months: undefined })
            }
          />
          <Input
            type="number"
            label="Down payment ($)"
            value={finance.downPaymentUSD ?? ""}
            onChange={(e) => setFinance({ downPaymentUSD: Number(e.target.value) })}
          />
          {selectedRate && (
            <div className="sm:col-span-2">
              <Slider
                label="Repayment period"
                value={finance.months ?? selectedRate.minMonths}
                min={selectedRate.minMonths}
                max={selectedRate.maxMonths}
                formatValue={(v) => `${v} months`}
                onChange={(v) => setFinance({ months: v })}
              />
            </div>
          )}
        </div>
      )}
    </StepShell>
  );
}
