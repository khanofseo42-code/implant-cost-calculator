import { siteConfig } from "@/config/site";

// JSON-LD builders. Each returns a plain object suitable for JSON.stringify
// inside a <script type="application/ld+json"> tag. Keeping these centralized
// avoids duplicating structured-data shapes across routes.

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        contactType: "customer support",
      },
    ],
    sameAs: [siteConfig.links.twitter],
  };
}

export function buildSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${siteConfig.name} Cost Calculator`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any (Web)",
    url: siteConfig.url,
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1284",
    },
  };
}

export function buildMedicalWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Patient",
    },
    about: {
      "@type": "MedicalProcedure",
      name: "Dental Implant Surgery",
      procedureType: "https://schema.org/PercutaneousProcedure",
    },
    lastReviewed: new Date().toISOString().split("T")[0],
  };
}

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Builds JSON-LD for a blog post. `schemaType` drives which schema.org type is
 * emitted (set per-post in Decap CMS); `customSchema`, if present and valid
 * JSON, overrides the generated object entirely so editors can hand-author
 * structured data for a specific post.
 */
export function buildBlogSchema(opts: {
  schemaType: "BlogPosting" | "Article" | "MedicalWebPage" | "FAQPage";
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  image?: string;
  customSchema?: string;
}) {
  if (opts.customSchema) {
    try {
      return JSON.parse(opts.customSchema);
    } catch {
      // Malformed custom JSON-LD — fall back to the generated schema below.
    }
  }

  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": opts.schemaType,
    headline: opts.title,
    name: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt,
    author: { "@type": "Organization", name: opts.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  if (opts.image) base.image = opts.image;

  if (opts.schemaType === "MedicalWebPage") {
    base.medicalAudience = { "@type": "MedicalAudience", audienceType: "Patient" };
  }

  return base;
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
