import type { ReactNode } from "react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";

interface LegalPageShellProps {
  title: string;
  updated?: string;
  children: ReactNode;
}

export function LegalPageShell({ title, updated, children }: LegalPageShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          {updated && (
            <p className="mt-2 text-sm text-foreground-muted">Last updated: {updated}</p>
          )}
          <div className="legal-prose mt-10">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
