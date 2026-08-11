// Lib de blog Flame. Lee de data/blog.json (525 posts + 89 pages + 25 whitepapers).
// URL plana: /es/<slug>/ y /en/<slug>/ (decisión del agente SEO 2026-06-03).
// Whitepapers: /es/whitepaper/<slug>/ y /en/whitepaper/<slug>/.
import data from "@/data/blog.json";
import { getOverride, applyOverride } from "./post-overrides";

export type Lang = "es" | "en";
export type PostType = "post" | "page" | "whitepaper";

export type Category = { slug: string; name: string };

export type BlogPost = {
  id: number;
  slug: string;
  lang: Lang;
  type: PostType;
  title: string;
  excerpt: string;
  html: string;
  date: string;
  modified: string;
  hero: string;
  thumbnail?: string;
  category: Category;
  link_legacy: string;
};

type DataShape = {
  generated_at: string;
  posts: BlogPost[];
  pages: BlogPost[];
  whitepapers: BlogPost[];
};

const D = data as DataShape;

// ---------- FILTRO DE STATUS ----------
// Solo los posts con status="published" aparecen en la web pública.
// Los "draft" (importados desde la demo WP) viven en el JSON pero no se
// listan ni son accesibles por URL. Sí son visibles desde /admin/content/.
function isPublic(p: BlogPost): boolean {
  // Cualquier valor distinto de "draft"/"pending"/"private" se considera público.
  // Default seguro: si el campo viene vacío, asumimos published (compat retro).
  const st = (p as { status?: string }).status;
  return !st || st === "published" || st === "publish";
}

// ---------- INDEX ----------
const byKey: Record<string, BlogPost> = {};
for (const p of [...D.posts, ...D.pages, ...D.whitepapers]) {
  byKey[`${p.type}/${p.lang}/${p.slug}`] = p;
}

export function getPost(slug: string, lang: Lang): BlogPost | null {
  const raw = byKey[`post/${lang}/${slug}`];
  if (!raw || !isPublic(raw)) return null;
  const ov = getOverride(slug, lang);
  return ov ? applyOverride(raw, ov) : raw;
}
export function getPage(slug: string, lang: Lang): BlogPost | null {
  const raw = byKey[`page/${lang}/${slug}`];
  if (!raw || !isPublic(raw)) return null;
  const ov = getOverride(slug, lang);
  return ov ? applyOverride(raw, ov) : raw;
}
export function getWhitepaper(slug: string, lang: Lang): BlogPost | null {
  const raw = byKey[`whitepaper/${lang}/${slug}`];
  if (!raw || !isPublic(raw)) return null;
  const ov = getOverride(slug, lang);
  return ov ? applyOverride(raw, ov) : raw;
}

// ---------- ADMIN-ONLY (sin filtro de status) ----------
// Para usar exclusivamente desde /admin/content/. Devuelve TODOS los posts
// incluyendo drafts. Nunca usar desde páginas públicas.
export function adminGetAllPosts(): BlogPost[] {
  return [...D.posts, ...D.pages, ...D.whitepapers];
}
export function adminGetPostByKey(type: string, lang: Lang, slug: string): BlogPost | null {
  return byKey[`${type}/${lang}/${slug}`] || null;
}

// ---------- CMS MERGE (legacy JSON + Supabase) ----------
// Versiones async que mergean los posts del CMS (Supabase) con los legacy.
// Las páginas /es/[slug] y /en/[slug] las prefieren sobre getPost() sync.
// El merge prioriza el CMS: si un (lang, slug) existe en ambas, gana el CMS.

export async function getPostAsync(slug: string, lang: Lang): Promise<BlogPost | null> {
  const { getCmsPostBySlugCached } = await import("@/lib/blog-cms-merge");
  // Si hay un post CMS publicado para ese slug, gana sobre el legacy.
  // Si solo hay un CMS draft (sin published), igualmente cae al legacy: editar un
  // post desde el editor NO debe despublicarlo nunca por error. Si en algún
  // momento quieres ocultar un legacy, marca su status como draft directamente
  // en blog.json o pásalo a published vacío en CMS.
  const cms = await getCmsPostBySlugCached(lang, slug);
  if (cms) return cms;
  return getPost(slug, lang);
}

export async function getAllPostSlugsAsync(lang: Lang): Promise<string[]> {
  const { getCmsPostsCached } = await import("@/lib/blog-cms-merge");
  const cms = await getCmsPostsCached();
  const cmsSlugs = cms.filter(p => p.lang === lang).map(p => p.slug);
  const jsonSlugs = getAllPostSlugs(lang);
  return Array.from(new Set([...cmsSlugs, ...jsonSlugs]));
}

export async function getCategoryListingAsync(categorySlug: string, lang: Lang): Promise<BlogPost[]> {
  const { getCmsPostsCached } = await import("@/lib/blog-cms-merge");
  const cms = await getCmsPostsCached();
  const cmsInCat = cms.filter(p => p.lang === lang && p.category?.slug === categorySlug);
  // Excluir del legacy solo los slugs que el CMS publica (no los drafts) para
  // evitar duplicados sin ocultar legacy publicados que el editor solo está
  // editando como borrador.
  const publishedCmsKeys = new Set(cmsInCat.map(p => `${p.lang}::${p.slug}`));
  const jsonInCat = getCategoryListing(categorySlug, lang).filter(p => !publishedCmsKeys.has(`${p.lang}::${p.slug}`));
  return [...cmsInCat, ...jsonInCat].sort((a, b) => (b.date > a.date ? 1 : -1));
}

