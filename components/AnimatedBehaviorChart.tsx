"use client";

/**
 * AnimatedBehaviorChart — Dashboard animado inspirado en estilo Refero/Ventriloc.
 *
 * Compone 3 visualizaciones en un solo "dashboard" para reemplazar la imagen
 * estática Customer_behavior_recorte.png en /es/comportamiento-del-cliente/.
 *
 * Animaciones:
 *  - Heat map: 24 celdas que se rellenan con stagger 30ms al entrar en viewport
 *  - Funnel chart: 4 stages que crecen desde 0% hasta su valor final (800ms ease-out)
 *  - Métricas: counters que cuentan de 0 a su valor final (1200ms)
 *  - Spark line (top): trazado SVG que se dibuja con stroke-dasharray animado
 *
 * Trigger: IntersectionObserver con threshold 0.25 (cuando >=25% es visible).
 * Reproducción: una sola vez por carga (no se reinicia al volver).
 *
 * Brand: accent cyan #31b1f8 + navy #15163A + grises de la web. Sin biometría.
 */

import { useEffect, useRef, useState } from "react";

// Datos del heat map (6 cols × 4 rows = 24 celdas, valores 0-1 de "calor")
const HEAT_DATA: number[][] = [
  [0.15, 0.30, 0.45, 0.60, 0.40, 0.20],
  [0.35, 0.70, 0.90, 0.95, 0.65, 0.30],
  [0.50, 0.85, 1.00, 0.92, 0.75, 0.45],
  [0.20, 0.40, 0.55, 0.50, 0.35, 0.18],
];

// Funnel chart: visitantes → entran → recorren → compran
const FUNNEL: { label: string; value: number; pct: number }[] = [
  { label: "Tráfico exterior",    value: 12_850, pct: 100 },
  { label: "Entran en tienda",     value:  4_872, pct:  38 },
  { label: "Recorren > 60s",       value:  2_315, pct:  18 },
  { label: "Conversión",            value:  1_103, pct:   8.6 },
];

// Métricas top (counters)
const METRICS: { label: string; value: number; suffix: string; decimals?: number }[] = [
  { label: "Dwell medio",          value: 4.2,    suffix: " min", decimals: 1 },
  { label: "Zonas analizadas",      value: 18,     suffix: "" },
  { label: "Conversión zona caliente", value: 23.4, suffix: "%", decimals: 1 },
];

// Spark line data (10 puntos)
const SPARK = [22, 28, 24, 32, 38, 35, 42, 48, 45, 52];

function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, threshold]);
  return { ref, inView };
}

function Counter({ to, suffix = "", decimals = 0, durationMs = 1200, active }: { to: number; suffix?: string; decimals?: number; durationMs?: number; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, durationMs]);
  return <span>{val.toFixed(decimals)}{suffix}</span>;
}

