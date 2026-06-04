// Lib de blog Flame. Lee de data/blog.json (525 posts + 89 pages + 25 whitepapers).
// URL plana: /es/<slug>/ y /en/<slug>/ (decisión del agente SEO 2026-06-03).
// Whitepapers: /es/whitepaper/<slug>/ y /en/whitepaper/<slug>/.
import data from "@/data/blog.json";

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

// ---------- INDEX ----------
const byKey: Record<string, BlogPost> = {};
for (const p of [...D.posts, ...D.pages, ...D.whitepapers]) {
  byKey[`${p.type}/${p.lang}/${p.slug}`] = p;
}

export function getPost(slug: string, lang: Lang): BlogPost | null {
  return byKey[`post/${lang}/${slug}`] || null;
}
export function getPage(slug: string, lang: Lang): BlogPost | null {
  return byKey[`page/${lang}/${slug}`] || null;
}
export function getWhitepaper(slug: string, lang: Lang): BlogPost | null {
  return byKey[`whitepaper/${lang}/${slug}`] || null;
}

// ---------- LISTING ----------
export function getAllPostSlugs(lang: Lang): string[] {
  return D.posts.filter(p => p.lang === lang).map(p => p.slug);
}
export function getAllWhitepaperSlugs(lang: Lang): string[] {
  return D.whitepapers.filter(p => p.lang === lang).map(p => p.slug);
}
export function getAllPosts(lang: Lang): BlogPost[] {
  return D.posts.filter(p => p.lang === lang);
}
export function getAllWhitepapers(lang: Lang): BlogPost[] {
  return D.whitepapers.filter(p => p.lang === lang);
}

// ---------- CATEGORIAS ----------
// Agrupa los posts publicados por slug de categoría WP.
export function getCategoryListing(categorySlug: string, lang: Lang): BlogPost[] {
  return D.posts
    .filter(p => p.lang === lang && p.category?.slug === categorySlug)
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getAllCategories(lang: Lang): { slug: string; name: string; count: number }[] {
  const map = new Map<string, { name: string; count: number }>();
  for (const p of D.posts) {
    if (p.lang !== lang) continue;
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
    .filter(p => p.lang === lang && p.slug !== currentSlug && p.category?.slug === categorySlug)
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
  "webinars-es-cat": "Webinars",
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
