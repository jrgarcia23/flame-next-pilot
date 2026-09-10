// Crea/actualiza en Supabase (tabla blog_posts) las filas necesarias para que
// las rutas resuelvan: SOLO los slugs isNew (idiomas que no existían en blog.json
// + los net-new B&B/Aena). Los casos ya existentes en blog.json NO se tocan aquí
// (su metadata sigue viniendo de blog.json; el cuerpo lo sirve el HTML elementor).
//
// status: "published" para los idiomas que faltaban de casos existentes;
//         "draft" para los net-new (B&B, Aena) hasta OK de JR.
//
// Uso:  node scripts/casos-exito/upsert-cms.mjs [--dry]
// Credenciales: ~/.esconzeta-secrets/supabase-flame.json

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { CASES, CATEGORY } from "./config.mjs";
import { resolveHero, dateFor } from "./merge.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "content");
const DRY = process.argv.includes("--dry");

const sec = JSON.parse(fs.readFileSync(path.join(os.homedir(), ".esconzeta-secrets", "supabase-flame.json"), "utf-8"));
const db = createClient(sec.url, sec.service_role_key, { auth: { persistSession: false } });
const NOW = new Date().toISOString();
const ACTOR = "joseramon.movil@gmail.com";

function stripTags(s) { return (s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); }

async function upsertRow({ slug, lang, title, excerpt, hero, date, status, catSlug, catName }) {
  const payload = {
    slug, lang, type: "post", title, excerpt,
    html: excerpt ? `<p>${excerpt}</p>` : "",
    date, modified: NOW, hero: hero || "", thumbnail: hero || "",
    category_slug: catSlug, category_name: catName, status,
    updated_by: ACTOR,
  };
  const { data: existing } = await db.from("blog_posts").select("id").eq("lang", lang).eq("slug", slug).maybeSingle();
  if (DRY) return { action: existing ? "update" : "insert", slug, lang, status };
  if (existing) {
    const { error } = await db.from("blog_posts").update(payload).eq("id", existing.id);
    if (error) throw new Error(`update ${slug}: ${error.message}`);
    return { action: "update", slug, lang, status };
  }
  const { error } = await db.from("blog_posts").insert({ ...payload, created_by: ACTOR });
  if (error) throw new Error(`insert ${slug}: ${error.message}`);
  return { action: "insert", slug, lang, status };
}

const results = [];
for (const id of Object.keys(CASES)) {
  const c = CASES[id];
  for (const lang of ["es", "en"]) {
    if (!c[lang].isNew) continue;
    const contentPath = path.join(CONTENT_DIR, `${id}.${lang}.json`);
    if (!fs.existsSync(contentPath)) { console.error(`FALTA content: ${id}.${lang}.json`); continue; }
    const content = JSON.parse(fs.readFileSync(contentPath, "utf-8"));
    const title = stripTags(content.h1);
    const excerpt = stripTags(content.sub).slice(0, 200);
    const hero = resolveHero(id, lang);
    const date = c.netNew ? NOW : dateFor(id, lang);
    const cat = CATEGORY[lang];
    const r = await upsertRow({ slug: c[lang].slug, lang, title, excerpt, hero, date, status: c.status, catSlug: cat.slug, catName: cat.name });
    results.push(r);
    console.log(`${DRY ? "[dry] " : ""}${r.action.padEnd(6)} ${r.status.padEnd(9)} ${lang}  ${c[lang].slug}`);
  }
}
console.log(`\nTotal: ${results.length} filas ${DRY ? "(dry-run, sin escribir)" : "escritas"}`);
