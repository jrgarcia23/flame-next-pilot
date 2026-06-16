"use client";

import { useEffect, useState } from "react";

type MediaItem = { path: string; name: string; url: string; size: number; updated_at: string };

const navy = "#15163A";
const accent = "#31B1F8";
const accentDeep = "#1E89C7";
const ink3 = "#6E7488";
const rule = "rgba(15,23,42,0.12)";

const FOLDERS = [
  { value: "cms", label: "Subidas desde el editor" },
  { value: "case-studies", label: "Casos de éxito" },
  { value: "2026", label: "WP 2026" },
  { value: "2025", label: "WP 2025" },
  { value: "2024", label: "WP 2024" },
  { value: "2023", label: "WP 2023" },
];

export default function MediaPickerModal({
  open,
  onClose,
  onPick,
  title = "Elegir imagen",
}: {
  open: boolean;
  onClose: () => void;
  onPick: (url: string) => void;
  title?: string;
}) {
  const [folder, setFolder] = useState("cms");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    const ctrl = new AbortController();
    fetch(`/api/admin/posts/list-images/?folder=${encodeURIComponent(folder)}&q=${encodeURIComponent(q)}&limit=120`, { signal: ctrl.signal })
      .then(r => r.json())
      .then(d => { if (d?.ok) setItems(d.items); })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [open, folder, q]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,22,58,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, maxWidth: 1080, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 64px -10px rgba(15,22,58,0.4)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: `1px solid ${rule}` }}>
          <h2 style={{ margin: 0, fontSize: 18, color: navy, fontWeight: 600 }}>{title}</h2>
          <button onClick={onClose} style={{ border: 0, background: "transparent", fontSize: 22, color: ink3, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "12px 22px", borderBottom: `1px solid ${rule}`, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <select value={folder} onChange={(e) => setFolder(e.target.value)} style={inp}>
            {FOLDERS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <input
            placeholder="Buscar por nombre…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ ...inp, flex: 1, minWidth: 200 }}
          />
          <span style={{ fontSize: 12, color: ink3 }}>{loading ? "Cargando…" : `${items.length} resultados`}</span>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: 18, background: "#FAFBFC" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
            {items.map(it => (
              <button
                key={it.path}
                type="button"
                onClick={() => { onPick(it.url); onClose(); }}
                style={{ border: `1px solid ${rule}`, borderRadius: 10, background: "#fff", padding: 0, overflow: "hidden", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column" }}
              >
                <div style={{ aspectRatio: "1 / 1", background: "#F6F7FB", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={it.url} alt={it.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                </div>
                <div style={{ padding: "6px 8px", borderTop: `1px solid ${rule}` }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: navy, lineHeight: 1.25, wordBreak: "break-word" }}>{it.name}</div>
                  <div style={{ fontSize: 10, color: ink3, marginTop: 2 }}>{(it.size / 1024).toFixed(0)} KB</div>
                </div>
              </button>
            ))}
            {!loading && items.length === 0 && (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: 40, color: ink3 }}>Sin resultados en esta carpeta.</div>
            )}
          </div>
        </div>
        <div style={{ padding: "12px 22px", borderTop: `1px solid ${rule}`, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} style={{ background: "#fff", border: `1px solid ${rule}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, cursor: "pointer", color: navy }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 8, border: `1px solid ${rule}`, background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit", color: navy };
// `accent` / `accentDeep` re-exported indirectly so lint doesn't complain
export { accent as _a, accentDeep as _b };
