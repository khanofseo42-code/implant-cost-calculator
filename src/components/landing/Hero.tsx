import Image from "next/image";
import { ArrowRight, Check, Play } from "lucide-react";
import { LinkButton } from "@/components/ui/LinkButton";
import { ImplantIllustration } from "./ImplantIllustration";
import { getIcon } from "@/lib/icons";
import heroContent from "@content/pages/home/hero.json";

function renderTitle(title: string, highlight: string) {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className="text-gradient-brand">{highlight}</span>
      {after}
    </>
  );
}

export function Hero() {
  const { eyebrow, title, highlight, subtitle, primaryCtaText, primaryCtaUrl, secondaryCtaText, secondaryCtaUrl, bannerImage, badges } =
    heroContent;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/50 to-background px-4 pb-12 pt-10 sm:pb-16 sm:pt-14">
      {/* Soft wave that blends the hero into the next section */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full text-background sm:h-32"
      >
        <path
          d="M0 90 C240 150 480 40 760 70 C1040 100 1220 150 1440 60 V160 H0 Z"
          fill="currentColor"
          opacity="0.6"
        />
        <path d="M0 120 C300 160 560 80 860 100 C1120 118 1300 150 1440 110 V160 H0 Z" fill="currentColor" />
      </svg>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-4">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground-muted shadow-premium">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success text-white">
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {eyebrow}
            </span>

            <h1 className="mt-6 max-w-[33rem] text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              {renderTitle(title, highlight)}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-foreground-muted sm:text-[17px]">
              {subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <LinkButton
                href={primaryCtaUrl}
                size="lg"
                className="group h-14 px-9 font-semibold shadow-lg shadow-brand-600/30"
              >
                {primaryCtaText}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </LinkButton>
              <a
                href={secondaryCtaUrl}
                className="focus-ring group inline-flex items-center gap-3 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-md shadow-brand-600/30 transition-transform group-hover:scale-105">
                  <Play className="ml-0.5 h-3 w-3 fill-current" aria-hidden="true" />
                </span>
                {secondaryCtaText}
              </a>
            </div>
          </div>

          <div className="animate-fade-in relative mx-auto aspect-square w-full max-w-md lg:-mr-6 lg:max-w-[540px]">
            {bannerImage ? (
              <Image src={bannerImage} alt="" fill priority className="object-contain" />
            ) : (
              <ImplantIllustration />
            )}
          </div>
        </div>

        <ul className="animate-fade-up mt-10 grid grid-cols-2 gap-3 [animation-delay:150ms] sm:gap-4 lg:mt-6 lg:grid-cols-4">
          {badges.map((b) => {
            const Icon = getIcon(b.icon);
            return (
              <li
                key={b.label}
                className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface px-4 py-4 text-[13px] font-semibold text-foreground shadow-premium sm:px-5"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.2} aria-hidden="true" />
                {b.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
