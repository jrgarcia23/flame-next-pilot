import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { RETAIL_B_BASE } from "@/app/es/preview-sectores/retail-b/page";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT B1] Retail · casos de uso compactos · Flame",
  robots: { index: false, follow: false },
};

// Variante COMPACT: 3 columnas, icono + título + flecha (sin descripción). Ocupa ~1/3.
const cfg: SectorConfig = { ...RETAIL_B_BASE, useCasesLayout: "compact" };

export default function PreviewRetailBCompact() {
  return (
    <>
      <PreviewBanner label="Retail · Opción B1 (compacto: icono + título, 3 columnas)" />
      <SectorTemplate cfg={cfg} enHref="/en/solution-for-retail-sector/" />
    </>
  );
}
