import type { HomeRestyleConfig } from "@/components/templates/HomeRestyleTemplate";

export const HOME_CFG_ES: HomeRestyleConfig = {
  heroSupertitle: "Potenciamos los",
  heroSupertitleHl: "espacios físicos",
  heroHeadline: "Transformando el video en información en tiempo real para tu negocio",
  heroCta: "Solicita una demo",
  videoMp4: "/wp-content/uploads/2026/01/Demo-web-HIGH-720.mp4",
  videoPoster: "/wp-content/uploads/2026/01/Demo-web-poster.webp",

  stepsTitle: "Analítica de vídeo con IA sin fricciones para",
  stepsTitleHl: "Retail",
  stepsSub: "Tres pasos para pasar de tus cámaras a decisiones, sin datos biométricos.",
  steps: [
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-141-rhd6b8zyg2yz9z5cada9knj2k0hyuzcw7d9y04gp5c.png",   bgImg: "/wp-content/uploads/elementor/thumbs/Group-142-rhd6b8zwk3vn796mm7avcxzmptvchjbwa25liv9x4y.png",   title: "Conecta tus cámaras", desc: "Flame funciona con las cámaras y los contadores de personas que ya tienes. Sin hardware adicional ni instalaciones complejas." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-73-1-1-rhd6b9xsmx09ll3z4vow55aj5edc2ogmjhxfhefas6.png", bgImg: "/wp-content/uploads/elementor/thumbs/Group-143-rhd6b9xqqxwxiv59gpphxfr3b7qpp8fmm6t3058iyq.png",   title: "Dibuja tus zonas",    desc: "Marca zonas y líneas de conteo y define tus reglas de negocio en una interfaz visual, sin programar." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-81-rhd6bbthmigrtifyvbli2mbmnwzs70acuws2i6bmva.png",    bgImg: "/wp-content/uploads/elementor/thumbs/Group-144-rhd6bbtf4lzi632j5qir2fa0hzhg4mn3ag41yp5qma.png",   title: "Mide lo que importa",    desc: "Tráfico, conversión, recorridos y ocupación en tiempo real, en un solo panel para todos tus espacios." },
  ],

  // home v2 · proceso — sectores en castellano (la versión ES rotaba con los nombres en inglés del WP antiguo)
  stepsTitleRotate: ["Retail", "Centros comerciales", "Hoteles", "Espacios públicos"],
  // PROVISIONAL (frase de la maqueta proceso4, por validar)
  stepsEmber: "Y con Ember AI, pregunta a tus datos lo que quieras y ten la respuesta al momento.",

  // home v2 · diferenciadores. PROVISIONALES: fragmentos literales de las ventajas actuales, a sustituir por los definitivos.
  diffTitle: "Lo que hace diferente a <span style=\"color:var(--color-accent);font-weight:500\">Flame</span>",
  diffSub: "Analítica de vídeo con IA que respeta la privacidad, funciona con lo que ya tienes y crece contigo.",
  diff: [
    { icon: "plug", title: "Plug&play.", titleHl: "", body: "Funciona con tus cámaras CCTV y contadores de personas actuales, sin hardware adicional. En menos de una semana ya tienes analítica con IA." },
    { icon: "privacy", title: "Privacidad por diseño.", titleHl: "", body: "Flame procesa los datos de forma anónima, sin datos biométricos ni almacenamiento de imágenes, y cumple el RGPD." },
    { icon: "scale", title: "De un local a miles.", titleHl: "", body: "Empieza en un solo espacio y crece hasta miles, con todas las ubicaciones gestionadas a distancia desde una única plataforma en la nube." },
    { icon: "target", title: "Precisión en cualquier entorno.", titleHl: "", body: "Análisis precisos y coherentes en cada espacio, con cada cámara y sensor supervisados y alertas si algo falla." },
  ],

  // home v2 · Ember AI como producto. PROVISIONALES: los textos actuales del bloque, con el nombre «Ember AI».
  ember: {
    eyebrow: "Valor diferencial",
    title: "No solo datos.",
    titleHl: "Respuestas.",
    sub: "Flame Insights convierte la afluencia, la conversión y el comportamiento de tus espacios en informes con conclusiones claras. Y con Ember AI, el asistente de IA de Flame, le preguntas al informe en lenguaje natural y tienes la respuesta al momento.",
    bullets: ["Informes con conclusiones, no solo gráficas", "Pregunta a tus datos en lenguaje natural", "Sin biometría, como todo Flame"],
    cta: "Conoce Flame Insights y Ember AI",
    chatName: "Ember AI · Asistente IA",
    chatStatus: "Analizando tu informe",
  },

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
    { iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png", name: "Traffic",          desc: "Mide el tráfico dentro y fuera del espacio, monitorea la ocupación en tiempo real y mide la conversión, todo desde una plataforma única y completa.", href: "/es/analitica-trafico/", cta: "Ver más" },
    { iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",                                       name: "Customer Journey", desc: "Analiza los recorridos e interacciones de los clientes para comprender su comportamiento en la tienda y optimizar la experiencia en cada punto de contacto.", href: "/es/recorrido-del-cliente/",  cta: "Ver más" },
    { iconImg: "/wp-content/uploads/2026/01/Group-1.png",                                                     name: "Connect",          desc: "Recopila datos de los visitantes a través del WiFi para invitados y lanza campañas de marketing personalizadas según su ubicación, perfil y comportamiento.",                                href: "/es/connect/",            cta: "Ver más" },
  ],

  advantageTitle: 'Las ventajas <span style="color:var(--color-accent);font-weight:500">de Flame</span>',
  advantageSub: "Analítica avanzada de vídeo con IA, diseñada para ofrecer privacidad, precisión y rendimiento.",

  privacyTitle: "Privacidad ante todo.",
  privacyTitleHl: "Rendimiento orientado a resultados.",
  privacyBody: "Nuestra tecnología de analítica de vídeo con IA transforma su infraestructura CCTV existente en información accionable en tiempo real, sin utilizar datos biométricos. Diseñada para garantizar la privacidad, la escalabilidad y la eficiencia del hardware, reduce los costes de implementación, asegura un alto rendimiento y el pleno cumplimiento de la normativa de protección de datos.",
  privacyImg: "/wp-content/uploads/2026/01/Home_traffic.webp",
  privacyImgAlt: "Dashboard Flame de tráfico con privacidad por diseño",
  privacyCta: "Leer más",
  privacyHref: "/es/hypersensor/",

  reportsTitle: "Informes avanzados,",
  reportsTitleHl: "decisiones más inteligentes.",
  reportsBody: "Convierte los datos en decisiones con paneles personalizables e informes dinámicos. Visualiza métricas clave, mapas de calor y tendencias en tiempo real. Utiliza herramientas de arrastrar y soltar o plantillas prediseñadas, automatiza los informes y realiza el seguimiento de más de 200 KPI adaptados a tu negocio para tomar decisiones más rápidas y mantener un control total en todas las ubicaciones.",
  reportsImg: "/wp-content/uploads/2026/01/Home_Dashboard.png",
  reportsImgAlt: "Dashboard de Flame con métricas avanzadas",
  reportsCta: "Leer más",
  reportsHref: "/es/hypersensor/",

  integrationTitle: "Integración sin fricciones.",
  integrationTitleHl: "Diseño agnóstico.",
  integrationBody: "Flame se integra de forma fluida con los principales sistemas de CCTV y de conteo de personas, y se conecta fácilmente con tu ecosistema de datos moderno, incluidas plataformas en la nube, data lakes y entornos de analítica empresarial. Reduce la fricción, acorta los tiempos de implementación y maximiza el impacto en cada ubicación.",
  integrationImg: "/wp-content/uploads/2026/01/Mask-group3.webp",
  integrationImgAlt: "Diagrama de integraciones de Flame con stack TPV / ERP / BI",
  integrationCta: "Leer más",
  integrationHref: "/es/hypersensor/",
  privacySummary: "Convierte tus cámaras CCTV actuales en información en tiempo real, sin datos biométricos. Escalable, con menos coste de implantación y pleno cumplimiento de la normativa de protección de datos.",
  reportsSummary: "Paneles personalizables e informes dinámicos con métricas, mapas de calor y tendencias en tiempo real. Más de 200 KPI adaptados a tu negocio e informes automatizados en todas tus ubicaciones.",
  integrationSummary: "Se integra con los principales sistemas de CCTV y conteo de personas, y con tu ecosistema de datos: nube, data lakes y analítica empresarial. Implantación más rápida en cada ubicación.",

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
    { icon: "users",    title: "Casos de éxito", href: "/es/categoria/casos-de-exito/",  img: "/wp-content/uploads/2026/01/Whitepapers-5.png" },
    { icon: "reports",  title: "Blog",           href: "/es/categoria/blog/",             img: "/wp-content/uploads/2026/01/Noticias-2.png" },
    { icon: "play",     title: "Webinars",       href: "/es/categoria/webinars/",  img: "/wp-content/uploads/2026/01/Whitepapers-7.png" },
    { icon: "calendar", title: "Entrevistas",    href: "/es/categoria/entrevistas/",      img: "/wp-content/uploads/2026/01/Whitepapers-6.png" },
  ],
};

