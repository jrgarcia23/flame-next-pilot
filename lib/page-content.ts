/* ============================================================
   FLAME · Datos compartidos entre todas las páginas (ES)
   ============================================================ */

export type NavLeaf = { label: string; href: string; iconImg: string; desc: string };
export type NavGroup = { label: string; items: NavLeaf[] };
export type NavItem =
  | { label: string; href: string }
  | { label: string; mega: "products" | "solutions" | "community"; href?: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Producto",    mega: "products"   },
  { label: "Soluciones",  mega: "solutions"  },
  { label: "Hypersensor", href: "/es/hypersensor/" },
  { label: "Partners",    href: "/es/partners/" },
  { label: "Comunidad",   mega: "community",  href: "/es/comunidad/" },
  { label: "Nosotros",    href: "/es/sobre-nosotros/" },
];

export const MEGA_PRODUCTS: NavLeaf[] = [
  { label: "Traffic",          href: "/es/analitica-trafico/", iconImg: "/wp-content/uploads/2025/09/Traffic_bue1.png",        desc: "Mide el tráfico exterior e interior y calcula la conversión real en tu espacio." },
  { label: "Customer Journey", href: "/es/recorrido-del-cliente/",  iconImg: "/wp-content/uploads/2025/09/road-route-map-icon.png", desc: "Rastrea recorridos, dwell time e interacciones por zona para optimizar la experiencia." },
  { label: "Connect",          href: "/es/connect/",           iconImg: "/wp-content/uploads/2025/09/Vector1.png",             desc: "Convierte el WiFi para invitados en captura, segmentación y activación de marketing." },
];

export const MEGA_USE_CASES: NavLeaf[] = [
  { label: "Conteo de personas",       href: "/es/conteo-personas/",                    iconImg: "/wp-content/uploads/2025/09/people_counting1.png",     desc: "Conteo de visitantes con IA, sin biometría." },
  { label: "Analítica de conversión",  href: "/es/analitica-conversion/",               iconImg: "/wp-content/uploads/2025/09/Conversion_analytics1.png", desc: "Tasa real de conversión cruzada con TPV." },
  { label: "Comportamiento del cliente", href: "/es/comportamiento-del-cliente/",                iconImg: "/wp-content/uploads/2025/09/Customer_bahavior1.png",    desc: "Mapas de calor, dwell time y patrones de visita." },
  { label: "Gestión de la ocupación",  href: "/es/gestion-ocupacion/",                  iconImg: "/wp-content/uploads/2025/09/Occupancy_management1.png", desc: "Ocupación en tiempo real con alertas de capacidad." },
  { label: "Gestión de colas",         href: "/es/analitica-de-colas/",                 iconImg: "/wp-content/uploads/2025/09/Queue1.png",                desc: "Tiempos de espera y tasa de abandono en caja." },
  { label: "Gestión de aseos",         href: "/es/gestion-de-aseos/",                   iconImg: "/wp-content/uploads/2025/09/Restroom1.png",             desc: "Limpieza basada en uso real y satisfacción." },
  { label: "Marketing WiFi",           href: "/es/marketing-wifi-para-invitados/",      iconImg: "/wp-content/uploads/2025/09/guest_wifi1.png",           desc: "Portales cautivos + automatización marketing." },
  { label: "WiFi corporativo",         href: "/es/acceso-wifi-corporativo/",            iconImg: "/wp-content/uploads/2025/09/corporate_wifi1.png",       desc: "Conectividad segura para empleados e invitados." },
];

