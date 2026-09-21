import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed, createSupabaseAdminClient } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";

// Las imágenes viven en Supabase Storage (bucket blog-media), NO en el filesystem
// local. Antes esta página hacía fs.readdir(public/wp-content/uploads) — que en
// Vercel serverless devuelve vacío (los estáticos de public/ no están en el bundle
// de la función) y además no contenía las imágenes reales de los posts (heroes,
// casos de éxito), que se suben a Supabase. Ahora lee del bucket, igual que el
// selector de imágenes del editor de posts (api/admin/posts/list-images).
export const dynamic = "force-dynamic";

const BUCKET = "blog-media";
const PER_PAGE = 60;
const CAP = 2000; // techo de seguridad por carpeta (o global en la vista "Todas")
const IMG_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]);
const ALL = "__all__"; // pseudo-carpeta: vista global (todas las carpetas)

type MediaItem = { path: string; name: string; url: string; size: number; modified: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Db = any;

async function walk(db: Db, prefix: string, depth: number, out: MediaItem[], err: { hit: boolean }): Promise<void> {
  if (depth > 4 || out.length >= CAP) return;
  const { data, error } = await db.storage.from(BUCKET).list(prefix, {
    limit: 1000,
    sortBy: { column: "updated_at", order: "desc" },
  });
  if (error) { err.hit = true; return; }
  if (!data) return;

  const subdirs: string[] = [];
  for (const entry of data) {
    const childPath = prefix ? `${prefix}/${entry.name}` : entry.name;
    // En Storage los "directorios" no traen metadata (size, mimetype...)
    if (!entry.metadata) {
      subdirs.push(childPath);
      continue;
    }
    const ext = ("." + (entry.name.split(".").pop() || "")).toLowerCase();
    if (!IMG_EXTS.has(ext)) continue;
    const { data: pub } = db.storage.from(BUCKET).getPublicUrl(childPath);
    const meta = entry.metadata as { size?: number };
    const ts = entry.updated_at || entry.created_at || "";
    out.push({
      path: childPath,
      name: entry.name,
      url: pub.publicUrl,
      size: meta.size || 0,
      modified: ts ? Date.parse(ts) : 0,
    });
  }
  // bajar a subcarpetas en paralelo (más rápido que secuencial)
  await Promise.all(subdirs.map((d) => walk(db, d, depth + 1, out, err)));
}

async function listTopFolders(db: Db): Promise<string[]> {
  const { data } = await db.storage.from(BUCKET).list("", { limit: 1000 });
  if (!data) return [];
  return data
    .filter((e: { metadata: unknown }) => !e.metadata)
    .map((e: { name: string }) => e.name);
}

function formatBytes(n: number): string {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" };
const btn: React.CSSProperties = { padding: "6px 12px", borderRadius: 6, fontSize: 12, border: "1px solid rgba(15,23,42,0.16)", background: "#fff", cursor: "pointer", color: "#15163A", textDecoration: "none", display: "inline-block" };

export default async function MediaAdminPage({ searchParams }: { searchParams: Promise<{ search?: string; folder?: string; year?: string; page?: string }> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/media/")}`);

  const db = createSupabaseAdminClient();
  const topFolders = await listTopFolders(db);
  // Ordenar pestañas: carpetas nombradas primero (case-studies, cms, elementor…),
  // luego años descendentes (2026, 2025…).
  const yearFolders = topFolders.filter((f) => /^\d{4}$/.test(f)).sort().reverse();
  const namedFolders = topFolders.filter((f) => !/^\d{4}$/.test(f)).sort();
  const orderedFolders = [ALL, ...namedFolders, ...yearFolders];
  // Default: año más reciente (siempre tiene contenido); si no hay años, la primera carpeta.
  const defaultFolder = yearFolders[0] || topFolders[0] || "";
  const folder = sp.folder && (sp.folder === ALL || topFolders.includes(sp.folder)) ? sp.folder : defaultFolder;
  const isAll = folder === ALL;

  const all: MediaItem[] = [];
  const err = { hit: false };
  if (isAll) {
    // Vista global: recorre todas las carpetas de nivel 1 en paralelo (latencia ≈ la
    // carpeta más lenta, no la suma). Permite ver subidas recientes (cms/…) y buscar
    // entre todas las carpetas, no solo la activa.
    await Promise.all(topFolders.map((f) => walk(db, f, 0, all, err)));
  } else {
    await walk(db, folder, 0, all, err);
  }

  // El segmento de año de una ruta (p.ej. "2026/07/x" o "case-studies/2026/07/x" → "2026")
  const yearOf = (p: string): string | null => (p.match(/(?:^|\/)(\d{4})\//) || [])[1] || null;

  // Filtros
  const search = (sp.search || "").trim().toLowerCase();
  const year = sp.year || "all";

  let filtered = all;
  if (year !== "all") filtered = filtered.filter((m) => yearOf(m.path) === year);
  if (search) filtered = filtered.filter((m) => m.name.toLowerCase().includes(search) || m.path.toLowerCase().includes(search));
  filtered = filtered.slice().sort((a, b) => b.modified - a.modified);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  // Página válida: entre 1 y totalPages (evita "página 9999/5" con grid vacío)
  const page = Math.min(Math.max(1, parseInt(sp.page || "1", 10) || 1), totalPages);
  const from = (page - 1) * PER_PAGE;
  const rows = filtered.slice(from, from + PER_PAGE);

  const yearSet = new Set<string>();
  for (const m of all) {
    const y = yearOf(m.path);
    if (y) yearSet.add(y);
  }
  const years = [...yearSet].sort().reverse();
  const totalBytes = all.reduce((acc, m) => acc + m.size, 0);
  const capped = all.length >= CAP;

  function mkHref(overrides: { search?: string; folder?: string; year?: string; page?: string }): string {
    const next = { ...sp, ...overrides };
    if (!overrides.page) delete next.page;
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v) qs.set(k, String(v));
    const s = qs.toString();
    return s ? `/admin/media/?${s}` : "/admin/media/";
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="media" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Biblioteca de imágenes</h1>
          <span style={{ fontSize: 12, color: "#6E7488" }}>
            Supabase Storage · <strong style={{ color: "#15163A" }}>{BUCKET}</strong> · {all.length.toLocaleString()}{capped ? "+" : ""} en «{isAll ? "todas" : (folder || "raíz")}» · {formatBytes(totalBytes)}
          </span>
        </div>

        {/* Aviso si Supabase devolvió error en alguna carpeta */}
        {err.hit && (
          <div style={{ ...card, marginBottom: 12, background: "#FEF3F2", borderColor: "#FECDCA", color: "#B42318", fontSize: 12.5 }}>
            ⚠ No se pudo leer alguna carpeta de Supabase Storage. La lista puede estar incompleta; recarga o inténtalo de nuevo.
          </div>
        )}

        {/* Pestañas de carpeta */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
          {orderedFolders.map((f) => {
            const activeTab = f === folder;
            return (
              <Link key={f} href={mkHref({ folder: f, year: "", search: sp.search })}
                style={{ ...btn, background: activeTab ? "#15163A" : "#fff", color: activeTab ? "#fff" : "#15163A", border: activeTab ? "none" : (btn.border as string), fontWeight: activeTab ? 600 : 400 }}>
                {f === ALL ? "Todas" : f}
              </Link>
            );
          })}
        </div>

        {/* Filtros */}
        <form method="get" style={{ ...card, marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input type="hidden" name="folder" value={folder} />
          <input name="search" placeholder={isAll ? "Buscar en todas las carpetas…" : "Buscar por nombre o ruta…"} defaultValue={sp.search || ""} style={{ ...inp, flex: 1, minWidth: 240 }} />
          {/* El selector de año solo aporta cuando la carpeta abarca varios años (Todas, case-studies…); dentro de una carpeta de año es redundante */}
          {years.length > 1 && (
            <select name="year" defaultValue={year} style={inp}>
              <option value="all">Todos los años</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          )}
          <button type="submit" style={{ ...btn, background: "#15163A", color: "#fff", border: "none", fontWeight: 600 }}>Filtrar</button>
          {(year !== "all" || search) && <Link href={mkHref({ folder, year: "", search: "" })} style={{ ...btn }}>Limpiar</Link>}
        </form>

        {/* Stats */}
        <div style={{ ...card, marginBottom: 16, fontSize: 13, color: "#6E7488", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>
            Mostrando <strong style={{ color: "#15163A" }}>{rows.length}</strong> de <strong style={{ color: "#15163A" }}>{total.toLocaleString()}</strong>
            {totalPages > 1 ? <> · página {page}/{totalPages}</> : null}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {page > 1 && <Link href={mkHref({ page: String(page - 1) })} style={btn}>← Anterior</Link>}
            {page < totalPages && <Link href={mkHref({ page: String(page + 1) })} style={btn}>Siguiente →</Link>}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
          {rows.map((m) => (
            <div key={m.path} style={{ ...card, padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ aspectRatio: "1/1", background: "#F6F7FB", position: "relative", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} loading="lazy" />
              </div>
              <div style={{ padding: 10, fontSize: 11, color: "#15163A", borderTop: "1px solid rgba(15,23,42,0.04)" }}>
                <div style={{ fontWeight: 600, fontSize: 11, marginBottom: 4, lineHeight: 1.3, wordBreak: "break-word" }} title={m.name}>{m.name}</div>
                <div style={{ color: "#6E7488", fontSize: 10, marginBottom: 6 }}>{formatBytes(m.size)}{m.modified ? <> · {new Date(m.modified).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}</> : null}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <a href={m.url} target="_blank" rel="noreferrer" style={{ ...btn, fontSize: 10, padding: "4px 8px", flex: 1, textAlign: "center" }}>Ver</a>
                  <button type="button" data-clipboard={m.url} style={{ ...btn, fontSize: 10, padding: "4px 8px", flex: 1, fontFamily: "inherit" }} suppressHydrationWarning>Copiar URL</button>
                </div>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div style={{ ...card, gridColumn: "1 / -1", textAlign: "center", padding: 40, color: "#94A3B8" }}>{search || year !== "all" ? "Sin resultados para este filtro" : "Sin imágenes en esta carpeta"}</div>
          )}
        </div>

        {totalPages > 1 && (
          <div style={{ ...card, marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#6E7488" }}>Página {page} de {totalPages}</span>
            <div style={{ display: "flex", gap: 6 }}>
              {page > 1 && <Link href={mkHref({ page: "1" })} style={btn}>« Primera</Link>}
              {page > 1 && <Link href={mkHref({ page: String(page - 1) })} style={btn}>← Anterior</Link>}
              {page < totalPages && <Link href={mkHref({ page: String(page + 1) })} style={btn}>Siguiente →</Link>}
              {page < totalPages && <Link href={mkHref({ page: String(totalPages) })} style={btn}>Última »</Link>}
            </div>
          </div>
        )}

        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('click', function(e) {
                const t = e.target.closest('[data-clipboard]');
                if (!t) return;
                e.preventDefault();
                const url = t.getAttribute('data-clipboard');
                navigator.clipboard.writeText(url).then(() => {
                  const orig = t.textContent;
                  t.textContent = '✓ Copiado';
                  setTimeout(() => t.textContent = orig, 1200);
                });
              });
            `,
          }}
        />
      </div>
    </div>
  );
}
