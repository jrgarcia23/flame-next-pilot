#!/usr/bin/env node
// llms-gen: genera llms.txt (índice, formato llmstxt.org) y llms-full.txt (contenido completo en
// Markdown) a partir de lo PUBLICADO en la web: sitemap + HTML de cada página (o WP REST).
// Sin dependencias (Node 18+). Una sola fuente de verdad: lo que la web ya dice.
//
// Uso:  node llms-gen.mjs --config llms.config.json [--out dir] [--date AAAA-MM-DD] [--soft]
//   --soft   si algo falla (red, sitemap), avisa y sale con 0 sin tocar los archivos existentes
//            (pensado para prebuild: un fallo de red nunca rompe el build ni borra el archivo).
//
// Reglas (postura 13-nov-2026, seo-specialist geo-llmo §3): generado, con fecha, sin datos
// internos, sin instrucciones dirigidas a IAs, sin afirmaciones que no estén en la web. Las
// frases que choquen con las restricciones de marca del cliente se QUITAN (dropSentences), no se
// reescriben.
//
// Copia canónica: esconzeta-mc/_motor/scripts/llms/llms-gen.mjs. Cada repo lleva una copia en
// scripts/llms/ (Vercel no ve esconzeta-mc). Si cambias el motor, cambia también las copias.

import fs from 'node:fs';
import path from 'node:path';

const VERSION = '1.0.0';
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SOFT = args.includes('--soft');

const cfgPath = arg('--config', 'llms.config.json');
const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
const OUT = path.resolve(path.dirname(cfgPath), arg('--out', cfg.output || '.'));
const DATE = arg('--date', new Date().toISOString().slice(0, 10));
const SITE = cfg.site.replace(/\/$/, '');
const UA = cfg.userAgent || 'Mozilla/5.0 (compatible; llms-gen/1.0; +' + SITE + '/llms.txt)';
const L = {
  es: { updated: 'Actualizado', summaryOf: 'Resumen del contenido publicado en', fullOf: 'Contenido publicado en', fullJoin: 'reunido en un solo archivo.', contact: 'Contacto', web: 'Web', phone: 'Teléfono', email: 'Correo', address: 'Dirección', social: 'Perfiles', faq: 'Preguntas frecuentes', blog: 'Blog', published: 'Publicado', optional: 'Optional', fullFile: 'Todo el contenido de la web en un solo archivo Markdown', trust: 'Páginas legales y de confianza', pages: 'Páginas', about: 'Quién es', source: 'URL' },
  en: { updated: 'Updated', summaryOf: 'Summary of the content published at', fullOf: 'Content published at', fullJoin: 'collected in a single file.', contact: 'Contact', web: 'Website', phone: 'Phone', email: 'Email', address: 'Address', social: 'Profiles', faq: 'Frequently asked questions', blog: 'Blog', published: 'Published', optional: 'Optional', fullFile: 'All the website content in a single Markdown file', trust: 'Legal and trust pages', pages: 'Pages', about: 'About', source: 'URL' },
}[cfg.lang || 'es'];

const re = s => new RegExp(s, 'i');
const pathOf = u => { try { const x = new URL(u); return x.pathname + (x.search || ''); } catch { return u; } };
const log = (...a) => console.error('[llms-gen]', ...a);
function fail(msg) {
  if (SOFT) { log('AVISO (se conservan los archivos existentes):', msg); process.exit(0); }
  log('ERROR:', msg); process.exit(1);
}

// ─── red ─────────────────────────────────────────────────────────────────────
// fetchBase: leer de otra dirección (p. ej. *.vercel.app) cuando el dominio no responde, sin cambiar las URLs del archivo
const FETCH_BASE = cfg.fetchBase ? cfg.fetchBase.replace(/\/$/, '') : null;
const toFetch = u => FETCH_BASE && u.startsWith(SITE) ? FETCH_BASE + u.slice(SITE.length) : u;
async function get(url, { tries = 2, accept = 'text/html,application/xhtml+xml,application/xml,*/*' } = {}) {
  for (let t = 1; t <= tries; t++) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), cfg.timeoutMs || 20000);
      const r = await fetch(toFetch(url), { headers: { 'user-agent': UA, accept, 'accept-language': cfg.lang || 'es' }, redirect: 'manual', signal: ctl.signal });
      clearTimeout(timer);
      const body = r.status === 200 ? await r.text() : '';
      return { status: r.status, body, headers: r.headers, location: r.headers.get('location') };
    } catch (e) {
      if (t === tries) return { status: 0, body: '', error: String(e) };
      await new Promise(res => setTimeout(res, 1500));
    }
  }
}
async function pool(items, n, fn) {
  const out = new Array(items.length); let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k); } }));
  return out;
}

