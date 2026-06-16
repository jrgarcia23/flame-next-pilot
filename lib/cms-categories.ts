// Catálogo de categorías permitidas en el CMS embebido.
// Mantiene paridad con lib/blog.ts (CATEGORY_LABEL_ES/EN) y con la whitelist
// EDITORIAL_CATEGORIES del BlogPostTemplate.

export const CMS_CATEGORIES = [
  { slug: "blog",                          name_es: "Blog",                name_en: "Blog" },
  { slug: "casos-de-exito",                name_es: "Casos de éxito",      name_en: "Case Studies" },
  { slug: "case-studies",                  name_es: "Casos de éxito",      name_en: "Case Studies" },
  { slug: "retail-case-studies",           name_es: "Retail",              name_en: "Retail" },
  { slug: "shopping-malls-case-studies",   name_es: "Centros comerciales", name_en: "Shopping Malls" },
  { slug: "tips-retail",                   name_es: "Consejos retail",     name_en: "Retail tips" },
  { slug: "tips",                          name_es: "Consejos",            name_en: "Tips" },
  { slug: "corporate",                     name_es: "Corporativo",         name_en: "Corporate" },
  { slug: "corporativo",                   name_es: "Corporativo",         name_en: "Corporate" },
  { slug: "entrevistas",                   name_es: "Entrevistas",         name_en: "Interviews" },
  { slug: "interviews",                    name_es: "Entrevistas",         name_en: "Interviews" },
  { slug: "webinars",                      name_es: "Webinars",            name_en: "Webinars" },
] as const;

export type CmsCategorySlug = typeof CMS_CATEGORIES[number]["slug"];

export function categoryNameFor(slug: string, lang: "es" | "en"): string {
  const c = CMS_CATEGORIES.find(c => c.slug === slug);
  if (!c) return slug;
  return lang === "es" ? c.name_es : c.name_en;
}

export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}
