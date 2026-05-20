import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Marketing WiFi · Flame Analytics",
  description: "Convierte tu WiFi para invitados en un canal de marketing. Portales personalizados, captura de datos consent-first, automatización y RGPD por diseño.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Marketing WiFi · Flame Analytics",
  metaDescription: "Convierte la conectividad en engagement.",
  heroTitle: "Marketing WiFi",
  heroBgImage: "/wp-content/uploads/2026/01/guest_wifi-2-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Flame Connect transforma tu WiFi para invitados en un potente canal de marketing. Crea portales cautivos personalizados con logins y formularios de marca, recopila datos de primera mano de manera segura y activa campañas automáticas basadas en comportamiento, perfil y ubicación.",
  heroBullets: ["Portales con tu marca", "Captura consent-first", "Automatización marketing", "100% RGPD"],
  imageBigSrc: "/wp-content/uploads/2026/01/Guest_wifi.png",
  imageBigAlt: "Flame Guest Wifi Marketing",
  bigSectionTitle: "Conoce",
  bigSectionTitleHl: "Marketing WiFi",
  bigSectionPara1: "Flame Connect combina un generador de portales cautivos totalmente personalizable con automatización de marketing avanzada. Diseña experiencias de inicio de sesión con tu marca, gestiona el consentimiento y activa campañas en tiempo real basadas en patrones de visita y ubicación.",
  bigSectionPara2: "Integra fácilmente con tu CRM o PMS y transforma la conectividad en resultados de marketing medibles.",
  bigSectionBullets: ["Flujos de conexión personalizados", "Inicio de sesión social", "Páginas de destino", "Basado en ubicación"],
  benefitsTitle: "del marketing WiFi",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Cada visitante que se conecta es un lead potencial. Captura, segmenta y reactiva con valor real.",
  benefits: [
    { icon: "wifi",      title: "Captura de datos",                          desc: "Recopila perfiles de cliente completos basados en consentimiento y crea tu propia base de datos cumpliendo el RGPD." },
    { icon: "trending",  title: "Interactúa en el momento adecuado",         desc: "Activa campañas automáticas basadas en visitas, geolocalización o comportamiento." },
    { icon: "behavior",  title: "Conoce a tus visitantes",                   desc: "Segmenta por frecuencia, dispositivo, idioma y ubicación. Convierte conexiones anónimas en perfiles accionables." },
    { icon: "convert",   title: "Aumenta la conversión",                     desc: "Convierte el acceso WiFi en cupón, descuento, formulario de fidelización o app install." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Mide cada paso del embudo: conexión → email captado → campaña → revisita.",
  metrics: [
    { icon: "wifi",      title: "Conexiones únicas",      desc: "Visitantes que se conectan al WiFi cada día/semana." },
    { icon: "users",     title: "Leads capturados",       desc: "% de visitantes que dejan email/datos en el portal." },
    { icon: "ratio",     title: "Tasa de re-visita",      desc: "Cuántos clientes vuelven medidos por reconexión WiFi." },
    { icon: "convert",   title: "Conversión por campaña", desc: "Eficacia real de cada email/SMS enviado automáticamente." },
    { icon: "behavior",  title: "Dwell time por visita",  desc: "Tiempo medio conectado, indicador de engagement." },
    { icon: "demographics", title: "Demografía agregada", desc: "Perfil de tus visitantes para afinar el targeting." },
  ],
  testimonialsIdx: [3, 5, 0],
  faqs: [
    { q: "¿Cómo se captura el email del visitante?",                       a: "A través del <strong>portal cautivo</strong> de WiFi: la pantalla que aparece al conectarse. El visitante puede registrarse con email, login social (Google/Facebook) o formulario personalizado. Siempre con consentimiento explícito según RGPD." },
    { q: "¿Cumple el RGPD?",                                               a: "Sí, 100%. Flame Connect implementa <strong>consentimiento granular</strong>, doble opt-in, derecho al olvido y portabilidad de datos. El visitante tiene control total sobre qué comparte." },
    { q: "¿Funciona con cualquier infraestructura WiFi?",                  a: "Flame se integra con los principales fabricantes de redes (Cisco, Aruba, Ruckus, Cambium, Ubiquiti, etc.) mediante <strong>protocolos estándar RADIUS, WPA Enterprise o redirect HTTP</strong>." },
    { q: "¿Cómo se conecta con mi CRM?",                                   a: "Conectores nativos para HubSpot, Mailchimp, Salesforce, Brevo y Klaviyo. También API REST + webhooks para sistemas personalizados. Sync en tiempo real o por lotes." },
    { q: "¿Puedo personalizar el portal con mi marca?",                    a: "Sí. Editor visual drag-and-drop: logo, colores, imagen de fondo, campos del formulario, idiomas, condiciones legales y mensajes personalizados. Sin necesidad de conocimientos técnicos." },
    { q: "¿Cuánto tiempo lleva implementarlo?",                            a: "Configuración técnica en <strong>1-3 días</strong>, portal personalizado en 1 semana adicional. Si tu equipo de WiFi ya da acceso a invitados, el switch es mínimo y suele requerir solo un cambio en el redirect del controlador." },
  ],
  ctaStripBold: "Tu WiFi no es una utility, es un canal de marketing.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function MarketingWifiInvitadosDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/guest-wifi-marketing/" />;
}
