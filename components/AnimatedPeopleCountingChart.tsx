"use client";

/**
 * AnimatedPeopleCountingChart — dashboard People Counting con cascada de
 * 5 overlays + modo edición visual.
 *
 * Modo normal: las 5 zonas (KPIs, Visits, Heatmap, Hourly, Daily) están
 * tapadas por overlays blancos que se descorren de izq → der al entrar
 * en viewport, con stagger creciente.
 *
 * Modo edición (?edit=1 en la URL): los overlays se vuelven cajas cyan
 * arrastrables y redimensionables con el ratón. Un panel flotante
 * muestra las coordenadas en píxeles y en %. Botón "Copiar JSON" copia
 * el array de coords al portapapeles. Persistencia en localStorage para
 * no perder ajustes al refrescar.
 *
 * Una vez ajustado, JR me pasa el JSON y yo lo pego en DEFAULT_OVERLAYS.
 */

import { useEffect, useRef, useState } from "react";

type OverlayCfg = {
  id: string;
  label: string;
  // En %: posición relativa al wrapper
  left: number;
  top: number;
  right: number;
  bottom: number;
  delay: number;
};

const DEFAULT_OVERLAYS: OverlayCfg[] = [
  { id: "kpis",     label: "Fila KPIs",            left: 4,  top: 8,  right: 1,  bottom: 76, delay: 0    },
  { id: "visits",   label: "Gráfica Visits",       left: 26, top: 8,  right: 27, bottom: 76, delay: 400  },
  { id: "heatmap",  label: "Heatmap",              left: 4,  top: 28, right: 51, bottom: 14, delay: 800  },
  { id: "hourly",   label: "Hourly distribution",  left: 51, top: 28, right: 1,  bottom: 14, delay: 1000 },
  { id: "daily",    label: "Daily distribution",   left: 4,  top: 86, right: 1,  bottom: 1,  delay: 1300 },
];

const STORAGE_KEY = "flame-people-counting-overlays";

function useInView<T extends Element>(threshold = 0.2, enabled = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!enabled || !ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, threshold, enabled]);
  return { ref, inView };
}

