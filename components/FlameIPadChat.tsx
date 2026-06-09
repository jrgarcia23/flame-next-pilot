"use client";

import { useEffect, useRef, useState } from "react";

type Metric = [string, string];
type FunnelStep = [string, string, number];
type Msg =
  | { from: "user"; text: string; pauseAfter?: number }
  | { from: "bot"; text: string; metrics?: Metric[]; funnel?: FunnelStep[]; typingMs?: number; pauseAfter?: number };

const SCRIPT: Msg[] = [
  { from: "user", text: "¿Cuál fue mi tasa de conversión esta semana?", pauseAfter: 900 },
  {
    from: "bot", typingMs: 1400,
    text: "<b>26,4%</b> — sube <b>+3,1 pts</b> respecto a la semana pasada 📈",
    metrics: [["26,4%", "Conversión"], ["41%", "Captación"], ["+3,1", "pts vs. ant."]],
    pauseAfter: 1900,
  },
  { from: "user", text: "¿Dónde pierdo clientes en el funnel?", pauseAfter: 900 },
  {
    from: "bot", typingMs: 1500,
    text: "La mayor fuga está en escaparate → entrada. Solo entra el 26% del tráfico:",
    funnel: [["Paseantes", "8.430", 100], ["Visitantes", "2.180", 62], ["Interesados", "1.140", 38], ["Compradores", "576", 20]],
    pauseAfter: 2300,
  },
  { from: "user", text: "¿Qué zona convierte mejor?", pauseAfter: 900 },
  {
    from: "bot", typingMs: 1300,
    text: "<b>Novedades</b> lidera: 34% de atracción y 9 min de permanencia.",
    metrics: [["Novedades", "Top zona"], ["34%", "Atracción"], ["9 min", "Permanencia"]],
    pauseAfter: 2600,
  },
];

