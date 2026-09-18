import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SUPERMERCADOS_CFG } from "@/lib/sector-preview-configs";

// PREVIEW (noindex). Supermercados con el módulo "Casos de uso" (matriz JR) en vez de productos.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Supermercados · Flame",
  robots: { index: false, follow: false },
};

export default function PreviewCasosUsoSuper() {
  return (
    <SectorTemplate
      cfg={{
        ...SUPERMERCADOS_CFG,
        showUseCases: true,
        hideProducts: true,
        hideTestimonials: true,
        useCasesBeforeCases: true,
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/supermarkets/"
    />
  );
}
