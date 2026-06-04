import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { BlogPost, categoryLabel, categoryUrl, formatDate, readingTime, getRelatedPosts, shortExcerpt, Lang } from "@/lib/blog";

const I18N = {
  es: { breadcrumbHome: "Inicio", min: "min de lectura", related: "Posts relacionados", toc: "Contenido del artículo", ctaEyebrow: "Demo personalizada · 20 minutos", ctaTitle: "Convierte el tráfico físico en decisiones de negocio", ctaSub: "Te enseñamos cómo Flame mide tráfico, conversión y comportamiento en tus tiendas, malls u hoteles. Caso real de tu sector, sin biometría y con RGPD por diseño. 180+ clientes B2B en 23 países.", ctaBtn: "Solicitar demo →" },
  en: { breadcrumbHome: "Home", min: "min read", related: "Related posts", toc: "Article contents", ctaEyebrow: "Personalised demo · 20 minutes", ctaTitle: "Turn physical traffic into business decisions", ctaSub: "We show you how Flame measures traffic, conversion and behaviour in your stores, malls or hotels. Real case from your sector, no biometrics, GDPR by design. 180+ B2B clients across 23 countries.", ctaBtn: "Request demo →" },
};

// Procesa el HTML del post: quita primera figure redundante, añade IDs a los H2,
// e inyecta el TOC tras el primer párrafo si hay ≥3 H2.
function processPostHtml(html: string, addToc: boolean, tocHtml: string): string {
  // 1. Eliminar la primera <figure> si abre el contenido (la imagen del hero repetida)
  let processed = html.replace(/^\s*<figure[^>]*>[\s\S]*?<\/figure>\s*/, "");
  // 2. Asignar IDs a los H2 sin ID
  let idx = 0;
  processed = processed.replace(/<h2(\s[^>]*)?>([\s\S]*?)<\/h2>/g, (match, attrs = "", text) => {
    if (/\sid=/.test(attrs || "")) return match;
    const id = `h${idx++}`;
    return `<h2${attrs || ""} id="${id}">${text}</h2>`;
  });
  // 3. Inyectar TOC tras el primer </p>
  if (addToc && tocHtml) {
    processed = processed.replace(/<\/p>/, `</p>${tocHtml}`);
  }
  return processed;
}

function extractH2Titles(html: string): { id: string; title: string }[] {
  const matches = Array.from(html.matchAll(/<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/g));
  return matches.map((m, i) => ({ id: `h${i}`, title: m[1].replace(/<[^>]+>/g, "").trim() }));
}

export default function BlogPostTemplate({ post }: { post: BlogPost }) {
  const lang: Lang = post.lang;
  const t = I18N[lang];
  const catLabel = categoryLabel(post.category.slug, lang);
  const catPath = categoryUrl(post.category.slug, lang);
  const minutes = readingTime(post.html);
  const related = getRelatedPosts(post.slug, post.category.slug, lang, 3);
  const enHref = lang === "es" ? `/en/` : `/es/`;

  // El nuevo formato editorial (TOC + CTA final + sin imagen body) se aplica solo a posts
  // de la categoría "blog". Entrevistas, casos, webinars y whitepapers conservan template clásico
  // hasta que JR confirme cada caso. Esto evita romper formatos que aún no he iterado con él.
  const isStandardBlogPost = post.category.slug === "blog";

  // Generar TOC sólo si es post estándar y hay ≥3 H2
  const h2s = isStandardBlogPost ? extractH2Titles(post.html) : [];
  const hasToc = h2s.length >= 3;
  const tocHtml = hasToc
    ? `<nav class="toc-top"><h4>${t.toc}</h4><ol>${h2s.map(h => `<li><a href="#${h.id}">${h.title}</a></li>`).join("")}</ol></nav>`
    : "";

  const processedHtml = isStandardBlogPost
    ? processPostHtml(post.html, hasToc, tocHtml)
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
          {/* Para entrevistas/casos/etc seguimos mostrando la imagen hero arriba; en posts blog la quitamos */}
          {!isStandardBlogPost && (post.thumbnail || post.hero) && (
            <div className="mx-auto mb-10 rounded-2xl overflow-hidden" style={{ maxWidth: 760, aspectRatio: "16/9", background: `url('${post.thumbnail || post.hero}') center/cover`, boxShadow: "0 18px 50px -22px rgb(15 23 42 / 0.22)" }} />
          )}
          <div className="mx-auto post-body" style={{ maxWidth: 760, color: "var(--color-ink)", fontSize: "18px", lineHeight: 1.75, fontFamily: "var(--font-body)" }} dangerouslySetInnerHTML={{ __html: processedHtml }} />

          {/* CTA final inline (solo posts blog) — formato banda navy horizontal del mismo ancho */}
          {isStandardBlogPost && (
            <aside className="mx-auto end-cta" style={{ maxWidth: 760, marginTop: 64 }}>
              <div className="end-cta-text">
                <p className="end-cta-eyebrow">{t.ctaEyebrow}</p>
                <p className="end-cta-title">{t.ctaTitle}</p>
                <p className="end-cta-sub">{t.ctaSub}</p>
              </div>
              <a href={`/${lang}/#contact`} className="cta-btn cta-btn--primary cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                {t.ctaBtn}
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

          /* Blockquote = pull-quote editorial */
          .post-body blockquote {
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

          /* Tablas editoriales con thead fondo azulito */
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

          /* TOC arriba — caja editorial fondo azulito transparente */
          .post-body .toc-top {
            background: rgba(49, 177, 248, 0.06);
            border: 1px solid rgba(49, 177, 248, 0.16);
            border-radius: 12px;
            padding: 28px 32px;
            margin: 32px 0 36px;
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
