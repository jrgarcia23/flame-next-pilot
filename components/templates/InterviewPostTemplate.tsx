import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { BlogPost, categoryLabel, categoryUrl, formatDate, readingTime, getRelatedPosts, shortExcerpt, Lang } from "@/lib/blog";
import { injectInternalLinks } from "@/lib/internal-linking";

const I18N = {
  es: {
    breadcrumbHome: "Inicio", min: "min de lectura", related: "Entrevistas relacionadas",
    eyebrow: "Entrevista",
    endCtaEyebrow: "Demo personalizada · 20 minutos",
    endCtaTitle: "¿Quieres entender así de bien tu propio espacio?",
    endCtaSub: "Te enseñamos cómo Flame mide tráfico, conversión y comportamiento en tus tiendas, malls u hoteles. Caso real de tu sector, sin biometría y con RGPD por diseño. 180+ clientes B2B en 23 países.",
    endCtaBtn: "Solicitar demo →",
  },
  en: {
    breadcrumbHome: "Home", min: "min read", related: "Related interviews",
    eyebrow: "Interview",
    endCtaEyebrow: "Personalised demo · 20 minutes",
    endCtaTitle: "Want to understand your own space this clearly?",
    endCtaSub: "We show you how Flame measures traffic, conversion and behaviour in your stores, malls or hotels. Real case from your sector, no biometrics, GDPR by design. 180+ B2B clients across 23 countries.",
    endCtaBtn: "Request demo →",
  },
};

