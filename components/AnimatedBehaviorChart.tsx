"use client";

/**
 * AnimatedBehaviorChart — La imagen ORIGINAL del informe + reveal de los
 * dos Sankey de izquierda a derecha al hacer scroll.
 *
 * Idea de JR: "coger justo la parte de los gráficos, que estén ocultos,
 * y que al hacer scroll se muestren apareciendo de izquierda a derecha.
 * De esta manera parecerá que se mueven."
 *
 * Implementación:
 *  - <img> Customer_behavior_recorte.png: la imagen real intacta.
 *  - 2 overlays absolutos blancos posicionados exactamente sobre la zona
 *    del dibujo de cada Sankey (Customer flow arriba, Direct interaction
 *    abajo).
 *  - Al entrar en viewport, los overlays se "comen" de izquierda a
 *    derecha con `clip-path: inset(0 0 0 X%)` (X va de 0% a 100%),
 *    revelando el Sankey subyacente progresivamente.
 *  - El segundo (Direct interaction) arranca 600ms después que el primero
 *    para que el efecto vaya en cascada.
 *
 * Resultado: ves cómo los Sankey se "dibujan" de izquierda a derecha
 * como si estuvieran trazándose en directo. Resto del dashboard
 * (sidebar, header, métricas, leyenda) siempre visible desde el inicio.
 *
 * Trigger: IntersectionObserver threshold 0.25, una sola vez.
 * Respeta prefers-reduced-motion (queda todo visible sin animar).
 */

import { useEffect, useRef, useState } from "react";

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

export default function AnimatedBehaviorChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

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

      {/*
        Coordenadas ajustadas pixel-precisas (JR feedback 3ª iteración):
          - Movido +4px a la derecha por la izquierda (no invade sidebar):
            15.3% → 15.6% (+0.3% sobre 1400px ≈ 4px)
          - Subido +2px por arriba para cubrir top del Sankey:
            25.5% → 25.2% (-0.3% sobre 880px ≈ 2.5px)
      */}

      {/* OVERLAY 1: tapa el Sankey de Customer flow. Se "come" de izq → der */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "15.6%", right: "2.0%",
          top:  "25.2%", bottom: "39.0%",
          background: "#fff",
          clipPath: inView ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)",
          transition: "clip-path 1800ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      {/* OVERLAY 2: tapa el Sankey de Direct interaction. Empieza 600ms después */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "15.6%", right: "2.0%",
          top:  "64.5%", bottom: "2.5%",
          background: "#fff",
          clipPath: inView ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)",
          transition: "clip-path 1800ms cubic-bezier(0.65, 0, 0.35, 1) 600ms",
        }}
      />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .abc-wrap > div[aria-hidden] {
            clip-path: inset(0 0 0 100%) !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
