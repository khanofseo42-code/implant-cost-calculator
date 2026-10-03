import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight, FileText, Lightbulb, Search } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BlogCoverArt, BlogHeroArt } from "@/components/blog/illustrations";
import { getAllBlogPosts, type BlogPost } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Blog",
  description: `Guides on dental implant cost, financing, insurance, and treatment options from ${siteConfig.name}.`,
  alternates: { canonical: "/blog" },
};

const POSTS_PER_PAGE = 6;

/** Filter chips always shown in this order; any other category found in posts is appended. */
const BASE_CATEGORIES = ["Financing", "Insurance", "Treatment Comparison", "Cost Guide", "General"];

const CATEGORY_TONES: Record<string, string> = {
  financing: "bg-brand-50 text-brand-600",
  insurance: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  "treatment comparison": "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  "cost guide": "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
};

const toSlug = (s: string) => s.toLowerCase().trim().replace(/\s+/g, "-");

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function blogHref(params: { q?: string; category?: string; page?: number }) {
  const sp = new URLSearchParams();
  if (params.q) sp.set("q", params.q);
  if (params.category) sp.set("category", params.category);
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  const qs = sp.toString();
  return qs ? `/blog?${qs}` : "/blog";
}

function matchesQuery(post: BlogPost, q: string) {
  const haystack = [post.title, post.excerpt, post.category, ...post.keywords].join(" ").toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-border-subtle bg-surface p-2 shadow-premium transition-all duration-200 hover:-translate-y-1 hover:shadow-premium-lg">
      <div className="relative aspect-[3/1] overflow-hidden rounded-xl bg-surface-muted">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt=""
            fill
            sizes="(min-width: 768px) 540px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <BlogCoverArt
            category={post.category}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-4">
        <span
          className={cn(
            "w-fit rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide",
            CATEGORY_TONES[post.category.toLowerCase()] ?? "bg-surface-muted text-foreground-muted"
          )}
        >
          {post.category}
        </span>
        <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-brand-600">
          <Link href={`/blog/${post.slug}`} className="focus-ring rounded after:absolute after:inset-0 after:rounded-2xl">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-foreground-muted">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between text-[13px]">
          {post.date && (
            <time dateTime={post.date} className="inline-flex items-center gap-2 text-foreground-muted">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.date)}
            </time>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-brand-600">
            Read more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const q = (typeof sp.q === "string" ? sp.q : "").trim();
  const categorySlug = typeof sp.category === "string" ? sp.category : "";
  const requestedPage = Math.max(1, Number(sp.page) || 1);

  const allPosts = getAllBlogPosts();
  const categories = [
    ...BASE_CATEGORIES,
    ...Array.from(new Set(allPosts.map((p) => p.category))).filter(
      (c) => !BASE_CATEGORIES.some((b) => b.toLowerCase() === c.toLowerCase())
    ),
  ];

  const filtered = allPosts.filter(
    (post) => (!categorySlug || toSlug(post.category) === categorySlug) && (!q || matchesQuery(post, q))
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const page = Math.min(requestedPage, totalPages);
  const posts = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const chipClass = (active: boolean) =>
    cn(
      "focus-ring whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
      active
        ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/25"
        : "border-border-subtle bg-surface text-foreground/80 shadow-premium hover:border-brand-200 hover:text-brand-600"
    );
  const pageBtn = "focus-ring flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-brand-50/50 to-background px-4 pb-8 pt-10 sm:pt-12">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-600 shadow-premium">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Blog
              </span>
              <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
                Implant<span className="text-gradient-brand">IQ Blog</span>
              </h1>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground-muted">
                Plain-language guides on dental implant cost, insurance, and financing.
              </p>

              <form action="/blog" method="get" role="search" className="mt-7 flex max-w-xl items-center gap-2 rounded-full border border-border-subtle bg-surface p-1.5 pl-5 shadow-premium-lg">
                <Search className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <label htmlFor="blog-search" className="sr-only">
                  Search articles
                </label>
                <input
                  id="blog-search"
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search articles, topics, or keywords..."
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-foreground-muted"
                />
                {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
                <button
                  type="submit"
                  className="focus-ring shrink-0 rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition-colors hover:bg-brand-700"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="animate-fade-in relative mx-auto hidden aspect-[52/30] w-full max-w-[520px] sm:block">
              <BlogHeroArt className="absolute inset-0 h-full w-full" />
              <div className="absolute right-0 top-[14%] flex w-[150px] items-center gap-2.5 rounded-2xl border border-white/80 bg-surface/95 p-3.5 shadow-premium-lg backdrop-blur">
                <Lightbulb className="h-7 w-7 shrink-0 text-accent-500" strokeWidth={1.8} aria-hidden="true" />
                <p className="text-[11px] leading-snug text-foreground-muted">
                  Expert insights for smarter <span className="font-semibold text-foreground">decisions</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl">
            {/* Category filters */}
            <nav aria-label="Blog categories" className="-mx-4 overflow-x-auto px-4 pb-2 pt-1">
              <ul className="flex gap-3">
                <li>
                  <Link href={blogHref({ q })} className={chipClass(!categorySlug)} aria-current={!categorySlug ? "page" : undefined}>
                    All Posts
                  </Link>
                </li>
                {categories.map((c) => {
                  const active = categorySlug === toSlug(c);
                  return (
                    <li key={c}>
                      <Link
                        href={blogHref({ q, category: toSlug(c) })}
                        className={chipClass(active)}
                        aria-current={active ? "page" : undefined}
                      >
                        {c}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {q && (
              <p className="mt-5 text-sm text-foreground-muted">
                {filtered.length} result{filtered.length === 1 ? "" : "s"} for &ldquo;
                <span className="font-semibold text-foreground">{q}</span>&rdquo; ·{" "}
                <Link href={blogHref({ category: categorySlug })} className="font-medium text-brand-600 hover:underline">
                  Clear search
                </Link>
              </p>
            )}

            {posts.length > 0 ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-border-strong bg-surface px-6 py-16 text-center">
                <p className="text-lg font-semibold text-foreground">No articles found</p>
                <p className="mt-2 text-sm text-foreground-muted">Try a different keyword or browse all posts.</p>
                <Link href="/blog" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline">
                  View all posts <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Pagination */}
            {posts.length > 0 && (
              <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2.5">
                {page > 1 ? (
                  <Link href={blogHref({ q, category: categorySlug, page: page - 1 })} aria-label="Previous page" className={cn(pageBtn, "border-border-subtle bg-surface text-foreground hover:text-brand-600")}>
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <span aria-hidden="true" className={cn(pageBtn, "border-border-subtle bg-surface text-foreground-muted/50")}>
                    <ChevronLeft className="h-4 w-4" />
                  </span>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    href={blogHref({ q, category: categorySlug, page: n })}
                    aria-current={n === page ? "page" : undefined}
                    className={cn(
                      pageBtn,
                      n === page
                        ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-600/30"
                        : "border-border-subtle bg-surface text-foreground hover:text-brand-600"
                    )}
                  >
                    {n}
                  </Link>
                ))}
                {page < totalPages ? (
                  <Link href={blogHref({ q, category: categorySlug, page: page + 1 })} aria-label="Next page" className={cn(pageBtn, "border-border-subtle bg-surface text-foreground hover:text-brand-600")}>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <span aria-hidden="true" className={cn(pageBtn, "border-border-subtle bg-surface text-foreground-muted/50")}>
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </nav>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
