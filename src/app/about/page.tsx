import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Calculator,
  ChartColumn,
  Compass,
  CreditCard,
  Database,
  FileText,
  Layers,
  Mail,
  MapPin,
  ScrollText,
  ShieldCheck,
  Smile,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { ToothImplantDecor } from "@/components/landing/illustrations";
import { AboutHeroBackdrop, ClipboardNotArt, EnvelopeArt } from "@/components/about/illustrations";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "About Us",
  description: `The mission and methodology behind ${siteConfig.name}, an independent dental implant cost calculator.`,
  alternates: { canonical: "/about" },
};

type Tone = "blue" | "green";

const toneStyles: Record<Tone, string> = {
  blue: "bg-brand-50 text-brand-600",
  green: "bg-accent-50 text-accent-500",
};

const heroCards: { icon: LucideIcon; title: string; lines: string[]; className: string }[] = [
  {
    icon: ChartColumn,
    title: "Transparent Methodology",
    lines: ["See exactly how", "we calculate costs"],
    className: "right-0 top-[4%] sm:-right-2",
  },
  {
    icon: ShieldCheck,
    title: "Independent & Unbiased",
    lines: ["No clinics", "No sales team"],
    className: "left-0 top-[38%] sm:left-[4%]",
  },
  {
    icon: FileText,
    title: "Realistic Estimates",
    lines: ["Based on real", "data and research"],
    className: "right-0 top-[58%] sm:-right-4",
  },
];

const estimateInputs: { icon: LucideIcon; title: string; detail: string; tone: Tone }[] = [
  { icon: Smile, title: "Treatment type", detail: "Single, multiple, or full arch", tone: "blue" },
  { icon: Layers, title: "Implant brand & material", detail: "Premium, standard options", tone: "blue" },
  { icon: MapPin, title: "Your location", detail: "Country, state/region, city", tone: "blue" },
  { icon: ShieldCheck, title: "Insurance coverage", detail: "Provider & plan details", tone: "green" },
  { icon: CreditCard, title: "Financing terms", detail: "Monthly options, payment plans", tone: "blue" },
];

const notList = ["Not a dental clinic", "Not a provider network", "Not medical advice", "Not a binding quote"];

const principles: { icon: LucideIcon; title: string; description: string; tone: Tone }[] = [
  {
    icon: Database,
    title: "Reference pricing, not guesswork",
    description:
      "Our cost model is built from configurable per-country, per-city, per-brand, and per-procedure pricing tiers that we periodically review against published price-transparency data and industry fee surveys, rather than a single hardcoded average.",
    tone: "blue",
  },
  {
    icon: ScrollText,
    title: "We explain every number",
    description:
      "Every estimate comes with a plain-language breakdown of exactly which inputs — location, treatment type, implant tier, add-ons, insurance, financing — contributed to each line item.",
    tone: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Independent, not pay-to-play",
    description:
      "We are not owned by, and do not accept payment from, any dental clinic, implant manufacturer, or financing provider to influence the pricing shown.",
    tone: "green",
  },
  {
    icon: Users,
    title: "Built for patients researching options",
    description:
      "This tool exists to help people compare the rough shape of implant costs across locations and treatment types before they ever set foot in a clinic — not to replace a real consultation.",
    tone: "blue",
  },
];

function Eyebrow({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-foreground/80 shadow-premium">
      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand-50">
        <Icon className="h-3.5 w-3.5 text-brand-600" aria-hidden="true" />
      </span>
      {children}
    </span>
  );
}

function IconTile({ icon: Icon, tone = "blue", size = "md" }: { icon: LucideIcon; tone?: Tone | "red"; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        size === "lg" ? "h-16 w-16" : "h-12 w-12 rounded-xl",
        tone === "red" ? "bg-red-50 text-danger dark:bg-red-500/10" : toneStyles[tone]
      )}
    >
      <Icon className={size === "lg" ? "h-7 w-7" : "h-6 w-6"} strokeWidth={2} aria-hidden="true" />
    </span>
  );
}

