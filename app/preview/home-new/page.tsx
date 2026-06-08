import type { Metadata } from "next";
import HomeTemplate, { HomeConfig } from "@/components/templates/HomeTemplate";

export const metadata: Metadata = {
  title: "Home redesign (preview ES) · Flame Analytics",
  description: "Preview del rediseño del home en español.",
  robots: { index: false, follow: false },
};

const cfg: HomeConfig = {
  heroEyebrow: "Analítica de vídeo con IA",
  heroTitle: "Datos en tiempo real para cada",
  heroTitleHl: "espacio físico",
  heroSub: "Flame convierte el vídeo y la conexión WiFi de tu retail, centro comercial, hotel o recinto público en métricas accionables sobre tráfico, conversión, comportamiento y ocupación. Sin biometría. RGPD por diseño.",
  heroPrimaryCta: "Solicita una demo",
  heroSecondaryCta: "Ver productos",
  heroSecondaryHref: "/es/analitica-trafico/",
  heroImage: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  heroImageAlt: "Dashboard Flame Analytics en tiempo real",
  stats: [
    { value: "99 %", label: "Precisión de conteo" },
    { value: "+500", label: "Tiendas medidas" },
    { value: "12", label: "Países" },
    { value: "RGPD", label: "Privacidad por diseño" },
  ],
  productsTitle: "Una plataforma,",
  productsTitleHl: "tres productos",
  productsSub: "Combina Traffic, Customer Journey y Connect en un único panel para entender qué pasa en tus espacios y por qué.",
  products: [
    { icon: "traffic",  tagline: "Tráfico y conversión", name: "Traffic",          desc: "Mide el tráfico exterior e interior y calcula la conversión real cruzando con TPV. Comparativas por tienda, hora, día y campaña.", href: "/es/analitica-trafico/",  cta: "Conocer Traffic" },
    { icon: "journey",  tagline: "Recorridos y dwell time", name: "Customer Journey", desc: "Rastrea recorridos, tiempo de permanencia y mapas de calor por zona. Optimiza layout, escaparate y operaciones con dato real.", href: "/es/recorrido-del-cliente/", cta: "Conocer Customer Journey" },
    { icon: "connect",  tagline: "WiFi marketing", name: "Connect",          desc: "Convierte el WiFi para invitados en captura, segmentación y activación. Portales cautivos, leads enriquecidos y campañas medibles.", href: "/es/connect/",          cta: "Conocer Connect" },
  ],
  bigEyebrow: "Decisiones basadas en dato real",
  bigTitle: "Datos que potencian tu",
  bigTitleHl: "operativa",
  bigImage: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  bigImageAlt: "Dashboard de Flame con métricas en tiempo real",
  bigPara1: "Flame unifica tráfico, conversión, ocupación y comportamiento en un único panel. Compara tiendas, plantas o sedes con la misma vara, sin esperar al cierre del mes.",
  bigPara2: "Conecta TPV, ERP y BI sin obra y sin reemplazar tu stack. Tus equipos siguen trabajando donde lo hacen hoy, pero con dato real en lugar de intuición.",
  bigBullets: ["Tiempo real", "Comparativa multi-tienda", "Integración TPV/ERP", "Sin obra ni cableado"],
  privacyTitle: "Privacidad ante todo.",
  privacyTitleHl: "Rendimiento orientado a resultados.",
  privacySub: "Flame está diseñado desde el día uno para cumplir con RGPD, AEPD y normativa local. Sin reconocimiento facial, sin tracking individual, sin biometría.",
  privacyPoints: [
    { icon: "privacy",     title: "Sin biometría",            desc: "Detección anónima de personas. No identificamos rostros, no almacenamos imágenes individuales." },
    { icon: "eye",         title: "Anonimización on-edge",    desc: "El procesado ocurre en el dispositivo. A la nube solo viajan métricas agregadas, nunca vídeo." },
    { icon: "integration", title: "Integración sin fricción", desc: "Conectores nativos con TPV, ERP, BI y data lakes. APIs y webhooks abiertos para tu stack." },
    { icon: "trending",    title: "Resultados medibles",      desc: "KPIs claros desde la primera semana: tráfico, conversión, ocupación, recorrido. Sin proyectos eternos." },
  ],
  testimonialsIdx: [0, 1, 2, 3, 4, 5, 6, 7],
  faqs: [
    { q: "¿Qué necesito instalar en mi tienda o centro?", a: "Una cámara compatible y conexión a internet. Flame Hypersensor procesa en local y solo envía métricas agregadas. <strong>Sin obra ni cableado adicional</strong> en la mayoría de casos." },
    { q: "¿Cumple con RGPD y AEPD?",                       a: "Sí. Flame no usa reconocimiento facial ni biometría. La detección de personas es anónima y el procesado ocurre en el dispositivo. Cumplimos RGPD, AEPD y normativas locales por diseño." },
    { q: "¿En cuánto tiempo veo resultados?",              a: "Las primeras métricas (tráfico, ocupación) están disponibles desde el día de la instalación. Los informes comparativos y de tendencias requieren 7-14 días de baseline." },
    { q: "¿Se integra con mi TPV, ERP o BI?",              a: "Sí. Tenemos conectores nativos con los principales TPV (Cegid, Microsoft Dynamics, SAP, etc.), ERP y plataformas BI (Power BI, Tableau, Looker). También exponemos API y webhooks." },
    { q: "¿Funciona también para hoteles y espacios públicos?", a: "Sí. Además de retail y centros comerciales, Flame opera en hoteles, museos, recintos deportivos, transporte y administraciones públicas. Cada sector con su configuración específica." },
    { q: "¿Cuánto cuesta?",                                a: "El precio depende del número de cámaras y módulos. Pide una demo gratuita de 20 minutos y te enviamos una propuesta a medida en menos de 48h." },
  ],
  ctaStripBold: "20 minutos para entender qué pasa en tu espacio.",
  ctaStripLight: "Demo personalizada con tus datos y tu caso de uso.",
};

export default function HomeNewESPage() {
  return <HomeTemplate cfg={cfg} enHref="/preview/home-new/en/" currentLang="es" />;
}
