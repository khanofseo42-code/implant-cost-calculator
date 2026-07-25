import { jsPDF } from "jspdf";
import type { CalculatorInput, EstimateResult } from "@/lib/pricing-engine/types";
import { formatCompactCurrency } from "@/lib/utils/currency";
import { siteConfig } from "@/config/site";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";

export function generateEstimatePdf(estimate: EstimateResult, input: CalculatorInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  let y = margin;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  function heading(text: string, size = 18) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(size);
    doc.setTextColor(15, 23, 42);
    doc.text(text, margin, y);
    y += size * 0.9;
  }

  function label(text: string) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(text, margin, y);
    y += 14;
  }

  function row(left: string, right: string, bold = false) {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(left, margin, y);
    doc.text(right, pageWidth - margin, y, { align: "right" });
    y += 18;
  }

  function divider() {
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
  }

  const config = loadPricingConfig();
  const country = config.countries.find((c) => c.code === input.location.countryCode);
  const treatment = config.treatments.find((t) => t.id === input.treatment.treatmentId);
  const brand = config.brands.find((b) => b.id === input.implant.brandId);

  heading(siteConfig.name, 20);
  label(`Personalized Dental Implant Cost Estimate — Generated ${new Date().toLocaleDateString()}`);
  y += 6;
  divider();

  heading("Treatment Details", 14);
  row("Location", [input.location.city, country?.name].filter(Boolean).join(", "));
  row("Treatment", treatment?.name ?? "—");
  row("Implant system", brand?.name ?? "—");
  y += 6;
  divider();

  heading("Estimated Cost Range", 14);
  row("Minimum", formatCompactCurrency(estimate.min, estimate.currencySymbol));
  row("Average (most likely)", formatCompactCurrency(estimate.average, estimate.currencySymbol), true);
  row("Maximum", formatCompactCurrency(estimate.max, estimate.currencySymbol));
  y += 6;
  divider();

  heading("Itemized Breakdown", 14);
  for (const line of estimate.breakdown) {
    row(line.label, formatCompactCurrency(line.amount, estimate.currencySymbol));
    if (y > 720) {
      doc.addPage();
      y = margin;
    }
  }
  divider();

  heading("Insurance & Financing", 14);
  if (estimate.insurance.applied) {
    row("Insurance deduction", `-${formatCompactCurrency(estimate.insurance.netDeductionUSD, estimate.currencySymbol)}`);
  }
  row("Out-of-pocket cost", formatCompactCurrency(estimate.outOfPocket, estimate.currencySymbol), true);
  if (estimate.finance.method === "monthly") {
    row("Monthly payment", `${formatCompactCurrency(estimate.finance.monthlyPaymentUSD, estimate.currencySymbol)}/mo`);
    row("Term", `${estimate.finance.months} months @ ${estimate.finance.aprPct}% APR`);
  }
  y += 6;
  divider();

  heading("Treatment Timeline", 14);
  row("Appointments", `${estimate.timeline.appointments}`);
  row("Duration", `${estimate.timeline.durationWeeks} weeks`);
  row("Success rate", `${estimate.timeline.successRatePct}%`);
  y += 10;
  divider();

  heading("Why This Estimate", 12);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  for (const explanation of estimate.explanations) {
    const wrapped = doc.splitTextToSize(`• ${explanation}`, contentWidth);
    if (y + wrapped.length * 12 > 780) {
      doc.addPage();
      y = margin;
    }
    doc.text(wrapped, margin, y);
    y += wrapped.length * 12 + 4;
  }

  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "This is an educational estimate, not a clinical quote. Actual pricing requires an in-person consultation.",
    margin,
    820
  );

  doc.save(`${siteConfig.name.replace(/\s+/g, "-").toLowerCase()}-estimate.pdf`);
}
