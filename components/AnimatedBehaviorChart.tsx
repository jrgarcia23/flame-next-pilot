"use client";

/**
 * AnimatedBehaviorChart — La imagen ORIGINAL del informe (sin modificar)
 * con animaciones de movimiento aplicadas ENCIMA.
 *
 * JR: "sobre la misma imagen de la web, sin modificarla nada de nada,
 *      y solo dándole movimiento".
 *
 * Lo que hace:
 *  1) Reveal inicial: la imagen aparece con un wipe horizontal de
 *     izquierda a derecha (clip-path inset 100% 0 0 → 0 0 0 0) en 1200ms.
 *  2) Shimmer en loop: una banda de luz diagonal recorre la imagen cada
 *     5s — sutil, suficiente para dar sensación de "live".
 *  3) Punto cursor: un dot cyan recorre 4 puntos clave del dashboard
 *     (header → Customer flow → Direct interaction → leyenda) una sola
 *     vez al entrar en viewport, marcando el flujo de lectura.
 *
 * La imagen Customer_behavior_recorte.png NO se toca: se usa como
 * background-image + <img> sin alteración de color/contenido.
 *
 * Trigger: IntersectionObserver threshold 0.25, una sola vez por carga.
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

// 4 puntos clave del dashboard (en %, relativos al ancho/alto de la imagen)
// Recorrido pensado para guiar la mirada: header → Customer flow → Direct interaction → leyenda
const CURSOR_PATH = [
  { x: 35, y: 8,  delay: 0    },
  { x: 50, y: 32, delay: 1400 },
  { x: 28, y: 70, delay: 2800 },
  { x: 75, y: 80, delay: 4200 },
];

export default function AnimatedBehaviorChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [cursorIdx, setCursorIdx] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    // Animar el dot cursor a través de los puntos
    const timers: ReturnType<typeof setTimeout>[] = [];
    CURSOR_PATH.forEach((p, i) => {
      timers.push(setTimeout(() => setCursorIdx(i), 1400 + p.delay));
    });
    // Fin: ocultar el cursor
    timers.push(setTimeout(() => setCursorIdx(-1), 1400 + CURSOR_PATH[CURSOR_PATH.length - 1].delay + 1800));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const current = cursorIdx >= 0 ? CURSOR_PATH[cursorIdx] : null;

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
      {/* IMAGEN ORIGINAL — sin tocar */}
      <img
        src="/wp-content/uploads/2026/01/Customer_behavior_recorte.png"
        alt="Flame Customer Behavior — dashboard Locations Journey con Sankey de Customer flow y Direct interaction"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          // Reveal: wipe horizontal izq → der
          clipPath: inView ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: "clip-path 1200ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      />

      {/* Shimmer diagonal en loop — banda de luz que pasa cada 5s */}
      <div
        aria-hidden
        className="abc-shimmer"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
          mixBlendMode: "overlay",
          transform: "translateX(-100%)",
          animation: inView ? "abc-shimmer-move 5s ease-in-out 1600ms infinite" : "none",
        }}
      />

      {/* Cursor virtual cyan — solo aparece cuando hay punto activo */}
      {current && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: `${current.x}%`,
            top: `${current.y}%`,
            width: 16,
            height: 16,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            transition: "left 900ms cubic-bezier(0.65, 0, 0.35, 1), top 900ms cubic-bezier(0.65, 0, 0.35, 1)",
            zIndex: 3,
          }}
        >
          {/* Pulse ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "rgba(49, 177, 248, 0.35)",
              animation: "abc-pulse 1.4s ease-out infinite",
            }}
          />
          {/* Dot center */}
          <div
            style={{
              position: "absolute",
              inset: 4,
              borderRadius: "50%",
              background: "var(--color-accent)",
              boxShadow: "0 0 0 2px #fff, 0 4px 12px rgba(49,177,248,0.5)",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes abc-shimmer-move {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes abc-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .abc-wrap img { clip-path: inset(0) !important; transition: none !important; }
          .abc-shimmer { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </div>
  );
}
