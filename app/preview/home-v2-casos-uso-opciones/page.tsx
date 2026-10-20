import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import UseCaseTabs from "@/components/home/UseCaseTabs";
import { HOME_USE_CASES_ES as UC, HOME_USE_CASE_MEDIA as MEDIA } from "@/lib/home-use-cases";

export const metadata: Metadata = {
  title: "[DRAFT] Home v2 · opciones zona casos de uso · Flame Analytics",
  description: "Preview interno: alternativas para la zona de casos de uso de la home v2.",
  robots: { index: false, follow: false },
};

const by = (slug: string) => UC.find((u) => u.href === `/es/${slug}/`)!;
// Agrupación editorial por objetivo (solo para las opciones B y D)
const GROUPS = [
  { title: "Mide la afluencia", hl: "y la conversión", sub: "Cuánta gente entra, cómo se mueve y cuánta acaba comprando.", items: ["conteo-personas", "analitica-conversion", "comportamiento-del-cliente"] },
  { title: "Opera tu espacio", hl: "en tiempo real", sub: "Ocupación, colas y aseos bajo control, con alertas.", items: ["gestion-ocupacion", "analitica-de-colas", "gestion-de-aseos"] },
  { title: "Conecta", hl: "y monetiza", sub: "Pantallas, WiFi de visitantes y red corporativa.", items: ["dooh", "marketing-wifi-para-invitados", "acceso-wifi-corporativo"] },
].map((g) => ({ ...g, uc: g.items.map(by) }));

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

const Head = ({ center = false }: { center?: boolean }) => (
  <div className={center ? "text-center mx-auto" : ""} style={{ maxWidth: 760, marginBottom: 44 }}>
    <span className="op-eyebrow">Casos de uso</span>
    <h2 className="op-h2">¿Qué quieres <span>resolver en tu espacio?</span></h2>
    <p className="op-sub">Elige tu reto y descubre cómo lo mide Flame.</p>
  </div>
);

