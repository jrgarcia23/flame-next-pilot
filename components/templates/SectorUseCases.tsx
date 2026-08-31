import Icon from "./Icon";
import SectorUseCasesTabs from "./SectorUseCasesTabs";

export type UCItem = { svg?: string; img?: string; title: string; desc: string; href: string };
export type UCLayout = "cards" | "compact" | "list" | "rows" | "minigrid" | "chips" | "tabs" | "timeline" | "directory" | "numbers";

export default function SectorUseCases({
  layout = "cards",
  eyebrow,
  title,
  sub,
  items,
  currentLang = "es",
  showHeader = true,
  sectionClassName = "py-24",
}: {
  layout?: UCLayout;
  eyebrow?: string;
  title?: string;
  sub?: string;
  items: UCItem[];
  currentLang?: "es" | "en";
  showHeader?: boolean;
  sectionClassName?: string;
}) {
  if (!items || items.length === 0) return null;
  const see = currentLang === "en" ? "See use case" : "Ver caso de uso";
  const icon = (u: UCItem, size: number) =>
    u.img
      ? <img src={u.img} alt="" style={{ width: size, height: size, objectFit: "contain", display: "block" }} />
      : <span className="uc-svg" dangerouslySetInnerHTML={{ __html: u.svg || "" }} />;

  return (
    <section className={sectionClassName} style={{ background: "#fff" }}>
      <div className="flame-container">
        {showHeader && (
          <div className="mb-10 max-w-[720px]">
            <span className="uc-eyebrow">{eyebrow || (currentLang === "en" ? "Use cases" : "Casos de uso")}</span>
            {title && <h2 className="text-[clamp(26px,3vw,42px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>{title}</h2>}
            {sub && <p className="mt-3.5 text-[clamp(16px,1.2vw,18px)] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{sub}</p>}
          </div>
        )}

        {layout === "tabs" ? (
          <SectorUseCasesTabs items={items} currentLang={currentLang} />
        ) : layout === "timeline" ? (
          <ol className="uc-tl">
            {items.map((u, i) => (
              <li key={i} className="uc-tli">
                <a href={u.href} className="uc-tla">
                  <span className="uc-tlnode">{icon(u, 24)}</span>
                  <span className="uc-tlbody">
                    <b>{u.title}</b>
                    <span>{u.desc}</span>
                    <span className="uc-tlcta">{see} <Icon name="arrow" className="w-3.5 h-3.5" /></span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        ) : layout === "directory" ? (
          <div className="uc-dir">
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-dirow">
                <span className="uc-dico">{icon(u, 26)}</span>
                <span className="uc-dmain">
                  <span className="uc-dtitle"><b>{u.title}</b><span className="uc-dlead" /><Icon name="arrow" className="uc-darrow w-3.5 h-3.5" /></span>
                  <span className="uc-ddesc">{u.desc}</span>
                </span>
              </a>
            ))}
          </div>
        ) : layout === "numbers" ? (
          <div className="uc-nums">
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-numrow">
                <span className="uc-bignum">{String(i + 1).padStart(2, "0")}</span>
                <span className="uc-numbody">
                  <span className="uc-numhead"><span className="uc-numico">{icon(u, 22)}</span><b>{u.title}</b></span>
                  <span className="uc-numdesc">{u.desc}</span>
                </span>
                <Icon name="arrow" className="uc-numarrow w-4 h-4" />
              </a>
            ))}
          </div>
        ) : layout === "chips" ? (
          <div className="uc-chips">
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-chip">{icon(u, 24)}<span>{u.title}</span><Icon name="arrow" className="w-3.5 h-3.5" /></a>
            ))}
          </div>
        ) : layout === "list" ? (
          <div className="uc-list">
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-row">
                <span className="uc-rico">{icon(u, 34)}</span>
                <span className="uc-rtext"><b>{u.title}</b><span>{u.desc}</span></span>
                <Icon name="arrow" className="uc-rarrow w-4 h-4" />
              </a>
            ))}
          </div>
        ) : layout === "rows" ? (
          <div className="uc-rows">
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-hrow">
                <span className="uc-hico">{icon(u, 34)}</span>
                <span className="uc-htext"><b>{u.title}</b><span>{u.desc}</span></span>
                <Icon name="arrow" className="uc-harrow w-4 h-4" />
              </a>
            ))}
          </div>
        ) : layout === "minigrid" ? (
          <div className="uc-mini">
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-minicard">
                <span className="uc-miniico">{icon(u, 40)}</span>
                <b>{u.title}</b>
              </a>
            ))}
          </div>
        ) : layout === "compact" ? (
          <div className="uc-cgrid">
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-ccard">
                <span className="uc-cico">{icon(u, 38)}</span>
                <b>{u.title}</b>
                <Icon name="arrow" className="uc-carrow w-4 h-4" />
              </a>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 uc-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {items.map((u, i) => (
              <a key={i} href={u.href} className="uc-card rounded-2xl p-7 flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <span className="uc-ico inline-flex items-center justify-center rounded-[13px] mb-5" style={{ width: 50, height: 50, background: "rgb(49 177 248 / 0.12)" }}>{icon(u, 30)}</span>
                <h3 className="text-[19px] font-medium mb-2.5" style={{ color: "var(--color-navy)", letterSpacing: "-0.01em", lineHeight: 1.25, fontFamily: "var(--font-display)" }}>{u.title}</h3>
                <p className="text-[15px] leading-[1.6] flex-1 mb-5" style={{ color: "var(--color-ink-2)" }}>{u.desc}</p>
                <span className="uc-cta inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>{see} <Icon name="arrow" className="w-3.5 h-3.5" /></span>
              </a>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .uc-eyebrow { display:inline-block; font-family: var(--font-body); font-size:12.5px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color: var(--color-accent-deep); margin-bottom:14px; }
        .uc-svg svg { width:24px; height:24px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; color: var(--color-accent-deep); }
        /* cards */
        .uc-card { text-decoration:none; transition: transform .3s cubic-bezier(0.22,1,0.36,1), border-color .3s, box-shadow .3s; }
        .uc-card:hover { transform: translateY(-2px); border-color: rgb(49 177 248 / 0.4) !important; box-shadow: 0 10px 26px -16px rgb(15 23 42 / 0.18); }
        .uc-card .uc-cta { transition: gap .3s; }
        .uc-card:hover .uc-cta { gap: 10px; }
        @media (max-width: 980px){ .uc-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 640px){ .uc-grid { grid-template-columns: 1fr !important; } }
        /* compact: 3 col, icono + titulo + flecha */
        .uc-cgrid { display:grid; grid-template-columns: repeat(3,1fr); gap:14px; }
        .uc-ccard { display:flex; align-items:center; gap:14px; padding:18px 20px; border:1px solid var(--color-rule); border-radius:15px; background:#fff; text-decoration:none; transition: transform .25s, border-color .25s, box-shadow .25s; }
        .uc-ccard:hover { transform: translateY(-2px); border-color: rgb(49 177 248 / .45); box-shadow: 0 10px 24px -16px rgb(15 23 42 / .2); }
        .uc-cico { flex-shrink:0; display:inline-flex; }
        .uc-ccard b { flex:1; min-width:0; font-family: var(--font-display); font-weight:500; font-size:16px; letter-spacing:-.01em; color: var(--color-navy); line-height:1.2; }
        .uc-carrow { color: var(--color-accent-deep); flex-shrink:0; transition: transform .25s; }
        .uc-ccard:hover .uc-carrow { transform: translateX(3px); }
        @media (max-width: 900px){ .uc-cgrid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px){ .uc-cgrid { grid-template-columns: 1fr; } }
        /* list: 2 col, icono + [titulo + desc 1 linea] + flecha */
        .uc-list { display:grid; grid-template-columns: repeat(2,1fr); gap:14px; }
        .uc-row { display:flex; align-items:center; gap:16px; padding:16px 20px; border:1px solid var(--color-rule); border-radius:14px; background:#fff; text-decoration:none; transition: border-color .25s, box-shadow .25s, transform .25s; }
        .uc-row:hover { transform: translateY(-1px); border-color: rgb(49 177 248 / .45); box-shadow: 0 8px 20px -14px rgb(15 23 42 / .2); }
        .uc-rico { flex-shrink:0; display:inline-flex; }
        .uc-rtext { flex:1; min-width:0; }
        .uc-rtext b { display:block; font-family: var(--font-display); font-weight:500; font-size:16.5px; letter-spacing:-.01em; color: var(--color-navy); line-height:1.25; }
        .uc-rtext > span { display:block; font-size:13.5px; color: var(--color-ink-3); line-height:1.35; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .uc-rarrow { color: var(--color-accent-deep); flex-shrink:0; }
        @media (max-width: 760px){ .uc-list { grid-template-columns: 1fr; } }
        /* rows: full-width con hairlines, sin cajas */
        .uc-rows { border-top:1px solid var(--color-rule); }
        .uc-hrow { display:flex; align-items:center; gap:18px; padding:20px 6px; border-bottom:1px solid var(--color-rule); text-decoration:none; transition: background .2s, padding .2s; }
        .uc-hrow:hover { background: var(--color-paper-soft); padding-left:14px; padding-right:14px; }
        .uc-hico { flex-shrink:0; display:inline-flex; }
        .uc-htext { flex:1; min-width:0; }
        .uc-htext b { display:block; font-family: var(--font-display); font-weight:500; font-size:18px; letter-spacing:-.01em; color: var(--color-navy); line-height:1.2; }
        .uc-htext > span { display:block; font-size:14px; color: var(--color-ink-2); margin-top:3px; line-height:1.4; }
        .uc-harrow { color: var(--color-accent-deep); flex-shrink:0; }
        /* minigrid: 3 col centrado, icono + titulo */
        .uc-mini { display:grid; grid-template-columns: repeat(3,1fr); gap:16px; }
        .uc-minicard { display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px; padding:28px 18px; border:1px solid var(--color-rule); border-radius:16px; background:#fff; text-decoration:none; transition: transform .25s, border-color .25s, box-shadow .25s; }
        .uc-minicard:hover { transform: translateY(-2px); border-color: rgb(49 177 248 / .45); box-shadow: 0 10px 24px -16px rgb(15 23 42 / .2); }
        .uc-miniico { display:inline-flex; }
        .uc-minicard b { font-family: var(--font-display); font-weight:500; font-size:16.5px; letter-spacing:-.01em; color: var(--color-navy); line-height:1.25; }
        @media (max-width: 760px){ .uc-mini { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 460px){ .uc-mini { grid-template-columns: 1fr; } }
        /* chips: pildoras icono + titulo */
        .uc-chips { display:flex; flex-wrap:wrap; gap:12px; }
        .uc-chip { display:inline-flex; align-items:center; gap:9px; padding:11px 17px; border:1px solid var(--color-rule); border-radius:999px; background:#fff; text-decoration:none; color: var(--color-navy); font-family: var(--font-display); font-weight:500; font-size:15.5px; letter-spacing:-.01em; transition: border-color .25s, box-shadow .25s, transform .25s; }
        .uc-chip:hover { transform: translateY(-1px); border-color: rgb(49 177 248 / .5); box-shadow: 0 8px 20px -14px rgb(15 23 42 / .22); }
        .uc-chip svg:last-child { color: var(--color-accent-deep); }
        /* timeline: rail vertical + nodos */
        .uc-tl { list-style:none; margin:0; padding:0; position:relative; }
        .uc-tl::before { content:""; position:absolute; left:23px; top:14px; bottom:14px; width:2px; background: var(--color-rule); }
        .uc-tla { display:flex; gap:20px; padding:14px 0; text-decoration:none; align-items:flex-start; }
        .uc-tlnode { position:relative; z-index:1; flex-shrink:0; width:48px; height:48px; border-radius:50%; background:#fff; border:1px solid var(--color-rule); display:inline-flex; align-items:center; justify-content:center; color: var(--color-accent-deep); transition: border-color .2s, box-shadow .2s; }
        .uc-tla:hover .uc-tlnode { border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / .12); }
        .uc-tlbody { flex:1; min-width:0; padding-top:3px; }
        .uc-tlbody b { display:block; font-family: var(--font-display); font-weight:500; font-size:18px; color: var(--color-navy); letter-spacing:-.01em; }
        .uc-tlbody > span { display:block; font-size:14.5px; color: var(--color-ink-2); margin-top:3px; line-height:1.5; max-width:70ch; }
        .uc-tlcta { display:inline-flex !important; align-items:center; gap:6px; margin-top:8px; font-size:13.5px; font-weight:600; color: var(--color-accent-deep); }
        /* directory: 2 col con líneas guía punteadas */
        .uc-dir { display:grid; grid-template-columns: repeat(2,1fr); gap:8px 44px; }
        .uc-dirow { display:flex; gap:14px; padding:16px 0; border-bottom:1px solid var(--color-rule); text-decoration:none; }
        .uc-dico { flex-shrink:0; display:inline-flex; color: var(--color-accent-deep); padding-top:2px; }
        .uc-dmain { flex:1; min-width:0; }
        .uc-dtitle { display:flex; align-items:center; gap:10px; }
        .uc-dtitle b { font-family: var(--font-display); font-weight:500; font-size:17px; color: var(--color-navy); letter-spacing:-.01em; white-space:nowrap; }
        .uc-dlead { flex:1; border-bottom:1px dotted var(--color-rule-strong); transform: translateY(-3px); }
        .uc-darrow { color: var(--color-accent-deep); flex-shrink:0; transition: transform .2s; }
        .uc-dirow:hover .uc-darrow { transform: translateX(3px); }
        .uc-ddesc { display:block; font-size:13.5px; color: var(--color-ink-3); margin-top:5px; line-height:1.4; }
        @media (max-width: 760px){ .uc-dir { grid-template-columns: 1fr; } }
        /* numbers: editorial con números grandes */
        .uc-nums { display:grid; grid-template-columns: repeat(2,1fr); gap:0 44px; }
        .uc-numrow { display:flex; align-items:flex-start; gap:18px; padding:22px 0; border-top:1px solid var(--color-rule); text-decoration:none; }
        .uc-bignum { font-family: var(--font-display); font-weight:700; font-size:34px; line-height:1; color: rgb(49 177 248 / .35); flex-shrink:0; width:44px; }
        .uc-numbody { flex:1; min-width:0; }
        .uc-numhead { display:flex; align-items:center; gap:10px; }
        .uc-numico { display:inline-flex; color: var(--color-accent-deep); }
        .uc-numhead b { font-family: var(--font-display); font-weight:500; font-size:18px; color: var(--color-navy); letter-spacing:-.01em; }
        .uc-numdesc { display:block; font-size:14px; color: var(--color-ink-2); margin-top:6px; line-height:1.5; }
        .uc-numarrow { color: var(--color-accent-deep); flex-shrink:0; margin-top:8px; }
        @media (max-width: 760px){ .uc-nums { grid-template-columns: 1fr; gap:0; } }
      `}</style>
    </section>
  );
}