// ─── HTML → texto/Markdown ───────────────────────────────────────────────────
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–', laquo: '«', raquo: '»', iexcl: '¡', iquest: '¿', ordf: 'ª', ordm: 'º', euro: '€', copy: '©', reg: '®', trade: '™', middot: '·', bull: '•', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', deg: '°', aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ', Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú', Ntilde: 'Ñ', uuml: 'ü', Uuml: 'Ü', times: '×', shy: '' };
const decode = s => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENT[e] ?? m));
const INLINE = 'span|strong|em|b|i|a|small|sup|sub|mark|abbr|code|u|s|time|label';
const clean = s => decode(String(s || '').replace(/<br\s*\/?>/gi, ' ').replace(new RegExp(`<\\/?(${INLINE})\\b[^>]*>`, 'gi'), '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').replace(/\s+([,.;:!?…»)])/g, '$1').replace(/([«(¿¡])\s+/g, '$1').trim();

function attr(tag, name) { const m = tag.match(new RegExp(name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')', 'i')); return m ? decode(m[2] ?? m[3]) : null; }
function meta(html, key) {
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const t = m[0]; const k = (attr(t, 'name') || attr(t, 'property') || '').toLowerCase();
    if (k === key) return attr(t, 'content');
  }
  return null;
}
function linkRel(html, rel) {
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) if ((attr(m[0], 'rel') || '').toLowerCase().split(/\s+/).includes(rel)) return attr(m[0], 'href');
  return null;
}
function jsonLd(html) {
  const out = [];
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { const j = JSON.parse(m[1].trim()); const flat = x => Array.isArray(x) ? x.flatMap(flat) : x && x['@graph'] ? flat(x['@graph']) : [x]; out.push(...flat(j)); } catch { /* JSON-LD roto: se ignora */ }
  }
  return out.filter(Boolean);
}
const typeOf = o => [].concat(o['@type'] || []).map(String);

