import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import GroupHoverShowcase from "@/components/home/GroupHoverShowcase";
import { HOME_USE_CASES_ES as UC, HOME_USE_CASE_MEDIA as MEDIA } from "@/lib/home-use-cases";

export const metadata: Metadata = {
  title: "[DRAFT] Home v2 · opciones zona casos de uso (2) · Flame Analytics",
  description: "Preview interno: segunda tanda de alternativas para la zona de casos de uso de la home v2.",
  robots: { index: false, follow: false },
};

const by = (slug: string) => UC.find((u) => u.href === `/es/${slug}/`)!;
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
const Head = ({ center = false, dark = false }: { center?: boolean; dark?: boolean }) => (
  <div className={center ? "text-center mx-auto" : ""} style={{ maxWidth: 760, marginBottom: 44 }}>
    <span className="op-eyebrow">Casos de uso</span>
    <h2 className={`op-h2${dark ? " is-dark" : ""}`}>¿Qué quieres <span>resolver en tu espacio?</span></h2>
    <p className={`op-sub${dark ? " is-dark" : ""}`}>Elige tu reto y descubre cómo lo mide Flame.</p>
  </div>
);
const Tile = ({ u, cls = "" }: { u: (typeof UC)[number]; cls?: string }) => (
  <a href={u.href} className={`ph-tile ${cls}`} style={{ backgroundImage: `url('${MEDIA[u.href].photo}')` }}>
    <span className="ph-veil" />
    <span className="ph-body">
      <img src={u.iconImg} alt="" width={36} height={36} />
      <span className="ph-title">{u.title}</span>
      <span className="ph-intro">{u.intro}</span>
      <span className="ph-more">{u.bullets.slice(0, 3).map((b) => <span key={b}>{b}</span>)}</span>
    </span>
  </a>
);

