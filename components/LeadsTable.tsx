"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, ChangeEvent } from "react";

export interface LeadRow {
  id: number;
  created_at: string;
  nombre: string;
  empresa: string;
  email: string;
  pagina: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  ga_client_id: string | null;
}

function formatRel(date: string): string {
  const d = new Date(date);
  const diffMs = Date.now() - d.getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "ahora mismo";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const days = Math.floor(h / 24);
  if (days < 7) return `hace ${days} día${days === 1 ? "" : "s"}`;
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "2-digit" });
}

const th: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488" };
const td: React.CSSProperties = { padding: "12px 16px", borderBottom: "1px solid rgba(15,23,42,0.04)", fontSize: 13 };

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const allSelected = leads.length > 0 && selected.size === leads.length;
  const anySelected = selected.size > 0;

  function toggleAll(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setSelected(new Set(leads.map((l) => l.id)));
    else setSelected(new Set());
  }
  function toggleOne(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  async function handleDelete() {
    if (!anySelected) return;
    const ids = [...selected];
    const confirmed = window.confirm(ids.length === 1 ? "¿Eliminar este lead? No se puede deshacer." : `¿Eliminar ${ids.length} leads? No se puede deshacer.`);
    if (!confirmed) return;
    setError("");
    try {
      const res = await fetch("/api/admin/leads/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.error || "Error al borrar.");
        return;
      }
      setSelected(new Set());
      startTransition(() => router.refresh());
    } catch {
      setError("Error de red al borrar.");
    }
  }

  if (leads.length === 0) {
    return <div style={{ padding: 48, textAlign: "center", color: "#6E7488", fontSize: 14 }}>No hay leads que coincidan con los filtros.</div>;
  }

  return (
    <>
      {anySelected && (
        <div style={{ background: "rgba(49,177,248,0.06)", borderBottom: "1px solid rgba(49,177,248,0.2)", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
          <span style={{ color: "#15163A", fontWeight: 500 }}>{selected.size} seleccionado{selected.size === 1 ? "" : "s"}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => setSelected(new Set())} style={{ padding: "6px 12px", fontSize: 12, color: "#6E7488", background: "transparent", border: 0, cursor: "pointer" }}>Cancelar</button>
            <button type="button" onClick={handleDelete} disabled={isPending} style={{ padding: "6px 12px", borderRadius: 6, background: "#DC2626", color: "#fff", fontSize: 12, fontWeight: 600, border: 0, cursor: isPending ? "not-allowed" : "pointer", opacity: isPending ? 0.6 : 1 }}>{isPending ? "Eliminando…" : `Eliminar ${selected.size}`}</button>
          </div>
        </div>
      )}
      {error && (<div style={{ background: "#FEF2F2", borderBottom: "1px solid #FECACA", padding: "8px 16px", fontSize: 12, color: "#B91C1C" }}>{error}</div>)}

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ background: "#F6F7FB", borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
            <th style={{ ...th, width: 36, padding: "12px 12px" }}>
              <input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Seleccionar todos" style={{ width: 14, height: 14, accentColor: "#31B1F8", cursor: "pointer" }} />
            </th>
            <th style={th}>Fecha</th>
            <th style={th}>Lead</th>
            <th style={th}>Empresa</th>
            <th style={th}>Página</th>
            <th style={th}>Fuente · Medio</th>
            <th style={th}>Campaña</th>
            <th style={{ ...th, textAlign: "center" }}>Tracking</th>
            <th style={th}></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => {
            const checked = selected.has(l.id);
            return (
              <tr key={l.id} style={{ background: checked ? "rgba(49,177,248,0.03)" : "transparent" }} className="lead-row">
                <td style={{ ...td, width: 36, padding: "12px 12px" }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleOne(l.id)} aria-label={`Seleccionar lead ${l.id}`} style={{ width: 14, height: 14, accentColor: "#31B1F8", cursor: "pointer" }} />
                </td>
                <td style={{ ...td, fontSize: 12, color: "#6E7488", whiteSpace: "nowrap" }}>{formatRel(l.created_at)}</td>
                <td style={td}>
                  <div style={{ fontWeight: 600, color: "#15163A", lineHeight: 1.25 }}>{l.nombre}</div>
                  <div style={{ fontSize: 11, color: "#6E7488", marginTop: 2 }}>{l.email}</div>
                </td>
                <td style={{ ...td, color: "#4A4F66" }}>{l.empresa}</td>
                <td style={td}><span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "rgba(49,177,248,0.08)", color: "#1E89C7" }}>{l.pagina || "—"}</span></td>
                <td style={{ ...td, fontSize: 12 }}>
                  <div style={{ color: "#15163A", fontWeight: 500 }}>{l.source || "—"}</div>
                  <div style={{ fontSize: 11, color: "#6E7488" }}>{l.medium || "—"}</div>
                </td>
                <td style={{ ...td, fontSize: 12, color: "#4A4F66" }}>{l.campaign && l.campaign !== "(not set)" ? l.campaign : <span style={{ color: "#6E7488" }}>—</span>}</td>
                <td style={{ ...td, textAlign: "center" }}>
                  <div style={{ display: "inline-flex", gap: 4 }}>
                    {l.gclid && <span title="GCLID Google Ads" style={{ width: 18, height: 18, borderRadius: 4, fontSize: 10, fontWeight: 700, background: "rgba(254,80,0,0.12)", color: "#FE5000", display: "flex", alignItems: "center", justifyContent: "center" }}>G</span>}
                    {l.fbclid && <span title="FBCLID Meta" style={{ width: 18, height: 18, borderRadius: 4, fontSize: 10, fontWeight: 700, background: "rgba(16,185,129,0.12)", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>F</span>}
                    {l.ga_client_id && <span title="GA4 Client ID" style={{ width: 18, height: 18, borderRadius: 4, fontSize: 10, fontWeight: 700, background: "rgba(49,177,248,0.12)", color: "#1E89C7", display: "flex", alignItems: "center", justifyContent: "center" }}>A</span>}
                  </div>
                </td>
                <td style={{ ...td, textAlign: "right" }}>
                  <Link href={`/admin/leads/${l.id}/`} style={{ fontSize: 12, fontWeight: 600, color: "#1E89C7", textDecoration: "none", padding: "4px 10px", borderRadius: 6 }}>Ver →</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style dangerouslySetInnerHTML={{ __html: `.lead-row:hover { background: rgba(15,23,42,0.02) !important; }` }} />
    </>
  );
}
