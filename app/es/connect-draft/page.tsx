import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { ProductConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Connect · Flame Analytics",
  description: "WiFi que impulsa la fidelización y el retorno. Convierte el WiFi para invitados en un potente canal de marketing y fidelización.",
};

const cfg: ProductConfig = {
  metaTitle: "Connect · Flame",
  metaDescription: "WiFi que impulsa la fidelización y el retorno.",
  heroBgImage: "/wp-content/uploads/2026/01/Connect-1-1.png",
  heroEyebrow: "WiFi que impulsa la fidelización y el retorno",
  heroTitle: "Connect",
  heroSub: "Convierte el WiFi para invitados en un potente canal de marketing. Interactúa con los visitantes en espacios físicos, captura sus datos de contacto y activa campañas personalizadas según ubicación, frecuencia y comportamiento.",
  heroBullets: ["5 funcionalidades en 1", "Portal con tu marca", "Marketing por ubicación", "100% RGPD"],
  // Sin sección intermedia: el live de Connect va directo de beneficios a funcionalidades
  benefitsTitle: "Connect: del acceso WiFi",
  benefitsTitleHl: "a la fidelización",
  benefitsSub: "Cada visitante que se conecta es un lead potencial. Captura, segmenta y reactiva con valor real.",
  benefits: [
    { icon: "wifi",     title: "Captura de datos",         desc: "Recopila perfiles de clientes completos y basados en el consentimiento a través del acceso WiFi para invitados. Crea tu propia base de datos de datos propios para comprender a los visitantes y potenciar estrategias de marketing basadas en datos reales." },
    { icon: "trending", title: "Interactúa en el momento adecuado", desc: "Activa campañas automáticas basadas en visitas, geolocalización o comportamiento, sincronizadas con tu CRM y tu stack de marketing existente." },
    { icon: "convert",  title: "Aumenta la conversión",    desc: "Convierte el acceso WiFi en oportunidad: cupones, descuentos, fidelización, install de app. Mide el embudo de captación → conversión → retención." },
  ],
  featuresTitle: "Descubre todas nuestras",
  featuresTitleHl: "funcionalidades",
  featuresSub: "La plataforma de IA de vídeo que optimiza las decisiones y maximiza tu valor y tus ventas.",
  features: [
    {
      icon: "wifi", title: "Portal WiFi para invitados",
      intro: "Diseña y despliega portales cautivos totalmente personalizables con páginas de aterrizaje de tu marca, inicio de sesión social, gestión de consentimientos y flujos de conexión dinámicos.",
      desc: "Crea formularios personalizados para capturar datos propios de manera sencilla, ofreciendo al mismo tiempo una experiencia de inicio de sesión fluida y segura. Gestiona múltiples ubicaciones desde una sola interfaz y adapta el contenido o diseño de cada lugar para fortalecer la presencia de tu marca y la interacción con los clientes.",
      bullets: ["Portales con tu marca", "Login social y email", "Gestión de consentimientos", "Multi-ubicación con personalización"],
    },
    {
      icon: "trending", title: "Marketing por ubicación",
      intro: "Segmenta audiencias de manera inteligente y lanza campañas automatizadas y basadas en datos a través de correo electrónico, SMS o mensajes dentro del portal.",
      desc: "Crea flujos de trabajo personalizados que se activen según el comportamiento, la frecuencia de visitas o la ubicación, para enviar el mensaje correcto en el momento adecuado. Combina la segmentación de audiencias con marketing basado en la ubicación para llegar a los visitantes mientras se desplazan por tus espacios, aumentando la interacción, la fidelidad y las conversiones, al tiempo que reduces el esfuerzo manual.",
      bullets: ["Email + SMS + in-portal", "Triggers comportamentales", "Segmentación por ubicación", "Campañas automáticas"],
    },
    {
      icon: "integration", title: "Integración con el ecosistema",
      intro: "Integra Connect de manera fluida con tu ecosistema de marketing existente, CRM, PMS y sistemas de BI para sincronizar los datos de los clientes y enriquecer sus perfiles en tiempo real.",
      desc: "Connect actúa como un puente entre los canales físicos y digitales, permitiendo la automatización de marketing unificada y el seguimiento del rendimiento. Utiliza APIs y webhooks para ampliar la conectividad con tus herramientas favoritas y optimizar las operaciones entre equipos.",
      bullets: ["CRM (HubSpot, Salesforce, Brevo)", "PMS hoteleros", "BI (Power BI, Looker)", "APIs y webhooks abiertos"],
    },
    {
      icon: "corp", title: "Acceso a WiFi corporativo",
      intro: "Obtén información anónima sobre la distribución por género y edad de tus visitantes.",
      desc: "Utiliza estos datos para personalizar las experiencias, adaptar el contenido de forma dinámica y aumentar las conversiones mediante una interacción dirigida.",
      bullets: ["Detección de género", "Segmentación por edad", "Integración de señalización digital"],
    },
    {
      icon: "connect", title: "SDK móvil",
      intro: "Incorpora la conectividad WiFi directamente en tu aplicación móvil con el Connect SDK para ofrecer una experiencia realmente fluida y sin fricciones.",
      desc: "Habilita el reconocimiento y acceso automático para usuarios recurrentes, activa interacciones en tiempo real y recopila datos con consentimiento de manera fluida. El SDK permite a las marcas extender el poder de Connect a su propio ecosistema móvil, integrando conectividad, engagement y análisis en una única experiencia para el cliente.",
      bullets: ["SDK iOS y Android", "Reconocimiento automático", "Activación en tiempo real", "Engagement + analítica"],
    },
  ],
  pillarsTitle: "Por qué elegir",
  pillarsTitleHl: "Flame Connect",
  pillarsSub: "Cuatro principios que hacen de Flame la plataforma de marketing WiFi para empresas que escalan.",
  pillars: [
    { icon: "integration", title: "Agnóstico",  desc: "Flame se conecta con tu hardware y fuentes de datos existentes —CCTV, contadores de personas, WiFi o TPV— garantizando una compatibilidad total y una integración sin fricciones." },
    { icon: "grid",        title: "Escalable",  desc: "Desde un solo sitio hasta miles, Flame escala sin esfuerzo. Gestiona cada ubicación a distancia a través de una única plataforma basada en la nube." },
    { icon: "compare",     title: "Preciso",    desc: "La IA patentada proporciona análisis precisos y coherentes, así como datos listos para la toma de decisiones en todos los entornos." },
    { icon: "privacy",     title: "Privacidad", desc: "Flame procesa los datos de forma anónima y sin datos biométricos, garantizando el cumplimiento del RGPD y la total privacidad de los visitantes." },
  ],
  testimonialsIdx: [3, 0, 5],
  faqs: [
    { q: "¿Es compatible con mi infraestructura WiFi actual?",     a: "Sí. Flame Connect se integra con los principales fabricantes de redes (Cisco, Aruba, Ruckus, Cambium, Ubiquiti, etc.) mediante <strong>protocolos estándar RADIUS, WPA Enterprise o redirect HTTP</strong>." },
    { q: "¿Qué tasa de captura de email se consigue?",             a: "Con portal bien diseñado y un incentivo claro (WiFi gratis, cupón, contenido exclusivo), las tasas típicas son <strong>25-40%</strong>. Sin incentivo, baja al 8-15%. Flame incluye plantillas optimizadas por industria." },
    { q: "¿Cómo se gestiona el consentimiento RGPD?",              a: "Consentimiento granular en el portal: el visitante elige qué comparte y para qué finalidades. Doble opt-in opcional. Derecho al olvido implementado con borrado automático tras petición." },
    { q: "¿Funciona en múltiples idiomas?",                         a: "Sí. Detección automática del idioma del dispositivo + traducción configurable a +20 idiomas. Cada portal puede tener variantes diferentes por idioma con copy adaptado." },
    { q: "¿Cuánto cuesta?",                                         a: "Pricing por <strong>número de access points</strong>. Para un local con 2-3 APs, suele estar entre 80-150 €/mes incluyendo portal, captura, automatización básica y sync a CRM. Pricing por volumen para grandes redes." },
    { q: "¿Qué pasa con MAC randomization?",                        a: "Flame está optimizado para entornos con MAC randomization (Apple iOS 14+, Android 11+). La identificación del visitante recurrente se basa en email registrado y patrones de comportamiento, no en MAC." },
  ],
  ctaStripBold: "Tu WiFi no es una utility, es tu canal de marketing más infrautilizado.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function ConnectDraft() {
  return <ProductTemplate cfg={cfg} enHref="/en/connect/" />;
}
