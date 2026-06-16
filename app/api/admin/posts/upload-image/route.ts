import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserEmail, isEmailAllowed, createSupabaseAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "blog-media";
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml", "image/avif"]);

const EXT_FOR_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};

function safeBase(name: string): string {
  return (name || "image")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function POST(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, error: "form-data inválido" }, { status: 400 });

  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ ok: false, error: "Sin archivo" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: `Tamaño máximo ${MAX_BYTES / 1024 / 1024} MB` }, { status: 413 });
  if (!ALLOWED_MIME.has(file.type)) return NextResponse.json({ ok: false, error: `Tipo no permitido: ${file.type}` }, { status: 415 });

  // Carpeta opcional: hero, body, etc. Default: cms/<año>/<mes>/
  const folder = String(form.get("folder") || "cms").replace(/[^a-z0-9/_-]+/g, "");
  const now = new Date();
  const yyyy = now.getUTCFullYear();
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");

  const ext = EXT_FOR_MIME[file.type] || "bin";
  const originalBase = safeBase(file.name.replace(/\.[^.]+$/, ""));
  const ts = now.getTime().toString(36);
  const key = `${folder}/${yyyy}/${mm}/${originalBase || "image"}-${ts}.${ext}`;

  const db = createSupabaseAdminClient();
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await db.storage.from(BUCKET).upload(key, buffer, {
    contentType: file.type,
    upsert: false,
    cacheControl: "31536000",
  });
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const { data: pub } = db.storage.from(BUCKET).getPublicUrl(key);
  return NextResponse.json({ ok: true, url: pub.publicUrl, key });
}
