import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { ProductConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Traffic · Analítica de tráfico físico con IA · Flame Analytics",
  description:
    "Convierte el tráfico físico en decisiones empresariales basadas en datos. Flame transforma el movimiento de personas en información accionable que impulsa el rendimiento.",
};

const cfg: ProductConfig = {
  metaTitle: "Traffic · Flame Analytics",
  metaDescription: "Analítica de tráfico físico con IA.",
  heroEyebrow: "Más allá de un sensor de cuenta personas",
  heroTitle: "Traffic",
  heroSub: "Convierte el tráfico físico en decisiones empresariales basadas en datos. Flame transforma el movimiento de personas en tus espacios en información accionable que impulsa el rendimiento.",
  heroBullets: ["6 funcionalidades en 1", "Precisión del 99 %", "+500 tiendas medidas", "Sin biometría"],
  benefitsTitle: "Tráfico físico =",
  benefitsTitleHl: "decisiones de negocio",
  benefitsSub: "Información accionable en tiempo real para optimizar conversión, ocupación y operaciones.",
  benefits: [
    { icon: "trending", title: "Aumenta la conversión y mejora la rentabilidad", desc: "Sigue cada etapa del embudo —desde las visitas hasta las ventas— y actúa en tiempo real para convertir más tráfico en resultados medibles." },
    { icon: "occupancy", title: "Optimiza la ocupación para mejorar la experiencia", desc: "Evita aglomeraciones, gestiona el flujo de visitantes en tiempo real y mide el impacto real de tus promociones con datos precisos de afluencia." },
    { icon: "users",    title: "Dirige operaciones más inteligentes",             desc: "Segmenta el tráfico por zonas, detecta horas punta y ajusta el personal y los horarios para mejorar la eficiencia en todas las ubicaciones." },
  ],
  platformTitle: "Una plataforma de IA de vídeo que",
  platformTitleHl: "optimiza decisiones",
  platformPara1: "Flame Traffic convierte los datos brutos de conteo en insights accionables. Explora tendencias, compara ubicaciones y monitoriza el flujo de visitantes a través de dashboards intuitivos.",
  platformPara2: "Es la base sobre la que tu equipo decide cuándo abrir, cuándo reforzar plantilla y qué tienda merece más atención cada semana. Sin obra, sin biometría y compatible con tu stack actual de TPV, ERP y BI.",
  platformBullets: ["Tiempo real (<60 s)", "Multi-ubicación", ">200 KPIs", "APIs abiertas"],
  featuresTitle: "Descubre todas nuestras",
  featuresTitleHl: "funcionalidades",
  featuresSub: "Seis módulos que cubren todo el ciclo del tráfico: del transeúnte exterior a la conversión en venta.",
  features: [
    { icon: "count",        title: "Cuenta personas",       intro: "Mide la afluencia con precisión en horas, días, entradas y zonas.",
      desc: "Identifica qué puntos de acceso contribuyen más al tráfico y descubre patrones de comportamiento utilizando IA. Predice los flujos de visitantes, detecta las horas y días punta, y compara el rendimiento entre múltiples ubicaciones utilizando datos absolutos, relativos e históricos. Maximiza el valor de tu activo y cuantifica el impacto de las acciones de marketing y las promociones sobre el volumen de visitantes.",
      bullets: ["Conteo de entradas y salidas de línea","Exclusión del personal (Etiqueta, app, zonas de exclusión, IoT botón, duración de la visita)","Detección de merodeo y giros en U cerca de la entrada","Conteo de grupos","Conteo de zonas"] },
    { icon: "occupancy",    title: "Ocupación",             intro: "Monitorea en directo la ocupación de tus espacios y reacciona de inmediato a los niveles de afluencia.",
      desc: "Identifica tendencias, anticipa los momentos de mayor afluencia y automatiza acciones mediante la integración con sistemas de señalización y conteo de personas. Cumple la normativa, mejora la eficacia y aumenta la seguridad en todas las ubicaciones.",
      bullets: ["Control de ocupación en tiempo real","Alertas de ocupación","Monitoreo desde app móvil","Integración con señalización digital"] },
    { icon: "street",       title: "Tráfico en la calle",   intro: "Mide la afluencia externa para saber cuántas personas pasan por delante de tu espacio físico y cuántas entran realmente.",
      desc: "Evalúa el impacto de tu escaparate, mejora la atracción de tus vitrinas e impulsa las tasas de captación con datos que permiten analizar lo que sucede en el exterior.",
      bullets: ["Medición del tráfico de transeúntes","Análisis de atracción de escaparates","Tasa de captación (de transeúnte a visitante convertido)"] },
    { icon: "demographics", title: "Demografía",            intro: "Obtén información anónima sobre la distribución por sexo y edad de tus visitantes.",
      desc: "Utiliza estos datos para personalizar las experiencias, adaptar el contenido dinámicamente y aumentar la conversión a través de un compromiso específico.",
      bullets: ["Detección de género","Clasificación por grupos de edad","Integración con señalización digital"] },
    { icon: "convert",      title: "Conversión",            intro: "Conecta los análisis de visitantes con los datos de ventas para revelar todo el embudo de conversión, desde el transeúnte hasta la compra.",
      desc: "Controla métricas clave como la tasa de captura, la tasa de conversión y el ticket medio, por ubicación. Compara el rendimiento y convierte la información en acciones que generen ingresos.",
      bullets: ["Integración de ventas","Análisis del embudo de conversión","Seguimiento de la tasa de conversión de ventas","Tasa de captura (de transeúnte a cliente)"] },
    { icon: "vehicle",      title: "Conteo de vehículos",   intro: "Rastrea el flujo de vehículos para comprender los patrones de acceso, optimizar el aparcamiento y la logística, y vincular el tráfico de coches con las visitas a la tienda.",
      desc: "Ideal para centros comerciales, parques comerciales y grandes recintos que buscan mejorar la eficacia y la experiencia general de los visitantes.",
      bullets: ["Recuento y seguimiento del flujo de vehículos","Análisis de patrones de entrada y salida"] },
  ],
  pillarsTitle: "Por qué elegir",
  pillarsTitleHl: "Flame Traffic",
  pillarsSub: "Cuatro principios que hacen de Flame la plataforma de analítica de tráfico para empresas que escalan.",
  pillars: [
    { icon: "integration", title: "Agnóstico",   desc: "Flame se conecta con tu hardware y fuentes de datos existentes —CCTV, contadores, WiFi o TPV— garantizando compatibilidad total e integración sin fricciones." },
    { icon: "grid",        title: "Escalable",   desc: "Desde un solo sitio hasta miles, Flame escala sin esfuerzo. Gestiona cada ubicación a distancia a través de una única plataforma cloud." },
    { icon: "compare",     title: "Preciso",     desc: "La IA patentada de Flame proporciona análisis precisos y coherentes, así como datos listos para la toma de decisiones en todos los entornos." },
    { icon: "privacy",     title: "Privacidad",  desc: "Flame procesa los datos de forma anónima y sin datos biométricos, garantizando el cumplimiento del RGPD y la total privacidad de los visitantes." },
  ],
  testimonialsIdx: [0, 1, 7, 8, 2],
  faqs: [
    { q: "¿Qué es la analítica de tráfico peatonal y por qué es importante en retail?", a: "La <strong>analítica de tráfico peatonal</strong> mide el movimiento de personas en un espacio físico, capturando datos clave como visitantes únicos, tiempo de permanencia, flujos de circulación y patrones de comportamiento. En retail es fundamental porque permite tomar decisiones basadas en datos reales: optimizar la disposición de la tienda, ajustar el personal a las horas punta, evaluar el impacto de promociones y medir la <strong>tasa de conversión</strong> de visitantes en compradores. Flame transforma cualquier cámara IP existente en un sensor de inteligencia, sin coste de hardware adicional." },
    { q: "¿Qué es el conteo por zonas y cómo puede mejorar la distribución de mi tienda?", a: "El <strong>conteo por zonas</strong> divide el espacio físico en áreas independientes y mide el tráfico, dwell time y conversión de cada una por separado. Permite identificar qué zonas concentran más visitantes (hotspots), cuáles están infrautilizadas (zonas frías) y cómo se distribuye el flujo. Con esta información puedes reorganizar el layout, reubicar productos estrella, optimizar el merchandising y medir el impacto directo de cada cambio en las ventas por categoría." },
    { q: "¿Cómo pueden los datos de afluencia optimizar la dotación de personal?", a: "Los datos de afluencia revelan los <strong>patrones reales</strong> de visita por hora, día de la semana y estacionalidad. Cruzando esa información con la productividad por turno se obtiene el ratio óptimo de <strong>staff-to-traffic</strong>. Las cadenas que utilizan Flame reducen entre un 8 y un 15 % los costes laborales reasignando turnos a los momentos de mayor demanda, mientras mejoran la atención al cliente en horas punta." },
    { q: "¿Qué es la analítica de conversión en retail físico?", a: "La <strong>analítica de conversión</strong> mide qué porcentaje de los visitantes que entran en una tienda acaban comprando. Es el equivalente físico de la tasa de conversión digital. Flame conecta los datos de tráfico (de las cámaras) con los datos de venta (del TPV) para calcular la conversión real por hora, día, zona y categoría." },
    { q: "¿Cómo afecta el clima al tráfico peatonal y puede la analítica tenerlo en cuenta?", a: "El clima tiene un impacto directo y medible sobre el tráfico peatonal: días lluviosos pueden reducir las visitas exteriores entre un 20-40 %. Flame se integra con APIs meteorológicas para correlacionar el tráfico con condiciones climáticas y aislar el efecto del clima de otros factores." },
    { q: "¿Se pueden exportar los datos de tráfico a mis herramientas de BI existentes?", a: "Sí. Flame proporciona <strong>APIs REST</strong>, webhooks y conectores nativos para las principales plataformas de BI: Power BI, Looker, Tableau, Snowflake, BigQuery y data lakes en cloud." },
  ],
  ctaStripBold: "Convierte cada cámara en un sensor de inteligencia.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function TrafficDraft() {
  return <ProductTemplate cfg={cfg} enHref="/en/traffic-insights/" />;
}
