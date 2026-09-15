import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { CENTROS_CFG } from "@/app/es/solucion-para-centros-comerciales/page";

// PREVIEW (noindex). Parte de la página REAL de Centros Comerciales y SOLO cambia
// el bloque "Productos integrales" por el módulo "Casos de uso" (en su misma posición,
// tras los casos de éxito). Todo lo demás queda igual: bento de capacidades, pain
// points, casos de éxito, testimonios, FAQ y demo. No afecta a la página real.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Centros · Flame",
  robots: { index: false, follow: false },
};

export default function PreviewCasosUsoCentros() {
  return (
    <SectorTemplate
      cfg={{
        ...CENTROS_CFG,
        showUseCases: true,        // activa el módulo de casos de uso
        hideProducts: true,        // quita el bloque "Productos integrales"
        useCasesBeforeCases: false, // los casos de uso ocupan el sitio de los productos (tras los casos de éxito)
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/solution-for-shopping-malls/"
    />
  );
}
