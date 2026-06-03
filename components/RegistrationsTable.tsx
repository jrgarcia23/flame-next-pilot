"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition, ChangeEvent } from "react";

export interface RegRow {
  id: number;
  created_at: string;
  nombre: string;
  empresa: string;
  email: string;
  cargo: string | null;
  sector: string | null;
  topic_name: string;          // event_name o webinar_name
  topic_date: string | null;   // event_date o webinar_date
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

function formatDate(date: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}

const th: React.CSSProperties = { padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488" };
const td: React.CSSProperties = { padding: "12px 16px", borderBottom: "1px solid rgba(15,23,42,0.04)", fontSize: 13 };

export default function RegistrationsTable({
  rows,
  apiPath,
  detailBase,
  topicLabel,
}: {
  rows: RegRow[];
  apiPath: string;        // "/api/admin/events" o "/api/admin/webinars"
  detailBase: string;     // "/admin/events" o "/admin/webinars"
  topicLabel: string;     // "Evento" o "Webinar"
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const anySelected = selected.size > 0;

  function toggleAll(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setSelected(new Set(rows.map((r) => r.id)));
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
    const confirmed = window.confirm(ids.length === 1 ? `¿Eliminar este registro? No se puede deshacer.` : `¿Eliminar ${ids.length} registros? No se puede deshacer.`);
    if (!confirmed) return;
    setError("");
    try {
      const res = await fetch(apiPath, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
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

  function downloadSelectedCsv() {
    const ids = anySelected ? [...selected] : rows.map((r) => r.id);
    const qs = new URLSearchParams({ ids: ids.join(",") });
    window.open(`${apiPath}/export?${qs.toString()}`, "_blank");
  }

  if (rows.length === 0) {
    return <div style={{ padding: 48, textAlign: "center", color: "#6E7488", fontSize: 14 }}>No hay {topicLabel.toLowerCase()}s que coincidan con los filtros.</div>;
  }

  return (
    <>
      {anySelected && (
        <div style={{ background: "rgba(49,177,248,0.06)", borderBottom: "1px solid rgba(49,177,248,0.2)", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
          <span style={{ color: "#15163A", fontWeight: 500 }}>{selected.size} seleccionado{selected.size === 1 ? "" : "s"}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" onClick={() => setSelected(new Set())} style={{ padding: "6px 12px", fontSize: 12, color: "#6E7488", background: "transparent", border: 0, cursor: "pointer" }}>Cancelar</button>
            <button type="button" onClick={downloadSelectedCsv} style={{ padding: "6px 12px", borderRadius: 6, background: "#fff", color: "#15163A", border: "1px solid rgba(15,23,42,0.16)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>⬇ Descargar CSV</button>
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
            <th style={th}>Inscrito</th>
            <th style={th}>Empresa</th>
            <th style={th}>Cargo</th>
            <th style={th}>{topicLabel}</th>
            <th style={th}>Fecha {topicLabel.toLowerCase()}</th>
            <th style={th}>Hace</th>
            <th style={th}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const checked = selected.has(r.id);
            return (
              <tr key={r.id} style={{ background: checked ? "rgba(49,177,248,0.03)" : "transparent" }} className="reg-row">
                <td style={{ ...td, width: 36, padding: "12px 12px" }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleOne(r.id)} aria-label={`Seleccionar #${r.id}`} style={{ width: 14, height: 14, accentColor: "#31B1F8", cursor: "pointer" }} />
                </td>
                <td style={td}>
                  <div style={{ fontWeight: 600, color: "#15163A", lineHeight: 1.25 }}>{r.nombre}</div>
                  <div style={{ fontSize: 11, color: "#6E7488", marginTop: 2 }}>{r.email}</div>
                </td>
                <td style={{ ...td, color: "#4A4F66" }}>{r.empresa}</td>
                <td style={{ ...td, color: "#4A4F66" }}>{r.cargo || "—"}</td>
                <td style={td}>
                  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: "rgba(49,177,248,0.08)", color: "#1E89C7" }}>{r.topic_name}</span>
                </td>
                <td style={{ ...td, fontSize: 12, color: "#4A4F66" }}>{formatDate(r.topic_date)}</td>
                <td style={{ ...td, fontSize: 12, color: "#6E7488", whiteSpace: "nowrap" }}>{formatRel(r.created_at)}</td>
                <td style={{ ...td, textAlign: "right" }}>
                  <Link href={`${detailBase}/${r.id}/`} style={{ fontSize: 12, fontWeight: 600, color: "#1E89C7", textDecoration: "none", padding: "4px 10px", borderRadius: 6 }}>Ver →</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <style dangerouslySetInnerHTML={{ __html: `.reg-row:hover { background: rgba(15,23,42,0.02) !important; }` }} />
    </>
  );
}
