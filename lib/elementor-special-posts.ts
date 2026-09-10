// Posts que originalmente se renderizaban con Elementor en el WP demo y que JR pide
// mantener "exactamente como estaban", con sus iconos, secciones y maquetación propias.
// Sin replicar Elementor en JSX, lo que hacemos es servir el HTML extraído del demo
// + cargar los CSS Elementor críticos desde el propio demo (mientras siga online).
//
// Para añadir un post nuevo:
// 1) Curl al demo para obtener su HTML completo
// 2) Extraer el contenido entre </header> y <footer> y guardarlo en
//    data/elementor/<slug>.html
// 3) Guardar la lista de CSS URLs Elementor en data/elementor/<slug>.meta.json
// 4) Añadir el slug al array SPECIAL_SLUGS de abajo

import fs from "node:fs";
import path from "node:path";

const SPECIAL_SLUGS: string[] = [
  "flame-talks-2026-4a-edicion-centros-comerciales-y-retail-del-dato-al-agente-de-ia-para-crecer-juntos",
  // ------------------------------------------------------------------
  // Casos de éxito en el nuevo formato (HTML+CSS propio en data/elementor/<slug>.html)
  // Generados por scripts/casos-exito/ (render determinista mo-*). ES + EN.
  // ------------------------------------------------------------------
  "alain-afflelou-confia-en-la-analitica-de-flame-para-sus-tiendas-en-espana",
  "alain-afflelou-relies-on-flame-analytics-for-people-counting-across-its-stores-in-spain",
  "multiopticas-convierte-el-trafico-en-tienda-en-decisiones-de-negocio",
  "multiopticas-turns-in-store-footfall-into-business-decisions",
  "caso-de-exito-potenciando-la-fidelizacion-en-centros-comerciales-en-cbre-espana",
  "case-study-enhancing-customer-loyalty-in-shopping-centers-with-cbre-spain-and-connect-mall-edition",
  "transformando-la-experiencia-en-caixaforum-con-videoanalitica",
  "caixaforum-video-analytics-visitor-experience",
  "centro-comercial-el-ingenio-caso-de-exito-flame-analytics",
  "success-in-el-ingenio-recognition-for-the-igenio-project-of-flame-analytics",
  "decathlon-medir-y-mejorar-en-el-sector-retail",
  "decathlon-measure-and-improve-in-the-retail-sector",
  "optimizacion-de-experiencia-de-clientes-en-cc-ferial-plaza-con-flame-analytics",
  "ferial-plaza-shopping-center-customer-experience-flame-analytics",
  "havainas-elige-flame-analytics-para-la-digitalizacion-de-sus-tiendas",
  "havaianas-store-digitalization-flame-analytics",
  "ikea-confia-en-flame-analytics-para-la-analitica-indoor-de-sus-nuevos-centros-en-latinoamerica",
  "ikea-relies-on-flame-analytics-for-the-indoor-analytics-of-its-new-centers-in-latin-america",
  "la-casa-encendida-una-experiencia-segura-con-flame-analytics",
  "la-casa-encendida-a-safe-experience-with-flame-analytics",
  "centro-comercial-marineda-city-nuevo-cliente-de-flame-analytics",
  "marineda-city-shopping-center-flame-analytics",
  "impulsando-la-transformacion-digital-historia-de-exito-de-flame-analytics-en-merlin-properties",
  "driving-digital-transformation-flame-analytics-success-story-with-merlin-properties",
  "oasiz-madrid-cuenta-con-flame-analytics-para-identificar-y-conectar-con-sus-clientes-de-forma-agil",
  "oasiz-madrid-implements-flame-analytics-to-identify-and-connect-with-its-customers-in-an-agile-way",
  "pompeii-uso-del-big-data-en-el-sector-retail",
  "pompeii-retail-analytics-case-study",
  "caso-de-exito-repsol-y-flame-analytics-transforman-la-experiencia-en-1000-gasolineras",
  "success-story-repsol-and-flame-analytics-transform-the-experience-in-1000-gas-stations",
  "el-centro-comercial-zenia-boulevard-nuevo-cliente-de-flame-analytics",
  "zenia-boulevard-shopping-center-flame-analytics",
  // Net-new (DRAFT en Supabase hasta OK de JR): B&B Hotels y Aena
  "b-b-hotels-analitica-de-afluencia-flame-analytics",
  "b-b-hotels-footfall-analytics-flame-analytics",
  "aena-analitica-de-pasajeros-en-aeropuertos-flame-analytics",
  "aena-passenger-analytics-airports-flame-analytics",
];

type ElementorMeta = {
  css?: string[];
  inline?: { id: string; content: string }[];
};

export type ElementorPostContent = {
  html: string;
  cssUrls: string[];
  inlineCss: string;
};

export function isElementorSpecial(slug: string): boolean {
  return SPECIAL_SLUGS.includes(slug);
}

export function getElementorContent(slug: string): ElementorPostContent | null {
  if (!isElementorSpecial(slug)) return null;
  const dataDir = path.join(process.cwd(), "data", "elementor");
  const htmlPath = path.join(dataDir, `${slug}.html`);
  const metaPath = path.join(dataDir, `${slug}.meta.json`);
  if (!fs.existsSync(htmlPath)) return null;
  const html = fs.readFileSync(htmlPath, "utf-8");
  let meta: ElementorMeta = {};
  if (fs.existsSync(metaPath)) {
    try { meta = JSON.parse(fs.readFileSync(metaPath, "utf-8")); } catch { /* ignore */ }
  }
  return {
    html,
    cssUrls: meta.css || [],
    inlineCss: (meta.inline || []).map(s => s.content).join("\n"),
  };
}