export const HOME_CFG_EN: HomeRestyleConfig = {
  heroSupertitle: "Empowering",
  heroSupertitleHl: "Physical Spaces",
  heroHeadline: "Transforming video into real-time insights for your business",
  heroCta: "Request a demo",
  videoMp4: "/wp-content/uploads/2026/01/Demo-web-HIGH-720.mp4",
  videoPoster: "/wp-content/uploads/2026/01/Demo-web-poster.webp",

  stepsTitle: "Seamless AI Video Analytics for",
  stepsTitleHl: "Retail",
  stepsSub: "Three steps from your cameras to better decisions, with no biometric data.",
  steps: [
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-141-rhd6b8zyg2yz9z5cada9knj2k0hyuzcw7d9y04gp5c.png",   bgImg: "/wp-content/uploads/elementor/thumbs/Group-142-rhd6b8zwk3vn796mm7avcxzmptvchjbwa25liv9x4y.png",   title: "Connect your cameras",   desc: "Flame works with the cameras and people counters you already have. No extra hardware, no complex installs." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-73-1-1-rhd6b9xsmx09ll3z4vow55aj5edc2ogmjhxfhefas6.png", bgImg: "/wp-content/uploads/elementor/thumbs/Group-143-rhd6b9xqqxwxiv59gpphxfr3b7qpp8fmm6t3058iyq.png",   title: "Draw your zones", desc: "Set zones, counting lines and business rules in a visual interface, with no coding." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-81-rhd6bbthmigrtifyvbli2mbmnwzs70acuws2i6bmva.png",    bgImg: "/wp-content/uploads/elementor/thumbs/Group-144-rhd6bbtf4lzi632j5qir2fa0hzhg4mn3ag41yp5qma.png",   title: "Measure what matters", desc: "Footfall, conversion, journeys and occupancy in real time, in one dashboard for all your spaces." },
  ],

  // home v2 · proceso
  stepsTitleRotate: ["Retail", "Shopping Malls", "Hospitality", "Public Venues"],
  // PROVISIONAL (traducción de la frase de la maqueta proceso4, por validar)
  stepsEmber: "And with Ember AI, ask your data anything and get the answer instantly.",

  // home v2 · differentiators. PROVISIONAL: literal fragments of the current advantages.
  diffTitle: "What sets <span style=\"color:var(--color-accent);font-weight:500\">Flame apart</span>",
  diffSub: "AI video analytics that protects privacy, runs on what you already have and grows with you.",
  diff: [
    { icon: "plug", title: "Plug&play.", titleHl: "", body: "Works with your existing CCTV cameras and people counters, with no extra hardware. Get AI analytics up and running in under a week." },
    { icon: "privacy", title: "Privacy by design.", titleHl: "", body: "Flame processes data anonymously, with no biometric data and no stored images, in full GDPR compliance." },
    { icon: "scale", title: "From one site to thousands.", titleHl: "", body: "Start with a single space and scale to thousands, managing every location remotely from one cloud platform." },
    { icon: "target", title: "Accuracy in any environment.", titleHl: "", body: "Precise, consistent analytics in every space, with each camera and sensor monitored and alerts if anything goes wrong." },
  ],

  // home v2 · Ember AI as a product. PROVISIONAL: current copy, with the name "Ember AI".
  ember: {
    eyebrow: "What sets us apart",
    title: "Not just data.",
    titleHl: "Answers.",
    sub: "Flame Insights turns the footfall, conversion and behaviour of your spaces into reports with clear conclusions. And with Ember AI, Flame's AI assistant, you ask the report in plain language and get the answer instantly.",
    bullets: ["Reports with conclusions, not just charts", "Ask your data in plain language", "No biometrics, like everything Flame"],
    cta: "Discover Flame Insights and Ember AI",
    chatName: "Ember AI · AI assistant",
    chatStatus: "Analysing your report",
  },

  productsTitle: "Data driven for",
  productsTitleHl: "smart spaces",
  productsSub: "The AI analytics platform for physical spaces — powering decision-making and maximising overall venue performance:",
  productsBullets: [
    "Measure and improve venue performance",
    "Understand customer behaviour",
    "Connect with your visitors",
  ],
  ctaStripBold: "20 minutes to understand what is happening in your space.",
  ctaStripLight: "Personalised demo with your data and your use case.",
  products: [
    { iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png", name: "Traffic",          desc: "Measure inside and outside traffic, monitor occupancy in real time and compute conversion, all from a single, complete platform.",                  href: "/en/traffic-insights/",  cta: "Read more" },
    { iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",                                       name: "Customer Journey", desc: "Analyze customer journeys and interactions to understand in-store behavior and optimize the experience at every touchpoint.",                         href: "/en/customer-journey/",  cta: "Read more" },
    { iconImg: "/wp-content/uploads/2026/01/Group-1.png",                                                     name: "Connect",          desc: "Capture visitor data through guest WiFi and launch personalized marketing campaigns based on location, profile and behavior.",                          href: "/en/connect/",            cta: "Read more" },
  ],

  advantageTitle: '<span style="color:var(--color-accent);font-weight:500">The Flame</span> advantage',
  advantageSub: "Advanced AI video analytics engineered for privacy, accuracy and performance.",

  privacyTitle: "Privacy-first.",
  privacyTitleHl: "Performance-driven.",
  privacyBody: "Our proprietary AI video technology turns your existing CCTV infrastructure into real-time, actionable insights — without using biometrics. Built for privacy, scalability, and hardware efficiency, it reduces deployment costs while ensuring high performance and full data protection compliance.",
  privacyImg: "/wp-content/uploads/2026/01/Home_traffic.webp",
  privacyImgAlt: "Flame traffic dashboard with privacy by design",
  privacyCta: "Read more",
  privacyHref: "/en/hypersensor/",

  reportsTitle: "Powerful reporting,",
  reportsTitleHl: "smarter decisions.",
  reportsBody: "Turn data into decisions with customizable dashboards and dynamic reports. Visualize key metrics, heatmaps and trends in real time. Use drag-and-drop tools or pre-built templates, automate reporting, and track over 200 KPIs tailored to your business for faster decisions and full control across locations.",
  reportsImg: "/wp-content/uploads/2026/01/Home_Dashboard.png",
  reportsImgAlt: "Flame dashboard with advanced metrics",
  reportsCta: "Read more",
  reportsHref: "/en/hypersensor/",

  integrationTitle: "Seamless integration.",
  integrationTitleHl: "Agnostic by design.",
  integrationBody: "Flame integrates seamlessly with leading CCTV and people-counting systems, and connects effortlessly to your modern data ecosystem including cloud platforms, data lakes, and enterprise analytics environments. Minimize friction, reduce deployment time, and maximize impact across every location.",
  integrationImg: "/wp-content/uploads/2026/01/Mask-group3.webp",
  integrationImgAlt: "Diagram of Flame integrations with POS / ERP / BI stack",
  integrationCta: "Read more",
  integrationHref: "/en/hypersensor/",
  privacySummary: "Turns your existing CCTV infrastructure into real-time, actionable insights, without biometrics. Scalable, with lower deployment costs and full data protection compliance.",
  reportsSummary: "Customizable dashboards and dynamic reports with key metrics, heatmaps and real-time trends. Over 200 KPIs tailored to your business and automated reporting across locations.",
  integrationSummary: "Integrates with leading CCTV and people-counting systems and with your data ecosystem: cloud platforms, data lakes and enterprise analytics. Faster deployment at every location.",

  testimonialsTitle: "Trusted by the",
  testimonialsTitleHl: "best brands",
  testimonialsIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],

  industriesTitle: "Solutions for any",
  industriesTitleHl: "Industry",
  industriesSub: "Flame Analytics is an advanced smart analytics platform designed to support a wide range of industries and sectors.",

  communityTitle: "Join the",
  communityTitleHl: "Flame community",
  communitySub: "Where content becomes value for the community: stories, ideas and learnings with impact.",
  communityCards: [
    { icon: "users",    title: "Case studies", href: "/en/category/case-studies/",     img: "/wp-content/uploads/2026/01/Whitepapers-5.png" },
    { icon: "reports",  title: "Blog",         href: "/en/category/blog/",              img: "/wp-content/uploads/2026/01/Noticias-2.png" },
    { icon: "play",     title: "Webinars",     href: "/en/category/webinars/",          img: "/wp-content/uploads/2026/01/Whitepapers-7.png" },
    { icon: "calendar", title: "Interviews",   href: "/en/category/interviews/",        img: "/wp-content/uploads/2026/01/Whitepapers-6.png" },
  ],
};
