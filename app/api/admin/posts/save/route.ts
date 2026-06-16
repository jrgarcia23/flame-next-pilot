import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { upsertCmsPost } from "@/lib/cms-posts";
import { categoryNameFor, CMS_CATEGORIES, slugify } from "@/lib/cms-categories";
import { invalidateCmsCache } from "@/lib/blog-cms-merge";

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
  const category_slug = (body.category_slug || "").trim();

  if (!title) return NextResponse.json({ ok: false, error: "El título es obligatorio" }, { status: 400 });
  if (!html) return NextResponse.json({ ok: false, error: "El contenido está vacío" }, { status: 400 });
  if (!category_slug || !CMS_CATEGORIES.find(c => c.slug === category_slug)) {
    return NextResponse.json({ ok: false, error: "Categoría no válida" }, { status: 400 });
  }

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
    category_slug,
    category_name: categoryNameFor(category_slug, lang),
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
    revalidatePath(`/${lang}/categoria/${category_slug}/`);
    if (lang === "en") revalidatePath(`/${lang}/category/${category_slug}/`);
    revalidatePath(`/${lang}/`);
    revalidatePath("/admin/posts/");
  } catch {
    // revalidatePath puede lanzar en runtime edge: no es fatal
  }

  return NextResponse.json({ ok: true, post: result.post });
}
