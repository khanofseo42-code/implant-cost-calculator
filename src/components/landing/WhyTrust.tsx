import Link from "next/link";
import { getIcon } from "@/lib/icons";
import whyTrustContent from "@content/pages/home/why-trust.json";

export function WhyTrust() {
  const { heading, subheading, cards } = whyTrustContent;

  return (
    <section className="bg-surface-muted px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">{subheading}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((p) => {
            const Icon = getIcon(p.icon);
            const card = (
              <div className="rounded-2xl bg-surface p-6 shadow-premium">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {p.description}
                </p>
              </div>
            );
            return p.link ? (
              <Link key={p.title} href={p.link} className="focus-ring rounded-2xl">
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
