import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { COMUNIDAD_CATS, getListing, shortExcerpt, formatDate, categoryLabel } from "@/lib/comunidad";

export const metadata: Metadata = {
  title: "Comunidad · Flame Analytics",
  description: "Casos de éxito, blog, webinars y whitepapers de Flame Analytics. Aprendizajes, datos y casos reales de analítica para el espacio físico.",
};

export default function ComunidadHub() {
  const blogLatest = getListing("blog").slice(0, 6);
  return (
    <>
      <CtaStyles />
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white", paddingTop: "clamp(72px, 8.4vw, 116px)", paddingBottom: "clamp(56px, 6vw, 96px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 10% -10%, rgb(49 177 248 / 0.15), transparent 62%), radial-gradient(700px 450px at 92% 110%, rgb(49 177 248 / 0.08), transparent 72%)" }} />
        <div className="flame-container relative z-10" style={{ maxWidth: 820 }}>
          <h1 className="text-[clamp(44px,5.6vw,72px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
            Comunidad <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Flame</span>
          </h1>
          <p className="text-[clamp(18px,1.45vw,21px)] leading-[1.5]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "60ch", fontFamily: "var(--font-body)" }}>
            Casos reales, aprendizajes y conversaciones con quienes están transformando el espacio físico con datos.
          </p>
        </div>
      </section>

      {/* 4 CATEGORÍAS */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-6 cats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {COMUNIDAD_CATS.map((c) => {
              const count = getListing(c.key).length;
              return (
                <a key={c.key} href={c.path} className="cat-card flex flex-col rounded-2xl p-8" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  <div className="cat-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                    <Icon name={c.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-[22px] font-semibold mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.008em" }}>{c.label}</h3>
                  <p className="text-[15px] leading-[1.6] flex-1" style={{ color: "var(--color-ink-2)" }}>{c.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[13px] font-medium" style={{ color: "var(--color-ink-3)" }}>{count} {count === 1 ? "artículo" : "artículos"}</span>
                    <span className="cat-cta inline-flex items-center gap-1.5 text-[14.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>
                      Ver <Icon name="arrow" className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .cats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px)  { .cats-grid { grid-template-columns: 1fr !important; } }
          .cat-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms, box-shadow 420ms; }
          .cat-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 12px 36px -18px rgb(15 23 42 / 0.18); }
          .cat-card .cat-cta { transition: gap 420ms; }
          .cat-card:hover .cat-cta { gap: 10px; }
          .cat-card .cat-icon { transition: background 420ms, color 420ms; }
          .cat-card:hover .cat-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* ÚLTIMOS DEL BLOG */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              Último en el <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>Blog</span>
            </h2>
            <a href="/es/comunidad/blog/" className="cta-btn cta-btn--md inline-flex" style={{ background: "var(--color-navy)", color: "#fff" }}>
              Ver todos <Icon name="arrow" className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid gap-8 com-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {blogLatest.map((p) => (
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

      <SiteFooter />
    </>
  );
}
