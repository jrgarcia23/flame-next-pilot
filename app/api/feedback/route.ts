import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { rateLimit, getClientIpForRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Feedback de la preview de sectores (equipo comercial). Mismo patrón que Eleia:
// POST  /api/feedback            -> guarda un comentario (abierto, para el equipo)
// GET   /api/feedback?token=XXX  -> lista todos (protegido, para el panel de JR)
// Almacén: Supabase Storage, bucket privado 'sector-feedback', un JSON por comentario.

const BUCKET = "sector-feedback";
const TOKEN = process.env.FEEDBACK_TOKEN || "flame-review-2026";
const safe = (s: string, n = 40) => String(s || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, n) || "x";

async function ensureBucket(supabase: ReturnType<typeof createSupabaseAdminClient>) {
  try { await supabase.storage.createBucket(BUCKET, { public: false }); } catch { /* ya existe */ }
}

export async function POST(req: NextRequest) {
  const ip = getClientIpForRateLimit(req);
  const rl = rateLimit(`feedback:${ip}`, 30, 300);
  if (!rl.ok) return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429, headers: { "Retry-After": String(rl.resetInSec) } });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "server-not-configured" }, { status: 500 });
  }
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  if (b.website) return NextResponse.json({ ok: true }); // honeypot

  const body = String(b.body || "").trim();
  if (!body) return NextResponse.json({ error: "empty" }, { status: 400 });
  if (body.length > 4000) return NextResponse.json({ error: "too-long" }, { status: 400 });

  const kind = b.kind === "pin" ? "pin" : "general";
  const nx = Number(b.x), ny = Number(b.y);
  const rec = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    created_at: new Date().toISOString(),
    sector: safe(String(b.sector || "general"), 40),
    sector_label: String(b.sector_label || "").slice(0, 80),
    page_url: String(b.page_url || "").slice(0, 300),
    author: String(b.author || "").trim().slice(0, 80) || null,
    kind,
    x: kind === "pin" && isFinite(nx) ? Math.max(0, Math.min(100, nx)) : null,
    y: kind === "pin" && isFinite(ny) ? Math.max(0, Math.min(100, ny)) : null,
    body,
  };

  const supabase = createSupabaseAdminClient();
  await ensureBucket(supabase);
  const path = `${rec.sector}__${rec.id}.json`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, JSON.stringify(rec), { contentType: "application/json", upsert: false });
  if (error) { console.error("[feedback] upload error", { message: error.message }); return NextResponse.json({ error: "save-failed" }, { status: 500 }); }
  return NextResponse.json({ ok: true, id: rec.id });
}

export async function DELETE(req: NextRequest) {
  const ip = getClientIpForRateLimit(req);
  const rl = rateLimit(`feedback-del:${ip}`, 40, 300);
  if (!rl.ok) return NextResponse.json({ error: "rate" }, { status: 429 });
  const id = (req.nextUrl.searchParams.get("id") || "").replace(/[^a-z0-9]/gi, "").slice(0, 40);
  if (!id) return NextResponse.json({ error: "no-id" }, { status: 400 });
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "server-not-configured" }, { status: 500 });
  }
  const supabase = createSupabaseAdminClient();
  const { data: files } = await supabase.storage.from(BUCKET).list("", { limit: 1000 });
  const target = (files || []).find((f) => f.name.endsWith(`__${id}.json`));
  if (!target) return NextResponse.json({ ok: true, removed: 0 });
  const { error } = await supabase.storage.from(BUCKET).remove([target.name]);
  if (error) return NextResponse.json({ error: "delete-failed" }, { status: 500 });
  return NextResponse.json({ ok: true, removed: 1 });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") || "";
  if (token !== TOKEN) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "server-not-configured" }, { status: 500 });
  }
  const supabase = createSupabaseAdminClient();
  await ensureBucket(supabase);
  const { data: files, error } = await supabase.storage.from(BUCKET).list("", { limit: 1000, sortBy: { column: "created_at", order: "desc" } });
  if (error) return NextResponse.json({ error: "list-failed" }, { status: 500 });
  const items: unknown[] = [];
  for (const f of files || []) {
    if (!f.name.endsWith(".json")) continue;
    const { data } = await supabase.storage.from(BUCKET).download(f.name);
    if (!data) continue;
    try { items.push(JSON.parse(await data.text())); } catch { /* skip */ }
  }
  items.sort((a, b) => String((b as { created_at?: string }).created_at || "").localeCompare(String((a as { created_at?: string }).created_at || "")));
  return NextResponse.json({ ok: true, count: items.length, items });
}