/** Extrae la cita del título "Nombre Apellido: «cita»" o "Nombre: 'cita'". */
function extractHeaderParts(title: string): { name: string; quote: string } {
  const entities: Record<string, string> = {
    "&laquo;": "«", "&raquo;": "»",
    "&#8220;": "\"", "&#8221;": "\"",
    "&#8216;": "'", "&#8217;": "'",
    "&ldquo;": "\"", "&rdquo;": "\"",
    "&lsquo;": "'", "&rsquo;": "'",
    "&nbsp;": " ",
  };
  const clean = title.replace(/&[a-z]+;|&#\d+;/gi, m => entities[m] || m);
  const m = clean.match(/^(.+?)\s*[:,]\s*[«"""]\s*(.+?)\s*[»"""]\s*$/);
  if (m) return { name: m[1].trim(), quote: m[2].trim() };
  // Fallback: si título lleva comillas al inicio sin nombre, devuelve título tal cual
  return { name: "", quote: clean.trim() };
}

function isSafeInsertionPoint(html: string, pos: number): boolean {
  const next = html.slice(pos, pos + 400);
  const match = next.match(/^\s*<(\/?[a-z][a-z0-9]*)/i);
  if (!match) return true;
  const tag = match[1].toLowerCase();
  if (tag.startsWith("/")) return false;
  return ["p", "h2", "h3", "h4", "blockquote", "hr"].includes(tag);
}

function stripBrokenExternalImages(html: string): string {
  return html
    .replace(/<img\b[^>]*\bsrc=["']https?:\/\/(?:lh\d+\.googleusercontent\.com|docs\.google\.com|drive\.google\.com)[^"']*["'][^>]*>/gi, "")
    .replace(/<figure[^>]*>\s*<img\b[^>]*\bsrc=["']https?:\/\/(?:lh\d+\.googleusercontent\.com|docs\.google\.com|drive\.google\.com)[^"']*["'][^>]*>[\s\S]*?<\/figure>/gi, "")
    .replace(/<p[^>]*>\s*<img\b[^>]*\bsrc=["']https?:\/\/(?:lh\d+\.googleusercontent\.com|docs\.google\.com|drive\.google\.com)[^"']*["'][^>]*>\s*<\/p>/gi, "");
}

function stripHeadingInlineStyles(html: string): string {
  return html.replace(/<(h[1-6])(\s[^>]*)?>/gi, (match, tag, attrs = "") => {
    const cleaned = (attrs || "").replace(/\s*style\s*=\s*["'][^"']*["']/gi, "");
    return `<${tag}${cleaned}>`;
  });
}

function hasExistingHighlights(html: string): boolean {
  if (/<blockquote\b/i.test(html)) return true;
  if (/class=["'][^"']*\b(?:fa-lead|pull-quote|callout|highlight)\b/i.test(html)) return true;
  return false;
}

/**
 * Estiliza los H2 que sean preguntas (terminan en ? o empiezan por ¿/—)
 * convirtiéndolos en bloques Q&A numerados.
 */
function styleQAndA(html: string): string {
  let counter = 0;
  return html.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (match, attrs = "", inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const isQuestion = /[¿?]/.test(text) || /^[—–-]\s*¿/.test(text);
    if (!isQuestion) return match;
    counter += 1;
    const num = String(counter).padStart(2, "0");
    // Conservar el id si existe
    const idMatch = (attrs || "").match(/id=["']([^"']+)["']/);
    const id = idMatch ? idMatch[1] : `q${counter}`;
    return `<div class="qa-block"><span class="qa-num">${num}</span><h2 class="qa-q" id="${id}">${inner}</h2></div>`;
  });
}

function processInterviewHtml(
  html: string,
  currentPath: string,
  lang: Lang,
  hasInlineHighlights: boolean,
): string {
  let processed = html;

  // Limpieza imágenes iniciales (la portada vive en el hero)
  for (let i = 0; i < 2; i++) {
    processed = processed
      .replace(/^\s*<figure[^>]*>[\s\S]*?<\/figure>\s*/, "")
      .replace(/^\s*<p[^>]*>\s*<img[^>]+>\s*<\/p>\s*/, "")
      .replace(/^\s*<img[^>]+>\s*/, "")
      .replace(/^\s*<div[^>]*class=["'][^"']*wp-block-image[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/, "");
  }

  processed = stripBrokenExternalImages(processed);
  processed = stripHeadingInlineStyles(processed);
  processed = injectInternalLinks(processed, currentPath, lang);
  processed = styleQAndA(processed);

  // Callout azul: cita destacada a mitad del post si NO hay highlights existentes
  if (!hasInlineHighlights) {
    const pClosesAll: number[] = [];
    let pos = -1;
    while ((pos = processed.indexOf("</p>", pos + 1)) !== -1) pClosesAll.push(pos + 4);
    const safeCloses = pClosesAll.filter(p => isSafeInsertionPoint(processed, p));
    if (safeCloses.length >= 3) {
      // Tomar un párrafo del primer tercio como cita destacada
      const paragraphs = Array.from(html.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g))
        .map(m => m[1].replace(/<[^>]+>/g, "").trim())
        .filter(s => s.length > 80 && s.length < 350 && !/&nbsp;/.test(s));
      if (paragraphs.length) {
        const quote = paragraphs[Math.floor(paragraphs.length * 0.4)] || paragraphs[0];
        // Punto de inserción cerca del medio (fracción 0.55)
        const targetIdx = Math.floor(pClosesAll.length * 0.55);
        const targetPos = pClosesAll[Math.min(targetIdx, pClosesAll.length - 1)];
        let best = safeCloses[0];
        let bestDist = Math.abs(best - targetPos);
        for (const c of safeCloses) {
          const d = Math.abs(c - targetPos);
          if (d < bestDist) { best = c; bestDist = d; }
        }
        const callout = `<aside class="blue-callout"><p class="blue-callout-quote">«${quote}»</p></aside>`;
        processed = processed.slice(0, best) + callout + processed.slice(best);
      }
    }
  }

  return processed;
}

export default function InterviewPostTemplate({ post }: { post: BlogPost }) {
  const lang: Lang = post.lang;
  const t = I18N[lang];
  const catLabel = categoryLabel(post.category.slug, lang);
  const catPath = categoryUrl(post.category.slug, lang);
  const minutes = readingTime(post.html);
  const related = getRelatedPosts(post.slug, post.category.slug, lang, 3);
  const enHref = lang === "es" ? `/en/` : `/es/`;
  const currentPath = `/${lang}/${post.slug}/`;

  const { name, quote } = extractHeaderParts(post.title.replace(/<[^>]+>/g, ""));
  const heroImg = post.thumbnail || post.hero;
  const hasInlineHighlights = hasExistingHighlights(post.html);
  const processedHtml = processInterviewHtml(post.html, currentPath, lang, hasInlineHighlights);

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={lang} enHref={enHref} />

      {/* HERO entrevista: foto cuadrada izq + cita display derecha */}
      <section className="relative overflow-hidden" style={{ background: "#fff", borderBottom: "1px solid var(--color-rule)", paddingTop: "clamp(64px, 7.4vw, 108px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div className="flame-container">
          <nav className="text-[14px] mb-8 flex items-center gap-1.5" style={{ color: "var(--color-ink-3)" }}>
            <a href={`/${lang}/`} style={{ color: "inherit" }}>{t.breadcrumbHome}</a>
            <span>›</span>
            <a href={catPath} style={{ color: "inherit" }}>{catLabel}</a>
          </nav>
          <div className="interview-hero-grid">
            {heroImg && (
              <div className="interview-hero-photo" style={{ backgroundImage: `url('${heroImg}')` }} />
            )}
            <div>
              <p className="interview-eyebrow">{t.eyebrow} · {formatDate(post.date, lang)} · {minutes} {t.min}</p>
              {name && <p className="interview-name">{name}</p>}
              <h1 className="interview-quote">{quote}</h1>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mx-auto post-body" style={{ maxWidth: 760, color: "var(--color-ink)", fontSize: "18px", lineHeight: 1.75, fontFamily: "var(--font-body)" }} dangerouslySetInnerHTML={{ __html: processedHtml }} />

          {/* CTA final */}
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
        </div>

        <style>{`
          /* HERO */
          .interview-hero-grid { display: grid; grid-template-columns: 260px 1fr; gap: 48px; align-items: start; }
          .interview-hero-photo { width: 260px; height: 260px; border-radius: 6px; background-color: #ddd; background-position: center; background-size: cover; flex-shrink: 0; box-shadow: 0 18px 50px -22px rgba(15, 23, 42, 0.22); }
          .interview-eyebrow { font-family: var(--font-body); font-size: 12.5px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: var(--color-accent-deep); margin-bottom: 18px; }
          .interview-name { font-family: var(--font-display); font-size: clamp(20px, 2vw, 26px); color: var(--color-ink-2); font-weight: 400; margin-bottom: 18px; letter-spacing: -0.01em; }
          .interview-quote { font-family: var(--font-display); font-size: clamp(30px, 4vw, 50px); font-weight: 400; letter-spacing: -0.022em; line-height: 1.08; color: var(--color-navy); max-width: 26ch; margin: 0; font-style: italic; }
          .interview-quote::before { content: "«"; color: var(--color-accent); font-style: normal; margin-right: 4px; }
          .interview-quote::after { content: "»"; color: var(--color-accent); font-style: normal; margin-left: 4px; }
          @media (max-width: 760px) {
            .interview-hero-grid { grid-template-columns: 1fr; gap: 24px; }
            .interview-hero-photo { width: 180px; height: 180px; }
          }

          /* BODY base */
          .post-body { color: var(--color-ink-2); }
          .post-body > h1:first-child { display: none; }
          .post-body p { margin: 0 0 22px; color: var(--color-ink-2); }
          .post-body strong { color: var(--color-ink); font-weight: 600; }
          .post-body h2 { font-family: var(--font-display); font-weight: 500; color: var(--color-navy); font-size: clamp(28px, 2.8vw, 36px); letter-spacing: -0.02em; line-height: 1.15; margin: 48px 0 16px; max-width: 28ch; scroll-margin-top: 80px; }
          .post-body h3 { font-family: var(--font-display); font-weight: 500; color: var(--color-navy); font-size: clamp(22px, 2vw, 26px); letter-spacing: -0.015em; line-height: 1.2; margin: 36px 0 12px; max-width: 30ch; scroll-margin-top: 80px; }
          .post-body h4 { font-family: var(--font-display); font-weight: 600; color: var(--color-navy); font-size: 19px; margin: 28px 0 10px; }
          .post-body a { color: var(--color-accent-deep); text-decoration: underline; text-underline-offset: 3px; }
          .post-body a.auto-link { text-decoration-color: rgba(49,177,248,.5); text-decoration-thickness: 1.5px; }
          .post-body ul, .post-body ol { margin: 0 0 22px 24px; }
          .post-body li { margin-bottom: 10px; }
          .post-body img { max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; }
          .post-body figure { margin: 32px 0; }
          .post-body figcaption { font-size: 13px; color: var(--color-ink-3); text-align: center; margin-top: 8px; font-family: var(--font-body); }
          .post-body blockquote { margin: 48px 0; padding: 0 0 0 32px; border-left: 4px solid var(--color-accent); font-family: var(--font-display); font-size: clamp(22px, 2.4vw, 30px); font-weight: 400; line-height: 1.32; color: var(--color-navy); letter-spacing: -0.014em; font-style: italic; max-width: 34ch; }

          /* Q&A numerado: número grande naranja + pregunta */
          .post-body .qa-block { display: grid; grid-template-columns: 64px 1fr; gap: 18px; margin: 56px 0 14px; align-items: start; }
          .post-body .qa-block .qa-num { font-family: var(--font-display); font-size: 40px; font-weight: 400; color: var(--color-accent-deep); line-height: 1; letter-spacing: -0.024em; font-variant-numeric: tabular-nums; }
          .post-body .qa-block .qa-q { font-family: var(--font-display); font-size: clamp(22px, 2.4vw, 28px); font-weight: 500; letter-spacing: -0.014em; line-height: 1.22; color: var(--color-navy); margin: 0 !important; max-width: 30ch; }
          .post-body .qa-block + p { padding-left: 82px; }
          @media (max-width: 600px) {
            .post-body .qa-block { grid-template-columns: 48px 1fr; gap: 14px; }
            .post-body .qa-block .qa-num { font-size: 32px; }
            .post-body .qa-block + p { padding-left: 62px; }
          }

          /* Callout azul */
          .post-body .blue-callout { margin: 48px 0; background: rgba(49, 177, 248, 0.08); border: 1px solid rgba(49, 177, 248, 0.2); border-left: 4px solid var(--color-accent); border-radius: 0 12px 12px 0; padding: 28px 32px; }
          .post-body .blue-callout-quote { font-family: var(--font-display); font-size: clamp(20px, 2.2vw, 26px); font-weight: 400; line-height: 1.32; color: var(--color-navy); letter-spacing: -0.012em; margin: 0 !important; font-style: italic; }

          /* CTA final navy */
          .end-cta { background: var(--color-navy); border-radius: 14px; padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap; color: #fff; }
          .end-cta-text { flex: 1; min-width: 280px; }
          .end-cta-eyebrow { font-family: var(--font-body); font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--color-accent); margin-bottom: 10px; }
          .end-cta-title { font-family: var(--font-display); font-size: clamp(22px, 2.4vw, 28px); font-weight: 400; line-height: 1.2; color: #fff; letter-spacing: -0.014em; margin: 0 0 10px; max-width: 28ch; }
          .end-cta-sub { font-family: var(--font-body); font-size: 15px; line-height: 1.55; color: rgba(255, 255, 255, 0.74); margin: 0; max-width: 58ch; }

          @media (max-width: 700px) {
            .post-body { font-size: 17px !important; line-height: 1.7; }
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
                    <h3 className="font-medium mb-2 group-hover:text-[--color-accent-deep] transition" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 19, lineHeight: 1.25 }} dangerouslySetInnerHTML={{ __html: r.title }} />
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
