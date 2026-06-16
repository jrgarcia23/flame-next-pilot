import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserEmail, isEmailAllowed, createSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "blog-media";
const PAGE_SIZE = 60;

/**
 * Lista imágenes del bucket blog-media. Devuelve URL pública + path + tamaño + fecha.
 * Query params:
 *   folder=cms|case-studies|2026|...   (default: cms)
 *   q=texto                            (filtra por nombre, contains)
 *   limit=60
 */
export async function GET(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const folder = (url.searchParams.get("folder") || "cms").replace(/[^a-z0-9/_-]+/gi, "");
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "60", 10) || PAGE_SIZE, 200);

  const db = createSupabaseAdminClient();

  // Walk recursivo: el endpoint storage/v1 NO lista recursivo, hay que ir carpeta a carpeta.
  // Limitamos profundidad: lista 1 nivel y, si son dirs, baja un nivel más.
  const out: { path: string; name: string; url: string; size: number; updated_at: string }[] = [];
  async function listFolder(prefix: string, depth: number): Promise<void> {
    if (depth > 3) return;
    const { data, error } = await db.storage.from(BUCKET).list(prefix, { limit: 1000, sortBy: { column: "updated_at", order: "desc" } });
    if (error || !data) return;
    for (const entry of data) {
      const childPath = prefix ? `${prefix}/${entry.name}` : entry.name;
      // Los directorios en Storage no exponen size; suelen tener metadata null
      if (!entry.metadata && depth < 3) {
        await listFolder(childPath, depth + 1);
        continue;
      }
      if (entry.metadata) {
        if (q && !entry.name.toLowerCase().includes(q) && !childPath.toLowerCase().includes(q)) continue;
        const { data: pub } = db.storage.from(BUCKET).getPublicUrl(childPath);
        out.push({
          path: childPath,
          name: entry.name,
          url: pub.publicUrl,
          size: (entry.metadata as { size?: number }).size || 0,
          updated_at: entry.updated_at || entry.created_at || "",
        });
        if (out.length >= limit) return;
      }
    }
  }

  await listFolder(folder, 0);
  out.sort((a, b) => (b.updated_at > a.updated_at ? 1 : -1));

  return NextResponse.json({ ok: true, items: out.slice(0, limit), bucket: BUCKET, folder });
}
