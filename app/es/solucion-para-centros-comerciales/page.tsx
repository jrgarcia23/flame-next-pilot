import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";
import { uc } from "@/lib/sector-preview-configs";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Data Intelligence para Centros Comerciales · Flame Analytics",
  description: "Analítica para centros comerciales con big data e IA: optimiza el tenant mix y la experiencia del visitante.",
  alternates: {
    canonical: "/es/solucion-para-centros-comerciales/",
    languages: {
    es: "/es/solucion-para-centros-comerciales/",
    en: "/en/solution-for-shopping-malls/",
    "x-default": "/es/solucion-para-centros-comerciales/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/solucion-para-centros-comerciales/",
    siteName: "Flame Analytics",
    title: "Data Intelligence para Centros Comerciales · Flame Analytics",
    description: "Analítica para centros comerciales con big data e IA: optimiza el tenant mix y la experiencia del visitante.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence para Centros Comerciales · Flame Analytics",
    description: "Analítica para centros comerciales con big data e IA: optimiza el tenant mix y la experiencia del visitante.",
    images: ["/wp-content/uploads/2026/01/Industries_Malls2-1.jpg"],
  },
};

export const CENTROS_CFG: SectorConfig = {
  metaTitle: "Centros Comerciales · Flame Analytics",
  metaDescription: "Optimización de tenant mix y experiencia del cliente.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg",
  heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para centros comerciales",
  heroSub: "Flame convierte las cámaras que ya tienes en tu centro en datos accionables: afluencia, ocupación, conversión y comportamiento del visitante. Analítica de centros comerciales con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para gestionar el mix comercial, las operaciones y la experiencia con datos reales.",
  heroBullets: ["Precisión del 99 %", "Sin biometría · 100% RGPD", "Datos en tiempo real", "IA sobre tu CCTV existente"],
  // ---- NUEVO MODELO (capa CRO): pain-points → capacidades → casos ----
  painPointsTitle: "El día a día de tus datos.",
  painPointsIntro: "Antes de hablar de plataforma, hablemos de lo que ya vives cada semana gestionando tu centro.",
  painPoints: [
    { svg: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>', title: "Decides a intuición, no con datos", desc: "El mix comercial y la estrategia de arrendamiento se deciden sin ver de verdad cómo se comporta tu visitante dentro del centro." },
    { svg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', title: "Ves la ocupación cuando ya es tarde", desc: "Sin visibilidad en tiempo real por planta y zona, la saturación se detecta cuando ya es un problema, y tus inquilinos no tienen datos en los que confiar." },
    { svg: '<svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>', title: "Pierdes al visitante en la puerta", desc: "En cuanto sale del centro, no tienes forma de volver a contactar ni de convertir esa visita en una relación duradera." },
    { svg: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>', title: "No puedes comparar tus centros entre sí", desc: "Cada centro del portafolio se gestiona por separado, sin un panel común que compare rendimiento real ni justifique decisiones estratégicas y de gestión." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu centro",
  capsSub: "De la afluencia a la fidelización: ocho capacidades reales para gestionar tu centro comercial con datos.",
  capabilities: [
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', title: "Afluencia y flujo de visitantes", desc: "Cuenta con precisión las entradas y salidas del centro y de cada acceso, y entiende cómo se distribuye el tráfico por plantas y zonas. Compara días, franjas horarias y mide el rendimiento de tus campañas para identificar tus horas y días de mayor afluencia." },
    { span: 5, svg: '<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>', title: "Ocupación en tiempo real", desc: "Conoce la ocupación en tiempo real de todo el centro y de cada zona, con alertas automáticas al superar los umbrales de capacidad. Anticipa la saturación en picos y eventos y mejora la gestión (limpieza, marketing, mix comercial o seguridad) con datos." },
    { span: 6, svg: '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>', title: "Conversión (visita → compra)", desc: "Cruza el tráfico de visitantes con los datos de tus sistemas de venta (TPV, POS, ERP…) para conocer la tasa real de conversión de cada local y del conjunto del centro. Descubre qué zonas y qué campañas convierten de verdad y deja de decidir por intuición." },
    { span: 6, svg: '<svg viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>', title: "Comportamiento y mapas de calor", desc: "Descubre las trayectorias más comunes, el tiempo de permanencia por zona y los mapas de calor del centro. Entiende cómo se mueve realmente el visitante para optimizar el layout, la señalética y la ubicación de cada marca." },
    { span: 5, svg: '<svg viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>', title: "Captación y fidelización por WiFi", desc: "Convierte el WiFi para visitantes en captación: portales cautivos, campañas personalizadas y conexión con tu CRM (MailChimp, Salesforce, Hubspot…) para fidelizar más allá de la visita." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg", svg: '<svg viewBox="0 0 24 24"><path d="M3 9l1-5h16l1 5"/><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M3 9h18"/><path d="M9 21v-6h6v6"/></svg>', title: "Rentas y mix de inquilinos", desc: "Datos de tráfico por local y por zona para valorar cada espacio por su rendimiento real, justificar las rentas y decidir el mix comercial con criterio. La analítica del centro como palanca de ingresos." },
    { span: 6, svg: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>', title: "Gestión de colas y aseos", desc: "Mide los tiempos de espera y la tasa de abandono en las cajas, y programa la limpieza de los aseos según el uso real, no según un horario fijo. Mejora la experiencia justo en los puntos que más la deterioran." },
    { span: 6, svg: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>', title: "Datos para inquilinos y operaciones", desc: "Comparte con tus inquilinos información de visitantes en tiempo real y refuerza la relación con datos que les ayudan a vender. Planifica limpieza, mantenimiento y seguridad según el flujo real del centro." },
  ],
  casesTitle: "Marcas que ya convierten su afluencia en decisiones",
  casesSub: "Retailers, cadenas y grandes espacios que miden con Flame lo que antes se decidía a intuición.",
  caseStudies: [
    { href: "https://www.flameanalytics.com/es/multiopticas-convierte-el-trafico-en-tienda-en-decisiones-de-negocio/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/2026/07/multiopticas-hero-6a5df7da.png", title: "Cómo MultiÓpticas convierte el tráfico en tienda en decisiones de negocio", excerpt: "MultiÓpticas inicia con Flame Analytics un proyecto de analítica avanzada en tienda para convertir el dato físico en inteligencia de red.", date: "20 de julio de 2026" },
    { href: "https://www.flameanalytics.com/es/alain-afflelou-confia-en-la-analitica-de-flame-para-sus-tiendas-en-espana/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/alain-afflelou-hero.png", title: "Alain Afflelou confía en Flame Analytics para el conteo de personas en sus tiendas de España", excerpt: "Alain Afflelou implementa la solución de conteo de personas de Flame Analytics en sus tiendas de España para medir afluencia, optimizar la gestión y tomar decisiones basadas en datos.", date: "16 de junio de 2026" },
    { href: "https://www.flameanalytics.com/es/transformando-la-experiencia-en-caixaforum-con-videoanalitica/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2025/02/CASOS-DE-EXITO-EN.jpg", title: "Transformando la experiencia en CaixaForum con videoanalítica", excerpt: "La Fundación “la Caixa” gestiona la red de centros culturales CaixaForum en toda España, espacios que fusionan arte, ciencia y cultura para brindar experiencias únicas a sus visitantes.", date: "12 de febrero de 2025" },
  ],
  sections: [],
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
  testimonialsIdx: [0, 1, 7, 8],
  faqs: getFaqs("shopping-malls", "es"),
  ctaStripBold: "Convierte la afluencia en valor para inquilinos y visitantes.",
  ctaStripLight: "Demo personalizada en 20 minutos.",  useCasesTitle: "Un caso de uso para cada reto de tu centro",
  useCasesSub: "Afluencia, conversión, ocupación, colas, comportamiento o WiFi: sea cual sea la prioridad de tu centro comercial, Flame ya tiene un caso de uso para resolverla.",
  useCases: [
    uc("conteo", "Mide la afluencia total del centro y por accesos, y compara días, franjas y campañas."),
    uc("conversion", "Cruza el tráfico con las ventas de los locales para conocer la conversión real por zona y operador."),
    uc("comportamiento", "Mapas de calor y recorridos para optimizar el mix de inquilinos, la señalética y las zonas comunes."),
    uc("ocupacion", "Controla el aforo en tiempo real por zona, con alertas para eventos y horas punta."),
    uc("colas", "Detecta esperas en accesos, parking y zonas de restauración para mejorar la experiencia."),
    uc("wifiInv", "Convierte el WiFi del centro en captación de contactos y comunicación con el visitante."),
  ],
};

export default function CentrosComercialesSectorDraft() {
  return <SectorTemplate cfg={CENTROS_CFG} enHref="/en/solution-for-shopping-malls/" />;
}
