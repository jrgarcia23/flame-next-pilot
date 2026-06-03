import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { LOGOS, INDUSTRIES, INDUSTRIES_EN, UI, TESTIMONIALS_ALL } from "@/lib/page-content";

export type HomeConfig = {
  heroEyebrow: string;
  heroTitle: string;
  heroTitleHl: string;
  heroSub: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  heroSecondaryHref: string;
  heroImage: string;
  heroImageAlt: string;
  stats: Array<{ value: string; label: string }>;
  productsTitle: string;
  productsTitleHl: string;
  productsSub: string;
  products: Array<{ icon: string; name: string; tagline: string; desc: string; href: string; cta: string }>;
  bigEyebrow: string;
  bigTitle: string;
  bigTitleHl: string;
  bigImage: string;
  bigImageAlt: string;
  bigPara1: string;
  bigPara2: string;
  bigBullets: [string, string, string, string];
  privacyTitle: string;
  privacyTitleHl: string;
  privacySub: string;
  privacyPoints: Array<{ icon: string; title: string; desc: string }>;
  testimonialsIdx: number[];
  faqs: Array<{ q: string; a: string }>;
  ctaStripBold: string;
  ctaStripLight: string;
};

export default function HomeTemplate({ cfg, enHref, currentLang = "es" }: { cfg: HomeConfig; enHref: string; currentLang?: "es" | "en" }) {
  const t = UI[currentLang];
  const inds = currentLang === "en" ? INDUSTRIES_EN : INDUSTRIES;
  const testimonials = cfg.testimonialsIdx.map(i => TESTIMONIALS_ALL[i]);

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          paddingTop: "clamp(80px, 9vw, 130px)",
          paddingBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 600px at 85% -10%, rgb(49 177 248 / 0.18), transparent 65%), radial-gradient(700px 500px at 5% 110%, rgb(49 177 248 / 0.08), transparent 70%)" }} />
        <div className="flame-container relative z-10">
          <div className="grid gap-14 items-center hero-grid" style={{ gridTemplateColumns: "1.05fr 1fr" }}>
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{ background: "rgb(49 177 248 / 0.12)", border: "1px solid rgb(49 177 248 / 0.25)" }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-accent)", boxShadow: "0 0 8px var(--color-accent)" }} />
                <span className="text-[12.5px] font-semibold uppercase" style={{ color: "var(--color-accent)", letterSpacing: "0.08em" }}>{cfg.heroEyebrow}</span>
              </div>
              <h1 className="text-[clamp(42px,5.6vw,72px)] font-normal mb-7" style={{ color: "#fff", letterSpacing: "-0.024em", lineHeight: 1.04, fontFamily: "var(--font-display)" }}>
                {cfg.heroTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.heroTitleHl}</span>
              </h1>
              <p className="text-[clamp(17px,1.4vw,20px)] leading-[1.55] mb-9" style={{ color: "rgb(255 255 255 / 0.78)", maxWidth: "60ch", fontFamily: "var(--font-body)" }}>
                {cfg.heroSub}
              </p>
              <div className="flex gap-3 flex-wrap">
                <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                  {cfg.heroPrimaryCta}
                  <Icon name="arrow" className="w-4 h-4" />
                </a>
                <a href={cfg.heroSecondaryHref} className="cta-btn cta-btn--lg" style={{ background: "rgb(255 255 255 / 0.08)", color: "#fff", border: "1px solid rgb(255 255 255 / 0.18)" }}>
                  {cfg.heroSecondaryCta}
                  <Icon name="arrow" className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="rounded-2xl overflow-hidden" style={{ background: "rgb(255 255 255 / 0.03)", border: "1px solid rgb(255 255 255 / 0.1)", boxShadow: "0 32px 80px -20px rgb(0 0 0 / 0.5)" }}>
                <img src={cfg.heroImage} alt={cfg.heroImageAlt} style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .hero-grid { grid-template-columns: 1fr !important; }
            .hero-visual { order: -1; max-width: 540px; margin: 0 auto; }
          }
        `}</style>
      </section>

      {/* STATS BANNER */}
      <section className="relative" style={{ background: "var(--color-navy)", borderTop: "1px solid rgb(255 255 255 / 0.08)" }}>
        <div className="flame-container">
          <div className="grid stats-grid" style={{ gridTemplateColumns: `repeat(${cfg.stats.length}, 1fr)`, padding: "44px 0" }}>
            {cfg.stats.map((s, i) => (
              <div key={i} className="text-center stats-cell" style={{ borderRight: i < cfg.stats.length - 1 ? "1px solid rgb(255 255 255 / 0.1)" : "none", padding: "0 24px" }}>
                <div className="text-[clamp(34px,3.8vw,52px)] font-normal mb-2" style={{ color: "var(--color-accent)", letterSpacing: "-0.02em", fontFamily: "var(--font-display)", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div className="text-[14px]" style={{ color: "rgb(255 255 255 / 0.65)", letterSpacing: "-0.005em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px 0; }
            .stats-cell { border-right: none !important; }
            .stats-cell:nth-child(odd) { border-right: 1px solid rgb(255 255 255 / 0.1) !important; }
          }
        `}</style>
      </section>

      {/* LOGOS */}
      <section className="py-14" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <p className="text-center mb-8 text-[15px] font-medium" style={{ color: "var(--color-ink-3)", letterSpacing: "-0.005em" }}>
            {t.logosBanner}
          </p>
          <div className="logo-marquee">
            <div className="logo-track">
              {[...LOGOS, ...LOGOS].map(([src, alt], i) => (
                <img key={i} src={src} alt={alt} className="logo-img" />
              ))}
            </div>
          </div>
        </div>
        <style>{`
          .logo-marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
          .logo-track { display: flex; gap: clamp(48px, 5vw, 80px); width: max-content; align-items: center; animation: marquee-x 40s linear infinite; }
          .logo-track:hover { animation-play-state: paused; }
          .logo-img { height: 56px; width: auto; opacity: 0.65; filter: grayscale(100%) brightness(0.4); transition: opacity 280ms ease, filter 280ms ease; flex-shrink: 0; }
          .logo-img:hover { opacity: 1; filter: grayscale(0%) brightness(1); }
          @media (max-width: 700px) { .logo-img { height: 44px; } }
        `}</style>
      </section>

      {/* PRODUCTOS (3 cards) */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mb-14 mx-auto" style={{ maxWidth: 760 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.productsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.productsTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
              {cfg.productsSub}
            </p>
          </div>
          <div className="grid gap-6 prod-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {cfg.products.map((p) => (
              <a key={p.name} href={p.href} className="prod-card rounded-2xl p-8 flex flex-col" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)", color: "var(--color-navy)" }}>
                <div className="prod-icon inline-flex items-center justify-center rounded-[14px] mb-6" style={{ width: 56, height: 56, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                  <Icon name={p.icon} className="w-7 h-7" />
                </div>
                <div className="text-[12px] uppercase font-semibold mb-2" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.08em" }}>{p.tagline}</div>
                <h3 className="text-[26px] font-normal mb-4" style={{ color: "var(--color-navy)", letterSpacing: "-0.015em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>{p.name}</h3>
                <p className="text-[15.5px] leading-[1.65] flex-1 mb-6" style={{ color: "var(--color-ink-2)" }}>{p.desc}</p>
                <span className="prod-cta inline-flex items-center gap-1.5 text-[14.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>
                  {p.cta} <Icon name="arrow" className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .prod-grid { grid-template-columns: 1fr !important; max-width: 520px; margin: 0 auto; } }
          .prod-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); text-decoration: none; }
          .prod-card:hover { transform: translateY(-2px); background: #fff !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 12px 30px -16px rgb(15 23 42 / 0.12); }
          .prod-card .prod-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .prod-card:hover .prod-icon { background: rgb(49 177 248 / 0.2) !important; color: var(--color-accent) !important; }
          .prod-card .prod-cta { transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .prod-card:hover .prod-cta { gap: 10px; }
        `}</style>
      </section>

      {/* BIG SECTION (Datos que potencian) */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-14" style={{ maxWidth: "44ch" }}>
            <div className="text-[12px] uppercase font-semibold mb-4" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.1em" }}>{cfg.bigEyebrow}</div>
            <h2 className="text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.12, fontFamily: "var(--font-display)" }}>
              {cfg.bigTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.bigTitleHl}</span>
            </h2>
          </div>
          <div className="grid gap-12 items-center big-grid" style={{ gridTemplateColumns: "1.55fr 1fr" }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-rule)", boxShadow: "var(--shadow-md)" }}>
              <img src={cfg.bigImage} alt={cfg.bigImageAlt} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div>
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-6" style={{ color: "var(--color-ink-2)" }}>{cfg.bigPara1}</p>
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.bigPara2}</p>
              <ul className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {cfg.bigBullets.map((x) => (
                  <li key={x} className="inline-flex items-center gap-2.5 text-[15.5px] font-medium" style={{ color: "var(--color-navy)" }}>
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                      <Icon name="check" className="w-3.5 h-3.5" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .big-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* PRIVACY-FIRST (4 cards) */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mb-14 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.privacyTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.privacyTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
              {cfg.privacySub}
            </p>
          </div>
          <div className="grid gap-6 priv-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {cfg.privacyPoints.map((p, i) => (
              <article key={i} className="priv-card rounded-2xl p-7" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="priv-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                  <Icon name={p.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[18px] font-semibold mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.25 }}>{p.title}</h3>
                <p className="text-[15px] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .priv-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px) { .priv-grid { grid-template-columns: 1fr !important; } }
          .priv-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .priv-card:hover { transform: translateY(-1px); background: var(--color-paper-soft) !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .priv-card .priv-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .priv-card:hover .priv-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* CTA STRIP */}
      <section className="py-8" style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
        <div className="flame-container">
          <div className="flex items-center gap-8 cta-strip-row">
            <p className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1" style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
              {cfg.ctaStripBold}<br /><span style={{ color: "var(--color-ink-3)", fontWeight: 400 }}>{cfg.ctaStripLight}</span>
            </p>
            <a href={t.contactHref} className="cta-btn cta-btn--xl flex-shrink-0" style={{ background: "var(--color-navy)", color: "#fff" }}>
              {t.requestDemo}
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
        <style>{`
          .cta-btn--xl { font-size: 17px; padding: 16px 32px; }
          @media (max-width: 700px) {
            .cta-strip-row { flex-direction: column; align-items: flex-start; gap: 20px; }
            .cta-strip-row > p { flex: none; }
          }
        `}</style>
      </section>

      {/* INDUSTRIES (dark) */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.08), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.05), transparent 72%)" }} />
        <div className="flame-container relative z-10">
          <div className="mb-14 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {t.industriesTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.industriesTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)" }}>
              {t.industriesSub}
            </p>
          </div>
          <div className="grid gap-5 ind-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {inds.map((it, i) => (
              <a key={i} href={it.href} className="industry-card rounded-2xl p-7 flex flex-col" style={{ background: "rgb(255 255 255 / 0.04)", border: "1px solid rgb(255 255 255 / 0.08)", color: "#fff" }}>
                <div className="industry-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent)" }}>
                  <Icon name={it.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: "#fff", letterSpacing: "-0.008em" }}>{it.title}</h3>
                <p className="text-[15px] leading-[1.6] flex-1" style={{ color: "rgb(255 255 255 / 0.68)" }}>{it.desc}</p>
                <span className="industry-cta mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold" style={{ color: "var(--color-accent)" }}>
                  {t.readMore} <Icon name="arrow" className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .ind-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .ind-grid { grid-template-columns: 1fr !important; } }
          .industry-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); text-decoration: none; }
          .industry-card:hover { transform: translateY(-1px); background: rgb(255 255 255 / 0.07) !important; border-color: rgb(255 255 255 / 0.16) !important; box-shadow: 0 8px 24px -14px rgb(0 0 0 / 0.4); }
          .industry-card .industry-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .industry-card:hover .industry-icon { background: rgb(49 177 248 / 0.22) !important; }
          .industry-card .industry-cta { transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .industry-card:hover .industry-cta { gap: 10px; }
        `}</style>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 overflow-hidden" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
            {t.testimonialsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.testimonialsTitleHl}</span>
          </h2>
        </div>
        <div className="testimonials-marquee">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((tt, i) => (
              <article key={i} className="testimonial-card rounded-2xl p-8 flex flex-col gap-6" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="flex items-center" style={{ height: 64 }}>
                  <img src={tt.logo} alt={tt.author} style={{ maxHeight: 56, maxWidth: 180, width: "auto", objectFit: "contain" }} />
                </div>
                <p className="text-[16px] leading-[1.65] flex-1" style={{ color: "var(--color-ink-2)" }}>{tt.quote}</p>
                <div className="pt-5" style={{ borderTop: "1px solid var(--color-rule)" }}>
                  <strong className="block text-[16px]" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em" }}>{tt.author}</strong>
                  <span className="block text-[13.5px] mt-1" style={{ color: "var(--color-ink-3)" }}>{tt.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .testimonials-marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
          .testimonials-track { display: flex; gap: 28px; width: max-content; align-items: stretch; animation: marquee-x 60s linear infinite; }
          .testimonials-track:hover { animation-play-state: paused; }
          .testimonial-card { width: 460px; flex: 0 0 460px; }
          @media (max-width: 700px) { .testimonial-card { width: 320px; flex: 0 0 320px; } .testimonials-track { gap: 18px; } }
        `}</style>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
            {t.faqTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.faqTitleHl}</span>
          </h2>
          <div className="grid gap-4 faq-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {cfg.faqs.map((f, i) => (
              <details key={i} className="rounded-2xl p-6 group transition" style={{ background: "#fff" }}>
                <summary className="flex items-start justify-between gap-4 cursor-pointer text-[17px] font-medium list-none" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
                  <span>{f.q}</span>
                  <span className="inline-flex items-center justify-center rounded-full flex-shrink-0 transition" style={{ width: 30, height: 30, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                    <Icon name="plus" className="w-3.5 h-3.5" />
                  </span>
                </summary>
                <div className="mt-5 text-[15.5px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }} dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr !important; } }
          details[open] summary span:last-child { background: var(--color-accent) !important; color: var(--color-navy) !important; transform: rotate(45deg); }
        `}</style>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24" style={{ background: "#fff" }}>
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
            <form className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <input className="cf-in col-span-2" type="text" placeholder={t.fName} />
              <select className="cf-in" defaultValue=""><option value="" disabled>{t.fSector}</option><option>{t.sMalls}</option><option>{t.sVenues}</option><option>{t.sRetail}</option><option>{t.sHosp}</option><option>{t.sOther}</option></select>
              <input className="cf-in" type="email" placeholder={t.fEmail} />
              <input className="cf-in" type="text" placeholder={t.fCompany} />
              <input className="cf-in" type="text" placeholder={t.fCountry} />
              <label className="col-span-2 flex items-start gap-2 text-[13.5px] mt-2" style={{ color: "var(--color-ink-3)" }}>
                <input type="checkbox" className="mt-1" style={{ accentColor: "var(--color-accent)" }} required />
                <span>{t.consent} <a href={t.privacyHref} style={{ color: "var(--color-accent-deep)", borderBottom: "1px solid currentColor" }}>{t.privacy}</a>.</span>
              </label>
              <button type="button" className="col-span-2 mt-3 cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700, width: "fit-content" }}>
                {t.submit}
              </button>
            </form>
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 15.5px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 10px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
