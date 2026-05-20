import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Conversion Analytics · Flame Analytics",
  description: "Mide qué tráfico convierte y dónde se pierde valor en el funnel físico. Une visitantes con ventas para descubrir el potencial real de tu espacio.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Conversion Analytics · Flame Analytics",
  metaDescription: "Del paseante a la compra. Conoce qué impulsa de verdad la conversión.",
  heroBgImage: "/wp-content/uploads/2026/01/conversion_analytics.png",
  heroBgPosition: "center center",
  heroTitle: "Conversion Analytics",
  heroSub: "Flame te da una visión completa de tu embudo físico de conversión: desde el tráfico de calle y la entrada en tienda hasta el tiempo de permanencia y la venta final. Entiende qué atrae a los visitantes, cuánto se quedan y qué les lleva a comprar. Optimiza tasas de captación y conversión para maximizar ingresos y el rendimiento global de cada tienda.",
  heroBullets: ["Embudos de conversión", "Tasas de conversión", "Insights de ventas", "Duración de la visita"],
  imageBigSrc: "/wp-content/uploads/2026/01/Conversion_analytics_recorte.png",
  imageBigAlt: "Dashboard Flame Conversion Analytics",
  bigSectionTitle: "Conoce Flame",
  bigSectionTitleHl: "Conversion",
  bigSectionPara1: "Flame Conversion conecta la analítica de visitantes con los datos de ventas para visualizar tu embudo completo: desde el tráfico que pasa por la calle hasta la interacción en tienda y la compra.",
  bigSectionPara2: "Analiza tasas de captación y conversión, tiempo de permanencia y rendimiento por zona, tienda o categoría. Convierte los datos en acción con dashboards en tiempo real que te ayudan a aumentar las ventas y la rentabilidad en todas tus ubicaciones.",
  bigSectionBullets: ["Embudos de conversión", "Tasas de conversión", "Insights de ventas", "Duración de la visita"],
  benefitsTitle: "del Conversion Analytics",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Convierte la intuición en plan de acción: dónde optimizar, cuándo intervenir y qué campaña realmente mueve la venta.",
  benefits: [
    { icon: "convert",   title: "Conversión real, no estimada",            desc: "Mide el % real de visitantes que compran. Sin asumir nada, sin extrapolaciones." },
    { icon: "trending",  title: "Identifica fugas en el funnel",            desc: "Detecta exactamente dónde se pierde valor entre la visita y la venta." },
    { icon: "users",     title: "Staffing dimensionado por conversión",     desc: "Refuerza personal solo donde y cuando convierte más, no solo cuando hay tráfico." },
    { icon: "compare",   title: "Atribución de marketing",                  desc: "Mide qué promociones aumentan ventas vs. cuáles solo aumentan tráfico." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Cruza visitantes con tu operación y tus ventas para descubrir patrones accionables.",
  metrics: [
    { icon: "convert",  title: "Tasa de conversión real",   desc: "Visitantes que entran vs. tickets generados. La métrica que importa." },
    { icon: "clock",    title: "Conversión por franja",     desc: "Cuándo conviertes mejor y cuándo se pierden oportunidades." },
    { icon: "behavior", title: "Conversión por zona",       desc: "Qué áreas de la tienda venden y cuáles solo atraen tráfico." },
    { icon: "ratio",    title: "Ticket medio por visita",   desc: "Valor económico real generado por cada visitante." },
    { icon: "compare",  title: "Benchmarks entre tiendas",  desc: "Identifica las top-performers y replica sus prácticas." },
    { icon: "calendar", title: "Impacto de campañas",       desc: "Lift real de conversión durante y tras cada promoción." },
  ],
  testimonialsIdx: [2, 7, 8],
  faqs: [
    { q: "¿Cómo se calcula exactamente la tasa de conversión?",                a: "Flame divide el número de <strong>tickets generados</strong> (datos del TPV) entre el número de <strong>visitantes únicos</strong> (datos de las cámaras) en una ventana de tiempo. Se puede segmentar por hora, día, zona, categoría o vendedor para obtener insights granulares." },
    { q: "¿Funciona con cualquier TPV?",                                       a: "Flame soporta los principales sistemas de TPV (Toshiba, NCR, ICG, Mistral, Cegid, etc.) mediante <strong>integración por API o exportación</strong>. Si tu TPV no está soportado directamente, podemos integrar a través de archivos CSV programados o de tu sistema central." },
    { q: "¿Cuánto tiempo se necesita para empezar a ver datos?",               a: "Tras la firma del contrato, los datos de tráfico están disponibles en <strong>5-7 días</strong>. La integración del TPV añade típicamente 1-2 semanas adicionales según el sistema. En menos de 30 días tienes la conversión real medida en directo." },
    { q: "¿Qué precisión tiene comparado con otros sistemas?",                 a: "Flame alcanza <strong>+98% de precisión</strong> en el conteo de tráfico (validado por auditorías de campo). En conversión, la precisión depende también de la calidad del dato de venta del TPV: típicamente 95-99% cuando hay integración directa." },
    { q: "¿Puedo medir la conversión por categoría de producto?",              a: "Sí, si tu TPV envía la categoría con cada ticket. Flame correlaciona tráfico por zona (medido por la cámara) con ventas por categoría (del TPV) para revelar qué tipos de producto convierten en qué áreas del espacio." },
    { q: "¿Cumple el RGPD?",                                                    a: "Sí, 100%. Flame procesa <strong>siluetas anónimas</strong>, no datos biométricos. No identifica individuos. Los datos del TPV se cruzan a nivel agregado por franja temporal, nunca por individuo." },
  ],
  ctaStripBold: "Conoce tu tasa de conversión real, no la que crees que tienes.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function ConversionAnalyticsDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/conversion-analytics/" />;
}
