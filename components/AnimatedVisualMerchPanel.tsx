"use client";

/**
 * AnimatedVisualMerchPanel — visual de la sección grande del caso de uso
 * «Visual Merchandising» (vista previa).
 *
 * Arriba, la captura real del comparador antes / después de la plataforma
 * (deck de Flame, nov-2026) con la zona del cambio resaltada. Debajo, el
 * resumen en lenguaje natural y la categoría del cambio, con los textos
 * literales de la plataforma, y una mini gráfica de visitas a la zona antes y
 * después del cambio (DATOS DE EJEMPLO hasta que Flame dé un caso real).
 *
 * Al entrar en pantalla: aparece el resumen, se dibuja la línea y se rellena
 * el tramo posterior al cambio. Respeta prefers-reduced-motion.
 *
 * Pendiente: cuando Flame pase las dos capturas completas (antes y después)
 * de una misma vista, la foto pasa a ser un deslizador real.
 */

import { useEffect, useRef, useState } from "react";

function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(ref.current);
    const fallback = window.setTimeout(() => setInView(true), 5000);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, [inView, threshold]);
  return { ref, inView };
}

// 14 días: 7 antes del cambio y 7 después (visitas a la zona, datos de ejemplo)
const VALUES = [52, 49, 55, 51, 57, 50, 53, 61, 66, 64, 70, 67, 72, 69];
const LABELS = ["jue 21", "", "", "", "", "", "mié 27", "mié 28", "", "", "", "", "", "mar 4"];
const W = 640, H = 150, PAD_X = 8, TOP = 18, BOTTOM = 118;
const CHANGE_IDX = 7;

function xAt(i: number) { return PAD_X + (i * (W - PAD_X * 2)) / (VALUES.length - 1); }
function yAt(v: number) { const min = 40, max = 80; return BOTTOM - ((v - min) / (max - min)) * (BOTTOM - TOP); }