export default function FlameIPadChat() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<React.ReactNode[]>([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const scroll = () => requestAnimationFrame(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; });

    async function run() {
      while (!cancelled) {
        setItems([]);
        await sleep(600);
        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return;
          const msg = SCRIPT[i];
          if (msg.from === "bot") {
            setTyping(true); scroll();
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
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ width: "100%", fontFamily: "var(--font-body, sans-serif)" }}>
      <style>{CSS}</style>

      {/* iPad frame */}
      <div className="fipad">
        <div className="fipad__cam" />
        <div className="fipad__power" />
        <div className="fipad__vol">
          <div className="fipad__vol-btn" />
          <div className="fipad__vol-btn" />
        </div>
        <div className="fipad__screen">
          <div className="fipad__chat">
            {/* Minimal status header */}
            <div className="fipad__head">
              <span className="fipad__head-title">Pregunta a tus datos de tienda</span>
              <span className="fipad__head-status">En línea</span>
            </div>
            <div className="fipad__body" ref={bodyRef}>
              {items}
              {typing && (
                <div className="fic-row bot">
                  <div className="fic-typing"><span /><span /><span /></div>
                </div>
              )}
            </div>
            <div className="fipad__input">
              <span className="fipad__fake">Conversión, funnel, zonas…</span>
              <span className="fipad__send" aria-hidden>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12l18-9-9 18-2.5-6.5L3 12z" fill="#fff" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="fipad__glare" />
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  return (
    <div className={`fic-row ${msg.from}`}>
      <div className="fic-bubble">
        <span dangerouslySetInnerHTML={{ __html: msg.text }} />
        {msg.from === "bot" && msg.metrics && (
          <div className="fic-metric">
            {msg.metrics.map(([v, l], i) => (
              <div className="fic-card" key={i}><b>{v}</b><span>{l}</span></div>
            ))}
          </div>
        )}
        {msg.from === "bot" && msg.funnel && (
          <div className="fic-funnel">
            {msg.funnel.map(([label, val, pct], i) => (
              <div className="fic-step" key={i}>
                <span className="fic-step__lbl">{label}</span>
                <span className="fic-bar" style={{ width: `${pct}%` }} />
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
/* ── iPad frame ── */
.fipad{position:relative;width:100%;aspect-ratio:1032/559;
  background:linear-gradient(145deg,#e8e8e8 0%,#d0d0d0 35%,#c4c4c4 65%,#b8b8b8 100%);
  border-radius:22px;
  transform:perspective(1100px) rotateY(-8deg) rotateX(2deg);
  transform-style:preserve-3d;
  transition:transform .4s ease;
  box-shadow:0 0 0 1px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.9),inset 0 -1px 0 rgba(0,0,0,.15),inset 1px 0 0 rgba(255,255,255,.6),18px 28px 60px -8px rgba(0,0,0,.22),6px 8px 20px -4px rgba(0,0,0,.14);
  overflow:visible}
.fipad:hover{transform:perspective(1100px) rotateY(-4deg) rotateX(1deg)}
.fipad::before{content:"";position:absolute;inset:0;border-radius:22px;border:1.5px solid rgba(255,255,255,.7);pointer-events:none;z-index:3}
.fipad__cam{position:absolute;top:5px;left:50%;transform:translateX(-50%);width:44px;height:4px;background:#aaa;border-radius:3px;z-index:4;box-shadow:inset 0 1px 2px rgba(0,0,0,.3)}
.fipad__cam::after{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:5px;height:5px;border-radius:50%;background:#999}
.fipad__power{position:absolute;right:-4px;top:28px;width:3.5px;height:38px;background:linear-gradient(180deg,#d8d8d8 0%,#b8b8b8 100%);border-radius:2px;box-shadow:-1px 0 3px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.5)}
.fipad__vol{position:absolute;right:-4px;top:96px;display:flex;flex-direction:column;gap:10px}
.fipad__vol-btn{width:3.5px;height:28px;background:linear-gradient(180deg,#d8d8d8 0%,#b8b8b8 100%);border-radius:2px;box-shadow:-1px 0 3px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.5)}
.fipad__screen{position:absolute;inset:8px 11px;border-radius:8px;overflow:hidden;background:#f7f8fa;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
.fipad__glare{position:absolute;top:8px;left:11px;right:11px;height:35%;background:linear-gradient(170deg,rgba(255,255,255,.12) 0%,transparent 100%);border-radius:8px 8px 0 0;pointer-events:none;z-index:2}
/* Chat layout */
.fipad__chat{display:flex;flex-direction:column;height:100%}
.fipad__head{background:#15163A;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.fipad__head-title{font-size:12px;font-weight:600;color:rgba(255,255,255,.7);letter-spacing:.15px}
.fipad__head-status{font-size:10.5px;color:#5fe39a;display:flex;align-items:center;gap:6px}
.fipad__head-status::before{content:"";width:7px;height:7px;border-radius:50%;background:#3ddc6f;display:inline-block;animation:fipulse 2.5s ease-in-out infinite}
@keyframes fipulse{0%,100%{box-shadow:0 0 0 0 rgba(61,220,111,.4)}55%{box-shadow:0 0 0 4px rgba(61,220,111,0)}}
.fipad__body{flex:1;padding:14px 18px;overflow-y:auto;display:flex;flex-direction:column;gap:11px;scroll-behavior:smooth;background:#f7f8fa}
.fipad__body::-webkit-scrollbar{width:0}
.fipad__input{display:flex;align-items:center;gap:9px;padding:10px 16px;background:#fff;border-top:1px solid rgba(21,22,58,.06);flex-shrink:0}
.fipad__fake{flex:1;font-size:12.5px;color:#9aa6b6}
.fipad__send{width:30px;height:30px;border-radius:50%;background:#31b1f8;display:flex;align-items:center;justify-content:center;flex-shrink:0}
/* Messages */
.fic-row{display:flex;width:100%}
.fic-row.user{justify-content:flex-end}
.fic-row.bot{justify-content:flex-start}
.fic-bubble{max-width:65%;padding:10px 14px;font-size:13px;line-height:1.55;color:#15163A}
.fic-bubble b{font-weight:600}
.fic-row.user .fic-bubble{background:#31b1f8;color:#fff;font-weight:500;border-radius:16px;border-bottom-right-radius:4px;opacity:0;transform:translate(12px,10px) scale(.96);animation:ficR .42s cubic-bezier(.2,.8,.2,1) forwards}
.fic-row.bot .fic-bubble{background:#fff;border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 4px 12px -6px rgba(21,22,58,.16);border:1px solid rgba(21,22,58,.05);opacity:0;transform:translate(-12px,10px) scale(.96);animation:ficL .42s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes ficR{to{opacity:1;transform:translate(0,0) scale(1)}}
@keyframes ficL{to{opacity:1;transform:translate(0,0) scale(1)}}
.fic-metric{margin-top:9px;display:flex;gap:7px}
.fic-card{background:rgba(49,177,248,.09);border-radius:12px;padding:9px 12px;flex:1}
.fic-card b{display:block;font-size:18px;font-weight:700;color:#0c6fd5;line-height:1.1}
.fic-card span{font-size:10.5px;color:#8896ab}
.fic-funnel{margin-top:10px;display:flex;flex-direction:column;gap:7px}
.fic-step{display:flex;align-items:center;gap:9px;font-size:11.5px;color:#8896ab}
.fic-step__lbl{min-width:66px}
.fic-bar{height:9px;border-radius:5px;background:linear-gradient(90deg,#31b1f8,#0c6fd5)}
.fic-step b{color:#15163A;font-weight:600;font-size:12px;min-width:44px;text-align:right}
.fic-typing{display:flex;align-items:center;gap:5px;background:#fff;padding:11px 14px;border-radius:16px;border-bottom-left-radius:4px;box-shadow:0 4px 12px -6px rgba(21,22,58,.16);border:1px solid rgba(21,22,58,.05);width:fit-content;opacity:0;animation:ficL .35s ease forwards}
.fic-typing span{width:7px;height:7px;border-radius:50%;background:#c3cdda;display:inline-block;animation:ficBlink 1.3s infinite ease-in-out}
.fic-typing span:nth-child(2){animation-delay:.2s}
.fic-typing span:nth-child(3){animation-delay:.4s}
@keyframes ficBlink{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}
`;
