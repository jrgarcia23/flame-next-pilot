import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
import { SUPERMERCADOS_CFG } from "@/lib/sector-preview-configs";

// PREVIEW (noindex). Supermercados con el módulo "Casos de uso" (matriz JR) en vez de productos.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Supermercados · Flame",
  robots: { index: false, follow: false },
};

export default async function PreviewCasosUsoSuper() {
  const caseStudies = await selectCaseCards({ sector: "supermercados" });
  return (
    <SectorTemplate
      cfg={{
        ...SUPERMERCADOS_CFG,
        caseStudies,
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
