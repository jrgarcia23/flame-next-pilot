import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { ESPACIOS_CFG } from "@/lib/sector-preview-configs";

// PREVIEW (noindex). Espacios Públicos con el módulo "Casos de uso" (matriz JR) en vez de productos.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Espacios Públicos · Flame",
  robots: { index: false, follow: false },
};

export default function PreviewCasosUsoEspacios() {
  return (
    <SectorTemplate
      cfg={{
        ...ESPACIOS_CFG,
        showUseCases: true,
        hideProducts: true,
        hideTestimonials: true,
        useCasesBeforeCases: true,
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/public-venues/"
    />
  );
}
