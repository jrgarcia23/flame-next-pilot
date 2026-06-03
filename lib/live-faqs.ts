// FAQs extraídas literalmente de flameanalytics.com (junio 2026).
// Las preguntas y respuestas son las MISMAS que sirve la live actualmente,
// con HTML inline (strong, em, etc.) preservado.
//
// 10 páginas tienen FAQ en la live:
//   connect, customer-journey, hospitality, hypersensor, occupancy,
//   people-counting, public-venues, retail, shopping-malls, traffic.

import faqsData from "@/data/faqs-from-live.json";

export type FaqItem = { q: string; a: string };
export type FaqLang = { title: string; subtitle: string; accent: string; items: FaqItem[] };
export type FaqKey = "connect" | "customer-journey" | "hospitality" | "hypersensor" | "occupancy" | "people-counting" | "public-venues" | "retail" | "shopping-malls" | "traffic";

const data = faqsData as Record<FaqKey, { es: FaqLang; en: FaqLang }>;

/** Devuelve {title, accent, items} para una página + idioma. */
export function getFaqBlock(key: FaqKey, lang: "es" | "en"): FaqLang | null {
  const p = data[key];
  if (!p) return null;
  return p[lang] || null;
}

/** Solo los items q/a — atajo para inyectar en cfg.faqs de UseCaseTemplate. */
export function getFaqs(key: FaqKey, lang: "es" | "en"): FaqItem[] {
  return getFaqBlock(key, lang)?.items || [];
}
