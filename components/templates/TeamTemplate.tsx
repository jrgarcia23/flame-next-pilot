import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { TEAM } from "@/lib/team";

const COPY = {
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbAbout: "Sobre nosotros",
    eyebrow: "Conoce al equipo",
    titleA: "Equipo", titleHl: "Flame",
    body: "Compuesto por expertos en big data, retail, consultoría, marketing e ingeniería, el equipo de Flame lleva más de 10 años convirtiendo datos en decisiones para retail, centros comerciales y espacios físicos.",
    sectionHead: "El equipo",
    sectionSub: "13 personas detrás de la plataforma. Producto, ingeniería, customer, ventas e inversores.",
    hiringEyebrow: "¡Estamos contratando!",
    hiringTitleA: "¿Te apetece", hiringTitleHl: "construir Flame", hiringTitleB: "con nosotros?",
    hiringBody: "Si te gusta Flame y quieres aportar tu valía y tu experiencia, contáctanos. Buscamos perfiles de ingeniería, producto, customer success, ventas y marketing.",
    hiringCta: "Contactar con nosotros",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbAbout: "About us",
    eyebrow: "Meet the team",
    titleA: "The", titleHl: "Flame team",
    body: "Experts in big data, retail, consulting, marketing and engineering. The Flame team has been turning data into decisions for retail, shopping malls and physical spaces for more than 10 years.",
    sectionHead: "The team",
    sectionSub: "13 people behind the platform. Product, engineering, customer, sales and investors.",
    hiringEyebrow: "We're hiring!",
    hiringTitleA: "Want to", hiringTitleHl: "build Flame", hiringTitleB: "with us?",
    hiringBody: "If you like Flame and want to bring your skills and experience, get in touch. We're hiring for engineering, product, customer success, sales and marketing.",
    hiringCta: "Get in touch",
  },
};

export default function TeamTemplate({ currentLang, enHref }: { currentLang: "es" | "en"; enHref: string }) {
  const t = COPY[currentLang];
  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={currentLang} enHref={enHref} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)", color: "white",
          paddingTop: "clamp(80px, 9vw, 140px)", paddingBottom: "clamp(56px, 6vw, 96px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.14), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.08), transparent 72%)" }} />
        <div className="flame-container relative z-10" style={{ maxWidth: 880 }}>
          <nav className="text-[14px] mb-5 flex items-center gap-1.5" style={{ color: "rgb(255 255 255 / 0.6)" }}>
            <a href={`/${currentLang}/`} style={{ color: "inherit" }}>{t.breadcrumbHome}</a>
            <span>›</span>
            <a href={currentLang === "es" ? "/es/sobre-nosotros/" : "/en/about-us/"} style={{ color: "inherit" }}>{t.breadcrumbAbout}</a>
          </nav>
          <p className="mb-4 font-medium" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
            {t.eyebrow}
          </p>
          <h1 className="text-[clamp(40px,4.8vw,64px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
            {t.titleA} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.titleHl}</span>
          </h1>
          <p className="text-[clamp(17px,1.3vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch" }}>
            {t.body}
          </p>
        </div>
      </section>

      {/* TEAM GRID — Variante B (cards cuadradas a sangre con zoom hover) */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mb-12 max-w-[820px]">
            <h2 className="font-normal mb-3" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.018em", lineHeight: 1.1 }}>
              {t.sectionHead}
            </h2>
            <p style={{ color: "var(--color-ink-2)", fontSize: "15.5px", lineHeight: 1.6, maxWidth: "52ch" }}>
              {t.sectionSub}
            </p>
          </div>
          <div className="grid gap-6 team-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {TEAM.map((m) => (
              <article key={m.name} className="team-card rounded-2xl overflow-hidden" style={{ background: "var(--color-paper-soft)" }}>
                <div className="team-photo" style={{ aspectRatio: "1/1", background: "var(--color-navy)", overflow: "hidden" }}>
                  <img src={m.photo} alt={m.name} loading="lazy" className="team-img" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium mb-1" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 17, letterSpacing: "-0.008em", lineHeight: 1.2 }}>{m.name}</h3>
                  <p style={{ color: "var(--color-accent-deep)", fontSize: 13, fontWeight: 600 }}>
                    {currentLang === "es" ? m.roleEs : m.roleEn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .team-card { transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms; }
          .team-card:hover { transform: translateY(-4px); box-shadow: 0 20px 50px -20px rgb(15 23 42 / 0.25); }
          .team-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1); }
          .team-card:hover .team-img { transform: scale(1.05); }
          @media (max-width: 1100px) { .team-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 780px)  { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 460px)  { .team-grid { grid-template-columns: 1fr !important; max-width: 360px; margin: 0 auto; } }
        `}</style>
      </section>

      {/* HIRING CTA */}
      <section className="py-20" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="rounded-3xl mx-auto text-center" style={{ background: "var(--color-navy)", color: "#fff", padding: "clamp(48px, 6vw, 80px) clamp(28px, 5vw, 56px)", maxWidth: 960, backgroundImage: "radial-gradient(700px 400px at 88% 110%, rgba(49,177,248,0.22), transparent 72%)", position: "relative", overflow: "hidden" }}>
            <p className="font-medium mb-3" style={{ color: "var(--color-accent)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              {t.hiringEyebrow}
            </p>
            <h2 className="font-normal mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>
              {t.hiringTitleA} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.hiringTitleHl}</span> {t.hiringTitleB}
            </h2>
            <p className="mx-auto mb-7" style={{ color: "rgb(255 255 255 / 0.78)", fontSize: 16, lineHeight: 1.6, maxWidth: "52ch" }}>
              {t.hiringBody}
            </p>
            <a href="mailto:info@flameanalytics.com?subject=Quiero%20trabajar%20en%20Flame" className="cta-btn cta-btn--lg inline-flex" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              {t.hiringCta} →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter currentLang={currentLang} />
    </>
  );
}
