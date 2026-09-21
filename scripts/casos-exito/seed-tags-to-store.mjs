// Sube los tags del repo (data/case-studies-tags.json) HACIA el panel (Supabase Storage,
// bucket admin-data). Crea el bucket si no existe. Úsalo para sembrar/reponer el objeto
// que edita /admin/casos-exito. Inverso: pull-tags-from-store.mjs (Storage → repo).
//
// Uso:  node scripts/casos-exito/seed-tags-to-store.mjs
// Credenciales: ~/.esconzeta-secrets/supabase-flame.json

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const BUCKET = "admin-data";
const OBJECT = "case-studies-tags.json";

const sec = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".esconzeta-secrets", "supabase-flame.json"), "utf-8"));
const db = createClient(sec.url, sec.service_role_key, { auth: { persistSession: false } });

const { data: buckets } = await db.storage.listBuckets();
if (!buckets?.some((b) => b.name === BUCKET)) {
  const { error } = await db.storage.createBucket(BUCKET, { public: false, allowedMimeTypes: ["application/json"], fileSizeLimit: "2MB" });
  if (error) { console.error("createBucket ERROR:", error.message); process.exit(1); }
  console.log(`bucket ${BUCKET} creado`);
}

const body = fs.readFileSync(path.join(REPO, "data", "case-studies-tags.json"), "utf-8");
const { casos } = JSON.parse(body);
const { error } = await db.storage.from(BUCKET).upload(OBJECT, new Blob([body], { type: "application/json" }), { upsert: true, contentType: "application/json", cacheControl: "0" });
if (error) { console.error("upload ERROR:", error.message); process.exit(1); }
console.log(`✅ ${casos.length} casos sembrados en Storage (${BUCKET}/${OBJECT}).`);
