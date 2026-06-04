import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListTemplate from "@/components/templates/CategoryListTemplate";
import { getCategoryListing, getAllCategories, categoryLabel } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories("es").map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabel(slug, "es");
  return {
    title: `${label} · Comunidad Flame Analytics`,
    description: `Artículos de ${label} en Flame Analytics.`,
    alternates: { canonical: `/es/categoria/${slug}/` },
  };
}

export default async function CategoriaEs({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getCategoryListing(slug, "es");
  if (!posts.length) return notFound();
  return <CategoryListTemplate lang="es" categorySlug={slug} posts={posts} currentPage={1} />;
}
