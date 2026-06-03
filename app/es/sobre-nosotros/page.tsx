import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Quiénes somos · Flame Analytics",
  description: "Flame Analytics: plataforma de análisis avanzado para espacios físicos desde 2016. Clientes en 23 países, reconocida por Gartner, G2 y la prensa nacional.",
  alternates: {
    canonical: "/es/sobre-nosotros/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

const currentLang = "es" as const;
const enHref = "/en/about-us/";

// Datos reales actualizables — JR confirma cifras antes de prod
const KPIS = [
  { num: "180+",  lbl: "Clientes B2B" },
  { num: "23",    lbl: "Países" },
  { num: "2.4B",  lbl: "Visitantes / año" },
  { num: "10",    lbl: "Años operando" },
];

const TIER1 = [
  {
    badge: null,
    logo: "/wp-content/uploads/2026/01/gartner.png",
    quote: "Flame combina visión por computador con datos multi-fuente de una forma poco común entre vendors europeos — y clava la regulación RGPD desde el diseño.",
    cta: "Ver informe Gartner",
    href: "#",
  },
  {
    badge: "★ Leader Spring 2026",
    logo: "/wp-content/uploads/2026/01/g2-about-us.jpg",
    quote: "4.7 / 5 sobre 48 reviews verificadas. \"Implementación rápida y soporte técnico de primera. Migramos de un competidor US y ganamos cumplimiento RGPD.\"",
    cta: "Ver reviews en G2",
    href: "#",
  },
];

const TIER2 = [
  { src: "/wp-content/uploads/2026/01/prescient.png",    alt: "Prescient" },
  { src: "/wp-content/uploads/2026/01/chief.png",        alt: "Chief" },
  { src: "/wp-content/uploads/2026/01/peerinsights.png", alt: "Gartner Peer Insights" },
];

const PRESS = [
  { name: "El País",         logo: "/wp-content/uploads/2026/01/el-pais.png",         headline: "La startup española que mide el retail físico con IA, sin invadir la privacidad." },
  { name: "El Mundo",        logo: "/wp-content/uploads/2026/01/el-mundo.png",        headline: "Flame: tecnología visual sin biometría, certificada RGPD." },
  { name: "ABC",             logo: "/wp-content/uploads/2026/01/abc.png",             headline: "El retail físico recupera terreno frente al e-commerce gracias a la analítica." },
  { name: "La Razón",        logo: "/wp-content/uploads/2026/01/la-razon.png",        headline: "Tracking de tráfico anónimo y agregado en aeropuertos y centros comerciales." },
  { name: "El Confidencial", logo: "/wp-content/uploads/2026/01/el-confidencial.png", headline: "Una serie A liderada por PadeInvest y BeWater para escalar en LATAM." },
];

const INVESTORS = [
  { src: "/wp-content/uploads/2026/01/padeinvest.png", alt: "PadeInvest" },
  { src: "/wp-content/uploads/2026/01/bewater.jpg",    alt: "BeWater Funds" },
];

export default function SobreNosotrosEs() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* 1. HERO KPI — bg navy + H1 con KPIs cyan + dot grid right */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-navy)", color: "#fff", paddingTop: "clamp(110px, 11vw, 160px)", paddingBottom: "clamp(70px, 7vw, 110px)" }}
      >
        <div className="flame-container relative" style={{ zIndex: 2 }}>
          <p className="font-medium mb-5" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-body)" }}>
            Flame en números · 2026
          </p>
          <h1 className="mb-7 font-medium" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.2vw, 78px)", letterSpacing: "-0.022em", lineHeight: 1.05, maxWidth: 1180 }}>
            Medimos <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>180+</span> espacios físicos en{" "}
            <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>23</span> países, generando{" "}
            <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>2.4B</span> observaciones para{" "}
            <span style={{ color: "var(--color-accent)", fontVariantNumeric: "tabular-nums" }}>540</span> equipos directivos.
          </h1>
          <p className="mb-9" style={{ color: "rgb(255 255 255 / 0.7)", fontFamily: "var(--font-body)", fontSize: "clamp(17px, 1.3vw, 20px)", lineHeight: 1.65, maxWidth: 800 }}>
            Desde 2016 transformamos vídeo y datos multi-fuente en decisiones que mueven la facturación del retail físico. Hypersensor IA, RGPD desde el diseño, y soporte técnico real.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              Pide tu demo
              <Icon name="arrow" className="w-4 h-4" />
            </a>
            <a href="#analistas" className="cta-btn cta-btn--lg" style={{ background: "transparent", color: "#fff", border: "1px solid rgb(255 255 255 / 0.4)", fontWeight: 600 }}>
              Lee el informe Gartner
            </a>
          </div>
        </div>
        {/* Dot grid decorativo */}
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

      {/* 2. STAT BAR — sticky bajo el header */}
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

      {/* 3. ANALISTAS TIER 1 — 2 cards grandes Gartner + G2 */}
      <section id="analistas" className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 900 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Reconocido por los analistas que importan
            </p>
            <h2 className="font-medium" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
              Cuando Gartner y G2 evalúan nuestra categoría, Flame aparece.
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

      {/* 4. ANALISTAS TIER 2 + PRENSA — 2 cols sobre navy */}
      <section className="py-[80px]" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 tier2-grid" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
            <div>
              <h3 className="mb-7" style={{ fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgb(255 255 255 / 0.55)", fontWeight: 700 }}>
                También nos citan
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
                En medios
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

      {/* 5. ¿QUÉ ES FLAME? — explicación producto concisa */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 820 }}>
            <h2 className="font-medium" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 42px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
              ¿Qué hace Flame, en concreto?
            </h2>
          </div>
          <div className="grid gap-8 qf-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { icon: "behavior",   title: "Visión por computador",        desc: "Procesamos cámaras existentes con IA propia. Sin biometría, sin datos personales, anonimización en el sensor." },
              { icon: "integration",title: "Integración multi-fuente",     desc: "Vídeo + WiFi + TPV + sensores ambientales en una sola plataforma cloud. Cisco Meraki, Axis, Hikvision, Dahua, Hanwha o equipos propios." },
              { icon: "privacy",    title: "RGPD desde el diseño",         desc: "Cumplimiento legal certificado por arquitectura, no por política. ISO 27001 y EU-US Data Privacy Framework." },
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

      {/* 6. EQUIPO + MISIÓN — 2 cols, equipo izda + misión drcha */}
      <section className="py-[80px]" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <div className="grid items-start gap-14 em-grid" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>El equipo</p>
              <h2 className="font-medium mb-5" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Conoce al equipo
              </h2>
              <p className="mb-7" style={{ color: "rgb(255 255 255 / 0.75)", fontSize: 16, lineHeight: 1.7 }}>
                Compuesto por expertos en big data, retail, consultoría, marketing e ingeniería. Más de una década dedicada a ofrecer soluciones técnicas innovadoras al sector.
              </p>
              <a href="/es/sobre-nosotros/conoce-al-equipo/" className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                Ver el equipo completo
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>Misión</p>
              <h2 className="font-medium mb-5" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Hacer del espacio físico una fuente de decisiones, no de intuiciones.
              </h2>
              <p style={{ color: "rgb(255 255 255 / 0.75)", fontSize: 16, lineHeight: 1.7 }}>
                Servimos de puente entre el mundo offline y el online, ofreciendo a nuestros clientes herramientas digitales para el mundo físico. Estas herramientas les permiten conocer mejor a sus clientes y conectar con ellos, generando ventajas competitivas duraderas.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .em-grid { grid-template-columns: 1fr !important; gap: 56px !important; } }
        `}</style>
      </section>

      {/* 7. INVERSORES — línea sobria 60px */}
      <section style={{ background: "var(--color-paper)", borderTop: "1px solid var(--color-rule)", borderBottom: "1px solid var(--color-rule)", padding: "40px 0" }}>
        <div className="flame-container">
          <div className="flex items-center justify-center flex-wrap" style={{ gap: 48 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 700 }}>Respaldados por</span>
            {INVESTORS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 36, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
            <span style={{ fontSize: 12, color: "var(--color-ink-3)", letterSpacing: "0.04em" }}>Serie A · 2023</span>
          </div>
        </div>
      </section>

      {/* 8. FORM DEMO con bullets de qué pasa al rellenarlo */}
      <section className="py-[80px]" id="contact" style={{ background: "var(--color-navy)", color: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
            <div>
              <h2 className="font-medium mb-5" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 46px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                ¿Listo para escribir tu capítulo con Flame?
              </h2>
              <p className="mb-7" style={{ color: "rgb(255 255 255 / 0.75)", fontSize: 17, lineHeight: 1.65 }}>
                El 68% de las demos termina en un proof-of-concept en 30 días. Sin compromiso, sin email follow-up automático.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Te llamamos en 24h laborables",
                  "Demo de 30 min adaptada a tu sector",
                  "Sin compromiso, sin follow-up automático",
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
