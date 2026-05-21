import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Gestión de aseos · Flame Analytics",
  description: "Mantén tus instalaciones limpias, eficientes y siempre listas. Conteo de usuarios en cada aseo + alertas automáticas para limpieza basada en uso real.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Gestión de aseos · Flame Analytics",
  metaDescription: "Limpieza basada en uso real, no en horarios fijos.",
  heroTitle: "Gestión de aseos",
  heroBgImage: "/wp-content/uploads/2026/01/restroom-1-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Mantén tus instalaciones limpias, eficientes y siempre listas. Flame te ayuda a monitorizar el uso de los aseos en tiempo real mediante el conteo de visitantes en cada acceso. El personal de limpieza recibe alertas automáticas tras un umbral de uso, lo que asegura instalaciones siempre presentables y reduce costes operativos.",
  heroBullets: ["Limpieza por uso real", "Alertas automáticas", "App móvil para staff", "100% anónimo"],
  imageBigSrc: "/wp-content/uploads/2026/01/Restroom-Management_3.png",
  imageBigAlt: "Flame Restroom Management",
  bigSectionTitle: "Limpieza basada en",
  bigSectionTitleHl: "uso real",
  bigSectionPara1: "La gestión de aseos de Flame combina sensores de conteo de personas y una app móvil para automatizar los ciclos de limpieza según el uso real.",
  bigSectionPara2: "Recibe alertas, registra intervenciones y analiza patrones a lo largo del tiempo, mejorando la eficiencia, la limpieza y la satisfacción de los visitantes en todos tus espacios.",
  bigSectionBullets: ["Sensores de conteo", "App móvil de limpieza", "Alertas automáticas", "Patrones de uso"],
  benefitsTitle: "de la limpieza inteligente",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Limpia cuando hace falta, no cuando toca por horario. Mejor experiencia, menos coste.",
  benefits: [
    { icon: "occupancy", title: "Limpieza por uso real",                desc: "El equipo recibe alerta tras un número de usos, no por horario fijo. Adiós a limpiezas innecesarias y aseos abandonados." },
    { icon: "alert",     title: "Alertas en tiempo real",                desc: "Notificaciones automáticas al móvil del staff de limpieza al superar el umbral configurado." },
    { icon: "ratio",     title: "Reducción de costes",                   desc: "Hasta un 30% menos en horas de limpieza con la misma calidad percibida por el visitante." },
    { icon: "trending",  title: "Mejora la experiencia",                 desc: "Aseos siempre presentables se traducen en mayor NPS, repetición de visita y reputación." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Datos operacionales para optimizar el contrato con proveedores y el equipo interno.",
  metrics: [
    { icon: "occupancy", title: "Usos por aseo y hora",      desc: "Datos para detectar patrones de uso y dimensionar horarios." },
    { icon: "alert",     title: "Alertas de saturación",      desc: "Avisos al personal en cuanto se acerca el umbral de limpieza." },
    { icon: "calendar",  title: "Histórico de actividad",     desc: "Patrones por día, semana y temporada para planificación." },
    { icon: "compare",   title: "Comparativa entre aseos",    desc: "Qué baños son más usados y cuáles podrían cerrar fuera de pico." },
    { icon: "reports",   title: "Registro de limpiezas",      desc: "Auditoría completa para gestión de proveedores externos." },
    { icon: "ratio",     title: "Coste por uso",              desc: "Cuánto cuesta cada visita en horas de limpieza." },
  ],
  testimonialsIdx: [3, 5, 0],
  faqs: [
    { q: "¿Cómo cuenta Flame los usos sin invadir la privacidad?",        a: "Flame coloca una cámara en la <strong>entrada del aseo</strong> (no dentro). Cuenta personas que entran y salen mediante IA, sin reconocer rostros ni almacenar imágenes. Solo eventos numéricos anonimizados." },
    { q: "¿Sirve para varios aseos en un mismo centro?",                  a: "Sí. Flame escala a redes de cientos de aseos en grandes centros comerciales, aeropuertos, estaciones o estadios, gestionados desde un único dashboard cloud." },
    { q: "¿Cómo recibe el personal de limpieza las alertas?",             a: "A través de la <strong>app móvil Flame</strong> con notificaciones push, o por SMS/email/webhook a tu sistema interno. El staff confirma la limpieza desde la propia app y queda registrado." },
    { q: "¿Cuánto reduce los costes de limpieza?",                        a: "Típicamente entre un <strong>20-30%</strong> en horas de personal externalizado, con la misma o mejor calidad percibida. El ROI suele materializarse en 2-4 meses." },
    { q: "¿Funciona con servicios externalizados?",                        a: "Sí, y especialmente bien. El histórico de alertas + confirmaciones de limpieza es la base perfecta para auditar contratos con proveedores externos y validar SLAs por número de limpiezas reales." },
    { q: "¿Cumple el RGPD?",                                                a: "100%. Sin biometría, sin reconocimiento facial, sin tracking individual. Solo conteo agregado en accesos públicos. Aprobado por DPOs en despliegues europeos." },
  ],
  ctaStripBold: "Limpia cuando lo necesita el aseo, no cuando lo manda el reloj.",
  ctaStripLight: "Operativo en 7 días.",
};

export default function GestionAseosDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/restroom-management/" />;
}
