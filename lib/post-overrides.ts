// Overrides SEO para posts del blog.json.
// Aplicados por getPost() para que sobrevivan a regeneraciones del scrape WP.
//
// Origen: trabajo de Esconzeta 2026-05-25 sobre 10 posts con CTR <1% y posición top 10
// + 3 contenidos ES reescritos para romper consolidación canonical contra EN.

import fs from "node:fs";
import path from "node:path";

type Lang = "es" | "en";

export type PostOverride = {
  title?: string;
  excerpt?: string;
  // Si htmlFile está presente, lee el HTML desde disco al build time.
  htmlFile?: string;
};

// clave: `<lang>/<slug>`
const OVERRIDES: Record<string, PostOverride> = {
  // ---------- 10 TITLES + EXCERPTS reescritos ----------
  "en/what-to-look-for-in-your-best-shopping-mall": {
    title: "Best Stores in a Shopping Mall: What Makes a Great Tenant Mix (2026)",
    excerpt: "How the best shopping malls choose their stores: tenant mix, foot traffic flow and dwell time, with real data from 500+ malls.",
  },
  "es/compulsivo-racional-impulsivo-tu-que-tipo-de-consumidor-eres": {
    title: "Consumidor impulsivo, racional o compulsivo: cómo identificarlos",
    excerpt: "Cómo identificar consumidores impulsivos, racionales y compulsivos en tu tienda. Datos reales y estrategias para convertir cada perfil.",
  },
  "en/the-future-of-shopping-malls-experience-sustainability-and-data": {
    title: "Future of Shopping Malls 2026: Experience, Data & Sustainability",
    excerpt: "How shopping malls are reinventing themselves in 2026: experience design, sustainability targets and the data behind every decision.",
  },
  "en/measuring-the-roi-of-personalization-in-retail-metrics-and-strategies": {
    title: "ROI of Retail Personalization: How to Measure It (2026 Guide)",
    excerpt: "Step-by-step framework to measure the ROI of retail personalization. Real metrics, formulas and 2026 benchmarks from leading retailers.",
  },
  "en/how-to-drive-sales-in-shopping-malls-effective-tactics-for-success": {
    title: "How to Drive Sales in Shopping Malls: 7 Proven Tactics (2026)",
    excerpt: "7 proven tactics to increase sales in shopping malls: footfall analytics, dwell time, tenant mix and dynamic events. Real cases inside.",
  },
  "es/como-conseguir-un-horario-comercial-optimo-para-tu-tienda": {
    title: "Horario comercial óptimo: cómo elegir el de tu tienda con datos",
    excerpt: "Cómo definir el horario comercial óptimo de tu tienda con datos reales de afluencia. Errores comunes y un caso práctico paso a paso.",
  },
  "en/expanding-your-retail-empire-when-to-open-a-second-location-and-how-to-do-it-right": {
    title: "Opening a Second Retail Store: When and How to Do It Right",
    excerpt: "Should you open a second retail location? A data-driven checklist (footfall, sales density, market saturation) to decide with confidence.",
  },
  "en/from-cameras-to-insights-leveraging-computer-vision-in-malls": {
    title: "Computer Vision in Shopping Malls: From Cameras to Insights",
    excerpt: "How computer vision turns existing CCTV cameras into real-time retail insights: footfall, demographics, dwell time and heatmaps.",
  },
  "en/retailment-the-future-of-shopping": {
    title: "Retailment: What It Is and Why It's the Future of Retail",
    excerpt: "Retailment blends retail and entertainment to turn stores into experiences. Real examples, the 5 pillars and how to start measuring it.",
  },

  // ---------- 3 CONTENIDOS ES reescritos (diferenciación canonical) ----------
  "es/10-consejos-para-atraer-mas-clientes-al-punto-de-venta": {
    title: "10 estrategias para atraer más clientes a tu tienda (2026)",
    excerpt: "10 estrategias probadas para atraer más clientes al punto de venta y aumentar ventas. Ideas prácticas para implementar esta semana.",
    htmlFile: "01-atraer-clientes-id4600.html",
  },
  "es/4-estrategias-para-retailers-casos-de-exito-y-soluciones-clave": {
    htmlFile: "02-estrategias-retailers-id56837.html",
  },
  "es/los-10-kpis-que-todo-centro-comercial-debe-medir": {
    htmlFile: "03-kpis-centro-comercial-id25712.html",
  },
};

// Lee el HTML reescrito desde la carpeta canónica del repo agencia.
// Se ejecuta en build time (los page.tsx son SSG con generateStaticParams).
const REWRITES_DIR = path.resolve(
  process.cwd(),
  "../../../../esconzeta-mc/_local/_global/clientes/flame/seo/rewrites-es-2026-05",
);

function readHtml(file: string): string | null {
  const full = path.join(REWRITES_DIR, file);
  try {
    return fs.readFileSync(full, "utf8");
  } catch {
    return null;
  }
}

export function getOverride(slug: string, lang: Lang): PostOverride | null {
  return OVERRIDES[`${lang}/${slug}`] || null;
}

export function applyOverride<T extends { title: string; excerpt: string; html: string }>(
  post: T,
  ov: PostOverride,
): T {
  const next = { ...post };
  if (ov.title) next.title = ov.title;
  if (ov.excerpt) next.excerpt = ov.excerpt;
  if (ov.htmlFile) {
    const newHtml = readHtml(ov.htmlFile);
    if (newHtml) next.html = newHtml;
  }
  return next;
}
