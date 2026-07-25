import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                <Sparkles className="h-4.5 w-4.5" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                <li><Link href="/calculator" className="hover:text-foreground">Calculator</Link></li>
                <li><Link href="/compare" className="hover:text-foreground">Compare Estimates</Link></li>
                <li><Link href="/#how-it-works" className="hover:text-foreground">How it works</Link></li>
                <li><Link href="/#faq" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                <li><Link href="/admin" className="hover:text-foreground">Admin</Link></li>
                <li><a href={`mailto:${siteConfig.contact.email}`} className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-xs leading-relaxed text-foreground-muted">
          <p>
            {siteConfig.name} provides educational cost estimates only and does not offer
            medical advice, diagnosis, or a binding treatment quote. Actual pricing depends on
            an in-person clinical evaluation. &copy; {new Date().getFullYear()} {siteConfig.legalName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
