import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Espacios públicos · Flame Analytics",
  description: "Mejor experiencia del cliente y rendimiento del lugar. Soluciones de data intelligence para museos, transporte público y universidades con big data e IA.",
};

const cfg: SectorConfig = {
  metaTitle: "Espacios públicos · Flame Analytics",
  metaDescription: "Data intelligence para museos, transporte y universidades.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Espacios públicos",
  heroSub: "Mejora la inteligencia de datos en espacios públicos, desbloqueando información valiosa para una mejor toma de decisiones. En Flame, desarrollamos e implementamos soluciones de marketing digital y analítica que, gracias al big data y a la Inteligencia Artificial, nos permiten tomar las decisiones correctas en tiempo real y ofrecer una experiencia segura y satisfactoria.",
  pillars: [
    { title: "Avanzado", desc: "Software para la planificación de rutas y la optimización de recursos, diseñado específicamente para sistemas de transporte público." },
    { title: "En tiempo real", desc: "Análisis del flujo de visitantes e insights de marketing digital para tomar decisiones informadas en museos." },
    { title: "Empoderar", desc: "Campus universitarios con analítica en tiempo real y estrategias de marketing digital, que permiten una toma de decisiones informada." },
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
  testimonialsIdx: [0, 5, 7],
  faqs: [],
  ctaStripBold: "Datos en tiempo real para decisiones que mejoran la experiencia.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function EspaciosPublicosSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/public-venues/" />;
}
