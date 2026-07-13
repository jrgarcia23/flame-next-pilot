// Mapa de conceptos clave → URL canónica del concepto en Flame.
// Se usa para inyectar enlaces internos contextuales en los posts del blog.
// Reglas: max 5 links auto-inyectados por post · no se enlaza a sí mismo · solo dentro de <p>.

export type Lang = "es" | "en";

type Topic = { es: string; en: string; terms: string[] };

// Cada topic tiene su URL canónica ES/EN + variaciones del término que activan el link.
// El primer match dentro de un <p> que no tenga ya un <a> se convierte en enlace.
// Los términos están en minúsculas; la búsqueda es case-insensitive con \\b word boundary.
const TOPICS: Topic[] = [
  // Productos
  { es: "/es/conteo-personas/",                   en: "/en/people-counting/",                terms: ["conteo de personas", "cuenta personas", "cuenta-personas", "people counting", "footfall counter", "people counter"] },
  { es: "/es/recorrido-del-cliente/",                  en: "/en/customer-journey/",               terms: ["customer journey", "recorrido del cliente", "viaje del cliente", "shopper journey"] },
  { es: "/es/analitica-conversion/",              en: "/en/conversion-analytics/",           terms: ["analítica de conversión", "tasa de conversión", "conversion analytics", "conversion rate", "funnel físico", "conversión en tienda"] },
  { es: "/es/comportamiento-del-cliente/",                 en: "/en/customer-behavior/",              terms: ["customer behavior", "comportamiento del cliente", "comportamiento del consumidor", "shopper behavior", "mapas de calor", "heatmaps"] },
  { es: "/es/connect/",                           en: "/en/connect/",                        terms: ["wifi marketing", "marketing wifi", "guest wifi", "wifi para invitados", "captive portal", "portal cautivo"] },
  { es: "/es/gestion-ocupacion/",                 en: "/en/occupancy-management/",           terms: ["gestión de ocupación", "gestión de aforo", "ocupación en tiempo real", "occupancy management", "live capacity"] },
  { es: "/es/analitica-de-colas/",                en: "/en/queue-analytic/",                 terms: ["analítica de colas", "gestión de colas", "queue analytics", "queue management", "tiempo de espera"] },
  { es: "/es/analitica-trafico/",                 en: "/en/traffic-insights/",               terms: ["analítica de tráfico", "tráfico físico", "foot traffic", "traffic insights", "tráfico exterior"] },
  { es: "/es/gestion-de-aseos/",                  en: "/en/restroom-management/",            terms: ["gestión de aseos", "restroom management", "limpieza basada en uso"] },
  { es: "/es/acceso-wifi-corporativo/",           en: "/en/corporate-wifi-access/",          terms: ["wifi corporativo", "corporate wifi"] },
  { es: "/es/marketing-wifi-para-invitados/",     en: "/en/guest-wifi-marketing/",           terms: ["marketing wifi para invitados", "guest wifi marketing"] },
  { es: "/es/hypersensor/",                       en: "/en/hypersensor/",                    terms: ["hypersensor", "flame hypersensor", "video analytics", "analítica de vídeo"] },
  // Sectores
  { es: "/es/solucion-para-el-sector-retail/",    en: "/en/solution-for-retail-sector/",     terms: ["sector retail", "retail sector", "data intelligence para retail", "retail analytics"] },
  { es: "/es/solucion-para-centros-comerciales/", en: "/en/solution-for-shopping-malls/",    terms: ["centros comerciales", "shopping malls", "shopping centers", "centro comercial"] },
  { es: "/es/hoteles/",                           en: "/en/hospitality/",                    terms: ["sector hotelero", "hostelería", "hospitality sector", "hoteles inteligentes"] },
  { es: "/es/espacios-publicos/",                 en: "/en/public-venues/",                  terms: ["espacios públicos", "public venues", "transporte público"] },
  // Página corporativa
  { es: "/es/sobre-nosotros/",                    en: "/en/about-us/",                       terms: ["sobre flame analytics", "about flame analytics"] },
];

const MAX_LINKS_PER_POST = 5;

/**
 * Inyecta enlaces internos contextuales en el HTML de un post.
 * - Solo busca dentro de <p>...</p> (no en headings, listas, blockquotes, etc.)
 * - Salta párrafos que ya contienen un <a> existente (respeta los links editoriales)
 * - Max 5 enlaces auto-inyectados por post
 * - Cada topic se inyecta una sola vez por post
 * - El post no se enlaza a sí mismo
 */
export function injectInternalLinks(html: string, currentPath: string, lang: Lang): string {
  const usedTopics = new Set<string>();
  let linksInjected = 0;

  // Pre-construir regexes ordenadas por longitud de término DESC (matchear primero los más largos)
  type Compiled = { url: string; re: RegExp };
  const allCompiled: Compiled[] = [];
  for (const topic of TOPICS) {
    const url = topic[lang];
    if (url === currentPath) continue;
    for (const term of topic.terms) {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // Word boundary que tolera tildes (\b no funciona con caracteres acentuados en JS)
      allCompiled.push({ url, re: new RegExp(`(?<![\\p{L}\\p{N}_-])(${escaped})(?![\\p{L}\\p{N}_-])`, "iu") });
    }
  }

  return html.replace(/<p(\s[^>]*)?>([\s\S]*?)<\/p>/g, (match, attrs = "", inner) => {
    if (linksInjected >= MAX_LINKS_PER_POST) return match;
    // Skip si ya hay un <a> en el párrafo
    if (/<a\s/i.test(inner)) return match;
    // Skip si el párrafo envuelve un <script> (JSON-LD embebido en posts importados
    // de WP: inyectar un <a> dentro rompe el JSON y GSC marca error de análisis)
    if (/<script\b/i.test(inner)) return match;

    let modified = inner;
    for (const c of allCompiled) {
      if (linksInjected >= MAX_LINKS_PER_POST) break;
      if (usedTopics.has(c.url)) continue;
      if (c.re.test(modified)) {
        modified = modified.replace(c.re, `<a href="${c.url}" class="auto-link" data-internal-link>$1</a>`);
        usedTopics.add(c.url);
        linksInjected++;
        // Solo 1 link inyectado por párrafo para no saturar
        break;
      }
    }
    return `<p${attrs || ""}>${modified}</p>`;
  });
}
