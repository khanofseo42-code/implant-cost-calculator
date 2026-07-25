import Link from "next/link";
import { getIcon } from "@/lib/icons";
import howItWorksContent from "@content/pages/home/how-it-works.json";

export function HowItWorks() {
  const { heading, subheading, steps } = howItWorksContent;

  return (
    <section id="how-it-works" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">{subheading}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = getIcon(step.icon);
            const card = (
              <div className="relative rounded-2xl border border-border-subtle bg-surface p-6 shadow-premium">
                <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <Icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {step.description}
                </p>
              </div>
            );
            return step.link ? (
              <Link key={step.title} href={step.link} className="focus-ring rounded-2xl">
                {card}
              </Link>
            ) : (
              <div key={step.title}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
