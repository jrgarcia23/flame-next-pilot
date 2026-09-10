// QA de los content JSON antes de renderizar. Comprueba esquema, iconos válidos,
// enlaces internos dentro de la allowlist, y palabras prohibidas (aforo, marketing digital).
//
// Uso: node scripts/casos-exito/validate-content.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CASES } from "./config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "content");

const ICONS = new Set(["trend","users","grid","clock","repeat","target","eye","chart","building","wifi","shield","map","layers","calendar","route","bag"]);
const ALLOWED_LINKS = new Set([
  "/es/solucion-para-el-sector-retail/","/es/solucion-para-centros-comerciales/","/es/hoteles/","/es/espacios-publicos/","/es/transporte-y-aeropuertos/","/es/banca/","/es/supermercados/","/es/conteo-personas/","/es/analitica-trafico/","/es/gestion-ocupacion/","/es/recorrido-del-cliente/","/es/comportamiento-del-cliente/","/es/analitica-conversion/","/es/connect/","/es/marketing-wifi-para-invitados/","/es/acceso-wifi-corporativo/","/es/hypersensor/",
  "/en/solution-for-retail-sector/","/en/solution-for-shopping-malls/","/en/hospitality/","/en/public-venues/","/en/transport-and-airports/","/en/banking/","/en/supermarkets/","/en/people-counting/","/en/traffic-insights/","/en/occupancy-management/","/en/customer-journey/","/en/customer-behavior/","/en/conversion-analytics/","/en/connect/","/en/guest-wifi-marketing/","/en/corporate-wifi-access/","/en/hypersensor/",
]);
const FORBIDDEN = [/\baforo/i, /marketing digital/i];

let errors = 0, warns = 0;
const err = (f, m) => { console.log(`  ❌ ${f}: ${m}`); errors++; };
const warn = (f, m) => { console.log(`  ⚠️  ${f}: ${m}`); warns++; };

function allText(d) {
  const parts = [d.h1, d.sub, d.eyebrow, d.cifrasTitle, d.solTitle, d.quote?.text, d.quote?.author, d.quote?.role];
  (d.elCaso || []).forEach(p => parts.push(p));
  (d.blocks || []).forEach(b => { parts.push(b.h2, b.eyebrow); (b.body || []).forEach(it => { parts.push(it.p, it.h3, it.quote); (it.list || []).forEach(li => parts.push(li)); }); });
  (d.cifras || []).forEach(c => parts.push(c.label, c.value, c.desc));
  (d.soluciones || []).forEach(s => parts.push(s.h3, s.p));
  return parts.filter(Boolean).join("\n");
}

function linksIn(text) {
  const out = [];
  const re = /href=\\?"(\/(es|en)\/[^"\\]*)\\?"/g;
  let m; while ((m = re.exec(text))) out.push(m[1]);
  return out;
}

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith(".json"));
console.log(`Validando ${files.length} content JSON...\n`);
for (const f of files.sort()) {
  const lang = f.endsWith(".en.json") ? "en" : "es";
  let d;
  try { d = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8")); }
  catch (e) { err(f, `JSON inválido: ${e.message}`); continue; }

  for (const k of ["eyebrow","h1","sub","badge","quote","elCaso","blocks","cifrasTitle","cifras","solTitle","soluciones"])
    if (d[k] === undefined) err(f, `falta campo "${k}"`);
  if (d.badge && (!d.badge.client || !d.badge.date || !d.badge.readTime)) err(f, "badge incompleto");
  if (d.quote && (!d.quote.text || !d.quote.author)) err(f, "quote incompleto");
  if (Array.isArray(d.elCaso) && d.elCaso.length < 2) warn(f, `elCaso solo ${d.elCaso.length} párrafo(s)`);
  if (Array.isArray(d.blocks) && d.blocks.length !== 3) warn(f, `${d.blocks.length} bloques (esperado 3)`);
  if (Array.isArray(d.cifras) && (d.cifras.length < 3 || d.cifras.length > 4)) warn(f, `${d.cifras.length} cifras`);
  if (Array.isArray(d.soluciones) && (d.soluciones.length < 3 || d.soluciones.length > 5)) warn(f, `${d.soluciones.length} soluciones`);

  (d.blocks || []).forEach((b, i) => {
    if (!b.num || !b.eyebrow || !b.h2 || !Array.isArray(b.body)) err(f, `bloque ${i} incompleto`);
    (b.body || []).forEach((it, j) => {
      const kinds = ["p","h3","list","quote"].filter(k => it[k] !== undefined);
      if (kinds.length !== 1) err(f, `bloque ${i} item ${j}: tipo ambiguo (${kinds.join(",")||"ninguno"})`);
    });
  });
  (d.soluciones || []).forEach((s, i) => { if (!ICONS.has(s.icon)) err(f, `solucion ${i}: icono inválido "${s.icon}"`); });
  (d.cifras || []).forEach((c, i) => { if ((c.value || "").length > 12) warn(f, `cifra ${i} value largo: "${c.value}"`); });

  const text = allText(d);
  for (const rx of FORBIDDEN) if (rx.test(text)) err(f, `palabra prohibida: ${rx}`);
  const links = linksIn(text);
  if (links.length === 0) warn(f, "sin enlaces internos");
  for (const l of links) {
    if (!ALLOWED_LINKS.has(l)) warn(f, `enlace fuera de allowlist: ${l}`);
    if (l.startsWith(`/${lang === "es" ? "en" : "es"}/`)) err(f, `enlace en idioma equivocado: ${l}`);
  }
}

// cobertura: ¿están los 2 idiomas de cada caso (excepto alain/multiopticas ya hechos)?
const present = new Set(files.map(f => f.replace(/\.json$/, "")));
for (const id of Object.keys(CASES)) {
  if (CASES[id].done) continue;
  for (const lang of ["es","en"]) if (!present.has(`${id}.${lang}`)) err("(cobertura)", `falta ${id}.${lang}.json`);
}

console.log(`\n${errors === 0 ? "✅" : "❌"} ${errors} errores, ${warns} avisos`);
process.exit(errors ? 1 : 0);