export default function AnimatedBehaviorChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  // Spark line: longitud total del path (calculada via getTotalLength)
  const sparkRef = useRef<SVGPathElement>(null);
  const [sparkLen, setSparkLen] = useState(0);
  useEffect(() => {
    if (sparkRef.current) setSparkLen(sparkRef.current.getTotalLength());
  }, []);

  // Generar path del spark line
  const sparkW = 220;
  const sparkH = 56;
  const sparkPath = SPARK.map((v, i) => {
    const x = (i / (SPARK.length - 1)) * sparkW;
    const max = Math.max(...SPARK);
    const min = Math.min(...SPARK);
    const y = sparkH - ((v - min) / (max - min)) * (sparkH - 8) - 4;
    return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");

  return (
    <div
      ref={ref}
      className="abc-card rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid var(--color-rule)",
        boxShadow: "var(--shadow-md)",
        padding: "28px 28px 32px",
      }}
    >
      {/* Header: título dashboard + spark line */}
      <div className="flex items-center justify-between mb-7" style={{ gap: 24 }}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: "var(--color-accent-deep)" }}>
            Flame · Dashboard
          </p>
          <h3 className="text-[18px] font-semibold" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", letterSpacing: "-0.01em" }}>
            Comportamiento en tienda — Madrid Centro
          </h3>
        </div>
        <svg width={sparkW} height={sparkH} style={{ flexShrink: 0 }}>
          <path
            ref={sparkRef}
            d={sparkPath}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: sparkLen,
              strokeDashoffset: inView ? 0 : sparkLen,
              transition: "stroke-dashoffset 1400ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          {/* Punto final que aparece al terminar */}
          <circle
            cx={sparkW}
            cy={(() => {
              const last = SPARK[SPARK.length - 1];
              const max = Math.max(...SPARK);
              const min = Math.min(...SPARK);
              return sparkH - ((last - min) / (max - min)) * (sparkH - 8) - 4;
            })()}
            r={3}
            fill="var(--color-accent)"
            style={{
              opacity: inView ? 1 : 0,
              transition: "opacity 300ms ease 1400ms",
            }}
          />
        </svg>
      </div>

      {/* Métricas top — 3 counters */}
      <div className="grid abc-metrics mb-7" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            className="rounded-xl"
            style={{
              background: "var(--color-paper-soft)",
              padding: "16px 18px",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 500ms ease ${i * 120}ms, transform 500ms ease ${i * 120}ms`,
            }}
          >
            <p className="text-[12px] font-medium mb-1" style={{ color: "var(--color-ink-3)" }}>{m.label}</p>
            <p className="text-[26px] font-semibold tabular-nums" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", letterSpacing: "-0.015em" }}>
              <Counter to={m.value} suffix={m.suffix} decimals={m.decimals} active={inView} />
            </p>
          </div>
        ))}
      </div>

      {/* Grid principal: Heat map (izq) + Funnel (der) */}
      <div className="grid abc-main" style={{ gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
        {/* Heat map */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "var(--color-ink-3)" }}>
            Mapa de calor por zona
          </p>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${HEAT_DATA[0].length}, 1fr)`, gap: 4 }}>
            {HEAT_DATA.flatMap((row, rIdx) =>
              row.map((v, cIdx) => {
                const idx = rIdx * row.length + cIdx;
                const alpha = 0.08 + v * 0.85;
                return (
                  <div
                    key={idx}
                    style={{
                      aspectRatio: "1.4 / 1",
                      background: `rgba(49, 177, 248, ${inView ? alpha : 0.04})`,
                      borderRadius: 4,
                      transition: `background 600ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 30}ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 30}ms`,
                      transform: inView ? "scale(1)" : "scale(0.85)",
                    }}
                  />
                );
              })
            )}
          </div>
          {/* Leyenda */}
          <div className="flex items-center justify-between mt-3" style={{ fontSize: 11, color: "var(--color-ink-3)" }}>
            <span>Baja densidad</span>
            <div className="flex items-center" style={{ gap: 2 }}>
              {[0.1, 0.25, 0.45, 0.65, 0.85].map((a) => (
                <div key={a} style={{ width: 18, height: 8, background: `rgba(49, 177, 248, ${a})`, borderRadius: 2 }} />
              ))}
            </div>
            <span>Alta densidad</span>
          </div>
        </div>

        {/* Funnel */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: "var(--color-ink-3)" }}>
            Funnel de conversión
          </p>
          <div className="flex flex-col" style={{ gap: 6 }}>
            {FUNNEL.map((f, i) => (
              <div key={f.label}>
                <div className="flex items-center justify-between mb-1" style={{ fontSize: 12 }}>
                  <span style={{ color: "var(--color-ink-2)", fontWeight: 500 }}>{f.label}</span>
                  <span className="tabular-nums" style={{ color: "var(--color-navy)", fontWeight: 600, fontFamily: "var(--font-display)" }}>
                    <Counter to={f.value} active={inView} />
                  </span>
                </div>
                <div style={{ height: 12, background: "var(--color-paper-soft)", borderRadius: 4, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${f.pct}%`,
                      background: i === 0
                        ? "var(--color-accent)"
                        : `rgba(49, 177, 248, ${1 - i * 0.18})`,
                      borderRadius: 4,
                      transform: inView ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: `transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${300 + i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .abc-main { grid-template-columns: 1fr !important; }
          .abc-metrics { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
