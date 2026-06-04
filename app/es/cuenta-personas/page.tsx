import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Cuenta personas · Conteo de visitantes con IA · Flame Analytics",
  description:
    "Mide con precisión el tráfico en entradas, plantas y recintos con IA de vídeo. Optimiza operaciones, planifica recursos y aumenta la conversión.",
  alternates: {
    canonical: "/es/cuenta-personas/",
    languages: {
    es: "/es/cuenta-personas/",
    en: "/en/people-counting/",
    "x-default": "/es/cuenta-personas/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/cuenta-personas/",
    siteName: "Flame Analytics",
    title: "Cuenta personas · Conteo de visitantes con IA · Flame Analytics",
    description: "Mide con precisión el tráfico en entradas, plantas y recintos con IA de vídeo. Optimiza operaciones, planifica recursos y aumenta la conversión.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cuenta personas · Conteo de visitantes con IA · Flame Analytics",
    description: "Mide con precisión el tráfico en entradas, plantas y recintos con IA de vídeo. Optimiza operaciones, planifica recursos y aumenta la conversión.",
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "Cuenta personas · Flame Analytics",
  metaDescription: "Conteo de visitantes con IA, sin biometría.",
  heroTitle: "Conteo de personas",
  heroBgImage: "/wp-content/uploads/2026/01/people_counting-1-1-1-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Flame te ayuda a medir con precisión el tráfico en entradas, plantas y recintos, dándote la visibilidad necesaria para optimizar operaciones, planificar recursos de forma eficiente y aumentar la conversión. Diseñado para retailers, centros comerciales y cualquier espacio físico que dependa de comprender el flujo y el rendimiento.",
  heroBullets: ["Precisión del 99 %", "+500 tiendas medidas", "12 países", "Sin biometría"],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Flame people counting dashboard",
  bigSectionTitle: "Más allá del conteo: inteligencia sobre tu",
  bigSectionTitleHl: "afluencia",
  bigSectionPara1: "Flame People Counting convierte los conteos brutos en insight accionable. Explora tendencias, compara ubicaciones y monitoriza el flujo de visitantes a través de dashboards intuitivos que dan vida a tus espacios.",
  bigSectionPara2: "Todo en tiempo real, con precisión y privacidad integradas. Sin obra, sin biometría y compatible con tu stack actual de TPV, ERP y BI.",
  bigSectionBullets: ["Tráfico exterior", "Venue traffic", "Tasa de captura", "Exclusión de personal"],
  benefitsTitle: "del conteo de personas",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Cada métrica convierte tu intuición en decisión: planifica plantilla, mide conversión y compara tiendas con dato real, no con suposiciones.",
  benefits: [
    { icon: "eye",      title: "Comprende tu afluencia real",                    desc: "Obtén visibilidad completa sobre cuántas personas visitan tus tiendas, cuándo y cómo evolucionan las tendencias a lo largo del tiempo." },
    { icon: "users",    title: "Gestión de personal y operaciones eficiente",    desc: "Utiliza datos reales para planificar horarios, ajustar los niveles de servicio a la demanda y reducir ineficiencias." },
    { icon: "grid",     title: "Compara ubicaciones fácilmente",                 desc: "Compara el rendimiento entre tiendas, plantas o redes para identificar mejores prácticas y áreas de mejora." },
    { icon: "trending", title: "Impulsa la conversión y la rentabilidad",        desc: "Conecta los datos de visitantes con las ventas para descubrir oportunidades que aumenten la conversión y el ROI." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Más allá del \"cuántos entran\". Flame cruza visitantes con tu operación y tus ventas para descubrir patrones accionables.",
  metrics: [
    { icon: "clock",    title: "Afluencia total y por franja",       desc: "Visitas reales día a día, hora a hora. Detecta picos y valles de tu tráfico real." },
    { icon: "convert",  title: "Tasa de conversión visita → venta",  desc: "Cruza tráfico con tu TPV. Sabes qué % de visitantes acaba comprando, no solo cuántos entran." },
    { icon: "calendar", title: "Patrones semanales y picos horarios", desc: "Identifica los momentos críticos de la semana. Anticipate con personal y stock." },
    { icon: "compare",  title: "Benchmark entre tiendas",            desc: "Compara red completa, identifica las tiendas top y replica sus prácticas en el resto." },
    { icon: "dwell",    title: "Tiempo medio en tienda",             desc: "Cuánto se queda el visitante. Pista clave de engagement y experiencia." },
    { icon: "ratio",    title: "Staff-to-traffic ratio",             desc: "Personal real necesario en cada franja. Reduce hasta un 18% las horas mal asignadas." },
  ],
  testimonialsIdx: [6, 3, 2],
  faqs: getFaqs("people-counting", "es"),
  ctaStripBold: "Empieza a contar visitantes con precisión real.",
  ctaStripLight: "Conteo de personas operativo en 7 días.",
};

export default function CuentaPersonasDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/people-counting/" />;
}
