"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation/schemas";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactFormSchema) });

  async function onSubmit(values: ContactFormValues) {
    setError(null);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => null);
      setError(json?.error ?? "Something went wrong. Please try again.");
      return;
    }
    setSent(true);
    reset();
  }

  if (sent) {
    return (
      <div className="flex items-center gap-2 rounded-2xl border border-border-subtle bg-surface p-6 text-accent-700">
        <CheckCircle2 className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          Thanks — your message has been sent. We&rsquo;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Input label="Full name" placeholder="Jane Doe" error={errors.name?.message} {...register("name")} />
      <Input
        type="email"
        label="Email address"
        placeholder="jane@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="How can we help?"
          className="focus-ring w-full rounded-xl border border-border-strong bg-surface-muted p-3.5 text-sm text-foreground placeholder:text-foreground-muted/60"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-danger">{errors.message.message}</p>
        )}
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <Button type="submit" fullWidth isLoading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
