import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { LOGOS, UI } from "@/lib/page-content";
import { HS_EN } from "@/lib/hypersensor-content";

export const metadata: Metadata = {
  title: HS_EN.meta.title,
  description: HS_EN.meta.description,
  alternates: {
    canonical: "/en/hypersensor/",
    languages: {
      es: "/es/hypersensor/",
      en: "/en/hypersensor/",
      "x-default": "/es/hypersensor/",
    },
  },
};

const currentLang = "en" as const;
const esHref = "/es/hypersensor/";

export default function HypersensorEn() {
  const t = UI[currentLang];
  const cfg = HS_EN;

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={esHref} currentLang={currentLang} />

      {/* 1. HERO — bg Characteristics-1.png + eyebrow + sub + CTA + 4 cards inside (matches live) */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#15163A",
          backgroundImage: `url('${cfg.hero.bgImage}')`,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          color: "white",
          paddingTop: "clamp(80px, 9vw, 130px)",
          paddingBottom: "clamp(60px, 7vw, 100px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgb(21 22 58 / 0.75) 0%, rgb(21 22 58 / 1) 75%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div className="text-center mx-auto mb-16" style={{ maxWidth: 920 }}>
            <p
              className="mb-6 font-medium"
              style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(28px,3.4vw,44px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}
            >
              {cfg.hero.eyebrow}
            </p>
            <p
              className="text-[clamp(17px,1.3vw,20px)] font-normal mb-10 mx-auto"
              style={{
                color: "rgb(255 255 255 / 0.82)",
                maxWidth: "70ch",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.005em",
                lineHeight: 1.55,
              }}
            >
              {cfg.hero.sub}
            </p>
            <a
              href={t.contactHref}
              className="cta-btn cta-btn--lg"
              style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}
            >
              {cfg.hero.cta}
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
          <div className="grid gap-5 hero-b-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {cfg.benefits.map((b, i) => (
              <article
                key={i}
                className="hero-benefit-card rounded-2xl p-6"
                style={{ background: "rgb(255 255 255 / 0.05)", border: "1px solid rgb(255 255 255 / 0.12)" }}
              >
                <div
                  className="hero-benefit-icon inline-flex items-center justify-center rounded-[12px] mb-4"
                  style={{ width: 44, height: 44, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent)" }}
                >
                  <Icon name={b.icon} className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-semibold mb-2" style={{ color: "#fff", letterSpacing: "-0.005em", lineHeight: 1.3 }}>{b.title}</h3>
                <p className="text-[14px] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.7)" }}>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .hero-b-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px) { .hero-b-grid { grid-template-columns: 1fr !important; } }
          .hero-benefit-card { transition: background 420ms ease, border-color 420ms ease, transform 420ms ease; }
          .hero-benefit-card:hover { background: rgb(255 255 255 / 0.08) !important; border-color: rgb(255 255 255 / 0.22) !important; transform: translateY(-2px); }
        `}</style>
      </section>

      {/* 2. LOGOS */}
      <section
        className="pt-[50px] pb-[50px] relative overflow-hidden"
        style={{ background: "var(--color-navy)", color: "white" }}
      >
        <div className="flame-container">
          <p
            className="text-center mb-8 font-medium"
            style={{
              color: "#fff",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 2.6vw, 32px)",
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
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


      {/* 4. FEATURES */}
      <section className="pt-[40px] pb-[40px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 720 }}>
            <p
              className="text-[clamp(17px,1.4vw,21px)] font-normal"
              style={{
                color: "var(--color-ink-2)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.012em",
                lineHeight: 1.3,
              }}
            >
              {cfg.featuresIntro}
            </p>
          </div>
        </div>
        {cfg.features.map((f, i) => (
          <div
            key={i}
            className="flame-container"
            style={{ paddingTop: 32, paddingBottom: 32 }}
          >
            <div
              className={`grid gap-12 items-center ${f.imgLeft ? "stripe-grid" : "stripe-grid-rev"}`}
              style={{
                gridTemplateColumns: f.imgLeft ? "1.2fr 1fr" : "1fr 1.2fr",
              }}
            >
              {f.imgLeft ? (
                <>
                  <div>
                    <img
                      src={f.img}
                      alt={f.imgAlt}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        borderRadius: 14,
                      }}
                    />
                  </div>
                  <div>
                    <h3
                      className="text-[clamp(22px,2.2vw,30px)] font-medium mb-5"
                      style={{
                        color: "var(--color-navy)",
                        letterSpacing: "-0.012em",
                        lineHeight: 1.2,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {f.title}{" "}
                      {f.titleHl && (
                        <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                          {f.titleHl}
                        </span>
                      )}
                    </h3>
                    <p
                      className="text-[17px] leading-[1.7]"
                      style={{ color: "var(--color-ink-2)" }}
                    >
                      {f.body}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3
                      className="text-[clamp(22px,2.2vw,30px)] font-medium mb-5"
                      style={{
                        color: "var(--color-navy)",
                        letterSpacing: "-0.012em",
                        lineHeight: 1.2,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {f.title}{" "}
                      {f.titleHl && (
                        <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                          {f.titleHl}
                        </span>
                      )}
                    </h3>
                    <p
                      className="text-[17px] leading-[1.7]"
                      style={{ color: "var(--color-ink-2)" }}
                    >
                      {f.body}
                    </p>
                  </div>
                  <div>
                    <img
                      src={f.img}
                      alt={f.imgAlt}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        borderRadius: 14,
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <style>{`
          @media (max-width: 900px) {
            .stripe-grid, .stripe-grid-rev { grid-template-columns: 1fr !important; }
            .stripe-grid-rev > div:last-child { order: -1; }
          }
        `}</style>
      </section>

      {/* 5. PRODUCTS */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div
            className="grid gap-12 items-center prod-split"
            style={{ gridTemplateColumns: "1fr 1.35fr" }}
          >
            <div>
              <h2
                className="text-[clamp(26px,2.8vw,40px)] font-medium mb-5"
                style={{
                  color: "var(--color-navy)",
                  letterSpacing: "-0.014em",
                  lineHeight: 1.15,
                  fontFamily: "var(--font-display)",
                }}
              >
                {cfg.productsTitle}{" "}
                <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                  {cfg.productsTitleHl}
                </span>
              </h2>
              <p
                className="text-[clamp(17px,1.25vw,19px)] leading-[1.55] mb-6"
                style={{ color: "var(--color-ink-2)" }}
              >
                {cfg.productsSub}
              </p>
              <ul className="flex flex-col gap-3">
                {cfg.productsBullets.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-2.5 text-[15.5px] font-medium"
                    style={{ color: "var(--color-navy)" }}
                  >
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        background: "rgb(49 177 248 / 0.15)",
                        color: "var(--color-accent-deep)",
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="check" className="w-3.5 h-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="grid gap-5 prod3-grid"
              style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
            >
              {cfg.products.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  className="prod3-card rounded-2xl p-6 flex flex-col"
                  style={{ background: "#fff", border: "1px solid var(--color-rule)" }}
                >
                  <div
                    className="prod3-iconwrap inline-flex items-center justify-center rounded-[14px] mb-5"
                    style={{ width: 56, height: 56, background: "rgb(49 177 248 / 0.12)" }}
                  >
                    <img
                      src={p.iconImg}
                      alt={p.name}
                      style={{
                        width: 32,
                        height: 32,
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                  <h3
                    className="text-[20px] font-normal mb-3"
                    style={{
                      color: "var(--color-navy)",
                      letterSpacing: "-0.014em",
                      lineHeight: 1.2,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="text-[14.5px] leading-[1.6] flex-1 mb-5"
                    style={{ color: "var(--color-ink-2)" }}
                  >
                    {p.desc}
                  </p>
                  <span
                    className="prod3-cta inline-flex items-center gap-1.5 text-[13.5px] font-semibold"
                    style={{ color: "var(--color-accent-deep)" }}
                  >
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

      {/* 5.5 CTA strip */}
      <section className="py-[80px]" style={{ background: "var(--color-navy)" }}>
        <div className="flame-container">
          <div className="flex items-center gap-8 cta-strip-row">
            <p
              className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1"
              style={{
                color: "#fff",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.005em",
                lineHeight: 1.35,
              }}
            >
              {cfg.ctaStripBold}
              <br />
              <span style={{ color: "rgb(255 255 255 / 0.7)", fontWeight: 400 }}>
                {cfg.ctaStripLight}
              </span>
            </p>
            <a
              href={t.contactHref}
              className="cta-btn cta-btn--xl flex-shrink-0"
              style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}
            >
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

      {/* 6. FAQ */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2
            className="text-center mx-auto mb-14 text-[clamp(32px,3.4vw,48px)] font-normal"
            style={{
              color: "var(--color-navy)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              fontFamily: "var(--font-display)",
            }}
          >
            {cfg.faqTitle}{" "}
            <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>
              {cfg.faqTitleHl}
            </span>
          </h2>
          <div className="grid gap-4 faq-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {cfg.faqs.map((f, i) => (
              <details
                key={i}
                className="rounded-2xl p-6 group transition"
                style={{ background: "#fff", border: "1px solid var(--color-rule)" }}
              >
                <summary
                  className="flex items-start justify-between gap-4 cursor-pointer text-[17px] font-medium list-none"
                  style={{
                    color: "var(--color-navy)",
                    letterSpacing: "-0.005em",
                    lineHeight: 1.35,
                  }}
                >
                  <span>{f.q}</span>
                  <span
                    className="inline-flex items-center justify-center rounded-full flex-shrink-0 transition"
                    style={{
                      width: 30,
                      height: 30,
                      background: "rgb(49 177 248 / 0.12)",
                      color: "var(--color-accent-deep)",
                    }}
                  >
                    <Icon name="plus" className="w-3.5 h-3.5" />
                  </span>
                </summary>
                <div
                  className="mt-5 text-[15.5px] leading-[1.7]"
                  style={{ color: "var(--color-ink-2)" }}
                >
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr !important; } }
          details[open] summary span:last-child { background: var(--color-accent) !important; color: var(--color-navy) !important; transform: rotate(45deg); }
        `}</style>
      </section>

      {/* 7. DEMO FORM */}
      <section className="py-[80px]" id="contact" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div
            className="grid gap-14 items-start contact-grid"
            style={{ gridTemplateColumns: "1fr 1.2fr" }}
          >
            <div>
              <h2
                className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5"
                style={{
                  color: "var(--color-navy)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  fontFamily: "var(--font-display)",
                }}
              >
                {t.contactTitle}{" "}
                <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                  {t.contactTitleHl}
                </span>
              </h2>
              <p
                className="text-[17px] leading-relaxed mb-6"
                style={{ color: "var(--color-ink-2)" }}
              >
                {t.contactSub}{" "}
                <strong style={{ color: "var(--color-navy)" }}>{t.contactSubBold}</strong>{" "}
                {t.contactSubAfter}
              </p>
              <p
                className="text-[15px] font-semibold mb-2"
                style={{ color: "var(--color-navy)" }}
              >
                {t.contactCta}
              </p>
            </div>
            <form className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <input className="cf-in col-span-2" type="text" placeholder={t.fName} />
              <select className="cf-in" defaultValue="">
                <option value="" disabled>
                  {t.fSector}
                </option>
                <option>{t.sMalls}</option>
                <option>{t.sVenues}</option>
                <option>{t.sRetail}</option>
                <option>{t.sHosp}</option>
                <option>{t.sOther}</option>
              </select>
              <input className="cf-in" type="email" placeholder={t.fEmail} />
              <input className="cf-in" type="text" placeholder={t.fCompany} />
              <input className="cf-in" type="text" placeholder={t.fCountry} />
              <label
                className="col-span-2 flex items-start gap-2 text-[13.5px] mt-2"
                style={{ color: "var(--color-ink-3)" }}
              >
                <input
                  type="checkbox"
                  className="mt-1"
                  style={{ accentColor: "var(--color-accent)" }}
                  required
                />
                <span>
                  {t.consent}{" "}
                  <a
                    href={t.privacyHref}
                    style={{
                      color: "var(--color-accent-deep)",
                      borderBottom: "1px solid currentColor",
                    }}
                  >
                    {t.privacy}
                  </a>
                  .
                </span>
              </label>
              <button
                type="button"
                className="col-span-2 mt-3 cta-btn cta-btn--md"
                style={{
                  background: "var(--color-accent)",
                  color: "#fff",
                  fontWeight: 700,
                  width: "fit-content",
                }}
              >
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
