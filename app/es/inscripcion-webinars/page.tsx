import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import RegisterForm from "@/components/RegisterForm";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Inscripción a webinars · Flame Analytics",
  description: "Inscríbete a los webinars técnicos de Flame Analytics. Sesiones online en directo + grabación a quienes se registren.",
  alternates: {
    canonical: "/es/inscripcion-webinars/",
    languages: { es: "/es/inscripcion-webinars/", en: "/en/flame-webinar-registration/", "x-default": "/es/inscripcion-webinars/" },
  },
};

const currentLang = "es" as const;

export default function InscripcionWebinars() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref="/en/flame-webinar-registration/" currentLang={currentLang} />

      {/* HERO — 2-col: title + description + bullets izquierda · form derecha (mismo patrón que flame-eventos) */}
      <section
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
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgb(21 22 58 / 0.92) 0%, rgb(21 22 58 / 0.82) 40%, rgb(21 22 58 / 0.62) 100%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div className="grid items-center gap-16 hero-grid" style={{ gridTemplateColumns: "1.05fr 1fr" }}>
            {/* LEFT — Title + description + bullets */}
            <div>
              <p className="mb-5 font-medium" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-body)" }}>
                Webinar Flame
              </p>
              <h1 className="text-[clamp(34px,3.8vw,52px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
                Gestión inteligente para Centros Comerciales: <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>eficiencia operativa y optimización</span> de recursos en tiempo real.
              </h1>
              <p className="text-[clamp(16px,1.2vw,18px)] leading-[1.6] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", fontFamily: "var(--font-body)", maxWidth: "56ch" }}>
                Cómo combinar tráfico, ocupación y datos de operaciones para tomar decisiones en tiempo real que mejoran el rendimiento del centro. Sesión técnica con casos reales.
              </p>
              <ul className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
                {[
                  "Jueves 30 octubre · 16:00 CET",
                  "Streaming en directo",
                  "Grabación enviada por email",
                  "Q&A en directo con el ponente",
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

            {/* RIGHT — Form embedded in hero */}
            <div className="rounded-2xl" style={{ background: "#fff", padding: 32, boxShadow: "0 24px 60px -20px rgb(0 0 0 / 0.4)" }}>
              <h3 className="font-normal mb-1" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.2vw, 28px)", letterSpacing: "-0.018em", lineHeight: 1.15 }}>
                Reserva tu plaza
              </h3>
              <p className="text-[14px] mb-5" style={{ color: "var(--color-ink-3)" }}>
                Te enviamos el enlace de acceso por email.
              </p>
              <RegisterForm
                kind="webinars"
                topicOptions={[
                  { value: "Gestión inteligente para Centros Comerciales (30 oct 2026)", label: "Gestión inteligente CC · 30 oct 2026", date: "2026-10-30T16:00:00+01:00" },
                  { value: "Conversion Analytics: del transeúnte al ticket (26 jun 2026)", label: "Conversion Analytics · 26 jun 2026", date: "2026-06-26T16:00:00+02:00" },
                  { value: "RGPD y video analytics: cumplimiento sin sacrificar dato (30 oct 2026)", label: "RGPD y video analytics · 30 oct 2026", date: "2026-10-30T11:00:00+01:00" },
                ]}
                submitLabel="Solicitar inscripción"
                privacyHref={t.privacyHref}
                variant="hero"
              />
            </div>
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 48px; padding: 12px 16px; font-size: 14.5px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 8px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>

      {/* CONTENIDO DE EJEMPLO — placeholder hasta que JR provea copy del webinar */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              Qué vas a aprender
            </p>
            <h2 className="font-normal" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Una sesión práctica con casos <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>reales</span>
            </h2>
          </div>
          <div className="grid gap-6 ev-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { title: "Tráfico + ocupación", desc: "Cómo integrar ambas métricas en un solo dashboard para tomar decisiones operativas en tiempo real." },
              { title: "Optimización de recursos", desc: "Reducir costes de personal y energía con datos accionables, sin sacrificar experiencia del visitante." },
              { title: "Casos reales", desc: "Ejemplos concretos de centros que han implementado el enfoque y los resultados conseguidos." },
            ].map((c, i) => (
              <article key={i} className="rounded-2xl p-7" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <h3 className="font-medium mb-3" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.012em", lineHeight: 1.2 }}>
                  {c.title}
                </h3>
                <p style={{ color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.65 }}>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .ev-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
