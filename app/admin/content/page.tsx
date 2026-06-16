import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import { adminGetAllPosts, type BlogPost } from "@/lib/blog";
import { listAllCmsPosts, type CmsPost } from "@/lib/cms-posts";

export const dynamic = "force-dynamic";

const PER_PAGE = 50;

type Filter = {
  tab?: string;
  lang?: string;
  status?: string;
  category?: string;
  source?: string;
  search?: string;
  page?: string;
};

type DerivedStatus = "published" | "draft" | "scheduled";

type Row = {
  source: "cms" | "legacy";
  cms_id?: number;
  id: number;
  slug: string;
  lang: "es" | "en";
  type: string;
  title: string;
  excerpt: string;
  html: string;
  date: string;
  status: DerivedStatus;
  category: { slug: string; name: string };
};

// 4 pestañas principales que pidió JR. Cada una agrupa todas las categorías
// equivalentes (ES y EN, sub-secciones).
const TABS: { key: string; label: string; categories: string[] }[] = [
  {
    key: "blog",
    label: "Blog",
    categories: ["blog", "tips-retail", "tips", "consejos", "corporate", "corporativo", "retail-blog"],
  },
  {
    key: "webinar",
    label: "Webinar",
    categories: ["webinars"],
  },
  {
    key: "entrevistas",
    label: "Entrevistas",
    categories: ["entrevistas", "interviews", "retail-entrevistas"],
  },
  {
    key: "casos-de-exito",
    label: "Casos de éxito",
    categories: ["casos-de-exito", "case-studies", "retail-case-studies", "shopping-malls-case-studies", "retail-casos", "shopping-malls"],
  },
];

function deriveStatus(p: CmsPost | BlogPost, isCms: boolean, now: Date): DerivedStatus {
  if (isCms) {
    const cms = p as CmsPost;
    if (cms.status === "draft") return "draft";
    const d = new Date(cms.date);
    if (cms.status === "published" && d > now) return "scheduled";
    return "published";
  }
  const st = (p as { status?: string }).status;
  if (st === "draft" || st === "pending" || st === "private") return "draft";
  return "published";
}

function legacyToRow(p: BlogPost, now: Date): Row {
  return {
    source: "legacy",
    id: p.id,
    slug: p.slug,
    lang: p.lang,
    type: p.type,
    title: p.title,
    excerpt: p.excerpt || "",
    html: p.html || "",
    date: p.date,
    status: deriveStatus(p, false, now),
    category: p.category,
  };
}

function cmsToRow(p: CmsPost, now: Date): Row {
  return {
    source: "cms",
    cms_id: p.id,
    id: p.id,
    slug: p.slug,
    lang: p.lang,
    type: p.type,
    title: p.title,
    excerpt: p.excerpt || "",
    html: p.html || "",
    date: p.date,
    status: deriveStatus(p, true, now),
    category: { slug: p.category_slug, name: p.category_name },
  };
}

function summarize(html: string, n = 140): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " ").replace(/\s+/g, " ").trim().slice(0, n);
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" };
const btn: React.CSSProperties = { padding: "6px 12px", borderRadius: 6, fontSize: 12, border: "1px solid rgba(15,23,42,0.16)", background: "#fff", cursor: "pointer", color: "#15163A", textDecoration: "none", display: "inline-block" };

const STATUS_COLOR: Record<DerivedStatus, string> = {
  published: "#10b981",
  draft: "#f59e0b",
  scheduled: "#1E89C7",
};
const STATUS_LABEL: Record<DerivedStatus, string> = {
  published: "publicado",
  draft: "borrador",
  scheduled: "programado",
};

