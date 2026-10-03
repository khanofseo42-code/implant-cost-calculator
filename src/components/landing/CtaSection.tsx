import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { ClipboardScene } from "./illustrations";
import ctaContent from "@content/pages/home/cta.json";

export function CtaSection() {
  const { heading, subheading, ctaText, ctaUrl } = ctaContent;

  return (
    <section className="px-4 pb-20 pt-4 sm:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1e3fcf] via-[#2350e0] to-[#14a8a0] px-8 py-12 shadow-premium-lg sm:px-14 sm:py-14">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path d="M520 400 C700 260 900 300 1200 120 V400 Z" fill="#ffffff" opacity="0.07" />
          <path d="M760 400 C880 320 1040 330 1200 240 V400 Z" fill="#5fe2c8" opacity="0.18" />
        </svg>
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

        <div className="relative grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="max-w-md text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-[2.6rem]">
              {heading}
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/90">{subheading}</p>
            <LinkButton
              href={ctaUrl}
              size="lg"
              className="group mt-8 inline-flex h-14 bg-white px-9 font-semibold text-[#244cd1] shadow-lg shadow-black/15 hover:bg-white/90"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </LinkButton>
          </div>
          <ClipboardScene className="mx-auto -my-6 hidden h-auto w-full max-w-md md:block" />
        </div>
      </div>
    </section>
  );
}
