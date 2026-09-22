import "server-only";
import { allCaseTags, type CaseFilter, type CaseTag } from "@/lib/case-studies-select";
import { getAllPostsAsync } from "@/lib/blog";

// Resuelve la tarjeta de un caso de éxito (imagen/título/extracto/fecha) juntando el
// etiquetado (data/case-studies-tags.json, fuente de la SELECCIÓN) con la presentación
// del post publicado (blog.json + CMS, vía getAllPostsAsync). Bilingüe: en ES usa `slug`,
// en EN usa `slugEn`. La tarjeta usa el THUMBNAIL (carátula del rediseño); `hero` es la
// imagen interna del artículo. Solo casos con página publicada Y con imagen (drafts fuera).

export type CaseCard = { href: string; img: string; title: string; excerpt: string; date: string };
export type Lang = "es" | "en";

const MESES_ES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function fmtDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const day = d.getUTCDate(), y = d.getUTCFullYear();
  return lang === "en" ? `${MONTHS_EN[d.getUTCMonth()]} ${day}, ${y}` : `${day} de ${MESES_ES[d.getUTCMonth()]} de ${y}`;
}

function decode(s: string): string {
  return (s || "")
    .replace(/&amp;|&#38;/g, "&")
    .replace(/&ldquo;|&rdquo;|&#822[01];/g, '"')
    .replace(/&lsquo;|&rsquo;|&#821[67];/g, "'")
    .replace(/&ntilde;/g, "ñ").replace(/&Ntilde;/g, "Ñ")
    .replace(/&aacute;/g, "á").replace(/&eacute;/g, "é").replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó").replace(/&uacute;/g, "ú")
    .replace(/&nbsp;/g, " ").replace(/&hellip;|&#8230;/g, "…")
    .trim();
}

function matches(c: CaseTag, f: CaseFilter): boolean {
  if (f.sector && !c.sector.includes(f.sector)) return false;
  if (f.casoDeUso && !c.casosDeUso.includes(f.casoDeUso)) return false;
  if (f.producto && !c.productos.includes(f.producto)) return false;
  return true;
}

const byPri = (a: CaseTag, b: CaseTag) => (b.prioridad ?? 0) - (a.prioridad ?? 0);

/**
 * `limit` tarjetas para una página: primero las que casan con el filtro (sector,
 * caso de uso o producto) por prioridad; si faltan, se completa con el resto
 * ("incluir otros"). Solo casos publicados y con imagen en el idioma pedido.
 */
export async function selectCaseCards(f: CaseFilter, opts: { lang?: Lang; limit?: number } = {}): Promise<CaseCard[]> {
  const lang: Lang = opts.lang || "es";
  const limit = opts.limit ?? 3;
  const posts = await getAllPostsAsync(lang);
  const idx = new Map(posts.map((p) => [p.slug, p]));
  const slugOf = (t: CaseTag) => (lang === "en" ? t.slugEn : t.slug);

  const toCard = (t: CaseTag): CaseCard | null => {
    const s = slugOf(t);
    if (!s) return null;
    const p = idx.get(s);
    if (!p) return null;
    const img = (p.thumbnail || p.hero || "").trim();
    if (!img) return null;
    return {
      href: `https://www.flameanalytics.com/${lang}/${s}/`,
      img,
      title: decode(p.title),
      excerpt: decode(p.excerpt || ""),
      date: fmtDate(p.date, lang),
    };
  };

  const tags = allCaseTags().filter((t) => slugOf(t));
  const nativos = tags.filter((t) => matches(t, f)).sort(byPri);
  const nativosSet = new Set(nativos);
  const resto = tags.filter((t) => !nativosSet.has(t)).sort(byPri);

  const out: CaseCard[] = [];
  const seen = new Set<string>();
  for (const t of [...nativos, ...resto]) {
    if (out.length >= limit) break;
    const s = slugOf(t)!;
    if (seen.has(s)) continue;
    const card = toCard(t);
    if (card) {
      out.push(card);
      seen.add(s);
    }
  }
  return out;
}
