"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock3, ShieldCheck, Sparkles, UserCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { ImplantIllustration } from "./ImplantIllustration";

const badges = [
  { icon: ShieldCheck, label: "HIPAA-Ready Design" },
  { icon: Sparkles, label: "Medical Pricing Logic" },
  { icon: Clock3, label: "Instant Estimate" },
  { icon: UserCheck, label: "No Registration Required" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid px-4 pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground-muted shadow-premium">
            <Sparkles className="h-3.5 w-3.5 text-accent-500" />
            Trusted pricing intelligence for dental implants
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Know your <span className="text-gradient-brand">dental implant cost</span> in under
            60 seconds
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
            A precision cost calculator that models your location, treatment, implant brand,
            insurance, and financing — into one clear, itemized estimate. No sales calls. No
            guesswork.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LinkButton href="/calculator" size="lg" className="group">
              Start Free Estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </LinkButton>
            <LinkButton href="#how-it-works" variant="ghost" size="lg">
              See how it works
            </LinkButton>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {badges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface/70 px-3 py-2.5 text-xs font-medium text-foreground-muted"
              >
                <b.icon className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <ImplantIllustration />
        </motion.div>
      </div>
    </section>
  );
}
