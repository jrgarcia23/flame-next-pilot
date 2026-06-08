// FAQ topics scrapeados del WP viejo. 10 topics × 2 idiomas × 4-8 items.
// Origen: data/faqs-from-live.json (2026-06-03 snapshot).
import faqsData from "@/data/faqs-from-live.json";

type Lang = "es" | "en";

export type FaqItem = { q: string; a: string };
export type FaqBlock = {
  title: string;
  subtitle: string;
  accent: string;
  items: FaqItem[];
};

type RawShape = Record<string, { es: FaqBlock; en: FaqBlock }>;

const FAQS = faqsData as RawShape;

// Mapeo slug-de-pagina → topic FAQ. Cuando una página servicio coincide con
// uno de estos slugs, inyectamos su bloque FAQ y FAQPage schema.
const PAGE_TO_TOPIC: Record<string, string> = {
  // ES
  "conteo-personas": "people-counting",
  "customer-journey": "customer-journey",
  "connect": "connect",
  "solucion-para-el-sector-retail": "retail",
  "hoteles": "hospitality",
  "espacios-publicos": "public-venues",
  "gestion-ocupacion": "occupancy",
  "hypersensor": "hypersensor",
  "analitica-trafico": "traffic",
  // EN
  "people-counting-systems-complete-guide": "people-counting",
  "occupancy-management": "occupancy",
  "guest-wifi-marketing": "connect",
  "hospitality": "hospitality",
  "public-venues": "public-venues",
  "traffic-insights": "traffic",
};

// Heurística adicional: si el slug contiene cierta keyword, asociamos topic.
const KEYWORD_TO_TOPIC: Array<[RegExp, string]> = [
  [/people[- ]?counting|conteo[- ]?personas/i, "people-counting"],
  [/customer[- ]?journey/i, "customer-journey"],
  [/hypersensor/i, "hypersensor"],
  [/occupancy|ocupaci[oó]n/i, "occupancy"],
  [/hospitality|hoteles/i, "hospitality"],
  [/public[- ]?venues|espacios[- ]?p[uú]blicos/i, "public-venues"],
  [/retail/i, "retail"],
  [/shopping[- ]?mall|centro[- ]?comercial/i, "shopping-malls"],
  [/traffic|tr[aá]fico/i, "traffic"],
];

export function getTopicForSlug(slug: string): string | null {
  if (PAGE_TO_TOPIC[slug]) return PAGE_TO_TOPIC[slug];
  for (const [rx, topic] of KEYWORD_TO_TOPIC) {
    if (rx.test(slug)) return topic;
  }
  return null;
}

export function getFaqBlock(topic: string, lang: Lang): FaqBlock | null {
  const t = FAQS[topic];
  if (!t) return null;
  return t[lang] || null;
}

// Wrapper conveniente para el [slug]/page.tsx
export function getFaqForSlug(slug: string, lang: Lang): FaqBlock | null {
  const topic = getTopicForSlug(slug);
  if (!topic) return null;
  return getFaqBlock(topic, lang);
}
