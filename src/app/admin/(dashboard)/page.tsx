"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe2, Layers, Percent, ShieldCheck, Wrench } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface ConfigCounts {
  countries: number;
  brands: number;
  treatments: number;
  procedures: number;
  insuranceProviders: number;
  campaigns: number;
}

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<ConfigCounts | null>(null);

  useEffect(() => {
    fetch("/api/pricing")
      .then((r) => r.json())
      .then((data) =>
        setCounts({
          countries: data.countries?.length ?? 0,
          brands: data.brands?.length ?? 0,
          treatments: data.treatments?.length ?? 0,
          procedures: data.procedures?.length ?? 0,
          insuranceProviders: data.insurance?.length ?? 0,
          campaigns: data.campaigns?.length ?? 0,
        })
      )
      .catch(() => setCounts(null));
  }, []);

  const stats = [
    { icon: Globe2, label: "Countries priced", value: counts?.countries },
    { icon: Layers, label: "Implant brands", value: counts?.brands },
    { icon: Wrench, label: "Treatment types", value: counts?.treatments },
    { icon: ShieldCheck, label: "Insurance providers", value: counts?.insuranceProviders },
    { icon: Percent, label: "Active campaigns", value: counts?.campaigns },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
      <p className="mt-1 text-foreground-muted">
        Manage the live pricing configuration that powers every estimate.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <s.icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
            <p className="mt-3 text-2xl font-bold text-foreground">{s.value ?? "—"}</p>
            <p className="text-sm text-foreground-muted">{s.label}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6 p-6">
        <h2 className="font-semibold text-foreground">Analytics</h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Connect Google Analytics, Google Tag Manager, or Microsoft Clarity by setting{" "}
          <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">NEXT_PUBLIC_GA_ID</code>,{" "}
          <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">NEXT_PUBLIC_GTM_ID</code>, or{" "}
          <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CLARITY_ID</code>{" "}
          in your environment. Once set, funnel metrics (calculator starts, step completions, PDF
          downloads) will appear here.
        </p>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/pricing" className="focus-ring block">
          <Card className="p-5 transition-shadow hover:shadow-premium-lg">
            <h3 className="font-semibold text-foreground">Edit Pricing</h3>
            <p className="mt-1 text-sm text-foreground-muted">
              Countries, cities, implant brands, treatments, and procedures.
            </p>
          </Card>
        </Link>
        <Link href="/admin/campaigns" className="focus-ring block">
          <Card className="p-5 transition-shadow hover:shadow-premium-lg">
            <h3 className="font-semibold text-foreground">Discount Campaigns</h3>
            <p className="mt-1 text-sm text-foreground-muted">
              Create and manage promotional pricing campaigns.
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
