import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Hoteles · Flame Analytics",
  description: "Mejora la gestión hotelera y aumenta la satisfacción y fidelidad de los huéspedes. Análisis integral de datos para hoteles con big data e IA.",
};

const cfg: SectorConfig = {
  metaTitle: "Hoteles · Flame Analytics",
  metaDescription: "Gestión hotelera basada en datos.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png",
  heroBgPosition: "center center",
  heroTitle: "Hoteles",
  heroSub: "Análisis de datos integral para obtener valiosos conocimientos sobre el comportamiento del cliente. Desarrollamos e implantamos soluciones de marketing digital y analítica para espacios físicos que, gracias al big data y la inteligencia artificial, ayudan a los hoteles a captar nuevos clientes y generar más fidelidad.",
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
  testimonialsIdx: [3, 5, 6],
  faqs: [],
  ctaStripBold: "Convierte tu WiFi en el canal directo con cada huésped.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function HotelesSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/hospitality/" />;
}
