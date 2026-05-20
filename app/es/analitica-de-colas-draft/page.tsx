import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Gestión de colas · Flame Analytics",
  description: "Detecta colas en tiempo real, mide tiempos de espera y dimensiona personal en hora punta. Reduce abandonos y mejora la experiencia del cliente.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Gestión de colas · Flame Analytics",
  metaDescription: "Reduce esperas, evita abandonos y mantiene a los clientes satisfechos.",
  heroTitle: "Gestión de colas",
  heroBgImage: "/wp-content/uploads/2026/01/Queue_analytics.png",
  heroBgPosition: "center center",
  heroSub: "Reduce las esperas, evita abandonos y mantén a los clientes satisfechos. Flame te ayuda a monitorizar las colas en tiempo real para detectar congestión, medir los tiempos de espera y anticipar las necesidades de servicio. Al actuar antes de que se forme la cola, mejoras la experiencia y el rendimiento de tus operaciones.",
  heroBullets: ["Detección automática", "Tiempo de espera real", "Alertas a manager", "Sin biometría"],
  imageBigSrc: "/wp-content/uploads/2026/01/Queue-Analytics_recorte.png",
  imageBigAlt: "Flame Queue Analytics",
  bigSectionEyebrow: "Inteligencia en tiempo real para que las colas fluyan sin interrupciones.",
  bigSectionTitle: "Conoce",
  bigSectionTitleHl: "Gestión de colas",
  bigSectionPara1: "La analítica de colas de Flame mide la ocupación, los tiempos de espera y las tasas de abandono en las áreas de servicio. Visualiza el rendimiento de las colas en tiempo real y recibe alertas cuando se superan los umbrales.",
  bigSectionPara2: "Automatiza las respuestas mediante APIs e integraciones. Mantén las operaciones ágiles y garantiza que cada experiencia del cliente sea rápida, fluida y sin frustraciones.",
  bigSectionBullets: ["Estado en tiempo real", "Ocupación de colas", "Tiempo de espera", "Activación en tiempo real"],
  benefitsTitle: "de gestionar las colas con datos",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Las esperas largas son la causa #1 de abandono. Anticípate, actúa y convierte experiencia en lealtad.",
  benefits: [
    { icon: "queue",     title: "Monitorea en tiempo real",                  desc: "Controla de manera continua la longitud de las colas, tiempos de espera y flujo durante las horas punta." },
    { icon: "alert",     title: "Evita abandonos",                            desc: "Identifica esperas prolongadas con anticipación y activa medidas antes de que el cliente se vaya." },
    { icon: "users",     title: "Optimiza la dotación de personal",           desc: "Sabes cuándo y dónde reforzar el equipo, no por intuición sino por dato." },
    { icon: "trending",  title: "Mejora la satisfacción",                     desc: "Reduce esperas medias entre un 20-40% y convierte la rapidez en ventaja competitiva." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Cada métrica está pensada para tomar acción inmediata: alerta, refuerzo o redistribución.",
  metrics: [
    { icon: "queue",   title: "Cola actual en cada punto",  desc: "Número de personas en espera por caja o área de servicio." },
    { icon: "clock",   title: "Tiempo medio de espera",     desc: "Minutos reales que pasan los clientes en cola." },
    { icon: "alert",   title: "Alertas de saturación",       desc: "Notificación inmediata al manager al superar umbral." },
    { icon: "compare", title: "Comparativa entre cajas",     desc: "Qué cajas son más rápidas y por qué." },
    { icon: "calendar",title: "Histórico por franja",        desc: "Datos para dimensionar el staffing semanal y por temporada." },
    { icon: "ratio",   title: "Tasa de abandono",            desc: "Cuántos clientes deciden irse sin esperar." },
  ],
  testimonialsIdx: [2, 5, 8],
  faqs: [
    { q: "¿Cómo detecta Flame que hay una cola?",                a: "Flame utiliza IA para identificar <strong>agrupaciones lineales de personas</strong> en zonas predefinidas (cajas, puntos de atención, entradas). Combina detección de personas con análisis de patrón espacial y temporal para distinguir una cola real de un simple grupo." },
    { q: "¿Funciona con cualquier tipo de servicio?",            a: "Sí. Funciona en cajas de retail, taquillas, mostradores de check-in, puntos de información, entradas a eventos, etc. Solo requiere visión de la zona de cola desde una cámara IP." },
    { q: "¿Las alertas llegan al manager en tiempo real?",       a: "Sí. Las notificaciones se envían por <strong>email, SMS, app móvil o webhook</strong> al canal que prefieras (Slack, Teams, sistemas internos). La latencia es típicamente <30 segundos." },
    { q: "¿Cuál es el ROI típico?",                              a: "Los clientes Flame reducen las esperas entre un <strong>20-40%</strong> tras 3 meses, mediante mejor planificación de turnos y respuesta proactiva. Esto se traduce en aumento de conversión y reducción de abandonos del 5-15%." },
    { q: "¿Cumple el RGPD?",                                      a: "Sí. Flame no usa biometría ni reconocimiento facial. Solo cuenta siluetas anónimas en la zona de cola. Los datos se agregan por intervalo temporal, nunca por individuo." },
    { q: "¿Cuánto tiempo necesito para tener el sistema operativo?", a: "Tras la firma del contrato, el sistema empieza a entregar datos en <strong>5-7 días laborables</strong>. Las zonas de cola se calibran con tu equipo en la primera semana." },
  ],
  ctaStripBold: "Cada minuto de espera cuesta. Anticípate.",
  ctaStripLight: "Gestión de colas operativa en 7 días.",
};

export default function AnaliticaColasDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/queue-analytic/" />;
}
