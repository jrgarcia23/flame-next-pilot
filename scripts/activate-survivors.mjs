#!/usr/bin/env node
// Activa los 387 supervivientes del filtro D del agente SEO:
// mueve de blog-archive.json → blog.json (status: published)
import fs from "node:fs";

const survivors = JSON.parse(fs.readFileSync("/tmp/flame-migration/drafts-filter-d-survivors.json"));
const blog = JSON.parse(fs.readFileSync("data/blog.json"));
const archive = JSON.parse(fs.readFileSync("data/blog-archive.json"));

// Index supervivientes por id
const surviveIds = new Set(survivors.map(s => s.id));
console.log(`Supervivientes filtro D: ${surviveIds.size}`);

// Extraer del archive los que sobreviven
const toActivate = archive.drafts.filter(d => surviveIds.has(d.id));
const toKeepArchived = archive.drafts.filter(d => !surviveIds.has(d.id));

console.log(`A activar (extraídos de archive): ${toActivate.length}`);
console.log(`Quedan en archive:               ${toKeepArchived.length}`);

// Anomalías: supervivientes que NO estaban en archive (slug vacío, ya publicado, etc)
const archiveIds = new Set(archive.drafts.map(d => d.id));
const notInArchive = survivors.filter(s => !archiveIds.has(s.id));
if (notInArchive.length > 0) {
  console.log(`⚠ ${notInArchive.length} supervivientes no localizados en archive:`);
  for (const n of notInArchive.slice(0,10)) {
    console.log(`   id=${n.id} ${n.lang}/${n.slug} title='${n.title?.slice(0,40)}'`);
  }
}

// Marcar como publicados y añadir a blog.json
for (const d of toActivate) {
  d.status = "published";
}

// Mergear (sin duplicar por id+lang+slug)
const existingKeys = new Set(blog.posts.map(p => `${p.lang}/${p.slug}`));
const newOnes = toActivate.filter(d => !existingKeys.has(`${d.lang}/${d.slug}`));
const collisions = toActivate.length - newOnes.length;
if (collisions > 0) console.log(`⚠ Colisiones con publicados (omitidos): ${collisions}`);

blog.posts.push(...newOnes);
blog.generated_at = new Date().toISOString().slice(0,10);

// Reescribir archive sin los activados
archive.drafts = toKeepArchived;
archive.generated_at = new Date().toISOString().slice(0,10);

fs.writeFileSync("data/blog.json", JSON.stringify(blog, null, 0));
fs.writeFileSync("data/blog-archive.json", JSON.stringify(archive, null, 0));

console.log(`\n✓ data/blog.json: ${blog.posts.length} posts (525 antes + ${newOnes.length} nuevos)`);
console.log(`✓ data/blog-archive.json: ${archive.drafts.length} drafts archivados`);
console.log(`\nPor idioma blog.json:`);
console.log(`  ES posts: ${blog.posts.filter(p=>p.lang==='es').length}`);
console.log(`  EN posts: ${blog.posts.filter(p=>p.lang==='en').length}`);
