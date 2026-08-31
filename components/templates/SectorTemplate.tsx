import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { LOGOS, INDUSTRIES, INDUSTRIES_EN, UI, TESTIMONIALS_ALL, SectorConfig } from "@/lib/page-content";
import DemoFormInline from "@/components/DemoFormInline";

// Badges de confianza del grid de capacidades (idénticos en todos los sectores).
const TRUST: Array<{ svg: string; t: { es: string; en: string }; s: { es: string; en: string } }> = [
  { svg: '<svg viewBox="0 0 24 24"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>', t: { es: "CCTV existente", en: "Existing CCTV" }, s: { es: "Aprovecha tus cámaras", en: "Use your cameras" } },
  { svg: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>', t: { es: "Hypersensor", en: "Hypersensor" }, s: { es: "Análisis de vídeo con IA avanzada", en: "Advanced AI video analysis" } },
  { svg: '<svg viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>', t: { es: "Sin biometría", en: "No biometrics" }, s: { es: "Datos 100% anónimos", en: "100% anonymous data" } },
  { svg: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><polyline points="9 12 11 14 15 10"/></svg>', t: { es: "100% RGPD", en: "100% GDPR" }, s: { es: "Privacidad garantizada", en: "Privacy guaranteed" } },
];

export default function SectorTemplate({ cfg, enHref, currentLang = "es" }: { cfg: SectorConfig; enHref: string; currentLang?: "es" | "en" }) {
  const testimonials = cfg.testimonialsIdx.map(i => TESTIMONIALS_ALL[i]);
  const t = UI[currentLang];
  const inds = currentLang === "en" ? INDUSTRIES_EN : INDUSTRIES;
  const heroBg = cfg.heroBgImage || "/wp-content/uploads/2026/01/Traffic2-1.png";
  // Nuevo modelo de sector (capa CRO): activo cuando el cfg define capacidades.
  const isNewModel = !!(cfg.capabilities && cfg.capabilities.length);

  // Franja CTA (misma que la home). Se coloca en distinta posición según el modelo:
  // nuevo → tras las capacidades (antes de casos); antiguo → tras productos.
  const ctaStrip = (
    <section className="py-[56px]" style={{ background: "var(--color-navy)" }}>
      <div className="flame-container">
        <div className="flex items-center gap-8 cta-strip-row">
          <p className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1" style={{ color: "#fff", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
            {cfg.ctaStripBold}<br /><span style={{ color: "rgb(255 255 255 / 0.7)", fontWeight: 400 }}>{cfg.ctaStripLight}</span>
          </p>
          <a href={t.contactHref} className="cta-btn cta-btn--xl flex-shrink-0" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
            {t.requestDemo} <Icon name="arrow" className="w-4 h-4" />
          </a>
        </div>
      </div>
      <style>{`
        .cta-btn--xl { font-size: 17px; padding: 16px 32px; }
        @media (max-width: 700px) { .cta-strip-row { flex-direction: column; align-items: flex-start; gap: 20px; } .cta-strip-row > p { flex: none; } }
      `}</style>
    </section>
  );

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

      {/* PILARES (3 cards · Impulsa/Mide/Transforma) — sólo modelo antiguo */}
      {cfg.pillars && cfg.pillars.length > 0 && !isNewModel && (
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

      {/* ===================== NUEVO MODELO (capa CRO) ===================== */}
      {/* PAIN-POINTS — "El día a día de tus datos" (4 tarjetas de problema) */}
      {isNewModel && cfg.painPoints && cfg.painPoints.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-paper)" }}>
          <div className="flame-container">
            <div className="text-center mx-auto mb-12" style={{ maxWidth: 640 }}>
              <h2 className="text-[clamp(28px,3vw,40px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.12, fontFamily: "var(--font-display)" }}>{cfg.painPointsTitle}</h2>
              {cfg.painPointsIntro && <p className="mt-3 mx-auto text-[clamp(15px,1.2vw,17px)] leading-[1.6]" style={{ color: "var(--color-ink-2)", maxWidth: "60ch" }}>{cfg.painPointsIntro}</p>}
            </div>
            <div className="grid gap-5 pains-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {cfg.painPoints.map((p, i) => (
                <article key={i} className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  <span className="pain-ico inline-flex items-center justify-center mb-4" style={{ width: 44, height: 44, borderRadius: 11, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }} dangerouslySetInnerHTML={{ __html: p.svg }} />
                  <h3 className="text-[17px] font-medium mb-2" style={{ color: "var(--color-navy)", letterSpacing: "-0.01em", lineHeight: 1.3, fontFamily: "var(--font-display)" }}>{p.title}</h3>
                  <p className="text-[14px] leading-[1.55]" style={{ color: "var(--color-ink-2)" }}>{p.desc}</p>
                </article>
              ))}
            </div>
          </div>
          <style>{`
            .pain-ico svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
            @media (max-width: 980px){ .pains-grid { grid-template-columns: repeat(2,1fr) !important; } }
            @media (max-width: 520px){ .pains-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </section>
      )}

      {/* CAPACIDADES — bento asimétrico (8 cajas, 2 destacadas con foto) + trust badges */}
      {isNewModel && cfg.capabilities && (
        <section className="py-24" style={{ background: "#fff" }}>
          <div className="flame-container">
            <div className="caps-head text-center" style={{ marginBottom: 44 }}>
              <span className="caps-eyebrow">{currentLang === "en" ? "What you can do" : "Qué puedes hacer"}</span>
              <h2 className="caps-h2">{cfg.capsTitle}</h2>
              {cfg.capsSub && <p className="caps-sub">{cfg.capsSub}</p>}
            </div>
            <div className="vD-grid">
              {cfg.capabilities.map((c, i) => c.featured ? (
                <article key={i} className={`vD-tile vD-feat c${c.span || 7}`}>
                  {c.img && <div className="vD-bg" style={{ backgroundImage: `url('${c.img}')` }} />}
                  <div className="vD-in">
                    <span className="vD-ico" dangerouslySetInnerHTML={{ __html: c.svg }} />
                    <h3>{c.title}</h3><p>{c.desc}</p>
                  </div>
                </article>
              ) : (
                <article key={i} className={`vD-tile c${c.span || 6}`}>
                  <span className="vD-ico" dangerouslySetInnerHTML={{ __html: c.svg }} />
                  <h3>{c.title}</h3><p>{c.desc}</p>
                </article>
              ))}
            </div>
            <div className="caps-trust">
              <span className="caps-trust-lead">{currentLang === "en" ? "And all of it, on top of what you already have, with full privacy:" : "Y todo, sobre lo que ya tienes y con total privacidad:"}</span>
              <div className="caps-trust-grid">
                {TRUST.map((b, i) => (
                  <div key={i} className="trust-box"><span className="ti" dangerouslySetInnerHTML={{ __html: b.svg }} /><span className="tt"><b>{b.t[currentLang]}</b><span>{b.s[currentLang]}</span></span></div>
                ))}
              </div>
            </div>
          </div>
          <style>{`
            .caps-eyebrow { display:inline-block; font-family: var(--font-body); font-size:12.5px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color: var(--color-accent-deep); margin-bottom:14px; }
            .caps-h2 { font-family: var(--font-display); font-weight:400; font-size: clamp(26px,3vw,42px); letter-spacing:-0.02em; line-height:1.08; color: var(--color-navy); margin:0; white-space: nowrap; }
            .caps-sub { font-size: clamp(16px,1.2vw,18px); line-height:1.6; color: var(--color-ink-2); margin:14px 0 0; white-space: nowrap; }
            .vD-grid { display:grid; grid-template-columns: repeat(12,1fr); gap:20px; grid-auto-rows: minmax(226px,auto); }
            .vD-tile { border:1px solid var(--color-rule); border-radius:20px; padding:32px 34px; display:flex; flex-direction:column; background:#fff; transition: transform .2s, box-shadow .2s, border-color .2s; overflow:hidden; position:relative; }
            .vD-tile:hover { box-shadow: 0 28px 54px -32px rgb(15 22 58 / .28); border-color: rgb(49 177 248 / .4); transform: translateY(-3px); }
            .vD-ico { width:50px; height:50px; border-radius:13px; background: rgb(49 177 248 / .12); color: var(--color-accent-deep); display:inline-flex; align-items:center; justify-content:center; margin-bottom:18px; flex-shrink:0; }
            .vD-ico svg { width:25px; height:25px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
            .vD-tile h3 { font-family: var(--font-display); font-weight:500; font-size:22px; letter-spacing:-.01em; color: var(--color-navy); margin:0 0 12px; line-height:1.2; }
            .vD-tile p { font-size:15.5px; line-height:1.6; color: var(--color-ink-2); margin:0; }
            .vD-in { display:flex; flex-direction:column; }
            .vD-feat { color:#fff; background: var(--color-navy); justify-content:flex-end; min-height:300px; }
            .vD-feat .vD-bg { position:absolute; inset:0; background-size:cover; background-position:center; opacity:.5; }
            .vD-feat::after { content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgb(21 22 58 / .12), rgb(21 22 58 / .90)); }
            .vD-feat .vD-in { position:relative; z-index:2; margin-top:auto; }
            .vD-feat h3 { color:#fff; font-size:25px; }
            .vD-feat p { color: rgb(255 255 255 / .85); }
            .vD-feat .vD-ico { background: rgb(255 255 255 / 0.16); color:#fff; }
            .vD-grid .c5 { grid-column: span 5; } .vD-grid .c6 { grid-column: span 6; } .vD-grid .c7 { grid-column: span 7; }
            .caps-trust { margin-top:50px; text-align:center; }
            .caps-trust-lead { display:block; font-size:14px; font-weight:500; color: var(--color-ink-3); margin-bottom:20px; }
            .caps-trust-grid { display:flex; flex-wrap:wrap; justify-content:center; gap:16px; }
            .trust-box { display:flex; align-items:center; gap:13px; background:#fff; border:1px solid var(--color-rule); border-radius:15px; padding:16px 22px; box-shadow: 0 12px 26px -20px rgb(15 22 58 / .28); }
            .trust-box .ti { display:inline-flex; align-items:center; justify-content:center; width:42px; height:42px; border-radius:12px; background: rgb(49 177 248 / .12); color: var(--color-accent-deep); flex-shrink:0; }
            .trust-box .ti svg { width:22px; height:22px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
            .trust-box .tt { text-align:left; }
            .trust-box .tt b { display:block; font-family: var(--font-display); font-weight:500; font-size:15.5px; color: var(--color-navy); letter-spacing:-.01em; line-height:1.2; }
            .trust-box .tt > span { font-size:12.5px; color: var(--color-ink-3); }
            @media (max-width: 1120px){ .caps-h2, .caps-sub { white-space: normal; } }
            @media (max-width: 1000px){ .vD-grid { grid-template-columns:1fr; } .vD-grid .c5,.vD-grid .c6,.vD-grid .c7 { grid-column: span 1; } }
            @media (max-width: 640px){ .trust-box { flex: 1 1 44%; } }
          `}</style>
        </section>
      )}

      {/* CTA strip para el nuevo modelo — antes de casos (orden pedido por JR) */}
      {isNewModel && ctaStrip}

      {/* CASOS DE ÉXITO (3 tarjetas reales) */}
      {isNewModel && cfg.caseStudies && cfg.caseStudies.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-paper)" }}>
          <div className="flame-container">
            <div className="text-center mx-auto" style={{ maxWidth: 660, marginBottom: 44 }}>
              <span className="cases-eyebrow">{currentLang === "en" ? "Case studies" : "Casos de éxito"}</span>
              <h2 className="text-[clamp(26px,3vw,42px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>{cfg.casesTitle}</h2>
              {cfg.casesSub && <p className="mt-3.5 text-[clamp(16px,1.2vw,18px)] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{cfg.casesSub}</p>}
            </div>
            <div className="grid gap-7 cases-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {cfg.caseStudies.map((cs, i) => (
                <a key={i} href={cs.href} target="_blank" rel="noopener" className="case-card rounded-2xl overflow-hidden flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  <div style={{ aspectRatio: "16/10", background: `url('${cs.img}') center/cover` }} />
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[11.5px] font-semibold uppercase mb-2" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.08em" }}>{currentLang === "en" ? "Case study" : "Caso de éxito"}</span>
                    <h3 className="text-[18px] font-medium mb-2" style={{ color: "var(--color-navy)", lineHeight: 1.25, fontFamily: "var(--font-display)" }}>{cs.title}</h3>
                    <p className="text-[14px] leading-[1.55] flex-1" style={{ color: "var(--color-ink-2)" }}>{cs.excerpt}</p>
                    <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: "1px solid var(--color-rule)" }}>
                      <span className="text-[12.5px]" style={{ color: "var(--color-ink-3)" }}>{cs.date}</span>
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>{currentLang === "en" ? "View" : "Ver caso"} <Icon name="arrow" className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center" style={{ marginTop: 40 }}>
              <a href={currentLang === "en" ? "https://www.flameanalytics.com/en/category/case-studies/" : "https://www.flameanalytics.com/es/categoria/casos-de-exito/"} target="_blank" rel="noopener" className="cta-btn cta-btn--lg" style={{ background: "#fff", color: "var(--color-navy)", border: "1px solid var(--color-rule-strong)", fontWeight: 700 }}>
                {currentLang === "en" ? "See all case studies" : "Ver todos los casos de éxito"} <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
          </div>
          <style>{`
            .cases-eyebrow { display:inline-block; font-family: var(--font-body); font-size:12.5px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; color: var(--color-accent-deep); margin-bottom:14px; }
            .case-card { transition: transform .28s cubic-bezier(0.22,1,0.36,1), box-shadow .28s, border-color .28s; }
            .case-card:hover { transform: translateY(-3px); box-shadow: 0 18px 40px -22px rgb(15 23 42 / 0.22); border-color: var(--color-rule-strong); }
            @media (max-width: 900px){ .cases-grid { grid-template-columns: 1fr !important; max-width: 420px; margin: 0 auto; } }
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
      <section className="py-[80px]" style={{ background: "#fff" }}>
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

      {/* CTA strip — modelo antiguo (tras productos). En el nuevo modelo va tras las capacidades. */}
      {!isNewModel && ctaStrip}

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
