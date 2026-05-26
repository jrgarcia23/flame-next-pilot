/* ============================================================
   FLAME · Datos compartidos entre todas las páginas (ES)
   ============================================================ */

export type NavLeaf = { label: string; href: string; iconImg: string; desc: string };
export type NavGroup = { label: string; items: NavLeaf[] };
export type NavItem =
  | { label: string; href: string }
  | { label: string; mega: "products" | "solutions" | "community" };

export const NAV_ITEMS: NavItem[] = [
  { label: "Producto",   mega: "products"   },
  { label: "Soluciones", mega: "solutions"  },
  { label: "Hypersensor", href: "/es/hypersensor/" },
  { label: "Partners",    href: "/es/partners/" },
  { label: "Comunidad",  mega: "community"  },
  { label: "Nosotros",    href: "/es/sobre-nosotros/" },
];

export const MEGA_PRODUCTS: NavLeaf[] = [
  { label: "Traffic",          href: "/es/analitica-trafico/", iconImg: "/wp-content/uploads/2025/09/Traffic_bue1.png",        desc: "Mide el tráfico exterior e interior y calcula la conversión real en tu espacio." },
  { label: "Customer Journey", href: "/es/customer-journey/",  iconImg: "/wp-content/uploads/2025/09/road-route-map-icon.png", desc: "Rastrea recorridos, dwell time e interacciones por zona para optimizar la experiencia." },
  { label: "Connect",          href: "/es/connect/",           iconImg: "/wp-content/uploads/2025/09/Vector1.png",             desc: "Convierte el WiFi para invitados en captura, segmentación y activación de marketing." },
];

export const MEGA_USE_CASES: NavLeaf[] = [
  { label: "People Counting",      href: "/es/cuenta-personas/",                    iconImg: "/wp-content/uploads/2025/09/people_counting1.png",     desc: "Conteo de visitantes con IA, sin biometría." },
  { label: "Conversion Analytics", href: "/es/analitica-conversion/",               iconImg: "/wp-content/uploads/2025/09/Conversion_analytics1.png", desc: "Tasa real de conversión cruzada con TPV." },
  { label: "Customer Behavior",    href: "/es/customer-behavior/",                  iconImg: "/wp-content/uploads/2025/09/Customer_bahavior1.png",    desc: "Mapas de calor, dwell time y patrones de visita." },
  { label: "Occupancy",            href: "/es/gestion-ocupacion/",                  iconImg: "/wp-content/uploads/2025/09/Occupancy_management1.png", desc: "Ocupación en tiempo real con alertas de capacidad." },
  { label: "Queue Analytics",      href: "/es/analitica-de-colas/",                 iconImg: "/wp-content/uploads/2025/09/Queue1.png",                desc: "Tiempos de espera y tasa de abandono en caja." },
  { label: "Restroom",             href: "/es/gestion-de-aseos/",                   iconImg: "/wp-content/uploads/2025/09/Restroom1.png",             desc: "Limpieza basada en uso real y satisfacción." },
  { label: "Guest WiFi",           href: "/es/marketing-wifi-para-invitados/",      iconImg: "/wp-content/uploads/2025/09/guest_wifi1.png",           desc: "Portales cautivos + automatización marketing." },
  { label: "Corporate WiFi",       href: "/es/acceso-wifi-corporativo/",            iconImg: "/wp-content/uploads/2025/09/corporate_wifi1.png",       desc: "Conectividad segura para empleados e invitados." },
];

export const MEGA_INDUSTRIES: NavLeaf[] = [
  { label: "Retail",              href: "/es/solucion-para-el-sector-retail/",      iconImg: "/wp-content/uploads/2025/09/Retail2.png",        desc: "Más conversión y staffing dinámico en tienda." },
  { label: "Centros comerciales", href: "/es/solucion-para-centros-comerciales/",   iconImg: "/wp-content/uploads/2025/09/CC1.png",            desc: "Optimiza el mix de inquilinos y la afluencia." },
  { label: "Hoteles",             href: "/es/hoteles/",                             iconImg: "/wp-content/uploads/2025/09/Buildings2.png",     desc: "Captura datos del huésped y enriquece el CRM." },
  { label: "Espacios públicos",   href: "/es/espacios-publicos/",                   iconImg: "/wp-content/uploads/2025/09/Public_venues2.png", desc: "Inteligencia para museos, transporte y campus." },
];

