// Las 4 categorías editoriales del CMS Flame.
// Cada categoría tiene un slug por idioma (los slugs heredados de WP siguen vivos
// porque ya están indexados en Google y los listados /<lang>/categoria/<slug>/ los
// usan tal cual). El editor solo expone 4 opciones; al guardar elegimos el slug
// correcto en función del idioma del post.

export const CMS_CATEGORIES = [
  { key: "blog",       slug_es: "blog",           slug_en: "blog",          name_es: "Blog",          name_en: "Blog" },
  { key: "webinar",    slug_es: "webinars",       slug_en: "webinars",      name_es: "Webinar",       name_en: "Webinar" },
  { key: "entrevista", slug_es: "entrevistas",    slug_en: "interviews",    name_es: "Entrevista",    name_en: "Interview" },
  { key: "caso-exito", slug_es: "casos-de-exito", slug_en: "case-studies",  name_es: "Caso de éxito", name_en: "Case Study" },
] as const;

export type CmsCategoryKey = typeof CMS_CATEGORIES[number]["key"];

/** Slug que toca usar para esta key+idioma. */
export function slugFor(key: string, lang: "es" | "en"): string {
  const c = CMS_CATEGORIES.find(c => c.key === key);
  if (!c) return key;
  return lang === "es" ? c.slug_es : c.slug_en;
}

/** Nombre legible. */
export function nameFor(key: string, lang: "es" | "en"): string {
  const c = CMS_CATEGORIES.find(c => c.key === key);
  if (!c) return key;
  return lang === "es" ? c.name_es : c.name_en;
}

/** Categoría a partir de cualquier slug heredado o key.
 *  Tolera blogs viejos con tips-retail, corporate, retail-case-studies, etc.
 */
const LEGACY_TO_KEY: Record<string, CmsCategoryKey> = {
  // Blog y todas las sub-cats antiguas que en realidad son blog
  "blog": "blog",
  "tips-retail": "blog",
  "tips": "blog",
  "consejos": "blog",
  "corporate": "blog",
  "corporativo": "blog",
  "retail-blog": "blog",
  // Webinar
  "webinars": "webinar",
  // Entrevistas
  "entrevistas": "entrevista",
  "interviews": "entrevista",
  "retail-entrevistas": "entrevista",
  // Casos de éxito
  "casos-de-exito": "caso-exito",
  "case-studies": "caso-exito",
  "retail-case-studies": "caso-exito",
  "shopping-malls-case-studies": "caso-exito",
  "retail-casos": "caso-exito",
  "shopping-malls": "caso-exito",
};

export function keyFromAnySlug(slug: string): CmsCategoryKey {
  return LEGACY_TO_KEY[slug] || "blog";
}

/** Compatibilidad con código previo que esperaba el nombre dado un slug. */
export function categoryNameFor(slug: string, lang: "es" | "en"): string {
  const key = keyFromAnySlug(slug);
  return nameFor(key, lang);
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
