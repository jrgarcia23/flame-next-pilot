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
  // Casos de éxito en el nuevo formato (HTML+CSS propio en data/elementor/<slug>.html)
  "alain-afflelou-confia-en-la-analitica-de-flame-para-sus-tiendas-en-espana",
  "alain-afflelou-relies-on-flame-analytics-for-people-counting-across-its-stores-in-spain",
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
