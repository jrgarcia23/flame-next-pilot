// Merge: toma el "content JSON" de un caso (narrativa, del docx) y le inyecta
// los campos deterministas (slug, lang, hero.img, related[]) desde config + _index,
// produce el JSON final y lo renderiza a data/elementor/<slug>.html.
//
// Uso:
//   node scripts/casos-exito/merge.mjs content/<caseid>.<lang>.json
//   node scripts/casos-exito/merge.mjs --all

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CASES } from "./config.mjs";
import { render } from "./render.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const OUT_DIR = path.join(REPO, "data", "elementor");
const CONTENT_DIR = path.join(__dirname, "content");
const INDEX = JSON.parse(fs.readFileSync(path.join(__dirname, "_index.json"), "utf-8"));

const MONTHS_ES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function humanDate(iso, lang) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  const day = d.getUTCDate(), m = d.getUTCMonth(), y = d.getUTCFullYear();
  return lang === "es" ? `${day} de ${MONTHS_ES[m]} de ${y}` : `${MONTHS_EN[m]} ${day}, ${y}`;
}

// hero||thumbnail||sibling.hero||sibling.thumbnail
function resolveHero(caseId, lang) {
  const c = CASES[caseId];
  const slug = c[lang].slug;
  const other = lang === "es" ? "en" : "es";
  const a = INDEX[slug] || {};
  const b = INDEX[c[other].slug] || {};
  return a.hero || a.thumbnail || b.hero || b.thumbnail || "";
}

function dateFor(caseId, lang) {
  const c = CASES[caseId];
  const other = lang === "es" ? "en" : "es";
  const a = INDEX[c[lang].slug];
  const b = INDEX[c[other].slug];
  return (a && a.date) || (b && b.date) || "2026-07-15T00:00:00";
}

function relatedCards(caseId, lang) {
  const c = CASES[caseId];
  const rel = c.related || [];
  return rel.map(rid => {
    const rc = CASES[rid];
    if (!rc) throw new Error(`related id inexistente: ${rid} (en ${caseId})`);
    return {
      href: `/${lang}/${rc[lang].slug}/`,
      img: resolveHero(rid, lang),
      h3: rc[lang].relTitle,
      date: humanDate(dateFor(rid, lang), lang),
    };
  });
}

export function mergeCase(caseId, lang, content) {
  const c = CASES[caseId];
  if (!c) throw new Error(`caso inexistente: ${caseId}`);
  return {
    ...content,
    slug: c[lang].slug,
    lang,
    hero: { img: resolveHero(caseId, lang), phLabel: content.badge?.client ? content.badge.client : "" },
    related: relatedCards(caseId, lang),
  };
}

function processFile(file) {
  const base = path.basename(file).replace(/\.json$/, "");
  const m = base.match(/^(.+)\.(es|en)$/);
  if (!m) throw new Error(`nombre inválido (esperado <caseid>.<lang>.json): ${file}`);
  const [, caseId, lang] = m;
  const content = JSON.parse(fs.readFileSync(file, "utf-8"));
  const finalJson = mergeCase(caseId, lang, content);
  const html = render(finalJson);
  const outPath = path.join(OUT_DIR, `${finalJson.slug}.html`);
  fs.writeFileSync(outPath, html);
  return { caseId, lang, slug: finalJson.slug, bytes: html.length };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
const arg = isMain ? process.argv[2] : undefined;
if (arg) {
  if (arg === "--all") {
    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith(".json"));
    for (const f of files.sort()) {
      const r = processFile(path.join(CONTENT_DIR, f));
      console.log(`${String(r.bytes).padStart(6)}  ${r.lang}  ${r.slug}`);
    }
  } else {
    const r = processFile(path.isAbsolute(arg) ? arg : path.join(__dirname, arg));
    console.log(`OK ${r.bytes} bytes  ${r.lang}  ${r.slug}`);
  }
}

export { humanDate, resolveHero, relatedCards, dateFor };
