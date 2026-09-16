// Puebla la tabla Supabase public.case_study_tags desde data/case-studies-tags.json.
// Requiere que la tabla exista (ver supabase-case-study-tags.sql). Idempotente (upsert por nombre).
//
// Uso:  node scripts/casos-exito/upsert-tags.mjs [--dry]
// Credenciales: ~/.esconzeta-secrets/supabase-flame.json

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const DRY = process.argv.includes("--dry");

const sec = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".esconzeta-secrets", "supabase-flame.json"), "utf-8"));
const { casos } = JSON.parse(fs.readFileSync(path.join(REPO, "data", "case-studies-tags.json"), "utf-8"));

const rows = casos.map((c) => ({
  nombre: c.nombre,
  slug: c.slug || "",
  sector: c.sector || [],
  productos: c.productos || [],
  casos_de_uso: c.casosDeUso || [],
  prioridad: c.prioridad ?? 0,
  pendiente: !!c.pendiente,
  nota: c.nota || "",
  updated_at: new Date().toISOString(),
}));

if (DRY) {
  console.log(`[dry] ${rows.length} filas listas para upsert en case_study_tags:`);
  for (const r of rows) console.log(`  ${r.pendiente ? "…" : "✓"} ${r.nombre} | ${r.sector.join("+")} | ${r.casos_de_uso.join(", ") || "(sin casos de uso)"}`);
  process.exit(0);
}

const res = await fetch(`${sec.url}/rest/v1/case_study_tags?on_conflict=nombre`, {
  method: "POST",
  headers: {
    apikey: sec.service_role_key,
    Authorization: `Bearer ${sec.service_role_key}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=minimal",
  },
  body: JSON.stringify(rows),
});

if (!res.ok) {
  const t = await res.text();
  console.error(`ERROR ${res.status}:`, t.slice(0, 500));
  if (res.status === 404 || /relation .* does not exist|case_study_tags/.test(t)) {
    console.error("\n→ La tabla no existe todavía. Ejecuta supabase-case-study-tags.sql en el editor SQL de Supabase y reintenta.");
  }
  process.exit(1);
}
console.log(`✅ ${rows.length} filas upserted en case_study_tags`);
