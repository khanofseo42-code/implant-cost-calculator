import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LinkButton } from "@/components/ui/LinkButton";
import headerContent from "@content/settings/header.json";

export function SiteHeader() {
  const { logoText, logoImage, navLinks, ctaText, ctaUrl } = headerContent;

  return (
    <header className="sticky top-0 z-40 glass-panel border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg">
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

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.url}
              className="focus-ring rounded text-sm font-medium text-foreground-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LinkButton href={ctaUrl} size="sm" className="hidden sm:inline-flex">
            {ctaText}
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
