// Capa que mergea posts del CMS embebido (Supabase) con los legacy (data/blog.json).
//
// Estrategia:
//  - Reads en runtime van vía unstable_cache con tag "cms-posts" (revalida cada 5 min
//    o cuando el API /api/admin/posts/save dispara revalidateTag).
//  - Las funciones del reader devuelven BlogPost en el mismo shape que lib/blog.ts
//    para que todas las plantillas existentes (BlogPostTemplate, InterviewPostTemplate,
//    CategoryListTemplate, related, schemas, sitemap) sigan funcionando sin tocar nada.
//  - Si dos posts coinciden en (lang, slug), el del CMS gana sobre el legacy: permite
//    sobreescribir/republicar un slug viejo desde el editor sin perder datos del JSON.
//
// IMPORTANTE: este módulo es server-only. NO importar desde componentes "use client".

import "server-only";
import type { BlogPost } from "@/lib/blog";
import { listAllCmsPosts, type CmsPost } from "@/lib/cms-posts";

type CmsRow = BlogPost & { status: "draft" | "published" };

function cmsToBlogPost(p: CmsPost): CmsRow {
  return {
    id: p.id,
    slug: p.slug,
    lang: p.lang,
    type: p.type,
    title: p.title,
    excerpt: p.excerpt || "",
    html: p.html || "",
    date: p.date,
    modified: p.modified,
    hero: p.hero || "",
    thumbnail: p.thumbnail || p.hero || "",
    category: { slug: p.category_slug, name: p.category_name },
    link_legacy: "",
    status: p.status,
  };
}

// Cache process-local de 60s para no martillar Supabase con cada request.
// Se invalida al instante porque /api/admin/posts/save llama a invalidateCmsCache().
let memo: { at: number; rows: CmsRow[] } | null = null;
const TTL_MS = 60_000;

async function getCmsRowsCached(): Promise<CmsRow[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }
  const now = Date.now();
  if (memo && now - memo.at < TTL_MS) return memo.rows;
  try {
    const rows = (await listAllCmsPosts()).map(cmsToBlogPost);
    memo = { at: now, rows };
    return rows;
  } catch (err) {
    console.error("[blog-cms-merge] getCmsRowsCached error:", err instanceof Error ? err.message : err);
    return memo?.rows || [];
  }
}

/** Devuelve sólo los publicados, sin la columna status. Para el reader público. */
export async function getCmsPostsCached(): Promise<BlogPost[]> {
  const rows = await getCmsRowsCached();
  return rows.filter(r => r.status === "published").map(({ status: _s, ...rest }) => rest);
}

/** Set "{lang}::{slug}" para TODAS las entradas del CMS (draft + published).
 * Sirve para "tapar" un legacy que ha sido promovido al CMS, aunque esté en draft.
 */
export async function getCmsTakenKeysCached(): Promise<Set<string>> {
  const rows = await getCmsRowsCached();
  return new Set(rows.map(r => `${r.lang}::${r.slug}`));
}

export function invalidateCmsCache() {
  memo = null;
}

export async function getCmsPostBySlugCached(lang: "es" | "en", slug: string): Promise<BlogPost | null> {
  const all = await getCmsPostsCached();
  return all.find(p => p.lang === lang && p.slug === slug) || null;
}

export async function isCmsSlugClaimed(lang: "es" | "en", slug: string): Promise<boolean> {
  const keys = await getCmsTakenKeysCached();
  return keys.has(`${lang}::${slug}`);
}
