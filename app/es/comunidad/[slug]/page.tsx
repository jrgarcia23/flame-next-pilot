import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CommunityPostTemplate from "@/components/templates/CommunityPostTemplate";
import { getPostBySlug, getAllSlugs } from "@/lib/comunidad";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "No encontrado · Flame Analytics" };
  const titleText = post.title.replace(/<[^>]+>/g, "");
  const descText = post.excerpt.replace(/<[^>]+>/g, "").trim().slice(0, 160);
  return {
    title: `${titleText} · Flame Analytics`,
    description: descText,
  };
}

export default async function CommunityPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  return <CommunityPostTemplate post={post} />;
}
