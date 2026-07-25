import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import toolConfig from "@content/pages/calculator/tool-config.json";

export const metadata: Metadata = {
  title: toolConfig.metaTitle,
  description: toolConfig.metaDescription,
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: `${toolConfig.metaTitle} | ${siteConfig.name}`,
    description: toolConfig.metaDescription,
    url: "/calculator",
  },
};

export default function CalculatorPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Calculator", url: `${siteConfig.url}/calculator` },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteHeader />
      <main className="flex-1 bg-grid px-4 py-10 sm:py-14">
        {toolConfig.disclaimerText && (
          <div className="mx-auto mb-6 flex max-w-3xl items-start gap-2 rounded-xl border border-border-subtle bg-surface-muted px-4 py-3 text-xs leading-relaxed text-foreground-muted">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden="true" />
            <span>{toolConfig.disclaimerText}</span>
          </div>
        )}
        <CalculatorShell />
      </main>
    </div>
  );
}
