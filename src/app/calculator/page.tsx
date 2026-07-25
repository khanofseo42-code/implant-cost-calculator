import type { Metadata } from "next";
import { CalculatorShell } from "@/components/calculator/CalculatorShell";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Dental Implant Cost Calculator",
  description:
    "Answer a few questions about your location, treatment, and insurance to get a personalized, itemized dental implant cost estimate in under 60 seconds.",
  alternates: { canonical: "/calculator" },
  openGraph: {
    title: `Dental Implant Cost Calculator | ${siteConfig.name}`,
    description:
      "Get a personalized, itemized dental implant cost estimate in under 60 seconds.",
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
        <CalculatorShell />
      </main>
    </div>
  );
}
