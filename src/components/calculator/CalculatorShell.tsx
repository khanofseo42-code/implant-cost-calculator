"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import type { ZodType } from "zod";
import { ProgressBar } from "./ProgressBar";
import { Button } from "@/components/ui/Button";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import {
  locationSchema,
  patientSchema,
  treatmentSchema,
  implantDetailsSchema,
  extraProceduresSchema,
  insuranceSchema,
  financeSchema,
} from "@/lib/validation/schemas";
import { Step1Location } from "./steps/Step1Location";
import { Step2PatientInfo } from "./steps/Step2PatientInfo";
import { Step3Treatment } from "./steps/Step3Treatment";
import { Step4ImplantDetails } from "./steps/Step4ImplantDetails";
import { Step5ExtraProcedures } from "./steps/Step5ExtraProcedures";
import { Step6Insurance } from "./steps/Step6Insurance";
import { Step7Finance } from "./steps/Step7Finance";

const stepLabels = [
  "Location",
  "Patient Info",
  "Treatment",
  "Implant Details",
  "Extra Procedures",
  "Insurance",
  "Finance",
];

interface StepConfig {
  schema: ZodType;
  getData: (s: ReturnType<typeof useCalculatorStore.getState>) => unknown;
}

const stepConfigs: StepConfig[] = [
  { schema: locationSchema, getData: (s) => s.location },
  { schema: patientSchema, getData: (s) => s.patient },
  { schema: treatmentSchema, getData: (s) => s.treatment },
  { schema: implantDetailsSchema, getData: (s) => s.implant },
  { schema: extraProceduresSchema, getData: (s) => s.extras },
  { schema: insuranceSchema, getData: (s) => s.insurance },
  { schema: financeSchema, getData: (s) => s.finance },
];

export function CalculatorShell() {
  const router = useRouter();
  const store = useCalculatorStore();
  const { currentStep, completedSteps, goToStep, nextStep, prevStep, markStepComplete } = store;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLastStep = currentStep === stepLabels.length - 1;

  function validateCurrentStep(): boolean {
    const config = stepConfigs[currentStep];
    const result = config.schema.safeParse(config.getData(useCalculatorStore.getState()));
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    setErrors(fieldErrors);
    return false;
  }

  async function handleNext() {
    if (!validateCurrentStep()) return;
    markStepComplete(currentStep);

    if (isLastStep) {
      setIsSubmitting(true);
      store.runCalculation();
      router.push("/results");
      return;
    }
    nextStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setErrors({});
    prevStep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderStep() {
    switch (currentStep) {
      case 0:
        return <Step1Location errors={errors} />;
      case 1:
        return <Step2PatientInfo errors={errors} />;
      case 2:
        return <Step3Treatment errors={errors} />;
      case 3:
        return <Step4ImplantDetails errors={errors} />;
      case 4:
        return <Step5ExtraProcedures />;
      case 5:
        return <Step6Insurance errors={errors} />;
      case 6:
        return <Step7Finance errors={errors} />;
      default:
        return null;
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-8">
        <ProgressBar
          steps={stepLabels}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={goToStep}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleNext();
        }}
        className="rounded-3xl border border-border-subtle bg-surface p-6 shadow-premium-lg sm:p-10"
      >
        <AnimatePresence mode="wait">
          <div key={currentStep}>{renderStep()}</div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between border-t border-border-subtle pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={currentStep === 0 ? "invisible" : ""}
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>

          <div className="flex items-center gap-1.5 text-xs text-foreground-muted" aria-live="polite">
            <Check className="h-3.5 w-3.5 text-accent-500" />
            Progress saved automatically
          </div>

          <Button type="submit" isLoading={isSubmitting}>
            {isLastStep ? (
              "Calculate My Estimate"
            ) : (
              <>
                Continue <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
