import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Important information about the educational nature of ${siteConfig.name}'s cost estimates.`,
  alternates: { canonical: "/disclaimer" },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <LegalPageShell title="Disclaimer" updated="July 25, 2026">
      <h2>Not medical advice</h2>
      <p>
        {siteConfig.name} is an educational cost-estimating tool. Nothing on this website,
        including the calculator, its results, explanations, or any downloadable report,
        constitutes medical advice, diagnosis, or a treatment recommendation. Whether dental
        implants are appropriate for you can only be determined by a licensed dentist or oral
        surgeon after an in-person clinical examination, imaging, and review of your health
        history.
      </p>

      <h2>Not a binding price quote</h2>
      <p>
        Estimates are generated from configurable reference pricing data across countries,
        cities, implant brands, and treatment types, adjusted for the inputs you provide. Actual
        prices charged by any specific clinic or provider may be higher or lower depending on
        factors this tool cannot account for, including the complexity of your case, additional
        diagnostics, the specific materials and technology used, local market conditions, and
        promotional pricing. Always request a written, itemized quote from your chosen provider
        before agreeing to treatment.
      </p>

      <h2>No provider relationship</h2>
      <p>
        {siteConfig.name} does not employ dentists or oral surgeons, does not operate dental
        clinics, and does not refer patients to specific providers in exchange for compensation.
        We are not affiliated with any implant brand named in the calculator; brand names are used
        solely to reflect typical market pricing tiers.
      </p>

      <h2>Financing estimates</h2>
      <p>
        Any monthly payment, term, or APR shown by the financing calculator is illustrative only,
        based on the figures you enter or select. It is not a loan offer, a pre-approval, or a
        representation of terms available from any specific lender. Confirm actual rates and terms
        directly with a licensed lender.
      </p>

      <h2>Insurance estimates</h2>
      <p>
        Insurance deduction figures are a simplified approximation based on the coverage
        percentage and annual maximum you enter. Your actual insurance benefit depends entirely on
        your specific policy, its exclusions, waiting periods, and annual limits. Confirm your
        real coverage directly with your insurer before making treatment decisions.
      </p>

      <h2>No warranty</h2>
      <p>
        This tool is provided &ldquo;as is&rdquo; without warranties of any kind, express or
        implied, regarding the accuracy, completeness, or reliability of any estimate produced. Use
        of this website is at your own risk, and you are solely responsible for verifying any
        figures before relying on them.
      </p>

      <h2>Questions</h2>
      <p>
        If anything here is unclear, contact us at{" "}
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
      </p>
    </LegalPageShell>
  );
}
