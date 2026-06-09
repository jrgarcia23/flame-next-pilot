"use client";

/**
 * AnimatedPeopleCountingChart — dashboard People Counting con N elementos
 * configurables (overlays + counters) + editor visual completo.
 *
 * Tipos de elemento:
 *  · Overlay: caja blanca que se descorre/desvanece para revelar la imagen
 *    de debajo. 10 tipos de animación de salida (wipe / fade / scale / slide).
 *  · Counter: caja blanca con un número animado que cuenta de 0 al valor
 *    final usando requestAnimationFrame + ease-out cubic. Tapa el número
 *    original de la imagen y lo sustituye por la versión animada.
 *
 * Modo edición (?edit=1): cada elemento es arrastrable + redimensionable,
 * con panel flotante que permite añadir/eliminar/editar todos los campos.
 *
 * Persistencia en localStorage. JSON exportable para hardcodear en
 * DEFAULT_ELEMENTS.
 */

import { useEffect, useRef, useState } from "react";

type AnimationType =
  | "wipe-right" | "wipe-left" | "wipe-down" | "wipe-up"
  | "fade" | "scale-out"
  | "slide-right" | "slide-left" | "slide-up" | "slide-down";

type BaseCfg = {
  id: string;
  label: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
  delay: number;
};

type OverlayCfg = BaseCfg & {
  kind: "overlay";
  animation: AnimationType;
};

type CounterCfg = BaseCfg & {
  kind: "counter";
  value: number;          // valor final del contador
  decimals: number;       // decimales a mostrar
  thousandsSep: "," | "." | "";
  prefix: string;         // prefijo (ej. "+", "$")
  suffix: string;         // sufijo (ej. "%", " visitas")
  fontSize: number;       // px (ej. 40)
  fontWeight: number;     // 400-700
  color: string;          // ej. "#15163A"
  align: "left" | "center" | "right";
  duration: number;       // ms para la animación del contador
};

type ElementCfg = OverlayCfg | CounterCfg;

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

const DEFAULT_ELEMENTS: ElementCfg[] = [
  // Overlays ya ajustados por JR (panel del editor visual)
  { id: "overlay-mq6hs3td", kind: "overlay", label: "Overlay 2",  left: 32.92, top: 19.72, right: 25.23, bottom: 51.83, delay: 300,  animation: "wipe-up" },
  { id: "overlay-mq6hugy8", kind: "overlay", label: "Overlay 3",  left: 56.56, top: 57.30, right: 1.01,  bottom: 16.53, delay: 600,  animation: "wipe-right" },
  { id: "heatmap",          kind: "overlay", label: "Heatmap",    left: 8.14,  top: 57.22, right: 53.21, bottom: 13.89, delay: 800,  animation: "wipe-up" },
  { id: "overlay-mq6hv8fj", kind: "overlay", label: "Overlay 4",  left: 16.09, top: 22.38, right: 73.17, bottom: 68.51, delay: 900,  animation: "wipe-right" },
  { id: "overlay-mq6hvk30", kind: "overlay", label: "Overlay 5",  left: 16.35, top: 39.81, right: 73.66, bottom: 49.26, delay: 1200, animation: "wipe-right" },
  // Contadores calibrados por JR en el editor visual (KPIs 11.337 y 428)
  // Nota: corrijo value: 11.337 → 11337 (JR escribió con punto pensando en separador
  //       de miles, pero JS interpreta '.' como decimal — el contador real es 11.337)
  { id: "counter-mq6j1phb", kind: "counter", label: "Contador 1 (Visits 11.337)",
    left: 4.59, top: 21.10, right: 86.34, bottom: 73.25,
    delay: 200, value: 11337, decimals: 0, thousandsSep: ".", prefix: "", suffix: "",
    fontSize: 36, fontWeight: 600, color: "#15163A", align: "left", duration: 1600 },
  { id: "counter-mq6j2lv0", kind: "counter", label: "Contador 2 (Avg 428)",
    left: 4.82, top: 39.04, right: 88.16, bottom: 53.97,
    delay: 200, value: 428, decimals: 0, thousandsSep: "", prefix: "", suffix: "",
    fontSize: 36, fontWeight: 600, color: "#15163A", align: "left", duration: 1600 },
];

