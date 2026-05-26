import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Data Intelligence for Retail · Flame Analytics",
  description: "Mejorando el rendimiento de la tienda con insights clave. Soluciones de marketing digital y analítica para retail basadas en big data e IA.",
};

const cfg: SectorConfig = {
  metaTitle: "Data Intelligence for Retail · Flame Analytics",
  metaDescription: "Mejorando el rendimiento de la tienda con insights clave.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.png",
  heroBgPosition: "center center",
  heroTitle: "Data Intelligence for Retail",
  heroSub: "En Flame desarrollamos e implantamos soluciones de marketing digital y analítica para espacios físicos que, gracias al big data y la Inteligencia Artificial, mejoran la gestión y ayudan a los retailers a entender el comportamiento de sus clientes.",
  pillars: [
    { title: "Impulsa", desc: "Información valiosa sobre el comportamiento de tus clientes mediante una vigilancia activa. Conociendo sus acciones, preferencias y pautas, podrás tomar decisiones basadas en datos objetivos y precisos.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Mide", desc: "Optimiza el rendimiento de tu punto de venta para alcanzar rentabilidad y eficiencia. Implementa análisis basados en datos para perfeccionar tu estrategia comercial y garantizar una operación más rentable.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Transforma", desc: "Mejora la experiencia en retail mediante la personalización de las interacciones con tus clientes. Incrementa la satisfacción y el engagement ofreciendo experiencias a medida, potenciando así la experiencia global en tienda.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-retail.png",
      imgAlt: "Comprende el comportamiento de los clientes",
      title: "Comprende el comportamiento de los",
      titleHl: "clientes",
      bullets: [
        "Explora cómo interactúan tus clientes en el punto de venta, incluidos los patrones de tráfico y movimiento, lo que te permitirá tomar decisiones óptimas en cuanto a horarios de apertura, dotación de personal, diseño del layout, ubicación de producto, etc.",
        "Mejora la experiencia de compra de tus clientes identificando sus preferencias y ofreciéndoles lo que quieren y necesitan.",
        "Genera una clientela más fiel y comprometida con tu marca.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-retail.png",
      imgAlt: "Conoce el rendimiento de tu punto de venta",
      title: "Conoce el rendimiento de tu",
      titleHl: "punto de venta",
      bullets: [
        "Averigua cómo está funcionando tu escaparate y su capacidad de atracción y captura.",
        "Descubre si la ubicación de tu negocio es óptima.",
        "Mejora tus tasas de conversión, rentabilidad y eficacia empresarial general.",
        "Con Shopper Funnel, puedes medir los indicadores clave de rendimiento (KPIs) a lo largo del recorrido del cliente.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-retail.png",
      imgAlt: "Lanza campañas efectivas basadas en ubicación",
      title: "Lanza campañas efectivas basadas en",
      titleHl: "ubicación",
      bullets: [
        "Envía mensajes push personalizados a tus clientes cuando estén en el punto de venta y dales una atención única.",
        "Crea campañas basadas en un segmento concreto (género, edad, código postal) o en un comportamiento determinado (fidelidad, intereses).",
      ],
    },
        {
      img: "/wp-content/uploads/2026/01/benefit-4-retail.png",
      imgAlt: "Gestiona de forma óptima tus ubicaciones",
      title: "Gestiona de forma óptima tus",
      titleHl: "ubicaciones",
      bullets: [
        "Identifica mejores y peores prácticas en diferentes ubicaciones y consigue la tienda perfecta.",
        "Mide los indicadores clave de rendimiento de tus tiendas, como el tráfico exterior e interior, los ratios de captación y conversión, etc., y compáralos entre sí.",
        "Descubre el rendimiento de todas tus localizaciones en cada uno de los puntos claves o KPIs del proceso.",
      ],
    },
  ],
  productsTitle: "Productos integrales,",
  productsTitleHl: "múltiples soluciones",
  productsSub: "Medir y mejorar el rendimiento del espacio, comprender el comportamiento de los clientes y conectar con tus visitantes.",
  products: [
    {
      title: "Traffic",
      desc: "Mide el tráfico exterior e interior, sigue la ocupación en tiempo real y calcula la conversión, todo en una potente plataforma.",
      href: "/es/analitica-trafico/",
      img: "/wp-content/uploads/2026/01/Traffic2-1.png",
    },
    {
      title: "Customer Journey",
      desc: "Rastrea los recorridos y las interacciones de los clientes para comprender el comportamiento en la tienda y optimizar la experiencia en cada punto de contacto.",
      href: "/es/customer-journey/",
      img: "/wp-content/uploads/2026/01/Customer_journey2-scaled-1.png",
    },
    {
      title: "Connect",
      desc: "Recopila datos de los visitantes a través del WiFi para huéspedes y lanza campañas de marketing personalizadas basadas en la ubicación, el perfil y el comportamiento.",
      href: "/es/connect/",
      img: "/wp-content/uploads/2026/01/Connect-1-1.png",
    },
  ],
  testimonialsIdx: [2, 4, 6],
  faqs: [
    { q: "¿Cuáles son los KPI clave de analítica retail?", a: "Los cinco KPI fundamentales que toda cadena retail debería medir son: <strong>tasa de conversión</strong> (visitantes a compradores), <strong>afluencia</strong> (visitantes totales por período), tiempo de permanencia medio (engagement del visitante), tasa de captación (transeúntes que entran) y rendimiento del personal (ventas por empleado vs. ratio de tráfico). Flame proporciona los cuatro primeros automáticamente usando las cámaras existentes. La tasa de conversión es el más revelador: sin datos de afluencia, una caída del 10% en ventas podría deberse a un 10% menos de visitantes (problema de marketing) o los mismos visitantes comprando menos (problema de experiencia en tienda). <strong>Los retailers líderes</strong> usan Flame para separar estos factores y dirigir las inversiones correctamente. El mismo marco de KPI se aplica a toda la base de clientes de Flame, desde centros comerciales midiendo la conversión de inquilinos hasta espacios físicos monitorizando el engagement de visitantes." },
    { q: "¿Cómo funciona la analítica retail con cámaras de seguridad?", a: "Flame transforma las cámaras de seguridad en sensores de inteligencia de negocio sin alterar su función de vigilancia. La tecnología <strong>Hypersensor</strong> se conecta a los flujos de vídeo de las cámaras IP existentes mediante protocolo RTSP y aplica modelos de IA que extraen datos analíticos: <strong>People Counting</strong>, patrones de flujo, <strong>Zones analytics</strong> y medición de tiempo de permanencia. Las cámaras continúan grabando para seguridad de forma simultánea e independiente. Compatible con Axis, Hikvision, Dahua, Bosch, Hanwha y la mayoría de fabricantes con soporte RTSP. Requisitos mínimos: resolución 720p y montaje cenital o en ángulo. <strong>Una gran empresa de estaciones de servicio</strong> desplegó Flame en más de 1.000 estaciones sin hardware adicional, reduciendo los costes de despliegue en un 60%. El mismo enfoque de cámara a analítica impulsa los despliegues de Flame en espacios físicos de todo tipo." },
    { q: "¿Cuál es el ROI típico de la analítica retail?", a: "Los clientes de Flame ven ROI en tres áreas en los primeros 90 días. La optimización de la dotación de personal (alineando turnos con el tráfico real) reduce los costes laborales entre un <strong>8-15%</strong>. La mejora de la tasa de conversión (usando datos de afluencia para identificar problemas de experiencia en tienda) aumenta las ventas entre un 5-12% sin tráfico adicional. La atribución de marketing (midiendo la afluencia generada por campañas) elimina el gasto en promociones ineficaces. Para un retailer con 20 tiendas y 50M EUR de facturación, un 5% de mejora en conversión representa 2,5M EUR en ingresos adicionales. <strong>Operadores líderes de centros comerciales</strong>, con 10 centros comerciales usando Flame, reportaron un incremento medio del 12% en la conversión de inquilinos en el primer año al compartir datos de afluencia con los responsables de tienda." },
    { q: "¿Funciona para tiendas pequeñas o solo para grandes cadenas?", a: "Flame sirve tanto a tiendas independientes como a cadenas enterprise. Para tiendas pequeñas (1-5 locales), la configuración es más sencilla: 2-4 cámaras existentes proporcionan <strong>People Counting</strong> y analítica de tráfico básica por 150-400 EUR/mes. El panel muestra los mismos insights que reciben las grandes cadenas: patrones de tráfico por hora, tasa de conversión (integrada con tu TPV) y benchmarks por día de la semana. Para cadenas enterprise (más de 50 tiendas), Flame añade analítica de portfolio, comparativas entre tiendas y recomendaciones de dotación de personal basadas en IA. El modelo SaaS es escalable: los precios por ubicación disminuyen con el volumen. Lo que hace Flame accesible para tiendas pequeñas es aprovechar las cámaras existentes, eliminando el coste de 500-2.000 EUR por entrada de sensores de conteo dedicados. Más allá del retail, la misma tecnología escala a centros comerciales y otros espacios físicos." },
    { q: "¿Cómo mide el impacto de las campañas de marketing?", a: "La analítica retail cierra la brecha entre la inversión en marketing y los resultados en tienda física. Flame mide la afluencia antes, durante y después de las campañas, cuantificando exactamente cuántos visitantes adicionales generó cada promoción. Métricas clave: <strong>incremento de afluencia</strong> (porcentaje de aumento durante la campaña), <strong>calidad de la conversión</strong> (¿los visitantes adicionales compraron o solo miraron?), patrones horarios (¿a qué hora vinieron los visitantes de la campaña?) y <strong>retención</strong> (¿volvieron después?). A diferencia de los medios digitales donde la atribución es estándar, el marketing en retail físico ha operado históricamente sin estas métricas. Flame las conecta: midiendo el tráfico generado por campañas de exterior, radio, redes sociales y email marketing, proporcionando el coste real por visita de cada canal. Los centros comerciales y otros espacios físicos utilizan la misma metodología para medir la afluencia generada por eventos." },
    { q: "¿Qué es la analítica omnicanal?", a: "La <strong>analítica omnicanal</strong> unifica los datos de comportamiento del cliente en los canales digitales y físicos. Flame lo hace posible conectando la analítica de tráfico en tienda con los datos de ecommerce mediante integración por API. Caso de uso: un retailer descubre que el 60% de los compradores del sábado navegaron por su web en las 48 horas anteriores, pero las ventas en tienda no se atribuyen al ecommerce. Flame puede cruzar los patrones de tráfico con los picos de actividad web para revelar estas conexiones (sin identificar a individuos). Para clientes con programas de fidelización, <strong>Connect</strong> de Flame vincula los datos de login WiFi con los ID de fidelización (con consentimiento), creando una visión unificada del comportamiento online-offline. Este enfoque omnicanal se extiende más allá del retail a espacios físicos como hoteles, donde los operadores correlacionan datos del canal de reserva con el uso de zonas comunes." },
    { q: "¿Cuánto cuesta la analítica retail?", a: "Flame ofrece precios SaaS con suscripción mensual o anual. El coste depende del número de ubicaciones, cámaras por ubicación y módulos de analítica. Desglose orientativo: <strong>Tienda individual</strong> (2-4 cámaras): 150-400 EUR/mes incluyendo conteo, tráfico básico y panel. <strong>Cadena media</strong> (10-50 tiendas): precios por volumen negociados individualmente, incluyendo integración API y account manager. <strong>Enterprise</strong> (más de 50 ubicaciones): licencia enterprise personalizada con SLA dedicado, integraciones a medida y soporte prioritario. Sin costes de hardware inicial al usar cámaras existentes. La implementación (auditoría de cámaras, calibración, formación) está incluida. Los contratos típicos son anuales. El ROI supera la inversión en 3-6 meses para la mayoría de retailers. El mismo modelo de precios se aplica a los despliegues de Flame en centros comerciales y otros espacios físicos." },
    { q: "¿Cómo se garantiza la privacidad del comprador?", a: "Flame está construido desde la base con <strong>privacidad por diseño</strong>. La arquitectura técnica: las cámaras envían flujos de vídeo al software de Flame, que extrae datos analíticos (conteos, flujos, tiempos de permanencia) y descarta inmediatamente las imágenes originales. Ningún vídeo ni imagen se almacena jamás fuera del sistema de seguridad existente. No se utiliza reconocimiento facial ni biometría en ningún momento. Los datos producidos son exclusivamente estadísticos: <strong>147 personas entraron entre las 10:00 y las 11:00</strong>, el tiempo de permanencia medio en la Zona A fue de 4,2 minutos. Es imposible identificar a un individuo a partir de los datos de Flame. Certificaciones: <strong>ISO 27001</strong>, cumplimiento verificado del <strong>RGPD</strong>, procesamiento de datos en la UE. El mismo enfoque de privacidad protege a los visitantes en todos los despliegues de Flame, desde tiendas retail y centros comerciales hasta cualquier otro espacio físico." },
  ],
  ctaStripBold: "Cada tienda es única. Tu data debe demostrarlo.",
  ctaStripLight: "Demo personalizada en 20 minutos.",
};

export default function RetailSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/solution-for-retail-sector/" />;
}
