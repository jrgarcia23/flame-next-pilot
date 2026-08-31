// Configs del NUEVO MODELO de sector (capa CRO) para la PREVIEW interna de revisión.
// No tocan las páginas públicas: las rutas /es/preview-sectores/* (noindex) las usan.
// Contenido real (producto Flame + realidad de cada sector + casos reales); fotos de las
// capacidades destacadas provisionales donde no hay foto específica de sector.
import { SectorConfig } from "./page-content";
import { getFaqs } from "./live-faqs";

// --- Iconos SVG reutilizables por tipo de capacidad ---
export const IC = {
  people: '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  activity: '<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  cart: '<svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  heatmap: '<svg viewBox="0 0 24 24"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  wifi: '<svg viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  staff: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>',
  bars: '<svg viewBox="0 0 24 24"><line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/><line x1="2" y1="20" x2="22" y2="20"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  eye: '<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  building: '<svg viewBox="0 0 24 24"><path d="M3 9l1-5h16l1 5"/><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M3 9h18"/><path d="M9 21v-6h6v6"/></svg>',
  share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><polyline points="9 12 11 14 15 10"/></svg>',
  door: '<svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
};

// --- Casos de éxito reales de Flame ---
const CASES: Record<string, { href: string; img: string; title: string; excerpt: string; date: string }> = {
  multiopticas: { href: "https://www.flameanalytics.com/es/multiopticas-convierte-el-trafico-en-tienda-en-decisiones-de-negocio/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/2026/07/multiopticas-hero-6a5df7da.png", title: "Cómo MultiÓpticas convierte el tráfico en tienda en decisiones de negocio", excerpt: "MultiÓpticas inicia con Flame Analytics un proyecto de analítica avanzada en tienda para convertir el dato físico en inteligencia de red.", date: "20 de julio de 2026" },
  afflelou: { href: "https://www.flameanalytics.com/es/alain-afflelou-confia-en-la-analitica-de-flame-para-sus-tiendas-en-espana/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/case-studies/alain-afflelou-hero.png", title: "Alain Afflelou confía en Flame Analytics para el conteo de personas en sus tiendas de España", excerpt: "Alain Afflelou implementa la solución de conteo de personas de Flame Analytics en sus tiendas de España para medir afluencia, optimizar la gestión y tomar decisiones basadas en datos.", date: "16 de junio de 2026" },
  caixaforum: { href: "https://www.flameanalytics.com/es/transformando-la-experiencia-en-caixaforum-con-videoanalitica/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2025/02/CASOS-DE-EXITO-EN.jpg", title: "Transformando la experiencia en CaixaForum con videoanalítica", excerpt: "La Fundación “la Caixa” gestiona la red de centros culturales CaixaForum en toda España, espacios que fusionan arte, ciencia y cultura para brindar experiencias únicas a sus visitantes.", date: "12 de febrero de 2025" },
  repsol: { href: "https://www.flameanalytics.com/es/caso-de-exito-repsol-y-flame-analytics-transforman-la-experiencia-en-1000-gasolineras/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2025/04/flame-en-repsol.jpg", title: "Repsol y Flame Analytics transforman la experiencia en 1000 gasolineras", excerpt: "Repsol y Flame transforman la experiencia y la gestión en 1000 gasolineras apoyándose en la analítica de tráfico y conectividad.", date: "9 de abril de 2025" },
  pompeii: { href: "https://www.flameanalytics.com/es/pompeii-uso-del-big-data-en-el-sector-retail/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2020/02/analitica-retail-pompeii.png", title: "Pompeii transforma su estrategia de retail con datos precisos de tráfico", excerpt: "En el competitivo mundo del retail, entender al cliente es clave. Pompeii se apoya en la analítica de tráfico en tienda de Flame para adelantarse a sus clientes.", date: "24 de agosto de 2025" },
};
const pickCases = (keys: string[]) => keys.map((k) => CASES[k]);

