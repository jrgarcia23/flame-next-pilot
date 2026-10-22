"use client";
import { useEffect, useState } from "react";
import Icon from "@/components/templates/Icon";

// Bloque "valor diferencial" de la home v2: informe de Flame Insights + Ember (chat IA) comentándolo.
// Cifras ILUSTRATIVAS, las mismas que ya usa el chat de la web (FlameDataChat). Sin biometría.
type Lang = "es" | "en";
const T = {
  es: {
    eyebrow: "Valor diferencial",
    h: <>No solo datos. <span>Respuestas.</span></>,
    p: "Flame Insights convierte la afluencia, la conversión y el comportamiento de tus espacios en informes con conclusiones claras. Y con Ember, el asistente de IA de Flame, le preguntas al informe en lenguaje natural y tienes la respuesta al momento.",
    bul: ["Informes con conclusiones, no solo gráficas", "Pregunta a tus datos en lenguaje natural", "Sin biometría, como todo Flame"],
    cta: "Conoce Flame Insights y Ember",
    rep: "Flame Insights · Informe semanal", period: "Semana 42 · Todas las tiendas",
    kpis: [["26,4%", "Conversión", "+3,1 pts"], ["8.430", "Paseantes", "+5%"], ["9 min", "Permanencia", "Novedades"]],
    chartT: "Embudo de la semana", funnel: [["Paseantes", 100], ["Visitantes", 62], ["Interesados", 38], ["Compradores", 20]],
    concl: "Conclusiones clave", c: ["La conversión sube +3,1 pts frente a la semana pasada", "La mayor fuga está entre escaparate y entrada", "Novedades es la zona que más atrae"],
    chat: [
      { u: "Resúmeme el informe de esta semana", e: "La conversión sube a un <b>26,4%</b> (+3,1 pts). Buena semana.", hl: "k0" },
      { u: "¿Dónde pierdo más clientes?", e: "Entre escaparate y entrada: del tráfico de calle solo entra el <b>26%</b>.", hl: "f" },
      { u: "¿Y qué zona funciona mejor?", e: "<b>Novedades</b>: un 34% de atracción y 9 min de permanencia media.", hl: "k2" },
    ],
    ember: "Ember · Asistente IA", online: "Analizando tu informe",
  },
  en: {
    eyebrow: "What sets us apart",
    h: <>Not just data. <span>Answers.</span></>,
    p: "Flame Insights turns the footfall, conversion and behaviour of your spaces into reports with clear conclusions. And with Ember, Flame's AI assistant, you ask the report in plain language and get the answer instantly.",
    bul: ["Reports with conclusions, not just charts", "Ask your data in plain language", "No biometrics, like everything Flame"],
    cta: "Discover Flame Insights and Ember",
    rep: "Flame Insights · Weekly report", period: "Week 42 · All stores",
    kpis: [["26.4%", "Conversion", "+3.1 pts"], ["8,430", "Passers-by", "+5%"], ["9 min", "Dwell time", "New arrivals"]],
    chartT: "This week's funnel", funnel: [["Passers-by", 100], ["Visitors", 62], ["Interested", 38], ["Buyers", 20]],
    concl: "Key conclusions", c: ["Conversion is up +3.1 pts on last week", "The biggest drop-off is between window and entrance", "New arrivals is the most attractive zone"],
    chat: [
      { u: "Summarise this week's report", e: "Conversion is up to <b>26.4%</b> (+3.1 pts). A good week.", hl: "k0" },
      { u: "Where am I losing most customers?", e: "Between window and entrance: only <b>26%</b> of street traffic comes in.", hl: "f" },
      { u: "And which zone works best?", e: "<b>New arrivals</b>: 34% attraction and 9 min average dwell time.", hl: "k2" },
    ],
    ember: "Ember · AI assistant", online: "Analysing your report",
  },
};

