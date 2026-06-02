import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { LOGOS, INDUSTRIES, INDUSTRIES_EN, UI, TESTIMONIALS_ALL } from "@/lib/page-content";
import { STEPS_HTML_ES, STEPS_HTML_EN, STEPS_CSS_LINKS } from "@/lib/clones/home-steps-section";

export type HomeRestyleConfig = {
  // HERO
  heroSupertitle: string;       // h1
  heroSupertitleHl: string;     // accent span inside h1
  heroHeadline: string;         // h2
  heroCta: string;              // "Solicita una demo ->"
  videoWebm: string;
  videoMp4: string;
  // 3 STEP CARDS
  stepsTitle: string;
  stepsTitleHl: string;         // "para Retail" accent
  stepsSub?: string;
  steps: Array<{ iconImg: string; bgImg?: string; title: string; desc: string }>;
  // PRODUCTS BLOCK
  productsTitle: string;
  productsTitleHl: string;
  products: Array<{ iconImg: string; name: string; desc: string; href: string; cta: string }>;
  // ADVANTAGE INTRO
  advantageTitle: string;
  advantageSub: string;
  // PRIVACY / REPORTS / INTEGRATION (3 stripes alternating image-text)
  privacyTitle: string;
  privacyTitleHl: string;
  privacyBody: string;
  privacyImg: string;
  privacyImgAlt: string;
  privacyCta: string;
  privacyHref: string;
  reportsTitle: string;
  reportsTitleHl: string;
  reportsBody: string;
  reportsImg: string;
  reportsImgAlt: string;
  reportsCta: string;
  reportsHref: string;
  integrationTitle: string;
  integrationTitleHl: string;
  integrationBody: string;
  integrationImg: string;
  integrationImgAlt: string;
  integrationCta: string;
  integrationHref: string;
  // TESTIMONIALS
  testimonialsTitle: string;
  testimonialsTitleHl: string;
  testimonialsIdx: number[];
  // INDUSTRIES
  industriesTitle: string;
  industriesTitleHl: string;
  industriesSub: string;
  // COMMUNITY
  communityTitle: string;
  communityTitleHl: string;
  communitySub: string;
  communityCards: Array<{ icon: string; title: string; href: string; img: string }>;
};