export const MEGA_INDUSTRIES: NavLeaf[] = [
  { label: "Retail",              href: "/es/solucion-para-el-sector-retail/",      iconImg: "/wp-content/uploads/2025/09/Retail2.png",        desc: "Más conversión y staffing dinámico en tienda." },
  { label: "Centros comerciales", href: "/es/solucion-para-centros-comerciales/",   iconImg: "/wp-content/uploads/2025/09/CC1.png",            desc: "Optimiza el mix de inquilinos y la afluencia." },
  { label: "Supermercados",       href: "/es/supermercados/",                       iconImg: "/wp-content/uploads/2025/09/Retail2.png",        desc: "Optimiza layout, operaciones y conversión por zona." },
  { label: "Hoteles",             href: "/es/hoteles/",                             iconImg: "/wp-content/uploads/2025/09/Buildings2.png",     desc: "Captura datos del huésped y enriquece el CRM." },
  { label: "Espacios públicos",   href: "/es/espacios-publicos/",                   iconImg: "/wp-content/uploads/2025/09/Public_venues2.png", desc: "Inteligencia para museos, transporte y campus." },
  { label: "Banca",               href: "/es/banca/",                               iconImg: "/wp-content/uploads/2025/09/Buildings2.png",     desc: "Dimensiona cajeros y gestores y reduce las esperas." },
  { label: "Transporte y aeropuertos", href: "/es/transporte-y-aeropuertos/",       iconImg: "/wp-content/uploads/2025/09/Public_venues2.png", desc: "Flujos, ocupación y colas en aeropuertos y estaciones." },
];

export const MEGA_COMMUNITY: NavLeaf[] = [
  { label: "Casos de éxito", href: "/es/categoria/casos-de-exito/",     iconImg: "/wp-content/uploads/2025/09/Cases.png",      desc: "Cómo clientes reales miden y deciden con Flame." },
  { label: "Blog",           href: "/es/categoria/blog/",                iconImg: "/wp-content/uploads/2025/09/Interview.png",  desc: "Artículos sobre analítica del espacio físico." },
  { label: "Webinars",       href: "/es/categoria/webinars/",            iconImg: "/wp-content/uploads/2025/09/Webinar1.png",   desc: "Sesiones técnicas con expertos del sector." },
  { label: "Entrevistas",    href: "/es/categoria/entrevistas/",         iconImg: "/wp-content/uploads/2025/09/Webinar1.png",   desc: "Conversaciones con líderes del retail." },
];

/* ============================================================
   FLAME · Versión EN del menú (header + mega-menus)
   ============================================================ */
export const NAV_ITEMS_EN: NavItem[] = [
  { label: "Product",     mega: "products"   },
  { label: "Solutions",   mega: "solutions"  },
  { label: "Hypersensor", href: "/en/hypersensor/" },
  { label: "Partners",    href: "/en/partners/" },
  { label: "Community",   mega: "community",  href: "/en/community/" },
  { label: "About us",    href: "/en/about-us/" },
];

export const MEGA_PRODUCTS_EN: NavLeaf[] = [
  { label: "Traffic",          href: "/en/traffic-insights/",     iconImg: "/wp-content/uploads/2025/09/Traffic_bue1.png",        desc: "Measure indoor/outdoor traffic and calculate real conversion in your space." },
  { label: "Customer Journey", href: "/en/customer-journey/",     iconImg: "/wp-content/uploads/2025/09/road-route-map-icon.png", desc: "Track journeys, dwell time and zone interactions to optimize experience." },
  { label: "Connect",          href: "/en/connect/",              iconImg: "/wp-content/uploads/2025/09/Vector1.png",             desc: "Turn guest WiFi into capture, segmentation and marketing activation." },
];

