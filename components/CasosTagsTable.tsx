"use client";

import { useMemo, useState } from "react";

export type TagRow = {
  nombre: string;
  slug: string;
  sector: string[];
  productos: string[];
  casos_de_uso: string[];
  prioridad: number;
  pendiente: boolean;
  nota?: string;
};
type Vocab = { sector: string[]; productos: string[]; casosDeUso: string[] };

const chip: React.CSSProperties = { display: "inline-block", fontSize: 11.5, padding: "2px 8px", borderRadius: 999, background: "#EAF6FE", color: "#1E89C7", margin: "2px 3px 0 0", whiteSpace: "nowrap" };
const th: React.CSSProperties = { textAlign: "left", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488", padding: "8px 10px", borderBottom: "1px solid #E1E5EE", cursor: "pointer", userSelect: "none" };
const td: React.CSSProperties = { padding: "10px", borderBottom: "1px solid #EEF1F6", fontSize: 13, verticalAlign: "top" };
const sel: React.CSSProperties = { minWidth: 150, padding: "6px 8px", border: "1px solid #C9CDD4", borderRadius: 6, fontSize: 12.5, background: "#fff", fontFamily: "inherit" };

function MultiSelect({ value, options, onChange }: { value: string[]; options: string[]; onChange: (v: string[]) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button key={o} type="button" onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}
            style={{ fontSize: 11.5, padding: "3px 9px", borderRadius: 999, cursor: "pointer",
              border: on ? "1px solid #31B1F8" : "1px solid #C9CDD4", background: on ? "#31B1F8" : "#fff", color: on ? "#fff" : "#4A4F66" }}>
            {o}
          </button>
        );
      })}
    </div>
  );
}

