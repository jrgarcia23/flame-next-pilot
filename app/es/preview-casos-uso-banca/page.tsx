import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
import { BANCOS_CFG } from "@/lib/sector-preview-configs";

// PREVIEW (noindex). Banca con el módulo "Casos de uso" (matriz JR) en vez de productos.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Banca · Flame",
  robots: { index: false, follow: false },
};

export default async function PreviewCasosUsoBanca() {
  const caseStudies = await selectCaseCards({ sector: "banca" });
  return (
    <SectorTemplate
      cfg={{
        ...BANCOS_CFG,
        caseStudies,
        showUseCases: true,
        hideProducts: true,
        hideTestimonials: true,
        useCasesBeforeCases: true,
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/banking/"
    />
  );
}
