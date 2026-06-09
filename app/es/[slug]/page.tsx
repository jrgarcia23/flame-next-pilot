import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import InterviewPostTemplate from "@/components/templates/InterviewPostTemplate";
import ElementorPostPage from "@/components/templates/ElementorPostPage";
import { getPost, getAllPostSlugs, shortExcerpt } from "@/lib/blog";
import { getElementorContent } from "@/lib/elementor-special-posts";
import { blogPostingSchema, breadcrumbSchema, postBreadcrumb } from "@/lib/schema";
import { getOtherLangSlug } from "@/lib/lang-pairs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs("es").map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "es");
  if (!post) return { title: "No encontrado · Flame Analytics" };
  const titleText = post.title.replace(/<[^>]+>/g, "").trim();
  const descText = (post.excerpt || shortExcerpt(post.html, 160)).slice(0, 160);
  const enSlug = getOtherLangSlug(slug, "es");
  const languages: Record<string, string> = { es: `/es/${slug}/`, "x-default": `/es/${slug}/` };
  if (enSlug) languages.en = `/en/${enSlug}/`;
  return {
    title: `${titleText} · Flame Analytics`,
    description: descText,
    alternates: {
      canonical: `/es/${slug}/`,
      languages,
    },
    openGraph: {
      title: titleText,
      description: descText,
      url: `/es/${slug}/`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.hero ? [{ url: post.hero }] : undefined,
    },
  };
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flameanalytics.com";

export default async function PostEs({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug, "es");
  if (!post) return notFound();

  // Posts especiales con maquetación Elementor preservada (flame-talks-2026, etc.)
  const elementor = getElementorContent(slug);

  // Schemas mínimos para post: BlogPosting + Breadcrumb. FAQ no aplica aquí
  // (vive en páginas servicio vía SectorTemplate/ProductTemplate o embedida en el HTML).
  const schemas: unknown[] = [
    blogPostingSchema(post, "es"),
    breadcrumbSchema(postBreadcrumb(post, "es")),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {elementor
        ? <ElementorPostPage lang="es" post={post} content={elementor} />
        : post.category.slug === "entrevistas"
          ? <InterviewPostTemplate post={post} />
          : <BlogPostTemplate post={post} />
      }
    </>
  );
}
