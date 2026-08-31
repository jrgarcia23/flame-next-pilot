import type { Metadata } from "next";
import PreviewBanner from "@/components/PreviewBanner";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import SectorUseCases, { UCLayout } from "@/components/templates/SectorUseCases";
import { RETAIL_USE_CASES } from "@/app/es/preview-sectores/retail-b/page";

export const metadata: Metadata = {
  title: "[DRAFT B] Casos de uso · opciones de diseño · Flame",
  robots: { index: false, follow: false },
};

const OPTS: { name: string; layout: UCLayout; note: string }[] = [
  { name: "Pestañas (interactivo)", layout: "tabs", note: "fila de pestañas + panel del caso seleccionado (clicable)" },
  { name: "Timeline", layout: "timeline", note: "recorrido vertical con nodos conectados por un rail" },
  { name: "Índice (líneas guía)", layout: "directory", note: "2 columnas tipo menú con líneas punteadas" },
  { name: "Editorial (números)", layout: "numbers", note: "2 columnas con números grandes y separadores" },
  { name: "Filas", layout: "rows", note: "ancho completo · líneas finas, sin cajas" },
  { name: "Compacto", layout: "compact", note: "3 columnas · icono + título + flecha" },
];

export default function PreviewRetailBOpciones() {
  return (
    <>
      <CtaStyles />
      <PreviewBanner label="Retail · Opciones de diseño del módulo Casos de uso" />
      <SiteHeader enHref="/en/solution-for-retail-sector/" currentLang="es" />

      <section className="py-16" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <span style={{ display: "inline-block", fontFamily: "var(--font-body)", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 12 }}>Draft · para decidir</span>
          <h1 className="text-[clamp(30px,3.6vw,46px)] font-normal" style={{ letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)", maxWidth: "22ch" }}>
            Casos de uso: opciones de diseño
          </h1>
          <p className="mt-4 text-[clamp(16px,1.2vw,18px)] leading-[1.6]" style={{ color: "rgb(255 255 255 / 0.72)", maxWidth: "62ch" }}>
            Seis maneras de presentar el mismo bloque de casos de uso, de más compacta a más completa. Todas usan los iconos reales del menú y enlazan a las páginas de caso de uso. Elige una.
          </p>
        </div>
      </section>

      {OPTS.map((o, i) => (
        <div key={o.layout}>
          <div style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
            <div className="flame-container" style={{ paddingTop: 18, paddingBottom: 18, display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--color-accent-deep)" }}>Opción {i + 1}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 20, color: "var(--color-navy)", letterSpacing: "-0.01em" }}>{o.name}</span>
              <span style={{ fontSize: 14.5, color: "var(--color-ink-3)" }}>{o.note}</span>
            </div>
          </div>
          <SectorUseCases
            layout={o.layout}
            items={RETAIL_USE_CASES}
            currentLang="es"
            showHeader={false}
            sectionClassName="py-12"
          />
        </div>
      ))}

      <SiteFooter currentLang="es" />
    </>
  );
}
