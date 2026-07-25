import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { CompareView } from "@/components/results/CompareView";

export const metadata: Metadata = {
  title: "Compare Saved Estimates",
  description: "Compare your saved dental implant cost estimates side by side.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Compare Estimates</h1>
        <p className="mt-2 max-w-2xl text-foreground-muted">
          Every estimate you save is stored privately in your browser so you can weigh treatment
          options side by side.
        </p>
        <div className="mt-8">
          <CompareView />
        </div>
      </main>
    </div>
  );
}
