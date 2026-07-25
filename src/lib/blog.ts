import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");

export type BlogSchemaType = "BlogPosting" | "Article" | "MedicalWebPage" | "FAQPage";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  readingMinutes: number;
  featuredImage: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  schemaType: BlogSchemaType;
  customSchema: string;
  contentHtml: string;
}

function readPostFile(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const slug = (data.slug as string | undefined) || filename.replace(/\.md$/, "");

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    updated: data.updated || data.date || "",
    author: data.author ?? "ImplantIQ Editorial Team",
    category: data.category ?? "General",
    readingMinutes: Number(data.readingMinutes) || 5,
    featuredImage: data.featuredImage ?? "",
    excerpt: data.excerpt ?? "",
    metaTitle: data.metaTitle || data.title || slug,
    metaDescription: data.metaDescription || data.excerpt || "",
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    canonicalUrl: data.canonicalUrl ?? "",
    ogImage: data.ogImage || data.featuredImage || "",
    schemaType: (data.schemaType as BlogSchemaType) || "BlogPosting",
    customSchema: data.customSchema ?? "",
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((p) => p.slug === slug);
}
