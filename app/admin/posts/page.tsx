import { redirect } from "next/navigation";

// La lista de posts (legacy + CMS) vive ahora en /admin/content/.
// Mantengo esta ruta como redirect para no romper bookmarks ni los Links internos
// que ya escribí en commits previos.
export const dynamic = "force-dynamic";

export default function PostsListRedirect() {
  redirect("/admin/content/");
}
