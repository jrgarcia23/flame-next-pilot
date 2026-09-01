import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { RETAIL_CFG } from "@/lib/sector-preview-configs";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT B] Retail · módulo casos de uso · Flame",
  robots: { index: false, follow: false },
};

// OPCIÓN B: se sustituye "Productos" por un módulo "Casos de uso para retail" con los ICONOS
// REALES del menú (iconImg) y enlaces a las páginas de caso de uso. Base compartida por las
// variantes de layout (compact / list / chips).
export const RETAIL_USE_CASES: NonNullable<SectorConfig["useCases"]> = [
  { img: "/wp-content/uploads/2025/09/people_counting1.png",      title: "Conteo de personas",             desc: "Mide con precisión cuánta gente entra y cómo se reparte por franjas y por zonas de la tienda.",     href: "/es/conteo-personas/" },
  { img: "/wp-content/uploads/2025/09/Conversion_analytics1.png", title: "Analítica de conversión",         desc: "Cruza el tráfico con tu TPV para saber qué porcentaje de visitas acaba comprando en cada tienda.",   href: "/es/analitica-conversion/" },
  { img: "/wp-content/uploads/2025/09/Customer_bahavior1.png",    title: "Comportamiento y mapas de calor", desc: "Trayectorias, tiempos de permanencia y zonas frías y calientes para mejorar el layout y la señalética.", href: "/es/comportamiento-del-cliente/" },
  { img: "/wp-content/uploads/2025/09/road-route-map-icon.png",   title: "Recorrido del cliente",           desc: "Reconstruye el recorrido completo del visitante, desde el escaparate hasta la caja.",                 href: "/es/recorrido-del-cliente/" },
  { img: "/wp-content/uploads/2025/09/Queue1.png",                title: "Gestión de colas",               desc: "Mide la espera en caja y abre nuevos puestos antes de que el cliente abandone la compra.",           href: "/es/analitica-de-colas/" },
  { img: "/wp-content/uploads/2025/09/guest_wifi1.png",           title: "Marketing WiFi",                 desc: "Convierte el WiFi de tienda en captación de contactos y campañas de fidelización segmentadas.",       href: "/es/marketing-wifi-para-invitados/" },
];

export const RETAIL_B_BASE: SectorConfig = {
  ...RETAIL_CFG,
  showUseCases: true,
  hideProducts: true,
  hideTestimonials: true,
  useCasesBeforeCases: true,
  useCasesLayout: "numbers",
  useCasesEyebrow: "Casos de uso",
  useCasesTitle: "Un caso de uso para cada reto de tu tienda",
  useCasesSub: "Tráfico, conversión, colas, ocupación, comportamiento o WiFi: sea cual sea la prioridad de tu tienda, Flame ya tiene un caso de uso para resolverla. Elige el tuyo y descubre cómo.",
  useCases: RETAIL_USE_CASES,
};

export default function PreviewRetailB() {
  return (
    <>
      <PreviewBanner label="Retail · Opción B DEFINITIVA (casos de uso editorial · números)" />
      <SectorTemplate cfg={RETAIL_B_BASE} enHref="/en/solution-for-retail-sector/" />
    </>
  );
}
