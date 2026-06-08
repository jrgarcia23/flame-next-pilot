import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import InterviewPostTemplate from "@/components/templates/InterviewPostTemplate";
import ElementorPostPage from "@/components/templates/ElementorPostPage";
import { getPost, getAllPostSlugs, shortExcerpt, hasInlineFaq } from "@/lib/blog";
import { getElementorContent } from "@/lib/elementor-special-posts";
import { blogPostingSchema, breadcrumbSchema, faqSchema, postBreadcrumb } from "@/lib/schema";
import { getFaqForSlug } from "@/lib/faqs";

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
  return {
    title: `${titleText} · Flame Analytics`,
    description: descText,
    alternates: {
      canonical: `/es/${slug}/`,
      languages: { es: `/es/${slug}/`, "x-default": `/es/${slug}/` },
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

  // Schemas: BlogPosting + Breadcrumb siempre, FAQ si el slug mapea a un topic.
  const schemas: unknown[] = [
    blogPostingSchema(post, "es"),
    breadcrumbSchema(postBreadcrumb(post, "es")),
  ];
  // Solo inyectamos FAQ genérico si el HTML del post no trae ya un bloque FAQ propio.
  if (!hasInlineFaq(post.html)) {
    const faq = getFaqForSlug(slug, "es");
    if (faq) schemas.push(faqSchema(faq));
  }

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
