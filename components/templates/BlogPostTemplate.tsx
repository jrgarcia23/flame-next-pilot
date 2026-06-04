import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { BlogPost, categoryLabel, categoryUrl, formatDate, readingTime, getRelatedPosts, shortExcerpt, Lang } from "@/lib/blog";

const I18N = {
  es: {
    breadcrumbHome: "Inicio", min: "min de lectura", related: "Posts relacionados",
    toc: "Contenido del artículo",
    midCtaEyebrow: "Ver Flame en acción",
    midCtaTitle: "¿Quieres ver cómo lo medirías en tu espacio?",
    midCtaBtn: "Solicita una demo",
    endCtaEyebrow: "Demo personalizada · 20 minutos",
    endCtaTitle: "Convierte el tráfico físico en decisiones de negocio",
    endCtaSub: "Te enseñamos cómo Flame mide tráfico, conversión y comportamiento en tus tiendas, malls u hoteles. Caso real de tu sector, sin biometría y con RGPD por diseño. 180+ clientes B2B en 23 países.",
    endCtaBtn: "Solicitar demo →",
  },
  en: {
    breadcrumbHome: "Home", min: "min read", related: "Related posts",
    toc: "Article contents",
    midCtaEyebrow: "See Flame in action",
    midCtaTitle: "Want to see how this works in your space?",
    midCtaBtn: "Request a demo",
    endCtaEyebrow: "Personalised demo · 20 minutes",
    endCtaTitle: "Turn physical traffic into business decisions",
    endCtaSub: "We show you how Flame measures traffic, conversion and behaviour in your stores, malls or hotels. Real case from your sector, no biometrics, GDPR by design. 180+ B2B clients across 23 countries.",
    endCtaBtn: "Request demo →",
  },
};

/** Extrae los H2 (texto plano) del HTML para construir el TOC. */
function extractH2Titles(html: string): { id: string; title: string }[] {
  const matches = Array.from(html.matchAll(/<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/g));
  return matches.map((m, i) => ({ id: `h${i}`, title: m[1].replace(/<[^>]+>/g, "").trim() }));
}

/** Selecciona una cita corta del primer tercio del post para inyectarla como pull-quote. */
function pickPullQuote(html: string): string {
  const ps = Array.from(html.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/g))
    .map(m => m[1].replace(/<[^>]+>/g, "").trim())
    .filter(s => s.length > 80 && s.length < 400 && !/&nbsp;/.test(s));
  if (!ps.length) return "";
  // Tomar uno del primer tercio
  const target = ps[Math.floor(ps.length * 0.25)] || ps[0];
  // Primera frase
  const m = target.match(/^[^.!?]+[.!?]/);
  return (m ? m[0] : target).trim();
}

/**
 * Procesa el HTML del post:
 * - Elimina la 1ª figura/imagen redundante al inicio (la portada ya está en el listado).
 * - Asigna IDs a los H2.
 * - Inyecta TOC al inicio, pull-quote en el 1er cuarto, CTA intermedio a la mitad.
 */
