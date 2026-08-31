import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { RETAIL_CFG } from "@/lib/sector-preview-configs";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT A] Retail · capacidades clicables · Flame",
  robots: { index: false, follow: false },
};

// OPCIÓN A: las capacidades del bento enlazan a su página de caso de uso (donde existe)
// y el bloque "Productos" se mantiene, reencabezado como "la plataforma que lo hace posible".
const HREF_A: Record<string, string> = {
  "Afluencia y flujo en tienda": "/es/conteo-personas/",
  "Dotación de personal": "/es/gestion-ocupacion/",
  "Conversión (visita → compra)": "/es/analitica-conversion/",
  "Comportamiento y mapas de calor": "/es/comportamiento-del-cliente/",
  "Captación y fidelización por WiFi": "/es/marketing-wifi-para-invitados/",
};

const cfg: SectorConfig = {
  ...RETAIL_CFG,
  capabilities: (RETAIL_CFG.capabilities || []).map((c) => (HREF_A[c.title] ? { ...c, href: HREF_A[c.title] } : c)),
  productsTitle: "La plataforma que lo",
  productsTitleHl: "hace posible",
  productsSub: "Las capacidades de arriba se apoyan en la plataforma de Flame: tres productos que combinas según lo que necesites medir y activar.",
};

export default function PreviewRetailA() {
  return (
    <>
      <PreviewBanner label="Retail · Opción A (capacidades clicables + productos como plataforma)" />
      <SectorTemplate cfg={cfg} enHref="/en/solution-for-retail-sector/" />
    </>
  );
}
