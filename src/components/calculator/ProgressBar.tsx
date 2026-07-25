"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (step: number) => void;
}

export function ProgressBar({ steps, currentStep, completedSteps, onStepClick }: ProgressBarProps) {
  const pct = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-xs font-medium text-foreground-muted sm:text-sm">
        <span>
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="hidden sm:inline">{steps[currentStep]}</span>
      </div>
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={currentStep + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Calculator progress: step ${currentStep + 1} of ${steps.length}`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
      <div className="mt-4 hidden justify-between sm:flex">
        {steps.map((label, i) => {
          const isComplete = completedSteps.includes(i);
          const isCurrent = i === currentStep;
          const clickable = Boolean(onStepClick) && (isComplete || i <= currentStep);
          return (
            <button
              key={label}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onStepClick?.(i)}
              className={cn(
                "focus-ring flex flex-col items-center gap-1.5 text-center text-xs",
                clickable ? "cursor-pointer" : "cursor-default"
              )}
              style={{ width: `${100 / steps.length}%` }}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold transition-colors",
                  isCurrent
                    ? "border-brand-600 bg-brand-600 text-white"
                    : isComplete
                    ? "border-accent-500 bg-accent-500 text-white"
                    : "border-border-strong bg-surface text-foreground-muted"
                )}
              >
                {isComplete && !isCurrent ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={cn(
                  "line-clamp-1 max-w-[6.5rem]",
                  isCurrent ? "font-semibold text-foreground" : "text-foreground-muted"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
