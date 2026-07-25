import { FileSearch, Lock, ScrollText, SlidersHorizontal } from "lucide-react";

const points = [
  {
    icon: SlidersHorizontal,
    title: "Modular, transparent pricing engine",
    description:
      "Every estimate is built from configurable country, city, brand, and procedure pricing — never a single hardcoded number.",
  },
  {
    icon: ScrollText,
    title: "We show our work",
    description:
      "Every result includes a plain-language explanation of exactly which inputs drove each line item in your estimate.",
  },
  {
    icon: Lock,
    title: "Your data stays yours",
    description:
      "Your answers are saved locally in your browser. Nothing is sent anywhere unless you choose to unlock your PDF report.",
  },
  {
    icon: FileSearch,
    title: "No obligation, ever",
    description:
      "This is an independent estimating tool, not a lead funnel for a single clinic. Use it purely to plan and compare.",
  },
];

export function WhyTrust() {
  return (
    <section className="bg-surface-muted px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built to be trusted, not just used
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">
            Most online calculators show a single vague number. We show the reasoning.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl bg-surface p-6 shadow-premium">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                <p.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
