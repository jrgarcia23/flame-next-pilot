#!/usr/bin/env node
// Normaliza los 525 posts publicados:
// - Limpia HTML (strip Elementor wrappers, fix image URLs, normaliza enlaces internos)
// - Genera data/blog.json con todo lo necesario para Next: slug, title, html, excerpt,
//   date, modified, hero, categoria, lang, status
import fs from "node:fs";

const raw = JSON.parse(fs.readFileSync("/tmp/flame-migration/wp-published-full.json"));

// Categoría humana ES + EN según ID de cat WP. Trabajo solo con cat principal.
// Se obtiene del slug de la primera cat.
const catBySlug = {};
for (const lang of ["es","en"]) {
  for (const c of raw.categories[lang] || []) {
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
  // Strip Elementor wrappers básicos
  h = h.replace(/<div[^>]*class="[^"]*elementor[^"]*"[^>]*>/g, '<div>');
  h = h.replace(/<section[^>]*class="[^"]*elementor[^"]*"[^>]*>/g, '<section>');
  // Quitar data-* attrs
  h = h.replace(/\sdata-[a-z-]+="[^"]*"/g, '');
  // Quitar style inline (mantenemos clases para el render)
  // h = h.replace(/\sstyle="[^"]*"/g, '');
  // Convertir enlaces absolutos flameanalytics.com → relativos
  h = h.replace(/https?:\/\/(www\.)?flameanalytics\.com/g, '');
  // Limpiar attrs vacíos
  h = h.replace(/\sclass=""/g, '');
  h = h.replace(/\sid=""/g, '');
  return h;
}

function pickCategory(post, lang){
  if (!post.categories || !post.categories.length) return { slug: "blog", name: "Blog" };
  const cat = catBySlug[post.categories[0]];
  if (cat) return { slug: cat.slug, name: cat.name };
  return { slug: "blog", name: "Blog" };
}

function pickHero(post){
  // _embedded.wp:featuredmedia[0].source_url (si lo trae)
  const m = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (m) return m.replace(/https?:\/\/(www\.)?flameanalytics\.com/, "");
  // Buscar primera imagen en el content
  const img = post.content?.rendered?.match(/<img[^>]+src="([^"]+)"/);
  if (img) return img[1].replace(/https?:\/\/(www\.)?flameanalytics\.com/, "");
  return "";
}

function processPost(post, lang, type){
  const titleRaw = post.title?.rendered || "";
  const title = decodeEntities(titleRaw.replace(/<[^>]+>/g, ""));
  const contentRaw = post.content?.rendered || "";
  const html = stripWrappers(contentRaw);
  const excerptRaw = post.excerpt?.rendered || "";
  const excerpt = decodeEntities(excerptRaw.replace(/<[^>]+>/g, "")).trim();
  const cat = pickCategory(post, lang);
  return {
    id: post.id,
    slug: post.slug,
    lang,
    type, // "post" | "whitepaper" | "page"
    title,
    excerpt: excerpt.slice(0, 240),
    html,
    date: post.date,
    modified: post.modified,
    hero: pickHero(post),
    category: cat,
    link_legacy: post.link, // URL viva en flameanalytics.com (para 1:1 mapping)
  };
}

const out = { generated_at: new Date().toISOString().slice(0,10), posts: [], pages: [], whitepapers: [] };
for (const lang of ["es","en"]) {
  for (const p of raw.posts[lang]) out.posts.push(processPost(p, lang, "post"));
  for (const p of raw.pages[lang]) out.pages.push(processPost(p, lang, "page"));
  for (const p of raw.whitepapers[lang]) out.whitepapers.push(processPost(p, lang, "whitepaper"));
}

fs.writeFileSync("data/blog.json", JSON.stringify(out, null, 0));
const size = (fs.statSync("data/blog.json").size / 1024 / 1024).toFixed(2);
console.log(`✓ data/blog.json (${size} MB)`);
console.log(`  posts: ${out.posts.length}`);
console.log(`  pages: ${out.pages.length}`);
console.log(`  whitepapers: ${out.whitepapers.length}`);

// Check colisiones slug entre ES y EN o entre posts/pages
const slugMap = {};
const all = [...out.posts, ...out.pages, ...out.whitepapers];
for (const p of all) {
  const k = `${p.lang}/${p.slug}`;
  if (slugMap[k]) {
    console.log(`  ⚠ COLLISION: ${k} (${slugMap[k].type} vs ${p.type})`);
  }
  slugMap[k] = p;
}
console.log(`  slugs únicos (lang+slug): ${Object.keys(slugMap).length}`);
