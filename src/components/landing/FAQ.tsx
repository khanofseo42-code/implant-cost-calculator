import { ChevronDown } from "lucide-react";
import { faqItems } from "@/config/faq";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">
            Everything you need to know before you start.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-border-subtle bg-surface p-5 open:shadow-premium"
            >
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
                {item.question}
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-open:rotate-180"
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
