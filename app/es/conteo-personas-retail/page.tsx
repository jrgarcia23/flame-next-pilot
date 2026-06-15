import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import AnimatedPeopleCountingChart from "@/components/AnimatedPeopleCountingChart";
import { UseCaseConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";

export const metadata: Metadata = {
  title: "Conteo de personas en retail · Mide cada tienda con IA · Flame Analytics",
  description:
    "Mide afluencia, conversión visita-venta y staff-to-traffic en cada tienda. Sin biometría y compatible con las cámaras CCTV que ya tienes instaladas.",
  alternates: {
    canonical: "/es/conteo-personas-retail/",
    languages: {
      es: "/es/conteo-personas-retail/",
      en: "/en/people-counting/",
      "x-default": "/es/conteo-personas-retail/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/conteo-personas-retail/",
    siteName: "Flame Analytics",
    title: "Conteo de personas en retail · Flame Analytics",
    description:
      "Mide afluencia, conversión visita-venta y staff-to-traffic en cada tienda. Sin biometría y compatible con tu CCTV.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Retail-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conteo de personas en retail · Flame Analytics",
    description:
      "Mide afluencia, conversión visita-venta y staff-to-traffic en cada tienda.",
    images: ["/wp-content/uploads/2026/01/Industries_Retail-1.png"],
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "Conteo de personas en retail · Flame Analytics",
  metaDescription:
    "Mide afluencia, conversión visita-venta y staff-to-traffic en cada tienda.",
  heroTitle: "Conteo de personas en retail",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.png",
  heroBgPosition: "center center",
  heroSub:
    "Flame mide con precisión el flujo de visitantes en cada tienda y lo cruza con tu TPV y tu operación. Decide plantilla, horarios y aperturas con datos reales. Diseñado para cadenas retail que quieren entender qué pasa en cada punto de venta, no en la media.",
  heroBullets: [
    "Precisión del 99 %",
    "+500 tiendas medidas",
    "Sin biometría",
    "Compatible con CCTV actual",
  ],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Flame People Counting dashboard retail",
  bigSectionTitle: "Más allá del conteo: inteligencia",
  bigSectionTitleHl: "retail para cada tienda",
  bigSectionPara1:
    "Flame People Counting convierte los conteos brutos en insight accionable para tu red retail. Explora tendencias, compara tiendas y monitoriza el flujo de visitantes a través de dashboards que dan vida a cada punto de venta.",
  bigSectionPara2:
    "Todo en tiempo real, con precisión y privacidad integradas. Sin obra, sin biometría y compatible con tu TPV, ERP y BI retail.",
  bigSectionBullets: [
    "Tráfico exterior",
    "Conversión visita-venta",
    "Tasa de captura",
    "Exclusión de personal",
  ],
  benefitsTitle: "del conteo de personas en retail",
  benefitsTitleHl: "Beneficios",
  benefitsSub:
    "Cada métrica convierte tu intuición en decisión: planifica plantilla por tienda, mide conversión por punto de venta y compara la red completa con dato real, no con suposiciones.",
  benefits: [
    {
      icon: "eye",
      title: "Visibilidad real de cada tienda",
      desc: "Sabes cuántas personas visitan cada punto de venta, cuándo y cómo evolucionan las tendencias. No medias engañosas: dato tienda a tienda.",
    },
    {
      icon: "users",
      title: "Plantilla y operaciones por dato",
      desc: "Ajusta turnos y dotación a la afluencia real de cada tienda. Reduce horas mal asignadas y mejora la atención en hora punta.",
    },
    {
      icon: "grid",
      title: "Compara y prioriza tiendas",
      desc: "Identifica las tiendas top en conversión visita-venta y replica sus prácticas. Detecta las que rinden por debajo de su potencial.",
    },
    {
      icon: "trending",
      title: "Conexión con el TPV",
      desc: "Cruza visitantes con tickets de venta para descubrir oportunidades reales de conversión y ROI por tienda.",
    },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub:
    "Más allá del «cuántos entran». Flame cruza visitantes con tu operación y tus ventas para descubrir patrones accionables en cada tienda.",
  metrics: [
    {
      icon: "clock",
      title: "Afluencia total y por franja",
      desc: "Visitas reales día a día, hora a hora. Detecta picos y valles del tráfico real en cada tienda.",
    },
    {
      icon: "convert",
      title: "Conversión visita → venta",
      desc: "Cruza tráfico con tu TPV. Sabes qué % de visitantes acaba comprando en cada punto de venta.",
    },
    {
      icon: "calendar",
      title: "Patrones semanales y picos",
      desc: "Identifica los momentos críticos de cada tienda. Anticipa con personal y stock.",
    },
    {
      icon: "compare",
      title: "Benchmark entre tiendas",
      desc: "Compara red completa con criterio homogéneo. Identifica top y replica sus prácticas.",
    },
    {
      icon: "street",
      title: "Tráfico exterior y captación",
      desc: "Cuántas personas pasan frente a tu tienda y cuántas entran. Mide la capacidad del escaparate.",
    },
    {
      icon: "ratio",
      title: "Staff-to-traffic ratio",
      desc: "Personal real necesario en cada franja. Reduce hasta un 18 % horas mal asignadas.",
    },
  ],
  testimonialsIdx: [6, 3, 2],
  faqs: getFaqs("retail", "es"),
  ctaStripBold: "Cada tienda es única. Tu data debe demostrarlo.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function ConteoPersonasRetail() {
  return (
    <UseCaseTemplate
      cfg={cfg}
      enHref="/en/people-counting/"
      bigSectionVisualOverride={<AnimatedPeopleCountingChart />}
    />
  );
}