export const MEGA_USE_CASES_EN: NavLeaf[] = [
  { label: "People counting",        href: "/en/people-counting/",        iconImg: "/wp-content/uploads/2025/09/people_counting1.png",      desc: "AI visitor counting, no biometrics." },
  { label: "Conversion analytics",   href: "/en/conversion-analytics/",   iconImg: "/wp-content/uploads/2025/09/Conversion_analytics1.png", desc: "Real conversion rate cross-checked with POS." },
  { label: "Customer behavior",      href: "/en/customer-behavior/",      iconImg: "/wp-content/uploads/2025/09/Customer_bahavior1.png",    desc: "Heatmaps, dwell time and visit patterns." },
  { label: "Occupancy management",   href: "/en/occupancy-management/",   iconImg: "/wp-content/uploads/2025/09/Occupancy_management1.png", desc: "Real-time occupancy with capacity alerts." },
  { label: "Queue analytics",        href: "/en/queue-analytic/",         iconImg: "/wp-content/uploads/2025/09/Queue1.png",                desc: "Wait times and checkout abandonment rate." },
  { label: "Restroom management",    href: "/en/restroom-management/",    iconImg: "/wp-content/uploads/2025/09/Restroom1.png",             desc: "Cleaning based on real usage and satisfaction." },
  { label: "Guest WiFi marketing",   href: "/en/guest-wifi-marketing/",   iconImg: "/wp-content/uploads/2025/09/guest_wifi1.png",           desc: "Captive portals + marketing automation." },
  { label: "Corporate WiFi access",  href: "/en/corporate-wifi-access/",  iconImg: "/wp-content/uploads/2025/09/corporate_wifi1.png",       desc: "Secure connectivity for employees and guests." },
];

export const MEGA_INDUSTRIES_EN: NavLeaf[] = [
  { label: "Retail",         href: "/en/solution-for-retail-sector/",   iconImg: "/wp-content/uploads/2025/09/Retail2.png",        desc: "More conversion and dynamic staffing in store." },
  { label: "Shopping malls", href: "/en/solution-for-shopping-malls/",  iconImg: "/wp-content/uploads/2025/09/CC1.png",            desc: "Optimize tenant mix and footfall." },
  { label: "Supermarkets",   href: "/en/supermarkets/",                 iconImg: "/wp-content/uploads/2025/09/Retail2.png",        desc: "Optimise layout, operations and conversion by zone." },
  { label: "Hospitality",    href: "/en/hospitality/",                  iconImg: "/wp-content/uploads/2025/09/Buildings2.png",     desc: "Capture guest data and enrich your CRM." },
  { label: "Public venues",  href: "/en/public-venues/",                iconImg: "/wp-content/uploads/2025/09/Public_venues2.png", desc: "Intelligence for museums, transport and campuses." },
  { label: "Banking",        href: "/en/banking/",                      iconImg: "/wp-content/uploads/2025/09/Buildings2.png",     desc: "Size tellers and advisers and cut waits." },
  { label: "Transport & airports", href: "/en/transport-and-airports/", iconImg: "/wp-content/uploads/2025/09/Public_venues2.png", desc: "Passenger flows, capacity and queues in airports and stations." },
];

export const MEGA_COMMUNITY_EN: NavLeaf[] = [
  { label: "Case studies", href: "/en/category/case-studies/", iconImg: "/wp-content/uploads/2025/09/Cases.png",     desc: "How real customers measure and decide with Flame." },
  { label: "Blog",         href: "/en/category/blog/",         iconImg: "/wp-content/uploads/2025/09/Interview.png", desc: "Articles on physical-space analytics." },
  { label: "Webinars",     href: "/en/category/webinars/",     iconImg: "/wp-content/uploads/2025/09/Webinar1.png",  desc: "Technical sessions with industry experts." },
  { label: "Interviews",   href: "/en/category/interviews/",   iconImg: "/wp-content/uploads/2025/09/Webinar1.png",  desc: "Conversations with retail leaders." },
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
  { icon: "retail", title: "Supermercados",       desc: "Optimiza el layout, la operación en tiempo real y la conversión en cada pasillo del supermercado.", href: "/es/supermercados/" },
  { icon: "venue",  title: "Espacios públicos",   desc: "Comprende el valor de tus espacios públicos convirtiendo los datos en acciones estratégicas.", href: "/es/espacios-publicos/" },
  { icon: "hotel",  title: "Hotelería",          desc: "Utiliza información basada en datos para anticipar las necesidades de los huéspedes y mejorar la calidad del servicio.", href: "/es/hoteles/" },
  { icon: "corp",   title: "Banca",              desc: "Analítica de afluencia, colas y uso real para dimensionar cajeros y gestores en toda la red de sucursales.", href: "/es/banca/" },
  { icon: "vehicle", title: "Transporte y aeropuertos", desc: "Flujos de pasajeros, ocupación y colas en aeropuertos, estaciones e intercambiadores para anticipar aglomeraciones.", href: "/es/transporte-y-aeropuertos/" },
];

