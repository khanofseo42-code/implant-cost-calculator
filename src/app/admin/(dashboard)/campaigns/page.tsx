import { JsonSectionEditor } from "@/components/admin/JsonSectionEditor";

export default function AdminCampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Discount Campaigns</h1>
        <p className="mt-1 text-foreground-muted">
          Active campaigns apply automatically as a discount line item on matching treatment
          estimates. Set <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">active: false</code> to
          pause a campaign without deleting it.
        </p>
      </div>
      <JsonSectionEditor
        section="campaigns"
        title="Campaigns"
        description='Set appliesToTreatmentIds to "all" or an array of treatment IDs (e.g. ["all-on-4", "all-on-6"]).'
      />
    </div>
  );
}
