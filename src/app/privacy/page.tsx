import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" updated="July 25, 2026">
      <p>
        This Privacy Policy explains what information {siteConfig.name} (&ldquo;we,&rdquo;
        &ldquo;us&rdquo;) collects when you use this website and calculator, why we collect it,
        and the choices you have. We built this tool to require as little personal information as
        possible, and this policy reflects that: most of your calculator activity never leaves
        your browser.
      </p>

      <h2>Information you enter into the calculator</h2>
      <p>
        Your location, treatment, implant, insurance, and financing selections are processed
        entirely in your browser to generate your estimate and are saved to your browser&rsquo;s
        local storage (key <code>dic-calculator-v1</code>) so you can resume later. This data is
        not transmitted to our servers unless you explicitly submit the lead form described below.
      </p>

      <h2>Information you submit through the lead form</h2>
      <p>
        To unlock the full itemized breakdown and PDF report, you may optionally submit your name,
        email address, phone number, and country. We use this to:
      </p>
      <ul>
        <li>Send you your estimate and any follow-up information you request</li>
        <li>Improve and troubleshoot the calculator</li>
        <li>
          Optionally sync to a marketing platform (Mailchimp and/or HubSpot) if we have configured
          that integration — no such integration is active unless we have added API credentials on
          our end
        </li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Automatically collected information</h2>
      <p>
        Our servers log standard request metadata (IP address, timestamp, requested path) for
        security purposes, including rate-limiting abusive traffic to our lead and pricing
        endpoints. We do not use this data for advertising or profiling.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        We use browser local storage to remember your theme preference (light/dark) and your
        in-progress calculator answers, and session storage to remember that you&rsquo;ve unlocked
        your results for the current browser session. We do not use third-party advertising
        cookies.
      </p>

      <h2>Data retention</h2>
      <p>
        Calculator answers stored in your browser remain there until you clear your browser data.
        Lead form submissions are retained only as long as needed to respond to your inquiry and
        meet our legal and operational obligations.
      </p>

      <h2>Your choices</h2>
      <p>
        You can use the entire calculator and view your estimate without ever submitting the lead
        form. You can clear your saved answers at any time by clearing your browser&rsquo;s local
        storage for this site. To request access to, correction of, or deletion of any personal
        information you&rsquo;ve submitted to us, contact us using the details below.
      </p>

      <h2>Children&rsquo;s privacy</h2>
      <p>This site is not directed to children under 13, and we do not knowingly collect their information.</p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be reflected by
        updating the &ldquo;Last updated&rdquo; date above.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>
    </LegalPageShell>
  );
}
