import { JsonSectionEditor } from "@/components/admin/JsonSectionEditor";

export default function AdminFinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Finance Settings</h1>
        <p className="mt-1 text-foreground-muted">
          APR and term ranges offered in Step 7 of the calculator.
        </p>
      </div>
      <JsonSectionEditor
        section="finance"
        title="Financing Plans"
        description="Each plan's APR and min/max repayment term, used to compute the real monthly payment shown on the results page."
      />
    </div>
  );
}