// --- Productos (idénticos en todos los sectores) ---
const PRODUCTS = [
  { name: "Traffic", title: "Traffic", desc: "Mide el tráfico dentro y fuera del espacio, monitoriza la ocupación en tiempo real y calcula la conversión, todo desde una plataforma única.", href: "/es/analitica-trafico/", cta: "Ver más", iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png", img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png" },
  { name: "Customer Journey", title: "Customer Journey", desc: "Analiza los recorridos e interacciones de las personas para comprender su comportamiento y optimizar la experiencia en cada punto de contacto.", href: "/es/recorrido-del-cliente/", cta: "Ver más", iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png", img: "/wp-content/uploads/2026/01/road-route-map-icon-1.png" },
  { name: "Connect", title: "Connect", desc: "Recopila datos de los visitantes a través del WiFi para invitados y lanza campañas de marketing personalizadas según su ubicación, perfil y comportamiento.", href: "/es/connect/", cta: "Ver más", iconImg: "/wp-content/uploads/2026/01/Group-1.png", img: "/wp-content/uploads/2026/01/Group-1.png" },
];

const HERO_BULLETS: [string, string, string, string] = ["Precisión del 99 %", "Sin biometría · 100% RGPD", "Datos en tiempo real", "IA sobre tu CCTV existente"];
const PRODUCTS_TITLE = "Productos integrales,";
const PRODUCTS_TITLE_HL = "múltiples soluciones";
const PRODUCTS_SUB = "Medir y mejorar el rendimiento del espacio, comprender el comportamiento de las personas y conectar con tus visitantes.";
const PRODUCTS_BULLETS = ["Mide y mejora el rendimiento del espacio", "Comprende el comportamiento de las personas", "Conecta con tus visitantes"];

// ============================ RETAIL ============================
export const RETAIL_CFG: SectorConfig = {
  metaTitle: "Retail · Flame Analytics", metaDescription: "Analítica de retail físico con IA.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.png", heroBgPosition: "center center",
  heroTitle: "Data Intelligence para Retail",
  heroSub: "Flame convierte las cámaras que ya tienes en tu tienda en datos accionables: cuánta gente entra, cómo se mueve y qué convierte. Analítica de retail físico con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para decidir el layout, la dotación de personal, la ubicación de producto y tus campañas con datos reales.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tus datos.",
  painPointsIntro: "Antes de hablar de plataforma, hablemos de lo que ya vives cada semana gestionando tus tiendas.",
  painPoints: [
    { svg: IC.alert, title: "Decides sin entender qué ocurre en tienda", desc: "El layout, la dotación de personal y la ubicación de producto se definen sin conocer realmente cómo se comporta el cliente dentro de la tienda." },
    { svg: IC.activity, title: "No identificas la causa de la caída", desc: "Cuando bajan las ventas, no sabes si entraron menos clientes o si compraron menos, por lo que terminas actuando sobre el problema equivocado." },
    { svg: IC.door, title: "Pierdes al cliente al salir de la tienda", desc: "En cuanto cruza la puerta, no tienes forma de volver a contactarle ni de convertir esa visita en una relación duradera." },
    { svg: IC.grid, title: "No sabes qué tiendas funcionan mejor", desc: "Cada tienda se gestiona por separado, sin una visión común que compare su rendimiento ni permita detectar qué hace mejor la que obtiene mejores resultados." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu tienda",
  capsSub: "De la afluencia a la fidelización: ocho capacidades reales para gestionar tu retail con datos.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.people, title: "Afluencia y flujo en tienda", desc: "Cuenta con precisión el tráfico interior y exterior y entiende cómo se mueve el cliente por la tienda: recorridos, zonas frías y calientes. Ajusta horarios, personal y layout con datos, no con intuición." },
    { span: 5, svg: IC.staff, title: "Dotación de personal", desc: "Optimiza y adapta los turnos al tráfico real de cada franja e identifica el ratio óptimo entre personal y visitas. Reduce las horas mal asignadas y los costes sin afectar al servicio." },
    { span: 6, svg: IC.cart, title: "Conversión (visita → compra)", desc: "Cruza el tráfico con los datos de tus sistemas de venta (TPV, POS, ERP…) para conocer la tasa de conversión real de cada tienda y del conjunto de tu red. Descubre qué parte de tu afluencia acaba comprando." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Visualiza trayectorias, tiempos de permanencia y mapas de calor. Descubre cómo se mueve el cliente para mejorar el layout, la señalética y la ubicación de los productos." },
    { span: 5, svg: IC.eye, title: "Escaparate y captación", desc: "Mide cómo funciona tu escaparate: cuántos transeúntes pasan, cuántos entran y tu ratio de captación real. Descubre la capacidad de atracción de cada tienda y de cada ubicación." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Retail-1.png", svg: IC.bars, title: "Compara y optimiza tus tiendas", desc: "Mide los KPIs de cada tienda (tráfico exterior e interior, captación, conversión…) y compáralos entre sí. Identifica las mejores y peores prácticas por ubicación y replica lo que funciona en toda tu red." },
    { span: 6, svg: IC.target, title: "Atribución de marketing", desc: "Analiza la afluencia generada por cada campaña, evento o promoción y calcula el coste real por visita de cada canal. Deja de invertir en acciones que no atraen clientes a la tienda." },
    { span: 6, svg: IC.wifi, title: "Captación y fidelización por WiFi", desc: "Convierte el WiFi para clientes en captación: campañas personalizadas por ubicación y comportamiento, segmentación por perfil (edad, género, código postal) y conexión con tu CRM para fidelizar." },
  ],
  casesTitle: "Marcas que ya convierten su tráfico en decisiones",
  casesSub: "Retailers y cadenas que miden con Flame lo que antes se decidía a intuición.",
  caseStudies: pickCases(["multiopticas", "afflelou", "pompeii"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [2, 4, 6], faqs: getFaqs("retail", "es"),
  ctaStripBold: "Cada tienda es única. Tu data debe demostrarlo.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

// ========================= SUPERMERCADOS =========================
export const SUPERMERCADOS_CFG: SectorConfig = {
  metaTitle: "Supermercados · Flame Analytics", metaDescription: "Analítica de supermercados con IA.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.png", heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para supermercados",
  heroSub: "Flame convierte las cámaras que ya tienes en tu supermercado en datos accionables: afluencia por zonas, colas en caja, conversión y cesta. Analítica de supermercados con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para optimizar el surtido, la dotación de cajeros y el layout con datos reales.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu supermercado.",
  painPointsIntro: "Estos son los problemas que se repiten en cualquier superficie de alimentación y que todavía hoy gestionas sin datos reales.",
  painPoints: [
    { svg: IC.clock, title: "Las colas reducen tus ventas", desc: "Cuando aumenta la espera, el cliente abandona la compra o reduce su cesta. Sin datos de afluencia por franja y alertas, reaccionas tarde y sin saber cuándo reforzar las cajas." },
    { svg: IC.staff, title: "Cajeros mal dimensionados en hora punta", desc: "Sobran empleados en las horas valle y faltan durante los picos. Planificar los turnos sin conocer el tráfico real de cada franja genera costes innecesarios y pérdida de ventas." },
    { svg: IC.heatmap, title: "Pasillos y secciones que no rinden", desc: "Hay zonas frías por las que casi nadie pasa y promociones que casi nadie ve. Sin mapas de calor no sabes si el problema es el producto o su ubicación." },
    { svg: IC.cart, title: "Desconoces tu conversión real", desc: "Contar tickets no es suficiente: sin cruzar las visitas reales con las ventas, no sabes qué porcentaje compra. Además, contar carros, niños o empleados distorsiona el dato." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu supermercado",
  capsSub: "Ocho capacidades que trabajan sobre las cámaras CCTV que ya tienes, adaptadas a la operativa de un supermercado.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Retail-1.png", svg: IC.building, title: "Optimización de secciones y planificación de cajeros", desc: "Cruza el flujo de cada sección con las ventas para mejorar el surtido y el espacio, y adapta la plantilla de cajeros a cada franja. Sitúa al personal donde y cuando la tienda lo necesita, sin sobrecostes ni colas." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo por zonas", desc: "Mide las entradas y salidas y analiza cómo se mueve el cliente por el supermercado. Compara días, franjas y campañas para conocer el tráfico real y detectar las zonas con mayor afluencia." },
    { span: 6, svg: IC.cart, title: "Conversión de visita a compra", desc: "Cruza el tráfico real con tu TPV, POS o ERP para calcular la conversión y la cesta media reales. Descubre cuántos clientes entran en el supermercado y salen sin comprar." },
    { span: 6, svg: IC.heatmap, title: "Mapas de calor y comportamiento", desc: "Visualiza trayectorias, puntos calientes y tiempo de permanencia en cada pasillo. Descubre qué secciones atraen, cuáles se ignoran y cómo mejorar el layout y las cabeceras." },
    { span: 5, svg: IC.activity, title: "Ocupación y aforo en tiempo real", desc: "Controla cuánta gente hay en cada momento y por zona, con alertas cuando una sección o la línea de cajas se satura. Actúa antes de que la aglomeración se convierta en una mala experiencia." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.clock, title: "Gestión de colas y aseos", desc: "Mide el tiempo de espera y el abandono en la línea de cajas para abrir puestos justo cuando hace falta. Controla también el uso de los aseos para planificar la limpieza por uso real y no por horario fijo." },
    { span: 6, svg: IC.wifi, title: "Captación y fidelización por WiFi", desc: "El portal cautivo del WiFi convierte las visitas en contactos y los integra en tu CRM (como Mailchimp, Salesforce o HubSpot). Crea una base de datos para lanzar promociones y aumentar la recurrencia con el consentimiento del cliente." },
    { span: 6, svg: IC.share, title: "Datos para la operativa diaria", desc: "Planifica limpieza, reposición y turnos según el flujo real de cada franja horaria. Convierte el dato en decisiones concretas de personal, stock y mantenimiento." },
  ],
  casesTitle: "Marcas que ya deciden con datos, no con intuición",
  casesSub: "Grandes redes y cadenas que miden con Flame el tráfico, las colas y la conversión reales.",
  caseStudies: pickCases(["repsol", "multiopticas", "afflelou"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 1, 7], faqs: getFaqs("shopping-malls", "es"),
  ctaStripBold: "Menos colas, mejor surtido, más conversión.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

// ============================ HOTELES ============================
export const HOTELES_CFG: SectorConfig = {
  metaTitle: "Hoteles · Flame Analytics", metaDescription: "Analítica de ocupación para hoteles.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png", heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para hoteles",
  heroSub: "Flame convierte las cámaras y el WiFi que ya tienes en tu hotel en datos accionables: afluencia y ocupación del lobby, el restaurante o el spa. Analítica hotelera con inteligencia artificial, sin biometría y con pleno cumplimiento del RGPD, para ajustar el personal, controlar el aforo y justificar cada instalación con datos reales.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu hotel.",
  painPointsIntro: "Gestionas un hotel con muchas zonas y horarios cambiantes, pero decides por intuición y no con datos. Estos son los problemas que Flame resuelve midiendo lo que de verdad pasa en cada espacio.",
  painPoints: [
    { svg: IC.grid, title: "No sabes qué zonas usan tus huéspedes", desc: "El lobby, el restaurante o el spa se llenan y vacían sin que sepas cuándo ni por qué. Sin datos reales de ocupación, cualquier decisión sobre estos espacios se basa en suposiciones." },
    { svg: IC.staff, title: "La plantilla no se adapta a la afluencia", desc: "En algunos momentos sobra personal en recepción y en otros se forman colas. Planificar los turnos sin datos reales aumenta los costes y perjudica la experiencia del huésped." },
    { svg: IC.alert, title: "Desconoces la ocupación en tiempo real", desc: "En eventos, comedores y zonas comunes necesitas saber cuántas personas hay en cada momento. Sin un conteo fiable, no puedes controlar el aforo ni garantizar la seguridad." },
    { svg: IC.bars, title: "No sabes qué instalaciones son rentables", desc: "Reformar el spa, ampliar el restaurante o renovar el gimnasio exige una inversión. Sin medir el uso real de cada espacio, no puedes justificar las mejoras ni demostrar qué instalaciones funcionan." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu hotel",
  capsSub: "Ocho capacidades pensadas para la realidad de un hotel, sobre las cámaras y el WiFi que ya tienes y siempre sin biometría.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png", svg: IC.building, title: "Optimiza la ocupación y la dotación de personal", desc: "Mide la afluencia en el lobby, el restaurante, el spa o las salas de eventos por franja horaria. Ajusta la plantilla a la ocupación real, reduce los turnos innecesarios y evita esperas por falta de personal." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de huéspedes", desc: "Mide las entradas, salidas y el movimiento entre las diferentes zonas del hotel. Descubre cuántos huéspedes pasan por cada espacio y en qué horarios para tomar mejores decisiones operativas." },
    { span: 6, svg: IC.cart, title: "Uso de servicios y conversión", desc: "Cruza la afluencia con los datos de tu PMS o POS en espacios como el restaurante o el spa. Descubre qué porcentaje de huéspedes termina consumiendo y dónde estás perdiendo oportunidades de negocio." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Visualiza las trayectorias y el tiempo de permanencia en las zonas comunes con mapas de calor. Descubres qué rincones atraen a tus huéspedes y cuáles pasan desapercibidos para redistribuir mobiliario y servicios." },
    { span: 5, svg: IC.clock, title: "Gestión de colas y aseos", desc: "Detecta las esperas en recepción y el check-in para abrir más puestos cuando hace falta. Programa además la limpieza de los aseos según su uso real y no por un horario fijo." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.activity, title: "Ocupación en tiempo real por zona", desc: "Consulta cuántas personas hay en el lobby, el comedor o el spa y recibe alertas antes de alcanzar el límite. Anticípate a la saturación y actúa antes de que afecte a la experiencia del huésped." },
    { span: 6, svg: IC.wifi, title: "Guest WiFi: capta y fideliza", desc: "Convierte el WiFi de tus huéspedes en tu canal de marketing directo: un portal cautivo que capta contactos para tu CRM, comunica durante la estancia y lanza campañas de fidelización segmentadas. La palanca que ya activan cadenas como Hotels VIVA para conocer y fidelizar a quien pasa por sus hoteles." },
    { span: 6, svg: IC.share, title: "Datos reales para operaciones", desc: "Planifica la limpieza, el personal, la energía y el mantenimiento según el uso de cada espacio. Activa la climatización y la iluminación cuando sea necesario y destina los recursos donde realmente hacen falta." },
  ],
  casesTitle: "Espacios que ya gestionan la experiencia con datos",
  casesSub: "Grandes espacios y redes que miden con Flame la afluencia y la ocupación reales.",
  caseStudies: pickCases(["caixaforum", "repsol", "multiopticas"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [3, 5, 8], faqs: getFaqs("hospitality", "es"),
  ctaStripBold: "Cada zona de tu hotel, medida y bajo control.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

// ======================= ESPACIOS PÚBLICOS =======================
export const ESPACIOS_CFG: SectorConfig = {
  metaTitle: "Espacios públicos · Flame Analytics", metaDescription: "Aforo, seguridad y flujos en espacios públicos.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png", heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para espacios públicos",
  heroSub: "Flame convierte las cámaras de tu espacio en datos útiles sobre afluencia, ocupación, seguridad y uso de cada zona. Analítica con inteligencia artificial aplicada para espacios públicos, sin biometría y conforme al RGPD, para mejorar la seguridad, planificar eventos y justificar decisiones ante la administración con datos reales.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu espacio público.",
  painPointsIntro: "Gestionar un espacio público exige equilibrar seguridad, experiencia del visitante y presupuesto, muchas veces sin datos. Sin conocer el aforo ni los flujos de personas, las decisiones sobre personal, aperturas y eventos terminan basándose en la intuición.",
  painPoints: [
    { svg: IC.alert, title: "Desconoces la ocupación real de cada espacio", desc: "Sin datos fiables sobre cuántas personas hay en cada sala o acceso, el control del aforo depende de conteos manuales. Cuando detectas la saturación, el riesgo para la seguridad ya existe." },
    { svg: IC.heatmap, title: "Desconoces cómo se mueve la gente", desc: "No sabes por dónde entran las personas, qué recorridos siguen ni dónde se concentran. Esta falta de información dificulta la gestión de multitudes, el diseño de accesos y la planificación de eventos." },
    { svg: IC.bars, title: "Justificar el uso ante la administración cuesta", desc: "Ayuntamientos, patronatos y entidades financiadoras exigen datos objetivos. Sin cifras fiables de visitantes y ocupación, justificar un evento, una inversión o un presupuesto termina dependiendo de percepciones." },
    { svg: IC.activity, title: "Limpieza y energía sin criterio de uso", desc: "Se limpia por horario y se climatiza por costumbre, no por ocupación real. El resultado son aseos descuidados en las horas punta y gasto energético en zonas y franjas casi vacías." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu espacio público",
  capsSub: "Ocho capacidades para gestionar tu espacio público con datos reales: desde el control del aforo hasta la justificación ante la administración. Todo sin biometría y con pleno cumplimiento del RGPD.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png", svg: IC.shield, title: "Aforo y seguridad en tiempo real", desc: "Consulta la ocupación total y por zona y recibe alertas antes de alcanzar el límite. Analiza los flujos peatonales para anticipar aglomeraciones y planificar con seguridad eventos, aperturas y momentos de gran afluencia." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de personas", desc: "Mide las entradas y salidas y analiza el tráfico por accesos, zonas y salas. Descubre cuántas personas visitan el espacio, cuándo se producen las horas punta y cómo se distribuyen entre los distintos servicios." },
    { span: 6, svg: IC.target, title: "Impacto de eventos y actividades", desc: "Mide la afluencia que genera cada exposición, evento o actividad y compárala con la programación habitual. Descubre qué contenidos atraen público de verdad y justifica la inversión cultural con datos objetivos." },
    { span: 6, svg: IC.bars, title: "Análisis de uso por zona y servicio", desc: "Identifica qué salas, exposiciones o servicios atraen más visitantes y cuáles están infrautilizados. Utiliza estos datos para programar contenidos, ajustar horarios y decidir dónde concentrar las inversiones." },
    { span: 5, svg: IC.heatmap, title: "Mapas de calor y recorridos peatonales", desc: "Analiza las trayectorias, los tiempos de permanencia y las zonas con mayor concentración de visitantes. Detecta cuellos de botella, espacios infrautilizados y los recorridos reales que realiza el público." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.share, title: "Datos para justificar operaciones", desc: "Planifica la limpieza, el personal y la energía según la ocupación real. Acredita ante ayuntamientos, patronatos y financiadores el uso de cada espacio y el impacto de los eventos con datos objetivos." },
    { span: 6, svg: IC.wifi, title: "Captación y comunicación por WiFi", desc: "Ofrece WiFi mediante un portal cautivo que informa, orienta y crea un canal de comunicación directo. Aprovecha cada conexión para compartir actividades, avisos y servicios sin utilizar datos personales sensibles." },
    { span: 6, svg: IC.clock, title: "Gestión de colas y aseos", desc: "Controla las esperas en accesos, taquillas y puntos de información, y planifica la limpieza de los aseos según su uso real. Reduce las colas en horas punta y mantén las instalaciones preparadas cuando más se necesitan." },
  ],
  casesTitle: "Espacios públicos que ya gestionan con datos",
  casesSub: "Centros culturales y grandes redes que utilizan Flame para controlar el aforo, analizar los flujos y conocer el uso real de cada espacio.",
  caseStudies: pickCases(["caixaforum", "repsol", "multiopticas"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 6, 2], faqs: getFaqs("public-venues", "es"),
  ctaStripBold: "Aforo, seguridad y flujos, en tiempo real.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

// ============================ BANCOS ============================
export const BANCOS_CFG: SectorConfig = {
  metaTitle: "Bancos y sucursales · Flame Analytics", metaDescription: "Analítica de afluencia y colas para redes de oficinas bancarias.",
  heroBgImage: "/wp-content/uploads/2026/01/Traffic2-1.png", heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para bancos y sucursales",
  heroSub: "Flame convierte las cámaras de tus oficinas en datos útiles sobre afluencia, colas y uso real de cada sucursal. Analítica para banca con inteligencia artificial, sin biometría y conforme al RGPD, para dimensionar cajeros y gestores, reducir esperas y optimizar toda la red con datos reales.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu red de oficinas.",
  painPointsIntro: "Gestionar una red de sucursales sin conocer qué ocurre en cada oficina obliga a tomar decisiones por intuición. Estos son los problemas que más afectan a la experiencia del cliente y a la eficiencia de toda la red.",
  painPoints: [
    { svg: IC.clock, title: "Colas y esperas en la sucursal", desc: "Los clientes hacen cola en caja, atención personal o para ver a un gestor sin que sepas cuándo se producen los picos. Las esperas deterioran la experiencia y empujan al cliente hacia los canales digitales." },
    { svg: IC.staff, title: "Dotación de personal a ciegas", desc: "Asignas cajeros y gestores según la costumbre o datos desactualizados. En las horas valle sobra personal y, durante los picos de afluencia, faltan empleados para atender la demanda." },
    { svg: IC.bars, title: "Desconoces el uso real de cada oficina", desc: "Decides horarios, cierres o reformas sin datos objetivos sobre el tráfico de cada sucursal. Sin esta información, resulta difícil justificar ante dirección cualquier inversión o ajuste en la red." },
    { svg: IC.shield, title: "La privacidad como requisito imprescindible", desc: "El sector financiero exige soluciones que no identifiquen a las personas. Cualquier sistema de analítica debe respetar el RGPD y excluir el uso de datos biométricos desde su diseño." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu sucursal",
  capsSub: "Ocho capacidades de Flame para optimizar cada sucursal y gestionar toda tu red utilizando el CCTV existente, sin biometría, sin identificar a ninguna persona y con pleno cumplimiento del RGPD.",
  capabilities: [
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.staff, title: "Optimiza las colas y la dotación de personal", desc: "Cruza la afluencia real de cada franja con la plantilla disponible para dimensionar cajeros y gestores. Refuerza los momentos de mayor demanda, reduce personal en horas valle y evita esperas sin sobredimensionar el equipo." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de personas", desc: "Mide las entradas, salidas y el tráfico por las distintas zonas de cada sucursal. Identifica las franjas de mayor y menor afluencia para planificar la operativa de la oficina con datos reales." },
    { span: 6, svg: IC.cart, title: "Conversión y uso de servicios", desc: "Descubre qué porcentaje de visitantes utiliza la atención personal, consulta a un gestor o acude al cajero automático. Identifica los servicios con mayor demanda en cada oficina y distribuye los recursos según su uso real." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Visualiza mediante mapas de calor las zonas de espera, autoservicio y atención personal. Detecta concentraciones, cuellos de botella y espacios infrautilizados para mejorar la distribución de cada oficina." },
    { span: 5, svg: IC.activity, title: "Ocupación y aforo en tiempo real", desc: "Consulta cuántas personas hay en cada zona de la oficina y controla el aforo de las áreas de espera y atención personal. Anticípate a la saturación antes de que perjudique la experiencia del cliente." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.bars, title: "Datos para operaciones y red", desc: "Compara todas tus sucursales con los mismos indicadores objetivos. Utiliza los datos reales de cada oficina para justificar horarios, ajustar la plantilla y tomar decisiones sobre cierres o reformas sin depender de estimaciones." },
    { span: 6, svg: IC.clock, title: "Gestión de colas en tiempo real", desc: "Supervisa la longitud de las colas en caja, atención al cliente y gestor, y recibe alertas cuando la espera supera el límite establecido. Reacciona antes de que la experiencia se deteriore o el cliente abandone la oficina." },
    { span: 6, svg: IC.wifi, title: "Captación y comunicación por WiFi", desc: "Ofrece WiFi a los clientes mediante un portal cautivo y facilita redes corporativas seguras para los empleados. Convierte la conexión en un canal para informar sobre productos y servicios mientras el cliente espera o recibe atención en la oficina." },
  ],
  casesTitle: "Bancos y entidades que ya gestionan con datos",
  casesSub: "Grandes redes distribuidas que miden con Flame la afluencia, las colas y el uso real de cada punto.",
  caseStudies: pickCases(["repsol", "multiopticas", "afflelou"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [1, 5, 7], faqs: [],
  ctaStripBold: "Menos esperas, mejor dimensionamiento de equipos, red bajo control.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

// ==================== TRANSPORTE Y AEROPUERTOS ====================
export const TRANSPORTE_CFG: SectorConfig = {
  metaTitle: "Transporte y aeropuertos · Flame Analytics", metaDescription: "Flujos de pasajeros, aforo y colas en aeropuertos y estaciones.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png", heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para transporte y aeropuertos",
  heroSub: "Flame convierte las cámaras de tu terminal en datos útiles sobre flujos de pasajeros, aforo, colas y uso de cada zona. Analítica para aeropuertos y estaciones con inteligencia artificial, sin biometría y conforme al RGPD, para anticipar aglomeraciones, planificar el personal y optimizar el área comercial con datos reales.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu terminal.",
  painPointsIntro: "Cada hora punta pone a prueba la operativa: miles de pasajeros coinciden en los mismos puntos, las colas aumentan sin previo aviso y las decisiones se toman sin información. Estos son los problemas que Flame resuelve con datos en tiempo real.",
  painPoints: [
    { svg: IC.clock, title: "Colas que deterioran la experiencia de usuario", desc: "Las esperas en los controles, la facturación y el embarque aumentan las quejas y el riesgo de perder viajes. Sin datos reales, no puedes abrir nuevas posiciones ni ajustar el personal a tiempo." },
    { svg: IC.activity, title: "Aglomeraciones que te pillan desprevenido", desc: "Los pasajeros se concentran antes de que puedas reaccionar. Gestionar los accesos y los turnos sin datos provoca la saturación de andenes y salas justo cuando necesitas un mayor control." },
    { svg: IC.bars, title: "Desconoces el tráfico de las zonas comerciales", desc: "Sin saber cuántas personas pasan por cada local, restaurante o aparcamiento, no puedes optimizar la oferta ni justificar las rentas ante los operadores. El potencial comercial del recinto queda desaprovechado." },
    { svg: IC.shield, title: "Anticipación a riesgos operativos", desc: "En un espacio con gran afluencia y alta sensibilidad, desconocer la ocupación de cada zona supone un riesgo. Sin datos en tiempo real, actúas cuando la saturación ya es evidente." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu terminal",
  capsSub: "Ocho capacidades de Flame para optimizar aeropuertos, estaciones e intercambiadores utilizando la infraestructura de cámaras existente, sin identificar a ninguna persona y con pleno cumplimiento del RGPD.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png", svg: IC.shield, title: "Flujos peatonales, gestión de multitudes y seguridad", desc: "Analiza la ocupación y los flujos de cada zona para anticipar aglomeraciones antes de que se formen. Planifica accesos, personal y refuerzos durante los picos de afluencia y mejora la seguridad en tiempo real, sin biometría y conforme al RGPD." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de pasajeros", desc: "Mide las entradas y salidas y analiza el tráfico por terminales, accesos y andenes. Descubre cuántos pasajeros circulan por cada punto y en qué horarios para planificar la operativa con datos reales." },
    { span: 6, svg: IC.activity, title: "Aforo y ocupación en tiempo real", desc: "Consulta la ocupación de salas de espera, vestíbulos y andenes y recibe alertas cuando una zona se aproxima a su límite. Actúa antes de que la saturación afecte a la seguridad o a la experiencia del pasajero." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Visualiza cómo se desplazan los pasajeros e identifica los puntos que ralentizan el tránsito. Mide los tiempos de recorrido entre zonas clave para mejorar la señalética y optimizar los flujos de circulación." },
    { span: 5, svg: IC.bars, title: "Uso de zonas y servicios", desc: "Analiza el tráfico de salas VIP, comercios, restaurantes y aparcamientos. Identifica qué espacios funcionan mejor y cuáles están infrautilizados para optimizar la oferta y tomar decisiones sobre la explotación del recinto." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.clock, title: "Gestión de colas y limpieza de aseos", desc: "Mide las esperas en controles de seguridad, facturación, taquillas y embarque para abrir nuevas posiciones antes de que aumenten las colas. Planifica también la limpieza de los aseos según su uso real, no mediante horarios fijos." },
    { span: 6, svg: IC.wifi, title: "Captación y comunicación por WiFi", desc: "Ofrece conexión mediante un portal cautivo y convierte cada acceso en un canal de comunicación. Informa sobre incidencias, retrasos y servicios del recinto mientras obtienes datos agregados sobre el uso de la red." },
    { span: 6, svg: IC.share, title: "Datos para operaciones e ingresos comerciales", desc: "Planifica la limpieza, el personal y la energía según el uso real de cada espacio. Reduce sobrecostes y utiliza el tráfico de cada local para valorar los espacios y justificar las rentas con datos objetivos." },
  ],
  casesTitle: "Grandes recintos que ya gestionan con datos",
  casesSub: "Redes distribuidas y espacios de gran afluencia que utilizan Flame para controlar el tráfico, reducir las colas y conocer el uso real de cada zona.",
  caseStudies: pickCases(["repsol", "caixaforum", "multiopticas"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 4, 8], faqs: [],
  ctaStripBold: "Flujos, ocupación y colas bajo control en tiempo real.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

export const PREVIEW_SECTORS: Array<{ slug: string; label: string; cfg: SectorConfig; enHref: string }> = [
  { slug: "retail", label: "Retail", cfg: RETAIL_CFG, enHref: "/en/solution-for-retail-sector/" },
  { slug: "supermercados", label: "Supermercados", cfg: SUPERMERCADOS_CFG, enHref: "/en/supermarkets/" },
  { slug: "hoteles", label: "Hoteles", cfg: HOTELES_CFG, enHref: "/en/hospitality/" },
  { slug: "espacios-publicos", label: "Espacios públicos", cfg: ESPACIOS_CFG, enHref: "/en/public-venues/" },
  { slug: "bancos", label: "Bancos y sucursales", cfg: BANCOS_CFG, enHref: "/en/banking/" },
  { slug: "transporte", label: "Transporte y aeropuertos", cfg: TRANSPORTE_CFG, enHref: "/en/transport-and-airports/" },
];
