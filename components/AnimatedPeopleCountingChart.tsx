"use client";

/**
 * AnimatedPeopleCountingChart — La imagen original de la página de Conteo
 * de personas con cascada de 5 overlays que se descorren de izq → der.
 *
 * Imagen base: /wp-content/uploads/2026/01/People-Counting_recorte.png
 *              (1519 × 885 px nativo)
 *
 * Tapamos las 5 zonas de gráficos con overlays blancos; al entrar en
 * viewport, cada overlay se descorre de izq → der con stagger creciente,
 * dando sensación de "el dashboard se construye en directo":
 *
 *   1. Fila superior con 4 KPI cards (Visits / Avg / Day / Hour)   delay  0 ms
 *   2. Gráfica de barras "Visits" central                          delay 400 ms
 *   3. Heatmap table (inferior izq)                                delay 800 ms
 *   4. Hourly distribution (inferior dcha)                         delay 1000 ms
 *   5. Daily distribution (pie inferior)                           delay 1300 ms
 *
 * NOTA: las coordenadas son aproximadas (1ª iteración). JR las afina
 * después midiendo píxeles sobre el PNG nativo (1519×885).
 *
 * Sin reconstruir nada, solo overlays con clip-path inset animado.
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

// Coordenadas iniciales (sobre wrapper relativo 100%). Aproximadas.
// JR mide píxeles del PNG (1519×885) y me los da para afinar.
const OVERLAYS = [
  // 1. Fila superior — 4 KPI cards (Visits / Avg / Day / Hour)
  { label: "fila KPIs",            left: 4,  right: 1,  top: 8,  bottom: 76, delay: 0    },
  // 2. Gráfica de barras "Visits" central (entre los KPIs ↑ y heatmap ↓)
  { label: "visits chart",         left: 26, right: 27, top: 8,  bottom: 76, delay: 400  },
  // 3. Heatmap table (inferior izq)
  { label: "heatmap",              left: 4,  right: 51, top: 28, bottom: 14, delay: 800  },
  // 4. Hourly distribution (inferior dcha)
  { label: "hourly distribution",  left: 51, right: 1,  top: 28, bottom: 14, delay: 1000 },
  // 5. Daily distribution (pie inferior)
  { label: "daily distribution",   left: 4,  right: 1,  top: 86, bottom: 1,  delay: 1300 },
];

export default function AnimatedPeopleCountingChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className="apc-wrap rounded-2xl overflow-hidden relative"
      style={{
        background: "#fff",
        border: "1px solid var(--color-rule)",
        boxShadow: "var(--shadow-md)",
        position: "relative",
      }}
    >
      {/* IMAGEN ORIGINAL — intacta */}
      <img
        src="/wp-content/uploads/2026/01/People-Counting_recorte.png"
        alt="Flame People Counting — dashboard con KPIs, gráfica de visitas, heatmap y distribución por hora"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* 5 OVERLAYS en cascada — cada uno se descorre de izq → der */}
      {OVERLAYS.map((o, i) => (
        <div
          key={o.label}
          aria-hidden
          data-label={o.label}
          style={{
            position: "absolute",
            left: `${o.left}%`,  right: `${o.right}%`,
            top:  `${o.top}%`,   bottom: `${o.bottom}%`,
            background: "#fff",
            clipPath: inView ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)",
            transition: `clip-path 1600ms cubic-bezier(0.65, 0, 0.35, 1) ${o.delay}ms`,
          }}
        />
      ))}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .apc-wrap > div[aria-hidden] {
            clip-path: inset(0 0 0 100%) !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