export default function AnimatedVisualMerchPanel({ lang = "es" }: { lang?: "es" | "en" }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const en = lang === "en";

  const pts = VALUES.map((v, i) => `${xAt(i).toFixed(1)},${yAt(v).toFixed(1)}`).join(" ");
  const afterArea =
    `M ${xAt(CHANGE_IDX)} ${BOTTOM} ` +
    VALUES.slice(CHANGE_IDX).map((v, k) => `L ${xAt(CHANGE_IDX + k).toFixed(1)} ${yAt(v).toFixed(1)}`).join(" ") +
    ` L ${xAt(VALUES.length - 1)} ${BOTTOM} Z`;
  const avgBefore = VALUES.slice(0, CHANGE_IDX).reduce((a, b) => a + b, 0) / CHANGE_IDX;
  const avgAfter = VALUES.slice(CHANGE_IDX).reduce((a, b) => a + b, 0) / (VALUES.length - CHANGE_IDX);
  const xc = xAt(CHANGE_IDX) - (xAt(1) - xAt(0)) / 2;

  return (
    <div ref={ref} className={`vmp ${inView ? "is-in" : ""}`}>
      {/* CAPTURA REAL DEL COMPARADOR */}
      <div className="vmp-photo">
        <img
          src="/images/preview/visual-merchandising/comparador.webp"
          alt={en
            ? "Flame Visual Merchandising: before and after comparison of the same store view, with the change marked"
            : "Flame Visual Merchandising: comparador antes y después de la misma vista de tienda, con el cambio marcado"}
          width={985}
          height={555}
          loading="lazy"
        />
        {/* Halo sobre la zona marcada como cambio n.º 1 */}
        <span aria-hidden className="vmp-ring" />
      </div>

      {/* RESUMEN EN LENGUAJE NATURAL (textos literales de la plataforma) */}
      <div className="vmp-body">
        <p className="vmp-summary">
          Hay un nuevo expositor de dispositivos junto al ventanal de la derecha. El resto de la tienda sigue igual.
        </p>
        <div className="vmp-change">
          <span className="vmp-num">1</span>
          <span className="vmp-tag">Disposición</span>
          <span className="vmp-desc">Ha aparecido un expositor blanco con soporte junto al ventanal de la derecha, en una zona que antes estaba vacía.</span>
        </div>

        {/* MINI GRÁFICA: efecto del cambio */}
        <div className="vmp-chart">
          <div className="vmp-chart-head">
            <span className="vmp-chart-title">{en ? "Visits to the zone" : "Visitas a la zona"}</span>
            <span className="vmp-sample">{en ? "Sample data" : "Datos de ejemplo"}</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={en ? "Visits to the zone before and after the change (sample data)" : "Visitas a la zona antes y después del cambio (datos de ejemplo)"}>
            <defs>
              <linearGradient id="vmpFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#31b1f8" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#31b1f8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* medias antes / después */}
            <line x1={PAD_X} x2={xc} y1={yAt(avgBefore)} y2={yAt(avgBefore)} className="vmp-avg" />
            <line x1={xc} x2={W - PAD_X} y1={yAt(avgAfter)} y2={yAt(avgAfter)} className="vmp-avg vmp-avg--after" />
            {/* tramo posterior al cambio */}
            <path d={afterArea} fill="url(#vmpFill)" className="vmp-area" />
            {/* línea */}
            <polyline points={pts} className="vmp-line" pathLength={1} />
            {/* fecha del cambio */}
            <line x1={xc} x2={xc} y1={4} y2={BOTTOM} className="vmp-mark" />
            <text x={xc + 6} y={12} className="vmp-mark-label">{en ? "Change detected · Wed 28" : "Cambio detectado · mié 28"}</text>
            {/* eje */}
            <line x1={PAD_X} x2={W - PAD_X} y1={BOTTOM} y2={BOTTOM} className="vmp-axis" />
            {LABELS.map((l, i) => l && (
              <text key={i} x={xAt(i)} y={BOTTOM + 20} className="vmp-tick" textAnchor={i === 0 ? "start" : i === VALUES.length - 1 ? "end" : i === CHANGE_IDX ? "start" : "end"}>
                {en ? l.replace("jue", "Thu").replace("mié", "Wed").replace("mar", "Tue") : l}
              </text>
            ))}
          </svg>
          <div className="vmp-legend">
            <span><i className="vmp-key" /> {en ? "Average before" : "Media antes"}</span>
            <span><i className="vmp-key vmp-key--after" /> {en ? "Average after" : "Media después"}</span>
          </div>
        </div>
      </div>

      <style>{`
        .vmp { background:#fff; border:1px solid var(--color-rule); border-radius:16px; overflow:hidden; box-shadow: var(--shadow-md); }
        .vmp-photo { position:relative; background:#0f1030; }
        .vmp-photo img { display:block; width:100%; height:auto; }
        /* zona marcada «1» en la captura: x 76,3-87 %, y 8,6-30,6 % */
        .vmp-ring { position:absolute; left:75.6%; top:7.6%; width:12%; height:24%; border-radius:6px; box-shadow: 0 0 0 0 rgb(49 177 248 / 0.0); opacity:0; }
        .vmp.is-in .vmp-ring { animation: vmpPulse 2.4s cubic-bezier(0.22,1,0.36,1) 0.5s 2 both; }
        @keyframes vmpPulse {
          0% { opacity:0; box-shadow: 0 0 0 0 rgb(49 177 248 / 0.55); }
          20% { opacity:1; }
          100% { opacity:0; box-shadow: 0 0 0 22px rgb(49 177 248 / 0); }
        }
        .vmp-body { padding: 20px 22px 18px; }
        .vmp-summary { font-size:16px; line-height:1.5; color: var(--color-navy); font-weight:500; margin:0 0 12px; }
        .vmp-change { display:flex; align-items:flex-start; gap:10px; font-size:14px; line-height:1.5; color: var(--color-ink-2); }
        .vmp-num { flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:5px; background:#3c9a6e; color:#fff; font-weight:700; font-size:12.5px; margin-top:1px; }
        .vmp-tag { flex-shrink:0; padding:2px 9px; border-radius:6px; background: rgb(49 177 248 / 0.12); color: var(--color-accent-deep); font-weight:600; font-size:12.5px; margin-top:1px; }
        .vmp-summary, .vmp-change { opacity:0; transform: translateY(8px); transition: opacity 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1); }
        .vmp.is-in .vmp-summary { opacity:1; transform:none; transition-delay: 300ms; }
        .vmp.is-in .vmp-change { opacity:1; transform:none; transition-delay: 600ms; }
        .vmp-chart { margin-top:18px; padding-top:16px; border-top:1px solid var(--color-rule); }
        .vmp-chart-head { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:6px; }
        .vmp-chart-title { font-size:13px; font-weight:600; color: var(--color-navy); letter-spacing:0.01em; }
        .vmp-sample { font-size:11px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color: var(--color-ink-3); border:1px dashed var(--color-rule-strong); border-radius:999px; padding:2px 9px; }
        .vmp-chart svg { display:block; width:100%; height:auto; overflow:visible; }
        .vmp-line { fill:none; stroke: var(--color-navy); stroke-width:2.5; stroke-linejoin:round; stroke-linecap:round; stroke-dasharray:1; stroke-dashoffset:1; }
        .vmp.is-in .vmp-line { stroke-dashoffset:0; transition: stroke-dashoffset 1800ms cubic-bezier(0.65,0,0.35,1) 700ms; }
        .vmp-area { opacity:0; }
        .vmp.is-in .vmp-area { opacity:1; transition: opacity 900ms ease 2100ms; }
        .vmp-avg { stroke: var(--color-ink-3); stroke-width:1.5; stroke-dasharray:3 4; opacity:0; }
        .vmp-avg--after { stroke: var(--color-accent); }
        .vmp.is-in .vmp-avg { opacity:1; transition: opacity 700ms ease 2300ms; }
        .vmp-mark { stroke: var(--color-accent-deep); stroke-width:1.5; stroke-dasharray:5 4; }
        .vmp-mark-label { font-size:12px; font-weight:600; fill: var(--color-accent-deep); }
        .vmp-axis { stroke: var(--color-rule-strong); stroke-width:1; }
        .vmp-tick { font-size:11.5px; fill: var(--color-ink-3); }
        .vmp-legend { display:flex; gap:18px; margin-top:4px; font-size:12px; color: var(--color-ink-3); }
        .vmp-legend span { display:inline-flex; align-items:center; gap:6px; }
        .vmp-key { display:inline-block; width:16px; border-top:2px dashed var(--color-ink-3); }
        .vmp-key--after { border-top-color: var(--color-accent); }
        @media (max-width: 560px) {
          .vmp-body { padding: 16px 16px 14px; }
          .vmp-change { flex-wrap:wrap; }
          .vmp-desc { flex-basis:100%; }
          /* el SVG se escala a ~0,5: textos más grandes en unidades del viewBox */
          .vmp-tick { font-size:20px; }
          .vmp-mark-label { font-size:19px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vmp-summary, .vmp-change, .vmp-area, .vmp-avg { opacity:1 !important; transform:none !important; transition:none !important; }
          .vmp-line { stroke-dashoffset:0 !important; transition:none !important; }
          .vmp-ring { display:none; }
        }
      `}</style>
    </div>
  );
}
