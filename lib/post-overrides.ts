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
    title: "KPIs de centros comerciales: los 10 clave",
    excerpt: "Los 10 KPIs que todo centro comercial debe medir: afluencia, conversión, dwell time y más, con benchmarks reales del sector.",
    htmlFile: "03-kpis-centro-comercial-id25712.html",
  },

  // ---------- Auditoría SE Ranking 2026-07-13: titles >60 y descriptions >160 ----------
  // 20 páginas prioritarias (servicio + guías KEEP de la poda). El <title> final añade
  // " · Flame Analytics" (18 chars): título aquí <= 42 chars. Descriptions <= 155 y únicas.
  "es/cuenta-personas-retail-guia-completa": {
    title: "Cuenta personas retail: guía completa",
    excerpt: "Guía completa de sistemas cuenta personas para retail: tecnologías, métricas, implementación y ROI, con IA y sin biometría.",
  },
  "es/analitica-de-video-cctv-inteligencia-negocio": {
    title: "Analítica de vídeo CCTV: guía para retail",
    excerpt: "Convierte tus cámaras CCTV existentes en business intelligence para retail. Sin hardware nuevo, sin biometría, con IA.",
  },
  "es/rgpd-video-analitica-compliance-centros-comerciales": {
    title: "RGPD y videoanalítica: guía completa",
    excerpt: "Cómo cumplir el RGPD usando videoanalítica en centros comerciales: bases legales, EIPD, sanciones reales y alternativas sin biometría.",
  },
  "es/campanas-marketing-centros-comerciales": {
    title: "Marketing de centros comerciales: campañas",
    excerpt: "Las campañas de marketing para centros comerciales más efectivas se basan en datos de afluencia. Estrategias, ROI y optimización con IA.",
  },
  "es/inteligencia-artificial-retail-analitica-tienda-fisica": {
    title: "Inteligencia artificial retail: analítica",
    excerpt: "Cómo la IA revoluciona la analítica de la tienda física: visión artificial, conteo de personas, heatmaps y predicción de afluencia.",
  },
  "es/gestion-red-tiendas-visibilidad-cadena-retail": {
    title: "Gestión de red de tiendas: guía retail",
    excerpt: "Gestión de red de tiendas retail: KPIs comparables, visibilidad en tiempo real y decisiones con datos para cadenas multi-tienda.",
  },
  "es/supermercados-analitica-ia-flame": {
    title: "Analítica para supermercados con IA (2026)",
    excerpt: "Analítica avanzada e IA en supermercados: cifras del sector, comparativa con Mercadona, Carrefour, Lidl, Eroski y Dia, y mejoras medibles.",
  },
  "es/queue-analytics-eficiencia-y-satisfaccion-en-el-sector-retail": {
    title: "Queue Analytics para retail: guía",
    excerpt: "Queue analytics en retail: mide colas y tiempos de espera, mejora la satisfacción del cliente y evita ventas perdidas con IA.",
  },
  "es/beneficios-de-la-inteligencia-artificial-en-el-analisis-del-customer-journey": {
    title: "IA en el customer journey: beneficios",
    excerpt: "Beneficios de la inteligencia artificial en el análisis del customer journey: personalización, predicción y decisiones con datos.",
  },
  "es/claves-experiencia-de-compra-centro-comercial": {
    title: "Webinar: 5 claves de experiencia de compra",
    excerpt: "Las 5 claves para impulsar la experiencia de compra en tu centro comercial, explicadas en el webinar de Flame Analytics.",
  },
  "es/cuenta-personas-que-miden-y-cuales-son-los-beneficios": {
    title: "Cuenta personas: qué miden y beneficios",
    excerpt: "Qué miden los cuenta personas y qué beneficios aportan al retail: afluencia exacta, conversión y decisiones de personal con datos fiables.",
  },
  // 2 descriptions duplicadas entre sí (webinar Roi Iglesias + whitepaper IA retail)
  "es/la-revolucion-de-la-videoanalitica-en-retail-asi-fue-nuestro-webinar-con-roi-iglesias": {
    title: "Webinar de videoanalítica con Roi Iglesias",
    excerpt: "Resumen del webinar con Roi Iglesias: cómo la videoanalítica con IA transforma el retail, casos reales y preguntas de la audiencia.",
  },
  "es/la-ia-al-servicio-del-retail-descubre-el-poder-del-video-analytics": {
    title: "La IA al servicio del retail (whitepaper)",
    excerpt: "Whitepaper: la IA al servicio del retail. Qué aporta el vídeo analytics a tiendas y centros comerciales y cómo empezar a aplicarlo.",
  },
};

// Lee los HTML reescritos desde data/post-rewrites-es/ (dentro del repo).
// Carpeta canónica en el repo agencia: esconzeta-mc/_local/_global/clientes/flame/seo/rewrites-es-2026-05
// Se ejecuta en build time (los page.tsx son SSG con generateStaticParams).
const REWRITES_DIR = path.resolve(process.cwd(), "data", "post-rewrites-es");

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
