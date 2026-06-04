import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { UI } from "@/lib/page-content";
import PartnersForm from "@/components/PartnersForm";

export const metadata: Metadata = {
  title: "Partner Program · Flame Analytics",
  description: "Join Flame's Partner Program: vendor-agnostic hardware, scalable SaaS and expert advisory to distribute physical-space analytics worldwide.",
  alternates: {
    canonical: "/en/partners/",
    languages: {
    en: "/en/partners/",
    es: "/es/partners/",
    "x-default": "/es/partners/",
  },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/partners/",
    siteName: "Flame Analytics",
    title: "Partner Program · Flame Analytics",
    description: "Join Flame's Partner Program: vendor-agnostic hardware, scalable SaaS and expert advisory to distribute physical-space analytics worldwide.",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Partners2-scaled-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partner Program · Flame Analytics",
    description: "Join Flame's Partner Program: vendor-agnostic hardware, scalable SaaS and expert advisory to distribute physical-space analytics worldwide.",
    images: ["/wp-content/uploads/2026/01/Partners2-scaled-1.png"],
  },
};

const currentLang = "en" as const;
const enHref = "/es/partners/";

type Pillar = { icon: string; title: string; body: string };

const PILLARS: Pillar[] = [
  {
    icon: "grid",
    title: "Cloud-agnostic hardware",
    body: "Flame is compatible with all major camera and sensor manufacturers on the market. Choose the infrastructure that best fits each rollout, refresh or expansion without vendor lock-in. Cisco Meraki, Axis, Hikvision, Dahua, Hanwha, Bosch or your own gear: if it speaks IP, Flame works with it.",
  },
  {
    icon: "trending",
    title: "Robust and scalable SaaS",
    body: "Cloud-native platform that scales from a single store to networks of hundreds of retail venues, shopping malls or public spaces. No on-prem servers, no field maintenance: continuous updates, real-time dashboards and an architecture ready to grow with your customers.",
  },
  {
    icon: "users",
    title: "Specialised advisory",
    body: "Technical accompaniment from day zero. We map customer needs, define the capture architecture, calibrate the metrics that matter and train your team. The difference between yet another sensor and a real business decision.",
  },
  {
    icon: "integration",
    title: "Custom development and integrations",
    body: "Documented API, webhooks and connectors for CRM, BI, ERP, POS, marketing automation or vertical systems. We build custom integrations when the case warrants it, so Flame fits the stack each customer already runs.",
  },
];

export default function PartnersEn() {
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
          backgroundImage: "url('/wp-content/uploads/2026/01/Partners2-scaled-1.png')",
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
            background: "linear-gradient(90deg, rgb(21 22 58 / 0.78) 0%, rgb(21 22 58 / 0.55) 55%, rgb(21 22 58 / 0.35) 100%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 760 }}>
            <p
              className="mb-4 font-medium"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px,2vw,30px)",
                letterSpacing: "-0.012em",
                lineHeight: 1.2,
              }}
            >
              Partner Program
            </p>
            <h1
              className="mb-7 font-normal"
              style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,4.2vw,60px)",
                letterSpacing: "-0.022em",
                lineHeight: 1.08,
              }}
            >
              Bring physical-space analytics{" "}
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>to your customers</span>
            </h1>
            <p
              className="text-[clamp(17px,1.25vw,19px)] font-normal mb-9"
              style={{
                color: "rgb(255 255 255 / 0.85)",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.005em",
                lineHeight: 1.6,
              }}
            >
              Join the network of integrators, consultants and technology partners that deploy Flame in retail, shopping malls, hospitality and public venues. Vendor-agnostic hardware, scalable SaaS and real technical support, so you close projects with margin and a differentiated story.
            </p>
            <a
              href="#contact"
              className="cta-btn cta-btn--lg"
              style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}
            >
              Become a partner
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-14" style={{ maxWidth: 820 }}>
            <h2
              className="text-[clamp(32px,3.4vw,48px)] font-normal mb-6"
              style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}
            >
              Why partner with{" "}
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Flame</span>
            </h2>
            <p className="text-[clamp(17px,1.25vw,19px)] leading-relaxed mx-auto" style={{ color: "var(--color-ink-2)", maxWidth: "64ch" }}>
              Serious tech behind, a channel without margin wars and a team that helps land every project.
            </p>
          </div>
          <div className="grid gap-6 p-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {PILLARS.map((p, i) => (
              <article
                key={i}
                className="benefit-card rounded-2xl p-8"
                style={{ background: "#fff", border: "1px solid var(--color-rule)" }}
              >
                <div
                  className="benefit-icon inline-flex items-center justify-center rounded-[12px] mb-5"
                  style={{ width: 52, height: 52, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}
                >
                  <Icon name={p.icon} className="w-6 h-6" />
                </div>
                <h3
                  className="text-[22px] font-medium mb-4"
                  style={{ color: "var(--color-navy)", letterSpacing: "-0.012em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}
                >
                  {p.title}
                </h3>
                <p className="text-[16px] leading-[1.65]" style={{ color: "var(--color-ink-2)" }}>
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .p-grid { grid-template-columns: 1fr !important; } }
          .benefit-card { transition: transform 420ms ease, background 420ms ease, border-color 420ms ease, box-shadow 420ms ease; }
          .benefit-card:hover { transform: translateY(-1px); background: var(--color-paper-soft) !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .benefit-card .benefit-icon { transition: background 420ms ease, color 420ms ease; }
          .benefit-card:hover .benefit-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* FORM — mirror of live WPCF7 partner application */}
      <section className="py-[80px]" id="contact" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2
                className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5"
                style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}
              >
                Join the{" "}
                <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Flame channel</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                Tell us about your company, market and deployment capacity.{" "}
                <strong style={{ color: "var(--color-navy)" }}>We reply within 24 business hours</strong>{" "}
                with an initial fit assessment and next steps.
              </p>
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
                No commitment, no sales pitch.
              </p>
            </div>
            <PartnersForm lang="en" />
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
