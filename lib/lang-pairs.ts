// Pares ES↔EN para hreflang en posts/whitepapers/páginas servicio.
//
// Sin esto, Google trata cada página como contenido único de su idioma y a veces
// consolida ES contra EN (visto en /es/analitica-trafico/ → canonical /en/traffic-insights/).
// Con hreflang explícito declarado en ambas direcciones, Google entiende que son
// la misma página en distinto idioma y mantiene el canonical en cada una.
//
// Reglas:
//   - Solo añadir pares que SON traducciones (mismo contenido en distinto idioma).
//   - NO añadir si la versión del otro idioma no existe o es muy distinta.
//   - El mapeo es por slug (sin /es/ ni /en/).

type Pair = { es: string; en: string };

// Páginas servicio (las más importantes — todas tienen contraparte directa).
const SERVICE_PAGES: Pair[] = [
  { es: "conteo-personas",               en: "people-counting" },
  { es: "analitica-trafico",             en: "traffic-insights" },
  { es: "gestion-ocupacion",             en: "occupancy-management" },
  { es: "recorrido-del-cliente",         en: "customer-journey" },
  { es: "hypersensor",                   en: "hypersensor" },
  { es: "hoteles",                       en: "hospitality" },
  { es: "espacios-publicos",             en: "public-venues" },
  { es: "marketing-wifi-para-invitados", en: "guest-wifi-marketing" },
  { es: "acceso-wifi-corporativo",       en: "corporate-wifi-access" },
  { es: "analitica-conversion",          en: "conversion-analytics" },
  { es: "comportamiento-del-cliente",    en: "customer-behavior" },
  { es: "connect",                       en: "connect" },
  { es: "comunidad",                     en: "community" },
  { es: "sobre-nosotros",                en: "about-us" },
  { es: "partners",                      en: "partners" },
  { es: "contacta",                      en: "contact-us" },
  { es: "informacion-detallada",         en: "detailed-information" },
  { es: "solucion-para-el-sector-retail",   en: "solution-for-retail-sector" },
  { es: "solucion-para-centros-comerciales", en: "solution-for-shopping-malls" },
  { es: "politica-de-cookies",           en: "cookie-policy" },
  { es: "politica-de-privacidad",        en: "privacy-policy" },
  { es: "politica-de-seguridad-de-la-informacion", en: "information-security" },
  { es: "condiciones-de-uso",            en: "terms-of-use" },
];

// Posts blog con traducción confirmada (los importantes por tráfico GSC).
const POSTS: Pair[] = [
  // (Vacío inicialmente. Añadir cuando se confirme con SE Ranking o GSC que ambos
  // existen y son traducción 1:1, no contenido distinto reutilizando slug parecido.)
];

const ES_TO_EN: Record<string, string> = {};
const EN_TO_ES: Record<string, string> = {};
for (const p of [...SERVICE_PAGES, ...POSTS]) {
  ES_TO_EN[p.es] = p.en;
  EN_TO_ES[p.en] = p.es;
}

// Dado un slug y su idioma, devuelve el slug del idioma opuesto si está mapeado.
export function getOtherLangSlug(slug: string, lang: "es" | "en"): string | null {
  if (lang === "es") return ES_TO_EN[slug] ?? null;
  return EN_TO_ES[slug] ?? null;
}
