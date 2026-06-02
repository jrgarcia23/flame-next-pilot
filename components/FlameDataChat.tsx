"use client";

/**
 * FlameDataChat — Chat "pregunta a tus datos" autoanimado (estilo auravision).
 * Pensado para el hero de páginas de producto (p. ej. Conversion Analytics).
 *
 * Usa las variables de marca del proyecto (--color-navy, --color-accent,
 * --font-display, --font-body) definidas en globals.css. No hardcodea fuentes.
 *
 * Regla Flame: sin biometría. Solo afluencia, funnel, zonas y conversión.
 */

import { useEffect, useRef, useState } from "react";

type Metric = [value: string, label: string];
type FunnelStep = [label: string, value: string, pct: number];
type Msg =
  | { from: "user"; text: string; pauseAfter?: number }
  | {
      from: "bot";
      text: string;
      metrics?: Metric[];
      funnel?: FunnelStep[];
      typingMs?: number;
      pauseAfter?: number;
    };

const SCRIPT: Msg[] = [
  { from: "user", text: "¿Cuál fue mi tasa de conversión esta semana?", pauseAfter: 900 },
  {
    from: "bot",
    typingMs: 1400,
    text: "<b>26,4%</b> — sube <b>+3,1 pts</b> respecto a la semana pasada 📈",
    metrics: [["26,4%", "Conversión"], ["41%", "Captación"], ["+3,1", "pts vs. ant."]],
    pauseAfter: 1900,
  },
  { from: "user", text: "¿Dónde pierdo clientes en el funnel?", pauseAfter: 900 },
  {
    from: "bot",
    typingMs: 1500,
    text: "La mayor fuga está en escaparate → entrada. Del tráfico de calle, solo entra el 26%:",
    funnel: [
      ["Paseantes", "8.430", 100],
      ["Visitantes", "2.180", 62],
      ["Interesados", "1.140", 38],
      ["Compradores", "576", 20],
    ],
    pauseAfter: 2300,
  },
  { from: "user", text: "¿Qué zona convierte mejor?", pauseAfter: 900 },
  {
    from: "bot",
    typingMs: 1300,
    text: "<b>Novedades</b> lidera con un 34% de atracción y 9 min de permanencia media.",
    metrics: [["Novedades", "Top zona"], ["34%", "Atracción"], ["9 min", "Permanencia"]],
    pauseAfter: 2600,
  },
];

