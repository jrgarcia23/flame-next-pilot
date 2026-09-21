import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient, getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

// Vocabularios controlados (mismos que data/case-studies-tags.json _meta)
export const SECTORS = ["retail", "centros-comerciales", "supermercados", "hoteles", "espacios-publicos", "banca", "transporte-y-aeropuertos"];
export const PRODUCTOS = ["Traffic", "Connect", "Customer Journey"];
export const USOS = ["Conteo de personas", "Analítica de conversión", "Comportamiento y mapas de calor", "Gestión de ocupación", "Gestión de colas", "Gestión de aseos", "Marketing WiFi", "WiFi corporativo", "Recorrido del cliente", "Interacción entre zonas y tiendas"];

export async function PATCH(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const nombre = String(body.nombre || "").trim();
  if (!nombre) return NextResponse.json({ error: "Falta nombre" }, { status: 400 });

  const upd: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (Array.isArray(body.sector)) upd.sector = body.sector.filter((s: string) => SECTORS.includes(s));
  if (Array.isArray(body.productos)) upd.productos = body.productos.filter((s: string) => PRODUCTOS.includes(s));
  if (Array.isArray(body.casosDeUso)) upd.casos_de_uso = body.casosDeUso.filter((s: string) => USOS.includes(s));
  if (body.prioridad !== undefined) upd.prioridad = Math.max(0, Math.min(5, Number(body.prioridad) || 0));
  if (typeof body.pendiente === "boolean") upd.pendiente = body.pendiente;

  const db = createSupabaseAdminClient();
  const { error } = await db.from("case_study_tags").update(upd).eq("nombre", nombre);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
