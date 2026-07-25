import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Guides on dental implant cost, financing, insurance, and treatment options from ${siteConfig.name}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Blog</h1>
          <p className="mt-3 text-foreground-muted">
            Plain-language guides on dental implant cost, insurance, and financing.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {getAllBlogPosts().map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="focus-ring group flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 shadow-premium transition hover:shadow-premium-lg"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {post.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold text-foreground group-hover:text-brand-600">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-foreground-muted">
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-brand-600">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
