// CRUD server-side de los posts gestionados desde /admin/posts/.
// Vive separado de lib/blog.ts a propósito: lib/blog.ts es el reader público
// (importa data/blog.json + merge con esta tabla), este módulo es el writer.

import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import type { Lang } from "@/lib/blog";

export type CmsPost = {
  id: number;
  slug: string;
  lang: Lang;
  type: "post" | "page" | "whitepaper";
  title: string;
  excerpt: string;
  html: string;
  date: string;
  modified: string;
  hero: string;
  thumbnail: string;
  category_slug: string;
  category_name: string;
  status: "draft" | "published";
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

export type CmsPostInput = {
  id?: number;
  slug: string;
  lang: Lang;
  title: string;
  excerpt?: string;
  html: string;
  date?: string;
  hero?: string;
  thumbnail?: string;
  category_slug: string;
  category_name: string;
  status: "draft" | "published";
  type?: "post" | "page" | "whitepaper";
  actor_email?: string;
};

const TABLE = "blog_posts";

/** Lista todos los posts del CMS — usar para el listado /admin/posts/ y para el merge. */
export async function listAllCmsPosts(): Promise<CmsPost[]> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.from(TABLE).select("*").order("date", { ascending: false });
  if (error) {
    console.error("[cms-posts] listAllCmsPosts error:", error.message);
    return [];
  }
  return (data || []) as CmsPost[];
}

/** Solo posts publicados con date <= ahora — para el reader público.
 * Los posts con status="published" y date futuro se consideran "programados":
 * existen en la tabla pero no salen al público hasta que pase su fecha.
 */
export async function listPublishedCmsPosts(): Promise<CmsPost[]> {
  const db = createSupabaseAdminClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await db.from(TABLE)
    .select("*")
    .eq("status", "published")
    .lte("date", nowIso)
    .order("date", { ascending: false });
  if (error) {
    console.error("[cms-posts] listPublishedCmsPosts error:", error.message);
    return [];
  }
  return (data || []) as CmsPost[];
}

export async function getCmsPostById(id: number): Promise<CmsPost | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as CmsPost;
}

export async function getCmsPostBySlug(lang: Lang, slug: string): Promise<CmsPost | null> {
  const db = createSupabaseAdminClient();
  const { data, error } = await db.from(TABLE).select("*").eq("lang", lang).eq("slug", slug).maybeSingle();
  if (error || !data) return null;
  return data as CmsPost;
}

/** Inserta o actualiza un post. Si trae id, actualiza; si no, inserta. */
export async function upsertCmsPost(input: CmsPostInput): Promise<{ ok: true; post: CmsPost } | { ok: false; error: string }> {
  const db = createSupabaseAdminClient();
  const now = new Date().toISOString();
  const payload = {
    slug: input.slug,
    lang: input.lang,
    type: input.type || "post",
    title: input.title,
    excerpt: input.excerpt || "",
    html: input.html,
    date: input.date || now,
    modified: now,
    hero: input.hero || "",
    thumbnail: input.thumbnail || "",
    category_slug: input.category_slug,
    category_name: input.category_name,
    status: input.status,
    updated_by: input.actor_email || null,
  };

  if (input.id) {
    const { data, error } = await db.from(TABLE).update(payload).eq("id", input.id).select("*").single();
    if (error) return { ok: false, error: error.message };
    return { ok: true, post: data as CmsPost };
  }

  const { data, error } = await db.from(TABLE).insert({ ...payload, created_by: input.actor_email || null }).select("*").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, post: data as CmsPost };
}

export async function deleteCmsPost(id: number): Promise<{ ok: boolean; error?: string }> {
  const db = createSupabaseAdminClient();
  const { error } = await db.from(TABLE).delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
