"use client";

/**
 * AnimatedBehaviorChart — Imagen original + zona de Sankey reconstruida
 * en SVG nativo animado (opción A acordada con JR).
 *
 * Estructura:
 *  - El PNG Customer_behavior_recorte.png se sirve completo como fondo
 *    (sidebar, header, tabs, métricas, leyenda y los headers de los 2
 *    cards de Sankey son la imagen original sin tocar).
 *  - Encima, dos overlays absolutos con fondo blanco que tapan SOLO la
 *    zona del dibujo de los 2 Sankey y los dibujan en SVG real,
 *    posicionados con precisión, con curvas Sankey verdaderas.
 *  - Dentro de cada banda Sankey, líneas finas con stroke-dasharray
 *    animado en loop infinito → los flujos de datos se mueven en cada
 *    raya del gráfico (lo que JR pidió).
 *
 * Sin overlays desalineados, sin reconstruir el dashboard entero.
 */

import { useRef, useState, useEffect } from "react";

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

/** Construye un path Sankey-banda entre dos puntos verticales (x0..x1, y_top0..y_bot0 → y_top1..y_bot1) */
function sankeyBand(x0: number, yT0: number, yB0: number, x1: number, yT1: number, yB1: number) {
  const dx = (x1 - x0) / 2;
  return [
    `M ${x0} ${yT0}`,
    `C ${x0 + dx} ${yT0}, ${x1 - dx} ${yT1}, ${x1} ${yT1}`,
    `L ${x1} ${yB1}`,
    `C ${x1 - dx} ${yB1}, ${x0 + dx} ${yB0}, ${x0} ${yB0}`,
    "Z",
  ].join(" ");
}

/** Línea central de una banda (para animar el flujo) */
function sankeyLine(x0: number, y0: number, x1: number, y1: number) {
  const dx = (x1 - x0) / 2;
  return `M ${x0} ${y0} C ${x0 + dx} ${y0}, ${x1 - dx} ${y1}, ${x1} ${y1}`;
}

// ─── COLORES DE ZONA (coincide con el PNG real) ───
const C = {
  entrance:   "#7AB3F5",
  central:    "#A78BFA",
  windowD:    "#86EFAC",
  mensKnit:   "#FCA5A5",
  checkout:   "#FDBA74",
  casualFlow: "#7AB3F5",
  otros:      "#94A3B8",
};

// ─── CUSTOMER FLOW (panel superior) ───
// viewBox 100×100 → coordenadas en %
// Layout: 4 columnas (Entrance / col1 / col2 / col_out)
const CF_W = 100, CF_H = 100;

// Helper para construir nodo: { id, x, top, bot, color }
const cfNodes = {
  entrance:    { x: 3,  top: 6,  bot: 92, color: C.entrance,   label: "Entrance" },
  central1:    { x: 33, top: 6,  bot: 46, color: C.central,    label: "Central Lifestyle & New Arrivals" },
  windowD1:    { x: 33, top: 50, bot: 62, color: C.windowD,    label: "Window Display & Denim" },
  checkout1:   { x: 33, top: 66, bot: 76, color: C.checkout,   label: "Checkout & Basics" },
  otros1:      { x: 33, top: 80, bot: 86, color: C.otros,      label: "Otros" },
  casualFlow:  { x: 63, top: 6,  bot: 30, color: C.casualFlow, label: "Casual Flow" },
  central2:    { x: 63, top: 34, bot: 56, color: C.central,    label: "Central Lifestyle & New Arrivals" },
  checkout2:   { x: 63, top: 60, bot: 72, color: C.checkout,   label: "Checkout & Basics" },
  otros2:      { x: 63, top: 76, bot: 84, color: C.otros,      label: "Otros" },
  casualOut:   { x: 93, top: 6,  bot: 22, color: C.casualFlow, label: "Casual Flow" },
  centralOut:  { x: 93, top: 26, bot: 46, color: C.central,    label: "Central Lifestyle & New Arrivals" },
  checkoutOut: { x: 93, top: 50, bot: 64, color: C.checkout,   label: "Checkout & Basics" },
  otrosOut:    { x: 93, top: 68, bot: 78, color: C.otros,      label: "Otros" },
};
type NodeMap = typeof cfNodes;
type NodeKey = keyof NodeMap;

