import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { TRANSPORTE_CFG } from "@/lib/sector-preview-configs";

// PREVIEW (noindex). Transporte y Aeropuertos con el módulo "Casos de uso" (matriz JR) en vez de productos.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Transporte y Aeropuertos · Flame",
  robots: { index: false, follow: false },
};

export default function PreviewCasosUsoTransporte() {
  return (
    <SectorTemplate
      cfg={{
        ...TRANSPORTE_CFG,
        showUseCases: true,
        hideProducts: true,
        hideTestimonials: true,
        useCasesBeforeCases: true,
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/transport-and-airports/"
    />
  );
}
