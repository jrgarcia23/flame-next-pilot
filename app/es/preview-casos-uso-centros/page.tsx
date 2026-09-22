import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
import { CENTROS_CFG } from "@/app/es/solucion-para-centros-comerciales/page";

// PREVIEW (noindex). Parte de la página REAL de Centros Comerciales y SOLO cambia
// el bloque "Productos integrales" por el módulo "Casos de uso" (en su misma posición,
// tras los casos de éxito). Todo lo demás queda igual: bento de capacidades, pain
// points, casos de éxito, testimonios, FAQ y demo. No afecta a la página real.
export const metadata: Metadata = {
  title: "Preview · Casos de uso Centros · Flame",
  robots: { index: false, follow: false },
};

export default async function PreviewCasosUsoCentros() {
  const caseStudies = await selectCaseCards({ sector: "centros-comerciales" });
  return (
    <SectorTemplate
      cfg={{
        ...CENTROS_CFG,
        caseStudies,
        showUseCases: true,        // activa el módulo de casos de uso
        hideProducts: true,        // quita el bloque "Productos integrales"
        hideTestimonials: true,    // quita "Las mejores marcas hablan de nosotros"
        useCasesBeforeCases: true, // casos de uso bajo el CTA; casos de éxito justo debajo de los casos de uso
        useCasesLayout: "numbers",
        useCasesEyebrow: "Casos de uso",
      }}
      enHref="/en/solution-for-shopping-malls/"
    />
  );
}
