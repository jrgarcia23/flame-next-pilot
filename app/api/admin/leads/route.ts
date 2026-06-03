import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient, getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { ids?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json({ error: "Falta lista de ids" }, { status: 400 });
  }
  if (body.ids.length > 500) {
    return NextResponse.json({ error: "Demasiados ids (máx 500)" }, { status: 400 });
  }

  const ids: number[] = [];
  for (const v of body.ids) {
    const n = Number(v);
    if (!Number.isInteger(n) || n <= 0) {
      return NextResponse.json({ error: "Id inválido en la lista" }, { status: 400 });
    }
    ids.push(n);
  }

  const supabase = createSupabaseAdminClient();
  const { error, count } = await supabase.from("leads").delete({ count: "exact" }).in("id", ids);

  if (error) {
    console.error("[admin/leads DELETE] supabase error:", error);
    return NextResponse.json({ error: "Error al borrar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deleted: count ?? ids.length });
}
