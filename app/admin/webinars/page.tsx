import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseAdminClient, getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import RegistrationsTable, { RegRow } from "@/components/RegistrationsTable";

export const dynamic = "force-dynamic";

interface WebinarReg {
  id: number;
  created_at: string;
  nombre: string;
  empresa: string;
  email: string;
  cargo: string | null;
  sector: string | null;
  webinar_name: string;
  webinar_date: string | null;
}

async function fetchWebinars(params: { search?: string; webinar_name?: string; days?: string; sort?: string; page?: string }) {
  const supabase = createSupabaseAdminClient();
  const page = Math.max(1, parseInt(params.page || "1"));
  const perPage = 25;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const sort = params.sort || "created_desc";
  const [col, dir] = sort === "name_asc" ? ["webinar_name", true] :
                     sort === "name_desc" ? ["webinar_name", false] :
                     sort === "date_asc" ? ["webinar_date", true] :
                     sort === "date_desc" ? ["webinar_date", false] :
                     ["created_at", false];

  let q = supabase.from("webinar_registrations").select("*", { count: "exact" }).order(col as string, { ascending: dir as boolean }).range(from, to);

  if (params.search) {
    const s = params.search.replace(/[^a-zA-Z0-9@._+\- ]/g, "").slice(0, 80);
    if (s) q = q.or(`nombre.ilike.%${s}%,empresa.ilike.%${s}%,email.ilike.%${s}%`);
  }
  if (params.webinar_name && params.webinar_name !== "all") q = q.eq("webinar_name", params.webinar_name);
  if (params.days) {
    const days = parseInt(params.days);
    if (days > 0) q = q.gte("created_at", new Date(Date.now() - days * 86400000).toISOString());
  }

  const { data, count } = await q;
  return {
    rows: (data || []) as WebinarReg[],
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
    supabase.from("webinar_registrations").select("id", { count: "exact", head: true }),
    supabase.from("webinar_registrations").select("id", { count: "exact", head: true }).gte("created_at", day),
    supabase.from("webinar_registrations").select("id", { count: "exact", head: true }).gte("created_at", week),
  ]);
  return { total: total || 0, last24h: last24h || 0, last7d: last7d || 0 };
}

async function fetchWebinarNames() {
  const supabase = createSupabaseAdminClient();
  const { data } = await supabase.from("webinar_registrations").select("webinar_name").limit(500);
  const set = new Set<string>();
  for (const r of (data || []) as { webinar_name: string | null }[]) if (r.webinar_name) set.add(r.webinar_name);
  return [...set].sort();
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" };

export default async function WebinarsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/webinars/")}`);

  const [{ rows, total, page, totalPages }, stats, webinarNames] = await Promise.all([
    fetchWebinars(sp), fetchStats(), fetchWebinarNames(),
  ]);

  const tableRows: RegRow[] = rows.map((r) => ({
    id: r.id, created_at: r.created_at, nombre: r.nombre, empresa: r.empresa, email: r.email,
    cargo: r.cargo, sector: r.sector, topic_name: r.webinar_name, topic_date: r.webinar_date,
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="webinars" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Inscripciones a webinars</h1>
          <a href={`/api/admin/webinars/export?${new URLSearchParams(sp as Record<string, string>).toString()}`} style={{ fontSize: 12, padding: "8px 14px", border: "1px solid rgba(15,23,42,0.16)", background: "#fff", color: "#15163A", borderRadius: 6, textDecoration: "none", fontWeight: 600 }}>⬇ Exportar todo (CSV)</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
          {[{ l: "Total", v: stats.total }, { l: "Últimas 24 h", v: stats.last24h }, { l: "Última semana", v: stats.last7d }].map((s) => (
            <div key={s.l} style={card}>
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488" }}>{s.l}</div>
              <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.03em", lineHeight: 1, marginTop: 8 }}>{s.v}</div>
            </div>
          ))}
        </div>

        <form style={{ ...card, marginBottom: 20, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <input name="search" defaultValue={sp.search || ""} placeholder="Buscar por nombre, email o empresa…" style={{ ...inp, flex: 1, minWidth: 240 }} />
          <select name="webinar_name" defaultValue={sp.webinar_name || "all"} style={inp}>
            <option value="all">Cualquier webinar</option>
            {webinarNames.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
          <select name="sort" defaultValue={sp.sort || "created_desc"} style={inp}>
            <option value="created_desc">Más recientes</option>
            <option value="name_asc">Webinar A → Z</option>
            <option value="name_desc">Webinar Z → A</option>
            <option value="date_desc">Fecha webinar ↓</option>
            <option value="date_asc">Fecha webinar ↑</option>
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
          <RegistrationsTable rows={tableRows} apiPath="/api/admin/webinars/" detailBase="/admin/webinars" topicLabel="Webinar" />
          {totalPages > 1 && (
            <div style={{ background: "#F6F7FB", borderTop: "1px solid rgba(15,23,42,0.08)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "#6E7488" }}>Mostrando {(page - 1) * 25 + 1}–{Math.min(page * 25, total)} de {total}</div>
              <div style={{ display: "flex", gap: 4 }}>
                {page > 1 && (<Link href={`/admin/webinars/?${new URLSearchParams({ ...sp, page: String(page - 1) }).toString()}`} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 12, textDecoration: "none", color: "#15163A" }}>← Anterior</Link>)}
                <span style={{ padding: "6px 12px", fontSize: 12, color: "#6E7488" }}>Página {page} de {totalPages}</span>
                {page < totalPages && (<Link href={`/admin/webinars/?${new URLSearchParams({ ...sp, page: String(page + 1) }).toString()}`} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 12, textDecoration: "none", color: "#15163A" }}>Siguiente →</Link>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