// Conexiones — el "out offset" se calcula al renderizar
const cfLinks: { from: NodeKey; to: NodeKey; w: number; color: string }[] = [
  // Desde Entrance (4 nodos)
  { from: "entrance",   to: "central1",   w: 40, color: C.central },
  { from: "entrance",   to: "windowD1",   w: 12, color: C.windowD },
  { from: "entrance",   to: "checkout1",  w: 10, color: C.checkout },
  { from: "entrance",   to: "otros1",     w: 6,  color: C.otros },
  // col1 → col2
  { from: "central1",   to: "casualFlow", w: 24, color: C.casualFlow },
  { from: "central1",   to: "central2",   w: 16, color: C.central },
  { from: "windowD1",   to: "central2",   w: 6,  color: C.windowD },
  { from: "windowD1",   to: "casualFlow", w: 6,  color: C.windowD },
  { from: "checkout1",  to: "checkout2",  w: 10, color: C.checkout },
  { from: "otros1",     to: "otros2",     w: 6,  color: C.otros },
  // col2 → out
  { from: "casualFlow", to: "casualOut",  w: 16, color: C.casualFlow },
  { from: "casualFlow", to: "centralOut", w: 8,  color: C.central },
  { from: "central2",   to: "centralOut", w: 12, color: C.central },
  { from: "checkout2",  to: "checkoutOut",w: 12, color: C.checkout },
  { from: "otros2",     to: "otrosOut",   w: 8,  color: C.otros },
];

// ─── DIRECT INTERACTION (panel inferior) ───
const diNodes = {
  windowD:     { x: 3,  top: 8,  bot: 22, color: C.windowD,    label: "Window Display & Denim" },
  mensKnit:    { x: 3,  top: 26, bot: 40, color: C.mensKnit,   label: "Mens Knitwear & Accessories" },
  checkout:    { x: 3,  top: 44, bot: 58, color: C.checkout,   label: "Checkout & Basics" },
  central:     { x: 3,  top: 62, bot: 90, color: C.central,    label: "Central Lifestyle & New Arrivals" },
  casualMid:   { x: 48, top: 20, bot: 80, color: C.casualFlow, label: "Casual Flow" },
  centralOut:  { x: 93, top: 8,  bot: 28, color: C.central,    label: "Central Lifestyle & New Arrivals" },
  checkoutOut: { x: 93, top: 32, bot: 50, color: C.checkout,   label: "Checkout & Basics" },
  mensKnitOut: { x: 93, top: 54, bot: 68, color: C.mensKnit,   label: "Mens Knitwear & Accessories" },
  windowDOut:  { x: 93, top: 72, bot: 86, color: C.windowD,    label: "Window Display & Denim" },
};
type DiNodeMap = typeof diNodes;
type DiNodeKey = keyof DiNodeMap;

const diLinks: { from: DiNodeKey; to: DiNodeKey; w: number; color: string }[] = [
  { from: "windowD",   to: "casualMid",   w: 14, color: C.windowD },
  { from: "mensKnit",  to: "casualMid",   w: 14, color: C.mensKnit },
  { from: "checkout",  to: "casualMid",   w: 14, color: C.checkout },
  { from: "central",   to: "casualMid",   w: 28, color: C.central },
  { from: "casualMid", to: "centralOut",  w: 20, color: C.central },
  { from: "casualMid", to: "checkoutOut", w: 18, color: C.checkout },
  { from: "casualMid", to: "mensKnitOut", w: 14, color: C.mensKnit },
  { from: "casualMid", to: "windowDOut",  w: 14, color: C.windowD },
];