function processPostHtml(html: string, tocHtml: string, pullQuoteHtml: string, midCtaHtml: string): string {
  let processed = html;

  // 1. Limpiar imágenes/figures iniciales (1 o 2 elementos)
  for (let i = 0; i < 2; i++) {
    processed = processed
      .replace(/^\s*<figure[^>]*>[\s\S]*?<\/figure>\s*/, "")
      .replace(/^\s*<p[^>]*>\s*<img[^>]+>\s*<\/p>\s*/, "")
      .replace(/^\s*<img[^>]+>\s*/, "")
      .replace(/^\s*<div[^>]*class=["'][^"']*wp-block-image[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/, "");
  }

  // 2. IDs a H2
  let idx = 0;
  processed = processed.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (match, attrs = "", text) => {
    if (/\sid=/.test(attrs || "")) return match;
    return `<h2${attrs || ""} id="h${idx++}">${text}</h2>`;
  });

  // 3. Recolectar posiciones de cierre de párrafos para inyecciones
  const pCloses: number[] = [];
  let pos = -1;
  while ((pos = processed.indexOf("</p>", pos + 1)) !== -1) pCloses.push(pos + 4);

  // Inyectar de mayor índice a menor para no descolocar offsets
  const inserts: { pos: number; html: string }[] = [];
  if (midCtaHtml && pCloses.length >= 6) {
    const mid = pCloses[Math.floor(pCloses.length / 2)];
    inserts.push({ pos: mid, html: midCtaHtml });
  }
  if (pullQuoteHtml && pCloses.length >= 4) {
    const q = pCloses[Math.floor(pCloses.length / 4)];
    inserts.push({ pos: q, html: pullQuoteHtml });
  }
  inserts.sort((a, b) => b.pos - a.pos);
  for (const ins of inserts) {
    processed = processed.slice(0, ins.pos) + ins.html + processed.slice(ins.pos);
  }

  // 4. TOC arriba del contenido
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

  // Formato editorial enriquecido (TOC + pull-quote + CTA intermedio + CTA final) solo
  // para posts cat="blog". Entrevistas/casos/webinars conservan el template clásico
  // hasta que JR confirme cada formato.
  const isStandardBlogPost = post.category.slug === "blog";

  const h2s = isStandardBlogPost ? extractH2Titles(post.html) : [];
  const hasToc = h2s.length >= 3;
  const tocHtml = hasToc
    ? `<nav class="toc-top"><h4>${t.toc}</h4><ol>${h2s.map(h => `<li><a href="#${h.id}">${h.title}</a></li>`).join("")}</ol></nav>`
    : "";

  const quote = isStandardBlogPost ? pickPullQuote(post.html) : "";
  const pullQuoteHtml = quote ? `<blockquote class="auto-pull-quote">${quote}</blockquote>` : "";

  const midCtaHtml = isStandardBlogPost
    ? `<aside class="mid-cta"><div class="mid-cta-text"><p class="mid-cta-eyebrow">${t.midCtaEyebrow}</p><p class="mid-cta-title">${t.midCtaTitle}</p></div><a href="/${lang}/#contact" class="mid-cta-btn">${t.midCtaBtn} →</a></aside>`
    : "";

  const processedHtml = isStandardBlogPost
    ? processPostHtml(post.html, tocHtml, pullQuoteHtml, midCtaHtml)
    : post.html;

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={lang} enHref={enHref} />

      {/* HERO post — fondo navy con título */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white", paddingTop: "clamp(72px, 8.4vw, 116px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.14), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.08), transparent 72%)" }} />
        <div className="flame-container relative z-10" style={{ maxWidth: 820 }}>
          <nav className="text-[14px] mb-6 flex items-center gap-1.5" style={{ color: "rgb(255 255 255 / 0.6)" }}>
            <a href={`/${lang}/`} style={{ color: "inherit" }}>{t.breadcrumbHome}</a>
            <span>›</span>
            <a href={catPath} style={{ color: "inherit" }}>{catLabel}</a>
          </nav>
          <h1 className="text-[clamp(32px,4.4vw,52px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, fontFamily: "var(--font-display)" }} dangerouslySetInnerHTML={{ __html: post.title }} />
          <div className="flex items-center gap-4 text-[14.5px] flex-wrap" style={{ color: "rgb(255 255 255 / 0.78)" }}>
            <a href={catPath} className="text-[12.5px] uppercase font-semibold inline-flex items-center" style={{ color: "var(--color-accent)", letterSpacing: "0.08em" }}>{catLabel}</a>
            <span style={{ color: "rgb(255 255 255 / 0.3)" }}>·</span>
            <span>{formatDate(post.date, lang)}</span>
            <span style={{ color: "rgb(255 255 255 / 0.3)" }}>·</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="w-3.5 h-3.5" /> {minutes} {t.min}</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          {/* Entrevistas/casos/webinars conservan la imagen hero arriba del cuerpo;
              en posts cat="blog" no se muestra ninguna imagen (la del listado ya está). */}
          {!isStandardBlogPost && (post.thumbnail || post.hero) && (
            <div className="mx-auto mb-10 rounded-2xl overflow-hidden" style={{ maxWidth: 760, aspectRatio: "16/9", background: `url('${post.thumbnail || post.hero}') center/cover`, boxShadow: "0 18px 50px -22px rgb(15 23 42 / 0.22)" }} />
          )}
          <div className="mx-auto post-body" style={{ maxWidth: 760, color: "var(--color-ink)", fontSize: "18px", lineHeight: 1.75, fontFamily: "var(--font-body)" }} dangerouslySetInnerHTML={{ __html: processedHtml }} />

          {/* CTA final inline (solo posts blog) */}
          {isStandardBlogPost && (
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
          .post-body h3 { font-family: var(--font-display); font-weight: 500; color: var(--color-navy); font-size: clamp(22px, 2vw, 26px); letter-spacing: -0.015em; line-height: 1.2; margin: 36px 0 12px; max-width: 30ch; }
          .post-body h4 { font-family: var(--font-display); font-weight: 600; color: var(--color-navy); font-size: 19px; margin: 28px 0 10px; }
          .post-body a { color: var(--color-accent-deep); text-decoration: underline; text-underline-offset: 3px; }
          .post-body a:hover { color: var(--color-accent); }
          .post-body ul, .post-body ol { margin: 0 0 22px 24px; }
          .post-body li { margin-bottom: 10px; }
          .post-body img { max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; }
          .post-body figure { margin: 32px 0; }
          .post-body figcaption { font-size: 13px; color: var(--color-ink-3); text-align: center; margin-top: 8px; font-family: var(--font-body); }

          /* Blockquote y pull-quote auto-inyectado: pull-quote editorial */
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

          /* Tablas con thead fondo azulito transparente */
          .post-body table {
            width: 100%;
            border-collapse: collapse;
            margin: 40px 0;
            font-family: var(--font-body);
            font-size: 15px;
            border-top: 2px solid var(--color-navy);
            border-bottom: 2px solid var(--color-navy);
          }
          .post-body thead { background: rgba(49, 177, 248, 0.06); }
          .post-body th {
            text-align: left;
            padding: 14px 16px;
            font-family: var(--font-display);
            font-weight: 500;
            font-size: 14px;
            color: var(--color-navy);
            letter-spacing: -0.005em;
            border-bottom: 1px solid var(--color-rule);
          }
          .post-body td {
            padding: 14px 16px;
            border-bottom: 1px solid var(--color-rule);
            color: var(--color-ink-2);
            line-height: 1.5;
          }
          .post-body tbody tr:nth-child(even) { background: rgba(49, 177, 248, 0.03); }
          .post-body tbody tr:last-child td { border-bottom: 0; }

          /* TOC arriba (primer elemento del body) — fondo azulito transparente */
          .post-body .toc-top {
            background: rgba(49, 177, 248, 0.06);
            border: 1px solid rgba(49, 177, 248, 0.16);
            border-radius: 12px;
            padding: 28px 32px;
            margin: 0 0 40px;
          }
          .post-body .toc-top h4 {
            font-family: var(--font-body);
            font-size: 11.5px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--color-accent-deep);
            margin-bottom: 18px;
            max-width: none;
          }
          .post-body .toc-top ol {
            list-style: none;
            counter-reset: toc;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px 32px;
          }
          .post-body .toc-top li {
            counter-increment: toc;
            padding-left: 32px;
            position: relative;
            line-height: 1.4;
            font-family: var(--font-body);
            margin-bottom: 0;
          }
          .post-body .toc-top li::before {
            content: counter(toc, decimal-leading-zero);
            position: absolute;
            left: 0;
            top: 1px;
            font-family: var(--font-display);
            font-size: 13px;
            color: var(--color-accent-deep);
            font-weight: 500;
            letter-spacing: 0.04em;
          }
          .post-body .toc-top li a {
            font-size: 14.5px;
            color: var(--color-ink-2);
            line-height: 1.4;
            border-bottom: 1px solid transparent;
            text-decoration: none;
            padding-bottom: 1px;
          }
          .post-body .toc-top li a:hover {
            color: var(--color-navy);
            border-color: var(--color-accent);
          }

          /* CTA intermedio inline — cyan claro, horizontal */
          .post-body .mid-cta {
            margin: 48px 0;
            background: rgba(49, 177, 248, 0.08);
            border: 1px solid rgba(49, 177, 248, 0.2);
            border-radius: 12px;
            padding: 24px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
          }
          .post-body .mid-cta-text { flex: 1; min-width: 220px; }
          .post-body .mid-cta-eyebrow {
            font-family: var(--font-body);
            font-size: 11.5px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--color-accent-deep);
            margin: 0 0 6px;
          }
          .post-body .mid-cta-title {
            font-family: var(--font-display);
            font-size: clamp(18px, 1.9vw, 22px);
            font-weight: 500;
            line-height: 1.25;
            color: var(--color-navy);
            letter-spacing: -0.012em;
            margin: 0;
            max-width: 30ch;
          }
          .post-body .mid-cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: var(--color-accent);
            color: #fff !important;
            font-family: var(--font-body);
            font-weight: 700;
            font-size: 14.5px;
            padding: 12px 22px;
            border-radius: 4px;
            text-decoration: none !important;
            border: none;
            flex-shrink: 0;
            transition: filter 240ms, transform 240ms, box-shadow 240ms;
          }
          .post-body .mid-cta-btn:hover {
            filter: brightness(0.94);
            transform: translateY(-1px);
            box-shadow: 0 6px 16px -10px rgb(15 23 42 / 0.18);
          }

          /* CTA final inline — banda navy horizontal */
          .end-cta {
            background: var(--color-navy);
            border-radius: 14px;
            padding: 32px 36px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 28px;
            flex-wrap: wrap;
            color: #fff;
          }
          .end-cta-text { flex: 1; min-width: 280px; }
          .end-cta-eyebrow {
            font-family: var(--font-body);
            font-size: 11.5px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            font-weight: 700;
            color: var(--color-accent);
            margin-bottom: 10px;
          }
          .end-cta-title {
            font-family: var(--font-display);
            font-size: clamp(22px, 2.4vw, 28px);
            font-weight: 400;
            line-height: 1.2;
            color: #fff;
            letter-spacing: -0.014em;
            margin: 0 0 10px;
            max-width: 28ch;
          }
          .end-cta-sub {
            font-family: var(--font-body);
            font-size: 15px;
            line-height: 1.55;
            color: rgba(255, 255, 255, 0.74);
            margin: 0;
            max-width: 58ch;
          }

          @media (max-width: 700px) {
            .post-body { font-size: 17px !important; line-height: 1.7; }
            .post-body .toc-top ol { grid-template-columns: 1fr; gap: 10px; }
            .post-body table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
            .post-body .mid-cta { padding: 20px 22px; }
            .end-cta { padding: 28px 24px; }
          }
        `}</style>
      </article>

      {/* RELATED */}
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
