#!/usr/bin/env node
// Descarga TODOS los drafts (1.300) con su HTML completo.
// Genera data/blog-archive.json (NO se publica por defecto — flag status:"draft")
import fs from "node:fs";
const AUTH = "Basic " + Buffer.from("jrgarcia:kZy9 iGqX 0BLk W8HO InwR p0LA").toString("base64");
const API = "https://flameanalytics.com/wp-json/wp/v2";
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getJson(url) {
  const r = await fetch(url, { headers: { Authorization: AUTH }});
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function paginate(lang) {
  const all = [];
  let page = 1;
  while (true) {
    const url = `${API}/posts?per_page=100&status=draft&wpml_language=${lang}&page=${page}&_embed=1`;
    let chunk;
    try { chunk = await getJson(url); } catch (e) { console.error(`  ERR p${page}: ${e.message}`); break; }
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    all.push(...chunk);
    process.stdout.write(`  ${lang} page ${page} +${chunk.length} (total ${all.length})\n`);
    if (chunk.length < 100) break;
    page++;
    await sleep(250);
  }
  return all;
}

console.log("=== SYNC WP DRAFTS — Flame (1.300 posts con HTML completo) ===\n");
const out = { generated_at: new Date().toISOString().slice(0,10), drafts: { es: [], en: [] }};
for (const lang of ["es", "en"]) {
  console.log(`--- ${lang.toUpperCase()} ---`);
  out.drafts[lang] = await paginate(lang);
}
fs.writeFileSync("/tmp/flame-migration/wp-drafts-full.json", JSON.stringify(out, null, 0));
const size = (fs.statSync("/tmp/flame-migration/wp-drafts-full.json").size / 1024 / 1024).toFixed(1);
console.log(`\n✓ /tmp/flame-migration/wp-drafts-full.json (${size} MB)`);
console.log(`  ES drafts: ${out.drafts.es.length}`);
console.log(`  EN drafts: ${out.drafts.en.length}`);
console.log(`  TOTAL: ${out.drafts.es.length + out.drafts.en.length}`);
