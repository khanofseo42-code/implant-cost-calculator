"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { ResultSummaryCard } from "./ResultSummaryCard";
import { CostBreakdownChart } from "./CostBreakdownChart";
import { TimelineCard } from "./TimelineCard";
import { FinanceCard } from "./FinanceCard";
import { BreakdownTable } from "./BreakdownTable";
import { ExplanationsPanel } from "./ExplanationsPanel";
import { LeadGateModal } from "./LeadGateModal";
import { ShareExportBar } from "./ShareExportBar";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import type { CalculatorInput } from "@/lib/pricing-engine/types";

const UNLOCK_KEY = "dic-results-unlocked";

export function ResultsContent() {
  const router = useRouter();
  const estimate = useCalculatorStore((s) => s.estimate);
  const location = useCalculatorStore((s) => s.location);
  const patient = useCalculatorStore((s) => s.patient);
  const treatment = useCalculatorStore((s) => s.treatment);
  const implant = useCalculatorStore((s) => s.implant);
  const extras = useCalculatorStore((s) => s.extras);
  const insurance = useCalculatorStore((s) => s.insurance);
  const finance = useCalculatorStore((s) => s.finance);

  const [unlocked, setUnlocked] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(UNLOCK_KEY) === "1"
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!estimate) {
      router.replace("/calculator");
    }
  }, [estimate, router]);

  if (!estimate) return null;

  const input: CalculatorInput = {
    location: location as CalculatorInput["location"],
    patient: patient as CalculatorInput["patient"],
    treatment: treatment as CalculatorInput["treatment"],
    implant: implant as CalculatorInput["implant"],
    extras,
    insurance,
    finance,
  };

  function handleUnlock() {
    setUnlocked(true);
    setModalOpen(false);
    window.sessionStorage.setItem(UNLOCK_KEY, "1");
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/calculator")}
          className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Edit answers
        </button>
        <LinkButton href="/compare" variant="ghost" size="sm">
          Compare estimates
        </LinkButton>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <ResultSummaryCard estimate={estimate} />
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CostBreakdownChart estimate={estimate} />
        <TimelineCard estimate={estimate} />
      </div>

      {unlocked ? (
        <div className="space-y-6">
          <FinanceCard estimate={estimate} />
          <BreakdownTable estimate={estimate} />
          <ExplanationsPanel estimate={estimate} />
          <div className="rounded-3xl border border-border-subtle bg-surface p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Save or share your estimate</h3>
            <ShareExportBar estimate={estimate} input={input} />
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-surface p-8 text-center shadow-premium-lg sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-surface" />
          <ChevronDown className="mx-auto h-6 w-6 text-brand-500" aria-hidden="true" />
          <h3 className="mt-3 text-xl font-semibold text-foreground">
            Unlock your itemized breakdown & PDF report
          </h3>
          <p className="mx-auto mt-2 max-w-md text-foreground-muted">
            See exactly what makes up your estimate line by line, your financing plan, and
            download a shareable PDF — free, no obligation.
          </p>
          <Button className="mt-6" size="lg" onClick={() => setModalOpen(true)}>
            Unlock Full Estimate
          </Button>
        </div>
      )}

      <LeadGateModal open={modalOpen} onClose={() => setModalOpen(false)} onUnlock={handleUnlock} />
    </div>
  );
}
