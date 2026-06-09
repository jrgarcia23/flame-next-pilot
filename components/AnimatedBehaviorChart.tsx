"use client";

/**
 * AnimatedBehaviorChart — La imagen ORIGINAL del informe (sin modificar)
 * con un overlay SVG que añade movimiento SOLO a los flujos Sankey.
 *
 * JR: "puedes hacer que solo se muevan las rayas que están dentro del
 *      gráfico?"
 *
 * Implementación:
 *  - La <img> original Customer_behavior_recorte.png se sirve tal cual.
 *  - Encima, un <svg> con `pointer-events:none` traza paths que coinciden
 *    visualmente con los flujos Sankey del PNG (Customer flow arriba +
 *    Direct interaction abajo).
 *  - Cada path se anima con `stroke-dasharray` + `stroke-dashoffset`
 *    en loop infinito: pequeños segmentos de color (cyan brand + blanco
 *    translúcido) se desplazan a lo largo de la curva dando sensación
 *    de datos "fluyendo" por los Sankey.
 *  - Velocidades ligeramente distintas por flujo para evitar sincronía
 *    artificial.
 *
 * Sin reveal, sin shimmer global, sin cursor — solo las "rayas" del
 * gráfico se mueven.
 *
 * Respeta `prefers-reduced-motion`: si está activo, los flujos quedan
 * estáticos.
 */

import { useEffect, useRef, useState } from "react";

function useInView<T extends Element>(threshold = 0.2) {
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

/**
 * Paths del Sankey aproximados al PNG real. Coordenadas en %
 * (viewBox 100×100, preserveAspectRatio none → escalan al box).
 *
 * Customer flow ocupa y: 11–47% en la imagen.
 * Direct interaction ocupa y: 55–94%.
 *
 * Solo trazo los flujos principales (las "rayas anchas") — no todos los
 * micro-flujos. El objetivo es que el ojo perciba movimiento en las
 * conexiones más visibles, no replicar el grafo entero.
 */
const FLOWS = [
  // ─── Customer flow (sección superior y: 14-44) ───
  // Entrance → Central Lifestyle
  { d: "M 20 27 C 32 27, 36 22, 41 22", dur: 3.6, color: "rgba(167,139,250,0.85)" },
  // Entrance → Window Display & Denim
  { d: "M 20 32 C 32 32, 36 28, 41 28", dur: 4.1, color: "rgba(134,239,172,0.85)" },
  // Entrance → Checkout
  { d: "M 20 36 C 32 36, 36 32, 41 32", dur: 4.4, color: "rgba(253,186,116,0.85)" },
  // Entrance → Otros
  { d: "M 20 39 C 32 39, 36 36, 41 36", dur: 4.8, color: "rgba(148,163,184,0.85)" },

  // Central Lifestyle → Casual Flow
  { d: "M 51 23 C 60 23, 64 21, 70 21", dur: 3.8, color: "rgba(122,179,245,0.85)" },
  // Central Lifestyle → Central (right)
  { d: "M 51 26 C 60 26, 64 27, 70 27", dur: 3.5, color: "rgba(167,139,250,0.85)" },
  // Window Display → Central (right)
  { d: "M 51 28 C 60 28, 64 28, 70 28", dur: 4.2, color: "rgba(134,239,172,0.85)" },
  // Checkout col-2 → Checkout col-3
  { d: "M 51 32 C 60 32, 64 32, 70 32", dur: 4.6, color: "rgba(253,186,116,0.85)" },
  // Otros col-2 → Otros col-3
  { d: "M 51 35 C 60 35, 64 35, 70 35", dur: 5.0, color: "rgba(148,163,184,0.85)" },

  // Casual Flow → Casual Flow (final)
  { d: "M 80 22 C 86 22, 88 22, 92 22", dur: 4.0, color: "rgba(122,179,245,0.85)" },
  // Central → Central (final)
  { d: "M 80 27 C 86 27, 88 28, 92 28", dur: 3.7, color: "rgba(167,139,250,0.85)" },
  // Checkout → Checkout (final)
  { d: "M 80 32 C 86 32, 88 33, 92 33", dur: 4.5, color: "rgba(253,186,116,0.85)" },
  // Otros → Otros (final)
  { d: "M 80 35 C 86 35, 88 35, 92 35", dur: 5.1, color: "rgba(148,163,184,0.85)" },

  // ─── Direct interaction (sección inferior y: 64-90) ───
  // Window → Casual Flow
  { d: "M 15 68 C 30 68, 38 73, 48 73", dur: 4.2, color: "rgba(134,239,172,0.85)" },
  // Mens Knit → Casual Flow
  { d: "M 15 73 C 30 73, 38 75, 48 75", dur: 4.5, color: "rgba(252,165,165,0.85)" },
  // Checkout → Casual Flow
  { d: "M 15 78 C 30 78, 38 78, 48 78", dur: 4.0, color: "rgba(253,186,116,0.85)" },
  // Central Lifestyle → Casual Flow
  { d: "M 15 84 C 30 84, 38 80, 48 80", dur: 3.7, color: "rgba(167,139,250,0.85)" },

  // Casual Flow → Central (final right)
  { d: "M 58 75 C 75 75, 82 73, 92 73", dur: 3.9, color: "rgba(167,139,250,0.85)" },
  // Casual Flow → Checkout (final right)
  { d: "M 58 78 C 75 78, 82 78, 92 78", dur: 4.3, color: "rgba(253,186,116,0.85)" },
  // Casual Flow → Mens Knit (final right)
  { d: "M 58 81 C 75 81, 82 82, 92 82", dur: 4.6, color: "rgba(252,165,165,0.85)" },
  // Casual Flow → Window Display (final right)
  { d: "M 58 84 C 75 84, 82 86, 92 86", dur: 5.0, color: "rgba(134,239,172,0.85)" },
];

export default function AnimatedBehaviorChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="abc-wrap rounded-2xl overflow-hidden relative"
      style={{
        background: "#fff",
        border: "1px solid var(--color-rule)",
        boxShadow: "var(--shadow-md)",
        position: "relative",
      }}
    >
      {/* IMAGEN ORIGINAL — intacta */}
      <img
        src="/wp-content/uploads/2026/01/Customer_behavior_recorte.png"
        alt="Flame Customer Behavior — dashboard Locations Journey con Sankey de Customer flow y Direct interaction"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* Overlay SVG con los flujos animados — solo movimiento sobre las rayas Sankey */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          mixBlendMode: "screen", // los segmentos en color iluminan las áreas Sankey del PNG
        }}
      >
        {FLOWS.map((f, i) => (
          <path
            key={i}
            d={f.d}
            fill="none"
            stroke={inView ? f.color : "transparent"}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeDasharray="2 6"
            style={{
              animation: inView ? `abc-flow ${f.dur}s linear infinite` : "none",
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </svg>

      <style>{`
        @keyframes abc-flow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -16; }
        }
        @media (prefers-reduced-motion: reduce) {
          .abc-wrap svg path { animation: none !important; stroke: transparent !important; }
        }
      `}</style>
    </div>
  );
}
