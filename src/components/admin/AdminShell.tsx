"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  ShieldCheck,
  Landmark,
  Percent,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pricing", label: "Pricing", icon: Tags },
  { href: "/admin/insurance", label: "Insurance", icon: ShieldCheck },
  { href: "/admin/finance", label: "Finance", icon: Landmark },
  { href: "/admin/campaigns", label: "Campaigns", icon: Percent },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border-subtle bg-surface p-5 lg:block">
        <Link href="/" className="mb-8 flex items-center gap-2 text-sm font-semibold text-foreground">
          ImplantIQ Admin
        </Link>
        <nav className="space-y-1" aria-label="Admin navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-foreground-muted hover:bg-surface-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 space-y-1 border-t border-border-subtle pt-4">
          <Link
            href="/"
            className="focus-ring flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <button
            onClick={handleLogout}
            className="focus-ring flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger/10"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 px-4 py-8 sm:px-8 lg:py-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
