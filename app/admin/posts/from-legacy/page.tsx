import { redirect, notFound } from "next/navigation";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { adminGetPostByKey, type Lang } from "@/lib/blog";
import { upsertCmsPost, getCmsPostBySlug } from "@/lib/cms-posts";
import { invalidateCmsCache } from "@/lib/blog-cms-merge";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

type SP = { lang?: string; slug?: string; type?: string };

/**
 * Atajo server-side: promueve un post legacy al CMS (o reutiliza la entrada
 * existente) y redirige al editor /admin/posts/{id}/.
 *
 * Usado por la barra de Preview cuando se pulsa "Editar" sobre un legacy.
 */
export default async function FromLegacyRedirect({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    redirect(`/admin/login/?next=${encodeURIComponent(`/admin/posts/from-legacy/?lang=${sp.lang}&slug=${sp.slug}&type=${sp.type}`)}`);
  }

  const lang = (sp.lang === "en" ? "en" : "es") as Lang;
  const slug = (sp.slug || "").trim();
  const type = (sp.type === "page" || sp.type === "whitepaper" ? sp.type : "post") as "post" | "page" | "whitepaper";
  if (!slug) notFound();

  // Si ya está en CMS, ir directo
  const existing = await getCmsPostBySlug(lang, slug);
  if (existing) redirect(`/admin/posts/${existing.id}/`);

  // Si no, promoverlo
  const legacy = adminGetPostByKey(type, lang, slug);
  if (!legacy) notFound();

  const statusFromLegacy = (legacy as { status?: string }).status || "published";
  const status: "draft" | "published" = statusFromLegacy === "draft" ? "draft" : "published";

  const res = await upsertCmsPost({
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
  if (!res.ok) notFound();

  invalidateCmsCache();
  try {
    revalidatePath(`/${lang}/${slug}/`);
    revalidatePath("/admin/content/");
  } catch { /* no-op */ }

  redirect(`/admin/posts/${res.post.id}/`);
}
