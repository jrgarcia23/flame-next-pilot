import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseAdminClient, getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";

export const dynamic = "force-dynamic";

interface Descarga {
  id: number;
  created_at: string;
  nombre: string;
  email: string;
  pagina: string | null;   // "Ficha: <solución>"
  page_url: string | null; // página desde la que se descargó
  ga_client_id: string | null;
}

const solucionOf = (pagina: string | null) => (pagina || "").replace(/^Ficha:\s*/i, "").trim() || "—";

async function fetchDescargas(params: { search?: string; days?: string; page?: string }) {
  const supabase = createSupabaseAdminClient();
  const page = Math.max(1, parseInt(params.page || "1"));
  const perPage = 25;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  let q = supabase.from("leads").select("*", { count: "exact" }).eq("source", "ficha").order("created_at", { ascending: false }).range(from, to);
  if (params.search) {
    const s = params.search.replace(/[^a-zA-Z0-9@._+\- ]/g, "").slice(0, 80);
    if (s) q = q.or(`nombre.ilike.%${s}%,email.ilike.%${s}%`);
  }
  if (params.days) {
    const days = parseInt(params.days);
    if (days > 0) q = q.gte("created_at", new Date(Date.now() - days * 86400000).toISOString());
  }
  const { data, count } = await q;
  return { rows: (data || []) as Descarga[], total: count || 0, page, totalPages: Math.max(1, Math.ceil((count || 0) / perPage)) };
}

async function fetchStats() {
  const supabase = createSupabaseAdminClient();
  const day = new Date(Date.now() - 86400000).toISOString();
  const week = new Date(Date.now() - 7 * 86400000).toISOString();
  const base = () => supabase.from("leads").select("id", { count: "exact", head: true }).eq("source", "ficha");
  const [{ count: total }, { count: last24h }, { count: last7d }] = await Promise.all([
    base(), base().gte("created_at", day), base().gte("created_at", week),
  ]);
  return { total: total || 0, last24h: last24h || 0, last7d: last7d || 0 };
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" };
const th: React.CSSProperties = { textAlign: "left", padding: "11px 16px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488", borderBottom: "1px solid rgba(15,23,42,0.08)" };
const td: React.CSSProperties = { padding: "12px 16px", fontSize: 13.5, color: "#15163A", borderBottom: "1px solid rgba(15,23,42,0.05)", verticalAlign: "top" };

export default async function DescargasPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/descargas/")}`);

  const [{ rows, total, page, totalPages }, stats] = await Promise.all([fetchDescargas(sp), fetchStats()]);
  const fmt = (iso: string) => { try { return new Date(iso).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" }); } catch { return iso; } };

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="descargas" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Descargas PDF</h1>
          <p style={{ fontSize: 12, color: "#6E7488", margin: 0 }}>Descargas de ficha de solución (no son leads)</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { l: "Total descargas", v: stats.total },
            { l: "Últimas 24 h", v: stats.last24h },
            { l: "Última semana", v: stats.last7d },
          ].map((s) => (
            <div key={s.l} style={card}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488" }}>{s.l}</div>
              <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, marginTop: 8 }}>{s.v}</div>
            </div>
          ))}
        </div>

        <form style={{ ...card, marginBottom: 20, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <input name="search" defaultValue={sp.search || ""} placeholder="Buscar por nombre o email…" style={{ ...inp, flex: 1, minWidth: 240 }} />
          <select name="days" defaultValue={sp.days || "30"} style={inp}>
            <option value="1">Últimas 24 h</option>
            <option value="7">Últimos 7 días</option>
            <option value="30">Últimos 30 días</option>
            <option value="90">Últimos 90 días</option>
            <option value="0">Todos</option>
          </select>
          <button type="submit" style={{ padding: "8px 16px", borderRadius: 6, background: "#15163A", color: "#fff", fontSize: 12, fontWeight: 600, border: 0, cursor: "pointer" }}>Aplicar</button>
        </form>

        <div style={{ background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
              <thead>
                <tr>
                  <th style={th}>Fecha</th>
                  <th style={th}>Nombre</th>
                  <th style={th}>Email</th>
                  <th style={th}>Solución</th>
                  <th style={th}>Página de origen</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr><td style={{ ...td, textAlign: "center", color: "#6E7488", padding: "40px 16px" }} colSpan={5}>Aún no hay descargas.</td></tr>
                )}
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td style={{ ...td, whiteSpace: "nowrap", color: "#6E7488" }}>{fmt(r.created_at)}</td>
                    <td style={{ ...td, fontWeight: 600 }}>{r.nombre || "—"}</td>
                    <td style={td}><a href={`mailto:${r.email}`} style={{ color: "#1E89C7", textDecoration: "none" }}>{r.email}</a></td>
                    <td style={td}>{solucionOf(r.pagina)}</td>
                    <td style={td}>{r.page_url ? <a href={r.page_url} target="_blank" rel="noopener" style={{ color: "#1E89C7", textDecoration: "none", fontSize: 12.5, wordBreak: "break-all" }}>{r.page_url}</a> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div style={{ background: "#F6F7FB", borderTop: "1px solid rgba(15,23,42,0.08)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "#6E7488" }}>Mostrando {(page - 1) * 25 + 1}–{Math.min(page * 25, total)} de {total} descargas</div>
              <div style={{ display: "flex", gap: 4 }}>
                {page > 1 && (<Link href={`/admin/descargas/?${new URLSearchParams({ ...sp, page: String(page - 1) }).toString()}`} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 12, textDecoration: "none", color: "#15163A" }}>← Anterior</Link>)}
                <span style={{ padding: "6px 12px", fontSize: 12, color: "#6E7488" }}>Página {page} de {totalPages}</span>
                {page < totalPages && (<Link href={`/admin/descargas/?${new URLSearchParams({ ...sp, page: String(page + 1) }).toString()}`} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 12, textDecoration: "none", color: "#15163A" }}>Siguiente →</Link>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
