import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import BlogPostTemplate from "@/components/templates/BlogPostTemplate";
import InterviewPostTemplate from "@/components/templates/InterviewPostTemplate";
import { adminGetPostByKey, type Lang, type BlogPost } from "@/lib/blog";
import { getCmsPostById } from "@/lib/cms-posts";

export const dynamic = "force-dynamic";

type SP = {
  cms_id?: string;
  lang?: string;
  slug?: string;
  type?: string;
};

export default async function PreviewPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    const back = `/admin/preview/?${new URLSearchParams(Object.entries(sp).filter(([, v]) => v != null) as [string, string][]).toString()}`;
    redirect(`/admin/login/?next=${encodeURIComponent(back)}`);
  }

  let post: BlogPost | null = null;
  let isCms = false;
  let isPublished = false;
  let isScheduled = false;
  let publicLang: Lang = "es";
  let publicSlug = "";

  // 1) Si viene cms_id, sirve el post del CMS (incluye drafts, scheduled y published)
  if (sp.cms_id) {
    const cms = await getCmsPostById(parseInt(sp.cms_id, 10));
    if (cms) {
      isCms = true;
      publicLang = cms.lang;
      publicSlug = cms.slug;
      const now = new Date();
      const d = new Date(cms.date);
      isScheduled = cms.status === "published" && d > now;
      isPublished = cms.status === "published" && d <= now;
      post = {
        id: cms.id,
        slug: cms.slug,
        lang: cms.lang,
        type: cms.type,
        title: cms.title,
        excerpt: cms.excerpt,
        html: cms.html,
        date: cms.date,
        modified: cms.modified,
        hero: cms.hero,
        thumbnail: cms.thumbnail || cms.hero,
        category: { slug: cms.category_slug, name: cms.category_name },
        link_legacy: "",
      };
    }
  } else if (sp.lang && sp.slug) {
    const lang = (sp.lang === "en" ? "en" : "es") as Lang;
    const type = (sp.type === "page" || sp.type === "whitepaper" ? sp.type : "post");
    const legacy = adminGetPostByKey(type, lang, sp.slug);
    if (legacy) {
      publicLang = legacy.lang;
      publicSlug = legacy.slug;
      const st = (legacy as { status?: string }).status || "published";
      isPublished = st !== "draft" && st !== "pending" && st !== "private";
      post = legacy;
    }
  }

  if (!post) notFound();

  const isInterview = post.category.slug === "entrevistas" || post.category.slug === "interviews";
  const publicUrl = `/${publicLang}/${publicSlug}/`;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="content" />

      {/* Barra contextual de preview */}
      <div style={{ background: "#15163A", color: "#fff", padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "rgba(255,255,255,0.16)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Vista previa
          </span>
          <strong>{post.title.replace(/<[^>]+>/g, "")}</strong>
          <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>
            · {isCms ? "CMS" : "Legacy"} · {publicLang.toUpperCase()} · {isScheduled ? "Programado para " + new Date(post.date).toLocaleString("es-ES") : isPublished ? "Publicado" : "Borrador"}
          </span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Link href="/admin/content/" style={chipBtn}>← Listado</Link>
          {isCms && sp.cms_id && (
            <Link href={`/admin/posts/${sp.cms_id}/`} style={{ ...chipBtn, background: "#31B1F8", color: "#fff", border: 0 }}>Editar</Link>
          )}
          {!isCms && (
            <Link href={`/admin/posts/from-legacy/?lang=${publicLang}&slug=${publicSlug}&type=${post.type}`} style={{ ...chipBtn, background: "#31B1F8", color: "#fff", border: 0 }}>Editar</Link>
          )}
          {isPublished && (
            <a href={publicUrl} target="_blank" rel="noreferrer" style={chipBtn}>Ver pública ↗</a>
          )}
        </div>
      </div>

      {/* Renderizado real con el mismo template que la web */}
      <div style={{ background: "#fff" }}>
        {isInterview
          ? <InterviewPostTemplate post={post} />
          : <BlogPostTemplate post={post} />
        }
      </div>
    </div>
  );
}

const chipBtn: React.CSSProperties = {
  fontSize: 12,
  padding: "5px 12px",
  borderRadius: 6,
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.18)",
  fontWeight: 500,
};
