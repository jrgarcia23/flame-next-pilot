import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Customer Behavior · Flame Analytics",
  description: "Comprende cómo se mueven, interactúan y deciden tus visitantes. Mapas de calor, zonas frías y patrones de movimiento dentro del espacio.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Customer Behavior · Flame Analytics",
  metaDescription: "Comprende cómo se mueven los visitantes en tu espacio.",
  heroTitle: "Customer Behavior",
  heroBgImage: "/wp-content/uploads/2026/01/Customer_behavior-1-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Flame muestra cómo las personas recorren tus espacios: adónde van, cuánto tiempo permanecen y qué capta su atención. Estos insights te ayudan a diseñar distribuciones que vendan, optimizar el merchandising y mejorar la experiencia del cliente. Sin biometría, datos siempre anónimos.",
  heroBullets: ["Mapas de calor", "Zonas frías detectadas", "Dwell time por área", "100% anónimo"],
  imageBigSrc: "/wp-content/uploads/2026/01/Customer_behavior_recorte.png",
  imageBigAlt: "Flame Customer Behavior",
  bigSectionEyebrow: "Del movimiento al dato",
  bigSectionTitle: "Conoce Flame",
  bigSectionTitleHl: "Customer Journey",
  bigSectionPara1: "Flame Customer Journey transforma los datos anónimos de movimiento en insight profundo de comportamiento. Entiende recorridos, tiempos de permanencia e interacciones entre zonas, compara el tráfico entre áreas y detecta qué atrae la atención o impulsa la conversión.",
  bigSectionPara2: "Con IA respetuosa con la privacidad y dashboards intuitivos, tienes todo lo necesario para convertir el comportamiento del visitante en decisiones de negocio más inteligentes.",
  bigSectionBullets: ["Mapas de flujo de visitantes", "Interacciones por zona", "Tráfico entre zonas", "Tiempos de permanencia"],
  benefitsTitle: "de entender el comportamiento",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Cuando sabes cómo se comporta el cliente, dejas de adivinar y empiezas a diseñar.",
  benefits: [
    { icon: "layout", title: "Diseña espacios que vendan", desc: "Utiliza insights de comportamiento para crear distribuciones que guíen a los visitantes de forma natural, destaquen áreas clave y aumenten la conversión en tienda." },
    { icon: "behavior", title: "Aumenta el engagement y el interés", desc: "Identifica dónde pasan tiempo los visitantes y qué capta su atención para perfeccionar las experiencias y mejorar la satisfacción general." },
    { icon: "convert", title: "Mejora la conversión a ventas", desc: "Comprende la relación entre movimiento, atención y ventas para optimizar la ubicación de productos, campañas y diseño de tienda con impacto medible." },
    { icon: "users", title: "Decisiones de marketing inteligentes", desc: "Segmenta audiencias por comportamiento e intención para ofrecer contenido, promociones y acciones de fidelización más relevantes." },
  ],
  metricsTitle: "Las métricas que cambian",
  metricsTitleHl: "decisiones",
  metricsSub: "Convierte el movimiento físico en datos accionables para tu equipo de operaciones, marketing y producto.",
  metrics: [
    { icon: "behavior", title: "Mapa de calor por planta",   desc: "Densidad de tráfico real por cada zona del espacio." },
    { icon: "dwell",    title: "Tiempo medio en zona",       desc: "Cuánto se quedan los visitantes en cada área." },
    { icon: "journey",  title: "Top rutas recorridas",       desc: "Las secuencias de zonas más visitadas, en orden." },
    { icon: "users",    title: "Demografía agregada",        desc: "Edad y género en bandas, sin identificación individual." },
    { icon: "clock",    title: "Comportamiento por hora",    desc: "Cómo cambia el patrón a lo largo del día." },
    { icon: "compare",  title: "Comparativa entre tiendas",  desc: "Top performers vs. red, identifica buenas prácticas replicables." },
  ],
  testimonialsIdx: [0, 4, 5],
  faqs: [
    { q: "¿Cómo se genera el mapa de calor?",                          a: "Flame procesa el vídeo de tus cámaras existentes con IA y detecta <strong>siluetas anónimas</strong> en movimiento. La concentración de detecciones por zona y por tiempo genera el heatmap. No se almacena vídeo, solo eventos analíticos." },
    { q: "¿Puedo identificar a una persona concreta?",                  a: "No. Y eso es deliberado: <strong>Flame no usa reconocimiento facial ni biometría</strong>. Las siluetas son anónimas, no se vinculan a una identidad. Esto cumple RGPD por diseño y es lo que permite el despliegue masivo." },
    { q: "¿Funciona en espacios grandes con muchas cámaras?",           a: "Sí. Flame escala desde una sola cámara hasta redes con cientos de ubicaciones gestionadas desde una <strong>única plataforma cloud</strong>. Los heatmaps se generan a nivel zona, planta, tienda o red completa." },
    { q: "¿Detecta interacciones con productos concretos?",             a: "A nivel zona o estantería con configuración específica. Si necesitas medir la interacción con productos individuales, Flame se combina con sensores adicionales (RFID, beacons) o con datos del TPV para obtener atribución completa." },
    { q: "¿Qué precisión tiene en entornos con mucho tráfico?",         a: "+95% en condiciones de alta densidad. Flame utiliza modelos de aprendizaje profundo entrenados específicamente para escenarios complejos: grupos caminando juntos, cruces, personas con cochecitos, etc." },
    { q: "¿Cuánto tiempo se necesita para empezar a ver datos?",        a: "Tras la firma, los primeros mapas de calor están disponibles en <strong>5-7 días laborables</strong>. La calibración fina del modelo para tu entorno específico ocurre en las primeras 2 semanas en paralelo al uso de los datos." },
  ],
  ctaStripBold: "Diseña espacios que vendan, no espacios que ocupen sitio.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function CustomerBehaviorDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/customer-behavior/" />;
}
