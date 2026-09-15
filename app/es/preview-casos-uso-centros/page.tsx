import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { UC_COMMON } from "@/lib/sector-preview-configs";
import { CENTROS_CFG } from "@/app/es/solucion-para-centros-comerciales/page";

// PREVIEW (noindex). Centros Comerciales con el módulo "Casos de uso" en lugar del
// bento de productos/capacidades, conservando la fila de confianza (hideCaps).
// No afecta a la página real /es/solucion-para-centros-comerciales/.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Centros · Flame",
  robots: { index: false, follow: false },
};

export default function PreviewCasosUsoCentros() {
  return (
    <SectorTemplate
      cfg={{ ...CENTROS_CFG, ...UC_COMMON, hideCaps: true }}
      enHref="/en/solution-for-shopping-malls/"
    />
  );
}
