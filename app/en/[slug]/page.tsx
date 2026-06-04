import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import InterviewPostTemplate from "@/components/templates/InterviewPostTemplate";
import ElementorPostPage from "@/components/templates/ElementorPostPage";
import { getPost, getAllPostSlugs, shortExcerpt } from "@/lib/blog";
import { getElementorContent } from "@/lib/elementor-special-posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs("en").map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug, "en");
  if (!post) return { title: "Not found · Flame Analytics" };
  const titleText = post.title.replace(/<[^>]+>/g, "").trim();
  const descText = (post.excerpt || shortExcerpt(post.html, 160)).slice(0, 160);
  return {
    title: `${titleText} · Flame Analytics`,
    description: descText,
    alternates: {
      canonical: `/en/${slug}/`,
      languages: { en: `/en/${slug}/`, "x-default": `/en/${slug}/` },
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
  const post = getPost(slug, "en");
  if (!post) return notFound();

  const elementor = getElementorContent(slug);

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
        mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/en/${slug}/` },
      })}} />
      {elementor
        ? <ElementorPostPage lang="en" post={post} content={elementor} />
        : post.category.slug === "interviews"
          ? <InterviewPostTemplate post={post} />
          : <BlogPostTemplate post={post} />
      }
    </>
  );
}
