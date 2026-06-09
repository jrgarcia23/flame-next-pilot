import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { LOGOS, INDUSTRIES, INDUSTRIES_EN, UI, TESTIMONIALS_ALL, SectorConfig } from "@/lib/page-content";
import DemoFormInline from "@/components/DemoFormInline";

export default function SectorTemplate({ cfg, enHref, currentLang = "es" }: { cfg: SectorConfig; enHref: string; currentLang?: "es" | "en" }) {
  const testimonials = cfg.testimonialsIdx.map(i => TESTIMONIALS_ALL[i]);
  const t = UI[currentLang];
  const inds = currentLang === "en" ? INDUSTRIES_EN : INDUSTRIES;
  const heroBg = cfg.heroBgImage || "/wp-content/uploads/2026/01/Traffic2-1.png";
  return (
    <>
      {/* Preload del hero background — mejora LCP (Next hoiza al <head>). */}
      <link rel="preload" as="image" href={heroBg} fetchPriority="high" />
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* HERO + LOGOS */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: `url('${heroBg}')`,
          backgroundPosition: cfg.heroBgPosition || "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(20px, 2.4vw, 32px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, var(--color-navy) 0%, rgb(21 22 58 / 0.92) 38%, rgb(21 22 58 / 0.5) 65%, rgb(21 22 58 / 0.2) 100%)" }} />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 720 }}>
            <h1 className="text-[clamp(40px,5.2vw,64px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
              {cfg.heroTitle}{cfg.heroTitleHl ? <> <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.heroTitleHl}</span></> : null}
            </h1>
            <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.55] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch", fontFamily: "var(--font-body)" }}>
              {cfg.heroSub}
            </p>
            {cfg.heroBullets && (
              <ul className="grid gap-3 mb-9 hero-bullets" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
                {cfg.heroBullets.map((b) => (
                  <li key={b} className="inline-flex items-center gap-2.5 text-[16px]" style={{ color: "rgb(255 255 255 / 0.92)" }}>
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.2)", color: "var(--color-accent)", flexShrink: 0 }}>
                      <Icon name="check" className="w-4 h-4" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              {t.requestDemo} <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative z-10 mt-28 pt-4" style={{ borderTop: "1px solid rgb(255 255 255 / 0.1)" }}>
          <p className="text-center mb-3 text-[clamp(16px,1.3vw,19px)] font-medium" style={{ color: "rgb(255 255 255 / 0.78)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em" }}>
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
          .logo-track { display: flex; gap: clamp(48px, 5vw, 80px); width: max-content; align-items: center; animation: marquee-x 40s linear infinite; will-change: transform; transform: translate3d(0,0,0); backface-visibility: hidden; }
          .logo-track:hover { animation-play-state: paused; }
          @media (max-width: 767px) {
            .logo-marquee { overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; mask-image: none; -webkit-mask-image: none; scrollbar-width: none; }
            .logo-marquee::-webkit-scrollbar { display: none; }
            .logo-track { animation: none !important; will-change: auto; transform: none; backface-visibility: visible; padding-inline: 16px; }
          }
          .logo-img { height: 80px; width: auto; opacity: 0.78; filter: brightness(0) invert(1); transition: opacity 280ms ease; flex-shrink: 0; }
          .logo-img:hover { opacity: 1; }
          @media (max-width: 700px) { .logo-img { height: 65px; } .hero-bullets { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* PILARES (3 cards · Impulsa/Mide/Transforma) — sólo si hay cfg.pillars */}
      {cfg.pillars && cfg.pillars.length > 0 && (
        <section className="py-20" style={{ background: "var(--color-paper)" }}>
          <div className="flame-container">
            <div className="grid gap-6 pillars-grid" style={{ gridTemplateColumns: `repeat(${cfg.pillars.length}, 1fr)` }}>
              {cfg.pillars.map((p, i) => (
                <article key={i} className="pillar-card rounded-2xl p-7" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  {p.iconImg && (
                    <span className="pillar-icon inline-flex items-center justify-center mb-5" style={{ width: 56, height: 56, borderRadius: 12, background: "rgb(49 177 248 / 0.12)" }}>
                      <img src={p.iconImg} alt="" width={30} height={30} style={{ width: 30, height: 30, objectFit: "contain", display: "block" }} />
                    </span>
                  )}
                  <h3 className="text-[clamp(22px,2.2vw,28px)] font-medium mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.015em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                    {p.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 900px){.pillars-grid{grid-template-columns:1fr !important;}}
            .pillar-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms, box-shadow 420ms; }
            .pillar-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          `}</style>
        </section>
      )}

      {/* SECCIONES alternadas image+text — TODAS fondo blanco (JR) */}
      {cfg.sections.map((s, i) => {
        const reverse = i % 2 === 1;
        return (
          <section key={i} className="py-24" style={{ background: "#fff" }}>
            <div className="flame-container">
              <div className="grid gap-14 items-center sec-grid" style={{ gridTemplateColumns: reverse ? "1fr 1.2fr" : "1.2fr 1fr" }}>
                <div style={{ order: reverse ? 2 : 1 }}>
                  <img src={s.img} alt={s.imgAlt} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ order: reverse ? 1 : 2 }}>
                  <h2 className="text-[clamp(28px,3vw,40px)] font-normal mb-6" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                    {s.title}{s.titleHl ? <> <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{s.titleHl}</span></> : null}
                  </h2>
                  <ul className="grid gap-4">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-[clamp(15.5px,1.15vw,17px)] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>
                        <span className="inline-flex items-center justify-center rounded-full mt-1" style={{ width: 22, height: 22, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                          <Icon name="check" className="w-3.5 h-3.5" />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <style>{`@media (max-width: 900px) { .sec-grid { grid-template-columns: 1fr !important; } .sec-grid > div { order: initial !important; } }`}</style>
          </section>
        );
      })}

      {/* PRODUCTOS — mismo layout que Hypersensor (2 cols: izq texto+bullets / der 3 cards blancas)
          Fondo paper para no chocar con la stripe blanca anterior ni con el CTA strip blanco posterior */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-12 items-center prod-split" style={{ gridTemplateColumns: "1fr 1.35fr" }}>
            <div>
              <h2 className="text-[clamp(26px,2.8vw,40px)] font-medium mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                {cfg.productsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.productsTitleHl}</span>
              </h2>
              <p className="text-[clamp(17px,1.25vw,19px)] leading-[1.55] mb-6" style={{ color: "var(--color-ink-2)" }}>{cfg.productsSub}</p>
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
              {cfg.products.map((p) => {
                // Compatibilidad: el cfg actual usa {title, img}, el nuevo {name, iconImg, cta}
                const name = (p as { name?: string }).name || p.title;
                const iconImg = (p as { iconImg?: string }).iconImg || p.img;
                const cta = (p as { cta?: string }).cta || (currentLang === "en" ? "Discover" : "Descúbrelo");
                return (
                  <a key={name} href={p.href} className="prod3-card rounded-2xl p-6 flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                    <div className="prod3-iconwrap inline-flex items-center justify-center rounded-[14px] mb-5" style={{ width: 56, height: 56, background: "rgb(49 177 248 / 0.12)" }}>
                      <img src={iconImg} alt={name} style={{ width: 32, height: 32, objectFit: "contain", display: "block" }} />
                    </div>
                    <h3 className="text-[20px] font-normal mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}>{name}</h3>
                    <p className="text-[14.5px] leading-[1.6] flex-1 mb-5" style={{ color: "var(--color-ink-2)" }}>{p.desc}</p>
                    <span className="prod3-cta inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>
                      {cta} <Icon name="arrow" className="w-3.5 h-3.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { .prod-split { grid-template-columns: 1fr !important; } }
          @media (max-width: 700px) { .prod3-grid { grid-template-columns: 1fr !important; } }
          .prod3-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms, box-shadow 420ms; }
          .prod3-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 8px 22px -14px rgb(15 23 42 / 0.12); }
          .prod3-card .prod3-cta { transition: gap 420ms; }
          .prod3-card:hover .prod3-cta { gap: 10px; }
        `}</style>
      </section>

      {/* CTA strip */}
      <section className="py-8" style={{ background: "#fff", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
        <div className="flame-container">
          <div className="flex items-center gap-8 cta-strip-row">
            <p className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1" style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
              {cfg.ctaStripBold}<br /><span style={{ color: "var(--color-ink-3)", fontWeight: 400 }}>{cfg.ctaStripLight}</span>
            </p>
            <a href={t.contactHref} className="cta-btn cta-btn--xl flex-shrink-0" style={{ background: "var(--color-navy)", color: "#fff" }}>
              {t.requestDemo} <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
        <style>{`
          .cta-btn--xl { font-size: 17px; padding: 16px 32px; }
          @media (max-width: 700px) { .cta-strip-row { flex-direction: column; align-items: flex-start; gap: 20px; } .cta-strip-row > p { flex: none; } }
        `}</style>
      </section>

      {/* TESTIMONIOS marquee */}
      <section className="py-24 overflow-hidden" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
            {t.testimonialsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.testimonialsTitleHl}</span>
          </h2>
        </div>
        <div className="testimonials-marquee">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((t, i) => (
              <article key={i} className="testimonial-card rounded-2xl p-8 flex flex-col gap-6" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="flex items-center" style={{ height: 64 }}>
                  <img src={t.logo} alt={t.author} style={{ maxHeight: 56, maxWidth: 180, width: "auto", objectFit: "contain" }} />
                </div>
                <p className="text-[16px] leading-[1.65] flex-1" style={{ color: "var(--color-ink-2)" }}>{t.quote}</p>
                <div className="pt-5" style={{ borderTop: "1px solid var(--color-rule)" }}>
                  <strong className="block text-[16px]" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em" }}>{t.author}</strong>
                  <span className="block text-[13.5px] mt-1" style={{ color: "var(--color-ink-3)" }}>{t.role}</span>
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

      {/* FAQPage JSON-LD a partir de cfg.faqs (mantiene coherencia con la FAQ visual) */}
      {cfg.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: cfg.faqs.map((f) => ({
                "@type": "Question",
                name: f.q.replace(/<[^>]+>/g, "").trim(),
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a.replace(/<[^>]+>/g, "").trim(),
                },
              })),
            }),
          }}
        />
      )}

      {/* FAQ (oculto si no hay faqs) */}
      {cfg.faqs.length > 0 && (
      <section className="py-24" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
            {t.faqTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.faqTitleHl}</span>
          </h2>
          <div className="grid gap-4 faq-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", alignItems: "start" }}>
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
      )}

      {/* FORMULARIO DEMO */}
      <section id="contact" className="py-24" style={{ background: "#fff", scrollMarginTop: 80 }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                {t.contactTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.contactTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                {t.contactSub} <strong style={{ color: "var(--color-navy)" }}>{t.contactSubBold}</strong> {t.contactSubAfter}
              </p>
            </div>
            <DemoFormInline lang={currentLang} variant="demo" gridClass="sector-form-grid" />
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 16px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 10px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 560px) {
            .sector-form-grid { grid-template-columns: 1fr !important; }
            .sector-form-grid .col-span-2 { grid-column: span 1 / span 1 !important; }
          }
        `}</style>
      </section>

      <SiteFooter currentLang={currentLang} />
    </>
  );
}
