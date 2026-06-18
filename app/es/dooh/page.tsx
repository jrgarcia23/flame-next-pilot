import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

// ──────────────────────────────────────────────────────────────────────────
// DOOH · Caso de uso (DRAFT — NO indexable, no enlazado desde el header).
// Para validar con JR antes de publicar. Cuando esté OK:
//   1) Quitar el robots: { index: false } de aquí debajo
//   2) Añadir el link en el header/footer si procede
//   3) Confirmar/elegir el hero image final (ahora usa el de malls)
// ──────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Medición DOOH · Retail Media para Centros Comerciales · Flame Analytics",
  description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas. Métricas auditables, sin reconocimiento facial, sobre tu infraestructura de cámaras actual.",
  robots: { index: false, follow: false },
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
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medición DOOH · Retail Media · Flame Analytics",
    description: "Mide la audiencia real de tus pantallas DOOH, monetiza tu inventario y demuestra el ROI a las marcas.",
    images: ["/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "DOOH · Flame Analytics",
  metaDescription: "Mide la audiencia real de tus pantallas DOOH y monetiza tu inventario con datos auditables.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Mide la audiencia real de tus pantallas DOOH y monetiza tu inventario",
  heroSub: "La publicidad digital lleva años siendo medible. La publicidad en pantallas físicas (DOOH), no. Flame da a centros comerciales, retailers y media owners la capa de medición que les falta para vender su inventario a marcas premium: impresiones reales, alcance único, frecuencia, demografía y atribución a tienda. Auditable. Sobre tu infraestructura de cámaras actual. Sin reconocimiento facial.",
  pillars: [
    { title: "Mide",      desc: "Audiencia real delante de cada pantalla en tiempo real. Impresiones, alcance único, frecuencia, dwell time y demografía anonimizada (edad y género).", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Monetiza",  desc: "Empaqueta y vende tu inventario con métricas que las marcas y agencias entienden y exigen. Misma rigurosidad que digital, en el mundo físico.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Demuestra", desc: "Conecta cada campaña con el comportamiento real del visitante: ¿quién la vio?, ¿cuántas veces?, ¿cuántos visitaron después la tienda anunciada?", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-malls.png",
      imgAlt: "Convierte tus pantallas en un media asset medible",
      title: "Convierte tus pantallas en un media asset",
      titleHl: "medible",
      bullets: [
        "Audience impressions reales delante de cada pantalla, no estimaciones del CMS. La métrica que cualquier comprador de retail media exige hoy.",
        "Alcance único, frecuencia, dwell time, share of voice y mix demográfico (edad y género) por pantalla, zona o circuito.",
        "Datos agregados y anonimizados por diseño. Sin reconocimiento facial, sin identificación de individuos. RGPD por diseño.",
        "Reportes listos para tu media kit y para enviar a anunciantes y agencias tras cada campaña.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-malls.png",
      imgAlt: "Demuestra el ROI a las marcas",
      title: "Demuestra el ROI real a las marcas y a sus",
      titleHl: "agencias",
      bullets: [
        "Drive-to-store: visitas adicionales a una tienda concreta entre los visitantes expuestos a la campaña frente a los no expuestos.",
        "Atribución de campaña: conecta la creatividad emitida, el spot, la pantalla y la audiencia con el comportamiento posterior dentro del centro.",
        "Brand uplift y repetición: cuántas veces ha visto un mismo visitante la campaña a lo largo de su recorrido por el centro.",
        "Lift contra grupos de control: replica el modelo de medición que las marcas exigen ya en sus campañas digitales y de retail media.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-malls.png",
      imgAlt: "Despliegue sobre la infraestructura existente",
      title: "Despliegue rápido sobre tu infraestructura",
      titleHl: "actual",
      bullets: [
        "Funciona con tu red de cámaras existente. No te obligamos a cambiar de hardware ni a doblar la inversión que ya hiciste en VMS.",
        "Procesamiento on-site cuando lo necesitas, cloud cuando aporta. Tú decides dónde viven los datos.",
        "Integración con tu CMS de señalética (Broadsign, BrightSign, Scala, Korbyt…) y con plataformas de pDOOH (Hivestack/Perion, VIOOH, Place Exchange).",
        "Equipo de soporte y consultoría retail media en español, no soporte enlatado en inglés a través de un ticket.",
      ],
    },
  ],
  productsTitle: "Tres productos para construir tu",
  productsTitleHl: "retail media network",
  productsSub: "La capa de medición de Flame se apoya en tres productos que ya están desplegados en 90+ clientes en 12 países. La diferencia para DOOH está en cómo los combinamos y en los reportes que entregamos a las marcas.",
  productsBullets: [
    "Mide el inventario y la audiencia",
    "Demuestra el impacto de cada campaña",
    "Activa programas de loyalty y first-party data",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc: "Audiencia real, dwell time, ocupación y demografía anonimizada delante de cada pantalla. La base de tus impresiones auditables y de tu rate card.",
      href: "/es/analitica-trafico/",
      cta: "Ver Traffic",
      title: "Traffic",
      img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc: "Recorrido y comportamiento de los visitantes expuestos a una campaña. Drive-to-store, frecuencia y trayectorias para demostrar el lift a las marcas.",
      href: "/es/recorrido-del-cliente/",
      cta: "Ver Customer Journey",
      title: "Customer Journey",
      img: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/Group-1.png",
      name: "Connect",
      desc: "First-party data del visitante vía WiFi de invitados y loyalty del centro. Activa campañas DOOH personalizadas y reactiva a los expuestos por mobile o email.",
      href: "/es/connect/",
      cta: "Ver Connect",
      title: "Connect",
      img: "/wp-content/uploads/2026/01/Group-1.png",
    },
  ],
  testimonialsIdx: [0, 1, 7, 8],
  faqs: getFaqs("shopping-malls", "es"),
  ctaStripBold: "¿Quieres convertir tus pantallas en un negocio retail media?",
  ctaStripLight: "Auditoría gratuita del potencial DOOH de tu centro. 30 min.",
};

export default function DoohSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/dooh/" />;
}
