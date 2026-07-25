import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import ctaContent from "@content/pages/home/cta.json";

export function CtaSection() {
  const { heading, subheading, ctaText, ctaUrl } = ctaContent;

  return (
    <section className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-600 px-8 py-14 text-center shadow-premium-lg sm:px-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">{subheading}</p>
        <LinkButton
          href={ctaUrl}
          size="lg"
          className="mt-8 inline-flex bg-white text-brand-700 hover:bg-white/90"
        >
          {ctaText}
          <ArrowRight className="h-4 w-4" />
        </LinkButton>
      </div>
    </section>
  );
}
