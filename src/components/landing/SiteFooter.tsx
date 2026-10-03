import Link from "next/link";
import Image from "next/image";
import { BrandWordmark, ToothMark } from "./illustrations";
import footerContent from "@content/settings/footer.json";

/** Filled social glyphs on a 24×24 grid; Instagram is drawn as strokes. */
const socialIcons: Record<string, React.ReactNode> = {
  twitter: (
    <path d="M23 5.1a9 9 0 0 1-2.6.7 4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1A4.5 4.5 0 0 0 11.8 8.5 12.8 12.8 0 0 1 2.5 3.8a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.8a12.8 12.8 0 0 0 6.9 2c8.3 0 12.8-6.9 12.8-12.8v-.6A9 9 0 0 0 23 5.1Z" />
  ),
  facebook: (
    <path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 12 2Z" />
  ),
  instagram: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </g>
  ),
  linkedin: (
    <path d="M4.5 9h3.6v11H4.5V9Zm1.8-5.5a2 2 0 1 1 0 4.1 2 2 0 0 1 0-4.1ZM10.3 9h3.4v1.5h.1c.5-.9 1.6-1.8 3.3-1.8 3.6 0 4.2 2.3 4.2 5.3v6H17.7v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V20h-3.6V9Z" />
  ),
  youtube: (
    <path d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.1 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-4.8 29 29 0 0 0-.4-4.8ZM9.8 15.1V8.9l5.6 3.1-5.6 3.1Z" />
  ),
};

function socialKey(platform: string) {
  const p = platform.toLowerCase();
  return Object.keys(socialIcons).find((k) => p.includes(k)) ?? (p.includes("x") ? "twitter" : undefined);
}

function FooterColumn({ title, links }: { title: string; links: { label: string; url: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm text-foreground-muted">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.url} className="transition-colors hover:text-brand-600">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { logoText, logoImage, bioText, productLinks, companyLinks, legalLinks, socialLinks, copyrightText } =
    footerContent;

  return (
    <footer className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-14 lg:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="focus-ring inline-flex items-center gap-2.5 rounded-lg">
              {logoImage ? (
                <Image src={logoImage} alt={logoText} width={40} height={40} className="h-10 w-10 rounded-xl object-contain" />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-md shadow-brand-500/30">
                  <ToothMark className="h-5.5 w-5.5" />
                </span>
              )}
              <BrandWordmark text={logoText} className="text-xl font-bold tracking-tight" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">{bioText}</p>
            {socialLinks.length > 0 && (
              <ul className="mt-6 flex flex-wrap items-center gap-3">
                {socialLinks.map((social) => {
                  const key = socialKey(social.platform);
                  return (
                    <li key={social.platform}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors hover:bg-brand-600 hover:text-white"
                      >
                        {key ? (
                          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
                            {socialIcons[key]}
                          </svg>
                        ) : (
                          <span className="text-sm">{social.platform}</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-8 sm:grid-cols-[auto_auto_auto] lg:gap-x-20">
            <FooterColumn title="Product" links={productLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-7 text-center text-xs leading-relaxed text-foreground-muted">
          <p className="mx-auto max-w-3xl">
            {logoText} {copyrightText} &copy; {new Date().getFullYear()} {logoText}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
