import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { LOGOS, UI } from "@/lib/page-content";
import DemoFormInline from "@/components/DemoFormInline";

export const metadata: Metadata = {
  title: "About us · Flame Analytics",
  description: "Flame Analytics: advanced analytics platform for physical spaces. Team, mission, recognition, press and investors.",
  alternates: {
    canonical: "/en/about-us/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

const currentLang = "en" as const;
const enHref = "/es/sobre-nosotros/";

const INVESTORS = [
  { src: "/wp-content/uploads/2026/01/padeinvest.png", alt: "PadeInvest" },
  { src: "/wp-content/uploads/2026/01/bewater.jpg",    alt: "BeWater Funds" },
];

const RECOGNITIONS = [
  { src: "/wp-content/uploads/2026/01/gartner.png",      alt: "Gartner" },
  { src: "/wp-content/uploads/2026/01/g2-about-us.jpg",  alt: "G2" },
  { src: "/wp-content/uploads/2026/01/prescient.png",    alt: "Prescient" },
  { src: "/wp-content/uploads/2026/01/peerinsights.png", alt: "Gartner Peer Insights" },
  { src: "/wp-content/uploads/2026/01/chief.png",        alt: "Chief" },
];

const PRESS = [
  { src: "/wp-content/uploads/2026/01/el-pais.png",         alt: "El País" },
  { src: "/wp-content/uploads/2026/01/el-mundo.png",        alt: "El Mundo" },
  { src: "/wp-content/uploads/2026/01/abc.png",             alt: "ABC" },
  { src: "/wp-content/uploads/2026/01/la-razon.png",        alt: "La Razón" },
  { src: "/wp-content/uploads/2026/01/el-confidencial.png", alt: "El Confidencial" },
];

export default function AboutUsEn() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* 01 · HERO + LOGOS MARQUEE — full soluciones architecture */}
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
          paddingBottom: "clamp(20px, 2.4vw, 32px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, var(--color-navy) 0%, rgb(21 22 58 / 0.92) 38%, rgb(21 22 58 / 0.5) 65%, rgb(21 22 58 / 0.2) 100%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 680 }}>
            <p className="mb-4 font-medium" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-body)" }}>
              Who we are
            </p>
            <h1 className="text-[clamp(40px,5.2vw,64px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
              Let&apos;s transform physical spaces together
            </h1>
            <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.55] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch", fontFamily: "var(--font-body)" }}>
              Founded in 2016, Flame has become the leading global Location Analytics platform, helping thousands of users optimise visitor value and improve venue performance.
            </p>
            <ul className="grid gap-3 mb-9" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
              {["Founded in 2016", "Across 23 countries", "180+ B2B customers", "GDPR by design"].map((b) => (
                <li key={b} className="inline-flex items-center gap-2.5 text-[16px]" style={{ color: "rgb(255 255 255 / 0.92)" }}>
                  <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.2)", color: "var(--color-accent)", flexShrink: 0 }}>
                    <Icon name="check" className="w-4 h-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              Get in touch
              <Icon name="arrow" className="w-4 h-4" />
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
          .logo-track { display: flex; gap: clamp(48px, 5vw, 80px); width: max-content; align-items: center; animation: marquee-x 40s linear infinite; }
          .logo-track:hover { animation-play-state: paused; }
          .logo-img { height: 80px; width: auto; opacity: 0.78; filter: brightness(0) invert(1); transition: opacity 280ms ease; flex-shrink: 0; }
          .logo-img:hover { opacity: 1; }
          @keyframes marquee-x { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @media (max-width: 700px) { .logo-img { height: 65px; } }
        `}</style>
      </section>

      {/* 02 · WHAT IS FLAME? */}
      <section className="py-[96px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto" style={{ maxWidth: 880 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              What is Flame
            </p>
            <h2 className="font-normal mb-6" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.018em", lineHeight: 1.12 }}>
              A platform to understand the physical world
            </h2>
            <p className="text-[clamp(17px,1.25vw,19px)] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>
              Flame is an advanced analytics platform for physical spaces that seamlessly integrates video with other data sources, enabling fact-based decisions grounded on relevant information.
            </p>
          </div>
        </div>
      </section>

      {/* 03 · TEAM + MISSION (2 cols, white bg) */}
      <section className="py-[96px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid items-start gap-20 about-twocols" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                The team
              </p>
              <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Meet the team
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>
                Composed of experts in big data, retail, consulting, marketing and engineering, the Flame team is a young, dynamic group with over a decade delivering the most innovative tech solutions on the market. Want to meet us?
              </p>
              <a
                href="/en/about-us/meet-the-team/"
                className="inline-flex items-center gap-1.5 font-medium"
                style={{ color: "var(--color-navy)", fontSize: 15, textDecoration: "none", borderBottom: "1px solid var(--color-navy)", paddingBottom: 4 }}
              >
                Meet the team
                <Icon name="arrow" className="w-3.5 h-3.5" />
              </a>
            </div>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                Our mission
              </p>
              <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Bridge between offline and online
              </h2>
              <p className="text-[17px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
                Our mission is to bridge the offline and online worlds, providing customers with digital tools for the physical world. These tools help them understand their customers better and connect with them, ultimately generating lasting competitive advantages.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .about-twocols { grid-template-columns: 1fr !important; gap: 56px !important; } }
        `}</style>
      </section>

      {/* 04 · INVESTORS */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Backed by
            </p>
            <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
              Investors who trust in Flame
            </h2>
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              We&apos;re proud to be backed by sector-leading investors such as PadeInvest and BeWater Funds. Their trust in our commitment to technological innovation fuels our mission to deliver cutting-edge analytics solutions.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 80 }}>
            {INVESTORS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 56, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
          <p className="text-center mt-8" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 700 }}>
            Series A · 2023
          </p>
        </div>
      </section>

      {/* 05 · RECOGNIZED BY (grayscale → hover color) */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 880 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Recognition
            </p>
            <h2 className="font-normal" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 32px)", letterSpacing: "-0.014em", lineHeight: 1.15 }}>
              Recognised by the sector&apos;s leading analysts
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center logos-row" style={{ gap: "32px 48px" }}>
            {RECOGNITIONS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} className="logo-bw" style={{ height: 44, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
        </div>
        <style>{`
          .logo-bw { filter: grayscale(1); opacity: 0.6; transition: filter 240ms ease, opacity 240ms ease; }
          .logo-bw:hover { filter: grayscale(0); opacity: 1; }
        `}</style>
      </section>

      {/* 06 · PRESS */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              In the media
            </p>
            <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 32px)", letterSpacing: "-0.014em", lineHeight: 1.15 }}>
              Press coverage
            </h2>
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              Major publications such as El País, El Mundo, ABC, La Razón or El Confidencial have covered our platform. We&apos;ve also appeared on multiple radio and TV programmes.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center logos-row" style={{ gap: "32px 48px" }}>
            {PRESS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} className="logo-bw" style={{ height: 36, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>

      {/* 07 · DEMO FORM — same pattern as the rest of pages */}
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
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
                {t.contactCta}
              </p>
            </div>
            <DemoFormInline lang={"en"} variant="demo" gridClass="" />
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 15.5px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 10px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <SiteFooter currentLang="en" />
    </>
  );
}