export const INDUSTRIES_EN = [
  { icon: "mall",   title: "Shopping malls",  desc: "Improve experience, profitability and decision-making across every mall in your portfolio.", href: "/en/solution-for-shopping-malls/" },
  { icon: "retail", title: "Retail",          desc: "Drive retail success with real-time customer insights.",                                       href: "/en/solution-for-retail-sector/" },
  { icon: "retail", title: "Supermarkets",    desc: "Optimise layout, real-time operations and conversion across every aisle.",                     href: "/en/supermarkets/" },
  { icon: "venue",  title: "Public venues",   desc: "Unlock the value of your public spaces by turning data into strategic actions.",               href: "/en/public-venues/" },
  { icon: "hotel",  title: "Hospitality",     desc: "Use data-driven insight to anticipate guest needs and improve service quality.",               href: "/en/hospitality/" },
  { icon: "corp",   title: "Banking",         desc: "Footfall, queue and real-use analytics to size tellers and advisers across your branch network.", href: "/en/banking/" },
  { icon: "vehicle", title: "Transport & airports", desc: "Passenger flows, capacity and queues in airports, stations and interchanges to anticipate crowds.", href: "/en/transport-and-airports/" },
];

// UI strings translated per locale
export const UI = {
  es: {
    logosBanner: "Marcas que ya trabajan con Flame",
    requestDemo: "Solicita una demo",
    industriesTitle: "Soluciones para cualquier", industriesTitleHl: "Industria",
    industriesSub: "Flame Analytics es una plataforma avanzada de analítica inteligente diseñada para dar soporte a una amplia variedad de industrias y sectores.",
    readMore: "Leer más",
    testimonialsTitle: "Las mejores marcas hablan", testimonialsTitleHl: "de nosotros",
    faqTitle: "Preguntas", faqTitleHl: "frecuentes",
    contactTitle: "Solicita una", contactTitleHl: "demo",
    contactSub: "Descubre el poder de Flame en solo",
    contactSubBold: "20 minutos",
    contactSubAfter: "y entiende cómo puede mejorar los resultados de tu organización.",
    contactCta: "Agenda una demo personalizada con nuestros expertos",
    fName: "Nombre y apellido", fSector: "Sector",
    sMalls: "Centros comerciales", sVenues: "Recintos públicos", sRetail: "Retail", sHosp: "Hotelería", sOther: "Otro",
    fEmail: "Email", fCompany: "Empresa", fCountry: "País",
    consent: "Acepto recibir comunicaciones de Flame y he leído la",
    privacy: "política de privacidad",
    privacyHref: "/es/politica-de-privacidad/",
    submit: "Solicitar una demo",
    contactHref: "#contact",
    readMoreArrow: "Leer más",
  },
  en: {
    logosBanner: "Brands already working with Flame",
    requestDemo: "Request a demo",
    industriesTitle: "Solutions for any", industriesTitleHl: "Industry",
    industriesSub: "Flame Analytics is an advanced smart analytics platform designed to support a wide range of industries and sectors.",
    readMore: "Read more",
    testimonialsTitle: "The best brands talk", testimonialsTitleHl: "about us",
    faqTitle: "Frequently asked", faqTitleHl: "questions",
    contactTitle: "Request a", contactTitleHl: "demo",
    contactSub: "Discover the power of Flame in just",
    contactSubBold: "20 minutes",
    contactSubAfter: "and learn how it can improve the results of your organization.",
    contactCta: "Schedule a personalized demo with our experts",
    fName: "Full name", fSector: "Industry",
    sMalls: "Shopping malls", sVenues: "Public venues", sRetail: "Retail", sHosp: "Hospitality", sOther: "Other",
    fEmail: "Email", fCompany: "Company", fCountry: "Country",
    consent: "I agree to receive communications from Flame and have read the",
    privacy: "privacy policy",
    privacyHref: "/en/privacy-policy/",
    submit: "Request a demo",
    contactHref: "#contact",
    readMoreArrow: "Read more",
  },
} as const;

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
  { title: "Productos",  links: [["Traffic","/es/analitica-trafico/"],["Customer Journey","/es/recorrido-del-cliente/"],["Connect","/es/connect/"],["Hypersensor","/es/hypersensor/"]] },
  { title: "Soluciones", links: [
    ["Conteo de personas",        "/es/conteo-personas/"],
    ["Analítica de conversión", "/es/analitica-conversion/"],
    ["Comportamiento del cliente", "/es/comportamiento-del-cliente/"],
    ["Gestión de ocupación",    "/es/gestion-ocupacion/"],
    ["Analítica de colas",      "/es/analitica-de-colas/"],
    ["Gestión de aseos",        "/es/gestion-de-aseos/"],
    ["Marketing WiFi invitados", "/es/marketing-wifi-para-invitados/"],
    ["Acceso WiFi corporativo", "/es/acceso-wifi-corporativo/"],
  ] },
  { title: "Sectores",   links: [["Retail","/es/solucion-para-el-sector-retail/"],["Centros comerciales","/es/solucion-para-centros-comerciales/"],["Supermercados","/es/supermercados/"],["Hoteles","/es/hoteles/"],["Espacios públicos","/es/espacios-publicos/"]] },
  { title: "Comunidad",  links: [["Blog","/es/categoria/blog/"],["Casos de éxito","/es/categoria/casos-de-exito/"],["Entrevistas","/es/categoria/entrevistas/"]] },
  { title: "Empresa",    links: [["Partners","/es/partners/"],["Nosotros","/es/sobre-nosotros/"],["Contacto","/es/contacta/"]] },
];

