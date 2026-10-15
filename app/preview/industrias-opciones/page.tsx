import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { INDUSTRIES, UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT] Soluciones para cualquier industria · opciones compactas · Flame Analytics",
  description: "Preview interno: propuestas compactas y estáticas para la sección de industrias de los casos de uso.",
  robots: { index: false, follow: false },
};

// Foto real de cabecera de cada página de sector (misma que usa la web)
const IMG: Record<string, string> = {
  "/es/solucion-para-centros-comerciales/": "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg",
  "/es/solucion-para-el-sector-retail/": "/wp-content/uploads/2026/01/Industries_Retail-1.jpg",
  "/es/supermercados/": "/wp-content/uploads/2026/01/Industries_Supermarket-1.jpg",
  "/es/espacios-publicos/": "/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg",
  "/es/hoteles/": "/wp-content/uploads/2026/01/Industries_Hospitality-1.jpg",
  "/es/banca/": "/wp-content/uploads/2026/01/Industries_Banking-1.jpg",
  "/es/transporte-y-aeropuertos/": "/wp-content/uploads/2026/01/Industries_Transport-1.jpg",
};

const t = UI.es;
const inds = INDUSTRIES;
const navy = { background: "var(--color-navy)", color: "white" } as const;
const glow = { background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.08), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.05), transparent 72%)" };

function Label({ id, name, note }: { id: string; name: string; note: string }) {
  return (
    <div style={{ background: "#fff8e1", borderTop: "2px dashed #e0a800", borderBottom: "2px dashed #e0a800", padding: "14px 0" }}>
      <div className="flame-container" style={{ display: "flex", gap: 16, alignItems: "baseline", flexWrap: "wrap" }}>
        <strong style={{ fontSize: 18, color: "#15163A" }}>Opción {id} · {name}</strong>
        <span style={{ fontSize: 14.5, color: "#5b5b6b" }}>{note}</span>
      </div>
    </div>
  );
}

const Title = ({ size = "clamp(30px,3vw,42px)" }: { size?: string }) => (
  <h2 className="font-normal" style={{ fontSize: size, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)", margin: 0 }}>
    {t.industriesTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.industriesTitleHl}</span>
  </h2>
);
const Sub = ({ style }: { style?: React.CSSProperties }) => (
  <p className="leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)", fontSize: "clamp(16px,1.15vw,18px)", margin: 0, ...style }}>{t.industriesSub}</p>
);

