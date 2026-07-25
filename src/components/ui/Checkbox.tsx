"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  error?: string;
}

export function Checkbox({ id, checked, onChange, label, description, error }: CheckboxProps) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="focus-ring peer sr-only"
            aria-invalid={Boolean(error)}
          />
          <span
            className={cn(
              "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors",
              checked ? "border-brand-600 bg-brand-600" : "border-border-strong bg-surface",
              "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-500 peer-focus-visible:outline-offset-2"
            )}
          >
            {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
          </span>
        </span>
        <span>
          <span className="text-sm font-medium text-foreground">{label}</span>
          {description && (
            <span className="mt-0.5 block text-sm text-foreground-muted">{description}</span>
          )}
        </span>
      </label>
      {error && (
        <p className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
