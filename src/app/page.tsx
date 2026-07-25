import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyTrust } from "@/components/landing/WhyTrust";
import { FAQ } from "@/components/landing/FAQ";
import { CtaSection } from "@/components/landing/CtaSection";
import { faqItems } from "@/config/faq";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbSchema, buildFaqSchema, buildMedicalWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Dental Implant Cost Calculator — Instant, Personalized Estimate",
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = [
    buildMedicalWebPageSchema({
      name: `${siteConfig.name} — Dental Implant Cost Calculator`,
      description: siteConfig.description,
      url: siteConfig.url,
    }),
    buildFaqSchema(faqItems.map((f) => ({ question: f.question, answer: f.answer }))),
    buildBreadcrumbSchema([{ name: "Home", url: siteConfig.url }]),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhyTrust />
        <FAQ />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
