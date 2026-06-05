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
  heroSub: "En Flame desarrollamos e implantamos soluciones de marketing digital y analítica para espacios físicos que, gracias al big data y la Inteligencia Artificial, mejoran la gestión y ayudan a los retailers a entender el comportamiento de sus clientes.",
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
  products: [
    {
      title: "Traffic",
      desc: "Mide el tráfico exterior e interior, sigue la ocupación en tiempo real y calcula la conversión, todo en una potente plataforma.",
      href: "/es/analitica-trafico/",
      img: "/wp-content/uploads/2026/01/Traffic2-1.png",
    },
    {
      title: "Customer Journey",
      desc: "Rastrea los recorridos y las interacciones de los clientes para comprender el comportamiento en la tienda y optimizar la experiencia en cada punto de contacto.",
      href: "/es/customer-journey/",
      img: "/wp-content/uploads/2026/01/Customer_journey2-scaled-1.png",
    },
    {
      title: "Connect",
      desc: "Recopila datos de los visitantes a través del WiFi para huéspedes y lanza campañas de marketing personalizadas basadas en la ubicación, el perfil y el comportamiento.",
      href: "/es/connect/",
      img: "/wp-content/uploads/2026/01/Connect-1-1.png",
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
