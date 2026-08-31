import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { ProductConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Customer Journey · Recorridos y dwell time · Flame Analytics",
  description:
    "Analiza recorridos y dwell time en tienda: optimiza el layout, aumenta la interacción y mide el customer journey completo.",
  alternates: {
    canonical: "/es/recorrido-del-cliente/",
    languages: {
    es: "/es/recorrido-del-cliente/",
    en: "/en/customer-journey/",
    "x-default": "/es/recorrido-del-cliente/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/recorrido-del-cliente/",
    siteName: "Flame Analytics",
    title: "Customer Journey · Recorridos y dwell time · Flame Analytics",
    description: "Analiza recorridos y dwell time en tienda: optimiza el layout, aumenta la interacción y mide el customer journey completo.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Journey · Recorridos y dwell time · Flame Analytics",
    description: "Analiza recorridos y dwell time en tienda: optimiza el layout, aumenta la interacción y mide el customer journey completo.",
  },
};

const cfg: ProductConfig = {
  metaTitle: "Customer Journey · Flame",
  metaDescription: "Convierte el comportamiento en mejores experiencias.",
  heroBgImage: "/wp-content/uploads/2026/01/Customer_journey2-scaled-1.png",
  heroEyebrow: "Convierte el comportamiento de los visitantes en mejores experiencias",
  heroTitle: "Recorrido del cliente",
  heroSub: "Analiza y mejora las experiencias de compra y el flujo de clientes mediante avanzados conocimientos sobre el comportamiento. Optimiza la disposición, aumenta la interacción y mide el recorrido completo de tu visitante, desde la entrada hasta la conversión.",
  heroBullets: ["7 funcionalidades en 1", "Mapas de flujo", "Tiempo real <60 s", "Sin biometría"],
  // Sin sección intermedia: el live de Customer Journey va directo de beneficios a funcionalidades
  benefitsTitle: "Customer Journey conecta",
  benefitsTitleHl: "movimiento y resultado",
  benefitsSub: "Cada paso del visitante explicado: dónde, cuánto tiempo, qué le atrae y cómo termina el recorrido.",
  benefits: [
    { icon: "behavior", title: "Optimiza el diseño de la tienda",  desc: "Utiliza patrones de movimiento y datos sobre el tiempo de permanencia para diseñar distribuciones más inteligentes, ubicar los productos de manera eficaz y mejorar el flujo de tráfico en tus espacios." },
    { icon: "trending", title: "Impulsa el rendimiento",            desc: "Sigue el recorrido completo del visitante, conecta cada interacción con resultados de negocio y descubre dónde generar más valor." },
    { icon: "users",    title: "Comprende los segmentos",           desc: "Diferencia comportamientos por tipo de visitante: recurrente, ocasional o pasajero, y adapta tu estrategia a cada perfil." },
  ],
  featuresTitle: "Descubre todas nuestras",
  featuresTitleHl: "funcionalidades",
  featuresSub: "La plataforma de IA de vídeo que optimiza las decisiones y maximiza tu valor y tus ventas.",
  features: [
    {
      icon: "journey", title: "Mapas de flujo de visitantes",
      intro: "Visualiza los patrones de flujo de los visitantes para comprender cómo las personas se desplazan por tu espacio, desde las entradas hasta las zonas clave.",
      desc: "Utiliza estos conocimientos para optimizar los diseños, agilizar el flujo de tráfico, mejorar las estrategias de señalización y crear recorridos sin fricciones que aumenten la interacción y la conversión.",
      bullets: ["Flujos entrada → zonas clave", "Sankey de recorridos", "Optimización de señalización", "Reducción de fricciones"],
    },
    {
      icon: "integration", title: "Interacción en zonas",
      intro: "Analiza cómo se conecta cada zona con las demás midiendo tanto el tráfico entrante como el saliente.",
      desc: "Comprende qué áreas atraen a los visitantes, cuáles generan movimiento y cómo se desplaza el flujo dentro de tu espacio. Utiliza estos datos para optimizar la disposición, mejorar la señalización y maximizar la conversión entre zonas.",
      bullets: ["Tráfico entrante por zona", "Tráfico saliente por zona", "Atracción inter-zonas", "Conversión entre zonas"],
    },
    {
      icon: "dwell", title: "Tráfico de zona y duración de la estancia",
      intro: "Mide cómo se desplazan los visitantes y cuánto tiempo permanecen en cada zona para descubrir la verdadera dinámica de tu espacio.",
      desc: "Identifica las áreas de mayor tráfico, optimiza la disposición y las exhibiciones, y comprende los niveles de interacción para mejorar el flujo, la visibilidad y el rendimiento general.",
      bullets: ["Tráfico por zona", "Dwell time medio", "Top hotspots", "Identificación de zonas frías"],
    },
    {
      icon: "convert", title: "Conversión de zona",
      intro: "Ve más allá de la conversión de ventas tradicional midiendo el rendimiento a nivel de zona.",
      desc: "Conecta Flame a tu sistema POS para vincular el tráfico con las transacciones, o analiza la conversión directamente a partir del comportamiento en tienda, desde las visitas hasta el área de caja hasta las interacciones con el personal.",
      bullets: ["Integración con POS", "Conversión por zona", "Atribución de venta", "Análisis sin POS (vía comportamiento)"],
    },
    {
      icon: "behavior", title: "Mapas de calor",
      intro: "Supervisa cómo los clientes interactúan con tu espacio mediante mapas de calor detallados que destacan la densidad de movimiento y el tiempo de permanencia.",
      desc: "Detecta las áreas de mayor tráfico, optimiza las zonas infrautilizadas y toma decisiones informadas para mejorar el diseño de la tienda, la ubicación de los productos y la experiencia del cliente.",
      bullets: ["Heatmap por planta", "Densidad de movimiento", "Tiempo de permanencia", "Comparativa temporal"],
    },
    {
      icon: "queue", title: "Análisis de colas",
      intro: "Supervisa las colas en tiempo real, anticipa las necesidades de servicio y actúa antes de que los problemas se agraven.",
      desc: "Reduce los tiempos de espera y evita la pérdida de visitantes mediante el seguimiento de la longitud de las colas, la ocupación y la eficiencia del personal, garantizando una experiencia de pago más fluida en todas las ubicaciones.",
      bullets: ["Ocupación de la cola", "Monitoreo del tamaño", "Medición del tiempo de espera", "Alertas e integración con pantallas digitales"],
    },
    {
      icon: "clock", title: "Duración de la visita",
      intro: "Mide cuánto tiempo permanecen los visitantes en tus espacios para evaluar el nivel de interacción, la efectividad del diseño y el potencial de ventas.",
      desc: "La duración de la visita es una señal de comportamiento clave: mídela para optimizar la colocación de productos, la asignación de personal y las estrategias promocionales según cómo las personas realmente se mueven y permanecen en el espacio.",
      bullets: ["Duración media de visita", "Relación con tasa de conversión", "Comparativa entre tiendas", "Histórico para benchmarks"],
    },
  ],
  pillarsTitle: "Por qué elegir",
  pillarsTitleHl: "Flame Customer Journey",
  pillarsSub: "Cuatro principios que hacen de Flame la plataforma de analítica de comportamiento para empresas que escalan.",
  pillars: [
    { icon: "integration", title: "Agnóstico",  desc: "Flame se conecta con tu hardware y fuentes de datos existentes —CCTV, contadores de personas, WiFi o TPV— garantizando una compatibilidad total y una integración sin fricciones." },
    { icon: "grid",        title: "Escalable",  desc: "Desde un solo sitio hasta miles, Flame escala sin esfuerzo. Gestiona cada ubicación a distancia a través de una única plataforma basada en la nube." },
    { icon: "compare",     title: "Preciso",    desc: "La IA patentada proporciona análisis precisos y coherentes, así como datos listos para la toma de decisiones en todos los entornos." },
    { icon: "privacy",     title: "Privacidad", desc: "Flame procesa los datos de forma anónima y sin datos biométricos, garantizando el cumplimiento del RGPD y la total privacidad de los visitantes." },
  ],
  testimonialsIdx: [0, 7, 8],
  faqs: getFaqs("customer-journey", "es"),
  ctaStripBold: "Diseña espacios que vendan, no espacios que ocupen sitio.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
  fichaPdf: "/fichas/journey.pdf",
  fichaTitle: "Customer Journey",
  fichaHook: "De la entrada a la conversión: cómo Flame mide el recorrido completo del cliente en el espacio físico, en un PDF.",
};

export default function CustomerJourneyDraft() {
  return <ProductTemplate cfg={cfg} enHref="/en/customer-journey/" />;
}
