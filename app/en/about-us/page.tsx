import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "About us · Flame Analytics",
  description: "Flame Analytics: advanced analytics platform for physical spaces since 2016. Customers in 23 countries, recognised by Gartner, G2 and national press.",
  alternates: {
    canonical: "/en/about-us/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

const currentLang = "en" as const;
const enHref = "/es/sobre-nosotros/";

const KPIS = [
  { num: "180+",  lbl: "B2B customers" },
  { num: "23",    lbl: "Countries" },
  { num: "2.4B",  lbl: "Visitors / year" },
  { num: "10",    lbl: "Years operating" },
];

const TIER1 = [
  {
    badge: null,
    logo: "/wp-content/uploads/2026/01/gartner.png",
    quote: "Flame combines computer vision with multi-source data in a way that's rare among European vendors — and they nail GDPR-by-design.",
    cta: "Read Gartner report",
    href: "#",
  },
  {
    badge: "★ Leader Spring 2026",
    logo: "/wp-content/uploads/2026/01/g2-about-us.jpg",
    quote: "4.7 / 5 across 48 verified reviews. \"Fast implementation and top-tier technical support. We migrated from a US competitor and gained GDPR compliance.\"",
    cta: "Read G2 reviews",
    href: "#",
  },
];

const TIER2 = [
  { src: "/wp-content/uploads/2026/01/prescient.png",    alt: "Prescient" },
  { src: "/wp-content/uploads/2026/01/chief.png",        alt: "Chief" },
  { src: "/wp-content/uploads/2026/01/peerinsights.png", alt: "Gartner Peer Insights" },
];

const PRESS = [
  { name: "El País",         logo: "/wp-content/uploads/2026/01/el-pais.png",         headline: "The Spanish startup measuring physical retail with AI, without invading privacy." },
  { name: "El Mundo",        logo: "/wp-content/uploads/2026/01/el-mundo.png",        headline: "Flame: visual tech without biometrics, GDPR-certified." },
  { name: "ABC",             logo: "/wp-content/uploads/2026/01/abc.png",             headline: "Physical retail claws back ground against e-commerce through analytics." },
  { name: "La Razón",        logo: "/wp-content/uploads/2026/01/la-razon.png",        headline: "Anonymous, aggregated traffic tracking in airports and shopping malls." },
  { name: "El Confidencial", logo: "/wp-content/uploads/2026/01/el-confidencial.png", headline: "A Series A led by PadeInvest and BeWater to scale into LATAM." },
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

      {/* 1. HERO KPI */}
      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "#fff", paddingTop: "clamp(110px, 11vw, 160px)", paddingBottom: "clamp(70px, 7vw, 110px)" }}>
        <div className="flame-container relative" style={{ zIndex: 2 }}>
          <p className="font-medium mb-5" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-body)" }}>
            Flame in numbers · 2026
          </p>
          <h1 className="mb-7 font-medium" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.2vw, 78px)", letterSpacing: "-0.022em", lineHeight: 1.05, maxWidth: 1180 }}>
            We measure <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>180+</span> physical venues across{" "}
            <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>23</span> countries, generating{" "}
            <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>2.4B</span> observations for{" "}
            <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>540</span> executive teams.
          </h1>
          <p className="mb-9" style={{ color: "rgb(255 255 255 / 0.7)", fontFamily: "var(--font-body)", fontSize: "clamp(17px, 1.3vw, 20px)", lineHeight: 1.65, maxWidth: 800 }}>
            Since 2016 we&apos;ve turned video and multi-source data into decisions that move physical retail revenue. Hypersensor AI, GDPR-by-design and real tech support behind it.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              Request a demo
              <Icon name="arrow" className="w-4 h-4" />
            </a>
            <a href="#analysts" className="cta-btn cta-btn--lg" style={{ background: "transparent", color: "#fff", border: "1px solid rgb(255 255 255 / 0.4)", fontWeight: 600 }}>
              Read the Gartner report
            </a>
          </div>
        </div>
        <div className="hero-dots" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => <span key={i} />)}
        </div>
        <style>{`
          .hero-dots { position: absolute; right: clamp(24px, 5vw, 88px); top: 50%; transform: translateY(-50%); display: grid; grid-template-columns: repeat(4, 14px); gap: 22px; z-index: 1; }
          .hero-dots span { width: 10px; height: 10px; border-radius: 50%; background: var(--color-accent); opacity: 0.35; animation: heroBlink 3.2s infinite; }
          .hero-dots span:nth-child(2n) { animation-delay: 0.4s; }
          .hero-dots span:nth-child(3n) { animation-delay: 1.2s; }
          .hero-dots span:nth-child(5n) { animation-delay: 1.8s; }
          @keyframes heroBlink { 0%, 100% { opacity: 0.22; transform: scale(1); } 50% { opacity: 1; transform: scale(1.35); } }
          @media (max-width: 900px) { .hero-dots { display: none; } }
        `}</style>
      </section>

      {/* 2. STAT BAR */}
      <div className="stat-bar" style={{ background: "var(--color-paper)", borderTop: "2px solid var(--color-accent)", borderBottom: "1px solid var(--color-rule)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {KPIS.map((k, i) => (
          <div key={i} className="stat-cell" style={{ padding: "20px 16px", textAlign: "center", borderRight: i < KPIS.length - 1 ? "1px solid var(--color-rule)" : "none" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 500, letterSpacing: "-0.018em", color: "var(--color-navy)", fontVariantNumeric: "tabular-nums" }}>{k.num}</div>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 600, marginTop: 4 }}>{k.lbl}</div>
          </div>
        ))}
        <style>{`
          @media (max-width: 700px) {
            .stat-bar { grid-template-columns: repeat(2, 1fr) !important; }
            .stat-cell:nth-child(2n) { border-right: 0 !important; }
            .stat-cell { border-bottom: 1px solid var(--color-rule); }
          }
        `}</style>
      </div>

      {/* 3. ANALYSTS TIER 1 */}
      <section id="analysts" className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 900 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Recognised by the analysts that matter
            </p>
            <h2 className="font-medium" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
              When Gartner and G2 evaluate our category, Flame shows up.
            </h2>
          </div>
          <div className="grid gap-6 t1-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {TIER1.map((c, i) => (
              <article key={i} className="rounded-2xl" style={{ background: "#fff", border: "1px solid var(--color-rule)", padding: 36 }}>
                {c.badge && (
                  <span className="inline-block mb-4" style={{ padding: "5px 12px", borderRadius: 999, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
                    {c.badge}
                  </span>
                )}
                <img src={c.logo} alt="" style={{ height: 42, width: "auto", display: "block", marginBottom: 20, objectFit: "contain" }} />
                <p className="italic mb-5" style={{ fontSize: 18, lineHeight: 1.55, color: "var(--color-ink-1)" }}>
                  {c.quote}
                </p>
                <a href={c.href} className="inline-flex items-center gap-1.5 font-semibold" style={{ color: "var(--color-accent-deep)", fontSize: 14, textDecoration: "none" }}>
                  {c.cta} <Icon name="arrow" className="w-3.5 h-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 800px) { .t1-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* 4. TIER 2 + PRESS */}
      <section className="py-[80px]" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 tier2-grid" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
            <div>
              <h3 className="mb-7" style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgb(255 255 255 / 0.55)", fontWeight: 700 }}>
                Also cited by
              </h3>
              <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                {TIER2.map((l) => (
                  <div key={l.src} className="rounded-lg flex items-center justify-center" style={{ padding: "24px 16px", border: "1px solid rgb(255 255 255 / 0.15)", background: "rgb(255 255 255 / 0.03)" }}>
                    <img src={l.src} alt={l.alt} style={{ height: 38, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.85 }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-7" style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgb(255 255 255 / 0.55)", fontWeight: 700 }}>
                In the media
              </h3>
              <ul className="flex flex-col" style={{ listStyle: "none", gap: 16, padding: 0, margin: 0 }}>
                {PRESS.map((p) => (
                  <li key={p.name} style={{ paddingBottom: 16, borderBottom: "1px solid rgb(255 255 255 / 0.12)", fontSize: 14, lineHeight: 1.55, color: "rgb(255 255 255 / 0.72)" }}>
                    <strong className="block mb-1" style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 14, letterSpacing: "0.02em" }}>{p.name}</strong>
                    {p.headline}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .tier2-grid { grid-template-columns: 1fr !important; gap: 56px !important; } }
        `}</style>
      </section>

      {/* 5. WHAT FLAME DOES */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 820 }}>
            <h2 className="font-medium" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
              What does Flame do, exactly?
            </h2>
          </div>
          <div className="grid gap-8 qf-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { icon: "behavior",   title: "Computer vision",            desc: "We process existing cameras with proprietary AI. No biometrics, no personal data, on-sensor anonymisation." },
              { icon: "integration",title: "Multi-source integration",   desc: "Video + WiFi + POS + ambient sensors in a single cloud platform. Cisco Meraki, Axis, Hikvision, Dahua, Hanwha or your own gear." },
              { icon: "privacy",    title: "GDPR by design",             desc: "Legal compliance certified by architecture, not by policy. ISO 27001 and EU-US Data Privacy Framework." },
            ].map((c, i) => (
              <div key={i}>
                <div className="inline-flex items-center justify-center rounded-[10px] mb-4" style={{ width: 44, height: 44, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                  <Icon name={c.icon} className="w-5 h-5" />
                </div>
                <h3 className="mb-3 font-medium" style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.012em", color: "var(--color-navy)" }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: 15, color: "var(--color-ink-2)", lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .qf-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
        `}</style>
      </section>

      {/* 6. TEAM + MISSION 2 cols */}
      <section className="py-[80px]" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <div className="grid items-start gap-14 em-grid" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>The team</p>
              <h2 className="font-medium mb-5" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Meet the team
              </h2>
              <p className="mb-7" style={{ color: "rgb(255 255 255 / 0.75)", fontSize: 16, lineHeight: 1.7 }}>
                Composed of experts in big data, retail, consulting, marketing and engineering. Over a decade delivering the most innovative tech solutions in the sector.
              </p>
              <a href="/en/about-us/meet-the-team/" className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                See the full team
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>Mission</p>
              <h2 className="font-medium mb-5" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Make the physical space a source of decisions, not intuitions.
              </h2>
              <p style={{ color: "rgb(255 255 255 / 0.75)", fontSize: 16, lineHeight: 1.7 }}>
                We bridge the offline and online worlds, giving customers digital tools for the physical world. Tools that help them understand their customers better and connect with them, ultimately generating lasting competitive advantages.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .em-grid { grid-template-columns: 1fr !important; gap: 56px !important; } }
        `}</style>
      </section>

      {/* 7. INVESTORS — sober line */}
      <section style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)", padding: "40px 0" }}>
        <div className="flame-container">
          <div className="flex items-center justify-center flex-wrap" style={{ gap: 48 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 700 }}>Backed by</span>
            {INVESTORS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 36, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
            <span style={{ fontSize: 12, color: "var(--color-ink-3)", letterSpacing: "0.04em" }}>Series A · 2023</span>
          </div>
        </div>
      </section>

      {/* 8. FORM */}
      <section className="py-[80px]" id="contact" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
            <div>
              <h2 className="font-medium mb-5" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 46px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                Ready to write your chapter with Flame?
              </h2>
              <p className="mb-7" style={{ color: "rgb(255 255 255 / 0.75)", fontSize: 17, lineHeight: 1.65 }}>
                68% of demos end in a proof-of-concept within 30 days. No commitment, no automated follow-up emails.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "We call you within 24 business hours",
                  "30-minute demo tailored to your sector",
                  "No commitment, no automated follow-up",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3" style={{ fontSize: 15, color: "rgb(255 255 255 / 0.82)" }}>
                    <span style={{ width: 20, height: 20, borderRadius: 999, background: "rgb(49 177 248 / 0.18)", color: "var(--color-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <Icon name="check" className="w-3 h-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <form className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <input className="cf-in col-span-2" type="text" name="nombre" placeholder={t.fName} required />
              <select className="cf-in" name="sector" defaultValue="" required>
                <option value="" disabled>{t.fSector}</option>
                <option>{t.sMalls}</option>
                <option>{t.sVenues}</option>
                <option>{t.sRetail}</option>
                <option>{t.sHosp}</option>
                <option>{t.sOther}</option>
              </select>
              <input className="cf-in" type="email" name="email" placeholder={t.fEmail} required />
              <input className="cf-in" type="text" name="empresa" placeholder={t.fCompany} required />
              <input className="cf-in" type="text" name="pais" placeholder={t.fCountry} />
              <label className="col-span-2 flex items-start gap-2" style={{ color: "rgb(255 255 255 / 0.7)", fontSize: 13, marginTop: 8 }}>
                <input type="checkbox" className="mt-1" style={{ accentColor: "var(--color-accent)" }} required />
                <span>
                  {t.consent}{" "}
                  <a href={t.privacyHref} style={{ color: "var(--color-accent)", borderBottom: "1px solid currentColor" }}>{t.privacy}</a>.
                </span>
              </label>
              <button type="submit" className="col-span-2 cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700, width: "fit-content", marginTop: 8 }}>
                {t.submit}
              </button>
            </form>
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 15.5px; color: #fff; background: rgb(255 255 255 / 0.05); border: 1px solid rgb(255 255 255 / 0.15); border-radius: 10px; font-family: inherit; width: 100%; }
          .cf-in::placeholder { color: rgb(255 255 255 / 0.4); }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.16); background: rgb(255 255 255 / 0.08); }
          .cf-in option { background: var(--color-navy); color: #fff; }
          @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
