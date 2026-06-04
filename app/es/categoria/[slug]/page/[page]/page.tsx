import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryListTemplate from "@/components/templates/CategoryListTemplate";
import { getCategoryListing, getAllCategories, categoryLabel } from "@/lib/blog";
import { POSTS_PER_PAGE } from "@/lib/category-meta";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { slug: string; page: string }[] = [];
  for (const c of getAllCategories("es")) {
    const posts = getCategoryListing(c.slug, "es");
    const total = Math.ceil(posts.length / POSTS_PER_PAGE);
    for (let n = 2; n <= total; n++) {
      params.push({ slug: c.slug, page: String(n) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const label = categoryLabel(slug, "es");
  return {
    title: `${label} · Página ${page} · Comunidad Flame Analytics`,
    description: `Artículos de ${label} en Flame Analytics — página ${page}.`,
    alternates: { canonical: `/es/categoria/${slug}/page/${page}/` },
  };
}

export default async function CategoriaPaginaEs({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const posts = getCategoryListing(slug, "es");
  const n = parseInt(page, 10);
  if (!Number.isFinite(n) || n < 2 || !posts.length) return notFound();
  return <CategoryListTemplate lang="es" categorySlug={slug} posts={posts} currentPage={n} />;
}
