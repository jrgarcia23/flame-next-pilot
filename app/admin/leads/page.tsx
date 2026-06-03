import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseAdminClient, getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import LeadsTable, { LeadRow } from "@/components/LeadsTable";

export const dynamic = "force-dynamic";

interface Lead {
  id: number;
  created_at: string;
  nombre: string;
  empresa: string;
  email: string;
  sector: string | null;
  pagina: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  ga_client_id: string | null;
}

async function fetchLeads(params: { search?: string; pagina?: string; source?: string; medium?: string; days?: string; page?: string }) {
  const supabase = createSupabaseAdminClient();
  const page = Math.max(1, parseInt(params.page || "1"));
  const perPage = 25;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let q = supabase.from("leads").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(from, to);

  if (params.search) {
    const s = params.search.replace(/[^a-zA-Z0-9@._+\- ]/g, "").slice(0, 80);
    if (s) q = q.or(`nombre.ilike.%${s}%,empresa.ilike.%${s}%,email.ilike.%${s}%`);
  }
  if (params.pagina && params.pagina !== "all") q = q.eq("pagina", params.pagina);
  if (params.source && params.source !== "all") q = q.eq("source", params.source);
  if (params.medium && params.medium !== "all") q = q.eq("medium", params.medium);
  if (params.days) {
    const days = parseInt(params.days);
    if (days > 0) q = q.gte("created_at", new Date(Date.now() - days * 86400000).toISOString());
  }

  const { data, count } = await q;
  return {
    leads: (data || []) as Lead[],
    total: count || 0,
    page,
    totalPages: Math.max(1, Math.ceil((count || 0) / perPage)),
  };
}

async function fetchStats() {
  const supabase = createSupabaseAdminClient();
  const day = new Date(Date.now() - 86400000).toISOString();
  const week = new Date(Date.now() - 7 * 86400000).toISOString();
  const [{ count: total }, { count: last24h }, { count: last7d }] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", day),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", week),
  ]);
  return { total: total || 0, last24h: last24h || 0, last7d: last7d || 0 };
}

async function fetchFilterOptions() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("leads").select("pagina,source,medium").limit(500);
  const setOf = (k: keyof NonNullable<typeof data>[number]) => {
    const s = new Set<string>();
    for (const r of data || []) {
      const v = (r as Record<string, string | null>)[k];
      if (v) s.add(v);
    }
    return [...s].sort();
  };
  return { paginas: setOf("pagina"), sources: setOf("source"), mediums: setOf("medium") };
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" };

export default async function LeadsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/leads/")}`);

  const [{ leads, total, page, totalPages }, stats, filters] = await Promise.all([
    fetchLeads(sp), fetchStats(), fetchFilterOptions(),
  ]);

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="leads" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Leads</h1>
          <p style={{ fontSize: 12, color: "#6E7488", margin: 0 }}>Capturas del formulario público de Flame</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[
            { l: "Total leads", v: stats.total },
            { l: "Últimas 24 h", v: stats.last24h },
            { l: "Última semana", v: stats.last7d },
          ].map((s) => (
            <div key={s.l} style={card}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488" }}>{s.l}</div>
              <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, marginTop: 8 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <form style={{ ...card, marginBottom: 20, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <input name="search" defaultValue={sp.search || ""} placeholder="Buscar por nombre, email o empresa…" style={{ ...inp, flex: 1, minWidth: 240 }} />
          <select name="pagina" defaultValue={sp.pagina || "all"} style={inp}>
            <option value="all">Cualquier página</option>
            {filters.paginas.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <select name="source" defaultValue={sp.source || "all"} style={inp}>
            <option value="all">Cualquier fuente</option>
            {filters.sources.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="medium" defaultValue={sp.medium || "all"} style={inp}>
            <option value="all">Cualquier medio</option>
            {filters.mediums.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
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
          <LeadsTable leads={leads as LeadRow[]} />
          {totalPages > 1 && (
            <div style={{ background: "#F6F7FB", borderTop: "1px solid rgba(15,23,42,0.08)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "#6E7488" }}>Mostrando {(page - 1) * 25 + 1}–{Math.min(page * 25, total)} de {total} leads</div>
              <div style={{ display: "flex", gap: 4 }}>
                {page > 1 && (<Link href={`/admin/leads/?${new URLSearchParams({ ...sp, page: String(page - 1) }).toString()}`} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 12, textDecoration: "none", color: "#15163A" }}>← Anterior</Link>)}
                <span style={{ padding: "6px 12px", fontSize: 12, color: "#6E7488" }}>Página {page} de {totalPages}</span>
                {page < totalPages && (<Link href={`/admin/leads/?${new URLSearchParams({ ...sp, page: String(page + 1) }).toString()}`} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 12, textDecoration: "none", color: "#15163A" }}>Siguiente →</Link>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