export async function getRelatedPostsAsync(currentSlug: string, categorySlug: string, lang: Lang, max = 3): Promise<BlogPost[]> {
  const all = await getCategoryListingAsync(categorySlug, lang);
  return all.filter(p => p.slug !== currentSlug).slice(0, max);
}

// Heurística: el HTML del post ya trae su propia FAQ.
// Casos detectados:
//   - JSON-LD FAQPage embebido (typical en posts importados con su propio schema)
//   - >=3 elementos <details> (FAQ visual de Gutenberg/Elementor)
// En esos casos evitamos inyectar el FAQ genérico de lib/faqs.ts para no duplicar.
export function hasInlineFaq(html: string): boolean {
  if (/"@type"\s*:\s*"FAQPage"/i.test(html)) return true;
  const matches = html.match(/<details\b/gi);
  return !!matches && matches.length >= 3;
}

// ---------- LISTING (solo published) ----------
export function getAllPostSlugs(lang: Lang): string[] {
  return D.posts.filter(p => p.lang === lang && isPublic(p)).map(p => p.slug);
}
export function getAllWhitepaperSlugs(lang: Lang): string[] {
  return D.whitepapers.filter(p => p.lang === lang && isPublic(p)).map(p => p.slug);
}
export function getAllPosts(lang: Lang): BlogPost[] {
  return D.posts.filter(p => p.lang === lang && isPublic(p));
}
// Versión CMS-aware: fusiona los posts publicados en el CMS (Supabase) con los de blog.json.
// La usa el sitemap para que los posts del editor sean indexables por Google.
export async function getAllPostsAsync(lang: Lang): Promise<BlogPost[]> {
  const { getCmsPostsCached } = await import("@/lib/blog-cms-merge");
  const cms = await getCmsPostsCached();
  const cmsInLang = cms.filter(p => p.lang === lang);
  const publishedCmsKeys = new Set(cmsInLang.map(p => `${p.lang}::${p.slug}`));
  const jsonInLang = getAllPosts(lang).filter(p => !publishedCmsKeys.has(`${p.lang}::${p.slug}`));
  return [...cmsInLang, ...jsonInLang];
}
export function getAllWhitepapers(lang: Lang): BlogPost[] {
  return D.whitepapers.filter(p => p.lang === lang && isPublic(p));
}

// ---------- CATEGORIAS ----------
// Agrupa los posts publicados por slug de categoría WP.
export function getCategoryListing(categorySlug: string, lang: Lang): BlogPost[] {
  return D.posts
    .filter(p => p.lang === lang && isPublic(p) && p.category?.slug === categorySlug)
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getAllCategories(lang: Lang): { slug: string; name: string; count: number }[] {
  const map = new Map<string, { name: string; count: number }>();
  for (const p of D.posts) {
    if (p.lang !== lang || !isPublic(p)) continue;
    const k = p.category?.slug || "blog";
    const name = p.category?.name || "Blog";
    const cur = map.get(k) || { name, count: 0 };
    cur.count++;
    map.set(k, cur);
  }
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => b.count - a.count);
}

// ---------- RELACIONADOS ----------
export function getRelatedPosts(currentSlug: string, categorySlug: string, lang: Lang, max = 3): BlogPost[] {
  return D.posts
    .filter(p => p.lang === lang && isPublic(p) && p.slug !== currentSlug && p.category?.slug === categorySlug)
    .slice(0, max);
}

// ---------- HELPERS ----------
export function formatDate(iso: string, lang: Lang = "es"): string {
  const d = new Date(iso);
  const locale = lang === "es" ? "es-ES" : "en-US";
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}

export function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function shortExcerpt(html: string, max = 160): string {
  const txt = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (txt.length <= max) return txt;
  const cut = txt.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?…]+$/, "") + "…";
}

// Categorías legibles para breadcrumbs y badges
const CAT_LABELS_ES: Record<string,string> = {
  "blog": "Blog",
  "consejos": "Consejos",
  "entrevistas": "Entrevistas",
  "retail-entrevistas": "Retail",
  "casos-de-exito": "Casos de éxito",
  "retail-casos": "Retail",
  "webinars": "Webinars",
  "retail-blog": "Retail",
  "corporativo": "Corporativo",
  "eventos": "Eventos",
};
const CAT_LABELS_EN: Record<string,string> = {
  "blog": "Blog",
  "interviews": "Interviews",
  "retail-interviews": "Retail",
  "retail": "Retail",
  "shopping-malls": "Shopping Malls",
  "tips": "Tips",
  "case-studies": "Case Studies",
  "corporate": "Corporate",
  "retail-case-studies": "Retail",
  "shopping-malls-case-studies": "Shopping Malls",
  "hospitality-blog": "Hospitality",
  "webinars": "Webinars",
  "shopping-malls-interviews": "Shopping Malls",
};

export function categoryLabel(slug: string, lang: Lang): string {
  const map = lang === "es" ? CAT_LABELS_ES : CAT_LABELS_EN;
  return map[slug] || slug;
}

export function categoryUrl(slug: string, lang: Lang): string {
  // Categorías de blog viven en /<lang>/categoria/<slug>/
  return `/${lang}/categoria/${slug}/`;
}
