import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { RETAIL_CFG, IC } from "@/lib/sector-preview-configs";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT B] Retail · módulo casos de uso · Flame",
  robots: { index: false, follow: false },
};

// OPCIÓN B: se sustituye el bloque "Productos" por un módulo "Casos de uso para retail"
// con tarjetas que enlazan a las páginas reales de caso de uso (patrón V-Count / FootfallCam).
const cfg: SectorConfig = {
  ...RETAIL_CFG,
  hideProducts: true,
  hideTestimonials: true,
  useCasesBeforeCases: true,
  useCasesEyebrow: "Casos de uso",
  useCasesTitle: "Casos de uso para retail",
  useCasesSub: "Cada necesidad de tu tienda, resuelta con una capacidad concreta de Flame. Entra en el caso de uso que te interesa.",
  useCases: [
    { svg: IC.people, title: "Conteo de personas", desc: "Mide con precisión cuánta gente entra y cómo se reparte por franjas y por zonas de la tienda.", href: "/es/conteo-personas/" },
    { svg: IC.cart, title: "Analítica de conversión", desc: "Cruza el tráfico con tu TPV para saber qué porcentaje de visitas acaba comprando en cada tienda.", href: "/es/analitica-conversion/" },
    { svg: IC.heatmap, title: "Comportamiento y mapas de calor", desc: "Trayectorias, tiempos de permanencia y zonas frías y calientes para mejorar el layout y la señalética.", href: "/es/comportamiento-del-cliente/" },
    { svg: IC.share, title: "Recorrido del cliente", desc: "Reconstruye el recorrido completo del visitante, desde el escaparate hasta la caja.", href: "/es/recorrido-del-cliente/" },
    { svg: IC.clock, title: "Gestión de colas", desc: "Mide la espera en caja y abre nuevos puestos antes de que el cliente abandone la compra.", href: "/es/analitica-de-colas/" },
    { svg: IC.wifi, title: "Marketing WiFi", desc: "Convierte el WiFi de tienda en captación de contactos y campañas de fidelización segmentadas.", href: "/es/marketing-wifi-para-invitados/" },
  ],
};

export default function PreviewRetailB() {
  return (
    <>
      <PreviewBanner label="Retail · Opción B (módulo Casos de uso en lugar de Productos)" />
      <SectorTemplate cfg={cfg} enHref="/en/solution-for-retail-sector/" />
    </>
  );
}
