import { JsonSectionEditor } from "@/components/admin/JsonSectionEditor";

export default function AdminPricingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Pricing Configuration</h1>
        <p className="mt-1 text-foreground-muted">
          Edits here take effect for every new estimate the moment they're saved.
        </p>
      </div>

      <JsonSectionEditor
        section="countries"
        title="Countries"
        description="Base cost multiplier, currency, and tax rules per country, with nested state/region multipliers."
      />
      <JsonSectionEditor
        section="cities"
        title="Cities"
        description="Percentage cost adjustment per city, layered on top of country and state multipliers."
      />
      <JsonSectionEditor
        section="brands"
        title="Implant Brands"
        description="Per-implant, abutment, and crown pricing by tier (economy/standard/premium) and material."
      />
      <JsonSectionEditor
        section="treatments"
        title="Treatments"
        description="Base surgical fee, implant count, appointments, duration, and success rate per treatment type."
      />
      <JsonSectionEditor
        section="procedures"
        title="Extra Procedures"
        description="Pricing for add-on procedures like bone grafts, sedation, and CT scans."
      />
    </div>
  );
}
