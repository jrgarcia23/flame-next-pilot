import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import { getWhitepaper, getAllWhitepaperSlugs, shortExcerpt, hasInlineFaq } from "@/lib/blog";
import { blogPostingSchema, breadcrumbSchema, faqSchema, postBreadcrumb } from "@/lib/schema";
import { getFaqForSlug } from "@/lib/faqs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWhitepaperSlugs("es").map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wp = getWhitepaper(slug, "es");
  if (!wp) return { title: "No encontrado · Flame Analytics" };
  const titleText = wp.title.replace(/<[^>]+>/g, "").trim();
  const descText = (wp.excerpt || shortExcerpt(wp.html, 160)).slice(0, 160);
  return {
    title: `${titleText} · Whitepaper · Flame Analytics`,
    description: descText,
    alternates: { canonical: `/es/whitepaper/${slug}/` },
  };
}

export default async function WhitepaperEs({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wp = getWhitepaper(slug, "es");
  if (!wp) return notFound();

  const schemas: unknown[] = [
    blogPostingSchema(wp, "es"),
    breadcrumbSchema(postBreadcrumb(wp, "es")),
  ];
  if (!hasInlineFaq(wp.html)) {
    const faq = getFaqForSlug(slug, "es");
    if (faq) schemas.push(faqSchema(faq));
  }

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <BlogPostTemplate post={wp} />
    </>
  );
}
