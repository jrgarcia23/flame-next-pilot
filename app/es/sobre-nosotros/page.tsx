import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Quiénes somos · Flame Analytics",
  description: "Flame Analytics: plataforma de análisis avanzado para espacios físicos. Equipo, misión, reconocimientos, prensa e inversores que están detrás de Flame.",
  alternates: {
    canonical: "/es/sobre-nosotros/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

const currentLang = "es" as const;
const enHref = "/en/about-us/";

const RECOGNITIONS = [
  { src: "/wp-content/uploads/2026/01/g2-about-us.jpg",  alt: "G2" },
  { src: "/wp-content/uploads/2026/01/gartner.png",      alt: "Gartner" },
  { src: "/wp-content/uploads/2026/01/prescient.png",    alt: "Prescient" },
  { src: "/wp-content/uploads/2026/01/peerinsights.png", alt: "Gartner Peer Insights" },
  { src: "/wp-content/uploads/2026/01/chief.png",        alt: "Chief" },
];

const PRESS = [
  { src: "/wp-content/uploads/2026/01/la-razon.png",        alt: "La Razón" },
  { src: "/wp-content/uploads/2026/01/abc.png",             alt: "ABC" },
  { src: "/wp-content/uploads/2026/01/el-pais.png",         alt: "El País" },
  { src: "/wp-content/uploads/2026/01/el-mundo.png",        alt: "El Mundo" },
  { src: "/wp-content/uploads/2026/01/el-confidencial.png", alt: "El Confidencial" },
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

      {/* 1. HERO — clavado al live: bg navy + gradient + about-us.png a la derecha */}
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
            background: "linear-gradient(90deg, rgb(21 22 58 / 0.82) 0%, rgb(21 22 58 / 0.58) 50%, rgb(21 22 58 / 0.20) 100%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div className="grid items-center gap-12 about-hero-grid" style={{ gridTemplateColumns: "1.1fr 1fr" }}>
            <div>
              <p className="mb-4 font-medium" style={{ color: "var(--color-accent)", fontFamily: "var(--font-display)", fontSize: "clamp(22px,2vw,30px)", letterSpacing: "-0.012em", lineHeight: 1.2 }}>
                Quiénes somos
              </p>
              <h1 className="mb-7 font-normal" style={{ color: "#fff", fontFamily: "var(--font-display)", fontSize: "clamp(36px,4.2vw,60px)", letterSpacing: "-0.022em", lineHeight: 1.08 }}>
                Transformemos juntos los espacios físicos
              </h1>
              <p className="text-[clamp(17px,1.25vw,19px)] font-normal mb-9" style={{ color: "rgb(255 255 255 / 0.85)", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.6 }}>
                Creada en 2016, Flame se ha convertido en la principal plataforma mundial de Análisis de la Localización, que permite a miles de usuarios optimizar el valor de los visitantes y mejorar el rendimiento de los locales.
              </p>
              <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                Contacta con nosotros
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div className="about-hero-collage">
              <img src="/wp-content/uploads/2026/01/about-us.png" alt="Equipo Flame" style={{ width: "100%", height: "auto", display: "block" }} />
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

      {/* 2. ¿QUÉ ES FLAME? — texto solo, centrado */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto" style={{ maxWidth: 820 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal mb-6" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              ¿Qué es Flame?
            </h2>
            <p className="text-[clamp(17px,1.25vw,19px)] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              Flame es una plataforma de análisis avanzado para espacios físicos que integra a la perfección el vídeo con otras fuentes de datos, lo que permite tomar decisiones fundamentadas basadas en información relevante.
            </p>
          </div>
        </div>
      </section>

      {/* 3. RECONOCIDO POR */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 760 }}>
            <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
              Reconocido por
            </h2>
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "40px 56px" }}>
            {RECOGNITIONS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 56, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRENSA */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 820 }}>
            <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
              Prensa
            </h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              Prestigiosas publicaciones como El País, El Mundo, ABC, Cinco Días, Expansión, Emprendedores o La Razón han dedicado sus páginas a nuestra plataforma. Además, hemos aparecido en numerosas ocasiones en programas de radio y televisión.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: "40px 56px" }}>
            {PRESS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 44, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>

      {/* 5-6. CONOCE AL EQUIPO + MISIÓN — 2 cols lado a lado, como el live (section 709eb23a, 3 cols Elementor) */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid items-start gap-14 about-twocols" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                Conoce al equipo
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>
                Compuesto por expertos en big data, retail, consultoría, marketing e ingeniería, el equipo de Flame es un grupo joven y dinámico que lleva más de una década dedicado a ofrecer a los clientes las soluciones tecnológicas más innovadoras del mercado. ¿Quieres conocernos?
              </p>
              <a href="/es/sobre-nosotros/conoce-al-equipo/" className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                Conoce al equipo
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <div>
              <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
                Misión
              </h2>
              <p className="text-[17px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
                Nuestra misión es servir de puente entre el mundo offline y el online, ofreciendo a nuestros clientes herramientas digitales para el mundo físico. Estas herramientas les permiten conocer mejor a sus clientes y conectar con ellos, generando en última instancia ventajas competitivas.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 800px) { .about-twocols { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* 7. INVERSORES */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 820 }}>
            <h2 className="text-[clamp(28px,2.8vw,38px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
              Inversores
            </h2>
            <p className="text-[17px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              Estamos orgullosos de contar con el respaldo de inversores líderes del sector, como PadeInvest y BeWater Funds. Su confianza en nuestro compromiso con la innovación tecnológica alimenta nuestra misión de ofrecer soluciones de vanguardia en el campo de la analítica para espacios físicos.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 64 }}>
            {INVESTORS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 64, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FORM DEMO */}
      <section className="py-[80px]" id="contact" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                {t.contactTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.contactTitleHl}</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                Descubre el poder de Flame en solo 20 minutos. Te mostraremos cómo podemos ayudarte a{" "}
                <strong style={{ color: "var(--color-navy)" }}>mejorar los resultados de tu empresa</strong>.
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
