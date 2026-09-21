// Almacén editable de los tags de casos de éxito (sector / producto / caso de uso).
//
// Persistencia: objeto JSON en Supabase Storage (bucket privado `admin-data`),
// escribible con la service_role (no requiere CREATE TABLE ni tokens de gestión).
// El fichero del repo `data/case-studies-tags.json` es la SEMILLA: se usa como
// fallback si el objeto de Storage aún no existe y para conservar `_meta`.
//
// Fuente de verdad en runtime = Storage. Para volcar los cambios al repo (git)
// usar scripts/casos-exito/pull-tags-from-store.mjs.

import fs from "node:fs";
import path from "node:path";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

const BUCKET = "admin-data";
const OBJECT = "case-studies-tags.json";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export type StoreCaso = {
  nombre: string;
  slug: string;
  sector: string[];
  productos: string[];
  casosDeUso: string[];
  prioridad: number;
  pendiente: boolean;
  nota?: string;
};

export type StoreDoc = { _meta?: unknown; casos: StoreCaso[] };

function normalize(c: Partial<StoreCaso> & { nombre?: string }): StoreCaso {
  return {
    nombre: String(c.nombre || ""),
    slug: c.slug || "",
    sector: Array.isArray(c.sector) ? c.sector : [],
    productos: Array.isArray(c.productos) ? c.productos : [],
    casosDeUso: Array.isArray(c.casosDeUso) ? c.casosDeUso : [],
    prioridad: typeof c.prioridad === "number" ? c.prioridad : 0,
    pendiente: !!c.pendiente,
    nota: c.nota || "",
  };
}

function readSeed(): StoreDoc {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "data", "case-studies-tags.json"), "utf-8");
    const j = JSON.parse(raw) as StoreDoc;
    return { _meta: j._meta, casos: (j.casos || []).map(normalize) };
  } catch {
    return { casos: [] };
  }
}

/**
 * Lee el documento de tags: Storage si existe, si no la semilla del repo.
 * Usa fetch REST con cache-buster (el `.download()` de supabase-js sirve la copia
 * cacheada del CDN y no permite bustear, lo que rompería la lectura tras escritura).
 */
export async function readCasosTags(): Promise<{ doc: StoreDoc; source: "storage" | "seed" }> {
  try {
    if (SUPABASE_URL && SERVICE_ROLE) {
      const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${OBJECT}?cb=${Date.now()}`, {
        headers: { apikey: SERVICE_ROLE, Authorization: `Bearer ${SERVICE_ROLE}`, "Cache-Control": "no-cache" },
        cache: "no-store",
      });
      if (res.ok) {
        const j = JSON.parse(await res.text()) as StoreDoc;
        if (Array.isArray(j?.casos)) return { doc: { _meta: j._meta, casos: j.casos.map(normalize) }, source: "storage" };
      }
    }
  } catch {
    // cae a la semilla
  }
  return { doc: readSeed(), source: "seed" };
}

/** Escribe el documento completo en Storage (upsert). Conserva `_meta`. */
export async function writeCasosTags(casos: StoreCaso[]): Promise<{ ok: boolean; error?: string }> {
  try {
    const db = createSupabaseAdminClient();
    const current = await readCasosTags();
    const meta = current.doc._meta ?? readSeed()._meta;
    const body = JSON.stringify({ _meta: meta, casos: casos.map(normalize) }, null, 2);
    const { error } = await db.storage
      .from(BUCKET)
      .upload(OBJECT, new Blob([body], { type: "application/json" }), { upsert: true, contentType: "application/json", cacheControl: "0" });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "error desconocido" };
  }
}
