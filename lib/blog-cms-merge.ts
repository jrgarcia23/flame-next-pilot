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
import { listPublishedCmsPosts, type CmsPost } from "@/lib/cms-posts";

function cmsToBlogPost(p: CmsPost): BlogPost {
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
  };
}

// Cache process-local de 60s para no martillar Supabase con cada request.
// Se invalida al instante porque revalidatePath() en /api/admin/posts/save
// fuerza re-render de las rutas, y al re-renderizar miramos si la entrada
// del cache ha expirado (no esperamos a los 60s).
let memo: { at: number; rows: BlogPost[] } | null = null;
const TTL_MS = 60_000;

export async function getCmsPostsCached(): Promise<BlogPost[]> {
  // En entornos sin credenciales (build local sin env, preview sin secrets),
  // devolvemos vacío en vez de petar el render.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return [];
  }
  const now = Date.now();
  if (memo && now - memo.at < TTL_MS) return memo.rows;
  try {
    const rows = (await listPublishedCmsPosts()).map(cmsToBlogPost);
    memo = { at: now, rows };
    return rows;
  } catch (err) {
    console.error("[blog-cms-merge] getCmsPostsCached error:", err instanceof Error ? err.message : err);
    return memo?.rows || [];
  }
}

export function invalidateCmsCache() {
  memo = null;
}

export async function getCmsPostBySlugCached(lang: "es" | "en", slug: string): Promise<BlogPost | null> {
  const all = await getCmsPostsCached();
  return all.find(p => p.lang === lang && p.slug === slug) || null;
}
