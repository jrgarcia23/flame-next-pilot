import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import { listAllCmsPosts } from "@/lib/cms-posts";

export const dynamic = "force-dynamic";

const card: React.CSSProperties = { background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" };
const btn: React.CSSProperties = { padding: "8px 14px", borderRadius: 8, fontSize: 13, border: "1px solid rgba(15,23,42,0.16)", background: "#fff", cursor: "pointer", color: "#15163A", textDecoration: "none", display: "inline-block", fontWeight: 500 };
const btnPrimary: React.CSSProperties = { ...btn, background: "#15163A", color: "#fff", border: "none", fontWeight: 600 };

export default async function PostsListPage() {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    redirect(`/admin/login/?next=${encodeURIComponent("/admin/posts/")}`);
  }

  const posts = await listAllCmsPosts();
  const published = posts.filter(p => p.status === "published").length;
  const drafts = posts.filter(p => p.status === "draft").length;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="content" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>Posts del CMS</h1>
            <p style={{ fontSize: 13, color: "#6E7488", margin: "4px 0 0" }}>Posts creados desde el editor embebido. Los {published} publicados aparecen en la web junto con los legacy de blog.json.</p>
          </div>
          <Link href="/admin/posts/new/" style={btnPrimary}>+ Nuevo post</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
          <div style={{ ...card, borderLeft: "4px solid #10b981" }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{published}</div>
            <div style={{ fontSize: 11, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Publicados</div>
          </div>
          <div style={{ ...card, borderLeft: "4px solid #f59e0b" }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{drafts}</div>
            <div style={{ fontSize: 11, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Borradores</div>
          </div>
          <div style={{ ...card, borderLeft: "4px solid #6E7488" }}>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{posts.length}</div>
            <div style={{ fontSize: 11, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>Total CMS</div>
          </div>
        </div>

        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead style={{ background: "#FAFBFC" }}>
              <tr>
                <th style={th}>Estado</th>
                <th style={th}>Lang</th>
                <th style={th}>Título</th>
                <th style={th}>Categoría</th>
                <th style={th}>Fecha</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => {
                const stColor = p.status === "published" ? "#10b981" : "#f59e0b";
                return (
                  <tr key={p.id} style={{ borderTop: "1px solid rgba(15,23,42,0.04)" }}>
                    <td style={td}>
                      <span style={{ fontSize: 11, padding: "2px 8px", background: `${stColor}22`, color: stColor, borderRadius: 999, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{p.status}</span>
                    </td>
                    <td style={td}>
                      <span style={{ fontSize: 11, padding: "2px 6px", background: "#F6F7FB", borderRadius: 4, fontWeight: 600 }}>{p.lang.toUpperCase()}</span>
                    </td>
                    <td style={{ ...td, maxWidth: 460 }}>
                      <div style={{ fontWeight: 600, color: "#15163A", marginBottom: 2, lineHeight: 1.3 }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: "#6E7488" }}>/{p.lang}/{p.slug}/</div>
                    </td>
                    <td style={td}><span style={{ fontSize: 11, color: "#6E7488" }}>{p.category_name}</span></td>
                    <td style={td}><span style={{ fontSize: 11, color: "#6E7488" }}>{(p.date || "").slice(0, 10)}</span></td>
                    <td style={{ ...td, whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        {p.status === "published" && (
                          <a href={`/${p.lang}/${p.slug}/`} target="_blank" rel="noreferrer" style={{ ...btn, fontSize: 11, padding: "4px 10px" }}>Ver</a>
                        )}
                        <Link href={`/admin/posts/${p.id}/`} style={{ ...btn, fontSize: 11, padding: "4px 10px" }}>Editar</Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {posts.length === 0 && (
                <tr><td colSpan={6} style={{ ...td, textAlign: "center", padding: 40, color: "#94A3B8" }}>
                  Aún no hay posts en el CMS. <Link href="/admin/posts/new/" style={{ color: "#1E89C7" }}>Crear el primero →</Link>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.06em" };
const td: React.CSSProperties = { padding: "10px 14px", verticalAlign: "top" };
