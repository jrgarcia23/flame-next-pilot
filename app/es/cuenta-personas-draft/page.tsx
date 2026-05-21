import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Cuenta personas · Conteo de visitantes con IA · Flame Analytics",
  description:
    "Flame te ayuda a medir con precisión el tráfico en entradas, plantas y recintos, dándote la visibilidad necesaria para optimizar operaciones, planificar recursos y aumentar la conversión.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Cuenta personas · Flame Analytics",
  metaDescription: "Conteo de visitantes con IA, sin biometría.",
  heroTitle: "Conteo de personas",
  heroBgImage: "/wp-content/uploads/2026/01/people_counting-1-1-1-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Flame te ayuda a medir con precisión el tráfico en entradas, plantas y recintos, dándote la visibilidad necesaria para optimizar operaciones, planificar recursos de forma eficiente y aumentar la conversión. Diseñado para retailers, centros comerciales y cualquier espacio físico que dependa de comprender el flujo y el rendimiento.",
  heroBullets: ["Precisión del 99 %", "+500 tiendas medidas", "12 países", "Sin biometría"],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Flame people counting dashboard",
  bigSectionTitle: "Más allá del conteo: inteligencia sobre tu",
  bigSectionTitleHl: "afluencia",
  bigSectionPara1: "Flame People Counting convierte los conteos brutos en insight accionable. Explora tendencias, compara ubicaciones y monitoriza el flujo de visitantes a través de dashboards intuitivos que dan vida a tus espacios.",
  bigSectionPara2: "Todo en tiempo real, con precisión y privacidad integradas. Sin obra, sin biometría y compatible con tu stack actual de TPV, ERP y BI.",
  bigSectionBullets: ["Tráfico exterior", "Venue traffic", "Tasa de captura", "Exclusión de personal"],
  benefitsTitle: "del conteo de personas",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Cada métrica convierte tu intuición en decisión: planifica plantilla, mide conversión y compara tiendas con dato real, no con suposiciones.",
  benefits: [
    { icon: "eye",      title: "Comprende tu afluencia real",                    desc: "Obtén visibilidad completa sobre cuántas personas visitan tus tiendas, cuándo y cómo evolucionan las tendencias a lo largo del tiempo." },
    { icon: "users",    title: "Gestión de personal y operaciones eficiente",    desc: "Utiliza datos reales para planificar horarios, ajustar los niveles de servicio a la demanda y reducir ineficiencias." },
    { icon: "grid",     title: "Compara ubicaciones fácilmente",                 desc: "Compara el rendimiento entre tiendas, plantas o redes para identificar mejores prácticas y áreas de mejora." },
    { icon: "trending", title: "Impulsa la conversión y la rentabilidad",        desc: "Conecta los datos de visitantes con las ventas para descubrir oportunidades que aumenten la conversión y el ROI." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Más allá del \"cuántos entran\". Flame cruza visitantes con tu operación y tus ventas para descubrir patrones accionables.",
  metrics: [
    { icon: "clock",    title: "Afluencia total y por franja",       desc: "Visitas reales día a día, hora a hora. Detecta picos y valles de tu tráfico real." },
    { icon: "convert",  title: "Tasa de conversión visita → venta",  desc: "Cruza tráfico con tu TPV. Sabes qué % de visitantes acaba comprando, no solo cuántos entran." },
    { icon: "calendar", title: "Patrones semanales y picos horarios", desc: "Identifica los momentos críticos de la semana. Anticipate con personal y stock." },
    { icon: "compare",  title: "Benchmark entre tiendas",            desc: "Compara red completa, identifica las tiendas top y replica sus prácticas en el resto." },
    { icon: "dwell",    title: "Tiempo medio en tienda",             desc: "Cuánto se queda el visitante. Pista clave de engagement y experiencia." },
    { icon: "ratio",    title: "Staff-to-traffic ratio",             desc: "Personal real necesario en cada franja. Reduce hasta un 18% las horas mal asignadas." },
  ],
  testimonialsIdx: [6, 3, 2],
  faqs: [
    { q: "¿Qué es un sistema de People Counting y cómo funciona?",                a: "Un sistema de <strong>People Counting</strong> utiliza sensores —normalmente cámaras de vídeo o haces infrarrojos— para registrar cuántas personas entran y salen de un espacio físico. Los sistemas modernos como Flame aplican analítica de vídeo con IA a las cámaras de videovigilancia existentes, eliminando la necesidad de hardware dedicado. La tecnología <strong>Hypersensor</strong> procesa los flujos de vídeo en tiempo real, detectando y contando personas mediante reconocimiento de siluetas sin identificar rostros ni utilizar datos biométricos. Flame alcanza más de un <strong>98 %</strong> de precisión en espacios físicos, tiendas y centros comerciales en 7 países." },
    { q: "¿Qué precisión tiene el People Counting con IA frente al conteo manual?", a: "El <strong>People Counting</strong> basado en IA como el de Flame alcanza más de un <strong>98 %</strong> de precisión en entornos controlados, superando con creces el conteo manual, que típicamente ofrece entre un 75-85 % de precisión debido a la fatiga y distracción humanas. El <strong>Hypersensor</strong> de Flame utiliza modelos de aprendizaje profundo entrenados con millones de escenarios reales para mantener la precisión incluso en entornos de alta densidad, como pasillos de centros comerciales o entradas de tiendas en horas punta." },
    { q: "¿Cuánto cuesta un sistema de People Counting para una tienda?",          a: "El coste total depende de tres factores: número de entradas a monitorizar, infraestructura de cámaras existente y módulos de analítica elegidos. Flame funciona con las cámaras de videovigilancia existentes, eliminando el coste de 500-2.000 EUR por entrada de los sensores dedicados. Las licencias de software siguen un modelo SaaS con suscripciones mensuales o anuales. Para una única ubicación con 2-4 cámaras, se puede esperar entre 150-400 EUR/mes incluyendo <strong>People Counting</strong>, analítica básica de tráfico y acceso al panel de control." },
    { q: "¿Cuál es el ROI de implementar People Counting?",                       a: "Las organizaciones que utilizan el <strong>People Counting</strong> de Flame consiguen un ROI medible en 90 días en tres áreas. Primero, visibilidad de la tasa de conversión: conocer la ratio real de visitantes que compran revela si las bajas ventas se deben a falta de tráfico o a una mala experiencia en tienda. Segundo, optimización de la dotación de personal: alinear los turnos con los patrones reales de tráfico reduce los costes laborales entre un <strong>8-15 %</strong>." },
    { q: "¿Es el People Counting compatible con el RGPD?",                        a: "Sí, cuando se implementa correctamente. El <strong>People Counting</strong> de Flame es <strong>privacidad por diseño</strong>: el sistema cuenta siluetas anónimas moviéndose por el espacio sin capturar, almacenar ni procesar datos biométricos. Sin reconocimiento facial, sin seguimiento individual, sin recopilación de datos personales." },
    { q: "¿Funciona con mis cámaras de videovigilancia actuales?",                a: "Sí, y este es el diferenciador clave de Flame. La tecnología <strong>Hypersensor</strong> de Flame se conecta a las cámaras IP existentes mediante protocolo RTSP, transformando la infraestructura de videovigilancia en inteligencia de negocio sin ningún hardware nuevo. Compatible con las principales marcas de cámaras, incluyendo Axis, Hikvision, Dahua, Bosch y Hanwha." },
    { q: "¿Cuál es la diferencia entre datos en tiempo real y datos históricos?", a: "Los datos en tiempo real muestran la ocupación actual y el flujo de tráfico según ocurre, algo esencial para decisiones inmediatas como abrir puntos de atención adicionales o activar protocolos de gestión de aforo. Los datos históricos revelan patrones a lo largo de semanas, meses y años, permitiendo decisiones estratégicas." },
    { q: "¿Cuánto tiempo lleva la instalación?",                                  a: "Para una única ubicación con cámaras existentes, Flame normalmente entrega datos de conteo en vivo en <strong>5-7 días laborables</strong> desde la firma del contrato. El proceso: Días 1-2, auditoría de cámaras y configuración RTSP; Días 3-4, calibración del modelo de IA; Días 5-7, configuración del panel y formación del equipo." },
  ],
  ctaStripBold: "Empieza a contar visitantes con precisión real.",
  ctaStripLight: "Conteo de personas operativo en 7 días.",
};

export default function CuentaPersonasDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/people-counting/" />;
}