export const MEGA_COMMUNITY: NavLeaf[] = [
  { label: "Casos de éxito", href: "/es/comunidad/casos-de-exito/", iconImg: "/wp-content/uploads/2025/09/Cases.png",      desc: "Cómo clientes reales miden y deciden con Flame." },
  { label: "Blog",           href: "/es/comunidad/blog/",           iconImg: "/wp-content/uploads/2025/09/Interview.png",  desc: "Artículos sobre analítica del espacio físico." },
  { label: "Webinars",       href: "/es/comunidad/webinars/",       iconImg: "/wp-content/uploads/2025/09/Webinar1.png",   desc: "Sesiones en vídeo con expertos del sector." },
  { label: "Whitepapers",    href: "/es/comunidad/whitepapers/",    iconImg: "/wp-content/uploads/2025/09/Whitepaper1.png", desc: "Guías y estudios en profundidad." },
];

export const LOGOS: [string, string][] = [
  ["/wp-content/uploads/2026/01/Ikea.png",                       "IKEA"],
  ["/wp-content/uploads/2026/01/decathlon.png",                  "Decathlon"],
  ["/wp-content/uploads/2026/01/Cushman-Wakefield.png",          "Cushman & Wakefield"],
  ["/wp-content/uploads/2026/01/Telefonica.png",                 "Telefónica"],
  ["/wp-content/uploads/2026/01/cbre-white-300x147.png",         "CBRE"],
  ["/wp-content/uploads/2026/01/Santander.png",                  "Santander"],
  ["/wp-content/uploads/2026/01/alain-afflelou-white-2.png",     "Alain Afflelou"],
  ["/wp-content/uploads/2026/01/Westflied.png",                  "Westfield"],
  ["/wp-content/uploads/2026/01/Havaianas.png",                  "Havaianas"],
  ["/wp-content/uploads/2026/01/merlin-300x147.png",             "Merlin Properties"],
];

export const INDUSTRIES = [
  { icon: "mall",   title: "Centros comerciales", desc: "Mejora la experiencia, la rentabilidad y la toma de decisiones en todo tu centro comercial.", href: "/es/solucion-para-centros-comerciales/" },
  { icon: "retail", title: "Retail",              desc: "Impulsa el éxito del sector minorista con insights de clientes en tiempo real.",              href: "/es/solucion-para-el-sector-retail/" },
  { icon: "venue",  title: "Espacios públicos",   desc: "Comprende el valor de tus espacios públicos convirtiendo los datos en acciones estratégicas.", href: "/es/espacios-publicos/" },
  { icon: "hotel",  title: "Hostelería",          desc: "Utiliza información basada en datos para anticipar las necesidades de los huéspedes y mejorar la calidad del servicio.", href: "/es/hoteles/" },
];

