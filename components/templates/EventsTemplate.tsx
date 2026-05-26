import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";

type EventItem = {
  type: "Evento" | "Webinar";
  date: string;
  time?: string;
  city?: string;
  title: string;
  desc: string;
  status: "upcoming" | "past";
  href?: string;
};

const EVENTS: EventItem[] = [
  { type: "Evento",   date: "12 Jun 2026", time: "09:30 CET", city: "Madrid",     title: "Flame Talks 2026 (4ª edición) — Del dato al agente de IA",                desc: "Reunión anual con directivos de centros comerciales y retail para explorar cómo la IA está cambiando la operación física.", status: "upcoming" },
  { type: "Webinar",  date: "26 Jun 2026", time: "16:00 CET",                       title: "Conversion Analytics: del transeúnte al ticket",                          desc: "Cómo conectar tráfico físico con TPV para medir la conversión real por hora, zona y categoría.",                          status: "upcoming" },
  { type: "Evento",   date: "16-19 Oct 2026", city: "Cannes",                         title: "MAPIC 2026",                                                              desc: "El mayor evento internacional de retail. Flame estará en el stand con la última versión de Traffic Insights.",            status: "upcoming" },
  { type: "Webinar",  date: "30 Oct 2026", time: "11:00 CET",                       title: "RGPD y video analytics: cumplimiento sin sacrificar dato",                  desc: "Sesión técnica: cómo medir tráfico físico cumpliendo RGPD al 100%, sin biometría y con DPO satisfecho.",                 status: "upcoming" },
  { type: "Evento",   date: "15 May 2025",                                            title: "Resumen Flame Talks 2025",                                                  desc: "Más de 120 directivos asistieron. Tres ejes: innovación, datos y experiencia. Vídeos completos disponibles.",            status: "past", href: "/es/resumen-flame-talks-2025-transformando-centros-comerciales/" },
  { type: "Evento",   date: "24 Abr 2024",                                            title: "Flame Talks 2024 — Explorando pasado, desafiando presente",                 desc: "Tercera edición. Las 5 grandes preguntas del retail físico y las respuestas con datos.",                                  status: "past", href: "/es/flame-talks-2024-explorando-pasado-desafiando-presente-creando-futuro/" },
  { type: "Webinar",  date: "Oct 2023",                                               title: "Los 10 KPIs que todo centro comercial debe medir",                          desc: "Sesión con Jonathan Solis sobre los indicadores que separan a un centro top de uno medio.",                              status: "past", href: "/es/webinar-de-jonathan-solis-los-10-kpis-que-debes-medir-en-un-centro-comercial/" },
  { type: "Evento",   date: "2023",                                                   title: "MAPIC 2023 — Flame finalista en innovación retail",                         desc: "Flame fue seleccionado entre los finalistas a la mejor solución de innovación retail.",                                  status: "past", href: "/es/flame-analytics-mapic-2025-vuelta-al-mayor-evento-internacional-retail-y-centroscomerciales/" },
];

