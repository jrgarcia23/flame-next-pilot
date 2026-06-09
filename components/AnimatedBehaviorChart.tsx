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

function useInView<T extends Element>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(ref.current);
    // Fallback móvil: si tras 5s no ha disparado, forzar para no dejar
    // los Sankey tapados de forma permanente.
    const fallback = window.setTimeout(() => setInView(true), 5000);
    return () => { obs.disconnect(); clearTimeout(fallback); };
  }, [inView, threshold]);
  return { ref, inView };
}

export default function AnimatedBehaviorChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

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
        Coordenadas medidas directamente sobre los recuadros rojos del
        screenshot de JR (1424×882). Pixel-precisas para cubrir
        EXACTAMENTE el dibujo del Sankey de cada card, sin sobrepasar.

        Recuadro 1 (Customer flow):
          left  ≈ 218/1424 = 15.3%
          right ≈ 27/1424  = 1.9%
          top   ≈ 226/882  = 25.6%
          bot   ≈ 360/882  = 40.8%
        Recuadro 2 (Direct interaction):
          left  ≈ 218/1424 = 15.3%
          right ≈ 27/1424  = 1.9%
          top   ≈ 575/882  = 65.2%
          bot   ≈ 26/882   = 2.9%
      */}

      {/* OVERLAY 1: tapa el Sankey de Customer flow. Se "come" de izq → der */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "16.35%", right: "1.9%",
          top:  "24.57%", bottom: "40.8%",
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
          left: "16.35%", right: "1.9%",
          top:  "66.27%", bottom: "0.67%",
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
