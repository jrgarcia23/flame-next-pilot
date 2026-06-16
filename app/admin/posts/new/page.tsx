import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import PostEditor from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    redirect(`/admin/login/?next=${encodeURIComponent("/admin/posts/new/")}`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="content" />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 32px" }}>
        <div style={{ marginBottom: 20 }}>
          <Link href="/admin/content/" style={{ fontSize: 12, color: "#6E7488", textDecoration: "none" }}>← Listado</Link>
          <h1 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", margin: "6px 0 0" }}>Nuevo post</h1>
          <p style={{ fontSize: 13, color: "#6E7488", margin: "4px 0 0" }}>
            Se publica al instante en la web Flame al pulsar “Publicar”. Sin redeploy. Auto-guardado cada 10 s.
          </p>
        </div>
        <PostEditor />
      </div>
    </div>
  );
}
