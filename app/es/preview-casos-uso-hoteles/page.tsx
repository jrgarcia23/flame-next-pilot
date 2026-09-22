import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
import { HOTELES_CFG } from "@/lib/sector-preview-configs";

// PREVIEW (noindex). Hoteles con el módulo "Casos de uso" (3, según la matriz de JR)
// en lugar del bloque de productos. Mismo patrón que el preview de Centros.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Hoteles · Flame",
  robots: { index: false, follow: false },
};

export default async function PreviewCasosUsoHoteles() {
  const caseStudies = await selectCaseCards({ sector: "hoteles" });
  return (
    <SectorTemplate
      cfg={{
        ...HOTELES_CFG,
        caseStudies,
        showUseCases: true,
        hideProducts: true,
        hideTestimonials: true,
        useCasesBeforeCases: true,
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/hospitality/"
    />
  );
}
