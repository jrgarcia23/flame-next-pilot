#!/usr/bin/env node
// Sync los 525 posts publicados de flameanalytics.com a flame-next.
// 290 ES + 235 EN + 25 whitepapers + sus categorías.
import fs from "node:fs";
const AUTH = "Basic " + Buffer.from("jrgarcia:kZy9 iGqX 0BLk W8HO InwR p0LA").toString("base64");
const API = "https://flameanalytics.com/wp-json/wp/v2";
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function getJson(url) {
  const r = await fetch(url, { headers: { Authorization: AUTH }});
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}

async function paginate(endpoint, lang, status = "publish") {
  const all = [];
  let page = 1;
  while (true) {
    const url = `${API}/${endpoint}?per_page=100&status=${status}&wpml_language=${lang}&page=${page}&_embed=1`;
    let chunk;
    try { chunk = await getJson(url); } catch (e) { console.error(`  page ${page}: ${e.message}`); break; }
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    all.push(...chunk);
    process.stdout.write(`  ${endpoint}/${lang}/${status} page ${page} +${chunk.length} (total ${all.length})\n`);
    if (chunk.length < 100) break;
    page++;
    await sleep(200);
  }
  return all;
}

async function main() {
  console.log("=== SYNC WP PUBLISHED — Flame ===\n");
  const out = { generated_at: new Date().toISOString().slice(0,10), posts: { es: [], en: [] }, pages: { es: [], en: [] }, whitepapers: { es: [], en: [] } };

  for (const lang of ["es", "en"]) {
    console.log(`\n--- ${lang.toUpperCase()} posts ---`);
    out.posts[lang] = await paginate("posts", lang);
    console.log(`--- ${lang.toUpperCase()} pages ---`);
    out.pages[lang] = await paginate("pages", lang);
    console.log(`--- ${lang.toUpperCase()} whitepapers ---`);
    out.whitepapers[lang] = await paginate("whitepaper", lang);
  }

  console.log("\n--- categories ---");
  const catsEs = await getJson(`${API}/categories?per_page=100&wpml_language=es&_fields=id,name,slug,count`);
  const catsEn = await getJson(`${API}/categories?per_page=100&wpml_language=en&_fields=id,name,slug,count`);
  out.categories = { es: catsEs, en: catsEn };

  fs.writeFileSync("/tmp/flame-migration/wp-published-full.json", JSON.stringify(out, null, 0));
  console.log(`\n✓ guardado: /tmp/flame-migration/wp-published-full.json`);
  console.log(`  ES posts:        ${out.posts.es.length}`);
  console.log(`  EN posts:        ${out.posts.en.length}`);
  console.log(`  ES pages:        ${out.pages.es.length}`);
  console.log(`  EN pages:        ${out.pages.en.length}`);
  console.log(`  ES whitepapers:  ${out.whitepapers.es.length}`);
  console.log(`  EN whitepapers:  ${out.whitepapers.en.length}`);
  console.log(`  TOTAL: ${out.posts.es.length + out.posts.en.length + out.whitepapers.es.length + out.whitepapers.en.length} posts/wp`);
}
main().catch(e => { console.error(e); process.exit(1); });
