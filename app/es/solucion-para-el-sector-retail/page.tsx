import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Data Intelligence para Retail · Flame Analytics",
  description: "Mejora el rendimiento de cada tienda con datos accionables. Analítica + marketing para retail basados en IA, vídeo y big data.",
  alternates: {
    canonical: "/es/solucion-para-el-sector-retail/",
    languages: {
    es: "/es/solucion-para-el-sector-retail/",
    en: "/en/solution-for-retail-sector/",
    "x-default": "/es/solucion-para-el-sector-retail/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/solucion-para-el-sector-retail/",
    siteName: "Flame Analytics",
    title: "Data Intelligence para Retail · Flame Analytics",
    description: "Mejora el rendimiento de cada tienda con datos accionables. Analítica + marketing para retail basados en IA, vídeo y big data.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Retail-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence para Retail · Flame Analytics",
    description: "Mejora el rendimiento de cada tienda con datos accionables. Analítica + marketing para retail basados en IA, vídeo y big data.",
    images: ["/wp-content/uploads/2026/01/Industries_Retail-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Data Intelligence para Retail · Flame Analytics",
  metaDescription: "Mejora el rendimiento de cada tienda con datos accionables.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.png",
  heroBgPosition: "center center",
  heroTitle: "Data Intelligence para Retail",
  heroSub: "Flame convierte las cámaras que ya tienes en tu tienda en datos accionables: cuánta gente entra, cómo se mueve y qué convierte. Analítica de retail físico con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para decidir el layout, la dotación de personal, la ubicación de producto y tus campañas con datos reales.",
  pillars: [
    { title: "Impulsa", desc: "Información valiosa sobre el comportamiento de tus clientes mediante una vigilancia activa. Conociendo sus acciones, preferencias y pautas, podrás tomar decisiones basadas en datos objetivos y precisos.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Mide", desc: "Optimiza el rendimiento de tu punto de venta para alcanzar rentabilidad y eficiencia. Implementa análisis basados en datos para perfeccionar tu estrategia comercial y garantizar una operación más rentable.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Transforma", desc: "Mejora la experiencia en retail mediante la personalización de las interacciones con tus clientes. Incrementa la satisfacción y el engagement ofreciendo experiencias a medida, potenciando así la experiencia global en tienda.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-retail.png",
      imgAlt: "Comprende el comportamiento de los clientes",
      title: "Comprende el comportamiento de los",
      titleHl: "clientes",
      bullets: [
        "Explora cómo interactúan tus clientes en el punto de venta, incluidos los patrones de tráfico y movimiento, lo que te permitirá tomar decisiones óptimas en cuanto a horarios de apertura, dotación de personal, diseño del layout, ubicación de producto, etc.",
        "Mejora la experiencia de compra de tus clientes identificando sus preferencias y ofreciéndoles lo que quieren y necesitan.",
        "Genera una clientela más fiel y comprometida con tu marca.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-retail.png",
      imgAlt: "Conoce el rendimiento de tu punto de venta",
      title: "Conoce el rendimiento de tu",
      titleHl: "punto de venta",
      bullets: [
        "Averigua cómo está funcionando tu escaparate y su capacidad de atracción y captura.",
        "Descubre si la ubicación de tu negocio es óptima.",
        "Mejora tus tasas de conversión, rentabilidad y eficacia empresarial general.",
        "Con Shopper Funnel, puedes medir los indicadores clave de rendimiento (KPIs) a lo largo del recorrido del cliente.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-retail.png",
      imgAlt: "Lanza campañas efectivas basadas en ubicación",
      title: "Lanza campañas efectivas basadas en",
      titleHl: "ubicación",
      bullets: [
        "Envía mensajes push personalizados a tus clientes cuando estén en el punto de venta y dales una atención única.",
        "Crea campañas basadas en un segmento concreto (género, edad, código postal) o en un comportamiento determinado (fidelidad, intereses).",
      ],
    },
        {
      img: "/wp-content/uploads/2026/01/benefit-4-retail.png",
      imgAlt: "Gestiona de forma óptima tus ubicaciones",
      title: "Gestiona de forma óptima tus",
      titleHl: "ubicaciones",
      bullets: [
        "Identifica mejores y peores prácticas en diferentes ubicaciones y consigue la tienda perfecta.",
        "Mide los indicadores clave de rendimiento de tus tiendas, como el tráfico exterior e interior, los ratios de captación y conversión, etc., y compáralos entre sí.",
        "Descubre el rendimiento de todas tus localizaciones en cada uno de los puntos claves o KPIs del proceso.",
      ],
    },
  ],
  productsTitle: "Productos integrales,",
  productsTitleHl: "múltiples soluciones",
  productsSub: "Medir y mejorar el rendimiento del espacio, comprender el comportamiento de los clientes y conectar con tus visitantes.",
  productsBullets: [
    "Mide y mejora el rendimiento del espacio",
    "Comprende el comportamiento de los clientes",
    "Conecta con tus visitantes",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc: "Mide el tráfico dentro y fuera del espacio, monitorea la ocupación en tiempo real y mide la conversión, todo desde una plataforma única y completa.",
      href: "/es/analitica-trafico/",
      cta: "Ver más",
      title: "Traffic",
      img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc: "Analiza los recorridos e interacciones de los clientes para comprender su comportamiento en la tienda y optimizar la experiencia en cada punto de contacto.",
      href: "/es/recorrido-del-cliente/",
      cta: "Ver más",
      title: "Customer Journey",
      img: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/Group-1.png",
      name: "Connect",
      desc: "Recopila datos de los visitantes a través del WiFi para invitados y lanza campañas de marketing personalizadas según su ubicación, perfil y comportamiento.",
      href: "/es/connect/",
      cta: "Ver más",
      title: "Connect",
      img: "/wp-content/uploads/2026/01/Group-1.png",
    },
  ],
  testimonialsIdx: [2, 4, 6],
  faqs: getFaqs("retail", "es"),
  ctaStripBold: "Cada tienda es única. Tu data debe demostrarlo.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function RetailSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/solution-for-retail-sector/" />;
}
