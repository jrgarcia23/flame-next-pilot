import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { RETAIL_B_BASE } from "@/app/es/preview-sectores/retail-b/page";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT B2] Retail · casos de uso lista · Flame",
  robots: { index: false, follow: false },
};

// Variante LIST: 2 columnas, filas con icono + título + descripción a una línea + flecha.
const cfg: SectorConfig = { ...RETAIL_B_BASE, useCasesLayout: "list" };

export default function PreviewRetailBList() {
  return (
    <>
      <PreviewBanner label="Retail · Opción B2 (lista: icono + título + desc 1 línea, 2 columnas)" />
      <SectorTemplate cfg={cfg} enHref="/en/solution-for-retail-sector/" />
    </>
  );
}
