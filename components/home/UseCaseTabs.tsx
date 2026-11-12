"use client";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { HomeUseCase } from "@/lib/home-use-cases";
import { HOME_USE_CASE_MEDIA } from "@/lib/home-use-cases";

// Home v2 · casos de uso, variante A4 «profundidad editorial» de la maqueta T4b (elegida por JR), sin el recorte
// flotante. Fila superior con los 9 nombres y una píldora navy que se desliza; debajo, captura real del dashboard en
// leve perspectiva y, a la derecha, intro grande + descripción + viñetas + enlace. En móvil, rejilla de 3 columnas.
// Pestañas accesibles (tablist, foco itinerante, flechas, Inicio/Fin). Los 9 paneles se apilan en la misma celda
// para que la altura no cambie al pasar de un caso a otro (los ocultos, con visibility: hidden + inert; no se usa
// el atributo hidden porque el preflight de Tailwind lo fuerza a display: none !important).
const Check = () => (
  <svg className="uct-i" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 7" /></svg>
);
const Arrow = () => (
  <svg className="uct-i" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function UseCaseTabs({ items, lang }: { items: HomeUseCase[]; lang: "es" | "en" }) {
  const [on, setOn] = useState(0);
  const uid = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const cta = lang === "en" ? "Explore use case" : "Ver caso de uso";
  const n = items.length;

  const select = (k: number, focus: boolean) => {
    setOn(k);
    if (focus) tabs.current[k]?.focus({ preventScroll: true });
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, k: number) => {
    const grid = window.matchMedia("(max-width: 900px)").matches;
    let to: number | null = null;
    if (e.key === "ArrowRight") to = (k + 1) % n;
    else if (e.key === "ArrowLeft") to = (k - 1 + n) % n;
    else if (grid && e.key === "ArrowDown") to = (k + 3) % n;
    else if (grid && e.key === "ArrowUp") to = (k - 3 + n) % n;
    else if (e.key === "Home") to = 0;
    else if (e.key === "End") to = n - 1;
    if (to !== null) { e.preventDefault(); select(to, true); }
  };

  return (
    <div className="uct">
      <div className="uct-tabs" role="tablist" aria-label={lang === "en" ? "Use cases" : "Casos de uso"} style={{ ["--i" as string]: on, ["--n" as string]: n }}>
        <span className="uct-ind" aria-hidden="true" />
        {items.map((u, k) => {
          const [a, b] = (u.tab || u.title).split("|");
          return (
            <button key={u.href} ref={(el) => { tabs.current[k] = el; }} type="button" role="tab" id={`${uid}t${k}`} aria-controls={`${uid}p${k}`}
              aria-selected={k === on} tabIndex={k === on ? 0 : -1} onClick={() => select(k, false)} onKeyDown={(e) => onKey(e, k)}>
              <span>{a}</span>{b ? <> <span>{b}</span></> : null}
            </button>
          );
        })}
      </div>
      <div className="uct-st">
        {items.map((u, k) => {
          const m = HOME_USE_CASE_MEDIA[u.href];
          return (
            <div key={u.href} className={`uct-p${k === on ? "" : " is-off"}`} role="tabpanel" id={`${uid}p${k}`} aria-labelledby={`${uid}t${k}`}
              aria-hidden={k !== on} inert={k !== on} tabIndex={k === on ? 0 : -1}>
              <div className="uct-cap uct-scene">
                <div className="uct-frame" style={{ ["--fx" as string]: m?.fx || "0%" }}>
                  {m && <img className={`uct-shot${m.shotIsPhoto ? " is-foto" : ""}`} src={m.shot} alt={u.title} width={1500} height={860} loading="lazy" decoding="async" />}
                </div>
              </div>
              <div className="uct-tx">
                <h3>{u.intro}</h3>
                <p>{u.desc}</p>
                <ul className="uct-ck">{u.bullets.map((b) => <li key={b}><Check /><span>{b}</span></li>)}</ul>
                <a className="uct-go" href={u.href}>{cta} <Arrow /></a>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        .uct { --out: cubic-bezier(.23,1,.32,1); --ring: rgb(21 22 58 / .09);
          --sh-win: 0 1px 1px rgb(21 22 58/.05), 0 8px 16px -6px rgb(21 22 58/.1), 0 32px 64px -24px rgb(21 22 58/.22), 0 72px 120px -48px rgb(21 22 58/.2); color: var(--color-navy); }
        .uct-i { flex: none; }
        .uct-tabs { position: relative; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); background: #fff; border-radius: 18px; padding: 6px;
          box-shadow: 0 0 0 1px var(--ring), 0 10px 24px -14px rgb(21 22 58 / .2); margin-bottom: 56px; }
        .uct-tabs button { position: relative; z-index: 1; font: 500 14.5px/1.2 var(--font-display); letter-spacing: -.006em; padding: 11px 4px 12px; text-align: center;
          color: #50596e; background: none; border: 0; cursor: pointer; border-radius: 13px; transition: color 180ms ease; }
        .uct-tabs button span { display: block; }
        .uct-tabs button:hover { color: var(--color-navy); }
        .uct-tabs button[aria-selected=true] { color: #fff; }
        .uct-tabs button:active span { transform: translateY(.5px); }
        .uct-tabs button:focus-visible { outline: 2px solid var(--color-accent-deep); outline-offset: 2px; }
        .uct-ind { position: absolute; pointer-events: none; left: 6px; top: 6px; bottom: 6px; width: calc((100% - 12px) / var(--n)); background: var(--color-navy); border-radius: 13px;
          transform: translateX(calc(var(--i, 0) * 100%)); transition: transform 320ms var(--out); }
        .uct-st { display: grid; grid-template-columns: minmax(0, 1fr); }
        .uct-st > * { grid-area: 1 / 1; min-width: 0; }
        .uct-st > .is-off { visibility: hidden; transition: visibility 0s linear 240ms; }
        .uct-p:focus-visible { outline: 2px solid var(--color-accent-deep); outline-offset: 6px; border-radius: 14px; }
        .uct-p { display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 5fr); gap: 64px; align-items: center; }
        .uct-tx { display: flex; flex-direction: column; align-items: flex-start; }
        .uct-tx > * { transition: opacity 240ms var(--out), transform 320ms var(--out); }
        .is-off .uct-tx > * { opacity: 0; transform: translateY(6px); transition: opacity 80ms linear, transform 0s linear 80ms; }
        .uct-tx > :nth-child(2) { transition-delay: 20ms; } .uct-tx > :nth-child(3) { transition-delay: 40ms; } .uct-tx > :nth-child(4) { transition-delay: 60ms; }
        .is-off .uct-tx > :nth-child(n) { transition-delay: 0s; }
        .uct-cap { transition: opacity 240ms var(--out); }
        .is-off .uct-cap { opacity: 0; }
        .uct-scene { position: relative; perspective: 2200px; }
        .uct-frame { position: relative; aspect-ratio: 1.74; background: #fff; border-radius: 14px; overflow: hidden; transform: rotateY(5deg) rotateX(1deg); transform-origin: 0 50%;
          box-shadow: 0 0 0 1px var(--ring), var(--sh-win); }
        .uct-shot { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 0 0; }
        .uct-tx h3 { font: 400 clamp(30px, 3vw, 42px)/1.06 var(--font-display); letter-spacing: -.022em; margin: 0 0 18px; color: var(--color-navy); }
        .uct-tx p { color: var(--color-ink-2); font-size: 16.5px; line-height: 1.6; margin: 0 0 20px; text-wrap: pretty; }
        .uct-ck { display: grid; grid-template-columns: 1fr 1fr; gap: 9px 20px; width: 100%; list-style: none; padding: 0; margin: 0 0 26px; }
        .uct-ck li { display: flex; gap: 9px; align-items: flex-start; font-size: 15px; line-height: 1.35; }
        .uct-ck .uct-i { margin-top: 1px; color: #0c6fd5; }
        .uct-go { display: inline-flex; align-items: center; gap: 9px; text-decoration: none; font-size: 15px; line-height: 1; border-radius: 9px; padding: 13px 18px;
          background: var(--color-accent); color: var(--color-navy); transition: background-color 160ms ease, transform 160ms var(--out); }
        .uct-go .uct-i { transition: transform 200ms var(--out); }
        .uct-go:hover { background: #58c0fa; }
        .uct-go:hover .uct-i { transform: translateX(3px); }
        .uct-go:active { transform: scale(.97); }
        .uct-go:focus-visible { outline: 2px solid var(--color-accent-deep); outline-offset: 2px; }
        @media (max-width: 1180px) { .uct-tabs button { font-size: 12.5px; } .uct-p { gap: 44px; } }
        @media (max-width: 900px) {
          .uct-tabs { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; background: none; box-shadow: none; padding: 0; margin: 0 0 16px; border-radius: 0; }
          .uct-ind { display: none; }
          .uct-tabs button { font: 400 12.5px/1.22 var(--font-body); padding: 9px 6px 9px 7px; text-align: left; border-radius: 9px; min-height: 50px;
            box-shadow: inset 0 0 0 1px var(--ring); color: var(--color-navy); background: #fff; }
          .uct-tabs button[aria-selected=true] { background: var(--color-navy); color: #fff; box-shadow: none; }
          .uct-p { grid-template-columns: minmax(0, 1fr); gap: 24px; align-content: start; }
          .uct-frame { transform: none; aspect-ratio: 1.22; }
          /* La captura se amplía y enfoca su zona útil para que siga legible en móvil */
          .uct-shot:not(.is-foto) { position: absolute; left: 0; top: 0; width: 190%; max-width: none; height: auto; object-fit: initial; transform: translateX(calc(var(--fx, 0%) * -1)); }
          .uct-tx h3 { font-size: 30px; }
          .uct-ck { grid-template-columns: 1fr; }
        }
        @media (max-width: 400px) { .uct-tabs button { font-size: 12px; } }
        @media (prefers-reduced-motion: reduce) { .uct-ind, .uct-tx > *, .uct-cap, .uct-st > .is-off, .uct-go, .uct-go .uct-i { transition: none !important; } }
      `}</style>
    </div>
  );
}