export default function FlameDataChat() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const scroll = () =>
      requestAnimationFrame(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      });

    async function run() {
      while (!cancelled) {
        setItems([]);
        await sleep(600);
        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return;
          const msg = SCRIPT[i];
          if (msg.from === "bot") {
            setTyping(true);
            scroll();
            await sleep(msg.typingMs ?? 1200);
            if (cancelled) return;
            setTyping(false);
          }
          setItems((prev) => [...prev, <Bubble key={`${i}-${prev.length}`} msg={msg} />]);
          scroll();
          await sleep(msg.pauseAfter ?? 1000);
        }
        await sleep(2600);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="fdc">
      <style>{CSS}</style>
      <div className="fdc__head">
        <div className="fdc__logo">F</div>
        <div>
          <div className="fdc__title">Flame · Pregunta a tus datos</div>
          <div className="fdc__status">En línea</div>
        </div>
      </div>
      <div className="fdc__body" ref={bodyRef}>
        {items}
        {typing && (
          <div className="fdc-row bot">
            <div className="fdc-typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      <div className="fdc__input">
        <span className="fdc__fake">Pregunta por conversión, funnel, zonas…</span>
        <span className="fdc__send" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 12l18-9-9 18-2.5-6.5L3 12z" fill="#fff" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  return (
    <div className={`fdc-row ${msg.from}`}>
      <div className="fdc-bubble">
        <span dangerouslySetInnerHTML={{ __html: msg.text }} />
        {msg.from === "bot" && msg.metrics && (
          <div className="fdc-metric">
            {msg.metrics.map(([v, l], idx) => (
              <div className="fdc-card" key={idx}>
                <b>{v}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        )}
        {msg.from === "bot" && msg.funnel && (
          <div className="fdc-funnel">
            {msg.funnel.map(([label, val, pct], idx) => (
              <div className="fdc-step" key={idx}>
                <span className="fdc-step__lbl">{label}</span>
                <span className="fdc-bar" style={{ width: `${pct}%` }} />
                <b>{val}</b>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const CSS = `
.fdc{width:100%;max-width:420px;background:#fff;border-radius:24px;
  box-shadow:0 34px 80px -28px rgba(3,5,20,.55),0 0 0 1px rgba(255,255,255,.06);
  overflow:hidden;display:flex;flex-direction:column;font-family:var(--font-body)}
.fdc__head{background:var(--color-navy);color:#fff;padding:16px 18px;display:flex;align-items:center;gap:12px}
.fdc__logo{width:36px;height:36px;border-radius:11px;flex-shrink:0;
  background:linear-gradient(135deg,var(--color-accent),var(--color-accent-deep));
  display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:600;font-size:17px;color:#fff}
.fdc__title{font-size:14.5px;font-weight:600;font-family:var(--font-display);letter-spacing:.2px;color:#fff}
.fdc__status{font-size:11.5px;color:#5fe39a;display:flex;align-items:center;gap:6px;margin-top:2px}
.fdc__status::before{content:"";width:7px;height:7px;border-radius:50%;background:#3ddc6f}
.fdc__body{padding:20px 16px;height:380px;overflow-y:auto;display:flex;flex-direction:column;gap:13px;scroll-behavior:smooth;background:#fafbfc}
.fdc__body::-webkit-scrollbar{width:0}
.fdc-row{display:flex;width:100%}
.fdc-row.user{justify-content:flex-end}
.fdc-row.bot{justify-content:flex-start}
.fdc-bubble{max-width:85%;padding:11px 15px;font-size:14px;line-height:1.5;color:var(--color-navy)}
.fdc-bubble b{font-weight:600}
.fdc-row.user .fdc-bubble{background:var(--color-accent);color:#fff;font-weight:500;
  border-radius:17px;border-bottom-right-radius:5px;
  opacity:0;transform:translate(14px,12px) scale(.96);animation:fdcR .42s cubic-bezier(.2,.8,.2,1) forwards}
.fdc-row.bot .fdc-bubble{background:#fff;border-radius:17px;border-bottom-left-radius:5px;
  box-shadow:0 6px 18px -10px rgba(21,22,58,.22);border:1px solid rgba(21,22,58,.05);
  opacity:0;transform:translate(-14px,12px) scale(.96);animation:fdcL .42s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes fdcR{to{opacity:1;transform:translate(0,0) scale(1)}}
@keyframes fdcL{to{opacity:1;transform:translate(0,0) scale(1)}}
.fdc-metric{margin-top:10px;display:flex;gap:7px;flex-wrap:wrap}
.fdc-card{background:rgba(49,177,248,.1);border-radius:13px;padding:9px 11px;flex:1;min-width:78px}
.fdc-card b{display:block;font-family:var(--font-display);font-size:18px;font-weight:600;color:var(--color-accent-deep);line-height:1.1}
.fdc-card span{font-size:10.5px;color:var(--color-ink-3)}
.fdc-funnel{margin-top:11px;display:flex;flex-direction:column;gap:7px}
.fdc-step{display:flex;align-items:center;gap:9px;font-size:11.5px;color:var(--color-ink-3)}
.fdc-step__lbl{min-width:66px}
.fdc-bar{height:10px;border-radius:5px;background:linear-gradient(90deg,var(--color-accent),var(--color-accent-deep))}
.fdc-step b{color:var(--color-navy);font-family:var(--font-display);font-weight:600;font-size:12.5px;min-width:42px;text-align:right}
.fdc-typing{display:flex;align-items:center;gap:5px;background:#fff;padding:13px 15px;border-radius:17px;border-bottom-left-radius:5px;
  box-shadow:0 6px 18px -10px rgba(21,22,58,.22);border:1px solid rgba(21,22,58,.05);width:fit-content;opacity:0;animation:fdcL .35s ease forwards}
.fdc-typing span{width:8px;height:8px;border-radius:50%;background:#c3cdda;animation:fdcBlink 1.3s infinite ease-in-out}
.fdc-typing span:nth-child(2){animation-delay:.2s}
.fdc-typing span:nth-child(3){animation-delay:.4s}
@keyframes fdcBlink{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-5px);opacity:1}}
.fdc__input{display:flex;align-items:center;gap:10px;padding:11px 15px;background:#fff;border-top:1px solid rgba(21,22,58,.06)}
.fdc__fake{flex:1;font-size:13px;color:#9aa6b6}
.fdc__send{width:32px;height:32px;border-radius:50%;background:var(--color-accent);display:flex;align-items:center;justify-content:center;flex-shrink:0}
`;
