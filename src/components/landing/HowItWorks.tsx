import { ClipboardList, Calculator, FileCheck2, MessageSquareHeart } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Answer 7 quick questions",
    description: "Location, patient details, treatment type, implant brand, procedures, insurance, and financing.",
  },
  {
    icon: Calculator,
    title: "We run the numbers",
    description: "Our pricing engine blends regional cost data, brand pricing, and clinical risk factors in real time.",
  },
  {
    icon: FileCheck2,
    title: "Get an itemized estimate",
    description: "See a full cost range, line-by-line breakdown, financing plan, and recovery timeline instantly.",
  },
  {
    icon: MessageSquareHeart,
    title: "Bring it to your consult",
    description: "Download or share your PDF report to discuss real numbers with your dental provider.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">
            From question one to a complete cost picture — in under a minute.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-border-subtle bg-surface p-6 shadow-premium"
            >
              <span className="absolute -top-3 left-6 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                {i + 1}
              </span>
              <step.icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
