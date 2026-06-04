#!/usr/bin/env node
// Normaliza los 1.300 drafts → data/blog-archive.json
// Mismo schema que blog.json + flag status:"draft"
import fs from "node:fs";

const raw = JSON.parse(fs.readFileSync("/tmp/flame-migration/wp-drafts-full.json"));
const published = JSON.parse(fs.readFileSync("data/blog.json"));

// Cats del sync de publicados
const catBySlug = {};
const published_full = JSON.parse(fs.readFileSync("/tmp/flame-migration/wp-published-full.json"));
for (const lang of ["es","en"]) {
  for (const c of published_full.categories[lang] || []) {
    catBySlug[c.id] = { slug: c.slug, name: c.name, lang };
  }
}

function decodeEntities(s){
  return s
    .replace(/&#8217;/g,"'").replace(/&#8216;/g,"'")
    .replace(/&#8220;/g,'"').replace(/&#8221;/g,'"')
    .replace(/&#8211;/g,"–").replace(/&#8212;/g,"—")
    .replace(/&#8230;/g,"…").replace(/&hellip;/g,"…")
    .replace(/&amp;/g,"&").replace(/&nbsp;/g," ")
    .replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"');
}
function stripWrappers(html){
  if (!html) return "";
  let h = html;
  h = h.replace(/<div[^>]*class="[^"]*elementor[^"]*"[^>]*>/g, '<div>');
  h = h.replace(/<section[^>]*class="[^"]*elementor[^"]*"[^>]*>/g, '<section>');
  h = h.replace(/\sdata-[a-z-]+="[^"]*"/g, '');
  h = h.replace(/https?:\/\/(www\.)?flameanalytics\.com/g, '');
  h = h.replace(/\sclass=""/g, '').replace(/\sid=""/g, '');
  return h;
}
function pickCategory(post){
  if (!post.categories || !post.categories.length) return { slug: "blog", name: "Blog" };
  const cat = catBySlug[post.categories[0]];
  if (cat) return { slug: cat.slug, name: cat.name };
  return { slug: "blog", name: "Blog" };
}
function pickHero(post){
  const m = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (m) return m.replace(/https?:\/\/(www\.)?flameanalytics\.com/, "");
  const img = post.content?.rendered?.match(/<img[^>]+src="([^"]+)"/);
  if (img) return img[1].replace(/https?:\/\/(www\.)?flameanalytics\.com/, "");
  return "";
}

function processDraft(post, lang) {
  const titleRaw = post.title?.rendered || "";
  const title = decodeEntities(titleRaw.replace(/<[^>]+>/g, ""));
  const contentRaw = post.content?.rendered || "";
  const html = stripWrappers(contentRaw);
  const excerptRaw = post.excerpt?.rendered || "";
  const excerpt = decodeEntities(excerptRaw.replace(/<[^>]+>/g, "")).trim();
  return {
    id: post.id,
    slug: post.slug,
    lang,
    type: "post",
    status: "draft",            // ← flag: NO se sirve en /es/<slug>/ por defecto
    title,
    excerpt: excerpt.slice(0, 240),
    html,
    date: post.date,
    modified: post.modified,
    hero: pickHero(post),
    category: pickCategory(post),
    link_legacy: post.link,
  };
}

const archive = { generated_at: new Date().toISOString().slice(0,10), drafts: [] };
for (const lang of ["es","en"]) {
  for (const p of raw.drafts[lang]) {
    if (!p.slug) continue;            // skip Elementor #N sin slug
    archive.drafts.push(processDraft(p, lang));
  }
}

// Conflictos vs publicados (mismo slug+lang) — quitar el draft, gana publish
const pubSlugs = new Set();
for (const p of published.posts) pubSlugs.add(`${p.lang}/${p.slug}`);
const before = archive.drafts.length;
archive.drafts = archive.drafts.filter(d => !pubSlugs.has(`${d.lang}/${d.slug}`));
const removedConflicts = before - archive.drafts.length;

fs.writeFileSync("data/blog-archive.json", JSON.stringify(archive, null, 0));
const size = (fs.statSync("data/blog-archive.json").size / 1024 / 1024).toFixed(2);
console.log(`✓ data/blog-archive.json (${size} MB)`);
console.log(`  ES drafts: ${archive.drafts.filter(d => d.lang==='es').length}`);
console.log(`  EN drafts: ${archive.drafts.filter(d => d.lang==='en').length}`);
console.log(`  TOTAL drafts: ${archive.drafts.length}`);
console.log(`  Conflictos slug vs publicados (eliminados): ${removedConflicts}`);
console.log(`  Sin-slug (skipped Elementor): ${(raw.drafts.es.length + raw.drafts.en.length) - before}`);