function stripBlocks(html, tags) {
  let h = html;
  for (const t of tags) h = h.replace(new RegExp(`<${t}\\b[^>]*>[\\s\\S]*?<\\/${t}>`, 'gi'), ' ');
  return h;
}
function region(html) {
  let h = html.replace(/<!--[\s\S]*?-->/g, ' ');
  h = stripBlocks(h, ['script', 'style', 'noscript', 'template', 'svg', 'iframe', 'select', 'textarea']);
  if (cfg.contentSelector) {
    const re = new RegExp(`<([a-z0-9]+)\\b[^>]*${cfg.contentSelector}[^>]*>`, 'i');
    const m = h.match(re);
    if (m) { h = h.slice(m.index); }
  }
  const main = h.match(/<main\b[^>]*>([\s\S]*)<\/main>/i);
  if (main) h = main[1]; else { const b = h.match(/<body\b[^>]*>([\s\S]*)<\/body>/i); if (b) h = b[1]; }
  h = stripBlocks(h, ['nav', 'header', 'footer', 'form', 'aside', 'button', 'dialog']);
  for (const sel of cfg.stripSelectors || []) {
    // quita un bloque de nivel: <tag ... sel ...>…</tag> (no anidado del mismo tag; suficiente para banners)
    h = h.replace(new RegExp(`<([a-z0-9]+)\\b[^>]*${sel}[^>]*>[\\s\\S]*?<\\/\\1>`, 'gi'), ' ');
  }
  return h;
}
function toMarkdown(html) {
  let h = region(html);
  h = h.replace(new RegExp(`<\\/?(${INLINE})\\b[^>]*>`, 'gi'), '');
  h = h.replace(/<br\s*\/?>/gi, '\n');
  h = h.replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (m, n, t) => `\n\n${'#'.repeat(Math.min(6, Number(n) + 2))} ${clean(t)}\n\n`);
  h = h.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (m, t) => `\n- ${clean(t)}\n`);
  h = h.replace(/<(td|th)\b[^>]*>([\s\S]*?)<\/\1>/gi, (m, x, t) => ` ${clean(t)} |`);
  h = h.replace(/<tr\b[^>]*>/gi, '\n|');
  h = h.replace(/<\/(p|div|section|article|blockquote|tr|table|ul|ol|dl|dd|dt|figure|figcaption)>/gi, '\n\n');
  h = h.replace(/<(p|div|section|article|blockquote|dd|dt)\b[^>]*>/gi, '\n\n');
  const text = decode(h.replace(/<[^>]+>/g, ' '));
  const lines = text.split('\n').map(l => l.replace(/[ \t\u00a0]+/g, ' ').replace(/\s+([,.;:!?…»)])/g, '$1').trim());
  const out = [];
  for (const l of lines) {
    if (!l) { if (out.length && out[out.length - 1] !== '') out.push(''); continue; }
    if (/^\|[\s|]*$/.test(l)) continue;
    if (/^- ?$/.test(l) || /^#+\s*$/.test(l)) continue;
    if (l.length < 3 || /^0?\d[\s.]*$/.test(l) || /^[\s→←↓↑·|-]+$/.test(l) || /^(scroll|scroll down|desliza|ver más|leer más|read more|more|menu|menú)$/i.test(l)) continue;
    if (out.length && out[out.length - 1] === l) continue; // repetición inmediata (carruseles)
    out.push(l);
  }
  return out.join('\n').replace(/(https?:\/\/[^\s/]+) (\/\S+)/g, '$1$2').replace(/\n{3,}/g, '\n\n').trim();
}

// ─── filtros de marca / términos ─────────────────────────────────────────────
const dropRes = (cfg.dropSentences || []).map(r => new RegExp(r, 'i'));
const dropScope = cfg.dropScope ? re(cfg.dropScope) : null;
function applyDrops(text, url) {
  if (!text || !dropRes.length) return text;
  if (url && dropScope && !dropScope.test(pathOf(url))) return text;
  return text.split('\n').map(line => {
    if (!dropRes.some(r => r.test(line))) return line;
    // quita solo las frases que chocan; si la línea entera choca, fuera
    const parts = line.split(/(?<=[.!?])\s+/);
    const keep = parts.filter(p => !dropRes.some(r => r.test(p)));
    return keep.join(' ');
  }).filter(l => l.trim() !== '' || true).join('\n').replace(/\n{3,}/g, '\n\n');
}

