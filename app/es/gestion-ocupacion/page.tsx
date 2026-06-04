import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Gestión de la ocupación · Flame Analytics",
  description: "Ocupación en tiempo real, alertas automatizadas y reporting para cumplimiento y experiencia. Mantén tus espacios equilibrados, eficientes y seguros.",
  alternates: {
    canonical: "/es/gestion-ocupacion/",
    languages: {
    es: "/es/gestion-ocupacion/",
    en: "/en/occupancy-management/",
    "x-default": "/es/gestion-ocupacion/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/gestion-ocupacion/",
    siteName: "Flame Analytics",
    title: "Gestión de la ocupación · Flame Analytics",
    description: "Ocupación en tiempo real, alertas automatizadas y reporting para cumplimiento y experiencia. Mantén tus espacios equilibrados, eficientes y seguros.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestión de la ocupación · Flame Analytics",
    description: "Ocupación en tiempo real, alertas automatizadas y reporting para cumplimiento y experiencia. Mantén tus espacios equilibrados, eficientes y seguros.",
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "Gestión de la ocupación · Flame Analytics",
  metaDescription: "Ocupación en tiempo real, alertas y experiencia.",
  heroTitle: "Gestión de la ocupación",
  heroBgImage: "/wp-content/uploads/2026/01/Occupancy_management-1-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Mantén tus espacios equilibrados, eficientes y seguros. Flame te ayuda a monitorizar en tiempo real el nivel de ocupación de tus recintos y zonas, para que puedas anticipar la demanda, mejorar la experiencia del visitante y optimizar el rendimiento operativo.",
  heroBullets: ["Ocupación en tiempo real", "Alertas automatizadas", "Multi-zona", "Cumple RGPD"],
  imageBigSrc: "/wp-content/uploads/2026/01/Occupancy-Management_recorte.png",
  imageBigAlt: "Flame Occupancy",
  bigSectionTitle: "Visibilidad en directo,",
  bigSectionTitleHl: "decisiones en directo",
  bigSectionPara1: "Flame Occupancy visualiza los niveles de afluencia en directo e históricos en tus recintos con analítica precisa y respetuosa con la privacidad. Obtén dashboards en tiempo real para seguir el confort, la capacidad y el flujo.",
  bigSectionPara2: "Automatiza alertas o señalización cuando se superen los umbrales, garantizando eficiencia y una experiencia del visitante impecable en todo momento.",
  bigSectionBullets: ["Monitorización en tiempo real", "Alertas de ocupación", "App móvil", "Integración de señalización digital"],
  benefitsTitle: "de la gestión de ocupación",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Cumple la normativa, mejora la eficacia y aumenta la seguridad en todas las ubicaciones.",
  benefits: [
    { icon: "occupancy", title: "Visibilidad en tiempo real",         desc: "Monitoriza los niveles de ocupación en directo en recintos, plantas o zonas para mantener confort, eficiencia y seguridad." },
    { icon: "trending",  title: "Anticipa la demanda",                 desc: "Predice picos y adapta dinámicamente los recursos para mantener la calidad del servicio." },
    { icon: "alert",     title: "Alertas y automatizaciones",          desc: "Notificaciones automáticas al superar umbrales y respuestas en cadena con tus sistemas existentes." },
    { icon: "privacy",   title: "Cumplimiento y seguridad",            desc: "Documentación y trazabilidad para cumplir normativa de ocupación. Sin biometría." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Datos accionables para operaciones, seguridad y experiencia, desde el dashboard hasta los display públicos.",
  metrics: [
    { icon: "occupancy", title: "Ocupación actual",                desc: "Ocupación en directo de cada zona, planta o recinto." },
    { icon: "trending",  title: "Picos previstos",             desc: "Modelos de IA que anticipan los momentos de mayor afluencia." },
    { icon: "alert",     title: "Umbrales y alertas",          desc: "Notificaciones al equipo cuando se acerca el límite." },
    { icon: "calendar",  title: "Histórico de ocupación",      desc: "Patrones por hora, día, semana y temporada." },
    { icon: "compare",   title: "Comparativa entre zonas",     desc: "Qué áreas saturan antes y necesitan más recursos." },
    { icon: "reports",   title: "Reporting normativo",         desc: "Documentación auditable para cumplimiento de ocupación." },
  ],
  testimonialsIdx: [3, 5, 8],
  faqs: getFaqs("occupancy", "es"),
  ctaStripBold: "Ocupación en tiempo real, sin sustos en inspección.",
  ctaStripLight: "Operativo en 7 días.",
};

export default function GestionOcupacionDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/occupancy-management/" />;
}
