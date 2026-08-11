import type { Metadata } from "next";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { getCategoryListing, getCategoryListingAsync, getAllWhitepapers, shortExcerpt, formatDate } from "@/lib/blog";
import { UI } from "@/lib/page-content";
import DemoFormInline from "@/components/DemoFormInline";
import { sanitizeTitle } from "@/lib/sanitize-title";

export const metadata: Metadata = {
  title: "Community · Flame Analytics",
  description: "Interviews, case studies, blog, webinars and whitepapers on retail, shopping malls, hospitality and public venues. The Flame Analytics community for physical-space intelligence.",
  alternates: { canonical: "/en/community/", languages: {
    en: "/en/community/", es: "/es/comunidad/", "x-default": "/es/comunidad/",
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
    description: "Interviews, real case studies, technical webinars and downloads.",
    images: ["/wp-content/uploads/2026/01/Partners-1-scaled-1.png"],
  },
};

const currentLang = "en" as const;
const t = UI[currentLang];

export default async function CommunityHubEn() {
  // Listings via async: merge CMS-published posts with blog.json (same fix as ES).
  const [entAll, casAll, bloAll, webAll] = await Promise.all([
    getCategoryListingAsync("interviews",   currentLang),
    getCategoryListingAsync("case-studies", currentLang),
    getCategoryListingAsync("blog",         currentLang),
    getCategoryListingAsync("webinars",     currentLang),
  ]);
  const ent = entAll.slice(0, 4);
  const cas = casAll.slice(0, 4);
  const blo = bloAll.slice(0, 4);
  const web = webAll.slice(0, 4);
  const wp  = getAllWhitepapers(currentLang).slice(0, 6);
  const countEnt = entAll.length;
  const countCas = casAll.length;
  const countBlo = bloAll.length;
  const countWeb = webAll.length;
  const countWp  = getAllWhitepapers(currentLang).length;

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={currentLang} enHref="/es/comunidad/" />

      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "#fff", backgroundImage: "url('/wp-content/uploads/2026/01/Partners-1-scaled-1.png')", backgroundPosition: "center top", backgroundSize: "cover", backgroundRepeat: "no-repeat", paddingTop: "clamp(80px, 9vw, 140px)", paddingBottom: "clamp(56px, 6vw, 96px)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(21,22,58,.95) 0%, rgba(21,22,58,.85) 38%, rgba(21,22,58,.55) 72%, rgba(21,22,58,.25) 100%)" }} />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 720 }}>
            <p className="mb-4 font-medium" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700 }}>Flame Community</p>
            <h1 className="text-[clamp(46px,5.8vw,76px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-.028em", lineHeight: 1.02, fontFamily: "var(--font-display)" }}>
              Welcome to our <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>community</span>
            </h1>
            <p className="text-[clamp(16.5px,1.25vw,18.5px)] leading-[1.6]" style={{ color: "rgb(255 255 255 / .85)", maxWidth: "64ch" }}>
              In this community we talk about retail, shopping malls, hospitality, public venues and much more. Interviews with industry leaders, real customer stories, technical webinars and downloads for those who make decisions about physical spaces.
            </p>
          </div>
        </div>
      </section>

      <nav className="anchors" id="anchors">
        <div className="anchors-inner flame-container">
          {[
            { id: "interviews",   label: "Interviews" },
            { id: "case-studies", label: "Case studies" },
            { id: "blog",         label: "Blog" },
            { id: "webinars",     label: "Webinars" },
            { id: "downloads",    label: "Downloads" },
          ].map(a => (
            <a key={a.id} href={`#${a.id}`} className="anchor-link">{a.label}</a>
          ))}
        </div>
      </nav>

      {ent.length > 0 && <Section sid="interviews"   bg="paper" eyebrow="Interviews"    h2a="Conversations with the people who" h2b="decide" link={`View all ${countEnt}`} href="/en/category/interviews/"   items={ent} />}
      {cas.length > 0 && <Section sid="case-studies" bg="white" eyebrow="Case studies"  h2a="How our clients"                    h2b="measure and decide" link={`View all ${countCas}`} href="/en/category/case-studies/" items={cas} />}
      {blo.length > 0 && <Section sid="blog"         bg="paper" eyebrow="Blog articles" h2a="Applied analysis for"               h2b="physical spaces" link={`View all ${countBlo}`} href="/en/category/blog/" items={blo} />}
      {web.length > 0 && <Section sid="webinars"     bg="navy-dark" eyebrow="Webinars"  h2a="Technical sessions with"            h2b="experts" link="View all" href="/en/category/webinars/" items={web} play />}

      {wp.length > 0 && (
        <section className="sec sec--paper" id="downloads" style={{ background: "var(--color-paper)", padding: "clamp(72px,8vw,128px) 0", scrollMarginTop: 88 }}>
          <div className="flame-container">
            <div className="sec-head" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginBottom: 56 }}>
              <div>
                <p style={{ fontSize: 12, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 14, color: "var(--color-accent-deep)" }}>Downloads</p>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,3.8vw,52px)", fontWeight: 400, letterSpacing: "-.024em", lineHeight: 1.04, maxWidth: "20ch" }}>
                  Whitepapers & <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>technical reports</span>
                </h2>
              </div>
            </div>
            <div className="wp-grid">
              {wp.map(w => {
                const wImg = w.thumbnail || w.hero;
                return (
                  <a key={w.slug} href={`/en/whitepaper/${w.slug}/`} className="wp-card">
                    <div className="wp-sq" style={wImg ? { backgroundImage: `url('${wImg}')` } : undefined}>
                      <span className="wp-tag">PDF</span>
                    </div>
                    <div className="wp-body">
                      <h3 dangerouslySetInnerHTML={{ __html: sanitizeTitle(w.title) }} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="py-24" style={{ background: "#fff", scrollMarginTop: 88 }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                {t.contactTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.contactTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                {t.contactSub} <strong style={{ color: "var(--color-navy)" }}>{t.contactSubBold}</strong> {t.contactSubAfter}
              </p>
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>{t.contactCta}</p>
            </div>
            <DemoFormInline lang={currentLang} variant="demo" gridClass="about-form-grid" />
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 16px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 10px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 560px) { .about-form-grid { grid-template-columns: 1fr !important; } .about-form-grid .col-span-2 { grid-column: span 1 / span 1 !important; } }
        `}</style>
      </section>

      <SiteFooter currentLang={currentLang} />

      <style>{`
        .anchors { position: sticky; top: 0; z-index: 30; background: rgba(255,255,255,.94); backdrop-filter: blur(14px); border-bottom: 1px solid var(--color-rule); }
        .anchors-inner { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; padding: 18px 16px; }
        .anchor-link { display: inline-flex; align-items: center; border-radius: 4px; font-family: var(--font-body); font-size: 15px; font-weight: 500; letter-spacing: -.005em; padding: 12px 22px; color: var(--color-navy); background: transparent; border: 1px solid transparent; transition: background 240ms, filter 240ms, transform 240ms, box-shadow 240ms, color 240ms, border-color 240ms; text-decoration: none !important; }
        .anchor-link:hover { background: var(--color-paper); border-color: var(--color-rule-strong); transform: translateY(-1px); box-shadow: 0 6px 16px -10px rgb(15 23 42/.18); }
        .anchor-link.is-active { background: var(--color-navy); color: #fff; border-color: var(--color-navy); }
        .sec { padding: clamp(72px,8vw,128px) 0; position: relative; scroll-margin-top: 88px; }
        .sec--paper { background: var(--color-paper); } .sec--white { background: #fff; } .sec--navy-dark { background: #0E0F26; color: #fff; }
        .sec-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap; margin-bottom: 56px; }
        .sec-eyebrow { font-family: var(--font-body); font-size: 12px; letter-spacing: .16em; text-transform: uppercase; font-weight: 700; margin-bottom: 14px; color: var(--color-accent-deep); }
        .sec--navy-dark .sec-eyebrow { color: var(--color-accent); }
        .sec-h2 { font-family: var(--font-display); font-size: clamp(34px,3.8vw,52px); font-weight: 400; letter-spacing: -.024em; line-height: 1.04; max-width: 20ch; }
        .sec--navy-dark .sec-h2 { color: #fff; } .sec-h2 span { color: var(--color-accent-deep); font-weight: 500; }
        .sec--navy-dark .sec-h2 span { color: var(--color-accent); }
        .sec-link { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-body); font-weight: 600; font-size: 14.5px; color: var(--color-accent-deep); white-space: nowrap; letter-spacing: -.005em; text-decoration: none !important; }
        .sec--navy-dark .sec-link { color: var(--color-accent); }
        .sec-link:hover { gap: 16px; transition: gap .25s; }

        .mag-row { display: grid; grid-template-columns: 1.4fr 1fr; gap: 64px; align-items: stretch; margin-bottom: 72px; }
        .mag-xl { aspect-ratio: 1/1; background: #ddd center/cover; border-radius: 8px; box-shadow: 0 30px 80px -32px rgba(15,23,42,.42); transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s; position: relative; display: block; }
        .mag-xl:hover { transform: translateY(-4px); box-shadow: 0 36px 90px -32px rgba(15,23,42,.5); }
        .mag-right { display: flex; flex-direction: column; justify-content: center; gap: 22px; }
        .mag-eyebrow { font-family: var(--font-body); font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--color-accent-deep); font-weight: 700; }
        .sec--navy-dark .mag-eyebrow { color: var(--color-accent); }
        .mag-title { font-family: var(--font-display); font-size: clamp(28px,3vw,42px); font-weight: 400; line-height: 1.1; letter-spacing: -.02em; }
        .sec--navy-dark .mag-title { color: #fff; }
        .mag-ex { font-family: var(--font-body); font-size: 15.5px; color: var(--color-ink-2); line-height: 1.6; max-width: 50ch; }
        .sec--navy-dark .mag-ex { color: rgba(255,255,255,.7); }
        .mag-meta { font-size: 13.5px; color: var(--color-ink-3); font-family: var(--font-body); }
        .sec--navy-dark .mag-meta { color: rgba(255,255,255,.5); }
        .mag-kpi-big { font-family: var(--font-display); font-size: clamp(56px,6.5vw,90px); font-weight: 400; line-height: 1; color: var(--color-accent-deep); letter-spacing: -.03em; margin-bottom: 0; }
        @media (max-width: 900px) { .mag-row { grid-template-columns: 1fr; gap: 32px; } }

        .cat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .cat-card { display: block; background: #fff; border: 1px solid var(--color-rule); border-radius: 16px; overflow: hidden; transition: transform 280ms cubic-bezier(.22,1,.36,1), box-shadow 280ms; text-decoration: none !important; color: inherit; }
        .cat-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px -18px rgb(15 23 42/.18); }
        .cat-card .sq { aspect-ratio: 1/1; background: #ddd center/cover; position: relative; }
        .cat-card .cat-body { padding: 20px; }
        .cat-card .cat-tag { font-family: var(--font-body); font-size: 11.5px; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; color: var(--color-accent-deep); margin-bottom: 8px; }
        .cat-card h3 { font-family: var(--font-display); font-size: 19px; line-height: 1.22; font-weight: 400; letter-spacing: -.012em; margin-bottom: 8px; color: var(--color-navy); }
        .cat-card .meta { font-family: var(--font-body); font-size: 12.5px; color: var(--color-ink-3); }
        .cat-card .kpi-ov { position: absolute; top: 12px; left: 12px; background: rgba(255,255,255,.96); padding: 8px 12px; border-radius: 4px; font-family: var(--font-display); font-size: 20px; font-weight: 400; color: var(--color-navy); letter-spacing: -.018em; line-height: 1; }
        .cat-card .kpi-ov span { font-family: var(--font-body); font-size: 10px; letter-spacing: .06em; text-transform: uppercase; font-weight: 600; color: var(--color-ink-2); margin-left: 6px; }
        .cat-card .play-ov { background-color: #0E0F26; }
        .cat-card .play-ov::after { content: "▶"; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 38px; color: #fff; text-shadow: 0 6px 22px rgba(0,0,0,.5); }
        @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; } }
        @media (max-width: 560px) { .cat-grid { grid-template-columns: 1fr; max-width: 380px; margin-inline: auto; } }

        .wp-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }
        .wp-card { display: block; background: #fff; border: 1px solid var(--color-rule); border-radius: 12px; overflow: hidden; transition: transform 280ms, box-shadow 280ms; text-decoration: none !important; color: inherit; }
        .wp-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px -18px rgb(15 23 42/.18); }
        .wp-sq { aspect-ratio: 1/1; background: #FAF6F0 center/cover; position: relative; }
        .wp-tag { position: absolute; top: 10px; left: 10px; background: var(--color-accent); color: #fff; font-size: 10px; padding: 4px 8px; border-radius: 4px; letter-spacing: .06em; font-weight: 700; font-family: var(--font-body); }
        .wp-body { padding: 14px; }
        .wp-body h3 { font-family: var(--font-body); font-size: 13px; line-height: 1.32; font-weight: 600; letter-spacing: -.005em; color: var(--color-ink); }
        @media (max-width: 1000px) { .wp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 560px) { .wp-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const links = document.querySelectorAll('.anchor-link');
          const ids = ['interviews','case-studies','blog','webinars','downloads'];
          const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
          function update() {
            let cur = null; const top = window.scrollY + 150;
            for (const s of sections) { if (s.offsetTop <= top) cur = s.id; }
            links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + cur));
          }
          window.addEventListener('scroll', update, { passive: true });
          update();
        })();
      ` }} />
    </>
  );
}

type SectionProps = {
  sid: string;
  bg: "paper" | "white" | "navy-dark";
  eyebrow: string;
  h2a: string;
  h2b: string;
  link: string;
  href: string;
  items: ReturnType<typeof getCategoryListing>;
  xlExtra?: React.ReactNode;
  kpis?: { v: string; l: string }[];
  play?: boolean;
};

function Section({ sid, bg, eyebrow, h2a, h2b, link, href, items, xlExtra, kpis, play }: SectionProps) {
  const xl = items[0];
  const minis = items.slice(1, 4);
  const xlImg = xl.thumbnail || xl.hero;
  const bgCls = bg === "paper" ? "sec--paper" : bg === "white" ? "sec--white" : "sec--navy-dark";
  return (
    <section className={`sec ${bgCls}`} id={sid}>
      <div className="flame-container">
        <div className="sec-head">
          <div>
            <p className="sec-eyebrow">{eyebrow}</p>
            <h2 className="sec-h2">{h2a} <span>{h2b}</span></h2>
          </div>
          <a href={href} className="sec-link">{link} →</a>
        </div>
        <div className="mag-row">
          <a href={`/en/${xl.slug}/`} className="mag-xl" style={{ backgroundImage: xlImg ? `url('${xlImg}')` : undefined, backgroundColor: play ? "#0E0F26" : undefined }}>
            {play && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 62, color: "#fff", textShadow: "0 8px 30px rgba(0,0,0,.5)" }}>▶</div>}
          </a>
          <div className="mag-right">
            <p className="mag-eyebrow">Latest</p>
            <h3 className="mag-title" dangerouslySetInnerHTML={{ __html: sanitizeTitle(xl.title) }} />
            {xlExtra}
            <p className="mag-ex">{shortExcerpt(xl.html, 150)}…</p>
            <p className="mag-meta">{formatDate(xl.date, "en")} · {xl.category.name}</p>
          </div>
        </div>
        <div className="cat-grid">
          {minis.map((m, i) => {
            const img = m.thumbnail || m.hero;
            const kpi = kpis ? kpis[i + 1] : null;
            return (
              <a key={m.slug} href={`/en/${m.slug}/`} className="cat-card">
                <div className={`sq ${play ? "play-ov" : ""}`} style={img ? { backgroundImage: `url('${img}')` } : undefined}>
                  {kpi && <div className="kpi-ov">{kpi.v}<span>{kpi.l}</span></div>}
                </div>
                <div className="cat-body">
                  <p className="cat-tag">{m.category.name}</p>
                  <h3 dangerouslySetInnerHTML={{ __html: sanitizeTitle(m.title) }} />
                  <p className="meta">{formatDate(m.date, "en")}{play ? " · 45 min" : ""}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
