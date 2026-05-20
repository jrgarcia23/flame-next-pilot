import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { PostMeta, shortExcerpt, formatDate, categoryLabel } from "@/lib/comunidad";

export default function CommunityListTemplate({
  title,
  titleHl,
  desc,
  posts,
  enHref,
  emptyMessage,
}: {
  title: string;
  titleHl: string;
  desc: string;
  posts: PostMeta[];
  enHref: string;
  emptyMessage?: string;
}) {
  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} />

      {/* HERO listing */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white", paddingTop: "clamp(72px, 8.4vw, 116px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.14), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.08), transparent 72%)" }} />
        <div className="flame-container relative z-10">
          <a href="/es/comunidad/" className="inline-flex items-center gap-1.5 text-[14px] mb-6 transition" style={{ color: "rgb(255 255 255 / 0.62)" }}>
            <Icon name="arrow" className="w-3.5 h-3.5" style={{ transform: "rotate(180deg)" }} />
            <span>Comunidad</span>
          </a>
          <h1 className="text-[clamp(40px,5.2vw,64px)] font-normal mb-5" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
            {title} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{titleHl}</span>
          </h1>
          <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.78)", maxWidth: "60ch", fontFamily: "var(--font-body)" }}>
            {desc}
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          {posts.length === 0 ? (
            <div className="text-center mx-auto py-16" style={{ maxWidth: 560 }}>
              <p className="text-[17px] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                {emptyMessage || "Aún no hay contenido publicado en esta sección. Vuelve pronto."}
              </p>
              <a href="/es/comunidad/" className="cta-btn cta-btn--md mt-8 inline-flex" style={{ background: "var(--color-navy)", color: "#fff" }}>
                Volver a Comunidad <Icon name="arrow" className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <div className="grid gap-8 com-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {posts.map((p) => (
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
          )}
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
          .com-card h3 p, .com-card h3 a { color: inherit; }
          .com-card-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
          .com-card-excerpt { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
