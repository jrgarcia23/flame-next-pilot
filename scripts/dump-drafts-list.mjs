#!/usr/bin/env node
// Dump del listado completo de los 1.300 drafts (ES + EN) sin contenido,
// solo slug+title+date+link. Para la auditoría GSC/GA4 posterior.
import fs from "node:fs";
const AUTH = "Basic " + Buffer.from("jrgarcia:kZy9 iGqX 0BLk W8HO InwR p0LA").toString("base64");
const API = "https://flameanalytics.com/wp-json/wp/v2";
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getJson(url) {
  const r = await fetch(url, { headers: { Authorization: AUTH }});
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function dump(lang) {
  const all = [];
  let page = 1;
  while (true) {
    const url = `${API}/posts?per_page=100&status=draft&wpml_language=${lang}&page=${page}&_fields=id,slug,date,modified,title,link,categories`;
    let chunk;
    try { chunk = await getJson(url); } catch (e) { console.error(`  page ${page}: ${e.message}`); break; }
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    all.push(...chunk.map(p => ({
      id: p.id, slug: p.slug, date: p.date, modified: p.modified,
      title: p.title?.rendered || "",
      link: p.link,
      categories: p.categories || [],
      lang
    })));
    process.stdout.write(`  ${lang} page ${page} +${chunk.length} (total ${all.length})\n`);
    if (chunk.length < 100) break;
    page++;
    await sleep(150);
  }
  return all;
}

const allDrafts = [];
for (const lang of ["es", "en"]) {
  console.log(`--- DRAFTS ${lang.toUpperCase()} ---`);
  const d = await dump(lang);
  allDrafts.push(...d);
}
fs.writeFileSync("/tmp/flame-migration/drafts-all.json", JSON.stringify(allDrafts, null, 0));
console.log(`\n✓ /tmp/flame-migration/drafts-all.json — ${allDrafts.length} drafts`);