export default function OpcionesCasosUso() {
  const [big, ...rest] = UC;
  return (
    <main style={{ background: "#fff" }}>
      <CtaStyles />
      <SiteHeader enHref="/en/" currentLang="es" />

      {/* A — BENTO CON FOTOS */}
      <Label id="A" name="Bento con fotos" note="Rejilla de tamaños mezclados con la foto real de cada caso y velo navy. Conteo, el principal, en grande. Muy visual, cero monotonía." />
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <Head />
          <div className="opa">
            <a href={big.href} className="opa-tile opa-big" style={{ backgroundImage: `url('${MEDIA[big.href].photo}')` }}>
              <span className="opa-veil" />
              <span className="opa-body">
                <img src={big.iconImg} alt="" width={44} height={44} />
                <span className="opa-title opa-title--big">{big.title}</span>
                <span className="opa-intro">{big.desc}</span>
                <span className="opa-bul">{big.bullets.map((b) => <span key={b}>{b}</span>)}</span>
              </span>
            </a>
            {rest.map((u, k) => (
              <a key={u.href} href={u.href} className={`opa-tile${k === 2 || k === 5 ? " opa-wide" : ""}`} style={{ backgroundImage: `url('${MEDIA[u.href].photo}')` }}>
                <span className="opa-veil" />
                <span className="opa-body">
                  <img src={u.iconImg} alt="" width={36} height={36} />
                  <span className="opa-title">{u.title}</span>
                  <span className="opa-intro">{u.intro}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* B — AGRUPADOS POR OBJETIVO */}
      <Label id="B" name="Agrupados por objetivo" note="Los 9 casos ordenados en 3 bloques (medir, operar, conectar), cada uno con su titular. Da ritmo y cuenta una historia en lugar de una lista." />
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <Head />
          <div className="opb">
            {GROUPS.map((g, gi) => (
              <div key={g.title} className="opb-row">
                <div className="opb-head">
                  <span className="opb-num">0{gi + 1}</span>
                  <h3 className="opb-h3">{g.title} <span>{g.hl}</span></h3>
                  <p className="opb-sub">{g.sub}</p>
                </div>
                <div className="opb-cards">
                  {g.uc.map((u) => (
                    <a key={u.href} href={u.href} className="opb-card">
                      <img src={u.iconImg} alt="" width={44} height={44} />
                      <span className="opb-title">{u.title}</span>
                      <span className="opb-intro">{u.intro}</span>
                      <span className="opb-cta">Ver caso de uso <Icon name="arrow" className="w-3.5 h-3.5" /></span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* C — SELECTOR CON CAPTURA */}
      <Label id="C" name="Selector con captura del dashboard" note="Lista de los 9 a la izquierda; al pasar el ratón o hacer clic, a la derecha sale la captura real del dashboard de ese caso, su texto y sus funcionalidades. Ocupa poco y enseña producto." />
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <Head />
          <UseCaseTabs items={UC} lang="es" />
        </div>
      </section>

      {/* D — ZIGZAG CON CAPTURAS */}
      <Label id="D" name="Zigzag por bloques con capturas" note="Los 3 bloques alternan imagen a izquierda y derecha: captura del dashboard grande + los 3 casos del bloque. Ritmo editorial, como una página de producto." />
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <Head center />
          <div className="opd">
            {GROUPS.map((g, gi) => (
              <div key={g.title} className={`opd-row${gi % 2 ? " is-rev" : ""}`}>
                <div className="opd-img" style={{ backgroundImage: `url('${MEDIA[g.uc[0].href].shot}')` }} />
                <div className="opd-text">
                  <span className="opb-num">0{gi + 1}</span>
                  <h3 className="opb-h3">{g.title} <span>{g.hl}</span></h3>
                  <p className="opb-sub" style={{ marginBottom: 22 }}>{g.sub}</p>
                  <div className="opd-list">
                    {g.uc.map((u) => (
                      <a key={u.href} href={u.href} className="opd-link">
                        <img src={u.iconImg} alt="" width={40} height={40} />
                        <span className="flex flex-col"><strong>{u.title}</strong><span>{u.intro}</span></span>
                        <Icon name="arrow" className="w-4 h-4 opd-arrow" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter currentLang="es" />
      <style>{`
        .op-eyebrow { display: inline-block; font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent-deep); margin-bottom: 14px; }
        .op-h2 { font: 400 clamp(32px, 3.4vw, 48px)/1.08 var(--font-display); letter-spacing: -0.02em; color: var(--color-navy); margin: 0; }
        .op-h2 span { color: var(--color-accent); font-weight: 500; }
        .op-sub { margin-top: 18px; font-size: clamp(17px, 1.25vw, 19px); line-height: 1.6; color: var(--color-ink-2); }
        /* A */
        .opa { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); grid-auto-rows: 210px; gap: 16px; }
        .opa-tile { position: relative; border-radius: 18px; overflow: hidden; background-size: cover; background-position: center; color: #fff; text-decoration: none; display: flex; align-items: flex-end; }
        .opa-big { grid-column: span 2; grid-row: span 2; }
        .opa-wide { grid-column: span 2; }
        .opa-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(21 22 58 / 0.1) 0%, rgb(21 22 58 / 0.62) 50%, rgb(21 22 58 / 0.94) 100%); transition: background 300ms ease; }
        .opa-tile:hover .opa-veil { background: linear-gradient(180deg, rgb(21 22 58 / 0.25) 0%, rgb(21 22 58 / 0.75) 50%, rgb(21 22 58 / 0.97) 100%); }
        .opa-body { position: relative; padding: 22px; display: flex; flex-direction: column; gap: 6px; }
        .opa-body img { width: 36px; height: 36px; margin-bottom: 6px; }
        .opa-big .opa-body { padding: 32px; } .opa-big .opa-body img { width: 44px; height: 44px; }
        .opa-title { font: 600 18px var(--font-body); letter-spacing: -0.01em; }
        .opa-title--big { font: 500 30px/1.15 var(--font-display); }
        .opa-intro { font-size: 14px; line-height: 1.45; color: rgb(255 255 255 / 0.82); max-width: 460px; }
        .opa-bul { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
        .opa-bul span { font-size: 12.5px; font-weight: 600; padding: 6px 12px; border-radius: 999px; background: rgb(255 255 255 / 0.14); border: 1px solid rgb(255 255 255 / 0.22); }
        @media (max-width: 1000px) { .opa { grid-template-columns: repeat(2, minmax(0, 1fr)); } .opa-wide { grid-column: span 1; } }
        @media (max-width: 600px) { .opa { grid-template-columns: 1fr; grid-auto-rows: 200px; } .opa-big { grid-column: span 1; grid-row: span 2; } }
        /* B */
        .opb { display: flex; flex-direction: column; }
        .opb-row { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: clamp(24px, 4vw, 56px); padding: 40px 0; border-top: 1px solid var(--color-rule); align-items: start; }
        .opb-num { display: block; font: 500 15px var(--font-display); color: var(--color-accent-deep); letter-spacing: 0.06em; margin-bottom: 10px; }
        .opb-h3 { font: 400 clamp(24px, 2.2vw, 32px)/1.15 var(--font-display); letter-spacing: -0.015em; color: var(--color-navy); margin: 0 0 10px; }
        .opb-h3 span { color: var(--color-accent); font-weight: 500; }
        .opb-sub { font-size: 16px; line-height: 1.6; color: var(--color-ink-2); margin: 0; }
        .opb-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .opb-card { display: flex; flex-direction: column; gap: 8px; padding: 24px; border-radius: 16px; background: var(--color-paper); color: var(--color-navy); text-decoration: none; transition: background 250ms ease, transform 250ms ease; }
        .opb-card:hover { background: #fff; box-shadow: 0 0 0 1px rgb(49 177 248 / 0.5), 0 12px 28px -18px rgb(15 23 42 / 0.25); transform: translateY(-2px); }
        .opb-card img { width: 44px; height: 44px; margin-bottom: 6px; }
        .opb-title { font-size: 17px; font-weight: 600; }
        .opb-intro { font-size: 14px; line-height: 1.5; color: var(--color-ink-2); flex: 1; }
        .opb-cta { display: inline-flex; gap: 6px; align-items: center; font-size: 13.5px; font-weight: 600; color: var(--color-accent-deep); margin-top: 6px; }
        @media (max-width: 1000px) { .opb-row { grid-template-columns: 1fr; } }
        @media (max-width: 700px) { .opb-cards { grid-template-columns: 1fr; } }
        /* D */
        .opd { display: flex; flex-direction: column; gap: 72px; }
        .opd-row { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
        .opd-row.is-rev .opd-img { order: 2; }
        .opd-img { aspect-ratio: 16 / 10; border-radius: 20px; background-size: cover; background-position: center top; background-color: var(--color-paper); border: 1px solid var(--color-rule); box-shadow: 0 24px 50px -30px rgb(15 23 42 / 0.35); }
        .opd-list { display: flex; flex-direction: column; border-top: 1px solid var(--color-rule); }
        .opd-link { display: grid; grid-template-columns: 40px 1fr 18px; gap: 14px; align-items: center; padding: 14px 4px; border-bottom: 1px solid var(--color-rule); color: var(--color-navy); text-decoration: none; transition: padding 250ms ease; }
        .opd-link:hover { padding-left: 10px; }
        .opd-link img { width: 40px; height: 40px; }
        .opd-link strong { font-size: 16.5px; font-weight: 600; }
        .opd-link span span, .opd-link .flex span { font-size: 14px; color: var(--color-ink-2); }
        .opd-arrow { color: var(--color-accent-deep); opacity: 0.6; }
        @media (max-width: 900px) { .opd-row { grid-template-columns: 1fr; } .opd-row.is-rev .opd-img { order: 0; } }
        @media (prefers-reduced-motion: reduce) { .opa-veil, .opb-card, .opd-link { transition: none !important; } }
      `}</style>
    </main>
  );
}