export default async function ContentAdminPage({ searchParams }: { searchParams: Promise<Filter> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/content/")}`);

  // ---- Cargar fuentes: legacy (blog.json) + CMS (Supabase) ----
  const now = new Date();
  const [legacyPosts, cmsPosts] = await Promise.all([
    Promise.resolve(adminGetAllPosts()),
    listAllCmsPosts().catch(() => [] as CmsPost[]),
  ]);

  // Mergear: si un (lang, slug) está en CMS, ese gana sobre el legacy
  const cmsRows = cmsPosts.map(p => cmsToRow(p, now));
  const cmsKeys = new Set(cmsRows.map(r => `${r.lang}::${r.slug}`));
  const legacyRows = legacyPosts.map(p => legacyToRow(p, now)).filter(r => !cmsKeys.has(`${r.lang}::${r.slug}`));
  const all: Row[] = [...cmsRows, ...legacyRows];

  // ---- Filtros ----
  // status y lang son MULTI-select: vienen como CSV ("published,scheduled" / "es,en").
  // "all" o vacío = sin filtrar.
  const tab = sp.tab || "all";
  const langCsv = (sp.lang || "").trim();
  const statusCsv = (sp.status || "").trim();
  const category = sp.category || "all";
  const source = sp.source || "all";
  const search = (sp.search || "").trim().toLowerCase();
  const page = Math.max(1, parseInt(sp.page || "1"));

  const langSet = new Set(langCsv && langCsv !== "all" ? langCsv.split(",").map(s => s.trim()).filter(Boolean) : []);
  const statusSet = new Set(statusCsv && statusCsv !== "all" ? statusCsv.split(",").map(s => s.trim()).filter(Boolean) : []);

  // Mapa de la pestaña activa a su set de categorías
  const tabDef = TABS.find(t => t.key === tab) || null;
  const tabCategories = tabDef ? new Set(tabDef.categories) : null;

  // Categorías disponibles dentro del scope actual de pestaña
  const catSet = new Map<string, { name: string; count: number }>();
  for (const p of all) {
    if (tabCategories && !tabCategories.has(p.category?.slug || "blog")) continue;
    const slug = p.category?.slug || "blog";
    const name = p.category?.name || "Blog";
    const cur = catSet.get(slug) || { name, count: 0 };
    cur.count++;
    catSet.set(slug, cur);
  }
  const categories = [...catSet.entries()].map(([s, v]) => ({ slug: s, name: v.name, count: v.count })).sort((a, b) => b.count - a.count);

  let filtered = all;
  if (tabCategories) filtered = filtered.filter(p => tabCategories.has(p.category?.slug || "blog"));
  if (langSet.size > 0) filtered = filtered.filter(p => langSet.has(p.lang));
  if (statusSet.size > 0) filtered = filtered.filter(p => statusSet.has(p.status));
  if (category !== "all") filtered = filtered.filter(p => (p.category?.slug || "blog") === category);
  if (source !== "all") filtered = filtered.filter(p => p.source === source);
  if (search) filtered = filtered.filter(p =>
    p.slug.toLowerCase().includes(search) ||
    (p.title || "").toLowerCase().includes(search)
  );

  filtered = filtered.slice().sort((a, b) => (b.date > a.date ? 1 : a.date > b.date ? -1 : 0));

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const from = (page - 1) * PER_PAGE;
  const rows = filtered.slice(from, from + PER_PAGE);

  // ---- Stats sobre el scope de la pestaña activa (para que los chips reflejen el contexto) ----
  const scopeForStats = tabCategories
    ? all.filter(p => tabCategories.has(p.category?.slug || "blog"))
    : all;
  const stats = {
    total: all.length,
    scoped: scopeForStats.length,
    es_pub: scopeForStats.filter(p => p.lang === "es" && p.status === "published").length,
    en_pub: scopeForStats.filter(p => p.lang === "en" && p.status === "published").length,
    scheduled: scopeForStats.filter(p => p.status === "scheduled").length,
    byStatus: {
      published: scopeForStats.filter(p => p.status === "published").length,
      draft:     scopeForStats.filter(p => p.status === "draft").length,
      scheduled: scopeForStats.filter(p => p.status === "scheduled").length,
    },
    byLang: {
      es: scopeForStats.filter(p => p.lang === "es").length,
      en: scopeForStats.filter(p => p.lang === "en").length,
    },
    byStatusLang: {
      es_draft:     scopeForStats.filter(p => p.lang === "es" && p.status === "draft").length,
      es_scheduled: scopeForStats.filter(p => p.lang === "es" && p.status === "scheduled").length,
      en_draft:     scopeForStats.filter(p => p.lang === "en" && p.status === "draft").length,
      en_scheduled: scopeForStats.filter(p => p.lang === "en" && p.status === "scheduled").length,
    },
  };

  // Contador por pestaña — útil en el chip de la tab
  const tabCounts: Record<string, number> = { all: all.length };
  for (const t of TABS) {
    const set = new Set(t.categories);
    tabCounts[t.key] = all.filter(p => set.has(p.category?.slug || "blog")).length;
  }

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
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Contenidos</h1>
            <p style={{ fontSize: 12, color: "#6E7488", margin: "4px 0 0" }}>
              {stats.total.toLocaleString()} posts totales{stats.scheduled > 0 ? ` · ${stats.scheduled} programados` : ""}
            </p>
          </div>
          <Link href="/admin/posts/new/" style={{ ...btn, background: "#31B1F8", color: "#fff", border: "none", fontWeight: 600, padding: "10px 18px", fontSize: 13 }}>+ Crear nuevo</Link>
        </div>

        {/* 4 pestañas principales + Todos */}
        <div style={{ display: "flex", gap: 4, marginBottom: 18, borderBottom: "1px solid rgba(15,23,42,0.08)", flexWrap: "wrap" }}>
          <Link href={mkHref({ tab: "", page: "", category: "" })} style={tabStyle(tab === "all")}>
            Todos <span style={tabCount(tab === "all")}>{tabCounts.all.toLocaleString()}</span>
          </Link>
          {TABS.map(t => (
            <Link key={t.key} href={mkHref({ tab: t.key, page: "", category: "" })} style={tabStyle(tab === t.key)}>
              {t.label} <span style={tabCount(tab === t.key)}>{(tabCounts[t.key] || 0).toLocaleString()}</span>
            </Link>
          ))}
        </div>

        {/* Filtros principales: chips multi-select (estado + idioma) */}
        <div style={{ ...card, marginBottom: 14, padding: "14px 18px" }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <FilterGroup
              label="Estado"
              options={[
                { value: "published", label: "Publicado", color: "#10b981", count: stats.byStatus.published },
                { value: "draft",     label: "Borrador",  color: "#f59e0b", count: stats.byStatus.draft },
                { value: "scheduled", label: "Programado", color: "#1E89C7", count: stats.byStatus.scheduled },
              ]}
              selected={statusSet}
              mkHref={(values) => mkHref({ status: values.length === 0 ? "" : values.join(","), page: "" })}
            />
            <div style={{ width: 1, alignSelf: "stretch", background: "rgba(15,23,42,0.06)" }} />
            <FilterGroup
              label="Idioma"
              options={[
                { value: "es", label: "ES", color: "#15163A", count: stats.byLang.es },
                { value: "en", label: "EN", color: "#15163A", count: stats.byLang.en },
              ]}
              selected={langSet}
              mkHref={(values) => mkHref({ lang: values.length === 0 ? "" : values.join(","), page: "" })}
            />
          </div>
        </div>

        {/* Filtros secundarios — categoría/fuente/búsqueda */}
        <form method="get" style={{ ...card, marginBottom: 14, padding: "12px 18px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input type="hidden" name="tab" value={tab} />
          <input type="hidden" name="lang" value={langCsv} />
          <input type="hidden" name="status" value={statusCsv} />
          <input name="search" placeholder="Buscar slug o título…" defaultValue={sp.search || ""} style={{ ...inp, flex: 1, minWidth: 220 }} />
          <select name="category" defaultValue={category} style={inp}>
            <option value="all">Todas las categorías</option>
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name} ({c.count})</option>
            ))}
          </select>
          <select name="source" defaultValue={source} style={inp}>
            <option value="all">Cualquier fuente</option>
            <option value="cms">CMS</option>
            <option value="legacy">Legacy</option>
          </select>
          <button type="submit" style={{ ...btn, background: "#15163A", color: "#fff", border: "none", fontWeight: 600 }}>Filtrar</button>
          {(langSet.size > 0 || statusSet.size > 0 || category !== "all" || source !== "all" || search) && (
            <Link href={mkHref({ lang: "", status: "", category: "", source: "", search: "", page: "" })} style={{ ...btn, fontSize: 12 }}>Limpiar</Link>
          )}
        </form>

        {/* Mini-stats: línea sutil de resumen */}
        <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#6E7488", padding: "0 4px 14px", flexWrap: "wrap" }}>
          <MiniStat dotColor="#10b981" label="ES publicados" value={stats.es_pub} href={mkHref({ lang: "es", status: "published", page: "" })} />
          <MiniStat dotColor="#f59e0b" label="ES borradores" value={stats.byStatusLang.es_draft} href={mkHref({ lang: "es", status: "draft", page: "" })} />
          <MiniStat dotColor="#1E89C7" label="ES programados" value={stats.byStatusLang.es_scheduled} href={mkHref({ lang: "es", status: "scheduled", page: "" })} />
          <span style={{ color: "#94A3B8" }}>·</span>
          <MiniStat dotColor="#10b981" label="EN publicados" value={stats.en_pub} href={mkHref({ lang: "en", status: "published", page: "" })} />
          <MiniStat dotColor="#f59e0b" label="EN borradores" value={stats.byStatusLang.en_draft} href={mkHref({ lang: "en", status: "draft", page: "" })} />
          <MiniStat dotColor="#1E89C7" label="EN programados" value={stats.byStatusLang.en_scheduled} href={mkHref({ lang: "en", status: "scheduled", page: "" })} />
        </div>

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
                <th style={th}>Fuente</th>
                <th style={th}>Fecha</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => {
                const stColor = STATUS_COLOR[p.status];
                const srcColor = p.source === "cms" ? "#1E89C7" : "#6E7488";
                const publicUrl = `/${p.lang}/${p.slug}/`;
                const previewHref = p.source === "cms"
                  ? `/admin/preview/?cms_id=${p.cms_id}`
                  : `/admin/preview/?lang=${p.lang}&slug=${p.slug}&type=${p.type}`;
                const editHref = p.source === "cms"
                  ? `/admin/posts/${p.cms_id}/`
                  : `/admin/posts/from-legacy/?lang=${p.lang}&slug=${p.slug}&type=${p.type}`;
                const titleTarget = p.status === "published" ? publicUrl : previewHref;
                const titleNewTab = p.status === "published";
                return (
                  <tr key={`${p.source}/${p.lang}/${p.slug}`} style={{ borderTop: "1px solid rgba(15,23,42,0.04)" }}>
                    <td style={td}>
                      <span style={{ fontSize: 11, padding: "2px 8px", background: `${stColor}22`, color: stColor, borderRadius: 999, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{STATUS_LABEL[p.status]}</span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 11, padding: "2px 6px", background: "#F6F7FB", borderRadius: 4, fontWeight: 600 }}>{p.lang.toUpperCase()}</span>
                    </td>
                    <td style={{ ...td, maxWidth: 460 }}>
                      <a href={titleTarget} target={titleNewTab ? "_blank" : undefined} rel={titleNewTab ? "noreferrer" : undefined} style={{ fontWeight: 600, color: "#15163A", marginBottom: 2, lineHeight: 1.3, textDecoration: "none", display: "block" }} dangerouslySetInnerHTML={{ __html: p.title || "(sin título)" }} />
                      <div style={{ fontSize: 11, color: "#6E7488" }}>/{p.lang}/{p.slug}{titleNewTab ? " ↗" : ""}</div>
                      {p.excerpt && <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>{summarize(p.excerpt, 100)}</div>}
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 11, color: "#6E7488" }}>{p.category?.name || "—"}</span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 10, padding: "2px 6px", background: `${srcColor}15`, color: srcColor, borderRadius: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.source}</span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 11, color: "#6E7488" }}>{p.date?.slice(0, 10) || "—"}</span>
                    </td>
                    <td style={{ ...td, whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Link href={previewHref} style={{ ...btn, fontSize: 11 }}>Ver</Link>
                        <Link href={editHref} style={{ ...btn, fontSize: 11, background: "#15163A", color: "#fff", border: "none", fontWeight: 600 }}>Editar</Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr><td colSpan={7} style={{ ...td, textAlign: "center", padding: "40px 20px", color: "#94A3B8" }}>Sin resultados</td></tr>
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

function FilterGroup({
  label,
  options,
  selected,
  mkHref,
}: {
  label: string;
  options: { value: string; label: string; color: string; count: number }[];
  selected: Set<string>;
  mkHref: (values: string[]) => string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <span style={{ fontSize: 11, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{label}</span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {options.map(o => {
          const isOn = selected.has(o.value);
          const next = new Set(selected);
          if (isOn) next.delete(o.value);
          else next.add(o.value);
          const href = mkHref([...next]);
          return (
            <Link
              key={o.value}
              href={href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                border: `1.5px solid ${isOn ? o.color : "rgba(15,23,42,0.14)"}`,
                background: isOn ? `${o.color}` : "#fff",
                color: isOn ? "#fff" : "#15163A",
                transition: "all 120ms",
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: 999,
                background: isOn ? "#fff" : o.color,
                opacity: isOn ? 1 : 0.7,
              }} />
              {o.label}
              <span style={{
                fontSize: 11,
                padding: "1px 7px",
                borderRadius: 999,
                background: isOn ? "rgba(255,255,255,0.22)" : "#F6F7FB",
                color: isOn ? "#fff" : "#6E7488",
                fontWeight: 600,
              }}>{o.count.toLocaleString()}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MiniStat({ label, value, href, dotColor }: { label: string; value: number; href: string; dotColor: string }) {
  return (
    <Link href={href} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#6E7488", textDecoration: "none" }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: dotColor, display: "inline-block" }} />
      <strong style={{ color: "#15163A", fontWeight: 600 }}>{value.toLocaleString()}</strong>
      {label}
    </Link>
  );
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    fontSize: 13,
    padding: "10px 16px",
    fontWeight: active ? 600 : 500,
    color: active ? "#15163A" : "#6E7488",
    textDecoration: "none",
    borderBottom: active ? "2px solid #31B1F8" : "2px solid transparent",
    marginBottom: -1,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
}
function tabCount(active: boolean): React.CSSProperties {
  return {
    fontSize: 11,
    padding: "1px 7px",
    borderRadius: 999,
    background: active ? "#31B1F8" : "#F6F7FB",
    color: active ? "#fff" : "#6E7488",
    fontWeight: 600,
  };
}

const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.06em" };
const td: React.CSSProperties = { padding: "10px 14px", verticalAlign: "top" };
