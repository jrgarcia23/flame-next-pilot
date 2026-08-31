import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { RETAIL_B_BASE } from "@/app/es/preview-sectores/retail-b/page";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT B3] Retail · casos de uso chips · Flame",
  robots: { index: false, follow: false },
};

// Variante CHIPS: píldoras icono + título en una sola fila que envuelve. Máxima compacidad.
const cfg: SectorConfig = { ...RETAIL_B_BASE, useCasesLayout: "chips" };

export default function PreviewRetailBChips() {
  return (
    <>
      <PreviewBanner label="Retail · Opción B3 (chips: icono + título, píldoras)" />
      <SectorTemplate cfg={cfg} enHref="/en/solution-for-retail-sector/" />
    </>
  );
}
