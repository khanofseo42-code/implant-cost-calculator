import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { blogPosts, getBlogPost } from "@/config/blog";
import { siteConfig } from "@/config/site";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = [
    buildArticleSchema({
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: siteConfig.url },
      { name: "Blog", url: `${siteConfig.url}/blog` },
      { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
    ]),
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SiteHeader />
      <main className="flex-1 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="focus-ring inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-brand-600">
            {post.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground-muted">
            <span>
              Published{" "}
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <div className="legal-prose mt-8">
            {post.content.map((block, i) => {
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "ul")
                return (
                  <ul key={i}>
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <div className="mt-12 rounded-2xl border border-border-subtle bg-surface-muted p-6 text-center">
            <p className="text-sm text-foreground-muted">
              Ready to see what this looks like for your own situation?
            </p>
            <Link
              href="/calculator"
              className="focus-ring mt-3 inline-block rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Start your free estimate
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
