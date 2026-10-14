import type { Metadata } from "next";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import { blogPostingSchema, breadcrumbSchema, faqSchemaFromHtml } from "@/lib/schema";
import type { DraftComparison } from "@/lib/draft-comparisons";

// Metadata común de las comparativas EN servidas fuera de blog.json.
// `noindex` controla el robots: true mientras la pieza espera el OK de JR.
export function draftComparisonMetadata(d: DraftComparison, noindex: boolean): Metadata {
  const { post } = d;
  const url = `/en/${post.slug}/`;
  return {
    title: { absolute: d.seoTitle },
    description: d.seoDescription,
    alternates: { canonical: url, languages: { en: url, "x-default": url } },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: d.seoTitle,
      description: d.seoDescription,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.hero ? [{ url: post.hero }] : undefined,
    },
  };
}

export default async function DraftComparisonPage({ d }: { d: DraftComparison }) {
  const { post } = d;
  const schemas: unknown[] = [
    blogPostingSchema(post, "en"),
    breadcrumbSchema([
      { name: "Home", url: "/en/" },
      { name: post.category.name, url: `/en/category/${post.category.slug}/` },
      { name: post.title, url: `/en/${post.slug}/` },
    ]),
  ];
  const faqPage = faqSchemaFromHtml(post.html);
  if (faqPage) schemas.push(faqPage);

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <BlogPostTemplate post={post} />
    </>
  );
}
