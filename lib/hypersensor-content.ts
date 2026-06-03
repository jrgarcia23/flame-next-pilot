import { getFaqs } from "@/lib/live-faqs";
/**
 * Hypersensor page content (ES + EN).
 * One-off page — content kept here so both pages stay perfectly in sync
 * without parametrising a full template like UseCase/Sector.
 */

export type HsBenefit = { icon: string; title: string; desc: string };
export type HsFeature = {
  title: string;
  titleHl?: string;
  body: string;
  img: string;
  imgAlt: string;
  imgLeft: boolean; // true = image on left + text on right
};
export type HsProduct = { iconImg: string; name: string; desc: string; href: string; cta: string };
export type HsFAQ = { q: string; a: string };

export type HypersensorContent = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    bgImage: string;
  };
  benefitsEyebrow: string;
  benefitsTitle: string;
  benefitsTitleHl: string;
  benefitsSub: string;
  benefits: HsBenefit[];
  featuresIntro: string;
  features: HsFeature[];
  productsTitle: string;
  productsTitleHl: string;
  productsSub: string;
  productsBullets: string[];
  products: HsProduct[];
  ctaStripBold: string;
  ctaStripLight: string;
  faqTitle: string;
  faqTitleHl: string;
  faqs: HsFAQ[];
};