export default function EventsTemplate({ enHref, currentLang = "es" }: { enHref: string; currentLang?: "es" | "en" }) {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const past = EVENTS.filter((e) => e.status === "past");

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: "url('/wp-content/uploads/2026/01/Traffic2-1.png')",
          backgroundPosition: "center top", backgroundSize: "cover", backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(56px, 6vw, 80px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgb(21 22 58 / 0.65) 0%, rgb(21 22 58 / 0.85) 60%, var(--color-navy) 100%)" }} />
        <div className="flame-container relative z-10 text-center">
          <span className="inline-block text-[14px] font-mono uppercase tracking-[0.18em] mb-6 pb-1.5" style={{ color: "var(--color-accent)", borderBottom: "1px solid rgb(49 177 248 / 0.4)" }}>
            Eventos y webinars
          </span>
          <h1 className="text-[clamp(40px,5.2vw,68px)] font-normal mx-auto mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)", maxWidth: "20ch" }}>
            Donde aprendemos juntos del <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>retail físico</span>
          </h1>
          <p className="mx-auto text-[clamp(17px,1.35vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch" }}>
            Flame Talks, webinars técnicos y participación en los grandes eventos internacionales del sector. Aprendizaje práctico, no marketing.
          </p>
        </div>
      </section>

      {/* PRÓXIMOS */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] font-medium px-3 py-1.5 rounded-full" style={{ background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-accent-deep)" }} />
              Próximamente
            </span>
            <h2 className="mt-4 text-[clamp(30px,3vw,42px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
              Inscríbete a los próximos <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>eventos y webinars</span>
            </h2>
          </div>
          <div className="grid gap-5 ev-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {upcoming.map((e, i) => (
              <article key={i} className="ev-card rounded-2xl p-7 flex flex-col gap-4" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-block text-[11px] font-mono uppercase tracking-[0.14em] px-2.5 py-1 rounded-full" style={{ background: e.type === "Webinar" ? "rgb(49 177 248 / 0.1)" : "rgb(21 22 58 / 0.06)", color: e.type === "Webinar" ? "var(--color-accent-deep)" : "var(--color-navy)" }}>
                    {e.type}
                  </span>
                  <span className="text-[14px] font-medium" style={{ color: "var(--color-navy)" }}>{e.date}</span>
                  {e.time && <span className="text-[13.5px]" style={{ color: "var(--color-ink-3)" }}>· {e.time}</span>}
                  {e.city && <span className="text-[13.5px]" style={{ color: "var(--color-ink-3)" }}>· {e.city}</span>}
                </div>
                <h3 className="text-[20px] font-semibold" style={{ color: "var(--color-navy)", letterSpacing: "-0.008em", lineHeight: 1.25 }}>{e.title}</h3>
                <p className="text-[15px] leading-[1.6] flex-1" style={{ color: "var(--color-ink-2)" }}>{e.desc}</p>
                <a href="/es/inscripcion-en-eventos/" className="ev-cta inline-flex items-center gap-2 text-[14.5px] font-semibold mt-2" style={{ color: "var(--color-accent-deep)" }}>
                  {e.type === "Webinar" ? "Reservar plaza" : "Inscribirme"} <Icon name="arrow" className="w-3.5 h-3.5" />
                </a>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .ev-grid { grid-template-columns: 1fr !important; } }
          .ev-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms, box-shadow 420ms; }
          .ev-card:hover { transform: translateY(-1px); border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .ev-card .ev-cta { transition: gap 420ms; }
          .ev-card:hover .ev-cta { gap: 12px; }
        `}</style>
      </section>

      {/* PAST */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2 className="mb-12 text-[clamp(28px,2.8vw,38px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
            Ediciones <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>anteriores</span>
          </h2>
          <div className="grid gap-4 past-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {past.map((e, i) => (
              <a key={i} href={e.href || "#"} className="past-card rounded-xl px-6 py-5 flex items-center gap-5" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <span className="inline-flex items-center justify-center rounded-[10px]" style={{ width: 44, height: 44, background: e.type === "Webinar" ? "rgb(49 177 248 / 0.12)" : "rgb(21 22 58 / 0.06)", color: e.type === "Webinar" ? "var(--color-accent-deep)" : "var(--color-navy)", flexShrink: 0 }}>
                  <Icon name={e.type === "Webinar" ? "webinars" : "calendar"} className="w-5 h-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 text-[12px]" style={{ color: "var(--color-ink-3)" }}>
                    <span className="font-mono uppercase tracking-[0.12em]">{e.type}</span>
                    <span>·</span>
                    <span>{e.date}</span>
                  </div>
                  <h3 className="mt-1 text-[16px] font-semibold" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.3 }}>{e.title}</h3>
                </div>
                <Icon name="arrow" className="w-4 h-4 flex-shrink-0" style={{ color: "var(--color-ink-3)" }} />
              </a>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .past-grid { grid-template-columns: 1fr !important; } }
          .past-card { transition: transform 420ms, border-color 420ms, box-shadow 420ms; text-decoration: none !important; }
          .past-card:hover { transform: translateY(-1px); border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
        `}</style>
      </section>

      {/* CTA newsletter */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 50% -10%, rgb(49 177 248 / 0.18), transparent 65%)" }} />
        <div className="flame-container relative z-10 text-center">
          <h2 className="mx-auto text-[clamp(28px,2.8vw,40px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", maxWidth: "22ch", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
            Suscríbete para recibir <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>cada nuevo evento</span> en tu email
          </h2>
          <p className="mx-auto mt-4 text-[clamp(15px,1.2vw,17px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)", maxWidth: "52ch" }}>
            Solo cuando hay algo nuevo. Cero spam, baja en un click.
          </p>
          <form className="mt-8 inline-flex gap-3 nl-form">
            <input type="email" placeholder="tu@email.com" required className="nl-in" />
            <button type="button" className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "var(--color-navy)" }}>
              Suscribirme
            </button>
          </form>
        </div>
        <style>{`
          .nl-in { min-width: 280px; min-height: 50px; padding: 12px 18px; border-radius: 8px; border: 1px solid rgb(255 255 255 / 0.16); background: rgb(255 255 255 / 0.06); color: #fff; font-family: inherit; font-size: 15px; }
          .nl-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.18); }
          .nl-in::placeholder { color: rgb(255 255 255 / 0.55); }
          @media (max-width: 600px) { .nl-form { flex-direction: column; width: 100%; max-width: 360px; margin: 32px auto 0; } .nl-in { width: 100%; } }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
