import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import footerContent from "@content/settings/footer.json";

export function SiteFooter() {
  const { logoText, logoImage, bioText, productLinks, companyLinks, legalLinks, socialLinks, copyrightText } =
    footerContent;

  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2">
              {logoImage ? (
                <Image src={logoImage} alt={logoText} width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>
              )}
              <span className="text-[17px] font-semibold tracking-tight text-foreground">
                {logoText}
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{bioText}</p>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-foreground"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.url} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.url} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="mt-3 space-y-2 text-sm text-foreground-muted">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.url} className="hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border-subtle pt-6 text-xs leading-relaxed text-foreground-muted">
          <p>
            {logoText} {copyrightText} &copy; {new Date().getFullYear()} {siteConfig.legalName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
