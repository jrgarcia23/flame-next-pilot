import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { upsertCmsPost } from "@/lib/cms-posts";
import { CMS_CATEGORIES, slugFor, nameFor, keyFromAnySlug, slugify } from "@/lib/cms-categories";
import { invalidateCmsCache } from "@/lib/blog-cms-merge";
import { notifyGoogleIndexing } from "@/lib/google-indexing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SaveBody = {
  id?: number;
  lang?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  html?: string;
  hero?: string;
  thumbnail?: string;
  /** El editor envía la key canónica (blog / webinar / entrevista / caso-exito).
   *  El servidor decide el slug WP final según el idioma. */
  category_key?: string;
  /** Compat retro: si el cliente envía un slug WP suelto, lo aceptamos también. */
  category_slug?: string;
  status?: string;
  date?: string;
};

export async function POST(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: SaveBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const lang = body.lang === "en" ? "en" : "es";
  const title = (body.title || "").trim();
  const html = (body.html || "").trim();
  const status = body.status === "published" ? "published" : "draft";

  if (!title) return NextResponse.json({ ok: false, error: "El título es obligatorio" }, { status: 400 });
  if (!html) return NextResponse.json({ ok: false, error: "El contenido está vacío" }, { status: 400 });

  // Resolver categoría: aceptamos category_key (formato nuevo) o category_slug
  // (compatibilidad con código previo / posts heredados).
  const rawKey = (body.category_key || "").trim();
  const rawSlugCompat = (body.category_slug || "").trim();
  const categoryKey = rawKey
    ? rawKey
    : (rawSlugCompat ? keyFromAnySlug(rawSlugCompat) : "");
  if (!categoryKey || !CMS_CATEGORIES.find(c => c.key === categoryKey)) {
    return NextResponse.json({ ok: false, error: "Categoría no válida" }, { status: 400 });
  }
  const finalSlug = slugFor(categoryKey, lang);
  const finalName = nameFor(categoryKey, lang);

  const slug = body.slug && body.slug.trim() ? slugify(body.slug) : slugify(title);
  if (!slug) return NextResponse.json({ ok: false, error: "Slug vacío" }, { status: 400 });

  const result = await upsertCmsPost({
    id: body.id,
    slug,
    lang,
    title,
    excerpt: body.excerpt || "",
    html,
    date: body.date,
    hero: body.hero || "",
    thumbnail: body.thumbnail || body.hero || "",
    category_slug: finalSlug,
    category_name: finalName,
    status,
    actor_email: email,
  });

  if (!result.ok) {
    if (result.error.includes("duplicate key")) {
      return NextResponse.json({ ok: false, error: "Ya existe un post con ese slug e idioma" }, { status: 409 });
    }
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  // Revalidar páginas afectadas para que el cambio aparezca al instante.
  invalidateCmsCache();
  try {
    revalidatePath(`/${lang}/${slug}/`);
    revalidatePath(`/${lang}/categoria/${finalSlug}/`);
    if (lang === "en") revalidatePath(`/${lang}/category/${finalSlug}/`);
    revalidatePath(`/${lang}/`);
    revalidatePath("/admin/posts/");
  } catch {
    // revalidatePath puede lanzar en runtime edge: no es fatal
  }

  // Autoindexación: al PUBLICAR, avisa a Google Indexing API al instante (sin esperar
  // al sitemap ni al cron diario). Se hace await para que no se aborte en serverless,
  // pero nunca rompe el guardado (notifyGoogleIndexing no lanza).
  if (status === "published") {
    await notifyGoogleIndexing(`https://www.flameanalytics.com/${lang}/${slug}/`, "URL_UPDATED");
  }

  return NextResponse.json({ ok: true, post: result.post });
}
