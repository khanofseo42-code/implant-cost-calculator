"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RadioCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

export function RadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
  badge,
  disabled,
}: RadioCardProps) {
  return (
    <label
      className={cn(
        "focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2",
        "relative flex cursor-pointer flex-col gap-2 rounded-2xl border p-5 transition-all duration-150",
        checked
          ? "border-brand-500 bg-brand-50/60 shadow-glow"
          : "border-border-subtle bg-surface hover:border-brand-300 hover:bg-surface-muted",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                checked ? "bg-brand-600 text-white" : "bg-surface-muted text-foreground-muted"
              )}
            >
              {icon}
            </span>
          )}
          <span className="font-semibold text-foreground">{title}</span>
        </div>
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            checked ? "border-brand-600 bg-brand-600" : "border-border-strong"
          )}
        >
          {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
        </span>
      </div>
      {description && (
        <p className="text-sm leading-relaxed text-foreground-muted">{description}</p>
      )}
      {badge && (
        <span className="absolute -top-2 right-4 rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
    </label>
  );
}
