import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";

export function CtaSection() {
  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 px-8 py-14 text-center shadow-premium-lg sm:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Get your personalized estimate now
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          Seven quick questions. One clear, itemized answer. Free, instant, and no obligation.
        </p>
        <LinkButton
          href="/calculator"
          size="lg"
          className="mt-8 inline-flex bg-white text-brand-700 hover:bg-white/90"
        >
          Start Free Estimate
          <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </div>
    </section>
  );
}
