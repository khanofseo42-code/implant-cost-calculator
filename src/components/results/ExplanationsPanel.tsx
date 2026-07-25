import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { EstimateResult } from "@/lib/pricing-engine/types";

export function ExplanationsPanel({ estimate }: { estimate: EstimateResult }) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-accent-600" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-foreground">Why this estimate?</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {estimate.explanations.map((text, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
