import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { PostFull, categoryLabel, formatDate, readingTime, getRelatedPosts, shortExcerpt } from "@/lib/comunidad";

export default function CommunityPostTemplate({ post }: { post: PostFull }) {
  const catLabel = categoryLabel(post.category);
  const catPath = `/es/comunidad/${post.category === "casos" ? "casos-de-exito" : post.category}/`;
  const minutes = readingTime(post.content);
  const related = getRelatedPosts(post.slug, post.category, 3);
  return (
    <>
      <CtaStyles />
      <SiteHeader />

      {/* HERO post */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white", paddingTop: "clamp(72px, 8.4vw, 116px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.14), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.08), transparent 72%)" }} />
        <div className="flame-container relative z-10" style={{ maxWidth: 820 }}>
          <nav className="text-[14px] mb-6 flex items-center gap-1.5" style={{ color: "rgb(255 255 255 / 0.6)" }}>
            <a href="/es/comunidad/" style={{ color: "inherit" }}>Comunidad</a>
            <span>›</span>
            <a href={catPath} style={{ color: "inherit" }}>{catLabel}</a>
          </nav>
          <h1 className="text-[clamp(32px,4.4vw,52px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, fontFamily: "var(--font-display)" }} dangerouslySetInnerHTML={{ __html: post.title }} />
          <div className="flex items-center gap-4 text-[14.5px] flex-wrap" style={{ color: "rgb(255 255 255 / 0.78)" }}>
            <a href={catPath} className="text-[12.5px] uppercase font-semibold inline-flex items-center" style={{ color: "var(--color-accent)", letterSpacing: "0.08em" }}>{catLabel}</a>
            <span style={{ color: "rgb(255 255 255 / 0.3)" }}>·</span>
            <span>{formatDate(post.date)}</span>
            <span style={{ color: "rgb(255 255 255 / 0.3)" }}>·</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="clock" className="w-3.5 h-3.5" /> {minutes} min de lectura</span>
          </div>
        </div>
      </section>

      {/* BODY */}
      <article className="py-20" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="mx-auto post-body" style={{ maxWidth: 760, color: "var(--color-ink)", fontSize: "17.5px", lineHeight: 1.75, fontFamily: "var(--font-body)" }} dangerouslySetInnerHTML={{ __html: post.content }} />
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
          .post-body strong { color: var(--color-navy); font-weight: 600; }
          .post-body blockquote { border-left: 3px solid var(--color-accent); padding: 0.4em 0 0.4em 1.4em; margin: 1.6em 0; color: var(--color-ink-2); font-style: italic; }
          .post-body img { max-width: 100%; height: auto; border-radius: 14px; margin: 1.5em 0; }
          .post-body figure { margin: 1.5em 0; }
          .post-body figcaption { font-size: 14px; color: var(--color-ink-3); text-align: center; margin-top: 0.5em; }
          .post-body table { width: 100%; border-collapse: collapse; margin: 1.5em 0; font-size: 16px; }
          .post-body th, .post-body td { border: 1px solid var(--color-rule); padding: 10px 14px; text-align: left; }
          .post-body th { background: var(--color-paper-soft); color: var(--color-navy); font-weight: 600; }
          .post-body hr { border: none; border-top: 1px solid var(--color-rule); margin: 2em 0; }
        `}</style>
      </article>

      {/* CTA strip */}
      <section className="py-8" style={{ background: "#fff", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
        <div className="flame-container">
          <div className="flex items-center gap-8 cta-strip-row">
            <p className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1" style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
              ¿Quieres aplicar esto en tu espacio?<br /><span style={{ color: "var(--color-ink-3)", fontWeight: 400 }}>Demo personalizada en 20 minutos.</span>
            </p>
            <a href="/es/contacta-draft/" className="cta-btn cta-btn--xl flex-shrink-0" style={{ background: "var(--color-navy)", color: "#fff" }}>
              Solicita una demo <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
        <style>{`
          .cta-btn--xl { font-size: 17px; padding: 16px 32px; }
          @media (max-width: 700px) { .cta-strip-row { flex-direction: column; align-items: flex-start; gap: 20px; } .cta-strip-row > p { flex: none; } }
        `}</style>
      </section>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-paper)" }}>
          <div className="flame-container">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <h2 className="text-[clamp(28px,3vw,40px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
                Sigue leyendo en <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{catLabel}</span>
              </h2>
              <a href={catPath} className="cta-btn cta-btn--md inline-flex" style={{ background: "var(--color-navy)", color: "#fff" }}>
                Ver todos <Icon name="arrow" className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid gap-8 com-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {related.map((p) => (
                <a key={p.id} href={`/es/comunidad/${p.slug}/`} className="com-card flex flex-col rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  <div className="overflow-hidden" style={{ aspectRatio: "1 / 1", background: "var(--color-paper-soft)" }}>
                    {p.img && <img src={p.img} alt="" className="com-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                  </div>
                  <div className="flex-1 flex flex-col p-7">
                    <div className="text-[12.5px] uppercase font-semibold flex items-center gap-2 mb-3" style={{ color: "var(--color-ink-3)", letterSpacing: "0.08em" }}>
                      <span style={{ color: "var(--color-accent-deep)" }}>{categoryLabel(p.category)}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{formatDate(p.date)}</span>
                    </div>
                    <h3 className="text-[19px] font-semibold leading-snug com-card-title mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em" }} dangerouslySetInnerHTML={{ __html: p.title }} />
                    <p className="text-[14.5px] leading-[1.6] com-card-excerpt" style={{ color: "var(--color-ink-2)" }}>{shortExcerpt(p.excerpt, 140)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 1000px) { .com-grid { grid-template-columns: repeat(2, 1fr) !important; } }
            @media (max-width: 640px)  { .com-grid { grid-template-columns: 1fr !important; } }
            .com-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms, box-shadow 420ms; }
            .com-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 12px 36px -18px rgb(15 23 42 / 0.18); }
            .com-card-img { transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1); }
            .com-card:hover .com-card-img { transform: scale(1.04); }
            .com-card:hover h3 { color: var(--color-accent-deep) !important; }
            .com-card h3 { transition: color 280ms; }
            .com-card-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
            .com-card-excerpt { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
          `}</style>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
