import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import PostEditor from "@/components/admin/PostEditor";
import { getCmsPostById } from "@/lib/cms-posts";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    redirect(`/admin/login/?next=${encodeURIComponent(`/admin/posts/${id}/`)}`);
  }

  const postId = parseInt(id, 10);
  if (!Number.isFinite(postId)) notFound();
  const post = await getCmsPostById(postId);
  if (!post) notFound();

  const initial = {
    id: post.id,
    lang: post.lang,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    html: post.html,
    hero: post.hero,
    thumbnail: post.thumbnail,
    category_slug: post.category_slug,
    status: post.status,
    date: post.date,
  };

  // Derivar etiqueta del estado para la cabecera (incluye "programado" cuando date>now)
  const now = new Date();
  const postDate = new Date(post.date);
  const isScheduled = post.status === "published" && postDate > now;
  const stateLabel = isScheduled
    ? `Programado para ${postDate.toLocaleString("es-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}`
    : post.status === "published"
      ? "Publicado"
      : "Borrador";

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="content" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ marginBottom: 20 }}>
          <Link href="/admin/content/" style={{ fontSize: 12, color: "#6E7488", textDecoration: "none" }}>← Listado</Link>
          <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: "6px 0 0" }}>Editar post · id {post.id}</h1>
          <p style={{ fontSize: 13, color: "#6E7488", margin: "4px 0 0" }}>
            Estado actual: <strong>{stateLabel}</strong> · /{post.lang}/{post.slug}/
          </p>
        </div>
        <PostEditor initial={initial} />
      </div>
    </div>
  );
}
