import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { BlogPost, categoryLabel, categoryUrl, formatDate, readingTime, getRelatedPosts, shortExcerpt, Lang } from "@/lib/blog";
import { injectInternalLinks } from "@/lib/internal-linking";
import { sanitizeTitle } from "@/lib/sanitize-title";

const I18N = {
  es: {
    breadcrumbHome: "Inicio", min: "min de lectura", related: "Posts relacionados",
    toc: "Contenido del artículo",
    midCtaEyebrow: "Ver Flame en acción",
    midCtaTitle1: "¿Quieres ver cómo lo medirías en tu espacio?",
    midCtaTitle2: "Más datos, menos suposiciones: pasa de la teoría a la práctica",
    midCtaBtn: "Solicita una demo",
    endCtaEyebrow: "Demo personalizada · 20 minutos",
    endCtaTitle: "Convierte el tráfico físico en decisiones de negocio",
    endCtaSub: "Te enseñamos cómo Flame mide tráfico, conversión y comportamiento en tus tiendas, malls u hoteles. Caso real de tu sector, sin biometría y con RGPD por diseño. 90+ clientes B2B en 12 países.",
    endCtaBtn: "Solicitar demo →",
  },
  en: {
    breadcrumbHome: "Home", min: "min read", related: "Related posts",
    toc: "Article contents",
    midCtaEyebrow: "See Flame in action",
    midCtaTitle1: "Want to see how this works in your space?",
    midCtaTitle2: "More data, fewer assumptions: from theory to practice",
    midCtaBtn: "Request a demo",
    endCtaEyebrow: "Personalised demo · 20 minutes",
    endCtaTitle: "Turn physical traffic into business decisions",
    endCtaSub: "We show you how Flame measures traffic, conversion and behaviour in your stores, malls or hotels. Real case from your sector, no biometrics, GDPR by design. 90+ B2B clients across 12 countries.",
    endCtaBtn: "Request demo →",
  },
};

// Posts especiales (eventos, webinars, landings con maquetación propia)
// que NO deben pasar por el procesamiento editorial automático.
// Detectado por patrón de slug.
const NON_EDITORIAL_SLUG_PATTERNS = [
  /flame-talks-\d{4}/i,
  /apuntate-a-flame-talks/i,
  /flame-talks-retail/i,
  /^proximo-webinar/i,
  /^next-webinar/i,
  /^new-webinar/i,
  /^webinar-flame/i,
  /^inscribete/i,
];

function shouldUseEditorialFormat(slug: string, categorySlug: string): boolean {
  if (categorySlug !== "blog") return false;
  return !NON_EDITORIAL_SLUG_PATTERNS.some(re => re.test(slug));
}

