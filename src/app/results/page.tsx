import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { ResultsContent } from "@/components/results/ResultsContent";

export const metadata: Metadata = {
  title: "Your Dental Implant Cost Estimate",
  description: "Your personalized, itemized dental implant cost estimate with financing and timeline details.",
  robots: { index: false, follow: false },
};

export default function ResultsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 bg-grid px-4 py-10 sm:py-14">
        <ResultsContent />
      </main>
    </div>
  );
}