export default function CasosTagsTable({ rows: initial, vocab }: { rows: TagRow[]; vocab: Vocab }) {
  const [rows, setRows] = useState<TagRow[]>(initial);
  const [fSector, setFSector] = useState("");
  const [fProd, setFProd] = useState("");
  const [fUso, setFUso] = useState("");
  const [q, setQ] = useState("");
  const [sortCol, setSortCol] = useState<"nombre" | "prioridad" | "pendiente">("nombre");
  const [sortAsc, setSortAsc] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<TagRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const view = useMemo(() => {
    let r = rows.filter((x) =>
      (!fSector || x.sector.includes(fSector)) &&
      (!fProd || x.productos.includes(fProd)) &&
      (!fUso || x.casos_de_uso.includes(fUso)) &&
      (!q || x.nombre.toLowerCase().includes(q.toLowerCase()))
    );
    r = [...r].sort((a, b) => {
      let d = 0;
      if (sortCol === "nombre") d = a.nombre.localeCompare(b.nombre);
      else if (sortCol === "prioridad") d = (a.prioridad || 0) - (b.prioridad || 0);
      else d = Number(a.pendiente) - Number(b.pendiente);
      return sortAsc ? d : -d;
    });
    return r;
  }, [rows, fSector, fProd, fUso, q, sortCol, sortAsc]);

  function toggleSort(c: typeof sortCol) { if (c === sortCol) setSortAsc(!sortAsc); else { setSortCol(c); setSortAsc(true); } }
  function startEdit(r: TagRow) { setEditing(r.nombre); setDraft({ ...r, sector: [...r.sector], productos: [...r.productos], casos_de_uso: [...r.casos_de_uso] }); setMsg(""); }

  async function save() {
    if (!draft) return;
    setSaving(true); setMsg("");
    try {
      const res = await fetch("/api/admin/casos-tags/", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: draft.nombre, sector: draft.sector, productos: draft.productos, casosDeUso: draft.casos_de_uso, prioridad: draft.prioridad, pendiente: draft.pendiente }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) { setMsg(data.error || "Error al guardar"); setSaving(false); return; }
      setRows((rs) => rs.map((x) => (x.nombre === draft.nombre ? draft : x)));
      setEditing(null); setDraft(null); setMsg("Guardado ✓");
    } catch { setMsg("Error de red"); }
    setSaving(false);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
        <input placeholder="Buscar caso…" value={q} onChange={(e) => setQ(e.target.value)} style={{ ...sel, minWidth: 180 }} />
        <select value={fSector} onChange={(e) => setFSector(e.target.value)} style={sel}><option value="">Sector (todos)</option>{vocab.sector.map((s) => <option key={s}>{s}</option>)}</select>
        <select value={fProd} onChange={(e) => setFProd(e.target.value)} style={sel}><option value="">Producto (todos)</option>{vocab.productos.map((s) => <option key={s}>{s}</option>)}</select>
        <select value={fUso} onChange={(e) => setFUso(e.target.value)} style={sel}><option value="">Caso de uso (todos)</option>{vocab.casosDeUso.map((s) => <option key={s}>{s}</option>)}</select>
        <span style={{ fontSize: 12.5, color: "#6E7488" }}>{view.length} de {rows.length}</span>
        {msg && <span style={{ fontSize: 12.5, color: msg.includes("✓") ? "#16a34a" : "#DC2626" }}>{msg}</span>}
      </div>
      <div style={{ overflowX: "auto", background: "#fff", border: "1px solid #E1E5EE", borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              <th style={th} onClick={() => toggleSort("nombre")}>Caso {sortCol === "nombre" ? (sortAsc ? "▲" : "▼") : ""}</th>
              <th style={th as React.CSSProperties}>Sector</th>
              <th style={{ ...th, cursor: "default" }}>Producto</th>
              <th style={{ ...th, cursor: "default" }}>Caso de uso</th>
              <th style={th} onClick={() => toggleSort("prioridad")}>Prior. {sortCol === "prioridad" ? (sortAsc ? "▲" : "▼") : ""}</th>
              <th style={th} onClick={() => toggleSort("pendiente")}>Estado {sortCol === "pendiente" ? (sortAsc ? "▲" : "▼") : ""}</th>
              <th style={{ ...th, cursor: "default" }}></th>
            </tr>
          </thead>
          <tbody>
            {view.map((r) => {
              const isEd = editing === r.nombre && draft;
              return (
                <tr key={r.nombre}>
                  <td style={td}>
                    <b>{r.nombre}</b>
                    {r.slug ? <div><a href={`/es/${r.slug}/`} target="_blank" rel="noopener" style={{ fontSize: 11, color: "#1E89C7" }}>ver página ↗</a></div> : <div style={{ fontSize: 11, color: "#94a3b8" }}>sin página</div>}
                  </td>
                  {isEd ? (
                    <>
                      <td style={td}><MultiSelect value={draft!.sector} options={vocab.sector} onChange={(v) => setDraft({ ...draft!, sector: v })} /></td>
                      <td style={td}><MultiSelect value={draft!.productos} options={vocab.productos} onChange={(v) => setDraft({ ...draft!, productos: v })} /></td>
                      <td style={td}><MultiSelect value={draft!.casos_de_uso} options={vocab.casosDeUso} onChange={(v) => setDraft({ ...draft!, casos_de_uso: v })} /></td>
                      <td style={td}><input type="number" min={0} max={5} value={draft!.prioridad} onChange={(e) => setDraft({ ...draft!, prioridad: Number(e.target.value) })} style={{ ...sel, minWidth: 56, width: 56 }} /></td>
                      <td style={td}><label style={{ fontSize: 12 }}><input type="checkbox" checked={draft!.pendiente} onChange={(e) => setDraft({ ...draft!, pendiente: e.target.checked })} /> pend.</label></td>
                      <td style={td}>
                        <button onClick={save} disabled={saving} style={{ fontSize: 12, padding: "6px 12px", background: "#31B1F8", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", marginRight: 6 }}>{saving ? "…" : "Guardar"}</button>
                        <button onClick={() => { setEditing(null); setDraft(null); }} style={{ fontSize: 12, padding: "6px 10px", background: "#fff", border: "1px solid #C9CDD4", borderRadius: 6, cursor: "pointer" }}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={td}>{r.sector.map((s) => <span key={s} style={chip}>{s}</span>)}</td>
                      <td style={td}>{r.productos.map((s) => <span key={s} style={{ ...chip, background: "#F0ECFB", color: "#7c3aed" }}>{s}</span>)}</td>
                      <td style={td}>{r.casos_de_uso.map((s) => <span key={s} style={chip}>{s}</span>)}</td>
                      <td style={td}>{r.prioridad || 0}</td>
                      <td style={td}>{r.pendiente ? <span style={{ ...chip, background: "#FFF3D6", color: "#b45309" }}>pendiente</span> : <span style={{ ...chip, background: "#E3F2E9", color: "#16a34a" }}>OK</span>}</td>
                      <td style={td}><button onClick={() => startEdit(r)} style={{ fontSize: 12, padding: "6px 12px", background: "#fff", border: "1px solid #C9CDD4", borderRadius: 6, cursor: "pointer" }}>Editar</button></td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
