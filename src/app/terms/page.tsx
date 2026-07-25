import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service" updated="July 25, 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
        {siteConfig.name} (the &ldquo;Service&rdquo;). By using the Service, you agree to these
        Terms. If you do not agree, please do not use the Service.
      </p>

      <h2>Use of the Service</h2>
      <p>
        The Service is provided free of charge for personal, informational use in researching the
        potential cost of dental implant treatment. You may not use the Service to scrape,
        resell, or redistribute our pricing data or calculator logic, or to attempt to gain
        unauthorized access to any part of the Service, including the admin panel.
      </p>

      <h2>No professional relationship</h2>
      <p>
        Use of the Service does not create a doctor-patient, financial-advisory, or other
        professional relationship between you and {siteConfig.legalName}. See our{" "}
        <a href="/disclaimer">Disclaimer</a> for details on the limitations of the estimates
        provided.
      </p>

      <h2>Accounts and the admin panel</h2>
      <p>
        Access to the administrative configuration panel is restricted to authorized personnel of{" "}
        {siteConfig.legalName} and is protected by credentials that must not be shared or
        distributed.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The Service, including its design, calculator logic, and written content, is owned by{" "}
        {siteConfig.legalName} and protected by applicable intellectual property laws. You may
        view and use the Service for its intended purpose, but may not copy, modify, or create
        derivative works from it without our written permission.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        The Service may reference or link to third-party implant brands, financing providers, or
        insurers for descriptive purposes only. We do not control and are not responsible for the
        content, accuracy, or practices of any third-party site.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis
        without warranties of any kind. We do not warrant that the Service will be uninterrupted,
        error-free, or that any estimate will match actual treatment costs.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.legalName} will not be liable for any
        indirect, incidental, or consequential damages arising from your use of, or inability to
        use, the Service, including any decision made in reliance on an estimate produced by the
        Service.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the Service after changes
        take effect constitutes acceptance of the revised Terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of the jurisdiction in which {siteConfig.legalName} is
        established, without regard to conflict-of-law principles.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>
    </LegalPageShell>
  );
}