/** Renderiza un Sankey con animación de flujo en sus bandas */
function Sankey<N extends Record<string, { x: number; top: number; bot: number; color: string; label: string }>>({
  nodes,
  links,
  inView,
  nodeWidth = 1.6,
  flowSpeed = 4,
}: {
  nodes: N;
  links: { from: keyof N; to: keyof N; w: number; color: string }[];
  inView: boolean;
  nodeWidth?: number;
  flowSpeed?: number;
}) {
  // outOffset y inOffset: cuánto vertical ha consumido cada nodo
  const outOff: Record<string, number> = {};
  const inOff: Record<string, number> = {};
  Object.keys(nodes).forEach((k) => { outOff[k] = 0; inOff[k] = 0; });

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <style>{`
          @keyframes abc-flow {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -20; }
          }
        `}</style>
      </defs>

      {/* Bandas Sankey (filled) */}
      {links.map((l, i) => {
        const from = nodes[l.from];
        const to = nodes[l.to];
        const fromH = from.bot - from.top;
        const toH = to.bot - to.top;
        // Proporción del nodo de salida que ya está consumida
        const yT0 = from.top + (outOff[l.from as string] / fromH) * fromH;
        const yB0 = yT0 + l.w;
        const yT1 = to.top + (inOff[l.to as string] / toH) * toH;
        const yB1 = yT1 + l.w;
        outOff[l.from as string] += l.w;
        inOff[l.to as string] += l.w;
        const d = sankeyBand(from.x + nodeWidth, yT0, yB0, to.x, yT1, yB1);
        return (
          <path
            key={`band-${i}`}
            d={d}
            fill={l.color}
            fillOpacity={0.55}
            style={{
              opacity: inView ? 1 : 0,
              transition: `opacity 600ms ease ${i * 30}ms`,
            }}
          />
        );
      })}

      {/* Líneas internas animadas (la "raya" que fluye dentro de cada banda) */}
      {(() => {
        const outOff2: Record<string, number> = {};
        const inOff2: Record<string, number> = {};
        Object.keys(nodes).forEach((k) => { outOff2[k] = 0; inOff2[k] = 0; });
        return links.flatMap((l, i) => {
          const from = nodes[l.from];
          const to = nodes[l.to];
          const fromH = from.bot - from.top;
          const toH = to.bot - to.top;
          const yT0 = from.top + (outOff2[l.from as string] / fromH) * fromH;
          const yT1 = to.top + (inOff2[l.to as string] / toH) * toH;
          outOff2[l.from as string] += l.w;
          inOff2[l.to as string] += l.w;
          // Una línea central + 1-2 paralelas según grosor de banda
          const lines = [];
          const nL = Math.min(3, Math.max(1, Math.floor(l.w / 6)));
          for (let j = 0; j < nL; j++) {
            const yA = yT0 + ((j + 1) / (nL + 1)) * l.w;
            const yB = yT1 + ((j + 1) / (nL + 1)) * l.w;
            lines.push(
              <path
                key={`flow-${i}-${j}`}
                d={sankeyLine(from.x + nodeWidth, yA, to.x, yB)}
                fill="none"
                stroke="#fff"
                strokeOpacity={0.7}
                strokeWidth={0.35}
                strokeDasharray="0.8 3"
                style={{
                  animation: inView ? `abc-flow ${flowSpeed + (i % 3) * 0.5}s linear infinite` : "none",
                  animationDelay: `${j * 0.5 + i * 0.08}s`,
                  opacity: inView ? 1 : 0,
                  transition: "opacity 600ms ease",
                  vectorEffect: "non-scaling-stroke",
                }}
              />
            );
          }
          return lines;
        });
      })()}

      {/* Nodos verticales (rectángulos) */}
      {Object.entries(nodes).map(([id, n]) => (
        <rect
          key={id}
          x={n.x}
          y={n.top + (inView ? 0 : (n.bot - n.top) / 2)}
          width={nodeWidth}
          height={inView ? n.bot - n.top : 0}
          fill={n.color}
          rx={0.3}
          style={{
            transition: "height 700ms cubic-bezier(0.22, 1, 0.36, 1), y 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      ))}
    </svg>
  );
}

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
      {/* IMAGEN ORIGINAL — sirve de base (sidebar, header, tabs, métricas, leyenda) */}
      <img
        src="/wp-content/uploads/2026/01/Customer_behavior_recorte.png"
        alt="Flame Customer Behavior — dashboard Locations Journey con Sankey de Customer flow y Direct interaction"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {/* OVERLAY 1: Customer flow Sankey — tapa la zona del dibujo y la sustituye por SVG animado */}
      <div
        style={{
          position: "absolute",
          left: "16.0%", right: "1.5%",
          top: "19.0%",  bottom: "53.5%",
          background: "#fff",
        }}
      >
        <Sankey nodes={cfNodes} links={cfLinks} inView={inView} flowSpeed={4.2} />
      </div>

      {/* OVERLAY 2: Direct interaction Sankey */}
      <div
        style={{
          position: "absolute",
          left: "16.0%", right: "1.5%",
          top: "57.0%",  bottom: "1.5%",
          background: "#fff",
        }}
      >
        <Sankey nodes={diNodes} links={diLinks} inView={inView} flowSpeed={4.6} />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .abc-wrap svg path { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
