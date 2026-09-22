import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
import { RETAIL_CFG } from "@/lib/sector-preview-configs";

// PREVIEW (noindex). Retail con el módulo "Casos de uso" (matriz JR) en vez de productos.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Retail · Flame",
  robots: { index: false, follow: false },
};

export default async function PreviewCasosUsoRetail() {
  const caseStudies = await selectCaseCards({ sector: "retail" });
  return (
    <SectorTemplate
      cfg={{
        ...RETAIL_CFG,
        caseStudies,
        showUseCases: true,
        hideProducts: true,
        hideTestimonials: true,
        useCasesBeforeCases: true,
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/solution-for-retail-sector/"
    />
  );
}
