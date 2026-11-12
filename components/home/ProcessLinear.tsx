"use client";
import { useEffect, useState } from "react";

// Home v2 · proceso lineal (variante A de la maqueta proceso4, elegida por JR). Tres pasos unidos por una línea
// de puntos azul con flujo suave; en móvil, vertical con la línea entre pasos. Todos los textos llegan por props
// desde lib/home-config.ts. El sector del titular rota cada 3 s, como en el bloque antiguo del WP.
type Step = { title: string; desc: string };

const ICONS = [
  // 1 · cámara CCTV
  <svg key="cam" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" /><path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" /><path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" /><path d="M2 21v-4" /><path d="M7 9h.01" stroke="#31b1f8" strokeWidth="2.4" /></svg>,
  // 2 · zona con línea de conteo
  <svg key="zone" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 6.5l12-1.5 2 11.5-13 2z" strokeDasharray="2.2 2" /><circle cx="5" cy="6.5" r="1.4" fill="#fff" /><circle cx="17" cy="5" r="1.4" fill="#fff" /><circle cx="19" cy="16.5" r="1.4" fill="#fff" /><circle cx="6" cy="18.5" r="1.4" fill="#fff" /><path d="M3 12.5h18" stroke="#31b1f8" strokeWidth="1.8" /><path d="M14.5 10.2l2.3 2.3-2.3 2.3" stroke="#31b1f8" strokeWidth="1.8" /></svg>,
  // 3 · dashboard
  <svg key="dash" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8.5h18" /><path d="M7.5 17v-3.5M11 17v-5.5M14.5 17v-2.5" /><path d="M17.5 17v-4.5" stroke="#31b1f8" strokeWidth="1.8" /><circle cx="5.5" cy="6.25" r=".5" fill="currentColor" /><circle cx="7.3" cy="6.25" r=".5" fill="currentColor" /></svg>,
];

// Resalta "Ember AI" dentro de la frase de Ember (sin marcado en la config).
function EmberLine({ text }: { text: string }) {
  const parts = text.split(/(Ember AI)/);
  return <span className="pl-ember">{parts.map((p, i) => (p === "Ember AI" ? <em key={i}>{p}</em> : p))}</span>;
}

export default function ProcessLinear({ title, titleHl, rotate, sub, steps, ember }: {
  title: string; titleHl: string; rotate?: string[]; sub?: string; steps: Step[]; ember?: string;
}) {
  const words = rotate && rotate.length > 1 ? rotate : [titleHl];
  const start = Math.max(0, words.indexOf(titleHl));
  const [i, setI] = useState(start);
  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setI((k) => (k + 1) % words.length), 3000);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <section className="pl">
      <div className="flame-container">
        <header className="pl-head">
          <h2 className="pl-h2">{title}{" "}
            {/* En escritorio cabe en una línea; por debajo de 1180 px el sector va siempre en su propia línea, así el
                titular mide lo mismo con cualquier sector y no salta al rotar */}
            <span key={i} className="pl-hl is-on">{words[i]}</span>
          </h2>
          {sub && <p className="pl-sub">{sub}</p>}
        </header>
        <ol className="pl-steps">
          {steps.slice(0, 3).map((s, k) => (
            <li key={s.title} className="pl-st">
              <div className="pl-ic" aria-hidden="true">{ICONS[k]}</div>
              <div>
                <span className="pl-num">{String(k + 1).padStart(2, "0")}</span>
                <h3 className="pl-h3">{s.title}</h3>
                <p className="pl-p">{s.desc}{k === 2 && ember ? <> <EmberLine text={ember} /></> : null}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        .pl { background: #fff; color: var(--color-navy); padding: 104px 0; }
        .pl-head { text-align: center; max-width: 1100px; margin: 0 auto 72px; }
        .pl-h2 { font: 400 40px/1.1 var(--font-display); letter-spacing: -0.02em; margin: 0; color: var(--color-navy); }
        .pl-hl { white-space: nowrap; color: var(--color-accent); font-weight: 500; animation: plIn 400ms ease both; }
        @keyframes plIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 1180px) { .pl-hl { display: block; } }
        .pl-sub { color: var(--color-ink-2); font-size: 17px; line-height: 1.5; margin: 12px 0 0; }
        .pl-steps { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px; list-style: none; margin: 0; padding: 0; }
        .pl-steps::before { content: ""; position: absolute; top: 44px; left: calc(16.66% + 44px); right: calc(16.66% + 44px); height: 2px;
          background-image: radial-gradient(circle, var(--color-accent) 1.6px, transparent 1.8px); background-size: 12px 2px; background-repeat: repeat-x;
          animation: plFlujo 1.6s linear infinite; }
        @keyframes plFlujo { to { background-position: 12px 0; } }
        @keyframes plFlujoV { to { background-position: 0 12px; } }
        .pl-st { text-align: center; position: relative; }
        .pl-ic { width: 88px; height: 88px; margin: 0 auto 26px; border-radius: 50%; background: #fff; border: 1.5px solid rgb(49 177 248 / 0.45);
          display: flex; align-items: center; justify-content: center; color: var(--color-navy); position: relative; z-index: 1; box-shadow: 0 0 0 10px #fff; }
        .pl-ic svg { width: 40px; height: 40px; }
        .pl-num { display: block; font: 500 14px/1 var(--font-display); color: var(--color-accent-deep); letter-spacing: 0.06em; margin-bottom: 10px; }
        .pl-h3 { font: 500 22px/1.25 var(--font-display); letter-spacing: -0.01em; margin: 0 0 12px; color: var(--color-navy); }
        .pl-p { color: var(--color-ink-2); font-size: 16px; line-height: 1.6; max-width: 34ch; margin: 0 auto; }
        .pl-ember { color: var(--color-navy); font-weight: 500; }
        .pl-ember em { font-style: normal; color: var(--color-accent-deep); }
        @media (max-width: 860px) {
          .pl { padding: 64px 0; }
          .pl-head { margin-bottom: 44px; }
          .pl-h2 { font-size: 31px; }
          .pl-steps { grid-template-columns: 1fr; gap: 40px; }
          .pl-steps::before { display: none; }
          .pl-st:not(:last-child)::before { content: ""; position: absolute; left: 43px; top: 96px; bottom: -36px; width: 2px;
            background-image: radial-gradient(circle, var(--color-accent) 1.6px, transparent 1.8px); background-size: 2px 12px; background-repeat: repeat-y;
            animation: plFlujoV 1.6s linear infinite; }
          .pl-st { text-align: left; display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 20px; align-items: start; }
          .pl-ic { margin: 0; }
          .pl-p { margin: 0; max-width: none; }
        }
        @media (max-width: 420px) {
          .pl-h2 { font-size: 28px; }
          .pl-st { grid-template-columns: 72px minmax(0, 1fr); gap: 16px; }
          .pl-ic { width: 72px; height: 72px; box-shadow: 0 0 0 8px #fff; }
          .pl-ic svg { width: 34px; height: 34px; }
          .pl-st:not(:last-child)::before { left: 35px; top: 80px; }
        }
        @media (prefers-reduced-motion: reduce) { .pl-steps::before, .pl-st::before { animation: none !important; } .pl-hl { animation: none; } }
      `}</style>
    </section>
  );
}