export default function AnimatedPeopleCountingChart() {
  const [editMode, setEditMode] = useState(false);
  const [overlays, setOverlays] = useState<OverlayCfg[]>(DEFAULT_OVERLAYS);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.2, !editMode);

  // Combinamos refs en wrapperRef + inViewRef
  const setRefs = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

  // Detectar query ?edit=1 al montar
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    if (sp.get("edit") === "1") {
      setEditMode(true);
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try { setOverlays(JSON.parse(saved)); } catch { /* ignore */ }
      }
    }
  }, []);

  // Persistir al cambiar (solo en edit mode)
  useEffect(() => {
    if (editMode) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overlays));
    }
  }, [overlays, editMode]);

  const updateOverlay = (id: string, patch: Partial<OverlayCfg>) => {
    setOverlays((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  };

  return (
    <div
      ref={setRefs}
      className="apc-wrap rounded-2xl overflow-hidden relative"
      style={{
        background: "#fff",
        border: "1px solid var(--color-rule)",
        boxShadow: "var(--shadow-md)",
        position: "relative",
      }}
    >
      {/* IMAGEN ORIGINAL */}
      <img
        src="/wp-content/uploads/2026/01/People-Counting_recorte.png"
        alt="Flame People Counting dashboard"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {editMode ? (
        <EditableOverlays
          overlays={overlays}
          onChange={updateOverlay}
          wrapperRef={wrapperRef}
          onReset={() => {
            setOverlays(DEFAULT_OVERLAYS);
            localStorage.removeItem(STORAGE_KEY);
          }}
        />
      ) : (
        overlays.map((o) => (
          <div
            key={o.id}
            aria-hidden
            style={{
              position: "absolute",
              left: `${o.left}%`,  right: `${o.right}%`,
              top:  `${o.top}%`,   bottom: `${o.bottom}%`,
              background: "#fff",
              clipPath: inView ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)",
              transition: `clip-path 1600ms cubic-bezier(0.65, 0, 0.35, 1) ${o.delay}ms`,
            }}
          />
        ))
      )}

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

// ═══════════════════════════════════════════════════════════════════════
// EDITOR VISUAL
// ═══════════════════════════════════════════════════════════════════════

type EditableOverlaysProps = {
  overlays: OverlayCfg[];
  onChange: (id: string, patch: Partial<OverlayCfg>) => void;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  onReset: () => void;
};

function EditableOverlays({ overlays, onChange, wrapperRef, onReset }: EditableOverlaysProps) {
  const [selected, setSelected] = useState<string>(overlays[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const json = JSON.stringify(overlays.map(({ id, label, left, top, right, bottom, delay }) => ({
      id, label, left: round(left, 2), top: round(top, 2), right: round(right, 2), bottom: round(bottom, 2), delay,
    })), null, 2);
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <>
      {overlays.map((o) => (
        <EditableBox
          key={o.id}
          overlay={o}
          isSelected={selected === o.id}
          onSelect={() => setSelected(o.id)}
          onChange={(patch) => onChange(o.id, patch)}
          wrapperRef={wrapperRef}
        />
      ))}

      {/* Panel de control flotante */}
      <div
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          width: 380,
          maxHeight: "70vh",
          overflow: "auto",
          background: "#0F172A",
          color: "#fff",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.5)",
          zIndex: 9999,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <strong style={{ fontFamily: "sans-serif", fontSize: 13 }}>🎯 Editor de overlays</strong>
          <button
            onClick={handleCopy}
            style={{
              background: copied ? "#10B981" : "#31b1f8",
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            {copied ? "✓ Copiado" : "Copiar JSON"}
          </button>
        </div>

        {overlays.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelected(o.id)}
            style={{
              padding: 8,
              marginBottom: 4,
              borderRadius: 6,
              background: selected === o.id ? "rgba(49,177,248,0.2)" : "transparent",
              cursor: "pointer",
              border: selected === o.id ? "1px solid #31b1f8" : "1px solid transparent",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", marginBottom: 2 }}>
              <span style={{ fontWeight: 600 }}>{o.label}</span>
              <span style={{ opacity: 0.6 }}>delay {o.delay}ms</span>
            </div>
            <div style={{ opacity: 0.85 }}>
              L:{o.left.toFixed(2)}% · T:{o.top.toFixed(2)}% · R:{o.right.toFixed(2)}% · B:{o.bottom.toFixed(2)}%
            </div>
          </div>
        ))}

        <button
          onClick={onReset}
          style={{
            marginTop: 8, width: "100%",
            background: "transparent",
            color: "#94A3B8",
            border: "1px solid #334155",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 11,
            fontFamily: "sans-serif",
          }}
        >
          ↺ Reset a valores por defecto
        </button>

        <p style={{ marginTop: 12, opacity: 0.6, fontFamily: "sans-serif", lineHeight: 1.4 }}>
          Arrastra desde dentro de cada caja para mover. Arrastra desde los puntos cyan para redimensionar. Cambios se guardan en localStorage.
        </p>
      </div>
    </>
  );
}

function round(n: number, d: number) {
  const m = Math.pow(10, d);
  return Math.round(n * m) / m;
}

type EditableBoxProps = {
  overlay: OverlayCfg;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<OverlayCfg>) => void;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
};

type DragMode = "move" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

function EditableBox({ overlay, isSelected, onSelect, onChange, wrapperRef }: EditableBoxProps) {
  const startRef = useRef<{ x: number; y: number; o: OverlayCfg; mode: DragMode; W: number; H: number } | null>(null);

  const beginDrag = (e: React.PointerEvent, mode: DragMode) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect();
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    startRef.current = {
      x: e.clientX,
      y: e.clientY,
      o: { ...overlay },
      mode,
      W: rect.width,
      H: rect.height,
    };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    const { x, y, o, mode, W, H } = startRef.current;
    const dxPct = ((e.clientX - x) / W) * 100;
    const dyPct = ((e.clientY - y) / H) * 100;

    const patch: Partial<OverlayCfg> = {};
    if (mode === "move") {
      patch.left = clamp(o.left + dxPct);
      patch.right = clamp(o.right - dxPct);
      patch.top = clamp(o.top + dyPct);
      patch.bottom = clamp(o.bottom - dyPct);
    } else {
      if (mode.includes("n")) patch.top = clamp(o.top + dyPct);
      if (mode.includes("s")) patch.bottom = clamp(o.bottom - dyPct);
      if (mode.includes("w")) patch.left = clamp(o.left + dxPct);
      if (mode.includes("e")) patch.right = clamp(o.right - dxPct);
    }
    onChange(patch);
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!startRef.current) return;
    startRef.current = null;
    try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
  };

  const handle = (mode: DragMode, style: React.CSSProperties) => (
    <div
      onPointerDown={(e) => beginDrag(e, mode)}
      style={{
        position: "absolute",
        width: 10, height: 10,
        background: "#31b1f8",
        border: "2px solid #fff",
        borderRadius: "50%",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
        cursor: `${mode}-resize`,
        ...style,
      }}
    />
  );

  return (
    <div
      onPointerDown={(e) => beginDrag(e, "move")}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        position: "absolute",
        left: `${overlay.left}%`,
        top: `${overlay.top}%`,
        right: `${overlay.right}%`,
        bottom: `${overlay.bottom}%`,
        background: isSelected ? "rgba(49,177,248,0.18)" : "rgba(49,177,248,0.08)",
        border: `2px solid ${isSelected ? "#31b1f8" : "rgba(49,177,248,0.5)"}`,
        cursor: "move",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        position: "absolute",
        top: -22,
        left: 0,
        background: isSelected ? "#31b1f8" : "rgba(49,177,248,0.7)",
        color: "#fff",
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 8px",
        borderRadius: 4,
        whiteSpace: "nowrap",
        fontFamily: "sans-serif",
        pointerEvents: "none",
      }}>
        {overlay.label}
      </div>

      {/* 8 handles de resize */}
      {handle("nw", { left: -6, top: -6 })}
      {handle("n",  { left: "50%", top: -6, transform: "translateX(-50%)" })}
      {handle("ne", { right: -6, top: -6 })}
      {handle("e",  { right: -6, top: "50%", transform: "translateY(-50%)" })}
      {handle("se", { right: -6, bottom: -6 })}
      {handle("s",  { left: "50%", bottom: -6, transform: "translateX(-50%)" })}
      {handle("sw", { left: -6, bottom: -6 })}
      {handle("w",  { left: -6, top: "50%", transform: "translateY(-50%)" })}
    </div>
  );
}

function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
