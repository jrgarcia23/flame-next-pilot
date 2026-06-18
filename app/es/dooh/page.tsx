import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

// Token para previsualizar mientras la landing está oculta. Compártelo solo
// con quien tenga que validar. Cuando se publique la página, eliminar el gate.
const PREVIEW_TOKEN = "jr2026";

// ──────────────────────────────────────────────────────────────────────────
// DOOH · Solución (DRAFT — NO indexable, no enlazado desde el header).
// Para validar con JR antes de publicar. Cuando esté OK:
//   1) Quitar el robots: { index: false } de abajo
//   2) Añadir el link en el header/footer si procede
//   3) Confirmar/elegir el hero image final (ahora usa el de people counting)
// ──────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Medición DOOH · Retail Media para tus pantallas · Flame Analytics",
  description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas. Métricas auditables, sin reconocimiento facial, sobre tu red de cámaras actual.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/es/dooh/",
    languages: {
      es: "/es/dooh/",
      en: "/en/dooh/",
      "x-default": "/es/dooh/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/dooh/",
    siteName: "Flame Analytics",
    title: "Medición DOOH · Retail Media · Flame Analytics",
    description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medición DOOH · Retail Media · Flame Analytics",
    description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas.",
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "DOOH · Flame Analytics",
  metaDescription: "Medición de audiencia DOOH y retail media auditable.",
  heroTitle: "Medición DOOH",
  heroBgImage: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/landings/dooh-hero.png",
  heroBgPosition: "center center",
  heroSub: "Convierte tus pantallas digitales en un negocio retail media real. Flame mide la audiencia que pasa delante de cada pantalla, demuestra el ROI a las marcas y te da los reportes que tu media kit necesita para venderle a anunciantes premium. La misma rigurosidad que pide hoy el digital, aplicada al mundo físico.",
  heroBullets: ["90+ clientes B2B", "12 países", "Sobre tu red de cámaras", "Sin reconocimiento facial"],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Dashboard de medición DOOH de Flame Analytics",
  bigSectionTitle: "Del playlist del CMS al impression",
  bigSectionTitleHl: "real",
  bigSectionPara1: "Las marcas que invierten en retail media ya no compran inventario por OTS estimado a partir del footfall del centro. Quieren saber cuántas personas hubo realmente delante de tu pantalla en cada slot de campaña, qué perfil tenían y cuántas visitaron después la tienda anunciada. Flame entrega esa capa de medición auditable sobre tu red de cámaras existente.",
  bigSectionPara2: "Cuando tienes ese dato, tu rate card sube, tu pitch a la marca tiene proof, tu agencia entiende lo que está comprando y tu centro comercial deja de ser un media owner aspiracional para convertirse en uno real. Todo agregado, anonimizado, sin reconocimiento facial y compatible con tu CMS de señalética y con las plataformas pDOOH.",
  bigSectionBullets: ["Impressions reales", "Demografía anonimizada", "Drive-to-store", "Reportes por campaña"],
  benefitsTitle: "de medir tu DOOH con Flame",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Pasa de vender pantallas a vender audiencias. La diferencia entre un programa retail media que escala y un escaparate digital infrautilizado está en si puedes demostrar el dato.",
  benefits: [
    { icon: "trending",    title: "Aumenta el precio de tu inventario",         desc: "Vende con audiencia auditada, no con estimación. Tu rate card deja de ir al alza de la inflación para ir al alza del dato real que estás entregando." },
    { icon: "convert",     title: "Demuestra ROI a marcas y agencias",          desc: "Drive-to-store, repetición y lift contra grupo de control. El mismo lenguaje que esas marcas exigen ya en sus campañas digitales." },
    { icon: "integration", title: "Conecta con pDOOH y tu CMS",                 desc: "Integración con Broadsign, BrightSign, Scala, Korbyt y con plataformas programáticas (Hivestack/Perion, VIOOH, Place Exchange). Trabajamos dentro de tu stack." },
    { icon: "privacy",     title: "Sin reconocimiento facial · RGPD por diseño", desc: "Datos agregados y anonimizados desde la cámara. Nada identificable sale del centro. Cumplimiento real, no marketing de privacidad." },
  ],
  metricsTitle: "Las métricas que tu media kit necesita",
  metricsTitleHl: "tener",
  metricsSub: "Las marcas premium piden estos datos. Si tu rate card no los entrega, te quedas en el inventario de relleno. Flame los mide y los reporta por campaña, pantalla y zona.",
  metrics: [
    { icon: "eye",          title: "Audience impressions reales",   desc: "Personas reales delante de cada pantalla en cada slot de la campaña, no estimaciones derivadas del footfall del centro." },
    { icon: "users",        title: "Alcance único y frecuencia",    desc: "Cuántos visitantes únicos vieron la campaña y cuántas veces de media. La base de cualquier media plan retail media." },
    { icon: "demographics", title: "Demografía anonimizada",        desc: "Distribución por género y franja de edad por pantalla. Datos agregados, sin identificación, listos para reportar a la marca." },
    { icon: "dwell",        title: "Dwell time y atención",         desc: "Tiempo medio frente a la pantalla y porcentaje de personas con atención efectiva. Calidad de impresión, no solo cantidad." },
    { icon: "convert",      title: "Drive-to-store y lift",         desc: "Visitas incrementales a la tienda anunciada entre expuestos vs no expuestos. El cierre del círculo que cualquier anunciante pide." },
    { icon: "reports",      title: "Reportes por campaña",          desc: "Output listo para enviar a la marca y a la agencia tras cada campaña: pantallas, slots, impressions, perfil y outcomes." },
  ],
  testimonialsIdx: [6, 3, 2],
  faqs: getFaqs("shopping-malls", "es"),
  ctaStripBold: "¿Quieres convertir tus pantallas en un negocio retail media?",
  ctaStripLight: "Auditoría gratuita del potencial DOOH de tu centro. 30 minutos.",
};

export default async function DoohSolutionDraft({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const sp = await searchParams;
  if (sp.preview !== PREVIEW_TOKEN) notFound();
  return <UseCaseTemplate cfg={cfg} enHref={`/en/dooh/?preview=${PREVIEW_TOKEN}`} />;
}
