import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { INDUSTRIES, MEGA_INDUSTRIES } from "@/lib/page-content";

const menuIndustryIcon = (href: string) => MEGA_INDUSTRIES.find((m) => m.href === href)?.iconImg;
import { HOME_USE_CASES_ES as UC, SECTOR_KEYS, SECTOR_HREF, useCaseSectors } from "@/lib/home-use-cases";

export const metadata: Metadata = {
  title: "[DRAFT] Home v2 · casos de uso en matriz · Flame Analytics",
  description: "Preview interno: opciones sin imagen, en formato matriz, para la zona de casos de uso de la home v2.",
  robots: { index: false, follow: false },
};

const SECT = SECTOR_KEYS.map((k) => {
  const href = SECTOR_HREF.es[k];
  const ind = INDUSTRIES.find((i) => i.href === href)!;
  return { k, href, title: ind.title, icon: menuIndustryIcon(href) };
});
const SHORT: Record<string, string> = { centros: "C. comerciales", retail: "Retail", super: "Supermercados", espacios: "Esp. públicos", hoteles: "Hoteles", banca: "Banca", transporte: "Transporte" };
const by = (slug: string) => UC.find((u) => u.href === `/es/${slug}/`)!;
const GROUPS = [
  { title: "Medir", sub: "Afluencia, conversión y comportamiento", items: ["conteo-personas", "analitica-conversion", "comportamiento-del-cliente"] },
  { title: "Operar", sub: "Ocupación, colas y aseos en tiempo real", items: ["gestion-ocupacion", "analitica-de-colas", "gestion-de-aseos"] },
  { title: "Conectar", sub: "Pantallas, WiFi de visitantes y corporativo", items: ["dooh", "marketing-wifi-para-invitados", "acceso-wifi-corporativo"] },
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
const Head = () => (
  <div style={{ maxWidth: 760, marginBottom: 40 }}>
    <span className="mx-eyebrow">Casos de uso</span>
    <h2 className="mx-h2">Cualquier espacio. Cualquier reto. <span>Una solución Flame.</span></h2>
    <p className="mx-sub">Del conteo de personas al WiFi corporativo: sea cual sea tu sector o tu necesidad, ya tenemos la respuesta. Elige la tuya.</p>
  </div>
);

export default function MatrizCasosUso() {
  return (
    <main style={{ background: "#fff" }}>
      <CtaStyles />
      <SiteHeader enHref="/en/" currentLang="es" />

      {/* M1 */}
      <Label id="M1" name="Matriz caso de uso × sector" note="Tabla real: cada fila es un caso de uso, cada columna un sector, y el punto indica que ese sector lo trabaja (según sus páginas). Al pasar por una fila se resalta. Es literal el «para cualquier sector o necesidad»." />
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <Head />
          <div className="m1-wrap">
            <table className="m1">
              <thead>
                <tr>
                  <th className="m1-corner">Caso de uso <span>/ sector</span></th>
                  {SECT.map((s) => (
                    <th key={s.k}><a href={s.href} className="m1-sect"><img src={s.icon} alt="" width={30} height={30} /><span>{SHORT[s.k]}</span></a></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {UC.map((u) => {
                  const on = useCaseSectors(u.href);
                  return (
                    <tr key={u.href}>
                      <th scope="row"><a href={u.href} className="m1-uc"><img src={u.iconImg} alt="" width={34} height={34} /><span><strong>{u.title}</strong><small>{u.intro}</small></span><Icon name="arrow" className="w-4 h-4 m1-arrow" /></a></th>
                      {SECT.map((s) => <td key={s.k}>{on.includes(s.k) ? <span className="m1-dot" aria-label="Sí" /> : <span className="m1-no" aria-label="No" />}</td>)}
                      <td className="m1-mob">{on.map((k) => <span key={k}>{SHORT[k]}</span>)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* M2 */}
      <Label id="M2" name="Matriz 3×3 de celdas" note="Los 9 casos en una rejilla con líneas compartidas, como una tabla: número, título, descripción y los sectores en los que aplica. Al pasar el ratón la celda se vuelve navy. Sin imágenes, todo pesa igual." />
      <section className="py-24">
        <div className="flame-container">
          <Head />
          <div className="m2">
            {UC.map((u, i) => (
              <a key={u.href} href={u.href} className="m2-cell">
                <span className="m2-top"><span className="m2-num">{String(i + 1).padStart(2, "0")}</span><img src={u.iconImg} alt="" width={36} height={36} /></span>
                <span className="m2-title">{u.title}</span>
                <span className="m2-desc">{u.intro}</span>
                <span className="m2-chips">{useCaseSectors(u.href).map((k) => <span key={k}>{SHORT[k]}</span>)}</span>
                <span className="m2-cta">Ver caso de uso <Icon name="arrow" className="w-3.5 h-3.5" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* M3 */}
      <Label id="M3" name="Matriz por objetivo" note="Tres columnas con cabecera (Medir · Operar · Conectar) y tres filas: una tabla de dos ejes, objetivo y caso de uso. Muy limpia, se lee como un índice." />
      <section className="py-24" style={{ background: "var(--color-navy)" }}>
        <div className="flame-container">
          <div style={{ maxWidth: 760, marginBottom: 40 }}>
            <span className="mx-eyebrow" style={{ color: "var(--color-accent)" }}>Casos de uso</span>
            <h2 className="mx-h2" style={{ color: "#fff" }}>Cualquier espacio. Cualquier reto. <span>Una solución Flame.</span></h2>
            <p className="mx-sub" style={{ color: "rgb(255 255 255 / 0.72)" }}>Del conteo de personas al WiFi corporativo: sea cual sea tu sector o tu necesidad, ya tenemos la respuesta. Elige la tuya.</p>
          </div>
          <div className="m3">
            {GROUPS.map((g, gi) => (
              <div key={g.title} className="m3-col">
                <div className="m3-head"><span className="m3-n">0{gi + 1}</span><strong>{g.title}</strong><small>{g.sub}</small></div>
                {g.uc.map((u) => (
                  <a key={u.href} href={u.href} className="m3-row">
                    <img src={u.iconImg} alt="" width={36} height={36} />
                    <span><strong>{u.title}</strong><small>{u.intro}</small></span>
                    <Icon name="arrow" className="w-4 h-4 m3-arrow" />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter currentLang="es" />
      <style>{`
        .mx-eyebrow { display: inline-block; font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent-deep); margin-bottom: 14px; }
        .mx-h2 { font: 400 clamp(32px, 3.4vw, 48px)/1.08 var(--font-display); letter-spacing: -0.02em; color: var(--color-navy); margin: 0; }
        .mx-h2 span { color: var(--color-accent); font-weight: 500; }
        .mx-sub { margin-top: 18px; font-size: clamp(17px, 1.25vw, 19px); line-height: 1.6; color: var(--color-ink-2); }
        /* M1 */
        .m1-wrap { background: #fff; border: 1px solid var(--color-rule); border-radius: 20px; overflow: hidden; }
        .m1 { width: 100%; border-collapse: collapse; table-layout: fixed; }
        .m1 th, .m1 td { border-bottom: 1px solid var(--color-rule); }
        .m1 thead th { padding: 16px 6px; background: var(--color-paper-soft); vertical-align: bottom; }
        .m1 .m1-corner { width: 36%; text-align: left; padding-left: 24px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-navy); }
        .m1-corner span { color: var(--color-ink-3); }
        .m1-sect { display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--color-navy); text-decoration: none; font-size: 12.5px; font-weight: 600; text-align: center; line-height: 1.2; }
        .m1-sect img { width: 30px; height: 30px; }
        .m1-sect:hover { color: var(--color-accent-deep); }
        .m1 tbody th { text-align: left; font-weight: 400; padding: 0; }
        .m1-uc { display: grid; grid-template-columns: 34px 1fr 16px; gap: 12px; align-items: center; padding: 14px 18px 14px 24px; color: var(--color-navy); text-decoration: none; }
        .m1-uc img { width: 34px; height: 34px; }
        .m1-uc strong { display: block; font-size: 15.5px; font-weight: 600; }
        .m1-uc small { display: block; font-size: 13px; color: var(--color-ink-3); margin-top: 2px; }
        .m1-arrow { color: var(--color-accent-deep); opacity: 0; transition: opacity 200ms ease; }
        .m1 td { text-align: center; }
        .m1 td.m1-mob { display: none; }
        .m1-dot { display: inline-block; width: 14px; height: 14px; border-radius: 999px; background: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.16); }
        .m1-no { display: inline-block; width: 6px; height: 6px; border-radius: 999px; background: var(--color-rule-strong); }
        .m1 tbody tr { transition: background 200ms ease; }
        .m1 tbody tr:hover { background: rgb(49 177 248 / 0.07); }
        .m1 tbody tr:hover .m1-arrow { opacity: 1; }
        .m1 tbody tr:last-child th, .m1 tbody tr:last-child td { border-bottom: 0; }
        @media (max-width: 1000px) {
          .m1 thead { display: none; } .m1, .m1 tbody, .m1 tr, .m1 th, .m1 td { display: block; width: 100%; }
          .m1 tr { border-bottom: 1px solid var(--color-rule); padding-bottom: 12px; } .m1 th, .m1 td { border: 0; }
          .m1 td { display: none; }
          .m1 td.m1-mob { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 18px 4px 70px; }
          .m1 td.m1-mob span { font-size: 11.5px; font-weight: 600; padding: 4px 9px; border-radius: 999px; background: var(--color-paper); color: var(--color-navy); }
        }
        /* M2 */
        .m2 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: 1px solid var(--color-rule); border-left: 1px solid var(--color-rule); border-radius: 20px; overflow: hidden; }
        .m2-cell { display: flex; flex-direction: column; gap: 8px; padding: 28px; border-right: 1px solid var(--color-rule); border-bottom: 1px solid var(--color-rule); color: var(--color-navy); text-decoration: none; background: #fff; transition: background 250ms ease, color 250ms ease; }
        .m2-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .m2-num { font: 500 15px var(--font-display); color: var(--color-accent-deep); letter-spacing: 0.06em; }
        .m2-top img { width: 36px; height: 36px; }
        .m2-title { font: 500 21px/1.2 var(--font-display); letter-spacing: -0.01em; }
        .m2-desc { font-size: 14.5px; line-height: 1.5; color: var(--color-ink-2); flex: 1; }
        .m2-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
        .m2-chips span { font-size: 11.5px; font-weight: 600; padding: 4px 9px; border-radius: 999px; background: var(--color-paper); color: var(--color-navy); }
        .m2-cta { display: inline-flex; gap: 6px; align-items: center; font-size: 13.5px; font-weight: 600; color: var(--color-accent-deep); margin-top: 8px; }
        .m2-cell:hover { background: var(--color-navy); color: #fff; }
        .m2-cell:hover .m2-desc { color: rgb(255 255 255 / 0.75); }
        .m2-cell:hover .m2-chips span { background: rgb(255 255 255 / 0.12); color: #fff; }
        .m2-cell:hover .m2-cta, .m2-cell:hover .m2-num { color: var(--color-accent); }
        @media (max-width: 1000px) { .m2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) { .m2 { grid-template-columns: 1fr; } }
        /* M3 */
        .m3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border: 1px solid rgb(255 255 255 / 0.14); border-radius: 20px; overflow: hidden; }
        .m3-col { border-left: 1px solid rgb(255 255 255 / 0.14); } .m3-col:first-child { border-left: 0; }
        .m3-head { padding: 24px 26px; background: rgb(255 255 255 / 0.05); border-bottom: 1px solid rgb(255 255 255 / 0.14); display: flex; flex-direction: column; gap: 4px; color: #fff; }
        .m3-n { font: 500 14px var(--font-display); color: var(--color-accent); letter-spacing: 0.06em; }
        .m3-head strong { font: 500 26px var(--font-display); } .m3-head small { font-size: 14px; color: rgb(255 255 255 / 0.65); }
        .m3-row { display: grid; grid-template-columns: 36px 1fr 16px; gap: 14px; align-items: center; padding: 20px 26px; border-bottom: 1px solid rgb(255 255 255 / 0.1); color: #fff; text-decoration: none; transition: background 200ms ease; }
        .m3-row:last-child { border-bottom: 0; }
        .m3-row img { width: 36px; height: 36px; }
        .m3-row strong { display: block; font-size: 16px; font-weight: 600; } .m3-row small { display: block; font-size: 13.5px; color: rgb(255 255 255 / 0.65); margin-top: 2px; }
        .m3-arrow { color: var(--color-accent); opacity: 0.5; }
        .m3-row:hover { background: rgb(49 177 248 / 0.1); } .m3-row:hover .m3-arrow { opacity: 1; }
        @media (max-width: 900px) { .m3 { grid-template-columns: 1fr; } .m3-col { border-left: 0; border-top: 1px solid rgb(255 255 255 / 0.14); } .m3-col:first-child { border-top: 0; } }
        @media (prefers-reduced-motion: reduce) { .m1 tbody tr, .m2-cell, .m3-row, .m1-arrow { transition: none !important; } }
      `}</style>
    </main>
  );
}
