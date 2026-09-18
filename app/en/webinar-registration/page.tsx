import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import RegisterForm from "@/components/RegisterForm";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Webinar: Beyond Connectivity · Flame Analytics",
  description: "Free online webinar, 15 October 2026, 16:00 CEST. Discover how shopping centres can turn WiFi into a strategic tool for visitor data, engagement and loyalty. Hosted by Óscar García, CSO at Flame Analytics.",
  alternates: {
    canonical: "/en/webinar-registration/",
    languages: {
      es: "/es/inscripcion-webinars/",
      en: "/en/webinar-registration/",
      "x-default": "/en/webinar-registration/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/webinar-registration/",
    siteName: "Flame Analytics",
    title: "Beyond Connectivity: How WiFi, Data & Loyalty Can Drive Shopping Centre Performance",
    description: "Free online webinar, 15 October 2026, 16:00 CEST. Turn shopping centre WiFi into a strategic source of visitor intelligence, engagement and loyalty.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Connectivity: WiFi, Data & Loyalty for Shopping Centres",
    description: "Free online webinar, 15 October 2026, 16:00 CEST. Hosted by Óscar García, CSO at Flame Analytics.",
  },
};

const currentLang = "en" as const;

const LEARN: { title: string; desc: string }[] = [
  { title: "Beyond free WiFi", desc: "How WiFi can become a strategic asset for shopping centres." },
  { title: "Understanding your visitors", desc: "What WiFi-generated data can tell you about visitor behaviour and patterns." },
  { title: "Building first-party data", desc: "How shopping centres can strengthen their direct relationship with visitors." },
  { title: "From data to engagement", desc: "Turning visitor insights into more relevant communications and experiences." },
  { title: "Connecting WiFi and loyalty", desc: "How connectivity can support loyalty and CRM strategies." },
  { title: "Supporting retailers", desc: "How data and insights can create additional value for retailers and commercial teams." },
  { title: "Measuring performance", desc: "Connecting visitor data and engagement with broader shopping centre objectives." },
];

export default function FlameWebinarRegistration() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref="/es/inscripcion-webinars/" currentLang={currentLang} />

      {/* HERO — 2-col: title + description + bullets left · form right */}
      <section
        id="register"
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: "url('/wp-content/uploads/2026/04/6-1.jpg')",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(80px, 7vw, 110px)",
          scrollMarginTop: 80,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgb(21 22 58 / 0.92) 0%, rgb(21 22 58 / 0.82) 40%, rgb(21 22 58 / 0.62) 100%)" }}
        />
        <div className="flame-container relative z-10">
          <div className="grid items-center gap-16 hero-grid" style={{ gridTemplateColumns: "1.05fr 1fr" }}>
            {/* LEFT */}
            <div>
              <p className="mb-5 font-medium" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                Flame Webinar
              </p>
              <h1 className="text-[clamp(32px,3.6vw,50px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
                Beyond Connectivity: how <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>WiFi, data &amp; loyalty</span> can drive shopping centre performance
              </h1>
              <p className="text-[clamp(16px,1.2vw,18px)] leading-[1.6] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", fontFamily: "var(--font-body)", maxWidth: "56ch" }}>
                What if your shopping centre WiFi could do more than connect visitors? Discover how to turn WiFi into a strategic tool for understanding visitors, building first-party data, increasing engagement and strengthening loyalty.
              </p>
              <ul className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
                {[
                  "15 October 2026 · 16:00 CEST",
                  "Live online",
                  "Hosted by Óscar García, CSO",
                  "Recording sent to registrants",
                ].map((b) => (
                  <li key={b} className="inline-flex items-center gap-2.5 text-[15px]" style={{ color: "rgb(255 255 255 / 0.92)" }}>
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "rgb(49 177 248 / 0.2)", color: "var(--color-accent)", flexShrink: 0 }}>
                      <Icon name="check" className="w-3.5 h-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — Form */}
            <div className="rounded-2xl" style={{ background: "#fff", padding: 32, boxShadow: "0 24px 60px -20px rgb(0 0 0 / 0.4)" }}>
              <h3 className="font-normal mb-1" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.2vw, 28px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Save your seat
              </h3>
              <p className="text-[14px] mb-5" style={{ color: "var(--color-ink-3)" }}>
                We&apos;ll email you the access link.
              </p>
              <RegisterForm
                kind="webinars"
                topicName="Beyond Connectivity: How WiFi, Data & Loyalty Can Drive Shopping Centre Performance (15 Oct 2026)"
                topicDate="2026-10-15T16:00:00+02:00"
                submitLabel="Register now"
                privacyHref={t.privacyHref}
                variant="hero"
              />
            </div>
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 48px; padding: 12px 16px; font-size: 14.5px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 8px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        `}</style>
      </section>

      {/* INTRODUCTION */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="mx-auto" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Introduction
            </p>
            <h2 className="font-normal mb-6" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
              WiFi can be much more than <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>connectivity</span>
            </h2>
            {[
              "Shopping centre WiFi has traditionally been seen as a service: something visitors expect to have access to while they are in the centre.",
              "When connected with data and loyalty strategies, WiFi can help shopping centres build a richer understanding of their visitors, create more relevant experiences and unlock new opportunities to engage with them, both during and beyond their visit.",
              "In this webinar, we will explore how shopping centres across Europe can move beyond connectivity and turn WiFi into a strategic source of visitor intelligence and engagement.",
            ].map((para, i) => (
              <p key={i} className="mb-4" style={{ color: "var(--color-ink-2)", fontSize: "clamp(16px,1.2vw,17px)", lineHeight: 1.7 }}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WILL YOU LEARN */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              What will you learn?
            </p>
            <h2 className="font-normal" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              A practical session with <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>real examples</span>
            </h2>
          </div>
          <div className="grid gap-6 learn-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", maxWidth: 980, margin: "0 auto" }}>
            {LEARN.map((c, i) => (
              <article key={i} className="rounded-2xl p-6 flex gap-4" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)" }}>
                <span className="inline-flex items-center justify-center rounded-full" style={{ width: 26, height: 26, background: "rgb(49 177 248 / 0.14)", color: "var(--color-accent-deep)", flexShrink: 0, marginTop: 2 }}>
                  <Icon name="check" className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{c.title}</h3>
                  <p style={{ color: "var(--color-ink-2)", fontSize: 14.5, lineHeight: 1.6 }}>{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`@media (max-width: 760px) { .learn-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* WHY ATTEND + CTA */}
      <section className="py-24" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <div className="mx-auto text-center" style={{ maxWidth: 780 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Why attend?
            </p>
            <h2 className="font-normal mb-6" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.2vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
              The role of WiFi in shopping centres is <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>changing</span>
            </h2>
            <p className="mb-4" style={{ color: "rgb(255 255 255 / 0.82)", fontSize: "clamp(16px,1.2vw,18px)", lineHeight: 1.7 }}>
              The opportunity is no longer simply to offer visitors a reliable connection, but to use that connection as part of a broader strategy around data, engagement, loyalty and performance.
            </p>
            <p className="mb-8" style={{ color: "rgb(255 255 255 / 0.82)", fontSize: "clamp(16px,1.2vw,18px)", lineHeight: 1.7 }}>
              Join us to explore what this could look like in practice and discover how WiFi, data and loyalty can work together to create smarter, more connected and more engaging shopping centre experiences.
            </p>
            <p className="mb-8 font-medium" style={{ color: "#fff", fontSize: 16 }}>
              15 October 2026 · 16:00 CEST · Online
            </p>
            <a href="#register" className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              Register now <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter currentLang={currentLang} />
    </>
  );
}
