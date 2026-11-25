// Posts publicados pero ocultos ("unlisted"): se ven con el enlace directo, pero
// no salen en el listado del blog, en Comunidad, en las páginas de categoría, en
// "relacionados" ni en el sitemap. Llevan robots "noindex, follow" y, al guardarlos
// desde /admin, no se avisa a Google Indexing API.
//
// Para ocultar otro post, añadir aquí "<lang>/<slug>". Para volver a listarlo, quitarlo.

type Lang = "es" | "en";

const UNLISTED = new Set<string>([
  // VERA, proyecto cofinanciado (Flame, 25-nov-2026): se comparte por enlace, fuera del blog.
  "es/flame-analytics-impulsa-vera-un-proyecto-de-innovacion-basado-en-inteligencia-artificial",
]);

export function isUnlistedPost(lang: Lang, slug: string): boolean {
  return UNLISTED.has(`${lang}/${slug}`);
}