export const HS_ES: HypersensorContent = {
  meta: {
    title: "Flame Hypersensor · Analítica de vídeo con IA avanzada · Flame Analytics",
    description:
      "Convierte tus cámaras CCTV en herramientas de analítica avanzada. Flame Hypersensor mide tráfico, recorridos, conversión y ocupación con IA — sin biometría, 100 % RGPD.",
  },
  hero: {
    eyebrow: "Análisis de vídeo con IA avanzada",
    title: "Hypersensor",
    sub:
      "Donde el vídeo con IA avanzada se une a la privacidad y la precisión. Flame transforma los datos de vídeo y sensores en inteligencia en tiempo real: escalable, precisa y diseñada para cada espacio.",
    cta: "Solicita una demo",
    bgImage: "/wp-content/uploads/2026/01/Characteristics-1.png",
  },
  benefitsEyebrow: "",
  benefitsTitle: "",
  benefitsTitleHl: "",
  benefitsSub: "",
  benefits: [
    {
      icon: "integration",
      title: "Agnóstico",
      desc:
        "Flame se conecta con tu hardware y fuentes de datos existentes — CCTV, contadores de personas, WiFi o TPV — garantizando una compatibilidad total y una integración sin fricciones.",
    },
    {
      icon: "grid",
      title: "Escalable",
      desc:
        "Desde un solo sitio hasta miles, Flame escala sin esfuerzo. Gestiona cada ubicación a distancia a través de una única plataforma basada en la nube.",
    },
    {
      icon: "trending",
      title: "Preciso",
      desc:
        "La IA patentada proporciona análisis precisos y coherentes, así como datos listos para la toma de decisiones en todos los entornos.",
    },
    {
      icon: "privacy",
      title: "Privacidad",
      desc:
        "Flame procesa los datos de forma anónima y sin datos biométricos, garantizando el cumplimiento del RGPD y la total privacidad de los visitantes.",
    },
  ],
  featuresIntro: "Cómo trabaja Hypersensor por dentro",
  features: [
    {
      title: "Reconexión de cero biometría",
      titleHl: "entre cámaras",
      body:
        "Flame conecta de forma anónima las detecciones de varias cámaras para proporcionar una visión unificada del movimiento y el flujo, sin datos biométricos, identificadores personales ni almacenamiento de imágenes. Esta inteligencia a prueba de privacidad revela cómo navegan los visitantes por los espacios, ofreciendo una visión más profunda de los patrones de tráfico y comportamiento.",
      img: "/wp-content/uploads/2026/01/zero_biometrics-1.png",
      imgAlt: "Reconexión entre cámaras sin biometría",
      imgLeft: true,
    },
    {
      title: "Activación e integración",
      titleHl: "de datos",
      body:
        "Integra fácilmente Flame con sistemas externos como CRM, CMS y Data Lakes para enriquecer tu ecosistema de datos. Activa la información mediante triggers y automatizaciones en tiempo real que adapten el contenido, lancen campañas o alerten al personal en función del comportamiento de los visitantes. Rompe los silos de datos y crea conexiones sin fisuras entre los puntos de contacto físicos y digitales para impulsar acciones más inteligentes y rápidas.",
      img: "/wp-content/uploads/2026/01/Data_activation_EN.png",
      imgAlt: "Activación e integración de datos",
      imgLeft: false,
    },
    {
      title: "Gestión de dispositivos",
      titleHl: "y calidad de los datos",
      body:
        "Garantiza la calidad del servicio, la precisión de los datos y la disponibilidad del sistema mediante la gestión centralizada de dispositivos. Supervisa el estado de todos los sensores y cámaras conectados en tiempo real, detecta anomalías y recibe alertas de posibles problemas. Mantén altos estándares operativos en todas las ubicaciones con herramientas diseñadas para garantizar la precisión, el tiempo de actividad y la escalabilidad sin fisuras.",
      img: "/wp-content/uploads/2026/01/device_management-1.png",
      imgAlt: "Gestión centralizada de dispositivos",
      imgLeft: true,
    },
    {
      title: "Capacidades",
      titleHl: "de nivel empresarial",
      body:
        "Construido con estándares de seguridad y cumplimiento de grado empresarial. La compatibilidad con el inicio de sesión único (SSO) permite un acceso seguro y escalable de los usuarios. Cumple totalmente la normativa RGPD para garantizar la privacidad de los datos y está alineado con las mejores prácticas ISO 27001 para la gestión de la seguridad de la información, proporcionando tranquilidad incluso a los entornos corporativos más exigentes.",
      img: "/wp-content/uploads/2026/01/GDPR5.png",
      imgAlt: "Capacidades de nivel empresarial — RGPD, SSO, ISO 27001",
      imgLeft: false,
    },
  ],
  productsTitle: "Soluciones basadas en datos",
  productsTitleHl: "para espacios inteligentes",
  productsSub:
    "La plataforma de analítica con IA para espacios físicos que potencia la toma de decisiones y maximiza el rendimiento general del lugar:",
  productsBullets: [
    "Mide y mejora el rendimiento del espacio",
    "Comprende el comportamiento de los clientes",
    "Conecta con tus visitantes",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc:
        "Mide el tráfico dentro y fuera del espacio, monitorea la ocupación en tiempo real y mide la conversión, todo desde una plataforma única y completa.",
      href: "/es/analitica-trafico/",
      cta: "Ver más",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc:
        "Analiza los recorridos e interacciones de los clientes para comprender su comportamiento en la tienda y optimizar la experiencia en cada punto de contacto.",
      href: "/es/customer-journey/",
      cta: "Ver más",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/Group-1.png",
      name: "Connect",
      desc:
        "Recopila datos de los visitantes a través del WiFi para invitados y lanza campañas de marketing personalizadas según su ubicación, perfil y comportamiento.",
      href: "/es/connect/",
      cta: "Ver más",
    },
  ],
  ctaStripBold: "Tus cámaras ya están instaladas.",
  ctaStripLight: "Conviértelas en analítica avanzada con IA en menos de una semana.",
  faqTitle: "Preguntas",
  faqTitleHl: "frecuentes",
  faqs: getFaqs("hypersensor", "es"),
};