export const TESTIMONIALS_ALL = [
  { logo: "/wp-content/uploads/2024/04/abc.jpg",                       quote: "Somos clientes desde hace años y pretendemos seguir siéndolo. Flame te cuenta lo que no puedes ver sentado en una oficina o dando un paseo por el hall del centro comercial. Te acerca al cliente desde el momento en que pasa por delante.", author: "Irene Cuadrado",          role: "Marketing & Specialty Leasing manager · ABC Serrano (Savills)" },
  { logo: "/wp-content/uploads/2023/10/Cushman-Wakefield-logo-2.png",  quote: "Gracias Flame analytics por acompañarnos en el apasionante reto de ofrecer a nuestros visitantes una experiencia omnicanal total.",                                                                                                            author: "Vicente Alemany Climent",role: "Coordinador de Innovación · Cushman & Wakefield" },
  { logo: "/wp-content/uploads/2023/10/Cash-Converters-logo-2.png",    quote: "Es un placer trabajar con Flame analytics como socio estratégico. Fiabilidad para poder analizar el rendimiento de nuestra tienda.",                                                                                                            author: "Manuel Fernández",       role: "CIO Transformación Digital · Cash Converters" },
  { logo: "/wp-content/uploads/2023/10/Hotels-VIVA-8.jpg",             quote: "Poder disponer de una conexión Wi-Fi segura en cualquier zona de los hoteles es una forma de generar confianza. Flame nos permite conocer los gustos y exigencias de los clientes y dar en el blanco en nuestras propuestas.",                  author: "Bernat Real",            role: "Director de TI · Hotels VIVA" },
  { logo: "/wp-content/uploads/2023/10/POMPEII-BRAND.jpg",             quote: "En las tiendas Pompeii utilizamos Flame analytics a diario y nuestra experiencia con la herramienta es muy buena.",                                                                                                                              author: "Carlos Mancebo",         role: "Director de Ventas y Expansión · POMPEII BRAND" },
  { logo: "/wp-content/uploads/2023/10/ilunion.png",                   quote: "Flame es una plataforma muy visual con la que te haces una idea de todo lo que ocurre en nuestros restaurantes. Estamos teniendo una experiencia muy positiva.",                                                                                author: "José Miguel de Miguel Peña", role: "Director de Restaurantes Esplore · ILUNION" },
  { logo: "/wp-content/uploads/2023/10/logo_afflelou.jpg",             quote: "Gracias a la tecnología, nuestra red dispone ahora de un sistema capaz de comunicar información valiosa sobre nuestra actividad empresarial.",                                                                                                  author: "Jacques Ferrándiz Fuster",role: "Coordinador de proyectos web · Alain Afflelou" },
  { logo: "/wp-content/uploads/2023/10/Merlin-Properties-logo-3.png",  quote: "Los datos de Flame nos ayudan a adaptarnos a nuestros clientes, cada vez más exigentes, y a las marcas, que nos demandan cada vez más información.",                                                                                            author: "Lucas Madiedo",          role: "Director de Transformación Digital · Merlin Properties" },
  { logo: "/wp-content/uploads/2023/10/CC-Plaza-Eboli-logo-2.png",     quote: "Gracias a Flame hemos conseguido retener a nuestros clientes, aumentar el ROI y mejorar el rendimiento empresarial. Conocer el flujo de movimientos ha sido vital.",                                                                            author: "Luis Simón",             role: "Gerente · CC Plaza Éboli" },
];

export const FOOTER_COLS: { title: string; links: [string, string][] }[] = [
  { title: "Productos",  links: [["Traffic","/es/analitica-trafico/"],["Customer Journey","/es/customer-journey/"],["Connect","/es/connect/"],["Hypersensor","/es/hypersensor/"]] },
  { title: "Soluciones", links: [["People Counting","/es/cuenta-personas/"],["Conversion Analytics","/es/analitica-conversion/"],["Customer Behavior","/es/customer-behavior/"],["Occupancy Management","/es/gestion-ocupacion/"],["Queue Analytics","/es/analitica-de-colas/"],["Restroom Management","/es/gestion-de-aseos/"],["Guest Wifi Marketing","/es/marketing-wifi-para-invitados/"],["Corporate Wifi Access","/es/acceso-wifi-corporativo/"]] },
  { title: "Sectores",   links: [["Retail","/es/solucion-para-el-sector-retail/"],["Centros comerciales","/es/solucion-para-centros-comerciales/"],["Hoteles","/es/hoteles/"],["Espacios públicos","/es/espacios-publicos/"]] },
  { title: "Comunidad",  links: [["Blog","/es/comunidad/blog/"],["Casos de éxito","/es/comunidad/casos-de-exito/"],["Webinars","/es/comunidad/webinars/"],["Whitepapers","/es/comunidad/whitepapers/"]] },
  { title: "Empresa",    links: [["Partners","/es/partners/"],["Nosotros","/es/sobre-nosotros/"],["Contacto","/es/contacta/"]] },
];

