import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import { getPost, getAllPostSlugs, shortExcerpt } from "@/lib/blog";

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

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://flameanalytics.com";

export default async function PostEs({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug, "es");
  if (!post) return notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title.replace(/<[^>]+>/g, ""),
        datePublished: post.date,
        dateModified: post.modified,
        author: { "@type": "Organization", name: "Flame Analytics" },
        publisher: { "@type": "Organization", name: "Flame Analytics", logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
        image: post.hero ? [post.hero.startsWith("http") ? post.hero : `${SITE}${post.hero}`] : undefined,
        articleSection: post.category.name,
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/es/${slug}/` },
      })}} />
      <BlogPostTemplate post={post} />
    </>
  );
}