export const FOOTER_COLS_EN: { title: string; links: [string, string][] }[] = [
  { title: "Products",   links: [["Traffic","/en/traffic-insights/"],["Customer Journey","/en/customer-journey/"],["Connect","/en/connect/"],["Hypersensor","/en/hypersensor/"]] },
  { title: "Solutions",  links: [["People Counting","/en/people-counting/"],["Conversion Analytics","/en/conversion-analytics/"],["Customer Behavior","/en/customer-behavior/"],["Occupancy Management","/en/occupancy-management/"],["Queue Analytics","/en/queue-analytic/"],["Restroom Management","/en/restroom-management/"],["Guest Wifi Marketing","/en/guest-wifi-marketing/"],["Corporate Wifi Access","/en/corporate-wifi-access/"]] },
  { title: "Industries", links: [["Retail","/en/solution-for-retail-sector/"],["Shopping malls","/en/solution-for-shopping-malls/"],["Supermarkets","/en/supermarkets/"],["Hospitality","/en/hospitality/"],["Public venues","/en/public-venues/"]] },
  { title: "Community",  links: [["Blog","/en/category/blog/"],["Case studies","/en/category/case-studies/"],["Interviews","/en/category/interviews/"]] },
  { title: "Company",    links: [["Partners","/en/partners/"],["About us","/en/about-us/"],["Contact","/en/contact-us/"]] },
];

export const FOOTER_LEGAL_ES: [string, string][] = [
  ["Política de privacidad", "/es/politica-de-privacidad/"],
  ["Cookies",                "/es/politica-de-cookies/"],
  ["Condiciones de uso",     "/es/condiciones-de-uso/"],
  ["Información detallada del tratamiento", "/es/informacion-detallada/"],
  ["Política de seguridad",  "/es/politica-de-seguridad-de-la-informacion/"],
];

export const FOOTER_LEGAL_EN: [string, string][] = [
  ["Privacy policy",     "/en/privacy-policy/"],
  ["Cookies",            "/en/cookie-policy/"],
  ["Terms of use",       "/en/terms-of-use/"],
  ["Detailed information", "/en/detailed-information/"],
  ["Information security", "/en/information-security/"],
];