/* ============================================================
   TIPOS de página
   ============================================================ */

export type UseCaseConfig = {
  metaTitle: string;
  metaDescription: string;
  heroBgImage?: string;          // cabecera (default Traffic2-1.png)
  heroBgPosition?: string;       // background-position (default "center top")
  heroTitle: string;
  heroSub: string;
  heroBullets: [string, string, string, string];
  imageBigSrc: string;
  imageBigAlt: string;
  imageBigAspectRatio?: string;
  bigSectionEyebrow?: string;          // h3 encima del bigSectionTitle ("Del simple conteo a la comprensión del dato", etc)
  bigSectionTitle: string;
  bigSectionTitleHl: string;
  bigSectionPara1: string;
  bigSectionPara2: string;
  bigSectionBullets: [string, string, string, string];
  benefitsTitle: string;
  benefitsTitleHl: string;
  benefitsSub: string;
  benefits: Array<{ icon: string; title: string; desc: string }>;
  metricsTitle: string;
  metricsTitleHl: string;
  metricsSub: string;
  metrics: Array<{ icon: string; title: string; desc: string }>;
  testimonialsIdx: number[];     // índices en TESTIMONIALS_ALL
  faqs: Array<{ q: string; a: string }>;
  ctaStripBold: string;
  ctaStripLight: string;
};

export type SectorSection = {
  img: string;
  imgAlt: string;
  title: string;
  titleHl?: string;
  bullets: string[];
};

export type SectorConfig = {
  metaTitle: string;
  metaDescription: string;
  heroBgImage?: string;
  heroBgPosition?: string;
  heroTitle: string;
  heroTitleHl?: string;
  heroSub: string;
  heroBullets?: [string, string, string, string];
  pillars?: Array<{ title: string; desc: string; iconImg?: string }>;  // 3 pilares (Impulsa/Mide/Transforma)
  sections: SectorSection[];        // 3-4 secciones image+text alternadas
  productsTitle: string;
  productsTitleHl: string;
  productsSub: string;
  products: Array<{ title: string; desc: string; href: string; img: string }>;
  testimonialsIdx: number[];
  faqs: Array<{ q: string; a: string }>;
  ctaStripBold: string;
  ctaStripLight: string;
};

export type ProductConfig = {
  metaTitle: string;
  metaDescription: string;
  heroBgImage?: string;         // imagen de cabecera (default: Traffic2-1.png)
  heroEyebrow: string;          // ej. "Más allá de un sensor"
  heroTitle: string;            // nombre del producto ej. "Traffic"
  heroSub: string;
  heroBullets: [string, string, string, string];
  imageSrc?: string;            // imagen intermedia ("Plataforma") — si no hay, no se muestra la sección
  imageAspectRatio?: string;
  benefitsTitle: string;
  benefitsTitleHl: string;
  benefitsSub: string;
  benefits: Array<{ icon: string; title: string; desc: string }>;        // 3 cards
  platformTitle?: string;
  platformTitleHl?: string;
  platformPara1?: string;
  platformPara2?: string;
  platformBullets?: [string, string, string, string];
  featuresTitle: string;
  featuresTitleHl: string;
  featuresSub: string;
  features: Array<{ icon: string; title: string; intro: string; desc: string; bullets: string[] }>;
  pillarsTitle: string;
  pillarsTitleHl: string;
  pillarsSub: string;
  pillars: Array<{ icon: string; title: string; desc: string }>;
  testimonialsIdx: number[];
  faqs: Array<{ q: string; a: string }>;
  ctaStripBold: string;
  ctaStripLight: string;
};
