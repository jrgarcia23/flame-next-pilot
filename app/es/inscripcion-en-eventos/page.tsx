import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import RegisterForm from "@/components/RegisterForm";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Inscripción a eventos · Flame Analytics",
  description: "Inscríbete a los Flame Talks, MAPIC y demás eventos presenciales de Flame Analytics. Plazas limitadas.",
  alternates: {
    canonical: "/es/inscripcion-en-eventos/",
    languages: {
    es: "/es/inscripcion-en-eventos/",
    "x-default": "/es/inscripcion-en-eventos/",
  },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/inscripcion-en-eventos/",
    siteName: "Flame Analytics",
    title: "Inscripción a eventos · Flame Analytics",
    description: "Inscríbete a los Flame Talks, MAPIC y demás eventos presenciales de Flame Analytics. Plazas limitadas.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inscripción a eventos · Flame Analytics",
    description: "Inscríbete a los Flame Talks, MAPIC y demás eventos presenciales de Flame Analytics. Plazas limitadas.",
  },
};

const currentLang = "es" as const;

export default function InscripcionEventos() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref="/en/event-registration/" currentLang={currentLang} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: "url('/wp-content/uploads/2026/01/Traffic2-1.png')",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(40px, 5vw, 64px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgb(21 22 58 / 0.65) 0%, rgb(21 22 58 / 0.85) 60%, var(--color-navy) 100%)" }} />
        <div className="flame-container relative z-10 text-center">
          <span className="inline-block text-[14px] font-mono uppercase tracking-[0.18em] mb-6 pb-1.5" style={{ color: "var(--color-accent)", borderBottom: "1px solid rgb(49 177 248 / 0.4)" }}>
            Eventos Flame
          </span>
          <h1 className="text-[clamp(36px,4.6vw,58px)] font-normal mx-auto mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)", maxWidth: "24ch" }}>
            Inscríbete a los próximos <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>eventos Flame</span>
          </h1>
          <p className="mx-auto text-[clamp(17px,1.3vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch" }}>
            Flame Talks, MAPIC y demás encuentros presenciales con líderes del retail y centros comerciales. Plazas limitadas, sin coste para clientes y partners.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(28px,3vw,40px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
                Reserva tu <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>plaza</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                Rellena el formulario y te confirmamos plaza en <strong style={{ color: "var(--color-navy)" }}>24h laborables</strong>. Te enviaremos los detalles logísticos (hora, dirección, agenda) por email.
              </p>
              <ul className="flex flex-col gap-3 mt-6" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  "Confirmación inmediata por email",
                  "Recordatorio 24h y 2h antes del evento",
                  "Cancelación libre hasta 48h antes",
                ].map((b) => (
                  <li key={b} className="inline-flex items-center gap-2.5 text-[15px]" style={{ color: "var(--color-ink-2)" }}>
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 22, height: 22, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                      <Icon name="check" className="w-3.5 h-3.5" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <RegisterForm
              kind="events"
              topicOptions={[
                { value: "Flame Talks 2026 — 4ª edición (Madrid, 7 may 2026)", label: "Flame Talks 2026 · 7 may", date: "2026-05-07T09:30:00+02:00" },
                { value: "MAPIC 2026 (Cannes, 16-19 oct 2026)", label: "MAPIC 2026 · 16-19 oct", date: "2026-10-16T09:00:00+02:00" },
                { value: "Próximas ediciones — mantenme informado", label: "Próximas ediciones — mantenme informado" },
              ]}
              submitLabel="Reservar plaza"
              privacyHref={t.privacyHref}
              variant="hero"
            />
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
