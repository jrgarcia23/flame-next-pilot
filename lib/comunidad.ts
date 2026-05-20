import listings from "@/data/comunidad-listings.json";
import full from "@/data/comunidad-posts-full.json";

export type PostMeta = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  link: string;
  img: string;
  categories: number[];
  category: string;
};

export type PostFull = PostMeta & { content: string };

export const COMUNIDAD_CATS: { key: "blog" | "casos" | "webinars" | "whitepapers"; label: string; path: string; desc: string; icon: string }[] = [
  { key: "blog",         label: "Blog",            path: "/es/comunidad/blog/",            desc: "Artículos sobre analítica para espacios físicos, retail, hostelería y centros comerciales.",  icon: "behavior" },
  { key: "casos",        label: "Casos de éxito",  path: "/es/comunidad/casos-de-exito/",  desc: "Cómo retailers, centros comerciales y espacios públicos usan Flame para tomar decisiones.", icon: "trending" },
  { key: "webinars",     label: "Webinars",        path: "/es/comunidad/webinars/",        desc: "Sesiones en vídeo con expertos sobre data intelligence aplicada al espacio físico.",         icon: "venue"    },
  { key: "whitepapers",  label: "Whitepapers",     path: "/es/comunidad/whitepapers/",     desc: "Estudios y guías en profundidad para decidir con datos.",                                     icon: "compare"  },
];

const lists = (listings as { lists: Record<string, PostMeta[]> }).lists;
export function getListing(category: "blog" | "casos" | "webinars" | "whitepapers"): PostMeta[] {
  return lists[category] || [];
}

export function getAllPosts(): PostMeta[] {
  return [
    ...(lists.blog || []),
    ...(lists.casos || []),
    ...(lists.webinars || []),
    ...(lists.whitepapers || []),
  ];
}

const fullPosts = full as PostFull[];
export function getPostBySlug(slug: string): PostFull | null {
  return fullPosts.find(p => p.slug === slug) || null;
}

export function getAllSlugs(): string[] {
  return fullPosts.map(p => p.slug);
}

export function categoryLabel(key: string): string {
  return COMUNIDAD_CATS.find(c => c.key === key)?.label || key;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

export function readingTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function getRelatedPosts(currentSlug: string, category: string, max = 3): PostMeta[] {
  const all = getAllPosts().filter(p => p.slug !== currentSlug && p.category === category);
  return all.slice(0, max);
}

export function shortExcerpt(html: string, max = 160): string {
  const txt = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&hellip;/g, "…").replace(/&#8230;/g, "…").replace(/&#8217;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
  if (txt.length <= max) return txt;
  const cut = txt.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:!?…]+$/, "") + "…";
}
