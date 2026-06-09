"use client";

/**
 * AnimatedBehaviorChart — Réplica animada del informe real de Flame
 * (la captura Customer_behavior_recorte.png — dashboard Locations · Journey
 * con dos Sankey diagrams: Customer flow + Direct interaction).
 *
 * NO es un dashboard inventado. Es la MISMA composición del PNG actual
 * recreada en SVG/HTML para poder animar:
 *
 *  - Sidebar izq (logo Flame + iconos + buscador + lista PDV 01…06):
 *    fade-in con stagger 60 ms.
 *  - Header (Locations / breadcrumb / date pickers / cliente / avatar):
 *    fade-in 200 ms.
 *  - Tabs (Zones · Journey · Heatmap · Occupation) + Range (Hour…Year):
 *    underline animado en "Journey" + "Hour" (activos).
 *  - Customer flow Sankey: nodos verticales crecen en altura desde 0
 *    (height: 0 → final), luego los paths Sankey se dibujan con
 *    stroke-dasharray animado.
 *  - Direct interaction Sankey: misma técnica, retrasado para que entre
 *    en cascada después del primero.
 *
 * Trigger: IntersectionObserver threshold 0.2 (cuando >=20% es visible).
 * Una sola reproducción por carga.
 */

import { useEffect, useRef, useState } from "react";

const PDV_LIST = [
  "PDV 01 - Velvet & Co...",
  "PDV 02 - Madrid Sho...",
  "PDV 03 - Asunción",
  "PDV 04 - Hermosilla",
  "PDV 05 - Madrid Cent...",
  "PDV 06 - Chamberí",
];

const ZONE_COLORS: Record<string, string> = {
  entrance: "#7AB3F5",
  central: "#A78BFA",
  windowDenim: "#86EFAC",
  mensKnit: "#FCA5A5",
  checkout: "#FDBA74",
  casualFlow: "#7AB3F5",
  otros: "#94A3B8",
};

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

/** Path Sankey suavizado entre dos puntos verticales (rect → rect) */
function sankeyPath(x0: number, y0: number, x1: number, y1: number) {
  const dx = (x1 - x0) / 2;
  return `M ${x0} ${y0} C ${x0 + dx} ${y0}, ${x1 - dx} ${y1}, ${x1} ${y1}`;
}

