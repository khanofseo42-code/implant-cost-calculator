"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

/** Primary nav links; the link matching the current route gets a brand underline. */
export function NavLinks({ links }: { links: { label: string; url: string }[] }) {
  const pathname = usePathname();

  return (
    <nav className="hidden h-full items-center gap-9 md:flex" aria-label="Primary">
      {links.map((link) => {
        const active = !link.url.includes("#") && (pathname === link.url || pathname.startsWith(`${link.url}/`));
        return (
          <Link
            key={link.label}
            href={link.url}
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-ring relative flex h-full items-center text-sm font-medium transition-colors hover:text-brand-600",
              active
                ? "text-brand-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-brand-600"
                : "text-foreground/80"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
