import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import RegisterForm from "@/components/RegisterForm";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Flame Talks 2026 — 4ª edición · Flame Analytics",
  description: "Centros Comerciales y Retail: del dato al agente de IA para crecer juntos. Inscríbete a Flame Talks 2026.",
  alternates: {
    canonical: "/es/flame-eventos/",
    languages: {
    es: "/es/flame-eventos/",
    en: "/en/flame-events/",
    "x-default": "/es/flame-eventos/",
  },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/flame-eventos/",
    siteName: "Flame Analytics",
    title: "Flame Talks 2026 — 4ª edición · Flame Analytics",
    description: "Centros Comerciales y Retail: del dato al agente de IA para crecer juntos. Inscríbete a Flame Talks 2026.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/04/6-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flame Talks 2026 — 4ª edición · Flame Analytics",
    description: "Centros Comerciales y Retail: del dato al agente de IA para crecer juntos. Inscríbete a Flame Talks 2026.",
    images: ["/wp-content/uploads/2026/04/6-1.jpg"],
  },
};

const currentLang = "es" as const;

export default function FlameEventosEs() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref="/en/flame-events/" currentLang={currentLang} />

      {/* HERO — 2-col: titles + bullets izquierda · form derecha (clavado al live) */}
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
                Flame Talks 2026 — 4ª edición
              </p>
              <h1 className="text-[clamp(34px,3.8vw,52px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
                Centros Comerciales y Retail: <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>del dato al agente de IA</span> para crecer juntos.
              </h1>
              <p className="text-[clamp(16px,1.2vw,18px)] leading-[1.6] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", fontFamily: "var(--font-body)", maxWidth: "56ch" }}>
                Reserva tu plaza en la cuarta edición de Flame Talks. Una jornada con directivos del retail y centros comerciales para compartir visión, datos y estrategia.
              </p>
              <ul className="grid gap-3" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
                {[
                  "Madrid · 7 de mayo 2026",
                  "Plazas limitadas",
                  "Mesa redonda con líderes del sector",
                  "Casos reales · Q&A en directo",
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
                Te confirmamos plaza en 24h laborables.
              </p>
              <RegisterForm
                kind="events"
                topicName="Flame Talks 2026 — 4ª edición"
                topicDate="2026-05-07T09:30:00+02:00"
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

      {/* CONTENIDO DE EJEMPLO — placeholder para que JR rellene con el copy real */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-12" style={{ maxWidth: 820 }}>
            <p className="font-medium mb-4" style={{ color: "var(--color-accent-deep)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700 }}>
              El evento
            </p>
            <h2 className="font-normal" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Una jornada para entender hacia dónde va el <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>retail físico</span>
            </h2>
          </div>
          <div className="grid gap-6 ev-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { title: "Mesa redonda", desc: "Líderes de Merlin Properties, Gentalia, MR DIY y Chalito comparten su visión sobre IA, datos y operaciones físicas." },
              { title: "Casos reales", desc: "Cómo se están aplicando hoy los agentes de IA en centros comerciales y cadenas retail. Métricas y aprendizajes." },
              { title: "Networking", desc: "Espacio para conectar con responsables de operaciones, marketing y dirección general del sector." },
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