export default function Opciones2() {
  return (
    <main style={{ background: "#fff" }}>
      <CtaStyles />
      <SiteHeader enHref="/en/" currentLang="es" />

      {/* A2 */}
      <Label id="A2" name="Fotos 3×3, todas iguales" note="Las 9 tarjetas con foto del mismo tamaño. Al pasar el ratón la foto se aclara y aparecen 3 funcionalidades del caso." />
      <section className="py-24"><div className="flame-container"><Head />
        <div className="a2">{UC.map((u) => <Tile key={u.href} u={u} />)}</div>
      </div></section>

      {/* A3 */}
      <Label id="A3" name="Fotos por bloques (mezcla de A y B)" note="La estructura de la B (medir, operar, conectar) con las tarjetas de foto de la A. Cada bloque con su titular; todos los casos pesan lo mismo." />
      <section className="py-24"><div className="flame-container"><Head />
        {GROUPS.map((g, gi) => (
          <div key={g.title} className="a3-row">
            <div className="a3-head"><span className="b-num">0{gi + 1}</span><h3 className="b-h3">{g.title} <span>{g.hl}</span></h3><p className="b-sub">{g.sub}</p></div>
            <div className="a3-tiles">{g.uc.map((u) => <Tile key={u.href} u={u} cls="ph-short" />)}</div>
          </div>
        ))}
      </div></section>

      {/* A4 */}
      <Label id="A4" name="Acordeón horizontal de fotos" note="Nueve franjas verticales con foto. La que señalas se abre y muestra el caso completo. Todas pesan igual hasta que el usuario elige. En móvil, lista vertical." />
      <section className="py-24" style={{ background: "var(--color-navy)" }}><div className="flame-container"><Head dark />
        <div className="a4">
          {UC.map((u) => (
            <a key={u.href} href={u.href} className="a4-p" style={{ backgroundImage: `url('${MEDIA[u.href].photo}')` }}>
              <span className="a4-veil" />
              <span className="a4-closed"><img src={u.iconImg} alt="" width={40} height={40} /><span>{u.title}</span></span>
              <span className="a4-open">
                <img src={u.iconImg} alt="" width={44} height={44} />
                <span className="a4-t">{u.title}</span>
                <span className="a4-i">{u.intro}</span>
                <span className="a4-cta">Ver caso de uso <Icon name="arrow" className="w-4 h-4" /></span>
              </span>
            </a>
          ))}
        </div>
      </div></section>

      {/* B2 */}
      <Label id="B2" name="B con más vida: 3 columnas con foto de cabecera" note="Los 3 bloques en columnas, cada una encabezada por una foto real con su número y titular encima; debajo, sus 3 casos como lista con icono." />
      <section className="py-24" style={{ background: "var(--color-paper)" }}><div className="flame-container"><Head />
        <div className="b2">
          {GROUPS.map((g, gi) => (
            <div key={g.title} className="b2-col">
              <div className="b2-top" style={{ backgroundImage: `url('${MEDIA[g.uc[0].href].photo}')` }}>
                <span className="b2-veil" />
                <span className="b2-top-txt"><span className="b2-num">0{gi + 1}</span><span className="b2-h">{g.title} <b>{g.hl}</b></span></span>
              </div>
              <p className="b2-sub">{g.sub}</p>
              <div>{g.uc.map((u) => (
                <a key={u.href} href={u.href} className="b2-link"><img src={u.iconImg} alt="" width={40} height={40} /><span><strong>{u.title}</strong><small>{u.intro}</small></span><Icon name="arrow" className="w-4 h-4 b2-arrow" /></a>
              ))}</div>
            </div>
          ))}
        </div>
      </div></section>

      {/* D2 */}
      <Label id="D2" name="Zigzag con foto + captura superpuesta" note="Cada bloque alterna lado: foto real grande con la captura del dashboard flotando encima. Más profundidad que la D original." />
      <section className="py-24"><div className="flame-container"><Head center />
        <div className="d-wrap">
          {GROUPS.map((g, gi) => (
            <div key={g.title} className={`d2-row${gi % 2 ? " is-rev" : ""}`}>
              <div className="d2-media">
                <span className="d2-photo" style={{ backgroundImage: `url('${MEDIA[g.uc[0].href].photo}')` }} />
                <span className="d2-shot" style={{ backgroundImage: `url('${MEDIA[g.uc[gi === 2 ? 1 : 0].href].shot}')` }} />
              </div>
              <div><span className="b-num">0{gi + 1}</span><h3 className="b-h3">{g.title} <span>{g.hl}</span></h3><p className="b-sub" style={{ marginBottom: 22 }}>{g.sub}</p>
                <div className="d-list">{g.uc.map((u) => (<a key={u.href} href={u.href} className="d-link"><img src={u.iconImg} alt="" width={40} height={40} /><span><strong>{u.title}</strong><small>{u.intro}</small></span><Icon name="arrow" className="w-4 h-4 d-arrow" /></a>))}</div>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      {/* D3 */}
      <Label id="D3" name="Zigzag interactivo" note="Como la D, pero la captura cambia al caso que señalas: pasas por Gestión de colas y se ve el dashboard de colas. Cada caso enseña su producto." />
      <section className="py-24" style={{ background: "var(--color-paper)" }}><div className="flame-container"><Head center />
        <GroupHoverShowcase groups={GROUPS} />
      </div></section>

      {/* D4 */}
      <Label id="D4" name="Zigzag a sangre, mitad foto mitad texto" note="Cada bloque ocupa todo el ancho: media pantalla de foto real a sangre y la otra mitad con el texto, alternando lado y fondo (blanco, navy, gris). Muy editorial." />
      <section>
        {GROUPS.map((g, gi) => {
          const bg = ["#fff", "var(--color-navy)", "var(--color-paper)"][gi]; const dark = gi === 1;
          return (
            <div key={g.title} className={`d4-row${gi % 2 ? " is-rev" : ""}`} style={{ background: bg }}>
              <div className="d4-photo" style={{ backgroundImage: `url('${MEDIA[g.uc[gi === 2 ? 1 : 0].href].photo}')` }} />
              <div className="d4-text">
                {gi === 0 && <span className="op-eyebrow">Casos de uso</span>}
                <span className="b-num">0{gi + 1}</span>
                <h3 className={`b-h3${dark ? " is-dark" : ""}`}>{g.title} <span>{g.hl}</span></h3>
                <p className={`b-sub${dark ? " is-dark" : ""}`} style={{ marginBottom: 22 }}>{g.sub}</p>
                <div className={`d-list${dark ? " is-dark" : ""}`}>{g.uc.map((u) => (<a key={u.href} href={u.href} className="d-link"><img src={u.iconImg} alt="" width={40} height={40} /><span><strong>{u.title}</strong><small>{u.intro}</small></span><Icon name="arrow" className="w-4 h-4 d-arrow" /></a>))}</div>
              </div>
            </div>
          );
        })}
      </section>

      <SiteFooter currentLang="es" />
      <style>{`
        .op-eyebrow { display: inline-block; font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent-deep); margin-bottom: 14px; }
        .op-h2 { font: 400 clamp(32px, 3.4vw, 48px)/1.08 var(--font-display); letter-spacing: -0.02em; color: var(--color-navy); margin: 0; }
        .op-h2 span { color: var(--color-accent); font-weight: 500; }
        .op-h2.is-dark { color: #fff; }
        .op-sub { margin-top: 18px; font-size: clamp(17px, 1.25vw, 19px); line-height: 1.6; color: var(--color-ink-2); }
        .op-sub.is-dark { color: rgb(255 255 255 / 0.72); }
        .b-num { display: block; font: 500 15px var(--font-display); color: var(--color-accent-deep); letter-spacing: 0.06em; margin-bottom: 10px; }
        .b-h3 { font: 400 clamp(24px, 2.2vw, 32px)/1.15 var(--font-display); letter-spacing: -0.015em; color: var(--color-navy); margin: 0 0 10px; }
        .b-h3 span { color: var(--color-accent); font-weight: 500; }
        .b-h3.is-dark { color: #fff; }
        .b-sub { font-size: 16px; line-height: 1.6; color: var(--color-ink-2); margin: 0; }
        .b-sub.is-dark { color: rgb(255 255 255 / 0.72); }
        /* tarjeta foto */
        .ph-tile { position: relative; min-height: 260px; border-radius: 18px; overflow: hidden; background-size: cover; background-position: center; color: #fff; text-decoration: none; display: flex; align-items: flex-end; }
        .ph-short { min-height: 230px; }
        .ph-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(21 22 58 / 0.25) 0%, rgb(21 22 58 / 0.7) 55%, rgb(21 22 58 / 0.95) 100%); transition: background 300ms ease; }
        .ph-tile:hover .ph-veil { background: linear-gradient(180deg, rgb(21 22 58 / 0.05) 0%, rgb(21 22 58 / 0.6) 50%, rgb(21 22 58 / 0.95) 100%); }
        .ph-body { position: relative; padding: 22px; display: flex; flex-direction: column; gap: 6px; }
        .ph-body img { width: 36px; height: 36px; margin-bottom: 6px; }
        .ph-title { font: 600 18px var(--font-body); }
        .ph-intro { font-size: 14px; line-height: 1.45; color: rgb(255 255 255 / 0.82); }
        .ph-more { display: flex; flex-wrap: wrap; gap: 6px; max-height: 0; opacity: 0; overflow: hidden; transition: max-height 350ms ease, opacity 300ms ease, margin 300ms ease; }
        .ph-more span { font-size: 12px; font-weight: 600; padding: 5px 10px; border-radius: 999px; background: rgb(255 255 255 / 0.14); border: 1px solid rgb(255 255 255 / 0.22); }
        .ph-tile:hover .ph-more, .ph-tile:focus-visible .ph-more { max-height: 90px; opacity: 1; margin-top: 8px; }
        .a2 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .a3-row { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 9fr); gap: clamp(24px, 4vw, 48px); padding: 32px 0; border-top: 1px solid var(--color-rule); align-items: center; }
        .a3-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .a4 { display: flex; gap: 10px; height: 460px; }
        .a4-p { position: relative; flex: 1 1 0; min-width: 0; border-radius: 18px; overflow: hidden; background-size: cover; background-position: center; color: #fff; text-decoration: none; transition: flex-grow 500ms cubic-bezier(0.22, 1, 0.36, 1); }
        .a4:hover .a4-p { flex-grow: 0.7; } .a4 .a4-p:hover { flex-grow: 5; }
        .a4-p:first-child { flex-grow: 5; } .a4:hover .a4-p:first-child:not(:hover) { flex-grow: 0.7; }
        .a4-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(21 22 58 / 0.35), rgb(21 22 58 / 0.92)); }
        .a4-closed { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 12px; transition: opacity 250ms ease; }
        .a4-closed span { writing-mode: vertical-rl; transform: rotate(180deg); font-weight: 600; font-size: 15px; white-space: nowrap; }
        .a4-open { position: absolute; left: 0; right: 0; bottom: 0; padding: 28px; display: flex; flex-direction: column; gap: 8px; opacity: 0; transition: opacity 300ms ease 100ms; min-width: 320px; }
        .a4-t { font: 500 26px/1.15 var(--font-display); } .a4-i { font-size: 15px; color: rgb(255 255 255 / 0.85); max-width: 380px; }
        .a4-cta { display: inline-flex; gap: 6px; align-items: center; font-weight: 600; font-size: 14px; color: var(--color-accent); margin-top: 6px; }
        .a4-p:first-child .a4-open, .a4 .a4-p:hover .a4-open { opacity: 1; } .a4-p:first-child .a4-closed, .a4 .a4-p:hover .a4-closed { opacity: 0; }
        .a4:hover .a4-p:first-child:not(:hover) .a4-open { opacity: 0; } .a4:hover .a4-p:first-child:not(:hover) .a4-closed { opacity: 1; }
        .b2 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        .b2-col { background: #fff; border-radius: 20px; overflow: hidden; border: 1px solid var(--color-rule); padding-bottom: 12px; }
        .b2-top { position: relative; height: 190px; background-size: cover; background-position: center; display: flex; align-items: flex-end; }
        .b2-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(21 22 58 / 0.15), rgb(21 22 58 / 0.9)); }
        .b2-top-txt { position: relative; padding: 20px 24px; color: #fff; }
        .b2-num { display: block; font: 500 14px var(--font-display); color: var(--color-accent); letter-spacing: 0.06em; margin-bottom: 6px; }
        .b2-h { font: 400 24px/1.15 var(--font-display); } .b2-h b { color: var(--color-accent); font-weight: 500; }
        .b2-sub { font-size: 15px; line-height: 1.55; color: var(--color-ink-2); padding: 18px 24px 6px; margin: 0; }
        .b2-link, .d-link { display: grid; grid-template-columns: 40px 1fr 18px; gap: 14px; align-items: center; padding: 14px 24px; color: var(--color-navy); text-decoration: none; transition: background 200ms ease; }
        .b2-link img, .d-link img { width: 40px; height: 40px; }
        .b2-link strong, .d-link strong { display: block; font-size: 16px; font-weight: 600; }
        .b2-link small, .d-link small { display: block; font-size: 13.5px; color: var(--color-ink-2); margin-top: 2px; }
        .b2-link:hover { background: var(--color-paper-soft); }
        .b2-arrow, .d-arrow { color: var(--color-accent-deep); opacity: 0.6; }
        .d-wrap { display: flex; flex-direction: column; gap: 88px; }
        .d-list { border-top: 1px solid var(--color-rule); }
        .d-link { padding: 14px 4px; border-bottom: 1px solid var(--color-rule); }
        .d-link:hover { padding-left: 10px; }
        .d-list.is-dark { border-color: rgb(255 255 255 / 0.15); } .d-list.is-dark .d-link { color: #fff; border-color: rgb(255 255 255 / 0.15); } .d-list.is-dark small { color: rgb(255 255 255 / 0.7); } .d-list.is-dark .d-arrow { color: var(--color-accent); }
        .d2-row { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
        .d2-row.is-rev { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); } .d2-row.is-rev .d2-media { order: 2; }
        .d2-media { position: relative; aspect-ratio: 16 / 11; }
        .d2-photo { position: absolute; inset: 0 18% 14% 0; border-radius: 20px; background-size: cover; background-position: center; }
        .d2-row.is-rev .d2-photo { inset: 0 0 14% 18%; }
        .d2-shot { position: absolute; right: 0; bottom: 0; width: 62%; aspect-ratio: 16 / 10; border-radius: 14px; background-size: cover; background-position: center top; background-color: #fff; border: 1px solid var(--color-rule); box-shadow: 0 28px 56px -26px rgb(15 23 42 / 0.45); }
        .d2-row.is-rev .d2-shot { right: auto; left: 0; }
        .d4-row { display: grid; grid-template-columns: 1fr 1fr; min-height: 520px; }
        .d4-row.is-rev .d4-photo { order: 2; }
        .d4-photo { background-size: cover; background-position: center; min-height: 320px; }
        .d4-text { padding: clamp(40px, 6vw, 88px) clamp(24px, 6vw, 96px); display: flex; flex-direction: column; justify-content: center; max-width: 680px; }
        @media (max-width: 1000px) { .a2, .a3-tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); } .a3-row { grid-template-columns: 1fr; } .b2 { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; } }
        @media (max-width: 900px) {
          .a4 { flex-direction: column; height: auto; } .a4-p, .a4-p:first-child, .a4:hover .a4-p, .a4 .a4-p:hover { flex: none; height: 200px; }
          .a4-closed { display: none; } .a4-open, .a4:hover .a4-p:first-child:not(:hover) .a4-open { opacity: 1; min-width: 0; }
          .d2-row, .d2-row.is-rev, .d4-row { grid-template-columns: 1fr; } .d2-row.is-rev .d2-media, .d4-row.is-rev .d4-photo { order: 0; }
        }
        @media (max-width: 600px) { .a2, .a3-tiles { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .ph-veil, .ph-more, .a4-p, .a4-open, .a4-closed, .b2-link, .d-link { transition: none !important; } }
      `}</style>
    </main>
  );
}