export default function AboutPage() {
  const jsonLd = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "About", url: `${siteConfig.url}/about` },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/40 to-background px-4 pb-14 pt-10 sm:pt-14">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-6">
            <div className="animate-fade-up">
              <Eyebrow icon={Smile}>About {siteConfig.name}</Eyebrow>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
                About
                <span className="text-gradient-brand block pb-1">{siteConfig.name}</span>
              </h1>
              <div className="mt-7 max-w-[34rem] space-y-4 text-[15px] leading-relaxed text-foreground-muted">
                <p>
                  {siteConfig.name}{" "}is an independent, self-serve calculator that gives people a realistic,
                  itemized estimate of what dental implant treatment is likely to cost — based on where
                  they live, which treatment and implant tier they&rsquo;re considering, and their insurance
                  and financing situation.
                </p>
                <p>
                  Dental implant pricing is notoriously opaque: quotes vary wildly between clinics,
                  countries, and even the same procedure described in different terms. We built this tool
                  because we think people should be able to get a grounded starting estimate in under a
                  minute, for free, before they ever talk to a sales team — and understand exactly why the
                  number is what it is.
                </p>
              </div>
            </div>

            <div className="animate-fade-in relative mx-auto aspect-[7/6] w-full max-w-[560px]">
              <AboutHeroBackdrop className="absolute inset-0 h-full w-full" />
              <ToothImplantDecor className="absolute left-1/2 top-[3%] h-[86%] w-auto -translate-x-1/2 rotate-[4deg]" />
              {heroCards.map(({ icon: Icon, title, lines, className }) => (
                <div
                  key={title}
                  className={cn(
                    "absolute flex w-[150px] items-start gap-2.5 rounded-2xl border border-white/80 bg-surface/95 p-3 shadow-premium-lg backdrop-blur sm:w-[168px] sm:p-3.5",
                    className
                  )}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold leading-snug text-foreground">{title}</p>
                    <p className="mt-1 text-[10.5px] leading-snug text-foreground-muted">
                      {lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How our estimates are built + What we are not */}
        <section className="px-4">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-border-subtle bg-surface shadow-premium">
            <div className="grid items-center gap-10 bg-brand-50/60 px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-7">
                <IconTile icon={Calculator} size="lg" />
                <div>
                  <h2 className="max-w-xs text-3xl font-extrabold leading-tight tracking-tight text-foreground">
                    How our estimates are built
                  </h2>
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground-muted">
                    Every estimate is generated by a rules-based pricing engine, not a single average
                    number. It combines a base treatment fee, an implant-brand-and-material cost, a
                    location multiplier (country, state/region, and city), optional add-on procedures, your
                    insurance coverage, and your financing terms into one itemized result. The underlying
                    reference figures are maintained in a structured pricing configuration that we
                    periodically review and update.
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface px-5 py-2 shadow-premium-lg">
                {estimateInputs.map(({ icon: Icon, title, detail, tone }) => (
                  <li key={title} className="flex items-center gap-4 py-3.5">
                    <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", toneStyles[tone])}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="mt-0.5 text-xs text-foreground-muted">{detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="flex flex-col gap-6 sm:flex-row sm:gap-7">
                <IconTile icon={Ban} tone="red" size="lg" />
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-foreground">What we are not</h2>
                  <p className="mt-5 text-[15px] leading-relaxed text-foreground-muted">
                    We are not a dental clinic, a network of providers, or a licensed source of medical or
                    financial advice, and no estimate produced here is a binding quote. Read our{" "}
                    <Link href="/disclaimer" className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700">
                      Disclaimer
                    </Link>{" "}
                    for the full picture, and always confirm actual pricing and treatment suitability with a
                    licensed dentist or oral surgeon.
                  </p>
                </div>
              </div>

              <div className="relative mx-auto flex w-full max-w-md items-center">
                <ClipboardNotArt className="h-auto w-[62%]" />
                <ul className="absolute right-0 top-1/2 w-[52%] -translate-y-1/2 space-y-2.5 rounded-2xl border border-border-subtle bg-surface p-4 shadow-premium-lg">
                  {notList.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs font-medium text-foreground/80">
                      <X className="h-3.5 w-3.5 shrink-0 text-danger" strokeWidth={3} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="px-4 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <Eyebrow icon={Compass}>Our approach</Eyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.4rem]">
                What guides how we <span className="text-gradient-brand">build this</span>
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {principles.map(({ icon, title, description, tone }) => (
                <div
                  key={title}
                  className="flex items-start gap-5 rounded-2xl border border-border-subtle bg-surface p-6 shadow-premium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-lg sm:p-7"
                >
                  <IconTile icon={icon} tone={tone} />
                  <div>
                    <h3 className="text-base font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-foreground-muted">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get in touch */}
        <section className="px-4 pb-20 sm:pb-28">
          <div className="relative mx-auto grid max-w-6xl items-center gap-8 overflow-hidden rounded-[28px] border border-border-subtle bg-gradient-to-br from-brand-50 via-brand-50/70 to-accent-50 px-6 py-12 shadow-premium sm:px-12 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Eyebrow icon={Mail}>Get in touch</Eyebrow>
              <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Get in <span className="text-gradient-brand">touch</span>
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-foreground-muted">
                Questions, corrections to our pricing data, or partnership inquiries — we&rsquo;d like to hear
                from you.
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="focus-ring group mt-7 inline-flex max-w-full items-center gap-3 rounded-full border border-border-subtle bg-surface px-5 py-3.5 text-sm font-semibold text-brand-600 shadow-premium transition-shadow hover:shadow-premium-lg"
              >
                <Mail className="h-4.5 w-4.5 shrink-0" aria-hidden="true" />
                <span className="truncate underline underline-offset-2">{siteConfig.contact.email}</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
            <EnvelopeArt className="mx-auto hidden h-auto w-full max-w-sm md:block" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