export default function InsightsEmberShowcase({ lang, ctaHref }: { lang: Lang; ctaHref: string }) {
  const t = T[lang];
  const [step, setStep] = useState(0);      // nº de intercambios mostrados
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStep(t.chat.length); return; }
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (!cancelled) {
        setStep(0); await sleep(900);
        for (let i = 0; i < t.chat.length && !cancelled; i++) {
          setTyping(true); await sleep(1300); if (cancelled) return;
          setTyping(false); setStep(i + 1); await sleep(2600);
        }
        await sleep(2500);
      }
    })();
    return () => { cancelled = true; };
  }, [t.chat.length]);
  const hl = step > 0 ? t.chat[step - 1].hl : "";

  return (
    <section className="ie relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 520px at 85% 10%, rgb(49 177 248 / 0.16), transparent 60%), radial-gradient(700px 450px at 5% 100%, rgb(49 177 248 / 0.08), transparent 70%)" }} />
      <div className="flame-container relative z-10 ie-grid">
        <div className="ie-copy">
          <span className="ie-eyebrow">{t.eyebrow}</span>
          <h2 className="ie-h2">{t.h}</h2>
          <p className="ie-p">{t.p}</p>
          <ul className="ie-bul">{t.bul.map((b) => <li key={b}><span className="ie-check"><Icon name="check" className="w-3.5 h-3.5" /></span>{b}</li>)}</ul>
          <a href={ctaHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>{t.cta} <Icon name="arrow" className="w-4 h-4" /></a>
        </div>

        <div className="ie-visual" aria-hidden="true">
          <div className="ie-report">
            <div className="ie-rep-head"><span className="ie-dot" /><strong>{t.rep}</strong><small>{t.period}</small></div>
            <div className="ie-kpis">
              {t.kpis.map(([v, l, d], k) => (
                <div key={l} className={`ie-kpi${hl === `k${k}` ? " is-hl" : ""}`}><b>{v}</b><span>{l}</span><em>{d}</em></div>
              ))}
            </div>
            <div className={`ie-funnel${hl === "f" ? " is-hl" : ""}`}>
              <span className="ie-sub">{t.chartT}</span>
              {t.funnel.map(([l, pct]) => (
                <div key={l as string} className="ie-frow"><span>{l}</span><i><s style={{ width: `${pct}%` }} /></i><b>{pct}%</b></div>
              ))}
            </div>
            <div className="ie-concl">
              <span className="ie-sub">{t.concl}</span>
              {t.c.map((c) => <div key={c} className="ie-crow"><Icon name="check" className="w-3.5 h-3.5" />{c}</div>)}
            </div>
          </div>

          <div className="ie-chat">
            <div className="ie-chat-head"><span className="ie-ember">E</span><span><strong>{t.ember}</strong><small><i />{t.online}</small></span></div>
            <div className="ie-chat-body">
              {t.chat.slice(0, step).map((m, i) => (
                <div key={i} className="ie-msgs">
                  <div className="ie-u">{m.u}</div>
                  <div className="ie-e" dangerouslySetInnerHTML={{ __html: m.e }} />
                </div>
              ))}
              {typing && <div className="ie-msgs"><div className="ie-u">{t.chat[step]?.u}</div><div className="ie-e ie-typing"><span /><span /><span /></div></div>}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .ie { background: var(--color-navy); color: #fff; padding: clamp(72px, 8vw, 112px) 0; }
        .ie-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 80px); align-items: center; }
        .ie-eyebrow { display: inline-block; font-size: 12.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 14px; }
        .ie-h2 { font: 400 clamp(34px, 3.6vw, 52px)/1.06 var(--font-display); letter-spacing: -0.02em; margin: 0 0 20px; color: #fff; }
        .ie-h2 span { color: var(--color-accent); font-weight: 500; }
        .ie-p { font-size: clamp(16.5px, 1.2vw, 18px); line-height: 1.65; color: rgb(255 255 255 / 0.76); margin: 0 0 22px; }
        .ie-bul { list-style: none; padding: 0; margin: 0 0 30px; display: grid; gap: 10px; }
        .ie-bul li { display: flex; gap: 10px; align-items: center; font-size: 15.5px; font-weight: 500; }
        .ie-check { display: inline-flex; width: 22px; height: 22px; align-items: center; justify-content: center; border-radius: 999px; background: rgb(49 177 248 / 0.2); color: var(--color-accent); flex-shrink: 0; }
        .ie-visual { position: relative; padding: 0 0 70px 0; }
        .ie-report { width: 86%; background: #fff; color: var(--color-navy); border-radius: 18px; padding: 22px; box-shadow: 0 40px 80px -40px rgb(0 0 0 / 0.6); }
        .ie-rep-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 16px; }
        .ie-rep-head strong { font-size: 15px; } .ie-rep-head small { margin-left: auto; font-size: 12px; color: var(--color-ink-3); }
        .ie-dot { width: 10px; height: 10px; border-radius: 999px; background: var(--color-accent); align-self: center; }
        .ie-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
        .ie-kpi { border: 1px solid var(--color-rule); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 2px; transition: box-shadow 300ms ease, border-color 300ms ease, transform 300ms ease; }
        .ie-kpi b { font: 600 22px var(--font-display); } .ie-kpi span { font-size: 12px; color: var(--color-ink-3); } .ie-kpi em { font-style: normal; font-size: 11.5px; font-weight: 700; color: #1d9e6b; }
        .ie-funnel, .ie-concl { border: 1px solid var(--color-rule); border-radius: 12px; padding: 12px 14px; transition: box-shadow 300ms ease, border-color 300ms ease; }
        .ie-funnel { margin-bottom: 12px; }
        .is-hl { border-color: var(--color-accent) !important; box-shadow: 0 0 0 4px rgb(49 177 248 / 0.18); transform: translateY(-1px); }
        .ie-sub { display: block; font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-ink-3); margin-bottom: 8px; }
        .ie-frow { display: grid; grid-template-columns: 92px 1fr 38px; gap: 10px; align-items: center; font-size: 12.5px; margin: 5px 0; }
        .ie-frow i { height: 8px; border-radius: 999px; background: var(--color-paper); overflow: hidden; } .ie-frow s { display: block; height: 100%; background: linear-gradient(90deg, var(--color-accent), var(--color-accent-deep)); border-radius: 999px; }
        .ie-frow b { text-align: right; font-weight: 600; }
        .ie-crow { display: flex; gap: 8px; align-items: center; font-size: 13px; padding: 4px 0; color: var(--color-navy); } .ie-crow svg { color: var(--color-accent-deep); flex-shrink: 0; }
        .ie-chat { position: absolute; right: 0; bottom: 0; width: 56%; min-width: 280px; background: #fff; color: var(--color-navy); border-radius: 18px; box-shadow: 0 30px 70px -28px rgb(0 0 0 / 0.65); overflow: hidden; border: 1px solid rgb(49 177 248 / 0.35); }
        .ie-chat-head { display: flex; gap: 10px; align-items: center; padding: 12px 14px; background: var(--color-navy); color: #fff; }
        .ie-chat-head strong { display: block; font-size: 13.5px; } .ie-chat-head small { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: rgb(255 255 255 / 0.7); }
        .ie-chat-head small i { width: 7px; height: 7px; border-radius: 999px; background: #34d399; }
        .ie-ember { width: 30px; height: 30px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; font: 700 15px var(--font-display); background: linear-gradient(135deg, #ff8a3d, #e5492a); color: #fff; }
        .ie-chat-body { padding: 14px; display: flex; flex-direction: column; gap: 10px; height: 250px; overflow: hidden; justify-content: flex-end; background: var(--color-paper-soft); }
        .ie-msgs { display: flex; flex-direction: column; gap: 6px; animation: ieIn 350ms ease both; }
        .ie-u { align-self: flex-end; max-width: 85%; background: var(--color-navy); color: #fff; font-size: 12.5px; padding: 8px 12px; border-radius: 14px 14px 4px 14px; }
        .ie-e { align-self: flex-start; max-width: 90%; background: #fff; border: 1px solid var(--color-rule); font-size: 12.5px; line-height: 1.45; padding: 8px 12px; border-radius: 14px 14px 14px 4px; }
        .ie-e b { color: var(--color-accent-deep); }
        .ie-typing { display: inline-flex; gap: 4px; } .ie-typing span { width: 6px; height: 6px; border-radius: 999px; background: var(--color-ink-3); animation: ieDot 1s infinite ease-in-out; } .ie-typing span:nth-child(2) { animation-delay: .15s; } .ie-typing span:nth-child(3) { animation-delay: .3s; }
        @keyframes ieIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes ieDot { 0%, 80%, 100% { opacity: .3; } 40% { opacity: 1; } }
        @media (max-width: 980px) { .ie-grid { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .ie-report { width: 100%; } .ie-chat { position: relative; width: 100%; margin-top: -40px; } .ie-visual { padding-bottom: 0; } .ie-frow { grid-template-columns: 78px 1fr 34px; } }
        @media (prefers-reduced-motion: reduce) { .ie-msgs, .ie-typing span, .ie-kpi, .ie-funnel { animation: none !important; transition: none !important; } }
      `}</style>
    </section>
  );
}