// Detecta si el HTML del post ya trae elementos destacados editoriales
// (lead, pull-quote, blockquote o div con border-left). Si los hay,
// no inyectamos pull-quotes automáticos para no saturar.
function hasExistingHighlights(html: string): boolean {
  if (/<blockquote\b/i.test(html)) return true;
  if (/class=["'][^"']*\b(?:fa-lead|pull-quote|callout|highlight)\b/i.test(html)) return true;
  return false;
}

// TOC con fallback: usa H2 si hay ≥3, si no usa H3 si hay ≥3.
// Devuelve { items, htmlWithIds } donde los IDs se han asignado al nivel que toque.
function prepareTocAndIds(html: string): { items: { id: string; title: string }[]; htmlWithIds: string } {
  const h2Count = (html.match(/<h2\b/g) || []).length;
  const h3Count = (html.match(/<h3\b/g) || []).length;
  const useH3 = h2Count < 3 && h3Count >= 3;
  const level = useH3 ? "h3" : "h2";
  const items: { id: string; title: string }[] = [];
  let idx = 0;
  const re = new RegExp(`<${level}(\\s[^>]*)?>([\\s\\S]*?)<\\/${level}>`, "g");
  const htmlWithIds = html.replace(re, (match, attrs = "", text) => {
    if (/\sid=/.test(attrs || "")) {
      const idMatch = (attrs || "").match(/id=["']([^"']+)["']/);
      if (idMatch) {
        items.push({ id: idMatch[1], title: text.replace(/<[^>]+>/g, "").trim() });
      }
      return match;
    }
    const id = `h${idx}`;
    items.push({ id, title: text.replace(/<[^>]+>/g, "").trim() });
    idx++;
    return `<${level}${attrs || ""} id="${id}">${text}</${level}>`;
  });
  return { items, htmlWithIds };
}

function pickPullQuotes(html: string, count: number): string[] {
  const paragraphs = Array.from(html.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g))
    .map(m => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(s => s.length > 80 && s.length < 400 && !/&nbsp;/.test(s));
  if (paragraphs.length < 2) return [];
  const picks: string[] = [];
  for (let i = 0; i < count; i++) {
    const fraction = (i + 1) / (count + 1);
    const target = paragraphs[Math.floor(paragraphs.length * fraction)] || paragraphs[paragraphs.length - 1];
    const firstSentence = target.match(/^[^.!?]+[.!?]/);
    const quote = (firstSentence ? firstSentence[0] : target.slice(0, 200)).trim();
    if (quote && !picks.includes(quote)) picks.push(quote);
  }
  return picks;
}

/**
 * Limpia imágenes externas que dan 403/rotas (Google Drive/Docs son las más comunes
 * porque caducan, requieren auth o cambian de host). Aplicar a TODOS los posts (también
 * los non-editorial), para evitar imágenes rotas en el body.
 */
function stripBrokenExternalImages(html: string): string {
  return html
    // <img> sueltas con src de Google Drive/Docs/usercontent
    .replace(/<img\b[^>]*\bsrc=["']https?:\/\/(?:lh\d+\.googleusercontent\.com|docs\.google\.com|drive\.google\.com)[^"']*["'][^>]*>/gi, "")
    // Igual pero dentro de <figure>
    .replace(/<figure[^>]*>\s*<img\b[^>]*\bsrc=["']https?:\/\/(?:lh\d+\.googleusercontent\.com|docs\.google\.com|drive\.google\.com)[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi, "")
    // Igual pero envuelta en <p>
    .replace(/<p[^>]*>\s*<img\b[^>]*\bsrc=["']https?:\/\/(?:lh\d+\.googleusercontent\.com|docs\.google\.com|drive\.google\.com)[^"']*["'][^>]*>\s*<\/p>/gi, "");
}

/**
 * Quita atributos style="..." inline en H1-H6 para que la tipografía la controle
 * el CSS del template (Clash Grotesk · weight 500 · navy). Conserva los demás atributos.
 */
function stripHeadingInlineStyles(html: string): string {
  return html.replace(/<(h[1-6])(\s[^>]*)?>/gi, (match, tag, attrs = "") => {
    const cleaned = (attrs || "").replace(/\s*style\s*=\s*["'][^"']*["']/gi, "");
    return `<${tag}${cleaned}>`;
  });
}

/**
 * Decide si una posición justo tras un </p> es segura para insertar un bloque
 * editorial (CTA, pull-quote). NO es segura cuando el siguiente elemento es un
 * cierre de wrapper (</div>, </section>) o un elemento estructural dentro de
 * una tarjeta/wrapper custom (otro <div>, <span>, <li>, etc.).
 *
 * Solo aceptamos posiciones donde el siguiente tag de apertura sea <p>, <h2>,
 * <h3>, <h4> o <blockquote> al nivel raíz del flujo del post.
 */
function isSafeInsertionPoint(html: string, pos: number): boolean {
  const next = html.slice(pos, pos + 400);
  const match = next.match(/^\s*<(\/?[a-z][a-z0-9]*)/i);
  if (!match) return true;
  const tag = match[1].toLowerCase();
  // No insertar en cierres (estamos saliendo de un wrapper o lista)
  if (tag.startsWith("/")) return false;
  // Solo aceptar las aperturas seguras
  return ["p", "h2", "h3", "h4", "blockquote", "hr"].includes(tag);
}

function processPostHtml(
  html: string,
  tocHtml: string,
  currentPath: string,
  lang: Lang,
  t: typeof I18N["es"],
  hasInlineHighlights: boolean,
): string {
  let processed = html;

  for (let i = 0; i < 2; i++) {
    processed = processed
      .replace(/^\s*<figure[^>]*>[\s\S]*?<\/figure>\s*/, "")
      .replace(/^\s*<p[^>]*>\s*<img[^>]+>\s*<\/p>\s*/, "")
      .replace(/^\s*<img[^>]+>\s*/, "")
      .replace(/^\s*<div[^>]*class=["'][^"']*wp-block-image[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/, "");
  }

  // Imágenes externas rotas + estilos inline en headings → siempre limpiados.
  processed = stripBrokenExternalImages(processed);
  processed = stripHeadingInlineStyles(processed);

  processed = injectInternalLinks(processed, currentPath, lang);

  // Recopilamos TODOS los cierres </p>, pero filtramos por safe insertion points para
  // no inyectar dentro de tarjetas/listas custom. Mantenemos la longitud original como
  // referencia para las fracciones (0.22, 0.38, 0.5...).
  const pClosesAll: number[] = [];
  let pos = -1;
  while ((pos = processed.indexOf("</p>", pos + 1)) !== -1) pClosesAll.push(pos + 4);
  const pCount = pClosesAll.length;
  const safeCloses = pClosesAll.filter(p => isSafeInsertionPoint(processed, p));
  const hasTable = /<table\b/i.test(processed);

  // Devuelve el safe insertion point más cercano al target deseado
  const pickSafeNear = (targetIdx: number): number | null => {
    if (!safeCloses.length) return null;
    const targetPos = pClosesAll[Math.min(targetIdx, pClosesAll.length - 1)];
    // Buscar el safe close más cercano a targetPos
    let best = safeCloses[0];
    let bestDist = Math.abs(best - targetPos);
    for (const c of safeCloses) {
      const d = Math.abs(c - targetPos);
      if (d < bestDist) { best = c; bestDist = d; }
    }
    return best;
  };

  // Pull-quotes auto solo si el post NO tiene ya elementos destacados (blockquote, fa-lead, etc.)
  const allQuotes = hasInlineHighlights ? [] : pickPullQuotes(html, 3);

  const midCta1 = `<aside class="mid-cta"><div class="mid-cta-text"><p class="mid-cta-eyebrow">${t.midCtaEyebrow}</p><p class="mid-cta-title">${t.midCtaTitle1}</p></div><a href="/${lang}/#contact" class="mid-cta-btn">${t.midCtaBtn} →</a></aside>`;
  const midCta2 = `<aside class="mid-cta"><div class="mid-cta-text"><p class="mid-cta-eyebrow">${t.midCtaEyebrow}</p><p class="mid-cta-title">${t.midCtaTitle2}</p></div><a href="/${lang}/#contact" class="mid-cta-btn">${t.midCtaBtn} →</a></aside>`;

  // Plan de inyección según longitud y existencia de tabla
  let pullCount = 0;
  let ctaCount = 0;
  if (pCount >= 25) { pullCount = Math.min(2, allQuotes.length); ctaCount = 2; }
  else if (pCount >= 15) { pullCount = Math.min(hasTable ? 2 : 1, allQuotes.length); ctaCount = 1; }
  else if (pCount >= 8) { pullCount = Math.min(1, allQuotes.length); ctaCount = 1; }

  type Insert = { pos: number; html: string };
  const inserts: Insert[] = [];

  if (pullCount > 0 && pCount >= 4) {
    const fractions = pullCount === 1 ? [0.3] : [0.22, 0.65];
    for (let i = 0; i < pullCount; i++) {
      const targetIdx = Math.floor(pCount * fractions[i]);
      const insertPos = pickSafeNear(targetIdx);
      if (insertPos !== null) {
        inserts.push({ pos: insertPos, html: `<blockquote class="auto-pull-quote">${allQuotes[i]}</blockquote>` });
      }
    }
  }

  if (ctaCount > 0 && pCount >= 6) {
    const fractions = ctaCount === 1 ? [0.5] : [0.38, 0.74];
    for (let i = 0; i < ctaCount; i++) {
      const targetIdx = Math.floor(pCount * fractions[i]);
      const insertPos = pickSafeNear(targetIdx);
      if (insertPos !== null) {
        inserts.push({ pos: insertPos, html: i === 0 ? midCta1 : midCta2 });
      }
    }
  }

  inserts.sort((a, b) => b.pos - a.pos);
  for (const ins of inserts) {
    processed = processed.slice(0, ins.pos) + ins.html + processed.slice(ins.pos);
  }

  if (tocHtml) processed = tocHtml + processed;

  return processed;
}

export default function BlogPostTemplate({ post }: { post: BlogPost }) {
  const lang: Lang = post.lang;
  const t = I18N[lang];
  const catLabel = categoryLabel(post.category.slug, lang);
  const catPath = categoryUrl(post.category.slug, lang);
  const minutes = readingTime(post.html);
  const related = getRelatedPosts(post.slug, post.category.slug, lang, 3);
  const enHref = lang === "es" ? `/en/` : `/es/`;
  const currentPath = `/${lang}/${post.slug}/`;

  const editorial = shouldUseEditorialFormat(post.slug, post.category.slug);

  // Procesamiento editorial: TOC (h2 con fallback a h3) + pull-quotes (si no hay ya) + CTAs.
  // Para non-editorial: solo limpieza mínima (imágenes rotas + styles inline en headings)
  // para que tipográficamente cuadre con el resto, pero sin tocar la maquetación del post.
  let processedHtml = editorial
    ? post.html
    : stripHeadingInlineStyles(stripBrokenExternalImages(post.html));
  let tocItems: { id: string; title: string }[] = [];
  if (editorial) {
    const hasInlineHighlights = hasExistingHighlights(post.html);
    const { items, htmlWithIds } = prepareTocAndIds(post.html);
    tocItems = items.length >= 3 ? items : [];
    const tocHtml = tocItems.length >= 3
      ? `<nav class="toc-top"><h4>${t.toc}</h4><ol>${tocItems.map(h => `<li><a href="#${h.id}">${h.title}</a></li>`).join("")}</ol></nav>`
      : "";
    processedHtml = processPostHtml(htmlWithIds, tocHtml, currentPath, lang, t, hasInlineHighlights);
  }

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={lang} enHref={enHref} />

      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
          // En non-editorial usamos el banner real del post como background con overlay,
          // para acercarnos a la maquetación original Elementor que mostraba el banner arriba.
          ...(!editorial && (post.hero || post.thumbnail) ? {
            backgroundImage: `linear-gradient(rgba(21,22,58,0.78), rgba(21,22,58,0.92)), url('${post.hero || post.thumbnail}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          } : {}),
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.14), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.08), transparent 72%)" }} />
        <div className="flame-container relative z-10" style={{ maxWidth: 820 }}>
          <nav className="text-[14px] mb-6 flex items-center gap-1.5" style={{ color: "rgb(255 255 255 / 0.6)" }}>
            <a href={`/${lang}/`} style={{ color: "inherit" }}>{t.breadcrumbHome}</a>
            <span>›</span>
            <a href={catPath} style={{ color: "inherit" }}>{catLabel}</a>
          </nav>
          <h1 className="text-[clamp(32px,4.4vw,52px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, fontFamily: "var(--font-display)" }} dangerouslySetInnerHTML={{ __html: sanitizeTitle(post.title) }} />
          <div className="flex items-center gap-4 text-[14.5px] flex-wrap" style={{ color: "rgb(255 255 255 / 0.78)" }}>
            <a href={catPath} className="text-[12.5px] uppercase font-semibold inline-flex items-center" style={{ color: "var(--color-accent)", letterSpacing: "0.08em" }}>{catLabel}</a>
            <span style={{ color: "rgb(255 255 255 / 0.3)" }}>·</span>
            <span>{formatDate(post.date, lang)}</span>
            <span style={{ color: "rgb(255 255 255 / 0.3)" }}>·</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="w-3.5 h-3.5" /> {minutes} {t.min}</span>
          </div>
        </div>
      </section>

      <article className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          {/*
            Para non-editorial el banner ya aparece como fondo del hero;
            no repetimos la imagen aquí. Los posts entrevistas/casos/whitepapers
            que sí muestran la imagen arriba se gestionan en sus propios templates.
          */}
          <div className="mx-auto post-body" style={{ maxWidth: 760, color: "var(--color-ink)", fontSize: "18px", lineHeight: 1.75, fontFamily: "var(--font-body)" }} dangerouslySetInnerHTML={{ __html: processedHtml }} />

          {editorial && (
            <aside className="mx-auto end-cta" style={{ maxWidth: 760, marginTop: 64 }}>
              <div className="end-cta-text">
                <p className="end-cta-eyebrow">{t.endCtaEyebrow}</p>
                <p className="end-cta-title">{t.endCtaTitle}</p>
                <p className="end-cta-sub">{t.endCtaSub}</p>
              </div>
              <a href={`/${lang}/#contact`} className="cta-btn cta-btn--primary cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                {t.endCtaBtn}
              </a>
            </aside>
          )}
        </div>

        <style>{`
          .post-body { color: var(--color-ink-2); }
          .post-body > h1:first-child { display: none; }
          .post-body p { margin: 0 0 22px; color: var(--color-ink-2); }
          .post-body strong { color: var(--color-ink); font-weight: 600; }
          .post-body h2 { font-family: var(--font-display); font-weight: 500; color: var(--color-navy); font-size: clamp(28px, 2.8vw, 36px); letter-spacing: -0.02em; line-height: 1.15; margin: 48px 0 16px; max-width: 28ch; scroll-margin-top: 80px; }
          .post-body h3 { font-family: var(--font-display); font-weight: 500; color: var(--color-navy); font-size: clamp(22px, 2vw, 26px); letter-spacing: -0.015em; line-height: 1.2; margin: 36px 0 12px; max-width: 30ch; scroll-margin-top: 80px; }
          .post-body h4 { font-family: var(--font-display); font-weight: 600; color: var(--color-navy); font-size: 19px; margin: 28px 0 10px; }
          .post-body a { color: var(--color-accent-deep); text-decoration: underline; text-underline-offset: 3px; }
          .post-body a:hover { color: var(--color-accent); }
          .post-body a.auto-link { color: var(--color-accent-deep); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(49,177,248,.5); text-decoration-thickness: 1.5px; }
          .post-body a.auto-link:hover { color: var(--color-accent); text-decoration-color: var(--color-accent); }
          .post-body ul, .post-body ol { margin: 0 0 22px 24px; }
          .post-body li { margin-bottom: 10px; }
          .post-body img { max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; }
          .post-body figure { margin: 32px 0; }
          .post-body figcaption { font-size: 13px; color: var(--color-ink-3); text-align: center; margin-top: 8px; font-family: var(--font-body); }

          .post-body blockquote,
          .post-body .auto-pull-quote {
            margin: 48px 0;
            padding: 0 0 0 32px;
            border-left: 4px solid var(--color-accent);
            font-family: var(--font-display);
            font-size: clamp(22px, 2.4vw, 30px);
            font-weight: 400;
            line-height: 1.32;
            color: var(--color-navy);
            letter-spacing: -0.014em;
            font-style: italic;
            max-width: 34ch;
          }

          .post-body table { width: 100%; border-collapse: collapse; margin: 40px 0; font-family: var(--font-body); font-size: 15px; border-top: 2px solid var(--color-navy); border-bottom: 2px solid var(--color-navy); }
          .post-body thead { background: rgba(49, 177, 248, 0.06); }
          .post-body th { text-align: left; padding: 14px 16px; font-family: var(--font-display); font-weight: 500; font-size: 14px; color: var(--color-navy); letter-spacing: -0.005em; border-bottom: 1px solid var(--color-rule); }
          .post-body td { padding: 14px 16px; border-bottom: 1px solid var(--color-rule); color: var(--color-ink-2); line-height: 1.5; }
          .post-body tbody tr:nth-child(even) { background: rgba(49, 177, 248, 0.03); }
          .post-body tbody tr:last-child td { border-bottom: 0; }

          .post-body .toc-top {
            background: rgba(49, 177, 248, 0.06);
            border: 1px solid rgba(49, 177, 248, 0.16);
            border-radius: 12px;
            padding: 28px 32px;
            margin: 0 0 40px;
          }
          .post-body .toc-top h4 { font-family: var(--font-body); font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--color-accent-deep); margin-bottom: 18px; max-width: none; }
          .post-body .toc-top ol { list-style: none; counter-reset: toc; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px 32px; }
          .post-body .toc-top li { counter-increment: toc; padding-left: 32px; position: relative; line-height: 1.4; font-family: var(--font-body); margin-bottom: 0; }
          .post-body .toc-top li::before { content: counter(toc, decimal-leading-zero); position: absolute; left: 0; top: 1px; font-family: var(--font-display); font-size: 13px; color: var(--color-accent-deep); font-weight: 500; letter-spacing: 0.04em; }
          .post-body .toc-top li a { font-size: 14.5px; color: var(--color-ink-2); line-height: 1.4; border-bottom: 1px solid transparent; text-decoration: none; padding-bottom: 1px; }
          .post-body .toc-top li a:hover { color: var(--color-navy); border-color: var(--color-accent); }

          .post-body .mid-cta { margin: 48px 0; background: rgba(49, 177, 248, 0.08); border: 1px solid rgba(49, 177, 248, 0.2); border-radius: 12px; padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
          .post-body .mid-cta-text { flex: 1; min-width: 220px; }
          .post-body .mid-cta-eyebrow { font-family: var(--font-body); font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--color-accent-deep); margin: 0 0 6px; }
          .post-body .mid-cta-title { font-family: var(--font-display); font-size: clamp(18px, 1.9vw, 22px); font-weight: 500; line-height: 1.25; color: var(--color-navy); letter-spacing: -0.012em; margin: 0; max-width: 30ch; }
          .post-body .mid-cta-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--color-accent); color: #fff !important; font-family: var(--font-body); font-weight: 700; font-size: 14.5px; padding: 12px 22px; border-radius: 4px; text-decoration: none !important; border: none; flex-shrink: 0; transition: filter 240ms, transform 240ms, box-shadow 240ms; }
          .post-body .mid-cta-btn:hover { filter: brightness(0.94); transform: translateY(-1px); box-shadow: 0 6px 16px -10px rgb(15 23 42 / 0.18); }

          .end-cta { background: var(--color-navy); border-radius: 14px; padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap; color: #fff; }
          .end-cta-text { flex: 1; min-width: 280px; }
          .end-cta-eyebrow { font-family: var(--font-body); font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--color-accent); margin-bottom: 10px; }
          .end-cta-title { font-family: var(--font-display); font-size: clamp(22px, 2.4vw, 28px); font-weight: 400; line-height: 1.2; color: #fff; letter-spacing: -0.014em; margin: 0 0 10px; max-width: 28ch; }
          .end-cta-sub { font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: rgba(255, 255, 255, 0.74); margin: 0; max-width: 58ch; }

          @media (max-width: 700px) {
            .post-body { font-size: 17px !important; line-height: 1.7; }
            .post-body .toc-top ol { grid-template-columns: 1fr; gap: 10px; }
            .post-body table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
            .post-body .mid-cta { padding: 20px 22px; }
            .end-cta { padding: 28px 24px; }
          }
        `}</style>
      </article>

      {related.length > 0 && (
        <section className="py-16" style={{ background: "var(--color-paper)" }}>
          <div className="flame-container">
            <h2 className="font-normal mb-8 text-center" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.018em" }}>
              {t.related}
            </h2>
            <div className="grid gap-6 related-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {related.map(r => (
                <a key={r.slug} href={`/${lang}/${r.slug}/`} className="block rounded-2xl overflow-hidden group" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  {(r.thumbnail || r.hero) && <div style={{ aspectRatio: "1/1", background: `url('${r.thumbnail || r.hero}') center/cover` }} />}
                  <div className="p-5">
                    <p className="text-[12px] uppercase font-semibold mb-2" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.08em" }}>{categoryLabel(r.category.slug, lang)}</p>
                    <h3 className="font-medium mb-2 group-hover:text-[--color-accent-deep] transition" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 19, lineHeight: 1.25 }} dangerouslySetInnerHTML={{ __html: sanitizeTitle(r.title) }} />
                    <p className="text-[14px]" style={{ color: "var(--color-ink-3)" }}>{shortExcerpt(r.html, 110)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) { .related-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 560px) { .related-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; } }
          `}</style>
        </section>
      )}

      <SiteFooter currentLang={lang} />
    </>
  );
}
