import { JsonSectionEditor } from "@/components/admin/JsonSectionEditor";

export default function AdminInsurancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Insurance Rules</h1>
        <p className="mt-1 text-foreground-muted">
          Typical coverage percentage and annual maximum benefit per insurance provider preset.
        </p>
      </div>
      <JsonSectionEditor
        section="insurance"
        title="Insurance Providers"
        description="Shown as presets in Step 6 of the calculator; users can still override with their own plan details."
      />
    </div>
  );
}