export default function IndustriasOpciones() {
  return (
    <main className="min-h-screen" style={{ background: "#fff" }}>
      <CtaStyles />
      <SiteHeader enHref="/en/people-counting/" currentLang="es" />

      {/* D (referencia) */}
      <Label id="D" name="Píldoras (referencia)" note="La que te gustó por tamaño. Está aquí para comparar alturas con las nuevas." />
      <section className="py-20 relative overflow-hidden" style={navy}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10">
          <div className="mx-auto text-center" style={{ maxWidth: 720, marginBottom: 40 }}><Title size="clamp(32px,3.4vw,48px)" /><Sub style={{ marginTop: 20 }} /></div>
          <div className="opt-d">
            {inds.map((it) => (
              <a key={it.href} href={it.href} className="opt-d-pill">
                <span className="opt-d-icon"><Icon name={it.icon} className="w-5 h-5" /></span>
                {it.title}
                <Icon name="arrow" className="w-3.5 h-3.5 opt-d-arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* E — barra segmentada */}
      <Label id="E" name="Barra segmentada" note="Una sola pieza dividida en 7 celdas iguales: icono arriba, nombre debajo. Al pasar el ratón la celda se ilumina. Muy ordenada." />
      <section className="py-16 relative overflow-hidden" style={navy}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10">
          <div className="opt-head"><Title /><Sub /></div>
          <div className="opt-e">
            {inds.map((it) => (
              <a key={it.href} href={it.href} className="opt-e-cell">
                <span className="opt-e-icon"><Icon name={it.icon} className="w-6 h-6" /></span>
                <span className="opt-e-name">{it.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* F — lista tipo menú en columnas */}
      <Label id="F" name="Menú en columnas" note="Título a la izquierda y los 7 sectores como lista de enlaces con icono en 2 columnas, como un menú desplegable. Lo más ligero." />
      <section className="py-16 relative overflow-hidden" style={navy}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10 opt-f">
          <div><Title /><Sub style={{ marginTop: 16 }} /></div>
          <ul className="opt-f-list">
            {inds.map((it) => (
              <li key={it.href}>
                <a href={it.href} className="opt-f-link">
                  <span className="opt-f-icon"><Icon name={it.icon} className="w-5 h-5" /></span>
                  <span className="opt-f-name">{it.title}</span>
                  <Icon name="arrow" className="w-4 h-4 opt-f-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* G — frase editorial con enlaces */}
      <Label id="G" name="Frase editorial" note="Los sectores escritos en grande, en la tipografía de titulares, como una frase con enlaces subrayados. Muy de marca, sin cajas." />
      <section className="py-16 relative overflow-hidden" style={navy}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10">
          <p className="opt-g-eyebrow">{t.industriesTitle} {t.industriesTitleHl.toLowerCase()}</p>
          <p className="opt-g-line">
            {inds.map((it, i) => (
              <span key={it.href}>
                <a href={it.href} className="opt-g-link">{it.title}</a>
                {i < inds.length - 1 && <span className="opt-g-sep"> / </span>}
              </span>
            ))}
          </p>
          <Sub style={{ marginTop: 22, maxWidth: 720 }} />
        </div>
      </section>

      {/* H — chips con foto */}
      <Label id="H" name="Chips con foto" note="Como la D, pero cada píldora lleva una miniatura redonda con la foto real del sector en lugar del icono. Compacta y más visual." />
      <section className="py-16 relative overflow-hidden" style={navy}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10">
          <div className="opt-head"><Title /><Sub /></div>
          <div className="opt-h">
            {inds.map((it) => (
              <a key={it.href} href={it.href} className="opt-h-chip">
                <span className="opt-h-img" style={{ backgroundImage: `url('${IMG[it.href]}')` }} />
                <span>{it.title}</span>
                <Icon name="arrow" className="w-3.5 h-3.5 opt-h-arrow" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter currentLang="es" />

      <style>{`
        .opt-head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 64px); align-items: end; margin-bottom: 36px; }
        @media (max-width: 900px) { .opt-head { grid-template-columns: 1fr; gap: 14px; } }
        /* D */
        .opt-d { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; max-width: 980px; margin: 0 auto; }
        .opt-d-pill { display: inline-flex; align-items: center; gap: 12px; padding: 12px 20px 12px 12px; border-radius: 999px; background: rgb(255 255 255 / 0.05); border: 1px solid rgb(255 255 255 / 0.12); color: #fff; font-size: 16.5px; font-weight: 600; transition: background 250ms ease, border-color 250ms ease; }
        .opt-d-pill:hover { background: rgb(49 177 248 / 0.14); border-color: rgb(49 177 248 / 0.5); }
        .opt-d-icon { display: inline-flex; width: 38px; height: 38px; align-items: center; justify-content: center; border-radius: 999px; background: rgb(49 177 248 / 0.15); color: var(--color-accent); }
        .opt-d-arrow { color: var(--color-accent); opacity: 0.7; }
        /* E */
        .opt-e { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); border: 1px solid rgb(255 255 255 / 0.14); border-radius: 18px; overflow: hidden; background: rgb(255 255 255 / 0.03); }
        .opt-e-cell { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 26px 10px; text-align: center; color: #fff; border-right: 1px solid rgb(255 255 255 / 0.12); transition: background 250ms ease; }
        .opt-e-cell:last-child { border-right: 0; }
        .opt-e-cell:hover { background: rgb(49 177 248 / 0.14); }
        .opt-e-icon { color: var(--color-accent); }
        .opt-e-name { font-size: 15.5px; font-weight: 600; line-height: 1.25; }
        @media (max-width: 1000px) { .opt-e { grid-template-columns: repeat(4, 1fr); } .opt-e-cell { border-bottom: 1px solid rgb(255 255 255 / 0.12); } .opt-e-cell:nth-child(4n) { border-right: 0; } }
        @media (max-width: 600px) { .opt-e { grid-template-columns: repeat(2, 1fr); } .opt-e-cell:nth-child(4n) { border-right: 1px solid rgb(255 255 255 / 0.12); } .opt-e-cell:nth-child(2n) { border-right: 0; } .opt-e-cell:last-child { grid-column: span 2; } }
        /* F */
        .opt-f { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(28px, 5vw, 80px); align-items: center; }
        .opt-f-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: 32px; }
        .opt-f-link { display: grid; grid-template-columns: 36px 1fr 20px; gap: 14px; align-items: center; padding: 14px 4px; border-bottom: 1px solid rgb(255 255 255 / 0.13); color: #fff; transition: padding 250ms ease, color 250ms ease; }
        .opt-f-link:hover { padding-left: 10px; color: var(--color-accent); }
        .opt-f-icon { display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; border-radius: 10px; background: rgb(49 177 248 / 0.14); color: var(--color-accent); }
        .opt-f-name { font-size: 17px; font-weight: 600; }
        .opt-f-arrow { color: var(--color-accent); opacity: 0.6; transition: transform 250ms ease, opacity 250ms ease; }
        .opt-f-link:hover .opt-f-arrow { transform: translateX(3px); opacity: 1; }
        @media (max-width: 900px) { .opt-f { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .opt-f-list { grid-template-columns: 1fr; } }
        /* G */
        .opt-g-eyebrow { font-size: 12.5px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-accent); margin: 0 0 18px; }
        .opt-g-line { font-family: var(--font-display); font-size: clamp(28px, 3.3vw, 46px); line-height: 1.3; letter-spacing: -0.02em; margin: 0; color: #fff; }
        .opt-g-link { color: #fff; text-decoration: underline; text-decoration-color: rgb(49 177 248 / 0.55); text-decoration-thickness: 2px; text-underline-offset: 8px; transition: color 200ms ease, text-decoration-color 200ms ease; }
        .opt-g-link:hover { color: var(--color-accent); text-decoration-color: var(--color-accent); }
        .opt-g-sep { color: rgb(255 255 255 / 0.3); }
        /* H */
        .opt-h { display: flex; flex-wrap: wrap; gap: 12px; }
        .opt-h-chip { display: inline-flex; align-items: center; gap: 12px; padding: 6px 18px 6px 6px; border-radius: 999px; background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.14); color: #fff; font-size: 16px; font-weight: 600; transition: background 250ms ease, border-color 250ms ease; }
        .opt-h-chip:hover { background: rgb(49 177 248 / 0.14); border-color: rgb(49 177 248 / 0.5); }
        .opt-h-img { width: 44px; height: 44px; border-radius: 999px; background-size: cover; background-position: center; flex-shrink: 0; }
        .opt-h-arrow { color: var(--color-accent); opacity: 0.7; }
        @media (prefers-reduced-motion: reduce) { .opt-d-pill, .opt-e-cell, .opt-f-link, .opt-f-arrow, .opt-g-link, .opt-h-chip { transition: none !important; } }
      `}</style>
    </main>
  );
}
