import Link from "next/link";
import { getIcon } from "@/lib/icons";
import { LeafDecor } from "./illustrations";
import howItWorksContent from "@content/pages/home/how-it-works.json";

export function HowItWorks() {
  const { heading, subheading, steps } = howItWorksContent;

  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden px-4 pb-20 pt-10 sm:pb-28 sm:pt-14">
      <LeafDecor className="pointer-events-none absolute -right-14 top-20 hidden h-44 w-44 rotate-12 lg:block" flip />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.6rem]">{heading}</h2>
          <p className="mt-3 text-base text-foreground-muted sm:text-lg">{subheading}</p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = getIcon(step.icon);
            const card = (
              <div className="relative h-full rounded-2xl border border-border-subtle bg-surface px-6 pb-7 pt-6 shadow-premium transition-all duration-200 hover:-translate-y-1 hover:shadow-premium-lg">
                <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md shadow-brand-600/30">
                  {i + 1}
                </span>
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
                  <Icon className="h-7 w-7 text-brand-600" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-base font-bold leading-snug text-foreground">{step.title}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-foreground-muted">{step.description}</p>
              </div>
            );
            return (
              <li key={step.title}>
                {step.link ? (
                  <Link href={step.link} className="focus-ring block h-full rounded-2xl">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
