import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LinkButton } from "@/components/ui/LinkButton";
import { BrandWordmark, ToothMark } from "./illustrations";
import { NavLinks } from "./NavLinks";
import headerContent from "@content/settings/header.json";

export function SiteHeader() {
  const { logoText, logoImage, navLinks, ctaText, ctaUrl } = headerContent;

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle/60 bg-surface/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-12 px-4 lg:px-0">
        <Link href="/" className="focus-ring flex items-center gap-2.5 rounded-lg">
          {logoImage ? (
            <Image src={logoImage} alt={logoText} width={40} height={40} className="h-10 w-10 rounded-xl object-contain" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 shadow-md shadow-brand-500/30">
              <ToothMark className="h-5.5 w-5.5" />
            </span>
          )}
          <BrandWordmark text={logoText} className="text-lg font-bold tracking-tight" />
        </Link>

        <NavLinks links={navLinks} />

        <div className="ml-auto flex items-center gap-4">
          <ThemeToggle />
          <LinkButton
            href={ctaUrl}
            size="sm"
            className="hidden h-11 px-6 font-semibold shadow-md shadow-brand-600/25 sm:inline-flex"
          >
            {ctaText}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
