import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Data Intelligence para Centros Comerciales · Flame Analytics",
  description: "Optimización de la combinación de arrendatarios y experiencia del cliente. Soluciones de analítica y marketing para centros comerciales basadas en big data e IA.",
};

const cfg: SectorConfig = {
  metaTitle: "Centros Comerciales · Flame Analytics",
  metaDescription: "Optimización de tenant mix y experiencia del cliente.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para centros comerciales",
  heroSub: "Soluciones de analítica y marketing diseñadas para centros comerciales de todo el mundo. En Flame, desarrollamos e implementamos soluciones de analítica y marketing digital que, gracias al big data y la Inteligencia Artificial, mejoran la gestión y ayudan al centro a comprender el comportamiento de los clientes.",
  pillars: [
    { title: "Impulsa", desc: "Una comprensión integral del comportamiento del cliente a través del análisis de datos. Al observar de cerca las preferencias e interacciones, obtendrás información valiosa para una mejor toma de decisiones y el desarrollo de estrategias centradas en el cliente.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Mide", desc: "Mejorar continuamente el rendimiento general del centro. Mediante la implementación de evaluaciones constantes e iniciativas de mejora, se garantiza una excelencia operativa sostenida y resultados óptimos.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Transforma", desc: "La experiencia del cliente. Diseñar una experiencia personalizada y fluida dentro del centro comercial, adaptando los servicios y la oferta a las preferencias individuales para mejorar la satisfacción general.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-malls.png",
      imgAlt: "Conoce y comprende el comportamiento de tus clientes",
      title: "Conoce y comprende el comportamiento de tus",
      titleHl: "clientes",
      bullets: [
        "Mejorar la estrategia de arrendamiento de cada centro gracias a la analítica avanzada y el Big Data.",
        "Comprender el comportamiento de los visitantes y ofrecerles la mejor experiencia y el mejor mix de marcas.",
        "Unificar el análisis del portafolio de centros, proporcionando las mejores herramientas a tus equipos.",
        "Impulsa las ventas y optimiza la rentabilidad y la eficiencia de tu negocio con datos precisos.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-malls.png",
      imgAlt: "Mide y mejora el rendimiento del centro",
      title: "Mide y mejora el rendimiento del",
      titleHl: "centro",
      bullets: [
        "Optimiza y planifica las operaciones del centro (limpieza, mantenimiento, seguridad, etc.) basándote en los datos del flujo de visitantes. Así maximizarás el valor de tu centro.",
        "Mejora las relaciones con los inquilinos proporcionando información y datos relevantes de los visitantes en tiempo real.",
        "Ofrece la mejor experiencia. Descubre las trayectorias más comunes, cuantifica el tráfico y el tiempo de permanencia por zona, genera mapas de calor para comprender los patrones de comportamiento y define alertas de ocupación.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-malls.png",
      imgAlt: "Eleva la experiencia del cliente",
      title: "Eleva la experiencia del cliente y aumenta la",
      titleHl: "fidelidad",
      bullets: [
        "Obtén contactos valiosos. Proporciona una conexión Wifi segura y sin interrupciones para los visitantes, mejorando su experiencia y posibilitando campañas personalizadas.",
        "Lanza campañas personalizadas en tiempo real basadas en la ubicación y el comportamiento del usuario.",
        "Mejora la experiencia del usuario simplificando la participación en el programa de fidelidad, permitiendo que los usuarios escaneen tickets para la extracción automática de información.",
        "Unifica los perfiles de los clientes y optimiza las campañas de marketing. Conéctate de manera fluida con las principales plataformas de CRM como MailChimp, Salesforce, Hubspot, Placewise, Neuromobile, etc.",
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
      href: "/es/analitica-trafico-draft/",
      img: "/wp-content/uploads/2026/01/Traffic2-1.png",
    },
    {
      title: "Customer Journey",
      desc: "Rastrea los recorridos y las interacciones de los clientes para comprender el comportamiento en la tienda y optimizar la experiencia en cada punto de contacto.",
      href: "/es/customer-journey-draft/",
      img: "/wp-content/uploads/2026/01/Customer_journey2-scaled-1.png",
    },
    {
      title: "Connect",
      desc: "Recopila datos de los visitantes a través del WiFi para huéspedes y lanza campañas de marketing personalizadas basadas en la ubicación, el perfil y el comportamiento.",
      href: "/es/connect-draft/",
      img: "/wp-content/uploads/2026/01/Connect-1-1.png",
    },
  ],
  testimonialsIdx: [0, 1, 7, 8],
  faqs: [],
  ctaStripBold: "Convierte la afluencia en valor para inquilinos y visitantes.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function CentrosComercialesSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/solution-for-shopping-malls/" />;
}
