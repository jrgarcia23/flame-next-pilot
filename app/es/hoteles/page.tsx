import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Hoteles · Flame Analytics",
  description: "Mejora la gestión hotelera y aumenta la satisfacción y fidelidad de los huéspedes. Análisis integral de datos para hoteles con big data e IA.",
  alternates: {
    canonical: "/es/hoteles/",
    languages: {
    es: "/es/hoteles/",
    en: "/en/hospitality/",
    "x-default": "/es/hoteles/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/hoteles/",
    siteName: "Flame Analytics",
    title: "Hoteles · Flame Analytics",
    description: "Mejora la gestión hotelera y aumenta la satisfacción y fidelidad de los huéspedes. Análisis integral de datos para hoteles con big data e IA.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoteles · Flame Analytics",
    description: "Mejora la gestión hotelera y aumenta la satisfacción y fidelidad de los huéspedes. Análisis integral de datos para hoteles con big data e IA.",
    images: ["/wp-content/uploads/2026/01/Industries_Hospitality-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Hoteles · Flame Analytics",
  metaDescription: "Gestión hotelera basada en datos.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png",
  heroBgPosition: "center center",
  heroTitle: "Hoteles",
  heroSub: "Flame convierte las cámaras y el WiFi que ya tienes en tu hotel en datos accionables: afluencia y ocupación del lobby, el restaurante o el spa. Analítica hotelera con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para ajustar el personal, controlar el aforo y justificar cada instalación con datos reales.",
  pillars: [
    { title: "Consigue", desc: "Un aumento significativo en las ventas y la construcción de una clientela de clientes satisfechos mediante enfoques empresariales estratégicos.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Genera", desc: "Reservas directas para tu hotel, fomentando una relación directa y rentable con los huéspedes.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Personaliza", desc: "Cada experiencia del cliente, personalizando la estancia de cada huésped según sus preferencias y necesidades únicas.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-hosp.png",
      imgAlt: "Conexión rápida y segura",
      title: "Conexión rápida y",
      titleHl: "segura",
      bullets: [
        "Proporciona una experiencia de conexión rápida y sencilla sin tener que realizar engorrosos inicios de sesión en el portal WiFi.",
        "Ofrece un servicio confiable a los huéspedes del hotel, tanto en habitaciones como en salones y otras áreas comunes, mediante una conexión WiFi segura.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-hosp.png",
      imgAlt: "Enriquece tu CRM",
      title: "Enriquece tu",
      titleHl: "CRM",
      bullets: [
        "Aumenta automáticamente el CRM de tu hotel con información de contacto de cada cliente, aumentando así el valor de las reservas realizadas a través de plataformas como Booking, TripAdvisor, etc.",
        "Si no dispones de un CRM, utiliza Connect, el módulo de marketing/campañas que te ofrece Flame.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-hosp.png",
      imgAlt: "Integración con PMS",
      title: "Integración con",
      titleHl: "PMS",
      bullets: [
        "Automatiza la gestión del servicio de WiFi en una sola plataforma integrándolo con la aplicación PMS.",
        "Haz aún más fácil para el huésped el servicio de Guest WiFi y también más controlable para el hotel, integrándolo con el PMS.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-4-hosp.png",
      imgAlt: "Envia ofertas personalizadas",
      title: "Envia ofertas",
      titleHl: "personalizadas",
      bullets: [
        "Aumenta los ingresos adicionales por cada habitación vendida promocionando otras áreas del hotel que generen una mejor experiencia para los clientes.",
        "Comunica a los huéspedes los servicios disponibles en el hotel (bar, restaurante, spa, etc.) durante su estancia, adaptados a la zona específica del establecimiento y a la hora del día.",
        "Fomenta las ventas cruzadas o las mejoras para futuras reservas, como ofertas de «salida tardía», ampliaciones especiales del aparcamiento o mejoras a habitaciones superiores, reconociendo la singularidad de cada cliente.",
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
  testimonialsIdx: [3, 5, 6],
  faqs: getFaqs("hospitality", "es"),
  ctaStripBold: "Convierte tu WiFi en el canal directo con cada huésped.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function HotelesSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/hospitality/" />;
}