/** Sankey diagram component reusable */
function SankeyDiagram({
  width, height, nodes, links, inView, delayMs = 0,
}: {
  width: number;
  height: number;
  nodes: { id: string; x: number; y: number; h: number; color: string; label: string }[];
  links: { from: string; to: string; thickness: number; color: string }[];
  inView: boolean;
  delayMs?: number;
}) {
  // Calcular paths con sus longitudes
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  // Para cada nodo, mantener un contador de offset Y para apilar conexiones
  const outOffset: Record<string, number> = {};
  const inOffset: Record<string, number> = {};
  nodes.forEach((n) => { outOffset[n.id] = 0; inOffset[n.id] = 0; });

  // Refs para paths
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [lengths, setLengths] = useState<number[]>([]);
  useEffect(() => {
    setLengths(pathRefs.current.map((p) => (p ? p.getTotalLength() : 0)));
  }, []);

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
      {/* Links primero (debajo de los nodos) */}
      {links.map((l, i) => {
        const from = nodeMap[l.from];
        const to = nodeMap[l.to];
        if (!from || !to) return null;
        const y0 = from.y + outOffset[l.from] + l.thickness / 2;
        const y1 = to.y + inOffset[l.to] + l.thickness / 2;
        outOffset[l.from] += l.thickness;
        inOffset[l.to] += l.thickness;
        const d = sankeyPath(from.x + 18, y0, to.x, y1);
        const len = lengths[i] || 1000;
        return (
          <path
            key={i}
            ref={(el) => { pathRefs.current[i] = el; }}
            d={d}
            fill="none"
            stroke={l.color}
            strokeOpacity={0.55}
            strokeWidth={l.thickness}
            style={{
              strokeDasharray: len,
              strokeDashoffset: inView ? 0 : len,
              transition: `stroke-dashoffset 1400ms cubic-bezier(0.65, 0, 0.35, 1) ${delayMs + 300 + i * 40}ms`,
            }}
          />
        );
      })}
      {/* Nodos verticales (rectángulos) */}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y + (inView ? 0 : n.h / 2)}
            width={18}
            height={inView ? n.h : 0}
            fill={n.color}
            rx={2}
            style={{
              transition: `height 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs + i * 35}ms, y 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs + i * 35}ms`,
            }}
          />
          <text
            x={n.x + 22}
            y={n.y + n.h / 2}
            dominantBaseline="middle"
            fontSize={10}
            fill="#1F2937"
            style={{
              opacity: inView ? 1 : 0,
              transition: `opacity 400ms ease ${delayMs + 400 + i * 35}ms`,
            }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function AnimatedBehaviorChart() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  // === Customer flow Sankey ===
  // Cols X: Entrance (60) → Central Lifestyle (260) → Casual Flow (480) → Output (700)
  const cfNodes = [
    { id: "entrance",     x: 60,  y: 50,  h: 220, color: ZONE_COLORS.entrance,    label: "Entrance" },
    { id: "central1",     x: 260, y: 30,  h: 130, color: ZONE_COLORS.central,     label: "Central Lifestyle & New Arrivals" },
    { id: "windowDenim",  x: 260, y: 175, h: 35,  color: ZONE_COLORS.windowDenim, label: "Window Display & Denim" },
    { id: "checkoutA",    x: 260, y: 220, h: 30,  color: ZONE_COLORS.checkout,    label: "Checkout & Basics" },
    { id: "otrosA",       x: 260, y: 260, h: 18,  color: ZONE_COLORS.otros,       label: "Otros" },
    { id: "casualFlow",   x: 480, y: 35,  h: 100, color: ZONE_COLORS.casualFlow,  label: "Casual Flow" },
    { id: "central2",     x: 480, y: 150, h: 70,  color: ZONE_COLORS.central,     label: "Central Lifestyle & New Arrivals" },
    { id: "checkoutB",    x: 480, y: 230, h: 35,  color: ZONE_COLORS.checkout,    label: "Checkout & Basics" },
    { id: "otrosB",       x: 480, y: 275, h: 18,  color: ZONE_COLORS.otros,       label: "Otros" },
    { id: "casualOut",    x: 700, y: 30,  h: 75,  color: ZONE_COLORS.casualFlow,  label: "Casual Flow" },
    { id: "centralOut",   x: 700, y: 115, h: 80,  color: ZONE_COLORS.central,     label: "Central Lifestyle & New Arrivals" },
    { id: "checkoutOut",  x: 700, y: 205, h: 50,  color: ZONE_COLORS.checkout,    label: "Checkout & Basics" },
    { id: "otrosOut",     x: 700, y: 263, h: 22,  color: ZONE_COLORS.otros,       label: "Otros" },
  ];

  const cfLinks = [
    { from: "entrance",    to: "central1",    thickness: 110, color: ZONE_COLORS.central },
    { from: "entrance",    to: "windowDenim", thickness: 30,  color: ZONE_COLORS.windowDenim },
    { from: "entrance",    to: "checkoutA",   thickness: 28,  color: ZONE_COLORS.checkout },
    { from: "entrance",    to: "otrosA",      thickness: 15,  color: ZONE_COLORS.otros },
    { from: "central1",    to: "casualFlow",  thickness: 65,  color: ZONE_COLORS.casualFlow },
    { from: "central1",    to: "central2",    thickness: 45,  color: ZONE_COLORS.central },
    { from: "windowDenim", to: "central2",    thickness: 25,  color: ZONE_COLORS.windowDenim },
    { from: "checkoutA",   to: "checkoutB",   thickness: 24,  color: ZONE_COLORS.checkout },
    { from: "otrosA",      to: "otrosB",      thickness: 14,  color: ZONE_COLORS.otros },
    { from: "casualFlow",  to: "casualOut",   thickness: 60,  color: ZONE_COLORS.casualFlow },
    { from: "casualFlow",  to: "centralOut",  thickness: 28,  color: ZONE_COLORS.central },
    { from: "central2",    to: "centralOut",  thickness: 48,  color: ZONE_COLORS.central },
    { from: "checkoutB",   to: "checkoutOut", thickness: 32,  color: ZONE_COLORS.checkout },
    { from: "otrosB",      to: "otrosOut",    thickness: 18,  color: ZONE_COLORS.otros },
  ];

  // === Direct interaction Sankey (más simple, todo confluye a Casual Flow → 3 destinos) ===
  const diNodes = [
    { id: "winDenim",     x: 30,  y: 30,  h: 35, color: ZONE_COLORS.windowDenim, label: "Window Display & Denim" },
    { id: "mensKnit",     x: 30,  y: 75,  h: 35, color: ZONE_COLORS.mensKnit,    label: "Mens Knitwear & Accessories" },
    { id: "checkInter",   x: 30,  y: 120, h: 35, color: ZONE_COLORS.checkout,    label: "Checkout & Basics" },
    { id: "centralInter", x: 30,  y: 165, h: 70, color: ZONE_COLORS.central,     label: "Central Lifestyle & New Arrivals" },
    { id: "casualMid",    x: 360, y: 60,  h: 160, color: ZONE_COLORS.casualFlow, label: "Casual Flow" },
    { id: "centralOut2",  x: 700, y: 55,  h: 50, color: ZONE_COLORS.central,     label: "Central Lifestyle & New Arrivals" },
    { id: "checkoutOut2", x: 700, y: 120, h: 40, color: ZONE_COLORS.checkout,    label: "Checkout & Basics" },
    { id: "mensKnitOut",  x: 700, y: 170, h: 25, color: ZONE_COLORS.mensKnit,    label: "Mens Knitwear & Accessories" },
    { id: "winDenimOut",  x: 700, y: 205, h: 30, color: ZONE_COLORS.windowDenim, label: "Window Display & Denim" },
  ];
  const diLinks = [
    { from: "winDenim",     to: "casualMid",    thickness: 30,  color: ZONE_COLORS.windowDenim },
    { from: "mensKnit",     to: "casualMid",    thickness: 30,  color: ZONE_COLORS.mensKnit },
    { from: "checkInter",   to: "casualMid",    thickness: 30,  color: ZONE_COLORS.checkout },
    { from: "centralInter", to: "casualMid",    thickness: 65,  color: ZONE_COLORS.central },
    { from: "casualMid",    to: "centralOut2",  thickness: 50,  color: ZONE_COLORS.central },
    { from: "casualMid",    to: "checkoutOut2", thickness: 38,  color: ZONE_COLORS.checkout },
    { from: "casualMid",    to: "mensKnitOut",  thickness: 25,  color: ZONE_COLORS.mensKnit },
    { from: "casualMid",    to: "winDenimOut",  thickness: 30,  color: ZONE_COLORS.windowDenim },
  ];

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "#fff",
        border: "1px solid var(--color-rule)",
        boxShadow: "var(--shadow-md)",
        display: "grid",
        gridTemplateColumns: "210px 1fr",
        minHeight: 450,
      }}
    >
      {/* ── SIDEBAR ── */}
      <aside style={{
        background: "#1B3FAF",
        color: "#fff",
        padding: "16px 0",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {/* Logo + iconos */}
        <div className="flex items-center justify-between" style={{ padding: "0 16px" }}>
          <div style={{ width: 28, height: 28, position: "relative" }}>
            {/* Logo Flame gota — simplificado */}
            <svg viewBox="0 0 28 28" width="28" height="28">
              <path d="M14 4 C 18 10, 22 14, 22 18 a 8 8 0 0 1 -16 0 c 0 -4, 4 -8, 8 -14 z" fill="#31b1f8" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col" style={{ gap: 16, padding: "8px 18px", borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 8 }}>
          {["grid","trend","building","wifi","cog"].map((ic, i) => (
            <div
              key={ic}
              style={{
                width: 22, height: 22,
                background: i === 1 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                borderRadius: 4,
                opacity: inView ? 1 : 0,
                transition: `opacity 400ms ease ${100 + i * 60}ms`,
              }}
            />
          ))}
        </div>

        {/* Search */}
        <div style={{ padding: "12px 16px 0" }}>
          <div style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 6,
            padding: "8px 10px",
            fontSize: 12,
            color: "rgba(255,255,255,0.6)",
            opacity: inView ? 1 : 0,
            transition: "opacity 400ms ease 300ms",
          }}>
            🔍 Search location
          </div>
        </div>

        {/* Lista PDV */}
        <div className="flex flex-col" style={{ padding: "8px 12px", gap: 4 }}>
          {PDV_LIST.map((p, i) => (
            <div
              key={p}
              style={{
                fontSize: 12,
                padding: "8px 10px",
                background: i === 0 ? "rgba(255,255,255,0.12)" : "transparent",
                borderRadius: 6,
                color: "rgba(255,255,255,0.92)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(-8px)",
                transition: `opacity 400ms ease ${400 + i * 60}ms, transform 400ms ease ${400 + i * 60}ms`,
              }}
            >
              {p}
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ background: "#F8FAFC", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {/* Header */}
        <div className="flex items-center justify-between" style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 400ms ease",
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1F2937" }}>Locations</div>
            <div style={{ fontSize: 10, color: "#94A3B8" }}>Analytics › Locations</div>
          </div>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div style={{ fontSize: 11, color: "#1F2937" }}>Cosmetic One ▾</div>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#CBD5E1" }} />
          </div>
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-between" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: 8 }}>
          <div className="flex items-center" style={{ gap: 12, fontSize: 10, color: "#64748B" }}>
            <span style={{ background: "#F1F5F9", padding: "4px 8px", borderRadius: 4 }}>📅 12/18/2025 - 12/18/2025</span>
            <span style={{ background: "#F1F5F9", padding: "4px 8px", borderRadius: 4 }}>📅 12/17/2025 - 12/17/2025</span>
            <span style={{ background: "#F1F5F9", padding: "4px 8px", borderRadius: 4 }}>📍 PDV 01 - Velvet & Co. Madrid ▾</span>
          </div>
          <div className="flex items-center" style={{ gap: 12, fontSize: 10, color: "#94A3B8" }}>
            {["Hour","Day","Week","Month","Year"].map((r, i) => (
              <span key={r} style={{
                color: r === "Hour" ? "#1F2937" : "#94A3B8",
                fontWeight: r === "Hour" ? 600 : 400,
                borderBottom: r === "Hour" ? "2px solid #31b1f8" : "2px solid transparent",
                paddingBottom: 2,
                transform: r === "Hour" && inView ? "scaleX(1)" : "scaleX(1)",
                opacity: inView ? 1 : 0,
                transition: `opacity 400ms ease ${i * 50}ms`,
              }}>{r}</span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center" style={{ gap: 18, fontSize: 11, color: "#64748B", paddingBottom: 4 }}>
          {["Zones","Journey","Heatmap","Occupation"].map((tab) => (
            <span key={tab} style={{
              color: tab === "Journey" ? "#1F2937" : "#64748B",
              fontWeight: tab === "Journey" ? 600 : 400,
              borderBottom: tab === "Journey" ? "2px solid #31b1f8" : "2px solid transparent",
              paddingBottom: 4,
              opacity: inView ? 1 : 0,
              transition: "opacity 400ms ease 200ms",
            }}>
              {tab === "Zones" && "▦ "}
              {tab === "Journey" && "↳ "}
              {tab === "Heatmap" && "🔥 "}
              {tab === "Occupation" && "👥 "}
              {tab}
            </span>
          ))}
        </div>

        {/* Customer flow card */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #E2E8F0", padding: 10 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: "#475569", fontWeight: 500 }}>ⓘ Customer flow</div>
            <div style={{ width: 12, height: 12, border: "1px solid #CBD5E1", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 6 }}>Number ▾</div>
          <div style={{ width: "100%", aspectRatio: "780 / 310" }}>
            <SankeyDiagram width={780} height={310} nodes={cfNodes} links={cfLinks} inView={inView} delayMs={300} />
          </div>
        </div>

        {/* Direct interaction card */}
        <div style={{ background: "#fff", borderRadius: 8, border: "1px solid #E2E8F0", padding: 10 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 11, color: "#475569", fontWeight: 500 }}>ⓘ Direct interaction</div>
            <div style={{ fontSize: 9, color: "#94A3B8", background: "#F1F5F9", padding: "2px 6px", borderRadius: 4 }}>Casual Flow ▾</div>
          </div>
          <div style={{ width: "100%", aspectRatio: "780 / 240" }}>
            <SankeyDiagram width={780} height={240} nodes={diNodes} links={diLinks} inView={inView} delayMs={1200} />
          </div>
        </div>
      </div>
    </div>
  );
}
