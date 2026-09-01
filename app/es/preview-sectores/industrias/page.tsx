import type { Metadata } from "next";
import PreviewBanner from "@/components/PreviewBanner";
import { CtaStyles } from "@/components/templates/SiteChrome";
import SectorUseCases, { UCItem } from "@/components/templates/SectorUseCases";
import { RETAIL_CFG, SUPERMERCADOS_CFG, HOTELES_CFG, ESPACIOS_CFG, BANCOS_CFG, TRANSPORTE_CFG } from "@/lib/sector-preview-configs";
import { RETAIL_CFG_EN, SUPERMERCADOS_CFG_EN, HOTELES_CFG_EN, ESPACIOS_CFG_EN, BANCOS_CFG_EN, TRANSPORTE_CFG_EN, CENTROS_CFG_EN } from "@/lib/sector-configs-en";
import { CENTROS_CFG } from "@/app/es/solucion-para-centros-comerciales/page";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[VERIFICACIÓN] Casos de uso por industria (ES+EN) · Flame",
  robots: { index: false, follow: false },
};

const ROWS: { label: string; lang: "es" | "en"; cfg: SectorConfig }[] = [
  { label: "Retail · ES", lang: "es", cfg: RETAIL_CFG },
  { label: "Supermercados · ES", lang: "es", cfg: SUPERMERCADOS_CFG },
  { label: "Hoteles · ES", lang: "es", cfg: HOTELES_CFG },
  { label: "Espacios públicos · ES", lang: "es", cfg: ESPACIOS_CFG },
  { label: "Banca · ES", lang: "es", cfg: BANCOS_CFG },
  { label: "Transporte y aeropuertos · ES", lang: "es", cfg: TRANSPORTE_CFG },
  { label: "Centros comerciales · ES", lang: "es", cfg: CENTROS_CFG },
  { label: "Retail · EN", lang: "en", cfg: RETAIL_CFG_EN },
  { label: "Supermarkets · EN", lang: "en", cfg: SUPERMERCADOS_CFG_EN },
  { label: "Hospitality · EN", lang: "en", cfg: HOTELES_CFG_EN },
  { label: "Public venues · EN", lang: "en", cfg: ESPACIOS_CFG_EN },
  { label: "Banking · EN", lang: "en", cfg: BANCOS_CFG_EN },
  { label: "Transport & airports · EN", lang: "en", cfg: TRANSPORTE_CFG_EN },
  { label: "Shopping malls · EN", lang: "en", cfg: CENTROS_CFG_EN },
];

export default function VerificacionIndustrias() {
  return (
    <>
      <CtaStyles />
      <PreviewBanner label="Verificación · módulo Casos de uso en las 14 industrias (ES+EN)" />
      <section className="py-14" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <h1 className="text-[clamp(28px,3.2vw,42px)] font-normal" style={{ letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
            Casos de uso por industria · verificación
          </h1>
          <p className="mt-3 text-[clamp(15px,1.2vw,17px)]" style={{ color: "rgb(255 255 255 / 0.72)", maxWidth: "70ch" }}>
            Diseño construido para las 7 industrias en ES y EN (no publicado en vivo: las páginas siguen con el bloque de productos). Aquí el módulo de cada una, en su idioma.
          </p>
        </div>
      </section>
      {ROWS.map((r) => (
        <div key={r.label}>
          <div style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
            <div className="flame-container" style={{ paddingTop: 14, paddingBottom: 14 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "var(--color-navy)", letterSpacing: "-0.01em" }}>{r.label}</span>
              <span style={{ marginLeft: 12, fontSize: 13.5, color: "var(--color-ink-3)" }}>{(r.cfg.useCases?.length || 0)} casos de uso</span>
            </div>
          </div>
          <SectorUseCases
            layout="numbers"
            eyebrow={r.cfg.useCasesEyebrow}
            title={r.cfg.useCasesTitle}
            sub={r.cfg.useCasesSub}
            items={(r.cfg.useCases || []) as UCItem[]}
            currentLang={r.lang}
            sectionClassName="py-12"
          />
        </div>
      ))}
    </>
  );
}
