import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-3 text-foreground-muted">
            Have a question about your estimate, spotted a pricing issue, or want to talk
            partnerships? Send us a message and we&rsquo;ll respond as soon as we can.
          </p>

          <div className="mt-8 rounded-3xl border border-border-subtle bg-surface p-6 shadow-premium sm:p-8">
            <ContactForm />
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-foreground-muted">
            <Mail className="h-4 w-4" />
            <span>
              Or email us directly at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="focus-ring rounded text-brand-600 underline underline-offset-2 hover:text-brand-700"
              >
                {siteConfig.contact.email}
              </a>
            </span>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
