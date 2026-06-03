import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "About us · Flame Analytics",
  description: "Flame Analytics: advanced analytics platform for physical spaces. Team, mission, recognition, press and investors behind Flame.",
  alternates: {
    canonical: "/en/about-us/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

const currentLang = "en" as const;
const enHref = "/es/sobre-nosotros/";

const RECOGNITIONS = [
  { src: "/wp-content/uploads/2026/01/gartner.png",      alt: "Gartner" },
  { src: "/wp-content/uploads/2026/01/prescient.png",    alt: "Prescient" },
  { src: "/wp-content/uploads/2026/01/peerinsights.png", alt: "Gartner Peer Insights" },
  { src: "/wp-content/uploads/2026/01/chief.png",        alt: "Chief" },
  { src: "/wp-content/uploads/2026/01/g2-about-us.jpg",  alt: "G2" },
];

const PRESS = [
  { src: "/wp-content/uploads/2026/01/el-pais.png",         alt: "El País" },
  { src: "/wp-content/uploads/2026/01/el-mundo.jpg",        alt: "El Mundo" },
  { src: "/wp-content/uploads/2026/01/abc.png",             alt: "ABC" },
  { src: "/wp-content/uploads/2026/01/la-razon.jpg",        alt: "La Razón" },
  { src: "/wp-content/uploads/2026/01/el-confidencial.png", alt: "El Confidencial" },
];

const INVESTORS = [
  { src: "/wp-content/uploads/2026/01/padeinvest.png", alt: "PadeInvest" },
  { src: "/wp-content/uploads/2026/01/bewater.jpg",    alt: "BeWater Funds" },
];

export default function AboutUsEn() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#15163A",
          backgroundImage: "url('/wp-content/uploads/2026/01/Partners-1-scaled-1.png')",
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
            background: "linear-gradient(90deg, rgb(21 22 58 / 0.82) 0%, rgb(21 22 58 / 0.58) 50%, rgb(21 22 58 / 0.30) 100%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div className="grid items-center gap-12 about-hero-grid" style={{ gridTemplateColumns: "1.05fr 1fr" }}>
            <div>
              <p className="mb-4 font-medium" style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)", fontSize: "clamp(22px,2vw,30px)", letterSpacing: "-0.012em", lineHeight: 1.2 }}>
                Who we are
              </p>
              <h1 className="mb-7 font-normal" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(36px,4.2vw,60px)", letterSpacing: "-0.022em", lineHeight: 1.08 }}>
                Let&apos;s transform <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>physical spaces</span> together
              </h1>
              <p className="text-[clamp(17px,1.25vw,19px)] font-normal mb-9" style={{ color: "rgb(255 255 255 / 0.85)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.6 }}>
                Founded in 2016, Flame has become the leading global Location Analytics platform, helping thousands of users optimise visitor value and improve venue performance.
              </p>
              <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                Get in touch
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div className="about-hero-collage">
              <img src="/wp-content/uploads/2026/01/about-us.png" alt="Flame team" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .about-hero-grid { grid-template-columns: 1fr !important; }
            .about-hero-collage { max-width: 520px; margin: 0 auto; }
          }
        `}</style>
      </section>

      {/* WHAT IS FLAME */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid items-start gap-14 about-section-grid" style={{ gridTemplateColumns: "1fr 1.15fr" }}>
            <div>
              <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal mb-6" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
                What is <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Flame</span>?
              </h2>
              <p className="text-[17px] leading-[1.7] mb-5" style={{ color: "var(--color-ink-2)" }}>
                Flame is an advanced analytics platform for physical spaces that seamlessly integrates video with other data sources, enabling fact-based decisions grounded on relevant information.
              </p>
              <p className="text-[17px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
                We turn existing cameras and sensors into a continuous source of business intelligence: traffic, conversion, behaviour, occupancy and visitor experience per square metre.
              </p>
            </div>
            <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {[
                { k: "2016",  v: "Founded",               d: "Platform launched." },
                { k: "+30",   v: "Countries deployed",    d: "EU, LATAM and Asia." },
                { k: "+1000", v: "Venues analysed",       d: "Retail, malls, hospitality and venues." },
                { k: "100%",  v: "Privacy by design",     d: "No biometrics, no personal data." },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  <div className="text-[clamp(28px,2.6vw,38px)] font-medium mb-1" style={{ color: "var(--color-accent-deep)", fontFamily: "var(--font-display)", letterSpacing: "-0.018em", lineHeight: 1.1 }}>{s.k}</div>
                  <div className="text-[15px] font-semibold mb-1" style={{ color: "var(--color-navy)" }}>{s.v}</div>
                  <div className="text-[13.5px]" style={{ color: "var(--color-ink-3)", lineHeight: 1.5 }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .about-section-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* RECOGNIZED BY + PRESS */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 logos-split" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
            <div>
              <p className="mb-3 font-medium" style={{ color: "var(--color-accent-deep)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
                Recognised by
              </p>
              <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-7" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                Leading <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>analysts</span> and platforms talk about Flame.
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                {RECOGNITIONS.map((l) => (
                  <img key={l.src} src={l.src} alt={l.alt} style={{ height: 38, width: "auto", display: "block", objectFit: "contain", filter: "grayscale(0.4)" }} />
                ))}
              </div>
            </div>
            <div style={{ borderLeft: "1px solid var(--color-rule)", paddingLeft: 56 }} className="press-col">
              <p className="mb-3 font-medium" style={{ color: "var(--color-accent-deep)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
                Press
              </p>
              <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                In the <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>media</span>
              </h2>
              <p className="text-[16px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>
                Major publications such as El País, El Mundo, ABC, Cinco Días, Expansión, Emprendedores or La Razón have covered our platform. We&apos;ve also appeared on multiple radio and TV programmes.
              </p>
              <div className="flex flex-wrap items-center gap-7">
                {PRESS.map((l) => (
                  <img key={l.src} src={l.src} alt={l.alt} style={{ height: 32, width: "auto", display: "block", objectFit: "contain", filter: "grayscale(0.6)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) {
            .logos-split { grid-template-columns: 1fr !important; }
            .press-col { border-left: 0 !important; padding-left: 0 !important; padding-top: 40px; border-top: 1px solid var(--color-rule); }
          }
        `}</style>
      </section>

      {/* TEAM + MISSION */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-14 about-section-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="rounded-2xl p-10" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
              <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                Meet the <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>team</span>
              </h2>
              <p className="text-[16.5px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>
                Composed of experts in big data, retail, consulting, marketing and engineering, the Flame team is a young, dynamic group with over a decade delivering the most innovative tech solutions on the market.
              </p>
              <a href="/en/about-us/meet-the-team/" className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                Get to know us
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div className="rounded-2xl p-10" style={{ background: "var(--color-navy)", color: "#fff", border: "1px solid var(--color-navy)" }}>
              <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "#fff", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                Our <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>mission</span>
              </h2>
              <p className="text-[16.5px] leading-[1.7]" style={{ color: "rgb(255 255 255 / 0.78)" }}>
                Bridge the offline and online worlds, giving customers digital tools for the physical world. These tools help them know their customers better and connect with them, ultimately generating competitive advantages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTORS */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 760 }}>
            <p className="mb-3 font-medium" style={{ color: "var(--color-accent-deep)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
              Investors
            </p>
            <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
              Backed by those who <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>bet on innovation</span>
            </h2>
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              We&apos;re proud to be backed by sector-leading investors such as PadeInvest and BeWater Funds. Their trust in our commitment to technological innovation fuels our mission to deliver cutting-edge analytics solutions for physical spaces.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {INVESTORS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 54, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="py-[80px]" id="contact" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                {t.contactTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.contactTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                Discover Flame in just 20 minutes. We&apos;ll show you how we can{" "}
                <strong style={{ color: "var(--color-navy)" }}>improve your business results</strong>.
              </p>
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>{t.contactCta}</p>
            </div>
            <form className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <input className="cf-in col-span-2" type="text" placeholder={t.fName} />
              <select className="cf-in" defaultValue="">
                <option value="" disabled>{t.fSector}</option>
                <option>{t.sMalls}</option>
                <option>{t.sVenues}</option>
                <option>{t.sRetail}</option>
                <option>{t.sHosp}</option>
                <option>{t.sOther}</option>
              </select>
              <input className="cf-in" type="email" placeholder={t.fEmail} />
              <input className="cf-in" type="text" placeholder={t.fCompany} />
              <input className="cf-in" type="text" placeholder={t.fCountry} />
              <label className="col-span-2 flex items-start gap-2 text-[13.5px] mt-2" style={{ color: "var(--color-ink-3)" }}>
                <input type="checkbox" className="mt-1" style={{ accentColor: "var(--color-accent)" }} required />
                <span>
                  {t.consent}{" "}
                  <a href={t.privacyHref} style={{ color: "var(--color-accent-deep)", borderBottom: "1px solid currentColor" }}>{t.privacy}</a>.
                </span>
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
