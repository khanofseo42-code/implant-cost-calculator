export const siteConfig = {
  name: "ImplantIQ",
  legalName: "ImplantIQ Estimator",
  tagline: "Know your dental implant cost in under 60 seconds",
  description:
    "A precision dental implant cost calculator that builds a personalized, itemized treatment estimate from your location, procedure, implant brand, insurance, and financing details — instantly, with no registration required.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://implantiq.example.com",
  ogImage: "/og-image.png",
  keywords: [
    "dental implant cost",
    "dental implant calculator",
    "tooth implant calculator",
    "dental implant price estimator",
    "implant finance calculator",
    "all-on-4 calculator",
    "all-on-6 calculator",
    "full mouth dental implant cost",
  ],
  links: {
    twitter: "https://twitter.com/implantiq",
  },
  contact: {
    email: "hello@implantiq.example.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
