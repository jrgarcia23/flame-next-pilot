import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { getCmsPostById, upsertCmsPost } from "@/lib/cms-posts";
import { categoryNameFor } from "@/lib/cms-categories";
import { invalidateCmsCache } from "@/lib/blog-cms-merge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { id?: number; target_lang?: "es" | "en" };

/**
 * Duplica un post. Casos típicos:
 *  - Crear la variante en el otro idioma manteniendo el HTML como punto de partida
 *  - Empezar un post nuevo desde otro existente (mismo idioma)
 * El nuevo post se crea SIEMPRE como draft.
 */
export async function POST(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body: Body = await req.json().catch(() => ({}));
  const id = Number(body.id);
  if (!Number.isFinite(id)) return NextResponse.json({ ok: false, error: "id requerido" }, { status: 400 });

  const source = await getCmsPostById(id);
  if (!source) return NextResponse.json({ ok: false, error: "post no encontrado" }, { status: 404 });

  const target_lang: "es" | "en" = body.target_lang === "en" ? "en" : body.target_lang === "es" ? "es" : source.lang;
  const langChanged = target_lang !== source.lang;

  // Slug derivado: si cambiamos idioma, prefijamos para evitar colisión con el original.
  // Si es mismo idioma, añadimos -copia / -copy
  const slugSuffix = langChanged ? `-${target_lang}` : (target_lang === "es" ? "-copia" : "-copy");
  let candidate = `${source.slug}${slugSuffix}`;
  // Garantizar unicidad con sufijo numérico si choca
  const result = await tryInsertWithRetry({
    base: candidate,
    source,
    target_lang,
    actor_email: email,
  });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  invalidateCmsCache();
  revalidatePath("/admin/posts/");

  return NextResponse.json({ ok: true, post: result.post });
}

async function tryInsertWithRetry(opts: {
  base: string;
  source: Awaited<ReturnType<typeof getCmsPostById>>;
  target_lang: "es" | "en";
  actor_email: string;
}): Promise<{ ok: true; post: NonNullable<Awaited<ReturnType<typeof getCmsPostById>>> } | { ok: false; error: string }> {
  const { source, target_lang, actor_email } = opts;
  if (!source) return { ok: false, error: "source missing" };

  for (let n = 0; n < 6; n++) {
    const slug = n === 0 ? opts.base : `${opts.base}-${n + 1}`;
    const res = await upsertCmsPost({
      slug,
      lang: target_lang,
      title: source.title + (target_lang !== source.lang ? "" : " (copia)"),
      excerpt: source.excerpt,
      html: source.html,
      hero: source.hero,
      thumbnail: source.thumbnail,
      category_slug: source.category_slug,
      category_name: categoryNameFor(source.category_slug, target_lang),
      status: "draft",
      type: source.type,
      actor_email,
    });
    if (res.ok) return { ok: true, post: res.post };
    if (!res.error.includes("duplicate") && !res.error.includes("unique")) {
      return { ok: false, error: res.error };
    }
  }
  return { ok: false, error: "no se pudo generar un slug único" };
}
