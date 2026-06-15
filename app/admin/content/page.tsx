import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import { adminGetAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

const PER_PAGE = 50;

type Filter = {
  lang?: string;       // es | en | all
  status?: string;     // published | draft | all
  category?: string;   // any slug | all
  search?: string;
  page?: string;
};

function normalizeStatus(s?: string): "published" | "draft" {
  if (s === "draft" || s === "pending" || s === "private") return "draft";
  return "published";
}

function summarize(html: string, n = 140): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" };
const btn: React.CSSProperties = { padding: "6px 12px", borderRadius: 6, fontSize: 12, border: "1px solid rgba(15,23,42,0.16)", background: "#fff", cursor: "pointer", color: "#15163A", textDecoration: "none", display: "inline-block" };

export default async function ContentAdminPage({ searchParams }: { searchParams: Promise<Filter> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/content/")}`);

  const all = adminGetAllPosts();

  // ---- Cómputo de filtros disponibles ----
  const catSet = new Map<string, { name: string; count: number }>();
  for (const p of all) {
    const slug = p.category?.slug || "blog";
    const name = p.category?.name || "Blog";
    const cur = catSet.get(slug) || { name, count: 0 };
    cur.count++;
    catSet.set(slug, cur);
  }
  const categories = [...catSet.entries()].map(([s, v]) => ({ slug: s, name: v.name, count: v.count })).sort((a, b) => b.count - a.count);

  // ---- Aplicar filtros ----
  const lang = sp.lang || "all";
  const status = sp.status || "all";
  const category = sp.category || "all";
  const search = (sp.search || "").trim().toLowerCase();
  const page = Math.max(1, parseInt(sp.page || "1"));

  let filtered = all;
  if (lang !== "all") filtered = filtered.filter(p => p.lang === lang);
  if (status !== "all") filtered = filtered.filter(p => normalizeStatus((p as { status?: string }).status) === status);
  if (category !== "all") filtered = filtered.filter(p => (p.category?.slug || "blog") === category);
  if (search) filtered = filtered.filter(p =>
    p.slug.toLowerCase().includes(search) ||
    (p.title || "").toLowerCase().includes(search)
  );

  filtered = filtered.slice().sort((a, b) => (b.date > a.date ? 1 : a.date > b.date ? -1 : 0));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const from = (page - 1) * PER_PAGE;
  const rows = filtered.slice(from, from + PER_PAGE);

  // ---- Stats globales (sobre TODO, no sobre filtrado) ----
  const stats = {
    total: all.length,
    es_pub: all.filter(p => p.lang === "es" && normalizeStatus((p as { status?: string }).status) === "published").length,
    es_draft: all.filter(p => p.lang === "es" && normalizeStatus((p as { status?: string }).status) === "draft").length,
    en_pub: all.filter(p => p.lang === "en" && normalizeStatus((p as { status?: string }).status) === "published").length,
    en_draft: all.filter(p => p.lang === "en" && normalizeStatus((p as { status?: string }).status) === "draft").length,
  };

  function mkHref(overrides: Partial<Filter>): string {
    const next = { ...sp, ...overrides };
    if (!overrides.page) delete next.page;
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) qs.set(k, String(v));
    const s = qs.toString();
    return s ? `/admin/content/?${s}` : "/admin/content/";
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="content" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Contenido · Blog &amp; Casos</h1>
          <span style={{ fontSize: 12, color: "#6E7488" }}>{stats.total.toLocaleString()} items totales</span>
        </div>

        {/* Stats por idioma + estado */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          <Stat label="ES publicados" value={stats.es_pub} href={mkHref({ lang: "es", status: "published", page: "" })} color="#10b981" />
          <Stat label="ES drafts" value={stats.es_draft} href={mkHref({ lang: "es", status: "draft", page: "" })} color="#f59e0b" />
          <Stat label="EN publicados" value={stats.en_pub} href={mkHref({ lang: "en", status: "published", page: "" })} color="#10b981" />
          <Stat label="EN drafts" value={stats.en_draft} href={mkHref({ lang: "en", status: "draft", page: "" })} color="#f59e0b" />
        </div>

        {/* Filtros */}
        <form method="get" style={{ ...card, marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input name="search" placeholder="Buscar slug o título…" defaultValue={sp.search || ""} style={{ ...inp, flex: 1, minWidth: 220 }} />
          <select name="lang" defaultValue={lang} style={inp}>
            <option value="all">Todos los idiomas</option>
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
          <select name="status" defaultValue={status} style={inp}>
            <option value="all">Todos los estados</option>
            <option value="published">Publicados</option>
            <option value="draft">Drafts</option>
          </select>
          <select name="category" defaultValue={category} style={inp}>
            <option value="all">Todas las categorías</option>
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name} ({c.count})</option>
            ))}
          </select>
          <button type="submit" style={{ ...btn, background: "#15163A", color: "#fff", border: "none", fontWeight: 600 }}>Filtrar</button>
          {(lang !== "all" || status !== "all" || category !== "all" || search) && (
            <Link href="/admin/content/" style={{ ...btn, fontSize: 12 }}>Limpiar</Link>
          )}
        </form>

        {/* Resultados */}
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(15,23,42,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "#6E7488" }}>
              Mostrando <strong style={{ color: "#15163A" }}>{rows.length}</strong> de <strong style={{ color: "#15163A" }}>{total.toLocaleString()}</strong> resultados
              {page > 1 || totalPages > 1 ? <> · página {page}/{totalPages}</> : null}
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              {page > 1 && <Link href={mkHref({ page: String(page - 1) })} style={btn}>← Anterior</Link>}
              {page < totalPages && <Link href={mkHref({ page: String(page + 1) })} style={btn}>Siguiente →</Link>}
            </div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#FAFBFC" }}>
                <th style={th}>Estado</th>
                <th style={th}>Lang</th>
                <th style={th}>Título</th>
                <th style={th}>Categoría</th>
                <th style={th}>Fecha</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const st = normalizeStatus((p as { status?: string }).status);
                const stColor = st === "published" ? "#10b981" : "#f59e0b";
                return (
                  <tr key={`${p.type}/${p.lang}/${p.slug}`} style={{ borderTop: "1px solid rgba(15,23,42,0.04)" }}>
                    <td style={td}>
                      <span style={{ fontSize: 11, padding: "2px 8px", background: `${stColor}22`, color: stColor, borderRadius: 999, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{st}</span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 11, padding: "2px 6px", background: "#F6F7FB", borderRadius: 4, fontWeight: 600 }}>{p.lang.toUpperCase()}</span>
                    </td>
                    <td style={{ ...td, maxWidth: 460 }}>
                      <div style={{ fontWeight: 600, color: "#15163A", marginBottom: 2, lineHeight: 1.3 }} dangerouslySetInnerHTML={{ __html: p.title || "(sin título)" }} />
                      <div style={{ fontSize: 11, color: "#6E7488" }}>/{p.lang}/{p.slug}</div>
                      {p.excerpt && <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>{summarize(p.excerpt, 100)}</div>}
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 11, color: "#6E7488" }}>{p.category?.name || "—"}</span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 11, color: "#6E7488" }}>{p.date?.slice(0, 10) || "—"}</span>
                    </td>
                    <td style={{ ...td, whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {st === "published" && (
                          <a href={`/${p.lang}/${p.slug}/`} target="_blank" rel="noreferrer" style={{ ...btn, fontSize: 11 }}>Ver</a>
                        )}
                        <form action="/api/admin/content/toggle-status" method="post" style={{ margin: 0 }}>
                          <input type="hidden" name="id" value={p.id} />
                          <input type="hidden" name="lang" value={p.lang} />
                          <input type="hidden" name="slug" value={p.slug} />
                          <input type="hidden" name="next_status" value={st === "published" ? "draft" : "published"} />
                          <input type="hidden" name="back" value={mkHref({ page: String(page) })} />
                          <button type="submit" style={{ ...btn, fontSize: 11, background: st === "published" ? "#fff" : "#10b981", color: st === "published" ? "#15163A" : "#fff", border: st === "published" ? "1px solid rgba(15,23,42,0.16)" : "none", fontWeight: st === "published" ? 400 : 600 }}>
                            {st === "published" ? "Despublicar" : "Publicar"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={6} style={{ ...td, textAlign: "center", padding: "40px 20px", color: "#94A3B8" }}>Sin resultados</td></tr>
              )}
            </tbody>
          </table>
          <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(15,23,42,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#6E7488" }}>Página {page} de {totalPages}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {page > 1 && <Link href={mkHref({ page: "1" })} style={btn}>« Primera</Link>}
              {page > 1 && <Link href={mkHref({ page: String(page - 1) })} style={btn}>← Anterior</Link>}
              {page < totalPages && <Link href={mkHref({ page: String(page + 1) })} style={btn}>Siguiente →</Link>}
              {page < totalPages && <Link href={mkHref({ page: String(totalPages) })} style={btn}>Última »</Link>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, href, color }: { label: string; value: number; href: string; color: string }) {
  return (
    <Link href={href} style={{ ...card, textDecoration: "none", color: "inherit", display: "block", borderLeft: `4px solid ${color}` }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: "#15163A" }}>{value.toLocaleString()}</div>
      <div style={{ fontSize: 11, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{label}</div>
    </Link>
  );
}

const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.06em" };
const td: React.CSSProperties = { padding: "10px 14px", verticalAlign: "top" };
