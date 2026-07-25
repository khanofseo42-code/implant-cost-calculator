import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-premium shadow-brand-600/20 disabled:hover:bg-brand-600",
  secondary:
    "bg-surface-muted text-foreground hover:bg-border-subtle border border-border-subtle",
  ghost: "bg-transparent text-foreground-muted hover:text-foreground hover:bg-surface-muted",
  outline:
    "bg-transparent border border-border-strong text-foreground hover:bg-surface-muted",
  danger: "bg-danger text-white hover:opacity-90",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

export function buttonClassNames(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  opts?: { fullWidth?: boolean; className?: string }
) {
  return cn(
    "focus-ring inline-flex items-center justify-center rounded-full font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    sizeStyles[size],
    opts?.fullWidth && "w-full",
    opts?.className
  );
}
