import "server-only";
import { allCaseTags, type CaseFilter, type CaseTag } from "@/lib/case-studies-select";
import { getAllPostsAsync } from "@/lib/blog";

// Resuelve la tarjeta de un caso de éxito (imagen/título/extracto/fecha) juntando el
// etiquetado (data/case-studies-tags.json, fuente de la SELECCIÓN) con la presentación
// del post publicado (blog.json + CMS, vía getAllPostsAsync). Solo casos con página
// publicada Y con imagen; los drafts (B&B, Aena…) quedan fuera automáticamente.

export type CaseCard = { href: string; img: string; title: string; excerpt: string; date: string };

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return `${d.getUTCDate()} de ${MESES[d.getUTCMonth()]} de ${d.getUTCFullYear()}`;
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
 * caso de uso o producto) ordenadas por prioridad; si faltan, se completa con el
 * resto por prioridad ("incluir otros"). Solo casos publicados y con imagen.
 */
export async function selectCaseCards(f: CaseFilter, limit = 3): Promise<CaseCard[]> {
  const posts = await getAllPostsAsync("es");
  const idx = new Map(posts.map((p) => [p.slug, p]));

  const toCard = (t: CaseTag): CaseCard | null => {
    if (!t.slug) return null;
    const p = idx.get(t.slug);
    if (!p) return null;
    const img = (p.hero || p.thumbnail || "").trim();
    if (!img) return null;
    return {
      href: `https://www.flameanalytics.com/es/${t.slug}/`,
      img,
      title: decode(p.title),
      excerpt: decode(p.excerpt || ""),
      date: fmtDate(p.date),
    };
  };

  const tags = allCaseTags().filter((t) => t.slug);
  const nativos = tags.filter((t) => matches(t, f)).sort(byPri);
  const nativosSet = new Set(nativos);
  const resto = tags.filter((t) => !nativosSet.has(t)).sort(byPri);

  const out: CaseCard[] = [];
  const seen = new Set<string>();
  for (const t of [...nativos, ...resto]) {
    if (out.length >= limit) break;
    if (seen.has(t.slug)) continue;
    const card = toCard(t);
    if (card) {
      out.push(card);
      seen.add(t.slug);
    }
  }
  return out;
}