const STORAGE_KEY = "flame-people-counting-elements-v3";
const DURATION = 1600;
const EASING = "cubic-bezier(0.65, 0, 0.35, 1)";

function animationStyle(anim: AnimationType, inView: boolean, delay: number): React.CSSProperties {
  const t = (prop: string) => `${prop} ${DURATION}ms ${EASING} ${delay}ms`;
  switch (anim) {
    case "wipe-right": return { clipPath: inView ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "wipe-left":  return { clipPath: inView ? "inset(0 100% 0 0)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "wipe-down":  return { clipPath: inView ? "inset(100% 0 0 0)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "wipe-up":    return { clipPath: inView ? "inset(0 0 100% 0)" : "inset(0 0 0 0%)", transition: t("clip-path") };
    case "fade":       return { opacity: inView ? 0 : 1, transition: t("opacity") };
    case "scale-out":  return { transform: inView ? "scale(0)" : "scale(1)", transformOrigin: "center", transition: t("transform") };
    case "slide-right":return { transform: inView ? "translateX(100%)" : "translateX(0)", transition: t("transform") };
    case "slide-left": return { transform: inView ? "translateX(-100%)" : "translateX(0)", transition: t("transform") };
    case "slide-up":   return { transform: inView ? "translateY(-100%)" : "translateY(0)", transition: t("transform") };
    case "slide-down": return { transform: inView ? "translateY(100%)" : "translateY(0)", transition: t("transform") };
  }
}

function formatNumber(v: number, decimals: number, sep: "," | "." | "") {
  const fixed = v.toFixed(decimals);
  if (!sep) return fixed;
  const [intPart, fracPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  return fracPart ? `${withSep}${sep === "," ? "." : ","}${fracPart}` : withSep;
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

function Counter({ to, decimals, sep, prefix, suffix, active, delay, duration }: {
  to: number; decimals: number; sep: "," | "." | "";
  prefix: string; suffix: string;
  active: boolean; delay: number; duration: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let timer = 0;
    const start = (t0: number) => {
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setVal(to * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    timer = window.setTimeout(() => start(performance.now()), delay);
    return () => { cancelAnimationFrame(raf); clearTimeout(timer); };
  }, [active, to, delay, duration]);
  return <span>{prefix}{formatNumber(val, decimals, sep)}{suffix}</span>;
}

export default function AnimatedPeopleCountingChart() {
  const [editMode, setEditMode] = useState(false);
  const [elements, setElements] = useState<ElementCfg[]>(DEFAULT_ELEMENTS);
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
        try { setElements(JSON.parse(saved)); } catch { /* ignore */ }
      }
    }
  }, []);

  useEffect(() => {
    if (editMode) localStorage.setItem(STORAGE_KEY, JSON.stringify(elements));
  }, [elements, editMode]);

  const updateElement = (id: string, patch: Partial<ElementCfg>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } as ElementCfg : e)));
  };
  const addOverlay = () => {
    const id = `overlay-${Date.now().toString(36)}`;
    setElements((prev) => [...prev, {
      id, kind: "overlay", label: `Overlay ${prev.length + 1}`,
      left: 25, top: 25, right: 25, bottom: 25,
      delay: prev.length * 300,
      animation: "wipe-right",
    }]);
  };
  const addCounter = () => {
    const id = `counter-${Date.now().toString(36)}`;
    setElements((prev) => [...prev, {
      id, kind: "counter", label: `Contador ${prev.length + 1}`,
      left: 30, top: 30, right: 50, bottom: 60,
      delay: 200,
      value: 1000, decimals: 0, thousandsSep: ",",
      prefix: "", suffix: "",
      fontSize: 36, fontWeight: 600, color: "#15163A", align: "left",
      duration: 1600,
    }]);
  };
  const removeElement = (id: string) => setElements((prev) => prev.filter((e) => e.id !== id));

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
          elements={elements}
          onChange={updateElement}
          onAddOverlay={addOverlay}
          onAddCounter={addCounter}
          onRemove={removeElement}
          wrapperRef={wrapperRef}
          onReset={() => {
            setElements(DEFAULT_ELEMENTS);
            localStorage.removeItem(STORAGE_KEY);
          }}
        />
      ) : (
        elements.map((e) =>
          e.kind === "overlay" ? (
            <div
              key={e.id}
              aria-hidden
              style={{
                position: "absolute",
                left: `${e.left}%`, right: `${e.right}%`,
                top:  `${e.top}%`,  bottom: `${e.bottom}%`,
                background: "#fff",
                ...animationStyle(e.animation, inView, e.delay),
              }}
            />
          ) : (
            <div
              key={e.id}
              style={{
                position: "absolute",
                left: `${e.left}%`, right: `${e.right}%`,
                top:  `${e.top}%`,  bottom: `${e.bottom}%`,
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: e.align === "left" ? "flex-start" : e.align === "right" ? "flex-end" : "center",
                color: e.color,
                fontFamily: "var(--font-display)",
                fontSize: e.fontSize,
                fontWeight: e.fontWeight,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
                pointerEvents: "none",
              }}
            >
              <Counter
                to={e.value}
                decimals={e.decimals}
                sep={e.thousandsSep}
                prefix={e.prefix}
                suffix={e.suffix}
                active={inView}
                delay={e.delay}
                duration={e.duration}
              />
            </div>
          )
        )
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
  elements: ElementCfg[];
  onChange: (id: string, patch: Partial<ElementCfg>) => void;
  onAddOverlay: () => void;
  onAddCounter: () => void;
  onRemove: (id: string) => void;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  onReset: () => void;
};

