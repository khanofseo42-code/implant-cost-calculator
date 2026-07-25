"use client";

import { useMemo } from "react";
import { Globe2 } from "lucide-react";
import { StepShell } from "@/components/calculator/StepShell";
import { Select } from "@/components/ui/Select";
import { useCalculatorStore } from "@/lib/store/calculatorStore";
import { loadPricingConfig } from "@/lib/pricing-engine/defaults";

export function Step1Location({ errors }: { errors: Record<string, string> }) {
  const { location, setLocation } = useCalculatorStore();
  const config = useMemo(() => loadPricingConfig(), []);

  const country = config.countries.find((c) => c.code === location.countryCode);
  const states = country?.states ?? [];
  const cities = config.cities.filter(
    (c) => c.countryCode === location.countryCode && c.stateCode === location.stateCode
  );

  return (
    <StepShell
      title="Where will you receive treatment?"
      description="Dental implant pricing varies significantly by country, region, and city. We use your location to calibrate every line item in your estimate."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="Country"
          placeholder="Select a country"
          value={location.countryCode ?? ""}
          error={errors.countryCode}
          options={config.countries.map((c) => ({ value: c.code, label: c.name }))}
          onChange={(e) =>
            setLocation({ countryCode: e.target.value, stateCode: "", city: "" })
          }
        />
        <Select
          label="State / Region"
          placeholder={country ? "Select a state or region" : "Select a country first"}
          value={location.stateCode ?? ""}
          error={errors.stateCode}
          disabled={!country}
          options={states.map((s) => ({ value: s.code, label: s.name }))}
          onChange={(e) => setLocation({ stateCode: e.target.value, city: "" })}
        />
        <Select
          label="City"
          placeholder={location.stateCode ? "Select a city" : "Select a state first"}
          value={location.city ?? ""}
          error={errors.city}
          disabled={!location.stateCode}
          options={cities.map((c) => ({ value: c.city, label: c.city }))}
          onChange={(e) => setLocation({ city: e.target.value })}
        />
        <Select
          label="Currency"
          value={country?.currency ?? ""}
          disabled
          options={
            country ? [{ value: country.currency, label: `${country.currency} (${country.currencySymbol})` }] : []
          }
          hint="Automatically set from your country"
        />
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-4 text-sm text-brand-900">
        <Globe2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <p>
          Language: <span className="font-medium">English (US)</span> — more languages are on
          the way. Every price on this page is translated live once your location is set.
        </p>
      </div>
    </StepShell>
  );
}
