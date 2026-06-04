import type { Metadata } from "next";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { getAllCategories, getAllPosts, categoryLabel, formatDate, shortExcerpt } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Comunidad · Flame Analytics",
  description: "Blog, entrevistas, casos de éxito, webinars y whitepapers de Flame Analytics. Inteligencia de espacios físicos para retail, hostelería y centros comerciales.",
  alternates: { canonical: "/es/comunidad/", languages: { es: "/es/comunidad/", en: "/en/community/" } },
};

export default function ComunidadHubEs() {
  const cats = getAllCategories("es");
  const allPosts = getAllPosts("es").sort((a, b) => (b.date > a.date ? 1 : -1));
  const featured = allPosts.slice(0, 6);

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang="es" enHref="/en/community/" />

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white", paddingTop: "clamp(72px, 8.4vw, 116px)", paddingBottom: "clamp(48px, 5vw, 80px)" }}>
        <div className="flame-container relative z-10" style={{ maxWidth: 900 }}>
          <p className="mb-4 font-medium" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
            Comunidad Flame
          </p>
          <h1 className="text-[clamp(36px,4.4vw,56px)] font-normal mb-5" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
            <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Insights, entrevistas y casos reales</span> sobre data intelligence para espacios físicos
          </h1>
          <p className="text-[clamp(17px,1.3vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "64ch" }}>
            {allPosts.length} artículos publicados — blog, entrevistas a líderes del retail, casos de éxito, webinars técnicos y whitepapers de investigación.
          </p>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="py-16" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {cats.map(c => (
              <a key={c.slug} href={`/es/categoria/${c.slug}/`} className="group block rounded-2xl p-6 transition" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="flex items-baseline justify-between mb-2">
                  <h2 className="font-medium" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.012em" }}>{categoryLabel(c.slug, "es")}</h2>
                  <span className="text-[14px]" style={{ color: "var(--color-accent-deep)" }}>{c.count}</span>
                </div>
                <p className="text-[14px]" style={{ color: "var(--color-ink-3)" }}>{c.count === 1 ? "1 artículo" : `${c.count} artículos`}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RECIENTES */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          <h2 className="font-normal mb-8" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.2vw, 38px)", letterSpacing: "-0.018em" }}>
            Recientes
          </h2>
          <div className="grid gap-8 community-recent-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {featured.map(p => {
              const img = p.thumbnail || p.hero;
              return (
              <a key={p.slug} href={`/es/${p.slug}/`} className="block group">
                {img && <div className="mb-4 rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1", background: `url('${img}') center/cover` }} />}
                <p className="text-[12px] uppercase font-semibold mb-2" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.08em" }}>{categoryLabel(p.category.slug, "es")}</p>
                <h3 className="font-medium mb-2" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 21, lineHeight: 1.22 }} dangerouslySetInnerHTML={{ __html: p.title }} />
                <p className="text-[14.5px] mb-2" style={{ color: "var(--color-ink-2)" }}>{shortExcerpt(p.html, 150)}</p>
                <p className="text-[13px]" style={{ color: "var(--color-ink-3)" }}>{formatDate(p.date, "es")}</p>
              </a>
              );
            })}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .community-recent-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .community-recent-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; } }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
