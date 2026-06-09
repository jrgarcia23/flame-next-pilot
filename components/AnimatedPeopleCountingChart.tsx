"use client";

/**
 * AnimatedPeopleCountingChart — dashboard People Counting con N overlays
 * configurables + editor visual completo.
 *
 * Modo normal: los overlays definidos en DEFAULT_OVERLAYS se aplican
 * sobre la imagen y se animan al entrar en viewport según el tipo de
 * animación de cada uno.
 *
 * Modo edición (?edit=1): cada overlay se vuelve una caja cyan
 * arrastrable + redimensionable. Panel flotante permite:
 *   - Añadir / eliminar overlays
 *   - Renombrar (label)
 *   - Ajustar delay (ms)
 *   - Elegir tipo de animación (10 disponibles)
 *   - Copiar JSON final
 *   - Reset
 *
 * Persistencia en localStorage por wrapper.
 */

import { useEffect, useRef, useState } from "react";

type AnimationType =
  | "wipe-right"   // cortina se descorre de izq → der (revela el contenido)
  | "wipe-left"    // cortina se descorre de der → izq
  | "wipe-down"    // cortina se descorre de arriba → abajo
  | "wipe-up"      // cortina se descorre de abajo → arriba
  | "fade"         // fade out (opacity 1 → 0)
  | "scale-out"    // shrink desde centro
  | "slide-right"  // se va hacia la derecha
  | "slide-left"   // se va hacia la izquierda
  | "slide-up"     // se va hacia arriba
  | "slide-down";  // se va hacia abajo

type OverlayCfg = {
  id: string;
  label: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
  delay: number;
  animation: AnimationType;
};

const ANIM_LABELS: Record<AnimationType, string> = {
  "wipe-right":  "Cortina → der",
  "wipe-left":   "Cortina → izq",
  "wipe-down":   "Cortina ↓",
  "wipe-up":     "Cortina ↑",
  "fade":        "Fade out",
  "scale-out":   "Encoge al centro",
  "slide-right": "Sale por la der",
  "slide-left":  "Sale por la izq",
  "slide-up":    "Sale por arriba",
  "slide-down":  "Sale por abajo",
};

const DEFAULT_OVERLAYS: OverlayCfg[] = [
  // Overlays calibrados por JR en el editor visual (?edit=1)
  { id: "overlay-mq6hs3td", label: "Overlay 2",  left: 32.92, top: 19.72, right: 25.23, bottom: 51.83, delay: 300,  animation: "wipe-up" },
  { id: "overlay-mq6hugy8", label: "Overlay 3",  left: 56.56, top: 57.30, right: 1.01,  bottom: 16.53, delay: 600,  animation: "wipe-right" },
  { id: "heatmap",          label: "Heatmap",    left: 8.14,  top: 57.22, right: 53.21, bottom: 13.89, delay: 800,  animation: "wipe-up" },
  { id: "overlay-mq6hv8fj", label: "Overlay 4",  left: 16.09, top: 22.38, right: 73.17, bottom: 68.51, delay: 900,  animation: "wipe-right" },
  { id: "overlay-mq6hvk30", label: "Overlay 5",  left: 16.35, top: 39.81, right: 73.66, bottom: 49.26, delay: 1200, animation: "wipe-right" },
];

const STORAGE_KEY = "flame-people-counting-overlays-v2";
const DURATION = 1600;
const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

