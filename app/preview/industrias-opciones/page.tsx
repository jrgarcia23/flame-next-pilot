import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { INDUSTRIES, UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "[DRAFT] Soluciones para cualquier industria · opciones estáticas · Flame Analytics",
  description: "Preview interno: 4 propuestas estáticas (sin carrusel) para la sección de industrias de los casos de uso.",
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

function Heading({ align = "left" }: { align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto text-center" : ""} style={{ maxWidth: 720, marginBottom: 48 }}>
      <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
        {t.industriesTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.industriesTitleHl}</span>
      </h2>
      <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)" }}>{t.industriesSub}</p>
    </div>
  );
}

const sectionStyle = { background: "var(--color-navy)", color: "white" } as const;
const glow = { background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.08), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.05), transparent 72%)" };

export default function IndustriasOpciones() {
  return (
    <main className="min-h-screen" style={{ background: "#fff" }}>
      <CtaStyles />
      <SiteHeader enHref="/en/people-counting/" currentLang="es" />

      {/* A — rejilla de tarjetas actuales, quietas: 4 + 3 centradas */}
      <Label id="A" name="Rejilla de tarjetas" note="Las mismas tarjetas de hoy, sin movimiento: 4 arriba y 3 centradas abajo. El cambio mínimo." />
      <section className="py-24 relative overflow-hidden" style={sectionStyle}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10">
          <Heading />
          <div className="opt-a">
            {inds.map((it) => (
              <a key={it.href} href={it.href} className="opt-a-card rounded-2xl p-7 flex flex-col">
                <div className="inline-flex items-center justify-center rounded-[12px] mb-5 opt-a-icon"><Icon name={it.icon} className="w-6 h-6" /></div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ letterSpacing: "-0.008em" }}>{it.title}</h3>
                <p className="text-[15px] leading-[1.6] flex-1" style={{ color: "rgb(255 255 255 / 0.68)" }}>{it.desc}</p>
                <span className="opt-cta mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold">Leer más <Icon name="arrow" className="w-3.5 h-3.5" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* B — índice editorial numerado */}
      <Label id="B" name="Índice editorial" note="Título fijo a la izquierda y lista numerada 01–07 a la derecha con líneas finas. Sobrio, se lee de un vistazo." />
      <section className="py-24 relative overflow-hidden" style={sectionStyle}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10 opt-b">
          <div className="opt-b-head"><Heading /></div>
          <ol className="opt-b-list">
            {inds.map((it, i) => (
              <li key={it.href}>
                <a href={it.href} className="opt-b-row">
                  <span className="opt-b-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="opt-b-txt">
                    <span className="opt-b-title">{it.title}</span>
                    <span className="opt-b-desc">{it.desc}</span>
                  </span>
                  <span className="opt-b-arrow"><Icon name="arrow" className="w-4 h-4" /></span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* C — tarjetas con foto real de cada sector */}
      <Label id="C" name="Tarjetas con foto" note="Foto real de la cabecera de cada sector con velo navy. Las dos primeras más grandes. La más visual." />
      <section className="py-24 relative overflow-hidden" style={sectionStyle}>
        <div className="flame-container relative z-10">
          <Heading />
          <div className="opt-c">
            {inds.map((it, i) => (
              <a key={it.href} href={it.href} className={`opt-c-card${i < 2 ? " is-big" : ""}`} style={{ backgroundImage: `url('${IMG[it.href]}')` }}>
                <span className="opt-c-veil" />
                <span className="opt-c-body">
                  <span className="opt-c-title">{it.title}</span>
                  <span className="opt-c-desc">{it.desc}</span>
                  <span className="opt-cta inline-flex items-center gap-1.5 text-[14px] font-semibold">Leer más <Icon name="arrow" className="w-3.5 h-3.5" /></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* D — compacta: píldoras con icono, sin descripción */}
      <Label id="D" name="Compacta" note="Solo icono + nombre en píldoras, centrado. Ocupa la mitad de alto y deja el protagonismo al caso de uso." />
      <section className="py-20 relative overflow-hidden" style={sectionStyle}>
        <div className="absolute inset-0 pointer-events-none" style={glow} />
        <div className="flame-container relative z-10">
          <Heading align="center" />
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

      <SiteFooter currentLang="es" />

      <style>{`
        .opt-cta { color: var(--color-accent); transition: gap 300ms ease; }
        /* A */
        .opt-a { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
        .opt-a-card { flex: 0 1 calc((100% - 60px) / 4); min-width: 240px; background: rgb(255 255 255 / 0.04); border: 1px solid rgb(255 255 255 / 0.08); color: #fff; transition: background 300ms ease, border-color 300ms ease, transform 300ms ease; }
        .opt-a-card:hover { background: rgb(255 255 255 / 0.07); border-color: rgb(255 255 255 / 0.16); transform: translateY(-2px); }
        .opt-a-card:hover .opt-cta, .opt-c-card:hover .opt-cta { gap: 10px; }
        .opt-a-icon { width: 48px; height: 48px; background: rgb(49 177 248 / 0.15); color: var(--color-accent); }
        @media (max-width: 1100px) { .opt-a-card { flex-basis: calc((100% - 20px) / 2); } }
        @media (max-width: 600px) { .opt-a-card { flex-basis: 100%; } }
        /* B */
        .opt-b { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 80px); align-items: start; }
        .opt-b-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgb(255 255 255 / 0.15); }
        .opt-b-row { display: grid; grid-template-columns: 48px 1fr 32px; gap: 16px; align-items: center; padding: 22px 4px; border-bottom: 1px solid rgb(255 255 255 / 0.15); color: #fff; transition: background 250ms ease, padding 250ms ease; }
        .opt-b-row:hover { background: rgb(255 255 255 / 0.04); padding-left: 12px; }
        .opt-b-num { font-family: var(--font-display); font-size: 15px; color: var(--color-accent); letter-spacing: 0.04em; }
        .opt-b-txt { display: flex; flex-direction: column; gap: 4px; }
        .opt-b-title { font-size: 20px; font-weight: 600; letter-spacing: -0.008em; }
        .opt-b-desc { font-size: 15px; line-height: 1.55; color: rgb(255 255 255 / 0.66); }
        .opt-b-arrow { color: var(--color-accent); justify-self: end; transition: transform 250ms ease; }
        .opt-b-row:hover .opt-b-arrow { transform: translateX(4px); }
        @media (max-width: 900px) { .opt-b { grid-template-columns: 1fr; gap: 8px; } .opt-b-row { grid-template-columns: 36px 1fr 24px; } }
        /* C */
        .opt-c { display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; }
        .opt-c-card { grid-column: span 2; position: relative; min-height: 280px; border-radius: 16px; overflow: hidden; background-size: cover; background-position: center; color: #fff; display: flex; align-items: flex-end; }
        .opt-c-card.is-big { grid-column: span 3; min-height: 340px; }
        .opt-c-card:nth-child(n+6) { grid-column: span 3; }
        .opt-c-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(21 22 58 / 0.15) 0%, rgb(21 22 58 / 0.65) 45%, rgb(21 22 58 / 0.95) 100%); transition: background 300ms ease; }
        .opt-c-card:hover .opt-c-veil { background: linear-gradient(180deg, rgb(21 22 58 / 0.25) 0%, rgb(21 22 58 / 0.75) 45%, rgb(21 22 58 / 0.97) 100%); }
        .opt-c-body { position: relative; padding: 26px; display: flex; flex-direction: column; gap: 8px; }
        .opt-c-title { font-size: 22px; font-weight: 600; letter-spacing: -0.01em; }
        .opt-c-desc { font-size: 15px; line-height: 1.55; color: rgb(255 255 255 / 0.8); max-width: 460px; }
        @media (max-width: 900px) { .opt-c { grid-template-columns: 1fr 1fr; } .opt-c-card, .opt-c-card.is-big, .opt-c-card:nth-child(n+6) { grid-column: span 1; min-height: 260px; } .opt-c-card.is-big:first-child { grid-column: span 2; } .opt-c-card:last-child { grid-column: span 2; } }
        @media (max-width: 600px) { .opt-c { grid-template-columns: 1fr; } .opt-c-card, .opt-c-card.is-big, .opt-c-card:nth-child(n+6), .opt-c-card.is-big:first-child, .opt-c-card:last-child { grid-column: span 1; min-height: 240px; } }
        /* D */
        .opt-d { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; max-width: 980px; margin: 0 auto; }
        .opt-d-pill { display: inline-flex; align-items: center; gap: 12px; padding: 12px 20px 12px 12px; border-radius: 999px; background: rgb(255 255 255 / 0.05); border: 1px solid rgb(255 255 255 / 0.12); color: #fff; font-size: 16.5px; font-weight: 600; transition: background 250ms ease, border-color 250ms ease; }
        .opt-d-pill:hover { background: rgb(49 177 248 / 0.14); border-color: rgb(49 177 248 / 0.5); }
        .opt-d-icon { display: inline-flex; width: 38px; height: 38px; align-items: center; justify-content: center; border-radius: 999px; background: rgb(49 177 248 / 0.15); color: var(--color-accent); }
        .opt-d-arrow { color: var(--color-accent); opacity: 0.7; }
        @media (prefers-reduced-motion: reduce) { .opt-a-card, .opt-b-row, .opt-b-arrow, .opt-c-veil, .opt-d-pill, .opt-cta { transition: none !important; } }
      `}</style>
    </main>
  );
}
