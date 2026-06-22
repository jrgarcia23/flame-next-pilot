import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import InterviewPostTemplate from "@/components/templates/InterviewPostTemplate";
import ElementorPostPage from "@/components/templates/ElementorPostPage";
import { getPostAsync, getAllPostSlugs, shortExcerpt } from "@/lib/blog";
import { getElementorContent } from "@/lib/elementor-special-posts";
import { blogPostingSchema, breadcrumbSchema, faqSchemaFromHtml, postBreadcrumb } from "@/lib/schema";
import { getOtherLangSlug } from "@/lib/lang-pairs";

export const dynamicParams = true;

export function generateStaticParams() {
  return getAllPostSlugs("en").map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostAsync(slug, "en");
  if (!post) return { title: "Not found · Flame Analytics" };
  const titleText = post.title.replace(/<[^>]+>/g, "").trim();
  const descText = (post.excerpt || shortExcerpt(post.html, 160)).slice(0, 160);
  const esSlug = getOtherLangSlug(slug, "en");
  // x-default por defecto apunta a ES (default del middleware) si hay versión ES;
  // si no, queda apuntando a la URL EN como fallback.
  const languages: Record<string, string> = { en: `/en/${slug}/` };
  if (esSlug) {
    languages.es = `/es/${esSlug}/`;
    languages["x-default"] = `/es/${esSlug}/`;
  } else {
    languages["x-default"] = `/en/${slug}/`;
  }
  return {
    title: `${titleText} · Flame Analytics`,
    description: descText,
    alternates: {
      canonical: `/en/${slug}/`,
      languages,
    },
    openGraph: {
      title: titleText,
      description: descText,
      url: `/en/${slug}/`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.hero ? [{ url: post.hero }] : undefined,
    },
  };
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flameanalytics.com";

export default async function PostEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostAsync(slug, "en");
  if (!post) return notFound();

  const elementor = getElementorContent(slug);

  const schemas: unknown[] = [
    blogPostingSchema(post, "en"),
    breadcrumbSchema(postBreadcrumb(post, "en")),
  ];
  const faqPage = faqSchemaFromHtml(post.html);
  if (faqPage) schemas.push(faqPage);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {elementor
        ? <ElementorPostPage lang="en" post={post} content={elementor} />
        : post.category.slug === "interviews"
          ? <InterviewPostTemplate post={post} />
          : <BlogPostTemplate post={post} />
      }
    </>
  );
}
