import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";
import type { FaqItem } from "@/lib/live-faqs";

// DOOH · Caso de uso (medición de audiencia en pantallas / retail media).
// FAQs propias de DOOH (no las de centros comerciales) para no duplicar el
// FAQPage schema de /es/solucion-para-centros-comerciales/.

export const metadata: Metadata = {
  title: "Medición DOOH · Retail Media para tus pantallas · Flame Analytics",
  description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas. Métricas auditables, sin reconocimiento facial, sobre tu red de cámaras actual.",
  alternates: {
    canonical: "/es/dooh/",
    languages: {
      es: "/es/dooh/",
      en: "/en/dooh/",
      "x-default": "/es/dooh/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/dooh/",
    siteName: "Flame Analytics",
    title: "Medición DOOH · Retail Media · Flame Analytics",
    description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medición DOOH · Retail Media · Flame Analytics",
    description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas.",
  },
};

const DOOH_FAQS: FaqItem[] = [
  {
    q: "¿Qué es la medición de audiencia DOOH?",
    a: "Es medir cuántas personas ven realmente cada pantalla de publicidad digital fuera del hogar (DOOH, digital out of home), en lugar de estimarlo. En un centro comercial o una tienda significa saber cuántas personas pasaron por delante de cada pantalla en cada momento del día, cuánto tiempo se quedaron frente a ella y cuántas visitaron después la tienda anunciada. Las marcas que invierten en retail media ya no aceptan estimaciones: quieren audiencia verificada. Flame la mide con analítica de vídeo sobre tu red de cámaras, con datos agregados y anonimizados.",
  },
  {
    q: "¿Qué métricas de retail media mide Flame en cada pantalla?",
    a: "Las que piden hoy las marcas premium, por campaña, pantalla y zona: impresiones reales (cuántas personas hubo delante de cada pantalla en cada momento del día), tipología de cliente (distribución por género y franja de edad, agregada y anonimizada), dwell time y atención (tiempo medio frente a la pantalla y porcentaje de personas con atención efectiva) y drive-to-store (visitas incrementales a la tienda anunciada entre expuestos y no expuestos). Al cierre de cada campaña recibes un informe listo para enviar al anunciante con los resultados clave por pantalla y zona.",
  },
  {
    q: "¿Cómo demuestro a una marca que su campaña DOOH ha generado visitas?",
    a: "Con el drive-to-store. Flame compara las visitas a la tienda anunciada entre las personas expuestas a la pantalla y las que no lo estuvieron, y así aísla las visitas incrementales que genera la campaña. Además puedes comparar tráfico y conversión en los periodos antes y después de la campaña, por zona o por tienda. Es el cierre del círculo que pide cualquier anunciante: no solo cuántas personas vieron el anuncio, sino cuántas entraron después.",
  },
  {
    q: "¿Cómo me ayuda a vender mejor mi inventario de pantallas?",
    a: "Pasas de vender pantallas a vender audiencias. Con audiencia auditada, tu rate card deja de apoyarse en estimaciones y refleja el dato real que entregas. Las marcas premium piden impresiones reales, perfil de audiencia y drive-to-store; si tu rate card no los incluye, tu inventario compite como relleno. Con esos datos por campaña, pantalla y zona puedes justificar el precio de cada pantalla y demostrar el ROI a marcas y agencias.",
  },
  {
    q: "¿Necesito instalar hardware nuevo o cambiar mi CMS de cartelería digital?",
    a: "Normalmente no. Flame funciona sobre tu red de cámaras IP actual: su tecnología Hypersensor se conecta a los flujos de vídeo por protocolo RTSP y es compatible con las principales marcas, como Axis, Hikvision, Dahua, Bosch y Hanwha, aunque el resultado depende de la calidad, la ubicación y la calibración de las cámaras. Tampoco sustituye a tu CMS de cartelería digital ni a tu plataforma DOOH: es una capa de analítica independiente del hardware y del CMS que se integra con los sistemas que ya usas, y puedes exportar los datos por API a herramientas como Power BI, Tableau o Looker.",
  },
  {
    q: "¿Es compatible con el RGPD? ¿Usa reconocimiento facial?",
    a: "Sí, es compatible con el RGPD y no usa reconocimiento facial. Flame no utiliza datos biométricos ni identifica a nadie: extrae datos analíticos de los flujos de vídeo y descarta las imágenes originales, y ningún vídeo se almacena fuera de tu sistema de seguridad. Lo que recibes son datos agregados y anonimizados, que puedes compartir con tus anunciantes sin exponer información personal.",
  },
];

const cfg: UseCaseConfig = {
  metaTitle: "DOOH · Flame Analytics",
  metaDescription: "Medición de audiencia DOOH y retail media auditable.",
  heroTitle: "Medición DOOH",
  heroBgImage: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/landings/dooh-hero-v5.webp",
  heroBgPosition: "center center",
  heroSub: "Convierte tus pantallas digitales en un negocio retail media real. Flame mide la audiencia que pasa delante de cada pantalla, demuestra el ROI a las marcas y te da los reportes que necesitas para compartir el dato real con tus anunciantes. La misma rigurosidad que pide hoy el digital, aplicada al mundo físico.",
  heroBullets: ["90+ clientes B2B", "12 países", "Sobre tu red de cámaras", "Sin reconocimiento facial"],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Dashboard de medición DOOH de Flame Analytics",
  bigSectionTitle: "Del playlist del CMS al impression",
  bigSectionTitleHl: "real",
  bigSectionPara1: "Los retailers y marcas que invierten en retail media ya no aceptan estimaciones. Quieren saber cuántas personas estuvieron frente a cada pantalla, con qué perfil y cuántas visitaron después la tienda anunciada.",
  bigSectionPara2: "Flame convierte tu red de cámaras en una capa de medición auditable para tu inventario DOOH. Sin hardware adicional, sin reconocimiento facial, con datos agregados y anonimizados bajo GDPR, e integrable con los principales CMS de señalética y plataformas DOOH. Así, el centro deja de vender impresiones estimadas para vender audiencia verificada.",
  bigSectionBullets: ["Impresiones reales", "Drive to store", "Datos demográficos anonimizados", "Informes y medición de campañas"],
  benefitsTitle: "de medir tu DOOH",
  benefitsTitleHl: "Beneficios",
  benefitsSub: "Pasa de vender pantallas a vender audiencias. La diferencia entre un programa retail media que escala y un escaparate digital infrautilizado está en si puedes demostrar el dato.",
  benefits: [
    { icon: "trending",    title: "Aumenta el precio de tu inventario",         desc: "Vende con audiencia auditada, no con estimación. Tu rate card deja de ir al alza de la inflación para ir al alza del dato real que estás entregando." },
    { icon: "convert",     title: "Demuestra ROI a marcas y agencias",          desc: "Medir visitas, tiempo de permanencia y movimiento entre zonas. Comparar tráfico y conversión en períodos pre/post campaña por zona o tienda." },
    { icon: "integration", title: "Conecta con DOOH y tu CMS",                  desc: "Capa de analytics independiente del hardware y el CMS. Complementamos cualquier stack DOOH e integramos con los sistemas que ya utilizas." },
    { icon: "privacy",     title: "Sin reconocimiento facial · RGPD por diseño", desc: "Sin reconocimiento facial, sin uso de datos biométricos, cumpliendo normativa de privacidad de datos como RGPD." },
  ],
  metricsTitle: "Las métricas que necesitas",
  metricsTitleHl: "tener",
  metricsSub: "Las marcas premium piden estos datos. Si tu rate card no los entrega, te quedas en el inventario de relleno. Flame los mide y los reporta por campaña, pantalla y zona.",
  metrics: [
    { icon: "eye",          title: "Medición de impresiones reales", desc: "Cuántas personas hubo realmente delante de cada pantalla en cada momento del día. Sin estimaciones." },
    { icon: "demographics", title: "Tipología de cliente",           desc: "Distribución por género y franja de edad por pantalla. Datos agregados y anonimizados, listos para reportar con total precisión." },
    { icon: "dwell",        title: "Dwell time y atención",          desc: "Tiempo medio frente a la pantalla y porcentaje de personas con atención efectiva. Calidad de impresión, no solo cantidad." },
    { icon: "convert",      title: "Drive-to-store y lift",          desc: "Visitas incrementales a la tienda anunciada entre expuestos vs no expuestos. El cierre del círculo que cualquier anunciante pide." },
    { icon: "reports",      title: "Informes por campañas",          desc: "Informe listo para enviar tras cada campaña, con los resultados clave por pantalla y zona." },
  ],
  testimonialsIdx: [6, 3, 2],
  faqs: DOOH_FAQS,
  ctaStripBold: "¿Quieres convertir tus pantallas en un negocio retail media?",
  ctaStripLight: "Auditoría gratuita del potencial DOOH de tu centro. 30 minutos.",
};

export default function DoohES() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/dooh/" />;
}
