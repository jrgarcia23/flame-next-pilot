import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { adminGetPostByKey, type Lang } from "@/lib/blog";
import { upsertCmsPost, getCmsPostBySlug } from "@/lib/cms-posts";
import { invalidateCmsCache } from "@/lib/blog-cms-merge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = { lang?: string; slug?: string; type?: string };

/**
 * "Promueve" un post legacy de data/blog.json a la tabla CMS Supabase para que
 * pueda editarse desde /admin/posts/[id]/. El post mantiene su slug e idioma,
 * así que la URL pública queda igual.
 *
 * Idempotente: si la entrada CMS ya existe (mismo lang+slug), no inserta otra
 * vez — devuelve el id existente. Esto cubre el caso "ya promoví este post,
 * lo edito de nuevo desde Archivo".
 */
export async function POST(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body: Body = await req.json().catch(() => ({}));
  const lang = (body.lang === "en" ? "en" : "es") as Lang;
  const slug = (body.slug || "").trim();
  const type = (body.type === "page" || body.type === "whitepaper" ? body.type : "post") as "post" | "page" | "whitepaper";
  if (!slug) return NextResponse.json({ ok: false, error: "slug requerido" }, { status: 400 });

  // Si ya existe en CMS, devolver el id directamente
  const existing = await getCmsPostBySlug(lang, slug);
  if (existing) {
    return NextResponse.json({ ok: true, post: existing, promoted: false });
  }

  // Sacar el legacy de blog.json (admin sin filtro de status)
  const legacy = adminGetPostByKey(type, lang, slug);
  if (!legacy) return NextResponse.json({ ok: false, error: "post legacy no encontrado" }, { status: 404 });

  const statusFromLegacy = (legacy as { status?: string }).status || "published";
  const status: "draft" | "published" = statusFromLegacy === "draft" ? "draft" : "published";

  const result = await upsertCmsPost({
    slug: legacy.slug,
    lang: legacy.lang,
    title: legacy.title,
    excerpt: legacy.excerpt || "",
    html: legacy.html || "",
    date: legacy.date,
    hero: legacy.hero || "",
    thumbnail: legacy.thumbnail || legacy.hero || "",
    category_slug: legacy.category?.slug || "blog",
    category_name: legacy.category?.name || "Blog",
    status,
    type,
    actor_email: email,
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  invalidateCmsCache();
  try {
    revalidatePath(`/${lang}/${slug}/`);
    revalidatePath("/admin/posts/");
    revalidatePath("/admin/content/");
  } catch { /* no-op en edge */ }

  return NextResponse.json({ ok: true, post: result.post, promoted: true });
}
