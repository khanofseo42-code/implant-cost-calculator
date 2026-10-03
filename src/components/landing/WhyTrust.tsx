import Link from "next/link";
import { getIcon } from "@/lib/icons";
import { LeafDecor, ToothImplantDecor } from "./illustrations";
import whyTrustContent from "@content/pages/home/why-trust.json";

function renderHeading(heading: string, highlight: string) {
  if (!highlight || !heading.includes(highlight)) return heading;
  const [before, after] = heading.split(highlight);
  return (
    <>
      {before}
      <span className="text-brand-600">{highlight}</span>
      {after}
    </>
  );
}

export function WhyTrust() {
  const { heading, highlight, subheading, cards } = whyTrustContent;

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28">
      {/* Soft blue band with curved edges */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full text-brand-50"
      >
        <path d="M0 70 C320 0 640 40 900 50 C1160 60 1300 10 1440 0 V540 C1200 600 900 560 620 570 C360 580 160 610 0 560 Z" fill="currentColor" />
        <path d="M0 130 C360 60 760 120 1440 40 V120 C900 170 400 120 0 200 Z" fill="currentColor" opacity="0.6" className="text-brand-100" />
      </svg>
      <LeafDecor className="pointer-events-none absolute -left-16 top-0 hidden h-60 w-60 -rotate-12 lg:block" />
      <ToothImplantDecor className="pointer-events-none absolute -right-6 top-[30%] hidden h-72 w-auto -rotate-[18deg] lg:block" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.6rem]">
            {renderHeading(heading, highlight)}
          </h2>
          <p className="mt-3 text-base text-foreground-muted sm:text-lg">{subheading}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {cards.map((p) => {
            const Icon = getIcon(p.icon);
            const card = (
              <div className="flex h-full items-start gap-5 rounded-2xl border border-white/70 bg-surface/90 p-6 shadow-premium backdrop-blur sm:p-7">
                <Icon className="mt-0.5 h-8 w-8 shrink-0 text-brand-600" strokeWidth={2} aria-hidden="true" />
                <div>
                  <h3 className="text-base font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-foreground-muted">{p.description}</p>
                </div>
              </div>
            );
            return p.link ? (
              <Link key={p.title} href={p.link} className="focus-ring block rounded-2xl">
                {card}
              </Link>
            ) : (
              <div key={p.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
