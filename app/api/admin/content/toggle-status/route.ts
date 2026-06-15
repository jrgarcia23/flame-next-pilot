import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Toggle del campo `status` de un post en data/blog.json.
 *
 * En producción (Vercel) el filesystem es de solo lectura — esta API
 * funciona en local/preview pero NO persiste cambios en producción.
 * Para producción habría que mover el contenido a una BD (Supabase) o
 * hacer commit programático al repo. Por ahora avisamos al usuario.
 */
export async function POST(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const id = parseInt(String(form.get("id") || "0"), 10);
  const lang = String(form.get("lang") || "");
  const slug = String(form.get("slug") || "");
  const nextStatus = String(form.get("next_status") || "");
  const back = String(form.get("back") || "/admin/content/");

  if (!Number.isFinite(id) || !lang || !slug || !["published", "draft"].includes(nextStatus)) {
    return NextResponse.json({ ok: false, error: "invalid input" }, { status: 400 });
  }

  const blogPath = path.join(process.cwd(), "data", "blog.json");

  try {
    const raw = await fs.readFile(blogPath, "utf8");
    const data = JSON.parse(raw);
    const posts: Array<{ id: number; lang: string; slug: string; status?: string }> = data.posts || [];
    const idx = posts.findIndex(p => p.id === id && p.lang === lang && p.slug === slug);
    if (idx < 0) {
      return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
    }
    posts[idx].status = nextStatus;
    await fs.writeFile(blogPath, JSON.stringify(data, null, 2), "utf8");

    // Redirect back al admin
    const url = new URL(back, req.url);
    return NextResponse.redirect(url, 303);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: `Filesystem read-only (Vercel) o error: ${msg}. En producción los cambios deben hacerse vía commit al repo.` }, { status: 500 });
  }
}