export default function HomeRestyleTemplate({ cfg, enHref, currentLang = "es" }: { cfg: HomeRestyleConfig; enHref: string; currentLang?: "es" | "en" }) {
  const t = UI[currentLang];
  const inds = currentLang === "en" ? INDUSTRIES_EN : INDUSTRIES;
  const testimonials = cfg.testimonialsIdx.map(i => TESTIMONIALS_ALL[i]);

  const stepsHtml = currentLang === "en" ? STEPS_HTML_EN : STEPS_HTML_ES;

  return (
    <>
      {STEPS_CSS_LINKS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* 1. HERO con vídeo grande */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          paddingTop: "clamp(72px, 8vw, 120px)",
          paddingBottom: "clamp(48px, 5vw, 88px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 600px at 50% -10%, rgb(49 177 248 / 0.18), transparent 65%), radial-gradient(700px 500px at 10% 110%, rgb(49 177 248 / 0.06), transparent 70%)" }} />
        <div className="flame-container relative z-10">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 920 }}>
            <h1 className="text-[clamp(44px,6vw,80px)] font-normal mb-5" style={{ color: "#fff", letterSpacing: "-0.026em", lineHeight: 1.02, fontFamily: "var(--font-display)" }}>
              {cfg.heroSupertitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.heroSupertitleHl}</span>
            </h1>
            <h2 className="text-[clamp(20px,2vw,28px)] font-normal mb-9 mx-auto" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "30ch", fontFamily: "var(--font-body)", letterSpacing: "-0.012em", lineHeight: 1.35 }}>
              {cfg.heroHeadline}
            </h2>
            <a href="#contact" className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "var(--color-navy)" }}>
              {cfg.heroCta}
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
          {/* Vídeo grande */}
          <div className="relative mx-auto" style={{ maxWidth: 1180 }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgb(255 255 255 / 0.03)", border: "1px solid rgb(255 255 255 / 0.12)", boxShadow: "0 40px 100px -25px rgb(0 0 0 / 0.6)" }}>
              <video className="w-full h-auto block" autoPlay loop muted playsInline controlsList="nodownload">
                <source src={cfg.videoWebm} type="video/webm" />
                <source src={cfg.videoMp4} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOGOS marquee */}
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

      {/* 3. STEPS — bloque clonado literalmente del WP original (mismo HTML + CSS Elementor) */}
      <div className="steps-clone" dangerouslySetInnerHTML={{ __html: stepsHtml }} />

      {/* 4. PRODUCTS — h2 "Datos que potencian espacios inteligentes" + 3 cards */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)", maxWidth: 800 }}>
            {cfg.productsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.productsTitleHl}</span>
          </h2>
          <div className="grid gap-6 prod3-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {cfg.products.map((p) => (
              <a key={p.name} href={p.href} className="prod3-card rounded-2xl p-8 flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="prod3-iconwrap flex items-center mb-6" style={{ height: 96 }}>
                  <img src={p.iconImg} alt={p.name} style={{ maxHeight: 96, maxWidth: 132, width: "auto", height: "auto", objectFit: "contain", display: "block" }} />
                </div>
                <h3 className="text-[24px] font-normal mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>{p.name}</h3>
                <p className="text-[15.5px] leading-[1.65] flex-1 mb-6" style={{ color: "var(--color-ink-2)" }}>{p.desc}</p>
                <span className="prod3-cta inline-flex items-center gap-1.5 text-[14.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>
                  {p.cta} <Icon name="arrow" className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .prod3-grid { grid-template-columns: 1fr !important; max-width: 520px; margin: 0 auto; } }
          .prod3-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); text-decoration: none; }
          .prod3-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 14px 32px -18px rgb(15 23 42 / 0.14); }
          .prod3-card .prod3-cta { transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .prod3-card:hover .prod3-cta { gap: 10px; }
        `}</style>
      </section>

      {/* 5. ADVANTAGE INTRO — h2 + sub centered */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto" style={{ maxWidth: 820 }}>
            <div className="text-[12px] uppercase font-semibold mb-4" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.12em" }}>{cfg.advantageTitle}</div>
            <p className="text-[clamp(22px,2.2vw,32px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.3, fontFamily: "var(--font-display)" }}>
              {cfg.advantageSub}
            </p>
          </div>
        </div>
      </section>

      {/* 6. PRIVACY STRIPE — image left + text right */}
      <section className="py-20" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center stripe-grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
            <div>
              <img src={cfg.privacyImg} alt={cfg.privacyImgAlt} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div>
              <h2 className="text-[clamp(28px,2.8vw,40px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                {cfg.privacyTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.privacyTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.privacyBody}</p>
              <a href={cfg.privacyHref} className="cta-btn cta-btn--md" style={{ background: "var(--color-navy)", color: "#fff" }}>
                {cfg.privacyCta}
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .stripe-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* 7. REPORTS STRIPE — text left + image right */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center stripe-grid-rev" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(28px,2.8vw,40px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                {cfg.reportsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.reportsTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.reportsBody}</p>
              <a href={cfg.reportsHref} className="cta-btn cta-btn--md" style={{ background: "var(--color-navy)", color: "#fff" }}>
                {cfg.reportsCta}
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div>
              <img src={cfg.reportsImg} alt={cfg.reportsImgAlt} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .stripe-grid-rev { grid-template-columns: 1fr !important; } .stripe-grid-rev > div:last-child { order: -1; } }`}</style>
      </section>

      {/* 8. INTEGRATION STRIPE — image left + text right */}
      <section className="py-20" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center stripe-grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
            <div>
              <img src={cfg.integrationImg} alt={cfg.integrationImgAlt} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div>
              <h2 className="text-[clamp(28px,2.8vw,40px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                {cfg.integrationTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.integrationTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.integrationBody}</p>
              <a href={cfg.integrationHref} className="cta-btn cta-btn--md" style={{ background: "var(--color-navy)", color: "#fff" }}>
                {cfg.integrationCta}
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS title + marquee */}
      <section className="py-24 overflow-hidden" style={{ background: "#fff" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
            {cfg.testimonialsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.testimonialsTitleHl}</span>
          </h2>
        </div>
        <div className="testimonials-marquee">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((tt, i) => (
              <article key={i} className="testimonial-card rounded-2xl p-8 flex flex-col gap-6" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)" }}>
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

      {/* 10. INDUSTRIES (4 dark cards) */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.08), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.05), transparent 72%)" }} />
        <div className="flame-container relative z-10">
          <div className="text-center mx-auto mb-14" style={{ maxWidth: 820 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.industriesTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.industriesTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)" }}>{cfg.industriesSub}</p>
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

      {/* 11. COMMUNITY — 3 cards (Casos / Webinars / Whitepapers) */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-14" style={{ maxWidth: 820 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.communityTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.communityTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>{cfg.communitySub}</p>
          </div>
          <div className="grid gap-6 comm-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {cfg.communityCards.map((c, i) => (
              <a key={i} href={c.href} className="comm-card rounded-2xl overflow-hidden flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)", textDecoration: "none" }}>
                <div className="comm-imgwrap relative" style={{ aspectRatio: "16 / 10", background: "var(--color-navy)", overflow: "hidden" }}>
                  {c.img && <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 }} />}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(180deg, rgb(21 22 58 / 0.2) 0%, rgb(21 22 58 / 0.55) 100%)" }}>
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 64, height: 64, background: "rgb(49 177 248 / 0.2)", border: "1px solid var(--color-accent)", color: "var(--color-accent)" }}>
                      <Icon name={c.icon} className="w-7 h-7" />
                    </span>
                  </div>
                </div>
                <div className="p-7 flex items-center justify-between">
                  <h3 className="text-[22px] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.012em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>{c.title}</h3>
                  <span className="comm-arrow inline-flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                    <Icon name="arrow" className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .comm-grid { grid-template-columns: 1fr !important; max-width: 520px; margin: 0 auto; } }
          .comm-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .comm-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 14px 32px -18px rgb(15 23 42 / 0.14); }
          .comm-card .comm-arrow { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .comm-card:hover .comm-arrow { background: var(--color-accent) !important; color: var(--color-navy) !important; }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
