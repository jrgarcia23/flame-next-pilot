import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListTemplate from "@/components/templates/CategoryListTemplate";
import { getCategoryListingAsync, getAllCategories, categoryLabel } from "@/lib/blog";
import { POSTS_PER_PAGE } from "@/lib/category-meta";

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { slug: string; page: string }[] = [];
  for (const c of getAllCategories("en")) {
    const posts = await getCategoryListingAsync(c.slug, "en");
    const total = Math.ceil(posts.length / POSTS_PER_PAGE);
    for (let n = 2; n <= total; n++) {
      params.push({ slug: c.slug, page: String(n) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const label = categoryLabel(slug, "en");
  return {
    title: `${label} · Page ${page} · Flame Analytics Community`,
    description: `${label} articles on Flame Analytics — page ${page}.`,
    alternates: { canonical: `/en/category/${slug}/page/${page}/` },
  };
}

export default async function CategoryPageEn({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const posts = await getCategoryListingAsync(slug, "en");
  const n = parseInt(page, 10);
  if (!Number.isFinite(n) || n < 2 || !posts.length) return notFound();
  return <CategoryListTemplate lang="en" categorySlug={slug} posts={posts} currentPage={n} />;
}
