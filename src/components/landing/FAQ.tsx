import { ChevronDown } from "lucide-react";
import { QuestionBubble, ToothImplantDecor } from "./illustrations";
import faqContent from "@content/pages/home/faq.json";

export function FAQ() {
  const { heading, subheading, items } = faqContent;

  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden px-4 py-20 sm:py-24">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute left-6 top-[38%] hidden h-36 w-36 opacity-60 lg:block" />
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute right-6 top-24 hidden h-24 w-44 opacity-60 lg:block" />
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute bottom-16 right-10 hidden h-28 w-28 opacity-60 lg:block" />
      <QuestionBubble className="animate-float pointer-events-none absolute right-[7%] top-[40%] hidden h-28 w-28 lg:block" />
      <ToothImplantDecor className="pointer-events-none absolute -left-4 bottom-0 hidden h-64 w-auto -rotate-[40deg] lg:block" />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-[2.6rem]">{heading}</h2>
          <p className="mt-3 text-base text-foreground-muted sm:text-lg">{subheading}</p>
        </div>

        <div className="mt-10 space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-border-subtle bg-surface px-5 py-4 shadow-premium transition-shadow open:shadow-premium-lg"
            >
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {item.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-foreground transition-transform group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