function Editor({ elements, onChange, onAddOverlay, onAddCounter, onRemove, wrapperRef, onReset }: EditorProps) {
  const [selected, setSelected] = useState<string>(elements[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const json = JSON.stringify(elements.map((e) => ({
      ...e,
      left: round(e.left, 2), top: round(e.top, 2),
      right: round(e.right, 2), bottom: round(e.bottom, 2),
    })), null, 2);
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <>
      {elements.map((e) => (
        <EditableBox
          key={e.id}
          element={e}
          isSelected={selected === e.id}
          onSelect={() => setSelected(e.id)}
          onChange={(patch) => onChange(e.id, patch)}
          wrapperRef={wrapperRef}
        />
      ))}

      <div
        style={{
          position: "fixed",
          right: 24, bottom: 24,
          width: 440, maxHeight: "85vh", overflow: "auto",
          background: "#0F172A", color: "#fff",
          borderRadius: 12, padding: 16,
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.5)",
          zIndex: 9999,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <strong style={{ fontFamily: "sans-serif", fontSize: 13 }}>🎯 Editor</strong>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={onAddOverlay} style={btnPrimary}>+ Overlay</button>
            <button onClick={onAddCounter} style={{ ...btnPrimary, background: "#A78BFA" }}>+ Contador</button>
            <button onClick={handleCopy} style={{ ...btnPrimary, background: copied ? "#10B981" : "#31b1f8" }}>
              {copied ? "✓ Copiado" : "Copiar JSON"}
            </button>
          </div>
        </div>

        {elements.length === 0 && (
          <div style={{ padding: 12, opacity: 0.6, fontFamily: "sans-serif", textAlign: "center" }}>
            No hay elementos. Añade un Overlay o Contador.
          </div>
        )}

        {elements.map((e) => (
          <div
            key={e.id}
            onClick={() => setSelected(e.id)}
            style={{
              padding: 10, marginBottom: 6,
              borderRadius: 6,
              background: selected === e.id
                ? (e.kind === "counter" ? "rgba(167,139,250,0.2)" : "rgba(49,177,248,0.2)")
                : "rgba(255,255,255,0.04)",
              border: selected === e.id
                ? `1px solid ${e.kind === "counter" ? "#A78BFA" : "#31b1f8"}`
                : "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, opacity: 0.7, fontFamily: "sans-serif", padding: "2px 6px", background: e.kind === "counter" ? "rgba(167,139,250,0.25)" : "rgba(49,177,248,0.25)", borderRadius: 3 }}>
                {e.kind === "counter" ? "🔢 Cont" : "🔲 Over"}
              </span>
              <input
                value={e.label}
                onChange={(ev) => onChange(e.id, { label: ev.target.value })}
                onClick={(ev) => ev.stopPropagation()}
                style={{
                  flex: 1, background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff", padding: "4px 8px",
                  borderRadius: 4, fontFamily: "sans-serif", fontSize: 12, fontWeight: 600,
                }}
              />
              <button
                onClick={(ev) => { ev.stopPropagation(); onRemove(e.id); }}
                style={{ ...btnSecondary, color: "#FCA5A5", border: "1px solid rgba(252,165,165,0.25)" }}
              >🗑</button>
            </div>

            {/* Campos comunes */}
            <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <label style={fieldLabel}>
                <span style={fieldSpan}>delay (ms)</span>
                <input type="number" value={e.delay} step={100}
                  onChange={(ev) => onChange(e.id, { delay: Number(ev.target.value) || 0 })}
                  onClick={(ev) => ev.stopPropagation()}
                  style={fieldInput}
                />
              </label>

              {e.kind === "overlay" ? (
                <label style={fieldLabel}>
                  <span style={fieldSpan}>animación</span>
                  <select value={e.animation}
                    onChange={(ev) => onChange(e.id, { animation: ev.target.value as AnimationType })}
                    onClick={(ev) => ev.stopPropagation()}
                    style={fieldInput}
                  >
                    {(Object.keys(ANIM_LABELS) as AnimationType[]).map((a) => (
                      <option key={a} value={a}>{ANIM_LABELS[a]}</option>
                    ))}
                  </select>
                </label>
              ) : (
                <label style={fieldLabel}>
                  <span style={fieldSpan}>duración (ms)</span>
                  <input type="number" value={e.duration} step={100}
                    onChange={(ev) => onChange(e.id, { duration: Number(ev.target.value) || 0 })}
                    onClick={(ev) => ev.stopPropagation()}
                    style={fieldInput}
                  />
                </label>
              )}
            </div>

            {/* Campos específicos de COUNTER */}
            {e.kind === "counter" && (
              <>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>valor final</span>
                    <input type="number" value={e.value} step={1}
                      onChange={(ev) => onChange(e.id, { value: Number(ev.target.value) || 0 })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    />
                  </label>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>decimales</span>
                    <input type="number" value={e.decimals} step={1} min={0} max={4}
                      onChange={(ev) => onChange(e.id, { decimals: Number(ev.target.value) || 0 })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    />
                  </label>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>sep miles</span>
                    <select value={e.thousandsSep}
                      onChange={(ev) => onChange(e.id, { thousandsSep: ev.target.value as "," | "." | "" })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    >
                      <option value=",">,</option>
                      <option value=".">.</option>
                      <option value="">(ninguno)</option>
                    </select>
                  </label>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>prefijo</span>
                    <input value={e.prefix} placeholder="+ ↑ $"
                      onChange={(ev) => onChange(e.id, { prefix: ev.target.value })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    />
                  </label>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>sufijo</span>
                    <input value={e.suffix} placeholder="% h €"
                      onChange={(ev) => onChange(e.id, { suffix: ev.target.value })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    />
                  </label>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>font size</span>
                    <input type="number" value={e.fontSize} step={2} min={10} max={120}
                      onChange={(ev) => onChange(e.id, { fontSize: Number(ev.target.value) || 36 })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    />
                  </label>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>peso</span>
                    <select value={e.fontWeight}
                      onChange={(ev) => onChange(e.id, { fontWeight: Number(ev.target.value) })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    >
                      <option value={400}>400 normal</option>
                      <option value={500}>500 medium</option>
                      <option value={600}>600 semibold</option>
                      <option value={700}>700 bold</option>
                    </select>
                  </label>
                  <label style={fieldLabel}>
                    <span style={fieldSpan}>alineación</span>
                    <select value={e.align}
                      onChange={(ev) => onChange(e.id, { align: ev.target.value as "left"|"center"|"right" })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    >
                      <option value="left">izq</option>
                      <option value="center">centro</option>
                      <option value="right">der</option>
                    </select>
                  </label>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <label style={{ ...fieldLabel, flex: 2 }}>
                    <span style={fieldSpan}>color (hex)</span>
                    <input value={e.color}
                      onChange={(ev) => onChange(e.id, { color: ev.target.value })}
                      onClick={(ev) => ev.stopPropagation()}
                      style={fieldInput}
                    />
                  </label>
                </div>
              </>
            )}

            <div style={{ opacity: 0.7, fontSize: 11 }}>
              L:{e.left.toFixed(2)}% · T:{e.top.toFixed(2)}% · R:{e.right.toFixed(2)}% · B:{e.bottom.toFixed(2)}%
            </div>
          </div>
        ))}

        <button onClick={onReset} style={{ ...btnSecondary, width: "100%", marginTop: 4 }}>
          ↺ Reset a valores por defecto
        </button>
      </div>
    </>
  );
}

const btnPrimary: React.CSSProperties = {
  background: "#31b1f8", color: "#fff", border: "none",
  padding: "6px 10px", borderRadius: 6,
  cursor: "pointer", fontSize: 11, fontWeight: 600,
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
const fieldSpan: React.CSSProperties = {
  opacity: 0.6, fontFamily: "sans-serif", fontSize: 10,
};
const fieldInput: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff", padding: "4px 8px",
  borderRadius: 4, fontFamily: "sans-serif", fontSize: 11,
  width: "100%",
};

function round(n: number, d: number) {
  const m = Math.pow(10, d);
  return Math.round(n * m) / m;
}

type DragMode = "move" | "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

type EditableBoxProps = {
  element: ElementCfg;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<ElementCfg>) => void;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
};

function EditableBox({ element: e, isSelected, onSelect, onChange, wrapperRef }: EditableBoxProps) {
  const startRef = useRef<{ x: number; y: number; o: ElementCfg; mode: DragMode; W: number; H: number } | null>(null);
  const themeColor = e.kind === "counter" ? "#A78BFA" : "#31b1f8";

  const beginDrag = (ev: React.PointerEvent, mode: DragMode) => {
    ev.stopPropagation();
    ev.preventDefault();
    onSelect();
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    startRef.current = {
      x: ev.clientX, y: ev.clientY,
      o: { ...e } as ElementCfg, mode,
      W: rect.width, H: rect.height,
    };
    (ev.target as Element).setPointerCapture(ev.pointerId);
  };

  const onMove = (ev: React.PointerEvent) => {
    if (!startRef.current) return;
    const { x, y, o, mode, W, H } = startRef.current;
    const dxPct = ((ev.clientX - x) / W) * 100;
    const dyPct = ((ev.clientY - y) / H) * 100;
    const patch: Partial<ElementCfg> = {};
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

  const endDrag = (ev: React.PointerEvent) => {
    if (!startRef.current) return;
    startRef.current = null;
    try { (ev.target as Element).releasePointerCapture(ev.pointerId); } catch {}
  };

  const handle = (mode: DragMode, style: React.CSSProperties) => (
    <div
      onPointerDown={(ev) => beginDrag(ev, mode)}
      style={{
        position: "absolute",
        width: 10, height: 10,
        background: themeColor,
        border: "2px solid #fff",
        borderRadius: "50%",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
        cursor: `${mode}-resize`,
        ...style,
      }}
    />
  );

  const tooltip = e.kind === "counter"
    ? `${e.label} · → ${formatNumber(e.value, e.decimals, e.thousandsSep)}${e.suffix} · ${e.delay}ms`
    : `${e.label} · ${ANIM_LABELS[e.animation]} · ${e.delay}ms`;

  return (
    <div
      onPointerDown={(ev) => beginDrag(ev, "move")}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{
        position: "absolute",
        left: `${e.left}%`, top: `${e.top}%`,
        right: `${e.right}%`, bottom: `${e.bottom}%`,
        background: isSelected
          ? (e.kind === "counter" ? "rgba(167,139,250,0.20)" : "rgba(49,177,248,0.18)")
          : (e.kind === "counter" ? "rgba(167,139,250,0.08)" : "rgba(49,177,248,0.08)"),
        border: `2px solid ${isSelected ? themeColor : `${themeColor}88`}`,
        cursor: "move",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        position: "absolute",
        top: -22, left: 0,
        background: isSelected ? themeColor : `${themeColor}b3`,
        color: "#fff", fontSize: 11, fontWeight: 600,
        padding: "2px 8px", borderRadius: 4,
        whiteSpace: "nowrap",
        fontFamily: "sans-serif",
        pointerEvents: "none",
      }}>{tooltip}</div>

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
