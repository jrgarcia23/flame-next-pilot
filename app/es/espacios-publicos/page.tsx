import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Espacios públicos · Flame Analytics",
  description: "Mejor experiencia del cliente y rendimiento del lugar. Soluciones de data intelligence para museos, transporte público y universidades con big data e IA.",
  alternates: {
    canonical: "/es/espacios-publicos/",
    languages: {
    es: "/es/espacios-publicos/",
    en: "/en/public-venues/",
    "x-default": "/es/espacios-publicos/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/espacios-publicos/",
    siteName: "Flame Analytics",
    title: "Espacios públicos · Flame Analytics",
    description: "Mejor experiencia del cliente y rendimiento del lugar. Soluciones de data intelligence para museos, transporte público y universidades con big data e IA.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacios públicos · Flame Analytics",
    description: "Mejor experiencia del cliente y rendimiento del lugar. Soluciones de data intelligence para museos, transporte público y universidades con big data e IA.",
    images: ["/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Espacios públicos · Flame Analytics",
  metaDescription: "Data intelligence para museos, transporte y universidades.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Espacios públicos",
  heroSub: "Flame convierte las cámaras que ya tienes en tu espacio en datos accionables: afluencia, aforo, seguridad y uso real de cada zona. Analítica de espacios públicos con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para gestionar la seguridad, planificar eventos y justificar el uso ante la administración con datos reales.",
  pillars: [
    { title: "Avanzado", desc: "Software para la planificación de rutas y la optimización de recursos, diseñado específicamente para sistemas de transporte público.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "En tiempo real", desc: "Análisis del flujo de visitantes e insights de datos para tomar decisiones informadas en museos.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Empoderar", desc: "Campus universitarios con analítica en tiempo real, que permiten una toma de decisiones informada.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-public.png",
      imgAlt: "Museos",
      title: "",
      titleHl: "Museos",
      bullets: [
        "Detecta determinadas situaciones y lleva a cabo acciones concretas para subsanarlas.",
        "Mejora la rentabilidad y eficacia de tu espacio físico, consiguiendo a la vez un visitante más feliz, más fiel y más comprometido.",
        "Personaliza la experiencia de los clientes. Reduce los tiempos de espera en cola, envía ofertas personalizadas en la tienda del museo, etc.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-public.png",
      imgAlt: "Transporte público",
      title: "Transporte",
      titleHl: "público",
      bullets: [
        "Conoce de forma individual a cada usuario: en qué parada se sube, cuánto tiempo permanece en el vehículo y en qué parada se baja.",
        "Mejora la planificación de recursos.",
        "Toma las mejores decisiones para ofrecer un servicio óptimo.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-public.png",
      imgAlt: "Universidades",
      title: "",
      titleHl: "Universidades",
      bullets: [
        "Obtén una estimación en tiempo real de la ocupación de cada edificio del campus.",
        "Notifica a los estudiantes la ocupación de cada edificio en pantallas de información y en aplicaciones móviles.",
        "Obtén información sobre el uso real del espacio disponible y conoce de forma proactiva el nivel de actividad en las distintas zonas.",
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
  testimonialsIdx: [0, 5, 7],
  faqs: getFaqs("public-venues", "es"),
  ctaStripBold: "Datos en tiempo real para decisiones que mejoran la experiencia.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function EspaciosPublicosSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/public-venues/" />;
}
