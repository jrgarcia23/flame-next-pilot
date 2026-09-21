// Sincroniza los tags del panel (Supabase Storage, bucket admin-data) HACIA el repo
// (data/case-studies-tags.json), para que las páginas públicas (que leen el JSON en build)
// reflejen lo que JR edita en /admin/casos-exito. Ejecutar antes de desplegar.
//
// Uso:  node scripts/casos-exito/pull-tags-from-store.mjs [--dry]
// Inverso: seed-tags-to-store.mjs (repo → Storage).
// Credenciales: ~/.esconzeta-secrets/supabase-flame.json

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const DRY = process.argv.includes("--dry");
const BUCKET = "admin-data";
const OBJECT = "case-studies-tags.json";

const sec = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".esconzeta-secrets", "supabase-flame.json"), "utf-8"));

const res = await fetch(`${sec.url}/storage/v1/object/${BUCKET}/${OBJECT}?cb=${Date.now()}`, {
  headers: { apikey: sec.service_role_key, Authorization: `Bearer ${sec.service_role_key}`, "Cache-Control": "no-cache" },
});
if (!res.ok) {
  console.error(`ERROR ${res.status}: no se pudo leer el objeto de Storage.`, (await res.text()).slice(0, 300));
  process.exit(1);
}
const doc = JSON.parse(await res.text());
if (!Array.isArray(doc?.casos)) { console.error("El objeto no tiene 'casos'."); process.exit(1); }

const dest = path.join(REPO, "data", "case-studies-tags.json");
const body = JSON.stringify(doc, null, 2) + "\n";
if (DRY) {
  console.log(`[dry] ${doc.casos.length} casos en Storage. Se escribiría en ${dest}.`);
  process.exit(0);
}
fs.writeFileSync(dest, body, "utf-8");
console.log(`✅ ${doc.casos.length} casos volcados de Storage → ${path.relative(REPO, dest)}. Revisa el diff y despliega.`);