export const FOOTER_COPY = {
  es: {
    homeHref: "/es/",
    desc: "Empowering physical spaces. Convertimos el vídeo en información en tiempo real para retail, centros comerciales, hoteles y espacios públicos.",
    rights: "Todos los derechos reservados",
  },
  en: {
    homeHref: "/en/",
    desc: "Empowering physical spaces. We turn video into real-time intelligence for retail, shopping malls, hospitality and public venues.",
    rights: "All rights reserved",
  },
} as const;

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
  heroChat?: boolean;            // si true, muestra el chat "pregunta a tus datos" a la derecha del hero
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
  fichaPdf?: string;             // ruta al PDF de la ficha de solución; si existe, muestra la descarga (botón hero + banda navy + modal de captura)
  fichaTitle?: string;          // título del modal de descarga (default: heroTitle)
  fichaHook?: string;           // subtexto de la banda de descarga: gancho propio de la solución (default: neutro sin nº de páginas)
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
  productsBullets?: string[];   // Bullets opcionales (estilo Hypersensor)
  products: Array<{
    title: string;
    desc: string;
    href: string;
    img: string;
    // Aliases nuevos (estilo Hypersensor); si están, ganan a title/img
    name?: string;
    iconImg?: string;
    cta?: string;
  }>;
  testimonialsIdx: number[];
  faqs: Array<{ q: string; a: string }>;
  ctaStripBold: string;
  ctaStripLight: string;
  // ---- NUEVO MODELO de sector (capa CRO). Si `capabilities` existe, el template
  // renderiza: hero → pain-points → capacidades (bento) → CTA → casos → productos.
  // Si no, se mantiene el modelo antiguo (pillars + sections). ----
  painPointsTitle?: string;                                   // "El día a día de tus datos."
  painPointsIntro?: string;
  painPoints?: Array<{ svg: string; title: string; desc: string }>;   // 4 tarjetas de problema
  capsTitle?: string;                                         // "Todo lo que Flame mide y activa en tu centro"
  capsSub?: string;
  capabilities?: Array<{ svg: string; title: string; desc: string; span?: 5 | 6 | 7; featured?: boolean; img?: string; href?: string }>; // 8 capacidades (bento); href opcional → la capacidad enlaza a su caso de uso (Opción A)
  casesTitle?: string;                                        // "Marcas que ya convierten su afluencia en decisiones"
  casesSub?: string;
  caseStudies?: Array<{ href: string; img: string; title: string; excerpt: string; date: string }>; // 3 casos de éxito
  // ---- DRAFT: casos de uso del sector (Opción B). Si `useCases` existe, se renderiza un
  // módulo "Casos de uso" enlazando a las páginas de caso de uso. `hideProducts` oculta el bloque Productos. ----
  useCasesEyebrow?: string;
  useCasesTitle?: string;
  useCasesSub?: string;
  useCases?: Array<{ svg?: string; img?: string; title: string; desc: string; href: string }>; // img = icono del menú (iconImg); si no, svg
  useCasesLayout?: "cards" | "compact" | "list" | "rows" | "minigrid" | "chips" | "tabs" | "timeline" | "directory" | "numbers"; // diseño del módulo de casos de uso
  showUseCases?: boolean;          // activa el módulo de casos de uso (si falso/ausente, no se renderiza aunque haya useCases)
  useCasesBeforeCases?: boolean;   // coloca el módulo de casos de uso por encima de los casos de éxito
  hideProducts?: boolean;
  hideTestimonials?: boolean;      // oculta la sección de testimonios ("marcas que hablan de nosotros")
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
  // Descarga de ficha de producto (mismo patrón que casos de uso). Si fichaPdf existe,
  // el template muestra el botón en el hero + la descarga en el grid de Funcionalidades + el modal.
  // En el grid: nº de funcionalidades PAR → banda a todo el ancho; IMPAR → caja-imagen que
  // rellena el hueco (usa fichaImage, o heroBgImage como fallback).
  fichaPdf?: string;
  fichaTitle?: string;
  fichaHook?: string;
  fichaImage?: string;          // imagen para la caja del hueco (caso impar); default: heroBgImage
};