// ─── sitemap ─────────────────────────────────────────────────────────────────
async function sitemapUrls(url, seen = new Set()) {
  if (seen.has(url)) return []; seen.add(url);
  const r = await get(url, { accept: 'application/xml,text/xml,*/*' });
  if (r.status !== 200) { log('sitemap', url, '→', r.status); return []; }
  const locs = [...r.body.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map(m => decode(m[1]));
  if (/<sitemapindex/i.test(r.body)) {
    const subs = locs.filter(u => !(cfg.skipSitemaps || []).some(s => new RegExp(s, 'i').test(u)));
    return (await pool(subs, 3, u => sitemapUrls(u, seen))).flat();
  }
  const lastmods = [...r.body.matchAll(/<url>([\s\S]*?)<\/url>/gi)].map(m => ({ loc: decode((m[1].match(/<loc>\s*([^<\s]+)/i) || [])[1] || ''), lastmod: (m[1].match(/<lastmod>\s*([^<\s]+)/i) || [])[1] || null }));
  return lastmods.filter(x => x.loc).map(x => ({ ...x, sm: url }));
}

// ─── fuentes ─────────────────────────────────────────────────────────────────
const included = u => {
  const p = pathOf(u);
  if (!u.startsWith(SITE)) return false;
  if ((cfg.include || []).length && !cfg.include.some(r => re(r).test(p))) return false;
  if ((cfg.exclude || []).some(r => re(r).test(p))) return false;
  return true;
};
const sameUrl = (a, b) => a.replace(/\/$/, '').toLowerCase() === b.replace(/\/$/, '').toLowerCase();

async function readPage(entry) {
  const r = await get(entry.loc);
  if (r.status !== 200) return { url: entry.loc, skip: `HTTP ${r.status}${r.location ? ' → ' + r.location : ''}` };
  const html = r.body;
  const robots = ((meta(html, 'robots') || '') + ' ' + (r.headers.get('x-robots-tag') || '')).toLowerCase();
  if (/noindex/.test(robots) && !(cfg.keepNoindex || []).some(r => re(r).test(pathOf(entry.loc)))) return { url: entry.loc, skip: 'noindex' };
  const canon = linkRel(html, 'canonical');
  if (canon && cfg.respectCanonical !== false) {
    const abs = new URL(canon, entry.loc).href;
    if (!sameUrl(abs, entry.loc)) return { url: entry.loc, skip: 'canonical → ' + abs };
  }
  const ld = jsonLd(html);
  const titleTag = clean((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]);
  const h1 = clean((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]);
  let title = (cfg.titleFrom === 'title' ? titleTag : (h1 || meta(html, 'og:title') || titleTag)) || entry.loc;
  for (const s of cfg.titleStrip || []) title = title.replace(re(s), '').trim();
  const art = ld.find(o => typeOf(o).some(t => /Article|BlogPosting|NewsArticle/.test(t)));
  const date = (meta(html, 'article:published_time') || art?.datePublished || '').slice(0, 10) || null;
  const desc = clean(meta(html, 'description') || meta(html, 'og:description') || '');
  return { url: entry.loc, sm: entry.sm, lastmod: entry.lastmod, title: clean(title), h1, desc, date, ld, md: toMarkdown(html) };
}

async function wpPages() {
  // WordPress: WP REST de SOLO LECTURA (GET). Contenido sin la plantilla del tema.
  const types = cfg.wp.types || ['pages', 'posts'];
  const out = [];
  for (const type of types) {
    for (let page = 1; page < 50; page++) {
      const u = `${SITE}/wp-json/wp/v2/${type}?per_page=100&page=${page}&status=publish&_fields=link,title,excerpt,content,date,modified,yoast_head_json${cfg.wp.lang ? '&lang=' + cfg.wp.lang : ''}`;
      const r = await get(u, { accept: 'application/json' });
      if (r.status !== 200) break;
      let arr; try { arr = JSON.parse(r.body); } catch { break; }
      if (!arr.length) break;
      for (const p of arr) {
        const y = p.yoast_head_json || {};
        const robots = y.robots ? Object.values(y.robots).join(' ') : '';
        if (/noindex/.test(robots)) continue;
        const link = p.link;
        if (y.canonical && !sameUrl(y.canonical, link)) continue;
        out.push({ url: link, type, title: clean(p.title?.rendered), desc: clean(y.description || y.og_description || p.excerpt?.rendered || ''), date: type === 'posts' ? (p.date || '').slice(0, 10) : null, lastmod: (p.modified || '').slice(0, 10), md: toMarkdown('<main>' + (p.content?.rendered || '') + '</main>'), ld: [] });
      }
      if (arr.length < 100) break;
    }
  }
  return out;
}

// ─── principal ───────────────────────────────────────────────────────────────
async function main() {
  let pages = [];
  const skipped = [];
  if (cfg.wp) {
    pages = (await wpPages()).filter(p => included(p.url));
    if (cfg.sitemap) {   // solo lo que el sitemap declara (deja fuera borradores viejos, pruebas y duplicados)
      const inSm = new Set();
      for (const sm of [].concat(cfg.sitemap)) for (const e of await sitemapUrls(sm)) inSm.add(e.loc.replace(/\/$/, '').toLowerCase());
      const before = pages.length;
      pages = pages.filter(p => inSm.has(p.url.replace(/\/$/, '').toLowerCase()) || ((p.skipped = 'fuera del sitemap') && skipped.push({ url: p.url, skip: 'fuera del sitemap' }) && false));
      log(`WP REST: ${before} publicadas, ${pages.length} en el sitemap`);
    }
    // cada URL tiene que responder 200 sin redirección (Yoast lista páginas que el plugin de redirecciones manda a otra)
    const st = await pool(pages, cfg.concurrency || 4, async p => (await get(p.url, { tries: 2 })).status);
    pages = pages.filter((p, i) => st[i] === 200 || (skipped.push({ url: p.url, skip: 'HTTP ' + st[i] }) && false));
    // la portada y las páginas de confianza salen del HTML (JSON-LD de organización)
    const home = await readPage({ loc: SITE + (cfg.homePath || '/') });
    if (!home.skip) pages.unshift({ ...home, isHome: true, md: home.md });
  } else {
    const entries = [];
    for (const sm of [].concat(cfg.sitemap || SITE + '/sitemap.xml')) entries.push(...await sitemapUrls(sm));
    const uniq = new Map();
    for (const e of entries) if (included(e.loc) && !uniq.has(e.loc)) uniq.set(e.loc, e);
    for (const extra of cfg.extraUrls || []) if (!uniq.has(SITE + extra)) uniq.set(SITE + extra, { loc: SITE + extra, lastmod: null });
    if (!uniq.size) fail('el sitemap no devolvió ninguna URL incluible');
    log(uniq.size, 'URLs del sitemap; leyendo…');
    const res = await pool([...uniq.values()], cfg.concurrency || 4, readPage);
    for (const p of res) (p.skip ? skipped.push(p) : pages.push(p));
  }
  if (!pages.length) fail('ninguna página legible');
  const homeUrl = SITE + (cfg.homePath || '/');
  const home = pages.find(p => p.isHome || sameUrl(p.url, homeUrl)) || pages[0];
  home.isHome = true;

  // boilerplate: líneas que se repiten en muchas páginas (CTA, banners) fuera, salvo en la portada
  const freq = new Map();
  for (const p of pages) for (const l of new Set(p.md.split('\n').filter(x => x.length > 2))) freq.set(l, (freq.get(l) || 0) + 1);
  const thr = Math.max(3, Math.ceil(pages.length * (cfg.boilerplateRatio || 0.3)));
  const boiler = new Set([...freq].filter(([, n]) => n >= thr).map(([l]) => l));
  for (const p of pages) {
    if (!p.isHome) p.md = p.md.split('\n').filter(l => !boiler.has(l) || /^#/.test(l) && false).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    p.md = applyDrops(p.md, p.url); p.desc = applyDrops(p.desc, p.url); p.title = applyDrops(p.title, p.url).trim() || applyDrops(p.h1 || '', p.url).trim() || pathOf(p.url);
    const max = cfg.maxCharsPerPage || 6000;
    if (p.md.length > max) { const cut = p.md.slice(0, max); p.md = cut.slice(0, Math.max(cut.lastIndexOf('\n\n'), max * 0.6)).trim() + '\n\n[…]'; }
  }

  // URLs sueltas dentro del texto: las del propio dominio que no den 200 se quitan (el archivo no puede llevar enlaces rotos)
  {
    const own = new URL(SITE).host.replace(/^www\./, '');
    const urls = new Set();
    for (const p of pages) for (const m of p.md.matchAll(/https?:\/\/[^\s)<>\]"'`»″]+/g)) { const u = m[0].replace(/[.,;:]+$/, ''); try { if (new URL(u).host.replace(/^www\./, '') === own) urls.add(u); } catch { urls.add(u); } }
    const list = [...urls]; const st = await pool(list, cfg.concurrency || 4, async u => { try { return (await get(u, { tries: 1 })).status; } catch { return 0; } });
    const bad = new Set(list.filter((u, i) => st[i] !== 200));
    if (bad.size) { log(bad.size, 'URLs rotas o redirigidas dentro del texto: se quitan'); for (const p of pages) p.md = p.md.replace(/https?:\/\/[^\s)<>\]"'`»″]+/g, m => bad.has(m.replace(/[.,;:]+$/, '')) ? '' : m).replace(/[″]/g, ''); }
  }

  // organización y FAQ (JSON-LD publicado en la web)
  const allLd = pages.flatMap(p => p.ld || []);
  const org = allLd.find(o => typeOf(o).some(t => (cfg.orgTypes || ['Organization', 'LocalBusiness', 'Corporation', 'ProfessionalService', 'MedicalBusiness', 'Store', 'OnlineStore', 'Pharmacy', 'MedicalClinic', 'SportsOrganization', 'SoftwareApplication']).includes(t)) && (o.name || o.legalName)) || {};
  const faqs = []; const seenQ = new Set();
  const faqRe = cfg.faqMatch ? re(cfg.faqMatch) : null;
  for (const p of pages) if (!faqRe || faqRe.test(pathOf(p.url))) for (const o of p.ld || []) if (typeOf(o).includes('FAQPage')) for (const q of [].concat(o.mainEntity || [])) {
    const qq = clean(q.name); const aa = clean(q.acceptedAnswer?.text || (Array.isArray(q.acceptedAnswer) ? q.acceptedAnswer[0]?.text : ''));
    if (qq && aa && !seenQ.has(qq.toLowerCase())) { seenQ.add(qq.toLowerCase()); faqs.push({ q: applyDrops(qq, p.url), a: applyDrops(aa, p.url), url: p.url }); }
  }

  const name = cfg.name || clean(org.name) || home.title;
  const summary = applyDrops(cfg.summaryFrom === 'org' && org.description ? clean(org.description) : (home.desc || clean(org.description || '')));

  // clasificación en secciones
  const postsCfg = cfg.posts || null;
  const sections = (cfg.sections || []).map(s => ({ ...s, items: [] }));
  const posts = []; const trust = []; const rest = [];
  for (const p of pages) {
    if (p.isHome) continue;
    const pp = pathOf(p.url);
    if ((cfg.trust || []).some(r => re(r).test(pp))) { trust.push(p); continue; }
    const pre = sections.find(s => s.beforePosts && re(s.match).test(pp));
    if (pre) { pre.items.push(p); continue; }
    const isArticle = postsCfg && postsCfg.byType && (p.ld || []).some(o => typeOf(o).some(t => /^(BlogPosting|Article|NewsArticle)$/.test(t)));
    if (postsCfg && ((postsCfg.match && re(postsCfg.match).test(pp)) || isArticle || (postsCfg.wpPosts && p.type === 'posts') || (postsCfg.fromSitemap && p.sm && re(postsCfg.fromSitemap).test(p.sm)))) { posts.push(p); continue; }
    const s = sections.find(s => re(s.match).test(pp));
    (s ? s.items : rest).push(p);
  }
  if (rest.length) sections.push({ title: cfg.restTitle || L.pages, items: rest });
  const byDate = (a, b) => (b.date || b.lastmod || '').localeCompare(a.date || a.lastmod || '');
  posts.sort(byDate);
  const sortItems = it => cfg.sortSections === 'title' ? it.sort((a, b) => a.title.localeCompare(b.title)) : it.sort((a, b) => pathOf(a.url).length - pathOf(b.url).length || pathOf(a.url).localeCompare(pathOf(b.url)));
  for (const s of sections) sortItems(s.items);
  const line = p => `- [${p.title.replace(/[\[\]]/g, '')}](${p.url})${p.desc ? ': ' + p.desc : ''}`;

  // ── llms.txt
  const t = [];
  t.push(`# ${name}`, '', `> ${summary}`, '', `${L.updated}: ${DATE}. ${L.summaryOf} ${home.url}`, '');
  for (const s of sections) if (s.items.length) { t.push(`## ${s.title}`, '', ...s.items.map(line), ''); }
  if (posts.length) {
    const n = postsCfg.maxIndex || 40;
    t.push(`## ${postsCfg.title || L.blog}`, '', ...posts.slice(0, n).map(line), '');
  }
  t.push(`## ${L.optional}`, '', `- [llms-full.txt](${SITE}/llms-full.txt): ${L.fullFile}`, ...trust.map(line));
  if (postsCfg && postsCfg.overflowToOptional && posts.length > (postsCfg.maxIndex || 40)) t.push(...posts.slice(postsCfg.maxIndex || 40).map(line));
  t.push('');

  // ── llms-full.txt
  const f = [];
  f.push(`# ${name}`, '', `> ${summary}`, '', `${L.updated}: ${DATE}. ${L.fullOf} ${home.url}, ${L.fullJoin}`, '');
  const c = [];
  c.push(`- ${L.web}: ${home.url}`);
  const tel = org.telephone || org.contactPoint?.telephone; const mail = org.email || org.contactPoint?.email;
  if (tel) c.push(`- ${L.phone}: ${clean([].concat(tel).join(', '))}`);
  if (mail) c.push(`- ${L.email}: ${clean([].concat(mail).join(', ')).replace(/^mailto:/, '')}`);
  const addrs = [].concat(org.address || []).map(a => typeof a === 'string' ? a : [a.streetAddress, a.postalCode, a.addressLocality, a.addressRegion, a.addressCountry && (typeof a.addressCountry === 'string' ? a.addressCountry : a.addressCountry.name)].filter(Boolean).join(', ')).filter(Boolean);
  if (addrs.length) c.push(`- ${L.address}: ${addrs.join(' · ')}`);
  for (const extra of cfg.contactExtra || []) c.push(`- ${extra}`);
  const same = [].concat(org.sameAs || []).filter(u => /^https?:\/\//.test(u));
  if (same.length) c.push(`- ${L.social}: ${same.join(', ')}`);
  f.push(`## ${L.contact}`, '', ...c, '');
  f.push(`## ${cfg.homeTitle || L.about}`, '', `${L.source}: ${home.url}`, '', home.md, '');
  for (const s of sections) {
    if (!s.items.length) continue;
    f.push(`## ${s.title}`, '');
    for (const p of s.items) {
      f.push(`### ${p.title}`, '', `${L.source}: ${p.url}`, '');
      if (s.summaryOnly) { if (p.desc) f.push(p.desc, ''); continue; }
      if (p.md) f.push(p.md.replace(/^### /gm, '#### ').replace(/^#{3}\s+.*$/m, m => m), '');
      else if (p.desc) f.push(p.desc, '');
    }
  }
  if (faqs.length) {
    f.push(`## ${L.faq}`, '');
    for (const q of faqs) f.push(`### ${q.q}`, '', q.a, '');
  }
  if (posts.length) {
    f.push(`## ${postsCfg.title || L.blog}`, '');
    for (const p of posts.slice(0, postsCfg.maxFull || 200)) {
      f.push(`### ${p.title}`, '', `${L.source}: ${p.url}${p.date ? ` · ${L.published}: ${p.date}` : ''}`, '');
      if (postsCfg.full && p.md) f.push(p.md, ''); else if (p.desc) f.push(p.desc, '');
    }
  }
  if (trust.length) f.push(`## ${L.trust}`, '', ...trust.map(p => `- [${p.title.replace(/[\[\]]/g, '')}](${p.url})`), '');

  const norm = s => s.replace(/^(#{1,6} .*)\n(?!\n)/gm, '$1\n\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
  // títulos del contenido demotados para no romper la jerarquía (#### dentro de ###)
  const full = norm(f.join('\n').replace(/^(#{1,2}) (?!.*\n)/gm, '$1 '));
  const idx = norm(t.join('\n'));

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'llms.txt'), idx);
  fs.writeFileSync(path.join(OUT, 'llms-full.txt'), full);
  const rep = { generated: DATE, version: VERSION, site: SITE, pages: pages.length, posts: posts.length, faqs: faqs.length, skipped: skipped.map(s => `${s.url} (${s.skip})`), sizes: { 'llms.txt': Buffer.byteLength(idx), 'llms-full.txt': Buffer.byteLength(full) } };
  if (cfg.report) fs.writeFileSync(path.resolve(path.dirname(cfgPath), cfg.report), JSON.stringify(rep, null, 1));
  log(`OK ${SITE}: ${pages.length} páginas (${posts.length} posts, ${faqs.length} FAQ), ${skipped.length} descartadas · llms.txt ${rep.sizes['llms.txt']} B · llms-full.txt ${rep.sizes['llms-full.txt']} B → ${OUT}`);
}

main().catch(e => fail(e.stack || String(e)));
