import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import ResizingIframe from "./ResizingIframe";
import { LOGOS, INDUSTRIES, INDUSTRIES_EN, UI, TESTIMONIALS_ALL } from "@/lib/page-content";

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
  productsSub?: string;
  productsBullets?: string[];
  products: Array<{ iconImg: string; name: string; desc: string; href: string; cta: string }>;
  // CTA STRIP entre Integration y Testimonios
  ctaStripBold?: string;
  ctaStripLight?: string;
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

  const embedSrc = currentLang === "en" ? "/embeds/steps-en/" : "/embeds/steps-es/";

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* 1. HERO — mismo fondo que el live: navy + foto background + overlay gradient */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#15163A",
          backgroundImage: "url('/wp-content/uploads/2026/01/02f81c6e339fb84de93b6d01a06a46fa5918ef10-scaled-1.jpg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white",
          paddingTop: "clamp(72px, 8vw, 120px)",
          paddingBottom: "50px",
        }}
      >
        {/* Overlay como en el live: navy a opacidad subiendo de 0 a 1 */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgb(21 22 58 / 0.6) 0%, rgb(21 22 58 / 1) 60%)" }} />
        <div className="flame-container relative z-10">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 1180 }}>
            <h1 className="text-[clamp(36px,5.4vw,72px)] font-normal mb-5" style={{ color: "#fff", letterSpacing: "-0.026em", lineHeight: 1.02, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>
              {cfg.heroSupertitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.heroSupertitleHl}</span>
            </h1>
            <h2 className="text-[clamp(20px,2vw,28px)] font-normal mb-9 mx-auto" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "30ch", fontFamily: "var(--font-body)", letterSpacing: "-0.012em", lineHeight: 1.35 }}>
              {cfg.heroHeadline}
            </h2>
            <a href="#contact" className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
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

      {/* 2. LOGOS — bg navy + título "Trusted by" + logos en colores reales animados en carrusel
           (mismo aspecto que /es/ pero con animación continua) */}
      <section className="pt-[50px] pb-[50px] relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="flame-container">
          <p className="text-center mb-8 font-medium" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 500, lineHeight: 1.2 }}>
            Trusted by
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
          .logo-img { height: 96px; width: auto; opacity: 0.92; transition: opacity 280ms ease; flex-shrink: 0; }
          .logo-img:hover { opacity: 1; }
          @media (max-width: 700px) { .logo-img { height: 78px; } }
        `}</style>
      </section>

      {/* 3. STEPS — iframe del WP original con auto-resize */}
      <section style={{ background: "#fff" }}>
        <ResizingIframe src={embedSrc} title="steps" fallbackHeight={620} />
      </section>

      {/* 4. PRODUCTS — 2 columnas: izquierda título/sub/bullets, derecha 3 cards verticales estrechas */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center prod-split" style={{ gridTemplateColumns: "1fr 1.35fr" }}>
            <div>
              <h2 className="text-[clamp(26px,2.8vw,40px)] font-medium mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                {cfg.productsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.productsTitleHl}</span>
              </h2>
              {cfg.productsSub && (
                <p className="text-[clamp(17px,1.25vw,19px)] leading-[1.55] mb-6" style={{ color: "var(--color-ink-2)" }}>
                  {cfg.productsSub}
                </p>
              )}
              {cfg.productsBullets && cfg.productsBullets.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {cfg.productsBullets.map((b) => (
                    <li key={b} className="inline-flex items-center gap-2.5 text-[15.5px] font-medium" style={{ color: "var(--color-navy)" }}>
                      <span className="inline-flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                        <Icon name="check" className="w-3.5 h-3.5" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="grid gap-5 prod3-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {cfg.products.map((p) => (
                <a key={p.name} href={p.href} className="prod3-card rounded-2xl p-6 flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  <div className="prod3-iconwrap inline-flex items-center justify-center rounded-[14px] mb-5" style={{ width: 56, height: 56, background: "rgb(49 177 248 / 0.12)" }}>
                    <img src={p.iconImg} alt={p.name} style={{ width: 32, height: 32, objectFit: "contain", display: "block" }} />
                  </div>
                  <h3 className="text-[20px] font-normal mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>{p.name}</h3>
                  <p className="text-[14.5px] leading-[1.6] flex-1 mb-5" style={{ color: "var(--color-ink-2)" }}>{p.desc}</p>
                  <span className="prod3-cta inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>
                    {p.cta} <Icon name="arrow" className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .prod-split { grid-template-columns: 1fr !important; }
            .prod3-grid { grid-template-columns: 1fr !important; max-width: 520px; margin: 0 auto; }
          }
          .prod3-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); text-decoration: none; }
          .prod3-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 14px 32px -18px rgb(15 23 42 / 0.14); }
          .prod3-card .prod3-cta { transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .prod3-card:hover .prod3-cta { gap: 10px; }
        `}</style>
      </section>

      {/* 5. ADVANTAGE INTRO — mismo estilo h2 que el header de Products + subtítulo bajo */}
      <section className="pt-[80px] pb-[40px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto" style={{ maxWidth: 800 }}>
            <h2
              className="text-[clamp(32px,3.4vw,48px)] font-normal mb-5"
              style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}
              dangerouslySetInnerHTML={{ __html: cfg.advantageTitle }}
            />
            <p className="text-[clamp(17px,1.25vw,19px)] leading-relaxed mx-auto" style={{ color: "var(--color-ink-2)" }}>
              {cfg.advantageSub}
            </p>
          </div>
        </div>
      </section>

      {/* 6. PRIVACY STRIPE — image left + text right */}
      <section className="pt-[40px] pb-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center stripe-grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
            <div>
              <img src={cfg.privacyImg} alt={cfg.privacyImgAlt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 14 }} />
            </div>
            <div>
              <h2 className="text-[clamp(22px,2.2vw,30px)] font-medium mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.012em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>
                {cfg.privacyTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.privacyTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.privacyBody}</p>
              <a href={cfg.privacyHref} className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                {cfg.privacyCta}
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .stripe-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* 7. REPORTS STRIPE — text left + image right */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center stripe-grid-rev" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(22px,2.2vw,30px)] font-medium mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.012em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>
                {cfg.reportsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.reportsTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.reportsBody}</p>
              <a href={cfg.reportsHref} className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                {cfg.reportsCta}
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div>
              <img src={cfg.reportsImg} alt={cfg.reportsImgAlt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 14 }} />
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 900px) { .stripe-grid-rev { grid-template-columns: 1fr !important; } .stripe-grid-rev > div:last-child { order: -1; } }`}</style>
      </section>

      {/* 8. INTEGRATION STRIPE — image left + text right (mismo layout que Privacy) */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center stripe-grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
            <div>
              <img src={cfg.integrationImg} alt={cfg.integrationImgAlt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 14 }} />
            </div>
            <div>
              <h2 className="text-[clamp(22px,2.2vw,30px)] font-medium mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.012em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>
                {cfg.integrationTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.integrationTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.integrationBody}</p>
              <a href={cfg.integrationHref} className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                {cfg.integrationCta}
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8.5 CTA STRIP — bg navy oscuro + texto blanco + botón accent */}
      {cfg.ctaStripBold && (
        <section className="py-[80px]" style={{ background: "var(--color-navy)" }}>
          <div className="flame-container">
            <div className="flex items-center gap-8 cta-strip-row">
              <p className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1" style={{ color: "#fff", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
                {cfg.ctaStripBold}<br /><span style={{ color: "rgb(255 255 255 / 0.7)", fontWeight: 400 }}>{cfg.ctaStripLight}</span>
              </p>
              <a href={t.contactHref} className="cta-btn cta-btn--xl flex-shrink-0" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
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
      )}

      {/* 9. TESTIMONIALS title + marquee */}
      <section className="py-[80px] overflow-hidden" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
            {cfg.testimonialsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.testimonialsTitleHl}</span>
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

      {/* 10. INDUSTRIES (4 dark cards) */}
      <section className="py-[80px] relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white" }}>
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

      {/* 11. COMMUNITY — React puro (no iframe), spacing 100% controlable */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 820 }}>
            <h2 className="text-[clamp(28px,3vw,40px)] font-medium mb-4" style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
              {cfg.communityTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.communityTitleHl}</span>
            </h2>
            <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.55] mx-auto" style={{ color: "var(--color-ink-2)" }}>
              {cfg.communitySub}
            </p>
          </div>
          <div className="grid gap-6 comm-grid" style={{ gridTemplateColumns: `repeat(${cfg.communityCards.length}, 1fr)` }}>
            {cfg.communityCards.map((c) => (
              <a key={c.title} href={c.href} className="comm-card rounded-2xl overflow-hidden block" style={{ background: "var(--color-navy)", color: "#fff", aspectRatio: "1 / 1", position: "relative" }}>
                <img src={c.img} alt={c.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgb(21 22 58 / 0.1) 0%, rgb(21 22 58 / 0.65) 100%)" }} />
                <span style={{ position: "absolute", left: 24, bottom: 22, right: 24, fontFamily: "var(--font-display)", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{c.title}</span>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .comm-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .comm-grid { grid-template-columns: 1fr !important; max-width: 360px; margin: 0 auto; } }
          .comm-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .comm-card:hover { transform: translateY(-3px); box-shadow: 0 14px 32px -18px rgb(15 23 42 / 0.18); }
        `}</style>
      </section>

      {/* 12. FORMULARIO DEMO — mismo patrón que páginas interiores (use cases / sectores) */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                {t.contactTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.contactTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                {t.contactSub} <strong style={{ color: "var(--color-navy)" }}>{t.contactSubBold}</strong> {t.contactSubAfter}
              </p>
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
                {t.contactCta}
              </p>
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
