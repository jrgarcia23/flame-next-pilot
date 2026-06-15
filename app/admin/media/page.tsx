import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const PER_PAGE = 60;

const UPLOADS_DIR = "public/wp-content/uploads";
const IMG_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

type MediaItem = {
  path: string;        // /wp-content/uploads/2026/01/foo.png
  name: string;
  size: number;
  modified: number;    // timestamp ms
};

async function walkDir(dir: string, prefix = ""): Promise<MediaItem[]> {
  const out: MediaItem[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = prefix ? `${prefix}/${e.name}` : e.name;
      if (e.isDirectory()) {
        out.push(...(await walkDir(full, rel)));
      } else if (e.isFile()) {
        const ext = path.extname(e.name).toLowerCase();
        if (IMG_EXTS.has(ext)) {
          try {
            const st = await fs.stat(full);
            out.push({
              path: `/wp-content/uploads/${rel}`,
              name: e.name,
              size: st.size,
              modified: st.mtimeMs,
            });
          } catch { /* skip */ }
        }
      }
    }
  } catch { /* skip */ }
  return out;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const inp: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(15,23,42,0.1)", background: "#fff", fontSize: 13, outline: "none", fontFamily: "inherit" };
const btn: React.CSSProperties = { padding: "6px 12px", borderRadius: 6, fontSize: 12, border: "1px solid rgba(15,23,42,0.16)", background: "#fff", cursor: "pointer", color: "#15163A", textDecoration: "none", display: "inline-block" };

export default async function MediaAdminPage({ searchParams }: { searchParams: Promise<{ search?: string; year?: string; page?: string }> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/media/")}`);

  // Walk del directorio uploads
  const uploadsAbs = path.join(process.cwd(), UPLOADS_DIR);
  const all = await walkDir(uploadsAbs);

  // Filtros
  const search = (sp.search || "").trim().toLowerCase();
  const year = sp.year || "all";
  const page = Math.max(1, parseInt(sp.page || "1", 10));

  let filtered = all;
  if (year !== "all") filtered = filtered.filter(m => m.path.includes(`/uploads/${year}/`));
  if (search) filtered = filtered.filter(m => m.name.toLowerCase().includes(search) || m.path.toLowerCase().includes(search));

  filtered = filtered.slice().sort((a, b) => b.modified - a.modified);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const from = (page - 1) * PER_PAGE;
  const rows = filtered.slice(from, from + PER_PAGE);

  // Años disponibles
  const yearSet = new Set<string>();
  for (const m of all) {
    const match = m.path.match(/\/uploads\/(\d{4})\//);
    if (match) yearSet.add(match[1]);
  }
  const years = [...yearSet].sort().reverse();

  // Tamaño total
  const totalBytes = all.reduce((acc, m) => acc + m.size, 0);

  function mkHref(overrides: { search?: string; year?: string; page?: string }): string {
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
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Biblioteca de imágenes</h1>
          <span style={{ fontSize: 12, color: "#6E7488" }}>
            {all.length.toLocaleString()} archivos · {formatBytes(totalBytes)}
          </span>
        </div>

        {/* Filtros */}
        <form method="get" style={{ ...card, marginBottom: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <input name="search" placeholder="Buscar por nombre o ruta…" defaultValue={sp.search || ""} style={{ ...inp, flex: 1, minWidth: 240 }} />
          <select name="year" defaultValue={year} style={inp}>
            <option value="all">Todos los años</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button type="submit" style={{ ...btn, background: "#15163A", color: "#fff", border: "none", fontWeight: 600 }}>Filtrar</button>
          {(year !== "all" || search) && (
            <Link href="/admin/media/" style={{ ...btn }}>Limpiar</Link>
          )}
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
                <img src={m.path} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} loading="lazy" />
              </div>
              <div style={{ padding: 10, fontSize: 11, color: "#15163A", borderTop: "1px solid rgba(15,23,42,0.04)" }}>
                <div style={{ fontWeight: 600, fontSize: 11, marginBottom: 4, lineHeight: 1.3, wordBreak: "break-word" }} title={m.name}>{m.name}</div>
                <div style={{ color: "#6E7488", fontSize: 10, marginBottom: 6 }}>{formatBytes(m.size)} · {new Date(m.modified).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <a href={m.path} target="_blank" rel="noreferrer" style={{ ...btn, fontSize: 10, padding: "4px 8px", flex: 1, textAlign: "center" }}>Ver</a>
                  <button
                    type="button"
                    onClick={undefined}
                    data-clipboard={m.path}
                    style={{ ...btn, fontSize: 10, padding: "4px 8px", flex: 1, fontFamily: "inherit" }}
                    suppressHydrationWarning
                  >
                    Copiar ruta
                  </button>
                </div>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div style={{ ...card, gridColumn: "1 / -1", textAlign: "center", padding: 40, color: "#94A3B8" }}>Sin resultados</div>
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
                const full = window.location.origin + url;
                navigator.clipboard.writeText(full).then(() => {
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
