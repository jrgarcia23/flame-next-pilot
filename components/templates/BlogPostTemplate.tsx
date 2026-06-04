import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { BlogPost, categoryLabel, categoryUrl, formatDate, readingTime, getRelatedPosts, shortExcerpt, Lang } from "@/lib/blog";

const I18N = {
  es: { breadcrumbHome: "Inicio", min: "min de lectura", related: "Posts relacionados", readMore: "Leer post", share: "Compartir", category: "Categoría" },
  en: { breadcrumbHome: "Home", min: "min read", related: "Related posts", readMore: "Read post", share: "Share", category: "Category" },
};

export default function BlogPostTemplate({ post }: { post: BlogPost }) {
  const lang: Lang = post.lang;
  const t = I18N[lang];
  const catLabel = categoryLabel(post.category.slug, lang);
  const catPath = categoryUrl(post.category.slug, lang);
  const minutes = readingTime(post.html);
  const related = getRelatedPosts(post.slug, post.category.slug, lang, 3);
  const enHref = lang === "es" ? `/en/` : `/es/`;

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={lang} enHref={enHref} />

      {/* HERO post */}
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
      <article className="py-20" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="mx-auto post-body" style={{ maxWidth: 760, color: "var(--color-ink)", fontSize: "17.5px", lineHeight: 1.75, fontFamily: "var(--font-body)" }} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <style>{`
          .post-body { color: var(--color-ink); }
          .post-body > h1:first-child { display: none; }
          .post-body h2 { font-family: var(--font-display); font-weight: 500; color: var(--color-navy); font-size: clamp(26px, 2.8vw, 36px); letter-spacing: -0.018em; line-height: 1.18; margin: 2.4em 0 0.8em; }
          .post-body h3 { font-family: var(--font-display); font-weight: 500; color: var(--color-navy); font-size: clamp(21px, 2.2vw, 26px); letter-spacing: -0.012em; margin: 2em 0 0.6em; }
          .post-body h4 { font-weight: 600; color: var(--color-navy); font-size: 19px; margin: 1.6em 0 0.5em; }
          .post-body p { margin: 0 0 1.3em; }
          .post-body a { color: var(--color-accent-deep); border-bottom: 1px solid currentColor; }
          .post-body a:hover { color: var(--color-accent); }
          .post-body ul, .post-body ol { margin: 0 0 1.4em; padding-left: 1.5em; }
          .post-body li { margin-bottom: 0.5em; }
          .post-body img { max-width: 100%; height: auto; border-radius: 12px; margin: 1.6em 0; }
          .post-body blockquote { border-left: 4px solid var(--color-accent); padding: 0.6em 0 0.6em 1.2em; margin: 1.6em 0; font-style: italic; color: var(--color-ink-2); }
          .post-body figure { margin: 1.6em 0; }
          .post-body figcaption { font-size: 14px; color: var(--color-ink-3); text-align: center; margin-top: 0.6em; }
          .post-body table { width: 100%; border-collapse: collapse; margin: 1.6em 0; font-size: 15.5px; }
          .post-body th, .post-body td { border: 1px solid var(--color-rule); padding: 10px 14px; text-align: left; }
          .post-body th { background: var(--color-bg-accent); font-weight: 600; color: var(--color-navy); }
          .post-body .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 1.6em 0; }
          @media (max-width: 700px) {
            .post-body { font-size: 16.5px !important; line-height: 1.65; }
            .post-body table { display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; white-space: nowrap; }
          }
        `}</style>
      </article>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: "#fff" }}>
          <div className="flame-container">
            <h2 className="font-normal mb-8 text-center" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.018em" }}>
              {t.related}
            </h2>
            <div className="grid gap-6 related-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {related.map(r => (
                <a key={r.slug} href={`/${lang}/${r.slug}/`} className="block rounded-2xl overflow-hidden group" style={{ background: "var(--color-paper)", border: "1px solid var(--color-rule)" }}>
                  {r.hero && <div style={{ aspectRatio: "16/9", background: `url('${r.hero}') center/cover` }} />}
                  <div className="p-6">
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

      <SiteFooter currentLang={currentLang} />
    </>
  );
}
