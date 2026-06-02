import type { Metadata } from "next";
import HomeRestyleTemplate, { HomeRestyleConfig } from "@/components/templates/HomeRestyleTemplate";

export const metadata: Metadata = {
  title: "Home restyle (preview ES) · Flame Analytics",
  description: "Misma estructura que el home actual, con el estilo del redesign Next.",
  robots: { index: false, follow: false },
};

const cfg: HomeRestyleConfig = {
  heroSupertitle: "Empowering",
  heroSupertitleHl: "Physical Spaces",
  heroHeadline: "Transformando el video en información en tiempo real para tu negocio",
  heroCta: "Solicita una demo",
  videoWebm: "/wp-content/uploads/2026/01/Demo-web-HIGH-2-720.webm",
  videoMp4: "/wp-content/uploads/2026/01/Demo-web-HIGH-720.mp4",

  stepsTitle: "Analítica de vídeo con IA sin fricciones para",
  stepsTitleHl: "Retail",
  stepsSub: "Información accionable para optimizar el tráfico, el rendimiento y la experiencia en tus espacios",
  steps: [
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-141-rhd6b8zyg2yz9z5cada9knj2k0hyuzcw7d9y04gp5c.png",   bgImg: "/wp-content/uploads/elementor/thumbs/Group-142-rhd6b8zwk3vn796mm7avcxzmptvchjbwa25liv9x4y.png",   title: "Conéctate sin esfuerzo", desc: "Conecta Flame a tu infraestructura existente (cámaras y contadores de personas) con una instalación plug-and-play que funciona al instante, sin necesidad de hardware adicional ni instalaciones complejas." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-73-1-1-rhd6b9xsmx09ll3z4vow55aj5edc2ogmjhxfhefas6.png", bgImg: "/wp-content/uploads/elementor/thumbs/Group-143-rhd6b9xqqxwxiv59gpphxfr3b7qpp8fmm6t3058iyq.png",   title: "Configura tu lógica",    desc: "Define fácilmente zonas, líneas de conteo, mapas de calor, datos demográficos y reglas de negocio a través de una interfaz intuitiva, sin necesidad de programación ni configuraciones técnicas." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-81-rhd6bbthmigrtifyvbli2mbmnwzs70acuws2i6bmva.png",    bgImg: "/wp-content/uploads/elementor/thumbs/Group-144-rhd6bbtf4lzi632j5qir2fa0hzhg4mn3ag41yp5qma.png",   title: "Mide lo que importa",    desc: "Accede a insights en tiempo real para comprender el comportamiento de los clientes, optimizar el rendimiento del espacio y mejorar la experiencia general en cualquier entorno físico." },
  ],

  productsTitle: "Datos que potencian",
  productsTitleHl: "espacios inteligentes",
  productsSub: "La plataforma de analítica con IA para espacios físicos que potencia la toma de decisiones y maximiza el rendimiento general del lugar:",
  productsBullets: [
    "Mide y mejora el rendimiento del espacio",
    "Comprende el comportamiento de los clientes",
    "Conecta con tus visitantes",
  ],
  ctaStripBold: "20 minutos para entender qué pasa en tu espacio.",
  ctaStripLight: "Demo personalizada con tus datos y tu caso de uso.",
  products: [
    { iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png", name: "Traffic",          desc: "Mide el tráfico dentro y fuera del espacio, monitorea la ocupación en tiempo real y mide la conversión, todo desde una plataforma única y completa.", href: "/es/analitica-trafico/", cta: "Conocer Traffic" },
    { iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",                                       name: "Customer Journey", desc: "Analiza los recorridos e interacciones de los clientes para comprender su comportamiento en la tienda y optimizar la experiencia en cada punto de contacto.", href: "/es/customer-journey/",  cta: "Conocer Customer Journey" },
    { iconImg: "/wp-content/uploads/2026/01/Group-1.png",                                                     name: "Connect",          desc: "Recopila datos de los visitantes a través del WiFi para invitados y lanza campañas de marketing personalizadas según su ubicación, perfil y comportamiento.",                                href: "/es/connect/",            cta: "Conocer Connect" },
  ],

  advantageTitle: 'La ventaja <span style="color:var(--color-accent);font-weight:500">de Flame</span>',
  advantageSub: "Analítica avanzada de vídeo con IA, diseñada para ofrecer privacidad, precisión y rendimiento.",

  privacyTitle: "Privacidad ante todo.",
  privacyTitleHl: "Rendimiento orientado a resultados.",
  privacyBody: "Flame está diseñado desde el día uno para cumplir RGPD, AEPD y normativa local. Sin reconocimiento facial, sin tracking individual: la detección de personas es anónima y el procesado ocurre en el dispositivo. A la nube solo viajan métricas agregadas, nunca vídeo.",
  privacyImg: "/wp-content/uploads/2026/01/Home_traffic.webp",
  privacyImgAlt: "Dashboard Flame de tráfico con privacidad por diseño",
  privacyCta: "Leer más",
  privacyHref: "/es/informacion-detallada/",

  reportsTitle: "Informes avanzados,",
  reportsTitleHl: "decisiones más inteligentes.",
  reportsBody: "Compara tiendas, plantas o sedes con la misma vara, sin esperar al cierre del mes. Tráfico, conversión, ocupación y comportamiento unificados en un único panel con vistas en tiempo real y exportable a Power BI, Tableau o Looker.",
  reportsImg: "/wp-content/uploads/2026/01/Home_Dashboard.png",
  reportsImgAlt: "Dashboard de Flame con métricas avanzadas",
  reportsCta: "Ver demo",
  reportsHref: "/es/contacta/",

  integrationTitle: "Integración sin fricciones.",
  integrationTitleHl: "Diseño agnóstico.",
  integrationBody: "Flame se integra con tu stack actual: TPV (Cegid, Microsoft Dynamics, SAP), ERP, BI (Power BI, Tableau, Looker) y data lakes. Conectores nativos, API REST abierta y webhooks. Sin obra, sin reemplazar tecnología, sin proyectos eternos.",
  integrationImg: "/wp-content/uploads/2026/01/Mask-group3.png",
  integrationImgAlt: "Diagrama de integraciones de Flame con stack TPV / ERP / BI",
  integrationCta: "Leer más",
  integrationHref: "/es/informacion-detallada/",

  testimonialsTitle: "Las mejores marcas",
  testimonialsTitleHl: "confían en nosotros",
  testimonialsIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],

  industriesTitle: "Soluciones para cualquier",
  industriesTitleHl: "Industria",
  industriesSub: "Flame Analytics es una plataforma avanzada de analítica inteligente diseñada para dar soporte a una amplia variedad de industrias y sectores.",

  communityTitle: "Únete a la",
  communityTitleHl: "comunidad Flame",
  communitySub: "Donde el contenido se convierte en valor para la comunidad: historias, ideas y aprendizajes con impacto.",
  communityCards: [
    { icon: "users",    title: "Casos de éxito", href: "/es/comunidad/casos-de-exito/", img: "/wp-content/uploads/2025/09/Cases.png" },
    { icon: "calendar", title: "Webinars",       href: "/es/comunidad/webinars/",       img: "/wp-content/uploads/2025/09/Webinar1.png" },
    { icon: "reports",  title: "Whitepapers",    href: "/es/comunidad/whitepapers/",    img: "/wp-content/uploads/2025/09/Whitepaper1.png" },
  ],
};

export default function HomeRestyleESPage() {
  return <HomeRestyleTemplate cfg={cfg} enHref="/preview/home-restyle/en/" currentLang="es" />;
}
