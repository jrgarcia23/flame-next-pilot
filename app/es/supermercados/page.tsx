import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

const CDN = "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/landings";

export const metadata: Metadata = {
  title: "Data Intelligence para Supermercados · Flame Analytics",
  description: "Optimiza layout, operación y conversión en supermercados con analítica de vídeo e IA: entiende al cliente y mejora el rendimiento.",
  alternates: {
    canonical: "/es/supermercados/",
    languages: {
      es: "/es/supermercados/",
      en: "/en/supermarkets/",
      "x-default": "/es/supermercados/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/supermercados/",
    siteName: "Flame Analytics",
    title: "Data Intelligence para Supermercados · Flame Analytics",
    description: "Optimiza el layout, la operación y la conversión en supermercado con la plataforma de analítica avanzada de Flame.",
    locale: "es_ES",
    images: [{ url: `${CDN}/supermercados-hero.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence para Supermercados · Flame Analytics",
    description: "Optimiza el layout, la operación y la conversión en supermercado con la plataforma de analítica avanzada de Flame.",
    images: [`${CDN}/supermercados-hero.png`],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Supermercados · Flame Analytics",
  metaDescription: "Analítica avanzada de comportamiento del cliente, operación y conversión para supermercados.",
  heroBgImage: `${CDN}/supermercados-hero.png`,
  heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para supermercados",
  heroSub: "Flame convierte las cámaras que ya tienes en tu supermercado en datos accionables: afluencia por zonas, colas en caja, conversión y cesta. Analítica de supermercados con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para optimizar el surtido, la dotación de cajeros y el layout con datos reales.",
  pillars: [
    { title: "Entiende", desc: "El comportamiento real de tus clientes en pasillos, secciones y lineales. Mapea recorridos, detecta puntos calientes y descubre dónde se toman las decisiones de compra.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Mide",     desc: "El rendimiento de cada metro cuadrado del supermercado. Compara tiendas, identifica zonas de alto y bajo rendimiento, y conecta el comportamiento en sala con las ventas.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Conecta",  desc: "Con tus visitantes desde el primer punto de contacto digital. Captura datos vía WiFi y portal cautivo, identifica recurrentes vs nuevos, y activa campañas en tiempo real.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: `${CDN}/supermercados-layout.png`,
      imgAlt: "Optimiza layout y rendimiento por zona en supermercado",
      title: "Optimiza layout y rendimiento por",
      titleHl: "zona",
      bullets: [
        "Flujo de clientes: analiza tráfico, recorridos y patrones de movimiento para entender cómo se mueven tus clientes por el supermercado y cómo toman decisiones.",
        "Análisis por zonas: mide tráfico y tiempo de permanencia por sección para detectar áreas de alto y bajo rendimiento.",
        "Análisis por lineal: identifica niveles de interacción con el producto dentro de cada lineal y las zonas de mayor atención.",
        "Visual merchandising: evalúa el impacto del layout y el display de producto en el comportamiento del cliente.",
        "Conversión en tienda: detecta dónde se generan (o se pierden) ventas y optimiza el rendimiento y el ticket medio.",
      ],
    },
    {
      img: `${CDN}/supermercados-customer.png`,
      imgAlt: "Eficiencia operativa en tiempo real en supermercado",
      title: "Eficiencia operativa en tiempo",
      titleHl: "real",
      bullets: [
        "Picos de afluencia: identifica momentos de alta demanda y anticipa necesidades operativas.",
        "Gestión de colas: reduce tiempos de espera, detecta saturación en cajas y mejora la experiencia de pago.",
        "Planificación de personal: ajusta los recursos en función del tráfico real y la carga operativa.",
        "Saturación de zonas: detecta cuellos de botella y áreas con exceso de concentración de clientes.",
        "Monitorización continua: visualiza el estado del supermercado en tiempo real para tomar decisiones inmediatas.",
      ],
    },
    {
      img: `${CDN}/supermercados-impact.png`,
      imgAlt: "Convierte el tráfico en relación con el cliente",
      title: "Convierte el tráfico en relación con el",
      titleHl: "cliente",
      bullets: [
        "Guest WiFi: primer punto de contacto digital para identificar y conectar con el visitante.",
        "Portal cautivo WiFi: captura y valida datos de clientes cumpliendo GDPR y construye una base de datos propia.",
        "Identificación de clientes: distingue entre nuevos y recurrentes para entender comportamiento, frecuencia y valor.",
        "Comunicación en tiempo real: activa campañas y mensajes durante la visita en función del contexto.",
        "Agente IA Flame: analiza los datos y genera insights y recomendaciones operativas automáticas.",
      ],
    },
  ],
  productsTitle: "Productos integrales,",
  productsTitleHl: "tres palancas",
  productsSub: "Medir y mejorar el rendimiento del espacio, comprender el comportamiento de los clientes y conectar con tus visitantes. Tres productos diseñados para construir la operación retail del supermercado moderno.",
  productsBullets: [
    "Optimiza el layout y el rendimiento por zona",
    "Eficiencia operativa en tiempo real",
    "Convierte tráfico en relación con el cliente",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc: "Mide el tráfico dentro y fuera del supermercado, monitoriza la ocupación en tiempo real y mide la conversión, todo desde una plataforma única.",
      href: "/es/analitica-trafico/",
      cta: "Ver más",
      title: "Traffic",
      img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc: "Analiza los recorridos e interacciones por sección y lineal para entender el comportamiento en sala y optimizar la experiencia en cada punto de contacto.",
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
  testimonialsIdx: [0, 1, 7, 8],
  faqs: getFaqs("shopping-malls", "es"),
  ctaStripBold: "Convierte cada pasillo, cada lineal y cada caja en datos accionables.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function SupermercadosSector() {
  return <SectorTemplate cfg={cfg} enHref="/en/supermarkets/" />;
}
