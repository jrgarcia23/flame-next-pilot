// Poda de indexación 14-oct-2026 (OK de JR). Posts que Google no indexaba:
//  - redirects: 301 a su destino temático (se generan en next.config.ts)
//  - gone: 410 (también en data/deleted-slugs.json, que lee middleware.ts)
// Este módulo los saca de listados, relacionados, sitemap y CMS, y reescribe
// los enlaces internos que apuntaban a ellos: al destino del 301, o quita el
// enlace (dejando el texto) si es 410. No toca blog.json ni Supabase.
// Reversible: quitar la entrada de data/poda-2026-10.json (y de deleted-slugs.json).
import poda from "@/data/poda-2026-10.json";

const REDIRECTS: Record<string, string> = (poda as { redirects: Record<string, string> }).redirects;
const GONE = new Set<string>((poda as { gone: string[] }).gone);

const norm = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export function isPrunedPost(lang: string, slug: string): boolean {
  const p = `/${lang}/${slug}/`;
  return p in REDIRECTS || GONE.has(p);
}

// <a ... href="(https://[www.]flameanalytics.com)?/es|en/slug[/]" ...>texto</a>
const A_RE = /<a\b([^>]*?)\bhref=(["'])(?:https?:\/\/(?:www\.)?flameanalytics\.com)?(\/(?:es|en)\/[^"'#?\/]+\/?)([#?][^"']*)?\2([^>]*)>([\s\S]*?)<\/a>/gi;

export function rewritePrunedLinks(html: string): string {
  if (!html || html.indexOf("href=") === -1) return html;
  return html.replace(A_RE, (match, pre, q, path, tail, post, inner) => {
    const p = norm(path);
    if (p in REDIRECTS) return `<a${pre}href=${q}${REDIRECTS[p]}${q}${post}>${inner}</a>`;
    if (GONE.has(p)) return inner;
    return match;
  });
}
