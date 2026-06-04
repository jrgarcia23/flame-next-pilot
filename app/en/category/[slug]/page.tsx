import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListTemplate from "@/components/templates/CategoryListTemplate";
import { getCategoryListing, getAllCategories, categoryLabel } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories("en").map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabel(slug, "en");
  return {
    title: `${label} · Flame Analytics Community`,
    description: `${label} articles on Flame Analytics.`,
    alternates: { canonical: `/en/category/${slug}/` },
  };
}

export default async function CategoryEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getCategoryListing(slug, "en");
  if (!posts.length) return notFound();
  return <CategoryListTemplate lang="en" categorySlug={slug} posts={posts} currentPage={1} />;
}