function animationStyle(anim: AnimationType, inView: boolean, delay: number): React.CSSProperties {
  const t = (prop: string) => `${prop} ${DURATION}ms ${EASING} ${delay}ms`;
  switch (anim) {
    case "wipe-right":
      return { clipPath: inView ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "wipe-left":
      return { clipPath: inView ? "inset(0 100% 0 0)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "wipe-down":
      return { clipPath: inView ? "inset(100% 0 0 0)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "wipe-up":
      return { clipPath: inView ? "inset(0 0 100% 0)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "fade":
      return { opacity: inView ? 0 : 1, transition: t("opacity") };
    case "scale-out":
      return { transform: inView ? "scale(0)" : "scale(1)", transformOrigin: "center", transition: t("transform") };
    case "slide-right":
      return { transform: inView ? "translateX(100%)" : "translateX(0)", transition: t("transform") };
    case "slide-left":
      return { transform: inView ? "translateX(-100%)" : "translateX(0)", transition: t("transform") };
    case "slide-up":
      return { transform: inView ? "translateY(-100%)" : "translateY(0)", transition: t("transform") };
    case "slide-down":
      return { transform: inView ? "translateY(100%)" : "translateY(0)", transition: t("transform") };
  }
}

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

  const setRefs = (node: HTMLDivElement | null) => {
    wrapperRef.current = node;
    (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
  };

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

  useEffect(() => {
    if (editMode) localStorage.setItem(STORAGE_KEY, JSON.stringify(overlays));
  }, [overlays, editMode]);

  const updateOverlay = (id: string, patch: Partial<OverlayCfg>) => {
    setOverlays((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  };
  const addOverlay = () => {
    const id = `overlay-${Date.now().toString(36)}`;
    setOverlays((prev) => [...prev, {
      id, label: `Overlay ${prev.length + 1}`,
      left: 25, top: 25, right: 25, bottom: 25,
      delay: prev.length * 300,
      animation: "wipe-right",
    }]);
  };
  const removeOverlay = (id: string) => {
    setOverlays((prev) => prev.filter((o) => o.id !== id));
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
      <img
        src="/wp-content/uploads/2026/01/People-Counting_recorte.png"
        alt="Flame People Counting dashboard"
        style={{ width: "100%", height: "auto", display: "block" }}
      />

      {editMode ? (
        <Editor
          overlays={overlays}
          onChange={updateOverlay}
          onAdd={addOverlay}
          onRemove={removeOverlay}
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
              ...animationStyle(o.animation, inView, o.delay),
            }}
          />
        ))
      )}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .apc-wrap > div[aria-hidden] { transition: none !important; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// EDITOR
// ═══════════════════════════════════════════════════════════════════════

type EditorProps = {
  overlays: OverlayCfg[];
  onChange: (id: string, patch: Partial<OverlayCfg>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  onReset: () => void;
};

function Editor({ overlays, onChange, onAdd, onRemove, wrapperRef, onReset }: EditorProps) {
  const [selected, setSelected] = useState<string>(overlays[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const json = JSON.stringify(overlays.map(({ id, label, left, top, right, bottom, delay, animation }) => ({
      id, label,
      left: round(left, 2), top: round(top, 2),
      right: round(right, 2), bottom: round(bottom, 2),
      delay, animation,
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

      <div
        style={{
          position: "fixed",
          right: 24, bottom: 24,
          width: 420, maxHeight: "82vh", overflow: "auto",
          background: "#0F172A", color: "#fff",
          borderRadius: 12, padding: 16,
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.5)",
          zIndex: 9999,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <strong style={{ fontFamily: "sans-serif", fontSize: 13 }}>🎯 Editor de overlays</strong>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={onAdd} style={btnPrimary}>+ Añadir</button>
            <button onClick={handleCopy} style={{ ...btnPrimary, background: copied ? "#10B981" : "#31b1f8" }}>
              {copied ? "✓ Copiado" : "Copiar JSON"}
            </button>
          </div>
        </div>

        {overlays.length === 0 && (
          <div style={{ padding: 12, opacity: 0.6, fontFamily: "sans-serif", textAlign: "center" }}>
            No hay overlays. Pulsa "+ Añadir" para crear el primero.
          </div>
        )}

        {overlays.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelected(o.id)}
            style={{
              padding: 10, marginBottom: 6,
              borderRadius: 6,
              background: selected === o.id ? "rgba(49,177,248,0.18)" : "rgba(255,255,255,0.04)",
              border: selected === o.id ? "1px solid #31b1f8" : "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <input
                value={o.label}
                onChange={(e) => onChange(o.id, { label: e.target.value })}
                onClick={(e) => e.stopPropagation()}
                style={{
                  flex: 1, background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", padding: "4px 8px",
                  borderRadius: 4, fontFamily: "sans-serif", fontSize: 12, fontWeight: 600,
                }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(o.id); }}
                style={{ ...btnSecondary, color: "#FCA5A5", border: "1px solid rgba(252,165,165,0.25)" }}
                title="Eliminar overlay"
              >
                🗑
              </button>
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 6, fontFamily: "sans-serif", fontSize: 11 }}>
              <label style={fieldLabel}>
                <span style={{ opacity: 0.6 }}>delay (ms)</span>
                <input
                  type="number"
                  value={o.delay}
                  step={100}
                  onChange={(e) => onChange(o.id, { delay: Number(e.target.value) || 0 })}
                  onClick={(e) => e.stopPropagation()}
                  style={fieldInput}
                />
              </label>
              <label style={fieldLabel}>
                <span style={{ opacity: 0.6 }}>animación</span>
                <select
                  value={o.animation}
                  onChange={(e) => onChange(o.id, { animation: e.target.value as AnimationType })}
                  onClick={(e) => e.stopPropagation()}
                  style={fieldInput}
                >
                  {(Object.keys(ANIM_LABELS) as AnimationType[]).map((a) => (
                    <option key={a} value={a}>{ANIM_LABELS[a]}</option>
                  ))}
                </select>
              </label>
            </div>

            <div style={{ opacity: 0.7, fontSize: 11 }}>
              L:{o.left.toFixed(2)}% · T:{o.top.toFixed(2)}% · R:{o.right.toFixed(2)}% · B:{o.bottom.toFixed(2)}%
            </div>
          </div>
        ))}

        <button onClick={onReset} style={{ ...btnSecondary, width: "100%", marginTop: 4 }}>
          ↺ Reset a valores por defecto
        </button>

        <p style={{ marginTop: 12, opacity: 0.5, fontFamily: "sans-serif", lineHeight: 1.4, fontSize: 11 }}>
          Arrastra desde dentro de cada caja para mover. Arrastra los puntos cyan para redimensionar. Cambios guardados automáticamente.
        </p>
      </div>
    </>
  );
}

const btnPrimary: React.CSSProperties = {
  background: "#31b1f8", color: "#fff", border: "none",
  padding: "6px 12px", borderRadius: 6,
  cursor: "pointer", fontSize: 12, fontWeight: 600,
  fontFamily: "sans-serif",
};
const btnSecondary: React.CSSProperties = {
  background: "transparent", color: "#94A3B8",
  border: "1px solid #334155",
  padding: "6px 12px", borderRadius: 6,
  cursor: "pointer", fontSize: 12,
  fontFamily: "sans-serif",
};
const fieldLabel: React.CSSProperties = {
  display: "flex", flexDirection: "column", gap: 2, flex: 1,
};
const fieldInput: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff", padding: "4px 8px",
  borderRadius: 4, fontFamily: "sans-serif", fontSize: 11,
};

function round(n: number, d: number) {
  const m = Math.pow(10, d);
  return Math.round(n * m) / m;
}

type DragMode = "move" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

type EditableBoxProps = {
  overlay: OverlayCfg;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<OverlayCfg>) => void;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
};

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
      x: e.clientX, y: e.clientY,
      o: { ...overlay }, mode,
      W: rect.width, H: rect.height,
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
        left: `${overlay.left}%`, top: `${overlay.top}%`,
        right: `${overlay.right}%`, bottom: `${overlay.bottom}%`,
        background: isSelected ? "rgba(49,177,248,0.18)" : "rgba(49,177,248,0.08)",
        border: `2px solid ${isSelected ? "#31b1f8" : "rgba(49,177,248,0.5)"}`,
        cursor: "move",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        position: "absolute",
        top: -22, left: 0,
        background: isSelected ? "#31b1f8" : "rgba(49,177,248,0.7)",
        color: "#fff", fontSize: 11, fontWeight: 600,
        padding: "2px 8px", borderRadius: 4,
        whiteSpace: "nowrap",
        fontFamily: "sans-serif",
        pointerEvents: "none",
      }}>
        {overlay.label} · {ANIM_LABELS[overlay.animation]} · {overlay.delay}ms
      </div>

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
