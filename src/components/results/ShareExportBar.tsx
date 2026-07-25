"use client";

import { useState } from "react";
import { Download, Mail, Printer, Share2, Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { generateEstimatePdf } from "@/lib/pdf/generateEstimatePdf";
import { formatCompactCurrency } from "@/lib/utils/currency";
import { useSavedEstimatesStore } from "@/lib/store/savedEstimatesStore";
import type { CalculatorInput, EstimateResult } from "@/lib/pricing-engine/types";

export function ShareExportBar({
  estimate,
  input,
}: {
  estimate: EstimateResult;
  input: CalculatorInput;
}) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const addEstimate = useSavedEstimatesStore((s) => s.addEstimate);

  const summary = `My estimated dental implant cost is ${formatCompactCurrency(
    estimate.average,
    estimate.currencySymbol
  )} (range ${formatCompactCurrency(estimate.min, estimate.currencySymbol)}–${formatCompactCurrency(
    estimate.max,
    estimate.currencySymbol
  )}), calculated with ${"ImplantIQ"}.`;

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Dental Implant Estimate", text: summary });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard copy
      }
    }
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSave() {
    addEstimate(estimate, input);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <Button variant="primary" onClick={() => generateEstimatePdf(estimate, input)}>
        <Download className="h-4 w-4" /> Download PDF
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          (window.location.href = `mailto:?subject=${encodeURIComponent(
            "My Dental Implant Cost Estimate"
          )}&body=${encodeURIComponent(summary)}`)
        }
      >
        <Mail className="h-4 w-4" /> Email
      </Button>
      <Button variant="secondary" onClick={() => window.print()}>
        <Printer className="h-4 w-4" /> Print
      </Button>
      <Button variant="secondary" onClick={handleShare}>
        {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        {copied ? "Copied!" : "Share"}
      </Button>
      <Button variant="outline" onClick={handleSave}>
        {saved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {saved ? "Saved!" : "Save Estimate"}
      </Button>
    </div>
  );
}
