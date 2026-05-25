import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { LOGOS, INDUSTRIES, TESTIMONIALS_ALL, UseCaseConfig } from "@/lib/page-content";

export default function UseCaseTemplate({ cfg, enHref }: { cfg: UseCaseConfig; enHref: string }) {
  const testimonials = cfg.testimonialsIdx.map(i => TESTIMONIALS_ALL[i]);
  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} />

      {/* HERO + LOGOS sobre Traffic2-1.png */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: `url('${cfg.heroBgImage || "/wp-content/uploads/2026/01/Traffic2-1.png"}')`,
          backgroundPosition: cfg.heroBgPosition || "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(20px, 2.4vw, 32px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, var(--color-navy) 0%, rgb(21 22 58 / 0.92) 38%, rgb(21 22 58 / 0.5) 65%, rgb(21 22 58 / 0.2) 100%)" }} />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 680 }}>
            <h1 className="text-[clamp(40px,5.2vw,64px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
              {cfg.heroTitle}
            </h1>
            <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.55] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch", fontFamily: "var(--font-body)" }}>
              {cfg.heroSub}
            </p>
            <ul className="grid gap-3 mb-9" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
              {cfg.heroBullets.map((b) => (
                <li key={b} className="inline-flex items-center gap-2.5 text-[16px]" style={{ color: "rgb(255 255 255 / 0.92)" }}>
                  <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.2)", color: "var(--color-accent)", flexShrink: 0 }}>
                    <Icon name="check" className="w-4 h-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="/es/contacta-draft/" className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "var(--color-navy)" }}>
              Solicita una demo
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="relative z-10 mt-28 pt-4" style={{ borderTop: "1px solid rgb(255 255 255 / 0.1)" }}>
          <p className="text-center mb-3 text-[clamp(16px,1.3vw,19px)] font-medium" style={{ color: "rgb(255 255 255 / 0.78)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em" }}>
            Marcas que ya miden con Flame
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
          .logo-img { height: 80px; width: auto; opacity: 0.78; filter: brightness(0) invert(1); transition: opacity 280ms ease; flex-shrink: 0; }
          .logo-img:hover { opacity: 1; }
          @media (max-width: 700px) { .logo-img { height: 65px; } }
        `}</style>
      </section>

      {/* BENEFICIOS (4 cards) */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mb-14 mx-auto" style={{ maxWidth: 760 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>{cfg.benefitsTitleHl}</span> {cfg.benefitsTitle}
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
              {cfg.benefitsSub}
            </p>
          </div>
          <div className="grid gap-6 b-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {cfg.benefits.map((b, i) => (
              <article key={i} className="benefit-card rounded-2xl p-7" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="benefit-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                  <Icon name={b.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.25 }}>{b.title}</h3>
                <p className="text-[15.5px] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .b-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px) { .b-grid { grid-template-columns: 1fr !important; } }
          .benefit-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .benefit-card:hover { transform: translateY(-1px); background: var(--color-paper-soft) !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .benefit-card .benefit-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .benefit-card:hover .benefit-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* CAJA "CONOCE MÁS" — dashboard izquierda + texto derecha (replica live) */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-14 mtc-title-wrap" style={{ maxWidth: "38ch" }}>
            <h2 className="text-[clamp(28px,2.9vw,40px)] font-normal mtc-title" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
              {cfg.bigSectionTitle} <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>{cfg.bigSectionTitleHl}</span>
            </h2>
            {cfg.bigSectionEyebrow && (
              <p className="mt-3 text-[clamp(17px,1.4vw,21px)] font-normal" style={{ color: "var(--color-ink-2)", fontFamily: "var(--font-display)", letterSpacing: "-0.012em", lineHeight: 1.3 }}>
                {cfg.bigSectionEyebrow}
              </p>
            )}
          </div>
          <div className="grid gap-12 items-center mtc-grid" style={{ gridTemplateColumns: "1.55fr 1fr" }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-rule)", boxShadow: "var(--shadow-md)" }}>
              <img src={cfg.imageBigSrc} alt={cfg.imageBigAlt} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div>
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.bigSectionPara1}</p>
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.bigSectionPara2}</p>
              <ul className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                {cfg.bigSectionBullets.map((x) => (
                  <li key={x} className="inline-flex items-center gap-2.5 text-[16px] font-medium" style={{ color: "var(--color-navy)" }}>
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                      <Icon name="check" className="w-4 h-4" />
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .mtc-grid { grid-template-columns: 1fr !important; } }
          .mtc-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-wrap: balance; }
        `}</style>
      </section>

      {/* MÉTRICAS (6 cards) */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mb-14 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.metricsTitle} <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>{cfg.metricsTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>{cfg.metricsSub}</p>
          </div>
          <div className="grid gap-6 metrics-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {cfg.metrics.map((m, i) => (
              <article key={i} className="metric-card rounded-2xl p-7" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)" }}>
                <div className="metric-icon inline-flex items-center justify-center rounded-[10px] mb-4" style={{ width: 44, height: 44, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                  <Icon name={m.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-[17.5px] font-semibold mb-2" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.3 }}>{m.title}</h3>
                <p className="text-[15.5px] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{m.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .metrics-grid { grid-template-columns: 1fr !important; } }
          .metric-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .metric-card:hover { transform: translateY(-1px); background: #fff !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .metric-card .metric-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .metric-card:hover .metric-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* CTA strip — frase izquierda (2 líneas), botón derecha, no wrap */}
      <section className="py-8" style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
        <div className="flame-container">
          <div className="flex items-center gap-8 cta-strip-row">
            <p className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1" style={{ color: "var(--color-ink)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
              {cfg.ctaStripBold}<br /><span style={{ color: "var(--color-ink-3)", fontWeight: 400 }}>{cfg.ctaStripLight}</span>
            </p>
            <a href="/es/contacta-draft/" className="cta-btn cta-btn--xl flex-shrink-0" style={{ background: "var(--color-navy)", color: "#fff" }}>
              Solicita una demo
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

      {/* SECTORES (4 fijos) */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.08), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.05), transparent 72%)" }} />
        <div className="flame-container relative z-10">
          <div className="mb-14 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              Soluciones para cualquier <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Industria</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)" }}>
              Flame Analytics es una plataforma avanzada de analítica inteligente diseñada para dar soporte a una amplia variedad de industrias y sectores.
            </p>
          </div>
          <div className="grid gap-5 ind-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {INDUSTRIES.map((it, i) => (
              <a key={i} href={it.href} className="industry-card rounded-2xl p-7 flex flex-col" style={{ background: "rgb(255 255 255 / 0.04)", border: "1px solid rgb(255 255 255 / 0.08)", color: "#fff" }}>
                <div className="industry-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent)" }}>
                  <Icon name={it.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: "#fff", letterSpacing: "-0.008em" }}>{it.title}</h3>
                <p className="text-[15px] leading-[1.6] flex-1" style={{ color: "rgb(255 255 255 / 0.68)" }}>{it.desc}</p>
                <span className="industry-cta mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold" style={{ color: "var(--color-accent)" }}>
                  Leer más <Icon name="arrow" className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .ind-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .ind-grid { grid-template-columns: 1fr !important; } }
          .industry-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .industry-card:hover { transform: translateY(-1px); background: rgb(255 255 255 / 0.07) !important; border-color: rgb(255 255 255 / 0.16) !important; box-shadow: 0 8px 24px -14px rgb(0 0 0 / 0.4); }
          .industry-card .industry-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .industry-card:hover .industry-icon { background: rgb(49 177 248 / 0.22) !important; }
          .industry-card .industry-cta { transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .industry-card:hover .industry-cta { gap: 10px; }
        `}</style>
      </section>

      {/* TESTIMONIOS marquee */}
      <section className="py-24 overflow-hidden" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
            Las mejores marcas hablan <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>de nosotros</span>
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

      {/* FAQ */}
      <section className="py-24" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
            Preguntas <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>frecuentes</span>
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

      {/* FORMULARIO DEMO */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                Solicita una <span style={{ color: "var(--color-accent-deep)", fontWeight: 500 }}>demo</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                Descubre el poder de Flame en solo <strong style={{ color: "var(--color-navy)" }}>20 minutos</strong> y entiende cómo puede mejorar los resultados de tu organización.
              </p>
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
                Agenda una demo personalizada con nuestros expertos
              </p>
            </div>
            <form className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <input className="cf-in col-span-2" type="text" placeholder="Nombre y apellido" />
              <select className="cf-in" defaultValue=""><option value="" disabled>Sector</option><option>Centros comerciales</option><option>Recintos públicos</option><option>Retail</option><option>Hostelería</option><option>Otro</option></select>
              <input className="cf-in" type="email" placeholder="Email" />
              <input className="cf-in" type="text" placeholder="Empresa" />
              <input className="cf-in" type="text" placeholder="País" />
              <label className="col-span-2 flex items-start gap-2 text-[13.5px] mt-2" style={{ color: "var(--color-ink-3)" }}>
                <input type="checkbox" className="mt-1" style={{ accentColor: "var(--color-accent)" }} required />
                <span>Acepto recibir comunicaciones de Flame y he leído la <a href="/es/politica-de-privacidad-draft/" style={{ color: "var(--color-accent-deep)", borderBottom: "1px solid currentColor" }}>política de privacidad</a>.</span>
              </label>
              <button type="button" className="col-span-2 mt-3 cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "var(--color-navy)", width: "fit-content" }}>
                Solicitar una demo
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
