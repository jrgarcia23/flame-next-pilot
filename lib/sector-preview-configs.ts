// Configs del NUEVO MODELO de sector (capa CRO) para la PREVIEW interna de revisión.
// No tocan las páginas públicas: las rutas /es/preview-sectores/* (noindex) las usan.
// Contenido real (producto Flame + realidad de cada sector + casos reales); fotos de las
// capacidades destacadas provisionales donde no hay foto específica de sector.
import { SectorConfig } from "./page-content";
import { getFaqs } from "./live-faqs";

// --- Iconos SVG reutilizables por tipo de capacidad ---
const IC = {
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
  heroSub: "En Flame desarrollamos e implantamos soluciones de marketing digital y analítica para espacios físicos que, gracias al big data y la Inteligencia Artificial, mejoran la gestión y ayudan a los retailers a entender el comportamiento de sus clientes.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tus datos.",
  painPointsIntro: "Antes de hablar de plataforma, hablemos de lo que ya vives cada semana gestionando tus tiendas.",
  painPoints: [
    { svg: IC.alert, title: "Decides sin ver qué pasa en tienda", desc: "El layout, la dotación de personal y la ubicación de producto se deciden sin ver de verdad cómo se comporta el cliente dentro de la tienda." },
    { svg: IC.activity, title: "No sabes si el problema es tráfico o experiencia", desc: "Cuando caen las ventas, no puedes distinguir si vino menos gente o si los mismos clientes compraron menos, y acabas disparando al problema equivocado." },
    { svg: IC.door, title: "Pierdes al cliente al salir de la tienda", desc: "En cuanto cruza la puerta, no tienes forma de volver a contactarle ni de convertir esa visita en una relación duradera." },
    { svg: IC.grid, title: "No puedes comparar tus tiendas entre sí", desc: "Cada tienda se gestiona por separado, sin un panel común que compare rendimiento real ni te diga qué está haciendo bien la que mejor funciona." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu tienda",
  capsSub: "De la afluencia a la fidelización: ocho capacidades reales para gestionar tu retail con datos.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.people, title: "Afluencia y flujo en tienda", desc: "Cuenta con precisión el tráfico interior y exterior y entiende cómo se mueve el cliente por la tienda: recorridos, zonas frías y calientes. Ajusta horarios, personal y layout con datos, no con intuición." },
    { span: 5, svg: IC.staff, title: "Dotación de personal", desc: "Alinea los turnos con el tráfico real de cada franja y descubre el ratio personal-a-tráfico óptimo. Reduce las horas mal asignadas y el coste laboral sin perder nivel de servicio." },
    { span: 6, svg: IC.cart, title: "Conversión (visita → compra)", desc: "Cruza el tráfico con los datos de tus sistemas de venta (TPV, POS, ERP…) para conocer la tasa real de conversión. Con Shopper Funnel mides los KPIs a lo largo de todo el recorrido del cliente." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Trayectorias, tiempo de permanencia por zona y mapas de calor de la tienda. Entiende cómo se mueve el cliente para optimizar el layout, la señalética y la ubicación de cada producto." },
    { span: 5, svg: IC.eye, title: "Escaparate y captación", desc: "Mide cómo funciona tu escaparate: cuántos transeúntes pasan, cuántos entran y tu ratio de captación real. Descubre la capacidad de atracción de cada tienda y de cada ubicación." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Retail-1.png", svg: IC.bars, title: "Compara y optimiza tus tiendas", desc: "Mide los KPIs de cada tienda (tráfico exterior e interior, captación, conversión…) y compáralos entre sí. Identifica las mejores y peores prácticas por ubicación y replica lo que funciona en toda tu red." },
    { span: 6, svg: IC.target, title: "Atribución de marketing", desc: "Mide la afluencia que genera cada campaña, evento o promoción (exterior, radio, redes, email) y conoce el coste real por visita de cada canal. Deja de gastar en promociones que no traen gente a la tienda." },
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
  heroSub: "Convierte las cámaras que ya tienes en tu supermercado en un sistema que mide qué pasa en cada pasillo y en cada caja. Sabrás cuánta gente entra, por dónde circula, cuánto espera para pagar y qué secciones rinden, sin biometría y cumpliendo el RGPD. Decisiones de surtido, personal y layout basadas en datos reales, no en intuiciones.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu supermercado.",
  painPointsIntro: "Estos son los problemas que se repiten en cualquier superficie de alimentación y que hoy gestionas a ojo.",
  painPoints: [
    { svg: IC.clock, title: "Colas en caja que espantan la compra", desc: "Cuando la espera se dispara, el cliente abandona el carro o reduce la cesta. Sin datos de afluencia por franja reaccionas tarde y siempre a ciegas." },
    { svg: IC.staff, title: "Cajeros mal dimensionados en hora punta", desc: "Sobran manos en las horas valle y faltan en los picos. Planificar turnos sin conocer el flujo real de cada franja cuesta ventas y horas de personal." },
    { svg: IC.heatmap, title: "Pasillos y secciones que no rinden", desc: "Hay zonas frías por las que casi nadie pasa y promociones que casi nadie ve. Sin mapas de calor no sabes si el problema es el producto o su ubicación." },
    { svg: IC.cart, title: "No sabes qué parte del tráfico compra", desc: "Contar tickets no basta: sin cruzar las visitas reales con las ventas, tu conversión y tu cesta media son una estimación. Y contar carros o niños como visitas ensucia el dato." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu supermercado",
  capsSub: "Ocho capacidades que trabajan sobre las cámaras CCTV que ya tienes y tu Hypersensor, adaptadas a la operativa de un supermercado.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Retail-1.png", svg: IC.building, title: "Secciones y planificación de cajeros", desc: "La pieza clave para un súper: cruza el flujo por sección con las ventas para optimizar surtido y espacio, y dimensiona la plantilla de cajeros por hora punta. Colocas al personal donde y cuando la tienda lo pide, sin sobrecostes ni colas." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo por zonas", desc: "Mide entradas y salidas y sigue cómo circula la gente por el supermercado. Compara días, franjas y campañas para saber cuándo tienes tráfico de verdad y qué zonas concentran el paso." },
    { span: 6, svg: IC.cart, title: "Conversión de visita a compra", desc: "Cruza el tráfico real con tu TPV, POS o ERP para conocer tu tasa de conversión y tu cesta media de verdad. Deja de suponer cuánta gente entra y se va sin comprar." },
    { span: 6, svg: IC.heatmap, title: "Mapas de calor y comportamiento", desc: "Visualiza trayectorias, puntos calientes y tiempo de permanencia en cada pasillo. Descubre qué secciones atraen, cuáles se ignoran y cómo mejorar el layout y las cabeceras." },
    { span: 5, svg: IC.activity, title: "Ocupación y aforo en tiempo real", desc: "Controla cuánta gente hay en cada momento y por zona, con alertas cuando una sección o la línea de cajas se satura. Actúa antes de que la aglomeración se convierta en una mala experiencia." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.clock, title: "Gestión de colas y aseos", desc: "Mide el tiempo de espera y el abandono en la línea de cajas para abrir puestos justo cuando hace falta. Controla también el uso de los aseos para planificar la limpieza por uso real y no por horario fijo." },
    { span: 6, svg: IC.wifi, title: "Captación y fidelización por WiFi", desc: "El portal cautivo del WiFi convierte a los visitantes en contactos y los vuelca a tu CRM (MailChimp, Salesforce o Hubspot). Construyes base de datos para promociones y recurrencia con el permiso del cliente." },
    { span: 6, svg: IC.share, title: "Datos para la operativa diaria", desc: "Planifica limpieza, reposición y turnos según el flujo real de cada franja horaria. Conviertes el dato en decisiones concretas de personal, stock y mantenimiento." },
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
  heroSub: "Flame convierte las cámaras y el WiFi que ya tienes en datos de afluencia y ocupación de cada zona de tu hotel. Ajusta el personal a la demanda real, controla el aforo del lobby, el restaurante o el spa y justifica cada inversión con el uso real de tus instalaciones. Todo sin biometría y con pleno cumplimiento del RGPD.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu hotel.",
  painPointsIntro: "Gestionas un hotel con muchas zonas y horarios cambiantes, pero decides por intuición y no con datos. Estos son los problemas que Flame resuelve midiendo lo que de verdad pasa en cada espacio.",
  painPoints: [
    { svg: IC.grid, title: "No sabes qué zonas usan tus huéspedes", desc: "El lobby, el restaurante o el spa se llenan a horas que no controlas y se vacían cuando menos lo esperas. Sin datos de ocupación reales, cada decisión sobre esos espacios es una apuesta." },
    { svg: IC.staff, title: "El personal no cuadra con la afluencia", desc: "Unas veces sobra plantilla en recepción y otras se forman colas en el check-in. Dimensionar los turnos por sensaciones dispara los costes o hunde la experiencia del huésped." },
    { svg: IC.alert, title: "Controlas el aforo y la seguridad a ciegas", desc: "En eventos, comedores o zonas comunes necesitas saber cuánta gente hay en cada momento. Sin un conteo fiable, cumplir con el aforo y garantizar la seguridad queda al azar." },
    { svg: IC.bars, title: "Cuesta justificar la inversión en instalaciones", desc: "Reformar el spa, ampliar el restaurante o renovar el gimnasio cuesta dinero y hay que defenderlo ante dirección. Sin medir el uso real de cada zona, no puedes demostrar qué instalaciones rinden." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu hotel",
  capsSub: "Ocho capacidades pensadas para la realidad de un hotel, sobre las cámaras y el WiFi que ya tienes y siempre sin biometría.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png", svg: IC.building, title: "Ocupación de zonas comunes y dotación de personal", desc: "Mide cuánta gente hay en el lobby, el restaurante, el spa o las salas de eventos en cada franja horaria. Con esos datos ajustas la dotación de personal a la afluencia real y dejas de pagar turnos que sobran o de sufrir esperas por falta de plantilla." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de personas por el hotel", desc: "Cuenta entradas y salidas y sigue el tráfico entre las distintas zonas del hotel. Sabes cuántos huéspedes circulan por cada área y a qué horas, la base para tomar cualquier decisión operativa." },
    { span: 6, svg: IC.cart, title: "Uso de servicios y conversión", desc: "Cruza la afluencia con los datos de tu PMS o POS donde tenga sentido, por ejemplo en el restaurante o el spa. Ves qué porcentaje de huéspedes que pasa por una zona acaba consumiendo y dónde se pierde negocio." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Visualiza las trayectorias y el tiempo de permanencia en las zonas comunes con mapas de calor. Descubres qué rincones atraen a tus huéspedes y cuáles pasan desapercibidos para redistribuir mobiliario y servicios." },
    { span: 5, svg: IC.clock, title: "Gestión de colas y aseos", desc: "Detecta las esperas en recepción y el check-in para abrir más puestos cuando hace falta. Programa además la limpieza de los aseos según su uso real y no por un horario fijo." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.activity, title: "Ocupación en tiempo real por zona", desc: "Consulta al instante cuánta gente hay en el lobby, el comedor o el spa y recibe alertas cuando una zona se acerca a su límite. Reaccionas antes de que se sature, sin esperar a que un huésped se queje." },
    { span: 6, svg: IC.wifi, title: "Captación y fidelización por WiFi", desc: "Ofrece WiFi a los huéspedes con un portal cautivo y convierte cada conexión en un contacto para tu CRM. Alimentas tu base de datos y tus campañas de fidelización con quienes ya han pasado por el hotel." },
    { span: 6, svg: IC.share, title: "Datos para operaciones", desc: "Planifica limpieza, personal, energía y mantenimiento a partir del uso real de cada espacio. Enciendes climatización y luces donde hay gente y concentras los recursos donde de verdad se necesitan." },
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
  heroSub: "Convierte tus museos, centros culturales, estaciones y edificios públicos en espacios medidos: afluencia, aforo, seguridad y uso real de cada zona, en tiempo real. Todo sin biometría y 100% conforme al RGPD, sobre las cámaras que ya tienes instaladas y con el Hypersensor de Flame.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu espacio público.",
  painPointsIntro: "Gestionar un espacio público es equilibrar seguridad, experiencia del visitante y presupuesto, casi siempre a ciegas. Sin datos de aforo ni de flujos, cada decisión sobre personal, aperturas o eventos se toma por intuición.",
  painPoints: [
    { svg: IC.alert, title: "No sabes el aforo real en tiempo real", desc: "Sin una cifra fiable de cuántas personas hay en cada sala o acceso, el control de aforo depende de conteos manuales y de la vista. Cuando detectas la saturación, el problema de seguridad ya está encima." },
    { svg: IC.heatmap, title: "Los flujos peatonales son un punto ciego", desc: "Desconoces por dónde entra la gente, qué recorridos hace y dónde se acumula. Esa falta de visibilidad complica la gestión de multitudes, el diseño de accesos y la planificación de cualquier evento." },
    { svg: IC.bars, title: "Justificar el uso ante la administración cuesta", desc: "Ayuntamientos, patronatos y entidades financiadoras piden pruebas de uso, no impresiones. Sin datos objetivos de visitantes y ocupación, defender un evento o un presupuesto se vuelve una batalla de percepciones." },
    { svg: IC.activity, title: "Limpieza y energía sin criterio de uso", desc: "Se limpia por horario y se climatiza por costumbre, no por ocupación real. El resultado son aseos descuidados en las horas punta y gasto energético en zonas y franjas casi vacías." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu espacio público",
  capsSub: "Ocho capacidades para dirigir tu espacio público con datos, de la seguridad del aforo a la justificación ante la administración. Todas sin biometría y 100% dentro del RGPD.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png", svg: IC.shield, title: "Aforo y seguridad en tiempo real", desc: "Controla el aforo global y por zona con alertas automáticas antes de alcanzar el límite, y sigue los flujos peatonales para anticipar aglomeraciones. Es la base para la gestión de multitudes y la planificación segura de eventos, aperturas y grandes afluencias." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de personas", desc: "Mide entradas y salidas y reparte el tráfico por accesos, zonas y salas a lo largo del día. Sabes cuántas personas visitan el espacio, cuándo llegan las horas punta y cómo se distribuyen entre los distintos servicios." },
    { span: 6, svg: IC.activity, title: "Ocupación por zona en tiempo real", desc: "Consulta la ocupación de cada sala, planta o servicio al instante y recibe alertas cuando una zona se satura. Redistribuyes visitantes, abres nuevos accesos y mantienes una experiencia cómoda sin esperar a que se forme el problema." },
    { span: 6, svg: IC.bars, title: "Análisis de uso por zona y servicio", desc: "Descubre qué salas, exposiciones o servicios concentran el interés y cuáles quedan infrautilizados. Con ese detalle programas contenidos, ajustas horarios y decides dónde invertir en cada espacio." },
    { span: 5, svg: IC.heatmap, title: "Mapas de calor y recorridos peatonales", desc: "Visualiza trayectorias, tiempos de permanencia y las zonas donde se concentran los visitantes. Los mapas de calor revelan cuellos de botella, rincones muertos y el recorrido real que hace el público por el espacio." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.share, title: "Datos para operaciones y justificación", desc: "Planifica limpieza, personal y energía según la ocupación real y documenta cada decisión con cifras. Cuando el ayuntamiento, el patronato o un financiador pidan cuentas, justificas el uso del espacio y el impacto de un evento con datos objetivos." },
    { span: 6, svg: IC.wifi, title: "Captación y comunicación por WiFi", desc: "Ofrece WiFi al visitante con un portal cautivo que informa, orienta y abre un canal de comunicación directo. Aprovechas cada conexión para difundir actividades, avisos y servicios sin recurrir a datos personales sensibles." },
    { span: 6, svg: IC.clock, title: "Gestión de colas y aseos", desc: "Controla las esperas en accesos, taquillas y puntos de información, y organiza la limpieza de aseos según el uso real. Reduces los tiempos de espera en las horas punta y mantienes las instalaciones a punto cuando más se usan." },
  ],
  casesTitle: "Espacios públicos que ya miden lo que gestionan",
  casesSub: "Centros culturales y grandes redes que dirigen con Flame el aforo, los flujos y el uso real.",
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
  heroSub: "Analítica de espacios físicos para tu red de oficinas: mide la afluencia real de cada sucursal, dimensiona cajeros y gestores por franja y reduce los tiempos de espera. Todo sobre las cámaras que ya tienes instaladas, sin biometría y con pleno cumplimiento del RGPD.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu red de oficinas.",
  painPointsIntro: "Gestionar una red de sucursales sin medir lo que ocurre dentro de cada oficina obliga a decidir por intuición. Estos son los puntos que más lastran la experiencia del cliente y la eficiencia de tu red.",
  painPoints: [
    { svg: IC.clock, title: "Colas y esperas en la sucursal", desc: "Los clientes esperan en caja, en atención personal o para ver a un gestor sin que sepas cuándo ni por qué se forman los picos. La espera daña la experiencia y empuja al cliente hacia el canal digital." },
    { svg: IC.staff, title: "Dotación de personal a ciegas", desc: "Asignas cajeros y gestores por costumbre o por históricos desactualizados. Unos días sobra plantilla en horas valle y otros falta justo en el pico de afluencia." },
    { svg: IC.bars, title: "No sabes cómo se usa cada oficina", desc: "Decides horarios, cierres o reformas de la red sin una medición objetiva del tráfico real de cada sucursal. Faltan datos para justificar la inversión o el ajuste ante dirección." },
    { svg: IC.shield, title: "Privacidad y cumplimiento bajo la lupa", desc: "El sector financiero no admite soluciones que identifiquen a las personas. Cualquier analítica de oficina tiene que respetar el RGPD y descartar la biometría desde el diseño." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu sucursal",
  capsSub: "Ocho capacidades de Flame adaptadas a la operativa de una sucursal bancaria y de toda tu red, sobre el CCTV que ya tienes instalado y sin identificar a ninguna persona.",
  capabilities: [
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.staff, title: "Colas y dotación de personal por franja", desc: "La capacidad clave para la banca de oficina: cruza la afluencia real por franja horaria con tu plantilla para dimensionar cajeros y gestores en cada momento del día. Refuerza los picos, alivia las horas valle y reduce los tiempos de espera sin sobredimensionar el equipo." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de personas", desc: "Mide entradas y salidas de cada sucursal y el tráfico por zonas a lo largo del día. Identifica las franjas de mayor y menor afluencia para planificar la operativa de la oficina con datos, no con impresiones." },
    { span: 6, svg: IC.cart, title: "Conversión y uso de servicios", desc: "Descubre qué proporción de los que entran acaba en atención personal, con un gestor o en el cajero automático. Entiende qué servicios concentran la demanda real de cada oficina para redistribuir recursos." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Visualiza con mapas de calor dónde se concentran los clientes: espera, autoservicio y atención personal. Detecta cuellos de botella y zonas infrautilizadas para rediseñar el layout de la sucursal." },
    { span: 5, svg: IC.activity, title: "Ocupación y aforo en tiempo real", desc: "Conoce cuánta gente hay en cada zona de la oficina en cada momento. Controla el aforo de la sala de espera y de atención personal y anticipa la saturación antes de que el cliente la sufra." },
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Home_traffic.webp", svg: IC.bars, title: "Datos para operaciones y red", desc: "Compara el rendimiento de todas tus sucursales con un mismo criterio objetivo. Justifica horarios, dotación, cierres o reformas de la red con la medición real de uso de cada oficina, no con estimaciones." },
    { span: 6, svg: IC.clock, title: "Gestión de colas en tiempo real", desc: "Monitoriza al momento la longitud de las colas en caja, atención al cliente y gestor. Recibe avisos cuando la espera supera tu umbral para reaccionar en el acto, no cuando el cliente ya se ha marchado." },
    { span: 6, svg: IC.wifi, title: "Captación y comunicación por WiFi", desc: "Ofrece WiFi a los clientes mediante un portal cautivo y convierte la conexión en un canal de comunicación. Informa sobre productos y servicios mientras el cliente espera o es atendido en la oficina." },
  ],
  casesTitle: "Redes que ya deciden con datos, no con intuición",
  casesSub: "Grandes redes distribuidas que miden con Flame la afluencia, las colas y el uso real de cada punto.",
  caseStudies: pickCases(["repsol", "multiopticas", "afflelou"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [1, 5, 7], faqs: [],
  ctaStripBold: "Menos colas, mejor dotación, red bajo control.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

// ==================== TRANSPORTE Y AEROPUERTOS ====================
export const TRANSPORTE_CFG: SectorConfig = {
  metaTitle: "Transporte y aeropuertos · Flame Analytics", metaDescription: "Flujos de pasajeros, aforo y colas en aeropuertos y estaciones.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png", heroBgPosition: "center center",
  heroTitle: "Inteligencia de datos para transporte y aeropuertos",
  heroSub: "Analítica de espacios físicos con inteligencia artificial para aeropuertos, estaciones y terminales. Mide el flujo de pasajeros, anticipa aglomeraciones y optimiza cada zona en tiempo real, sin biometría y con pleno cumplimiento del RGPD, sobre las cámaras que ya tienes.",
  heroBullets: HERO_BULLETS,
  sections: [],
  painPointsTitle: "El día a día de tu terminal.",
  painPointsIntro: "Cada hora punta pone a prueba tu operación: miles de pasajeros que se concentran en los mismos puntos, colas que crecen sin aviso y decisiones que se toman sin datos. Estos son los problemas que Flame resuelve con medición en tiempo real.",
  painPoints: [
    { svg: IC.clock, title: "Colas eternas en los controles de seguridad", desc: "Las esperas en filtros, facturación y embarque disparan las quejas y el riesgo de vuelos perdidos. Sin una medición objetiva del tiempo real de espera, no puedes abrir posiciones a tiempo ni dimensionar el personal." },
    { svg: IC.activity, title: "El pico de pasajeros te pilla desprevenido", desc: "Las aglomeraciones se forman antes de que puedas reaccionar. Gestionar los accesos y los turnos por intuición deja andenes y salas saturados justo cuando más control necesitas." },
    { svg: IC.bars, title: "Zonas comerciales sin datos de tráfico real", desc: "Sin conocer cuántas personas pasan por cada local, restaurante o parking, es imposible optimizar la oferta ni justificar las rentas ante los operadores. El potencial comercial del recinto queda infravalorado." },
    { svg: IC.shield, title: "Gestionas la seguridad a ciegas", desc: "En un espacio de alto volumen y alta sensibilidad, no ver el aforo por zona en tiempo real es un riesgo operativo. Actúas cuando la saturación ya es evidente, no antes." },
  ],
  capsTitle: "Todo lo que Flame mide y activa en tu terminal",
  capsSub: "Ocho capacidades de Flame adaptadas a la realidad de un aeropuerto, una estación o un intercambiador de transporte, todas sobre tu infraestructura de cámaras actual y sin identificar a nadie.",
  capabilities: [
    { span: 7, featured: true, img: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png", svg: IC.shield, title: "Flujos peatonales, gestión de multitudes y seguridad", desc: "La capacidad clave para el sector: anticipa las aglomeraciones antes de que se formen y planifica accesos, personal y refuerzos en cada pico. Combina el aforo por zona con la detección de flujos para garantizar la seguridad y la operativa en tiempo real, sin biometría y con cumplimiento total del RGPD." },
    { span: 5, svg: IC.people, title: "Afluencia y flujo de pasajeros", desc: "Contabiliza entradas y salidas con precisión y desglosa el tráfico por terminales, accesos y andenes. Conoce cuántos pasajeros circulan por cada punto y a qué hora, para planificar la operación con datos y no con estimaciones." },
    { span: 6, svg: IC.activity, title: "Aforo y ocupación en tiempo real", desc: "Mide la ocupación de cada zona en directo, desde salas de espera hasta vestíbulos y andenes. Recibe alertas automáticas cuando una zona se acerca a su límite, para actuar antes de que se convierta en un problema." },
    { span: 6, svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Visualiza los recorridos de los pasajeros por la terminal e identifica los cuellos de botella que ralentizan el tránsito. Mide los tiempos de desplazamiento entre puntos clave para rediseñar la señalética y los flujos de circulación." },
    { span: 5, svg: IC.bars, title: "Uso de zonas y servicios", desc: "Analiza el rendimiento real de salas VIP, comercios, restauración y parking según el tráfico que reciben. Descubre qué espacios funcionan y cuáles están infrautilizados para tomar decisiones sobre la explotación del recinto." },
    { span: 7, featured: true, img: "/sectors/centros-afluencia.jpg", svg: IC.clock, title: "Gestión de colas en puntos de proceso", desc: "Mide el tiempo real de espera en controles de seguridad, facturación, taquillas y embarque para abrir posiciones antes de que la cola se dispare. Controla además el uso de los aseos y programa la limpieza según el tráfico real, no por horario fijo." },
    { span: 6, svg: IC.wifi, title: "Captación y comunicación por WiFi", desc: "Ofrece conexión a los viajeros mediante un portal cautivo y convierte ese punto de contacto en un canal de comunicación. Informa de incidencias, retrasos o servicios del recinto mientras obtienes datos agregados de uso." },
    { span: 6, svg: IC.share, title: "Datos para operaciones e ingresos comerciales", desc: "Planifica limpieza, personal y consumo energético según el uso real de cada espacio y elimina el sobrecoste de dimensionar a ojo. Valora los locales comerciales del recinto por el tráfico que reciben para negociar y justificar las rentas con datos objetivos." },
  ],
  casesTitle: "Grandes recintos que ya miden lo que gestionan",
  casesSub: "Redes distribuidas y espacios de alto flujo que dirigen con Flame la afluencia, las colas y el uso real.",
  caseStudies: pickCases(["repsol", "caixaforum", "multiopticas"]),
  productsTitle: PRODUCTS_TITLE, productsTitleHl: PRODUCTS_TITLE_HL, productsSub: PRODUCTS_SUB, productsBullets: PRODUCTS_BULLETS, products: PRODUCTS,
  testimonialsIdx: [0, 4, 8], faqs: [],
  ctaStripBold: "Flujos, aforo y colas de tu terminal, en tiempo real.", ctaStripLight: "Demo personalizada en 20 minutos.",
};

export const PREVIEW_SECTORS: Array<{ slug: string; label: string; cfg: SectorConfig; enHref: string }> = [
  { slug: "retail", label: "Retail", cfg: RETAIL_CFG, enHref: "/en/solution-for-retail-sector/" },
  { slug: "supermercados", label: "Supermercados", cfg: SUPERMERCADOS_CFG, enHref: "/en/supermarkets/" },
  { slug: "hoteles", label: "Hoteles", cfg: HOTELES_CFG, enHref: "/en/hospitality/" },
  { slug: "espacios-publicos", label: "Espacios públicos", cfg: ESPACIOS_CFG, enHref: "/en/public-venues/" },
  { slug: "bancos", label: "Bancos y sucursales", cfg: BANCOS_CFG, enHref: "/en/" },
  { slug: "transporte", label: "Transporte y aeropuertos", cfg: TRANSPORTE_CFG, enHref: "/en/" },
];
