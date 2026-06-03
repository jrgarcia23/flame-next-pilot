import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { LOGOS, UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Quiénes somos · Flame Analytics",
  description: "Flame Analytics: plataforma de análisis avanzado para espacios físicos. Equipo, misión, reconocimientos, prensa e inversores.",
  alternates: {
    canonical: "/es/sobre-nosotros/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

const currentLang = "es" as const;
const enHref = "/en/about-us/";

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

export default function SobreNosotrosEs() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* 01 · HERO + LOGOS MARQUEE — arquitectura completa páginas de soluciones */}
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
              Quiénes somos
            </p>
            <h1 className="text-[clamp(40px,5.2vw,64px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
              Transformemos juntos los espacios físicos
            </h1>
            <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.55] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch", fontFamily: "var(--font-body)" }}>
              Creada en 2016, Flame se ha convertido en la principal plataforma mundial de Análisis de la Localización, que permite a miles de usuarios optimizar el valor de los visitantes y mejorar el rendimiento de los locales.
            </p>
            <ul className="grid gap-3 mb-9" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
              {["Fundada en 2016", "Presente en 23 países", "180+ clientes B2B", "RGPD desde el diseño"].map((b) => (
                <li key={b} className="inline-flex items-center gap-2.5 text-[16px]" style={{ color: "rgb(255 255 255 / 0.92)" }}>
                  <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.2)", color: "var(--color-accent)", flexShrink: 0 }}>
                    <Icon name="check" className="w-4 h-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              Contacta con nosotros
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

      {/* 02 · ¿QUÉ ES FLAME? */}
      <section className="py-[96px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto" style={{ maxWidth: 880 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Qué es Flame
            </p>
            <h2 className="font-normal mb-6" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.018em", lineHeight: 1.12 }}>
              Una plataforma para entender el mundo físico
            </h2>
            <p className="text-[clamp(17px,1.25vw,19px)] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>
              Flame es una plataforma de análisis avanzado para espacios físicos que integra a la perfección el vídeo con otras fuentes de datos, lo que permite tomar decisiones fundamentadas basadas en información relevante.
            </p>
          </div>
        </div>
      </section>

      {/* 03 · EQUIPO + MISIÓN (2 cols, bg blanco) */}
      <section className="py-[96px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid items-start gap-20 about-twocols" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                El equipo
              </p>
              <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Conoce al equipo
              </h2>
              <p className="text-[17px] leading-[1.7] mb-7" style={{ color: "var(--color-ink-2)" }}>
                Compuesto por expertos en big data, retail, consultoría, marketing e ingeniería, el equipo de Flame es un grupo joven y dinámico que lleva más de una década dedicado a ofrecer a los clientes las soluciones tecnológicas más innovadoras del mercado. ¿Quieres conocernos?
              </p>
              <a
                href="/es/sobre-nosotros/conoce-al-equipo/"
                className="inline-flex items-center gap-1.5 font-medium"
                style={{ color: "var(--color-navy)", fontSize: 15, textDecoration: "none", borderBottom: "1px solid var(--color-navy)", paddingBottom: 4 }}
              >
                Conoce al equipo
                <Icon name="arrow" className="w-3.5 h-3.5" />
              </a>
            </div>
            <div>
              <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
                Nuestra misión
              </p>
              <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Puente entre offline y online
              </h2>
              <p className="text-[17px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
                Nuestra misión es servir de puente entre el mundo offline y el online, ofreciendo a nuestros clientes herramientas digitales para el mundo físico. Estas herramientas les permiten conocer mejor a sus clientes y conectar con ellos, generando ventajas competitivas duraderas.
              </p>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .about-twocols { grid-template-columns: 1fr !important; gap: 56px !important; } }
        `}</style>
      </section>

      {/* 04 · INVERSORES (centered, bg paper, 2 logos color + caption) */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Respaldo
            </p>
            <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
              Inversores que confían en Flame
            </h2>
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              Estamos orgullosos de contar con el respaldo de inversores líderes del sector, como PadeInvest y BeWater Funds. Su confianza en nuestro compromiso con la innovación tecnológica alimenta nuestra misión de ofrecer soluciones de vanguardia.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 80 }}>
            {INVESTORS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} style={{ height: 56, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
          <p className="text-center mt-8" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-3)", fontWeight: 700 }}>
            Serie A · 2023
          </p>
        </div>
      </section>

      {/* 05 · RECONOCIDO POR (centered, bg blanco, logos grayscale → hover color) */}
      <section className="py-[80px]" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 880 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Reconocimiento
            </p>
            <h2 className="font-normal" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 32px)", letterSpacing: "-0.014em", lineHeight: 1.15 }}>
              Reconocidos por los analistas del sector
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

      {/* 06 · PRENSA (centered, bg paper, párrafo + logos grayscale → hover color) */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-10" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              En los medios
            </p>
            <h2 className="font-normal mb-5" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 32px)", letterSpacing: "-0.014em", lineHeight: 1.15 }}>
              Cobertura en prensa
            </h2>
            <p className="text-[16px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
              Prestigiosas publicaciones como El País, El Mundo, ABC, La Razón o El Confidencial han dedicado sus páginas a Flame. Hemos aparecido también en programas de radio y televisión.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center logos-row" style={{ gap: "32px 48px" }}>
            {PRESS.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} className="logo-bw" style={{ height: 36, width: "auto", display: "block", objectFit: "contain" }} />
            ))}
          </div>
        </div>
      </section>

      {/* 07 · FORMULARIO DEMO — mismo patrón que UseCaseTemplate / resto de páginas */}
      <section className="py-24" style={{ background: "#fff" }}>
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
