import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { readCasosTags, writeCasosTags } from "@/lib/casos-tags-store";

export const runtime = "nodejs";
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

  const { doc } = await readCasosTags();
  const c = doc.casos.find((x) => x.nombre === nombre);
  if (!c) return NextResponse.json({ error: "Caso no encontrado" }, { status: 404 });

  if (Array.isArray(body.sector)) c.sector = body.sector.filter((s: string) => SECTORS.includes(s));
  if (Array.isArray(body.productos)) c.productos = body.productos.filter((s: string) => PRODUCTOS.includes(s));
  if (Array.isArray(body.casosDeUso)) c.casosDeUso = body.casosDeUso.filter((s: string) => USOS.includes(s));
  if (body.prioridad !== undefined) c.prioridad = Math.max(0, Math.min(5, Number(body.prioridad) || 0));
  if (typeof body.pendiente === "boolean") c.pendiente = body.pendiente;

  const res = await writeCasosTags(doc.casos);
  if (!res.ok) return NextResponse.json({ error: res.error || "No se pudo guardar" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