export const HS_EN: HypersensorContent = {
  meta: {
    title: "Flame Hypersensor · Advanced AI video analytics · Flame Analytics",
    description:
      "Turn your existing CCTV cameras into powerful analytics tools. Flame Hypersensor uses AI to measure foot traffic, customer journeys, conversion rates and occupancy — no biometrics, full GDPR compliance.",
  },
  hero: {
    eyebrow: "Advanced AI Video Analytics",
    title: "Hypersensor",
    sub:
      "Where advanced AI Video meets privacy and precision. Flame transforms video and sensor data into real-time intelligence — scalable, accurate and designed for every space.",
    cta: "Request a Demo",
    bgImage: "/wp-content/uploads/2026/01/Characteristics-1.png",
  },
  benefitsEyebrow: "",
  benefitsTitle: "",
  benefitsTitleHl: "",
  benefitsSub: "",
  benefits: [
    {
      icon: "integration",
      title: "Agnostic",
      desc:
        "Flame connects with your existing hardware and data sources — CCTV, people counters, WiFi or POS — ensuring full compatibility and seamless integration.",
    },
    {
      icon: "grid",
      title: "Scalable",
      desc:
        "From one site to thousands, Flame scales effortlessly. Manage every location remotely through a single cloud-based platform.",
    },
    {
      icon: "trending",
      title: "Accurate",
      desc:
        "Proprietary AI delivers precise, consistent analytics and decision-ready data across all environments.",
    },
    {
      icon: "privacy",
      title: "Privacy by design",
      desc:
        "Flame processes data anonymously and without biometrics, ensuring GDPR compliance and total visitor privacy.",
    },
  ],
  featuresIntro: "How Hypersensor works inside",
  features: [
    {
      title: "Zero Biometrics",
      titleHl: "Cross-Camera Reconnection",
      body:
        "Flame anonymously connects detections across multiple cameras to provide a unified view of movement and flow — without biometrics, personal identifiers or image storage. This privacy-safe intelligence reveals how visitors navigate spaces, offering deeper insight into traffic patterns and behavior.",
      img: "/wp-content/uploads/2026/01/zero_biometrics-1.png",
      imgAlt: "Zero biometrics cross-camera reconnection",
      imgLeft: true,
    },
    {
      title: "Data activation",
      titleHl: "& integration",
      body:
        "Easily integrate Flame with external systems such as CRMs, CMSs and Data Lakes to enrich your data ecosystem. Activate insights through real-time triggers and automations that adapt content, launch campaigns, or alert staff based on visitor behavior. Break data silos and create seamless connections between physical and digital touchpoints to drive smarter, faster actions.",
      img: "/wp-content/uploads/2026/01/Data_activation_EN.png",
      imgAlt: "Data activation and integration",
      imgLeft: false,
    },
    {
      title: "Device management",
      titleHl: "& data quality",
      body:
        "Ensure service quality, data accuracy, and system availability through centralized device management. Monitor the status of all connected sensors and cameras in real time, detect anomalies, and receive alerts for potential issues. Maintain high operational standards across locations with tools designed to guarantee precision, uptime, and seamless scalability.",
      img: "/wp-content/uploads/2026/01/device_management-1.png",
      imgAlt: "Centralized device management",
      imgLeft: true,
    },
    {
      title: "Enterprise grade",
      titleHl: "capabilities",
      body:
        "Built with enterprise-grade security and compliance standards. Support for Single Sign-On (SSO) enables secure and scalable user access. Fully compliant with GDPR regulations to ensure data privacy, and aligned with ISO 27001 best practices for information security management — providing peace of mind for even the most demanding corporate environments.",
      img: "/wp-content/uploads/2026/01/GDPR5.png",
      imgAlt: "Enterprise grade capabilities — GDPR, SSO, ISO 27001",
      imgLeft: false,
    },
  ],
  productsTitle: "Data driven solutions",
  productsTitleHl: "for smart spaces",
  productsSub:
    "An AI analytics platform for physical spaces that enhances decision-making and maximises overall venue performance:",
  productsBullets: [
    "Measure and improve space performance",
    "Understand customer behavior",
    "Connect with your visitors",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc:
        "Measure outdoor and indoor traffic, track real-time occupancy, and calculate conversion — all in one powerful platform.",
      href: "/en/traffic-insights/",
      cta: "Read more",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc:
        "Track customer journeys and interactions to understand in-store behavior and optimise the experience at every touchpoint.",
      href: "/en/customer-journey/",
      cta: "Read more",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/Group-1.png",
      name: "Connect",
      desc:
        "Collect visitor data through guest WiFi and launch personalised marketing campaigns based on location, profile and behavior.",
      href: "/en/connect/",
      cta: "Read more",
    },
  ],
  ctaStripBold: "Your cameras are already installed.",
  ctaStripLight: "Turn them into advanced AI analytics in less than a week.",
  faqTitle: "Frequently asked",
  faqTitleHl: "questions",
  faqs: getFaqs("hypersensor", "en"),
};
