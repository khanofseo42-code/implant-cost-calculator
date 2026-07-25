"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation/schemas";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";

interface LeadGateModalProps {
  open: boolean;
  onClose: () => void;
  onUnlock: (lead: LeadFormValues) => void;
}

export function LeadGateModal({ open, onClose, onUnlock }: LeadGateModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const config = loadPricingConfig();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: { consent: undefined as unknown as true },
  });

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      dialogRef.current?.querySelector("input")?.focus();
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  async function onSubmit(values: LeadFormValues) {
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      // Non-fatal: still unlock the results locally even if the lead-capture
      // network call fails, so a flaky connection doesn't block the user.
    }
    onUnlock(values);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-gate-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-3xl border border-border-subtle bg-surface p-6 shadow-premium-lg sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring absolute right-5 top-5 text-foreground-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
              <Lock className="h-5 w-5 text-brand-600" aria-hidden="true" />
            </div>
            <h2 id="lead-gate-title" className="text-xl font-semibold text-foreground">
              Unlock your full estimate
            </h2>
            <p className="mt-1.5 text-sm text-foreground-muted">
              Enter your details to view the itemized breakdown, financing details, and download
              your PDF report. No spam — ever.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
              <Input label="Full name" placeholder="Jane Doe" error={errors.name?.message} {...register("name")} />
              <Input
                type="email"
                label="Email address"
                placeholder="jane@example.com"
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                type="tel"
                label="Phone number"
                placeholder="+1 (555) 123-4567"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Select
                label="Country"
                placeholder="Select your country"
                error={errors.country?.message}
                options={config.countries.map((c) => ({ value: c.code, label: c.name }))}
                {...register("country")}
              />
              <Checkbox
                id="consent"
                checked={Boolean(watch("consent"))}
                onChange={(checked) => setValue("consent", checked as true, { shouldValidate: true })}
                label="I consent to be contacted about my estimate"
                description="We'll only use this to follow up on your treatment estimate."
                error={errors.consent?.message}
              />

              <Button type="submit" fullWidth isLoading={isSubmitting}>
                Unlock My Full Estimate
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
