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

// Casos de éxito en el nuevo formato (ES ↔ EN son traducción 1:1). Ver scripts/casos-exito/.
const CASE_STUDIES: Pair[] = [
  { es: "alain-afflelou-confia-en-la-analitica-de-flame-para-sus-tiendas-en-espana", en: "alain-afflelou-relies-on-flame-analytics-for-people-counting-across-its-stores-in-spain" },
  { es: "multiopticas-convierte-el-trafico-en-tienda-en-decisiones-de-negocio", en: "multiopticas-turns-in-store-footfall-into-business-decisions" },
  { es: "caso-de-exito-potenciando-la-fidelizacion-en-centros-comerciales-en-cbre-espana", en: "case-study-enhancing-customer-loyalty-in-shopping-centers-with-cbre-spain-and-connect-mall-edition" },
  { es: "transformando-la-experiencia-en-caixaforum-con-videoanalitica", en: "caixaforum-video-analytics-visitor-experience" },
  { es: "centro-comercial-el-ingenio-caso-de-exito-flame-analytics", en: "success-in-el-ingenio-recognition-for-the-igenio-project-of-flame-analytics" },
  { es: "decathlon-medir-y-mejorar-en-el-sector-retail", en: "decathlon-measure-and-improve-in-the-retail-sector" },
  { es: "optimizacion-de-experiencia-de-clientes-en-cc-ferial-plaza-con-flame-analytics", en: "ferial-plaza-shopping-center-customer-experience-flame-analytics" },
  { es: "havainas-elige-flame-analytics-para-la-digitalizacion-de-sus-tiendas", en: "havaianas-store-digitalization-flame-analytics" },
  { es: "ikea-confia-en-flame-analytics-para-la-analitica-indoor-de-sus-nuevos-centros-en-latinoamerica", en: "ikea-relies-on-flame-analytics-for-the-indoor-analytics-of-its-new-centers-in-latin-america" },
  { es: "la-casa-encendida-una-experiencia-segura-con-flame-analytics", en: "la-casa-encendida-a-safe-experience-with-flame-analytics" },
  { es: "centro-comercial-marineda-city-nuevo-cliente-de-flame-analytics", en: "marineda-city-shopping-center-flame-analytics" },
  { es: "impulsando-la-transformacion-digital-historia-de-exito-de-flame-analytics-en-merlin-properties", en: "driving-digital-transformation-flame-analytics-success-story-with-merlin-properties" },
  { es: "oasiz-madrid-cuenta-con-flame-analytics-para-identificar-y-conectar-con-sus-clientes-de-forma-agil", en: "oasiz-madrid-implements-flame-analytics-to-identify-and-connect-with-its-customers-in-an-agile-way" },
  { es: "pompeii-uso-del-big-data-en-el-sector-retail", en: "pompeii-retail-analytics-case-study" },
  { es: "caso-de-exito-repsol-y-flame-analytics-transforman-la-experiencia-en-1000-gasolineras", en: "success-story-repsol-and-flame-analytics-transform-the-experience-in-1000-gas-stations" },
  { es: "el-centro-comercial-zenia-boulevard-nuevo-cliente-de-flame-analytics", en: "zenia-boulevard-shopping-center-flame-analytics" },
  { es: "b-b-hotels-analitica-de-afluencia-flame-analytics", en: "b-b-hotels-footfall-analytics-flame-analytics" },
  { es: "aena-analitica-de-pasajeros-en-aeropuertos-flame-analytics", en: "aena-passenger-analytics-airports-flame-analytics" },
];

const ES_TO_EN: Record<string, string> = {};
const EN_TO_ES: Record<string, string> = {};
for (const p of [...SERVICE_PAGES, ...POSTS, ...CASE_STUDIES]) {
  ES_TO_EN[p.es] = p.en;
  EN_TO_ES[p.en] = p.es;
}

// Dado un slug y su idioma, devuelve el slug del idioma opuesto si está mapeado.
export function getOtherLangSlug(slug: string, lang: "es" | "en"): string | null {
  if (lang === "es") return ES_TO_EN[slug] ?? null;
  return EN_TO_ES[slug] ?? null;
}
