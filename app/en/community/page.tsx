import type { Metadata } from "next";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { getCategoryListing, getAllWhitepapers, formatDate, shortExcerpt, categoryLabel } from "@/lib/blog";
import Icon from "@/components/templates/Icon";

export const metadata: Metadata = {
  title: "Community · Flame Analytics",
  description: "Interviews, case studies, blog, webinars and whitepapers on retail, shopping malls, hospitality and public venues. The Flame Analytics community for physical-space intelligence.",
  alternates: { canonical: "/en/community/", languages: {
    en: "/en/community/",
    es: "/es/comunidad/",
    "x-default": "/es/comunidad/",
  } },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/community/",
    siteName: "Flame Analytics",
    title: "Community · Flame Analytics",
    description: "Interviews, real case studies, technical webinars and downloads for decision-makers in retail, shopping malls and hospitality.",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Partners-1-scaled-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community · Flame Analytics",
    description: "Interviews, real case studies, technical webinars and downloads for decision-makers in retail, shopping malls and hospitality.",
    images: ["/wp-content/uploads/2026/01/Partners-1-scaled-1.png"],
  },
};

type SectionMeta = {
  slug: string;
  href: string;
  label: string;
  tagline: string;
  total: number;
};

export default function CommunityHubEn() {
  const ent = getCategoryListing("interviews",   "en");
  const cas = getCategoryListing("case-studies", "en");
  const blo = getCategoryListing("blog",         "en");
  const web = getCategoryListing("webinars",     "en");
  const wp  = getAllWhitepapers("en").sort((a, b) => (b.date > a.date ? 1 : -1));

  const sections: { meta: SectionMeta; items: typeof ent; cols: 3 | 4 }[] = [
    {
      meta: { slug: "interviews",   href: "/en/category/interviews/",   label: "Interviews",       tagline: "Conversations with decision-makers in retail and shopping malls.",     total: ent.length },
      items: ent.slice(0, 3),
      cols: 3 as const,
    },
    {
      meta: { slug: "case-studies", href: "/en/category/case-studies/", label: "Case studies",     tagline: "How our clients measure, decide and improve with Flame.",              total: cas.length },
      items: cas.slice(0, 3),
      cols: 3 as const,
    },
    {
      meta: { slug: "blog",         href: "/en/category/blog/",         label: "Blog articles",    tagline: "Analysis, trends and applied knowledge for physical spaces.",          total: blo.length },
      items: blo.slice(0, 4),
      cols: 4 as const,
    },
    {
      meta: { slug: "webinars",     href: "/en/category/webinars/",     label: "Webinars",         tagline: "Technical sessions with industry experts.",                            total: web.length },
      items: web.slice(0, 3),
      cols: 3 as const,
    },
  ].filter(s => s.items.length > 0);

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang="en" enHref="/en/community/" />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: "url('/wp-content/uploads/2026/01/Partners-1-scaled-1.png')",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(40px, 5vw, 72px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, var(--color-navy) 0%, rgb(21 22 58 / 0.92) 38%, rgb(21 22 58 / 0.55) 70%, rgb(21 22 58 / 0.25) 100%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 720 }}>
            <p
              className="mb-4 font-medium"
              style={{
                color: "var(--color-accent)",
                fontSize: 13,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Flame Community
            </p>
            <h1
              className="text-[clamp(40px,5vw,62px)] font-normal mb-6"
              style={{
                color: "#fff",
                letterSpacing: "-0.022em",
                lineHeight: 1.06,
                fontFamily: "var(--font-display)",
              }}
            >
              Welcome to our{" "}
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>community</span>
            </h1>
            <p
              className="text-[clamp(17px,1.3vw,19px)] leading-[1.6]"
              style={{ color: "rgb(255 255 255 / 0.85)", maxWidth: "62ch" }}
            >
              In this community we talk about retail, shopping malls, hospitality, public venues and much more. Interviews with industry leaders, real customer stories, technical webinars and downloads for those who make decisions about physical spaces.
            </p>
          </div>
        </div>
      </section>

      {sections.map((s, idx) => (
        <section
          key={s.meta.slug}
          className="py-[clamp(56px,6vw,88px)]"
          style={{ background: idx % 2 === 0 ? "var(--color-paper)" : "#fff" }}
        >
          <div className="flame-container">
            <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
              <div style={{ maxWidth: 640 }}>
                <p
                  className="text-[12px] uppercase font-semibold mb-2"
                  style={{ color: "var(--color-accent-deep)", letterSpacing: "0.1em" }}
                >
                  {s.meta.label}
                </p>
                <h2
                  className="font-normal mb-2"
                  style={{
                    color: "var(--color-navy)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 3.2vw, 38px)",
                    letterSpacing: "-0.018em",
                    lineHeight: 1.1,
                  }}
                >
                  {s.meta.tagline}
                </h2>
              </div>
              <a
                href={s.meta.href}
                className="inline-flex items-center gap-2 font-medium text-[15px] hover:gap-3 transition-all"
                style={{ color: "var(--color-accent-deep)" }}
              >
                View all ({s.meta.total})
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div
              className="grid gap-7 hub-grid"
              style={{ gridTemplateColumns: `repeat(${s.cols}, 1fr)` }}
              data-cols={s.cols}
            >
              {s.items.map(p => {
                const img = p.thumbnail || p.hero;
                return (
                  <a
                    key={p.slug}
                    href={`/en/${p.slug}/`}
                    className="block group rounded-2xl overflow-hidden hub-card"
                    style={{ background: "#fff", border: "1px solid var(--color-rule)" }}
                  >
                    {img && (
                      <div style={{ aspectRatio: "1/1", background: `url('${img}') center/cover` }} />
                    )}
                    <div className="p-5">
                      <p
                        className="text-[11.5px] uppercase font-semibold mb-2"
                        style={{ color: "var(--color-accent-deep)", letterSpacing: "0.08em" }}
                      >
                        {categoryLabel(p.category.slug, "en")}
                      </p>
                      <h3
                        className="font-medium mb-2 group-hover:text-[--color-accent-deep] transition"
                        style={{
                          color: "var(--color-navy)",
                          fontFamily: "var(--font-display)",
                          fontSize: 19,
                          lineHeight: 1.22,
                        }}
                        dangerouslySetInnerHTML={{ __html: p.title }}
                      />
                      <p className="text-[14px] mb-2" style={{ color: "var(--color-ink-2)" }}>
                        {shortExcerpt(p.html, 110)}
                      </p>
                      <p className="text-[12.5px]" style={{ color: "var(--color-ink-3)" }}>
                        {formatDate(p.date, "en")}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {wp.length > 0 && (
        <section className="py-[clamp(64px,7vw,96px)]" style={{ background: "var(--color-navy)", color: "#fff" }}>
          <div className="flame-container">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div style={{ maxWidth: 640 }}>
                <p
                  className="text-[12px] uppercase font-semibold mb-2"
                  style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}
                >
                  Downloads
                </p>
                <h2
                  className="font-normal mb-2"
                  style={{
                    color: "#fff",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 3.2vw, 38px)",
                    letterSpacing: "-0.018em",
                    lineHeight: 1.1,
                  }}
                >
                  Whitepapers & <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>technical reports</span>
                </h2>
                <p className="text-[16px]" style={{ color: "rgb(255 255 255 / 0.75)", maxWidth: "55ch" }}>
                  Applied research, KPIs and downloadable guides for retail, shopping malls and hospitality.
                </p>
              </div>
              <a
                href="/en/category/blog/"
                className="inline-flex items-center gap-2 font-medium text-[15px] hover:gap-3 transition-all"
                style={{ color: "var(--color-accent)" }}
              >
                View all ({wp.length})
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div className="grid gap-6 wp-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {wp.slice(0, 6).map(w => {
                const img = w.thumbnail || w.hero;
                return (
                  <a
                    key={w.slug}
                    href={`/en/whitepaper/${w.slug}/`}
                    className="block group rounded-2xl overflow-hidden hub-card"
                    style={{ background: "rgb(255 255 255 / 0.05)", border: "1px solid rgb(255 255 255 / 0.12)" }}
                  >
                    {img && (
                      <div style={{ aspectRatio: "1/1", background: `url('${img}') center/cover` }} />
                    )}
                    <div className="p-5">
                      <p
                        className="text-[11.5px] uppercase font-semibold mb-2"
                        style={{ color: "var(--color-accent)", letterSpacing: "0.08em" }}
                      >
                        Whitepaper
                      </p>
                      <h3
                        className="font-medium mb-3"
                        style={{
                          color: "#fff",
                          fontFamily: "var(--font-display)",
                          fontSize: 18,
                          lineHeight: 1.22,
                        }}
                        dangerouslySetInnerHTML={{ __html: w.title }}
                      />
                      <span
                        className="inline-flex items-center gap-1.5 text-[13.5px] font-medium"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Download
                        <Icon name="arrow" className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-[clamp(56px,6vw,80px)]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div
            className="rounded-3xl p-[clamp(32px,5vw,60px)] text-center mx-auto"
            style={{
              maxWidth: 900,
              background: "#fff",
              border: "1px solid var(--color-rule)",
            }}
          >
            <h2
              className="font-normal mb-3"
              style={{
                color: "var(--color-navy)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 3vw, 36px)",
                letterSpacing: "-0.018em",
                lineHeight: 1.1,
              }}
            >
              Want to <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>contribute</span> to the community?
            </h2>
            <p
              className="text-[clamp(15px,1.15vw,17px)] mb-7"
              style={{ color: "var(--color-ink-2)", maxWidth: "55ch", marginInline: "auto" }}
            >
              If you have a story, a perspective or a data point that adds value to the industry, share it with us. We publish rigorous content signed by those who know.
            </p>
            <a
              href="/en/contact-us/"
              className="cta-btn cta-btn--lg"
              style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}
            >
              Pitch content
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) { .hub-grid[data-cols="4"] { grid-template-columns: repeat(3, 1fr) !important; } .wp-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 900px)  { .hub-grid { grid-template-columns: repeat(2, 1fr) !important; } .wp-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px)  { .hub-grid, .wp-grid { grid-template-columns: 1fr !important; max-width: 400px; margin-inline: auto; } }
        .hub-card { transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms; }
        .hub-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px -18px rgb(15 23 42 / 0.18); }
      `}</style>

      <SiteFooter currentLang="en" />
    </>
  );
}
