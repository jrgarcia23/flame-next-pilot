import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import ContentSubnav from "@/components/admin/ContentSubnav";
import PostEditor from "@/components/admin/PostEditor";
import { CMS_TEMPLATES, getTemplate } from "@/lib/cms-templates";

export const dynamic = "force-dynamic";

export default async function NewPostPage({ searchParams }: { searchParams: Promise<{ template?: string; lang?: string }> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    redirect(`/admin/login/?next=${encodeURIComponent("/admin/posts/new/")}`);
  }

  const lang = sp.lang === "en" ? "en" : "es";
  const tpl = sp.template ? getTemplate(sp.template) : null;

  const initial = tpl ? {
    lang: lang as "es" | "en",
    title: lang === "es" ? tpl.title_es : tpl.title_en,
    slug: "",
    excerpt: lang === "es" ? tpl.excerpt_es : tpl.excerpt_en,
    html: lang === "es" ? tpl.html_es : tpl.html_en,
    hero: "",
    thumbnail: "",
    category_slug: tpl.category_slug,
    status: "draft" as const,
  } : undefined;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="content-media" />
      <ContentSubnav active="new" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ marginBottom: 20 }}>
          <Link href="/admin/content/" style={{ fontSize: 12, color: "#6E7488", textDecoration: "none" }}>← Listado</Link>
          <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: "6px 0 0" }}>
            {tpl ? `Nuevo desde plantilla: ${lang === "es" ? tpl.label_es : tpl.label_en}` : "Nuevo post"}
          </h1>
          <p style={{ fontSize: 13, color: "#6E7488", margin: "4px 0 0" }}>
            Se publica al instante en la web Flame al pulsar “Publicar”. Sin redeploy. Auto-guardado cada 10 s.
          </p>
        </div>

        {!tpl && (
          <div style={{ marginBottom: 20, background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: 11, color: "#6E7488", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 10 }}>O parte de una plantilla</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CMS_TEMPLATES.map(t => (
                <Link
                  key={t.id}
                  href={`/admin/posts/new/?template=${t.id}&lang=${lang}`}
                  style={{
                    background: "#F6F7FB",
                    border: "1px solid rgba(15,23,42,0.12)",
                    borderRadius: 10,
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "#15163A",
                    flex: "1 1 240px",
                    maxWidth: 320,
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{lang === "es" ? t.label_es : t.label_en}</div>
                  <div style={{ fontSize: 12, color: "#6E7488", lineHeight: 1.45 }}>{lang === "es" ? t.description_es : t.description_en}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <PostEditor initial={initial} />
      </div>
    </div>
  );
}
