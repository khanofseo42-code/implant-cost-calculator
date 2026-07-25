"use client";

import { StepShell } from "@/components/calculator/StepShell";
import { RadioCard } from "@/components/ui/RadioCard";
import { Slider } from "@/components/ui/Slider";
import { Toggle } from "@/components/ui/Toggle";
import { Input } from "@/components/ui/Input";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import type { BoneCondition, DiabetesStatus } from "@/lib/pricing-engine/types";

const diabetesOptions: { value: DiabetesStatus; title: string; description: string }[] = [
  { value: "none", title: "No diabetes", description: "No history of diabetes" },
  { value: "controlled", title: "Controlled", description: "Managed with medication/diet" },
  { value: "uncontrolled", title: "Uncontrolled", description: "Blood sugar not well managed" },
];

const boneOptions: { value: BoneCondition; title: string; description: string }[] = [
  { value: "healthy", title: "Healthy", description: "No noticeable bone loss" },
  { value: "mild-loss", title: "Mild loss", description: "Slight bone recession" },
  { value: "moderate-loss", title: "Moderate loss", description: "May need grafting" },
  { value: "severe-loss", title: "Severe loss", description: "Significant density loss" },
];

export function Step2PatientInfo({ errors }: { errors: Record<string, string> }) {
  const { patient, setPatient } = useCalculatorStore();

  return (
    <StepShell
      title="Tell us about the patient"
      description="Health factors like smoking, diabetes, and bone density directly affect surgical complexity — and therefore cost. This helps us model your risk profile accurately."
    >
      <div className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            type="number"
            label="Age"
            min={18}
            max={100}
            value={patient.age ?? ""}
            error={errors.age}
            onChange={(e) => setPatient({ age: Number(e.target.value) })}
          />
          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">
              Gender <span className="font-normal text-foreground-muted">(optional)</span>
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(["female", "male", "prefer-not-to-say"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setPatient({ gender: g })}
                  className={`focus-ring h-11 rounded-xl border text-sm font-medium capitalize transition-colors ${
                    patient.gender === g
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-border-strong bg-surface text-foreground hover:bg-surface-muted"
                  }`}
                >
                  {g === "prefer-not-to-say" ? "N/A" : g}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Slider
            label="Missing teeth (upper jaw)"
            value={patient.missingTeethUpper ?? 0}
            min={0}
            max={16}
            onChange={(v) => setPatient({ missingTeethUpper: v })}
          />
          <Slider
            label="Missing teeth (lower jaw)"
            value={patient.missingTeethLower ?? 0}
            min={0}
            max={16}
            onChange={(v) => setPatient({ missingTeethLower: v })}
          />
        </div>
        {errors.missingTeethUpper && (
          <p className="-mt-4 text-sm text-danger" role="alert">
            {errors.missingTeethUpper}
          </p>
        )}

        <div className="rounded-2xl border border-border-subtle p-5">
          <Toggle
            id="smoking"
            checked={patient.smoking ?? false}
            onChange={(v) => setPatient({ smoking: v })}
            label="Does the patient smoke?"
            description="Smoking slows healing and can affect implant success rate"
          />
        </div>

        <div>
          <span className="mb-3 block text-sm font-medium text-foreground">Diabetes status</span>
          <div className="grid gap-3 sm:grid-cols-3">
            {diabetesOptions.map((opt) => (
              <RadioCard
                key={opt.value}
                name="diabetes"
                value={opt.value}
                checked={patient.diabetes === opt.value}
                onChange={(v) => setPatient({ diabetes: v as DiabetesStatus })}
                title={opt.title}
                description={opt.description}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="mb-3 block text-sm font-medium text-foreground">Bone condition</span>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {boneOptions.map((opt) => (
              <RadioCard
                key={opt.value}
                name="boneCondition"
                value={opt.value}
                checked={patient.boneCondition === opt.value}
                onChange={(v) => setPatient({ boneCondition: v as BoneCondition })}
                title={opt.title}
                description={opt.description}
              />
            ))}
          </div>
        </div>
      </div>
    </StepShell>
  );
}
