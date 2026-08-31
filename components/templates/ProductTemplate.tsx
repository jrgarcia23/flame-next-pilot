import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { LOGOS, INDUSTRIES, INDUSTRIES_EN, UI, TESTIMONIALS_ALL, ProductConfig } from "@/lib/page-content";
import DemoFormInline from "@/components/DemoFormInline";
import FichaDownload from "@/components/FichaDownload";

const DownloadGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export default function ProductTemplate({ cfg, enHref, currentLang = "es" }: { cfg: ProductConfig; enHref: string; currentLang?: "es" | "en" }) {
  const testimonials = cfg.testimonialsIdx.map(i => TESTIMONIALS_ALL[i]);
  const t = UI[currentLang];
  const inds = currentLang === "en" ? INDUSTRIES_EN : INDUSTRIES;
  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* HERO + LOGOS */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: `url('${cfg.heroBgImage || "/wp-content/uploads/2026/01/Traffic2-1.png"}')`,
          backgroundPosition: "center top",
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
            <p className="text-[clamp(20px,1.7vw,26px)] font-normal mb-5" style={{ color: "var(--color-accent)", maxWidth: "30ch", fontFamily: "var(--font-display)", letterSpacing: "-0.012em", lineHeight: 1.2 }}>
              {cfg.heroEyebrow}
            </p>
            <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.55] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch", fontFamily: "var(--font-body)" }}>
              {cfg.heroSub}
            </p>
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
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                {t.requestDemo} <Icon name="arrow" className="w-4 h-4" />
              </a>
              {cfg.fichaPdf && (
                <a href={cfg.fichaPdf} className="cta-btn cta-btn--lg fx-dl" style={{ background: "#fff", color: "var(--color-navy)", border: "1px solid #fff", fontWeight: 700, whiteSpace: "nowrap" }}>
                  <DownloadGlyph />
                  {currentLang === "en" ? "Download datasheet" : "Descargar ficha"}
                </a>
              )}
            </div>
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
          @media (max-width: 700px) { .logo-img { height: 65px; } }
          @media (max-width: 700px) {
            .hero-bullets { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* BENEFICIOS (3 cards) — bg alterna: si NO hay sección intermedia, va a paper para no chocar con Funcionalidades */}
      <section className="py-24" style={{ background: cfg.imageSrc && cfg.platformTitle ? "#fff" : "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mb-14 mx-auto" style={{ maxWidth: 800 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.benefitsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.benefitsTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>{cfg.benefitsSub}</p>
          </div>
          <div className="grid gap-6 b-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
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
          @media (max-width: 1000px) { .b-grid { grid-template-columns: 1fr !important; } }
          .benefit-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .benefit-card:hover { transform: translateY(-1px); background: var(--color-paper-soft) !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .benefit-card .benefit-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .benefit-card:hover .benefit-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* PLATAFORMA (image + text + bullets) — opcional, solo si hay imageSrc + platformTitle */}
      {cfg.imageSrc && cfg.platformTitle && (
        <section className="py-24" style={{ background: "var(--color-paper)" }}>
          <div className="flame-container">
            <h2 className="text-center mx-auto mb-14 text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", maxWidth: "26ch", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
              {cfg.platformTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.platformTitleHl}</span>
            </h2>
            <div className="grid gap-12 items-center mtc-grid" style={{ gridTemplateColumns: "1.55fr 1fr" }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-rule)", boxShadow: "var(--shadow-md)" }}>
                <img src={cfg.imageSrc} alt={cfg.heroTitle} style={{ width: "100%", height: "auto", display: "block", aspectRatio: cfg.imageAspectRatio || "1030 / 564", objectFit: "cover" }} />
              </div>
              <div>
                {cfg.platformPara1 && <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.platformPara1}</p>}
                {cfg.platformPara2 && <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-7" style={{ color: "var(--color-ink-2)" }}>{cfg.platformPara2}</p>}
                {cfg.platformBullets && (
                  <ul className="grid gap-3 platform-bullets" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                    {cfg.platformBullets.map((x) => (
                      <li key={x} className="inline-flex items-center gap-2.5 text-[16px] font-medium" style={{ color: "var(--color-navy)" }}>
                        <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                          <Icon name="check" className="w-4 h-4" />
                        </span>
                        {x}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) { .mtc-grid { grid-template-columns: 1fr !important; } }
            @media (max-width: 560px) { .platform-bullets { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* FUNCIONALIDADES (N cards grandes con intro + desc + bullets) */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mb-14 max-w-[760px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.featuresTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.featuresTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>{cfg.featuresSub}</p>
          </div>
          <div className="grid gap-6 feat-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {cfg.features.map((f, i) => (
              <article key={i} className="feat-card rounded-2xl p-8 flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="feat-icon inline-flex items-center justify-center rounded-[12px] flex-shrink-0" style={{ width: 52, height: 52, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                    <Icon name={f.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-[22px] font-semibold pt-2.5" style={{ color: "var(--color-navy)", letterSpacing: "-0.008em", lineHeight: 1.2 }}>{f.title}</h3>
                </div>
                <p className="text-[16px] leading-[1.55] mb-4 font-medium" style={{ color: "var(--color-navy)" }}>{f.intro}</p>
                <p className="text-[15.5px] leading-[1.65] mb-5" style={{ color: "var(--color-ink-2)" }}>{f.desc}</p>
                <ul className="grid gap-2 mt-auto" style={{ gridTemplateColumns: "1fr" }}>
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[14.5px]" style={{ color: "var(--color-navy)" }}>
                      <span className="inline-flex items-center justify-center rounded-full mt-1 flex-shrink-0" style={{ width: 18, height: 18, background: "rgb(49 177 248 / 0.14)", color: "var(--color-accent-deep)" }}>
                        <Icon name="check" className="w-3 h-3" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
            {cfg.fichaPdf && (() => {
              const even = cfg.features.length % 2 === 0; // PAR → banda ancho completo · IMPAR → caja-imagen en el hueco
              const title = currentLang === "en" ? "Product datasheet" : "Ficha de producto";
              const hook = cfg.fichaHook || (currentLang === "en" ? "The whole product in a downloadable PDF." : "Todo el producto en un PDF descargable.");
              const cta = currentLang === "en" ? "Download (PDF)" : "Descargar ficha (PDF)";
              if (even) {
                // Nº PAR de funcionalidades: banda de cierre a todo el ancho del grid
                return (
                  <article className="feat-ficha feat-ficha--band fx-dl rounded-2xl" role="button" tabIndex={0}
                    style={{ gridColumn: "1 / -1", background: "linear-gradient(120deg, rgb(49 177 248 / 0.10) 0%, rgb(49 177 248 / 0.03) 60%, rgb(49 177 248 / 0.06) 100%)", border: "1px solid rgb(49 177 248 / 0.38)", cursor: "pointer" }}>
                    <div className="feat-ficha-inner">
                      <span className="feat-ficha-icon inline-flex items-center justify-center rounded-[14px] flex-shrink-0" style={{ width: 56, height: 56, background: "var(--color-accent)", color: "#fff" }}>
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      </span>
                      <div className="feat-ficha-text">
                        <h3 className="text-[21px] font-semibold" style={{ color: "var(--color-navy)", letterSpacing: "-0.008em", lineHeight: 1.2 }}>{title}</h3>
                        <p className="text-[15.5px] leading-[1.55] mt-1.5" style={{ color: "var(--color-ink-2)" }}>{hook}</p>
                      </div>
                      <span className="cta-btn cta-btn--lg flex-shrink-0" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>
                        <DownloadGlyph /> {cta}
                      </span>
                    </div>
                  </article>
                );
              }
              // Nº IMPAR: caja-imagen que rellena el hueco, mismo tamaño que las cards
              const img = cfg.fichaImage || cfg.heroBgImage || "/wp-content/uploads/2026/01/Characteristics-1.png";
              return (
                <article className="feat-ficha feat-ficha--card fx-dl rounded-2xl overflow-hidden" role="button" tabIndex={0}
                  style={{ position: "relative", minHeight: 340, backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center", border: "1px solid var(--color-rule)", cursor: "pointer" }}>
                  <span className="feat-ficha-badge" style={{ position: "absolute", top: 20, right: 20, zIndex: 2, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12, background: "var(--color-accent)", color: "#fff", boxShadow: "0 6px 18px -8px rgb(21 22 58 / 0.6)" }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </span>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgb(21 22 58 / 0.12) 0%, rgb(21 22 58 / 0.42) 44%, rgb(21 22 58 / 0.9) 100%)" }} />
                  <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 30 }}>
                    <h3 className="text-[22px] font-semibold" style={{ color: "#fff", letterSpacing: "-0.008em", lineHeight: 1.2 }}>{title}</h3>
                    <p className="text-[15px] leading-[1.55] mt-2 mb-5" style={{ color: "rgb(255 255 255 / 0.86)", maxWidth: "34ch" }}>{hook}</p>
                    <span className="cta-btn cta-btn--lg" style={{ alignSelf: "flex-start", background: "var(--color-accent)", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>
                      <DownloadGlyph /> {cta}
                    </span>
                  </div>
                </article>
              );
            })()}
          </div>
        </div>
        <style>{`
          .feat-ficha { transition: transform .3s cubic-bezier(0.22,1,0.36,1), box-shadow .3s, border-color .3s; }
          .feat-ficha:hover { transform: translateY(-2px); box-shadow: 0 14px 34px -18px rgb(49 177 248 / 0.55); border-color: rgb(49 177 248 / 0.6) !important; }
          .feat-ficha-inner { display: flex; align-items: center; gap: 24px; padding: 26px 32px; }
          .feat-ficha-text { flex: 1 1 auto; min-width: 0; }
          .feat-ficha-icon { transition: transform .3s cubic-bezier(0.22,1,0.36,1); }
          .feat-ficha:hover .feat-ficha-icon { transform: scale(1.05); }
          @media (max-width: 640px) {
            .feat-ficha-inner { flex-direction: column; align-items: flex-start; gap: 18px; text-align: left; }
            .feat-ficha-inner .cta-btn { width: 100%; justify-content: center; }
          }
          @media (max-width: 900px) { .feat-grid { grid-template-columns: 1fr !important; } }
          .feat-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .feat-card:hover { transform: translateY(-1px); background: var(--color-paper-soft) !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .feat-card .feat-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .feat-card:hover .feat-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* CTA strip — frase izquierda (puede ocupar 2 líneas), botón derecha, no wrap */}
      <section className="py-8" style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)" }}>
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
          @media (max-width: 700px) {
            .cta-strip-row { flex-direction: column; align-items: flex-start; gap: 20px; }
            .cta-strip-row > p { flex: none; }
          }
        `}</style>
      </section>

      {/* PILARES sobre Characteristics-1 (bg image + overlay) */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: "var(--color-navy)", color: "white",
          backgroundImage: "url('/wp-content/uploads/2026/01/Characteristics-1.png')",
          backgroundPosition: "center center", backgroundSize: "cover", backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgb(21 22 58 / 0.78) 0%, rgb(21 22 58 / 0.85) 50%, rgb(21 22 58 / 0.9) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.12), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.08), transparent 72%)" }} />
        <div className="flame-container relative z-10">
          <div className="mb-14 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {cfg.pillarsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{cfg.pillarsTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)" }}>{cfg.pillarsSub}</p>
          </div>
          <div className="grid gap-5 pillars-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {cfg.pillars.map((p, i) => (
              <article key={i} className="pillar-card rounded-2xl p-7 flex flex-col" style={{ background: "rgb(255 255 255 / 0.04)", border: "1px solid rgb(255 255 255 / 0.08)", color: "#fff" }}>
                <div className="pillar-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent)" }}>
                  <Icon name={p.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: "#fff", letterSpacing: "-0.008em" }}>{p.title}</h3>
                <p className="text-[15px] leading-[1.6]" style={{ color: "rgb(255 255 255 / 0.68)" }}>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .pillars-grid { grid-template-columns: 1fr !important; } }
          .pillar-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .pillar-card:hover { transform: translateY(-1px); background: rgb(255 255 255 / 0.07) !important; border-color: rgb(255 255 255 / 0.16) !important; box-shadow: 0 8px 24px -14px rgb(0 0 0 / 0.4); }
          .pillar-card .pillar-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .pillar-card:hover .pillar-icon { background: rgb(49 177 248 / 0.22) !important; }
        `}</style>
      </section>

      {/* SECTORES */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mb-14 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              {t.industriesTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.industriesTitleHl}</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
              {cfg.heroTitle} es el motor de inteligencia para los sectores donde el flujo de personas marca el rendimiento.
            </p>
          </div>
        </div>
        <div className="industries-marquee">
          <div className="industries-track">
            {[...inds, ...inds].map((it, i) => (
              <a key={i} href={it.href} className="industry-card rounded-2xl p-7 flex flex-col" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)" }}>
                <div className="industry-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                  <Icon name={it.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.008em" }}>{it.title}</h3>
                <p className="text-[15px] leading-[1.6] flex-1" style={{ color: "var(--color-ink-2)" }}>{it.desc}</p>
                <span className="industry-cta mt-5 inline-flex items-center gap-1.5 text-[14.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>
                  Leer más <Icon name="arrow" className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
        <style>{`
          .industries-marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
          .industries-track { display: flex; gap: 20px; width: max-content; align-items: stretch; animation: marquee-x 50s linear infinite; }
          .industries-track:hover { animation-play-state: paused; }
          .industry-card { width: 320px; flex: 0 0 320px; transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); text-decoration: none !important; }
          .industry-card:hover { transform: translateY(-1px); background: #fff !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .industry-card .industry-icon { transition: background 420ms cubic-bezier(0.22, 1, 0.36, 1), color 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .industry-card:hover .industry-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
          .industry-card .industry-cta { transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1); }
          .industry-card:hover .industry-cta { gap: 10px; }
          @media (max-width: 700px) { .industry-card { width: 260px; flex: 0 0 260px; } .industries-track { gap: 14px; } }
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

      {/* FAQPage JSON-LD desde cfg.faqs (coherente con la FAQ visible) */}
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

      {/* FAQ */}
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

      {/* FORM */}
      <section id="contact" className="py-24" style={{ background: "#fff", scrollMarginTop: 80 }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                {t.contactTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.contactTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                Descubre el poder de Flame en solo <strong style={{ color: "var(--color-navy)" }}>20 minutos</strong>.
              </p>
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
                {t.contactCta}
              </p>
            </div>
            <DemoFormInline lang={currentLang} variant="demo" gridClass="product-form-grid" />
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 16px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 10px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 560px) {
            .product-form-grid { grid-template-columns: 1fr !important; }
            .product-form-grid .col-span-2 { grid-column: span 1 / span 1 !important; }
          }
        `}</style>
      </section>

      <SiteFooter currentLang={currentLang} />

      {cfg.fichaPdf && (
        <FichaDownload pdfHref={cfg.fichaPdf} title={cfg.fichaTitle || cfg.heroTitle} lang={currentLang} />
      )}
    </>
  );
}
