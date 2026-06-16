import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import AnimatedPeopleCountingChart from "@/components/AnimatedPeopleCountingChart";
import DemoFormInline from "@/components/DemoFormInline";
import { LOGOS, TESTIMONIALS_ALL, UI } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

const HERO_BG = "/wp-content/uploads/2026/01/people_counting-1-1-1-scaled-1.png";
const SECTORS_IMG = "/wp-content/uploads/2026/01/Shopping_malls.png";

export const metadata: Metadata = {
  title: "Conteo de personas · Flame Analytics",
  description:
    "Mide con precisión el flujo de visitantes en cualquier espacio físico — retail, centros comerciales o espacios públicos. Sin biometría y compatible con tu CCTV.",
  alternates: {
    canonical: "/es/conteo-personas-flame-analytics/",
    languages: {
      es: "/es/conteo-personas-flame-analytics/",
      en: "/en/people-counting/",
      "x-default": "/es/conteo-personas-flame-analytics/",
    },
  },
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/conteo-personas-flame-analytics/",
    siteName: "Flame Analytics",
    title: "Conteo de personas · Flame Analytics",
    description:
      "Mide con precisión el flujo de visitantes en cualquier espacio físico. Sin biometría.",
    locale: "es_ES",
    images: [{ url: HERO_BG }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conteo de personas · Flame Analytics",
    description: "Mide con precisión el flujo de visitantes en cualquier espacio físico.",
    images: [HERO_BG],
  },
};

type Benefit = { icon: string; title: string; desc: string };
type Metric = { icon: string; title: string; desc: string };
type Department = { icon: string; title: string; desc: string; bulletsLabel: string; bullets: string[] };
type Sector = { icon: string; title: string; desc: string };

const BENEFITS: Benefit[] = [
  { icon: "eye",      title: "Visibilidad real de tu afluencia",     desc: "Sabes cuántas personas entran, cuándo y cómo evolucionan las tendencias. Dato real, no estimaciones de muestra." },
  { icon: "users",    title: "Plantilla y operaciones por dato",      desc: "Ajusta turnos y dotación al flujo real. Reduce horas mal asignadas y mejora la atención en hora punta." },
  { icon: "grid",     title: "Compara ubicaciones",                   desc: "Identifica las que rinden por encima de la media y replica sus prácticas. Detecta las que están por debajo de su potencial." },
  { icon: "trending", title: "Conexión con TPV y BI",                 desc: "Cruza visitantes con ventas y operaciones para descubrir oportunidades reales de conversión y ROI." },
];

const METRICS: Metric[] = [
  { icon: "clock",    title: "Afluencia total y por franja",  desc: "Visitas reales día a día, hora a hora. Detecta picos y valles del tráfico real." },
  { icon: "convert",  title: "Conversión visita → venta",     desc: "Cruza tráfico con tu TPV. Sabes qué % de visitantes acaba comprando." },
  { icon: "calendar", title: "Patrones semanales y picos",    desc: "Identifica los momentos críticos. Anticipa con personal y stock." },
  { icon: "compare",  title: "Benchmark entre ubicaciones",   desc: "Compara red completa con criterio homogéneo. Identifica top y replica." },
  { icon: "street",   title: "Tráfico exterior y captación",  desc: "Cuántas personas pasan y cuántas entran. Mide la capacidad del escaparate." },
  { icon: "ratio",    title: "Staff-to-traffic ratio",        desc: "Personal real necesario en cada franja. Reduce hasta un 18 % horas mal asignadas." },
];

const SECTORS: Sector[] = [
  { icon: "retail", title: "Retail",              desc: "Mide afluencia, conversión visita-venta y staff-to-traffic en cada tienda. Sin cambiar tu TPV." },
  { icon: "mall",   title: "Centros comerciales", desc: "Visión completa del flujo y rendimiento del centro. Decisiones operativas y de marketing con datos reales." },
  { icon: "venue",  title: "Espacios públicos",   desc: "Aforo, recorridos y picos de afluencia en tiempo real para museos, estadios, recintos feriales." },
];

const DEPARTMENTS: Department[] = [
  {
    icon: "trending",
    title: "¿Eres de Marketing?",
    desc: "Cuantifica el impacto de campañas en flujo real y conecta el dato del visitante a tu CRM para automatizar acciones según comportamiento.",
    bulletsLabel: "KPIs clave",
    bullets: [
      "Tráfico exterior y tasa de captación",
      "Patrones semanales y picos horarios",
      "Customer journey y dwell time",
      "Triggers de campañas en tiempo real",
    ],
  },
  {
    icon: "compare",
    title: "¿Eres del equipo Comercial?",
    desc: "Decide plantilla y horarios con dato real, no con intuición. Compara conversión por ubicación y prioriza donde el ratio no encaja con el potencial.",
    bulletsLabel: "KPIs clave",
    bullets: [
      "Staff-to-traffic por turno",
      "Conversión visita-venta por ubicación",
      "Ranking y benchmarks",
      "Picos horarios y dotación óptima",
    ],
  },
  {
    icon: "grid",
    title: "¿Eres del equipo de TI?",
    desc: "Aprovecha las cámaras CCTV ya instaladas. Sin hardware nuevo, sin cableado, sin proyecto de despliegue. Implementación remota en toda la red.",
    bulletsLabel: "Lo que valoras",
    bullets: [
      "Compatible con CCTV existente",
      "Despliegue remoto sin visita técnica",
      "Sin cambios en cableado ni infra",
      "Integración con POS / CRM / CDP",
    ],
  },
];

const WHY_FLAME = [
  { icon: "eye",      title: "Precisión real del 99 %",  desc: "Algoritmo de IA propio entrenado durante 12 años con +500 instalaciones." },
  { icon: "users",    title: "Sin biometría",             desc: "Cumplimiento GDPR de serie. No almacenamos rasgos faciales ni identidades." },
  { icon: "grid",     title: "Compatible con tu CCTV",    desc: "Aprovecha las cámaras que ya tienes instaladas. Sin proyecto de hardware." },
  { icon: "trending", title: "Operativo en 7 días",       desc: "Despliegue remoto en toda la red. Sin obra ni visita técnica." },
];

const HERO_BULLETS = ["Precisión 99 %", "+500 instalaciones medidas", "Sin biometría", "Compatible con tu CCTV"];

export default function ConteoPersonasFlameAnalytics() {
  const currentLang: "es" | "en" = "es";
  const t = UI[currentLang];
  const faqs = getFaqs("people-counting", "es");
  const testimonials = [6, 3, 2].map((i) => TESTIMONIALS_ALL[i]);

  return (
    <>
      <link rel="preload" as="image" href={HERO_BG} fetchPriority="high" />
      <CtaStyles />
      <SiteHeader enHref="/en/people-counting/" currentLang={currentLang} />

      {/* HERO + LOGOS */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          backgroundImage: `url('${HERO_BG}')`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(20px, 2.4vw, 32px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, var(--color-navy) 0%, rgb(21 22 58 / 0.92) 38%, rgb(21 22 58 / 0.5) 65%, rgb(21 22 58 / 0.2) 100%)" }} />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 680 }}>
            <h1 className="text-[clamp(40px,5.2vw,64px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
              Conteo de personas
            </h1>
            <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.55] mb-8" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch", fontFamily: "var(--font-body)" }}>
              Flame mide con precisión el flujo de visitantes en cualquier espacio físico y lo cruza con tu operación y ventas. Diseñado para retail, centros comerciales y espacios públicos que quieren entender qué pasa en cada ubicación, no en la media.
            </p>
            <ul className="grid gap-3 mb-9 hero-bullets" style={{ gridTemplateColumns: "repeat(2, minmax(0, max-content))" }}>
              {HERO_BULLETS.map((b) => (
                <li key={b} className="inline-flex items-center gap-2.5 text-[16px]" style={{ color: "rgb(255 255 255 / 0.92)" }}>
                  <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.2)", color: "var(--color-accent)", flexShrink: 0 }}>
                    <Icon name="check" className="w-4 h-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={t.contactHref} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              {t.requestDemo}
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
          @media (max-width: 700px) { .logo-img { height: 65px; } .hero-bullets { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* BENEFICIOS */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mb-14 mx-auto" style={{ maxWidth: 760 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Beneficios</span> del conteo de personas
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
              Cada métrica convierte tu intuición en decisión: planifica plantilla, mide conversión y compara ubicaciones con dato real.
            </p>
          </div>
          <div className="grid gap-6 b-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {BENEFITS.map((b, i) => (
              <article key={i} className="benefit-card rounded-2xl p-7" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="benefit-icon inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                  <Icon name={b.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.25 }}>{b.title}</h3>
                <p className="text-[15.5px] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1100px) { .b-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px) { .b-grid { grid-template-columns: 1fr !important; } }
          .benefit-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), background 420ms, border-color 420ms, box-shadow 420ms; }
          .benefit-card:hover { transform: translateY(-1px); background: var(--color-paper-soft) !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
        `}</style>
      </section>

      {/* MÁS ALLÁ DEL CONTEO + MÉTRICAS INTEGRADAS */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-14" style={{ maxWidth: "44ch" }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              Más allá del conteo: inteligencia sobre tu <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>afluencia</span>
            </h2>
          </div>
          <div className="grid gap-12 items-center mtc-grid" style={{ gridTemplateColumns: "1.55fr 1fr" }}>
            <div><AnimatedPeopleCountingChart /></div>
            <div>
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-7" style={{ color: "var(--color-ink-2)" }}>
                Flame People Counting convierte los conteos brutos en insight accionable. Explora tendencias, compara ubicaciones y monitoriza el flujo de visitantes a través de dashboards intuitivos que dan vida a tus espacios.
              </p>
              <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.65] mb-7" style={{ color: "var(--color-ink-2)" }}>
                Todo en tiempo real, con precisión y privacidad integradas. Sin obra, sin biometría y compatible con tu stack actual de TPV, ERP y BI.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid rgb(21 22 58 / 0.08)" }}>
            <h3 className="text-[clamp(24px,2.4vw,32px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.018em", lineHeight: 1.15, fontFamily: "var(--font-display)", marginBottom: 10 }}>
              Lo que vas a medir, <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>en concreto</span>
            </h3>
            <p style={{ fontSize: 16, color: "var(--color-ink-2)", lineHeight: 1.6, marginBottom: 32, maxWidth: 620 }}>
              Seis indicadores que convierten tu intuición en decisión operativa.
            </p>
            <div className="grid metrics-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 1, background: "var(--color-rule)", border: "1px solid var(--color-rule)", borderRadius: 18, overflow: "hidden" }}>
              {METRICS.map((m, i) => (
                <div key={i} style={{ background: "#fff", padding: "28px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 36, height: 36, borderRadius: 8, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={m.icon} className="w-[18px] h-[18px]" />
                    </span>
                    <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--color-navy)", lineHeight: 1.2, margin: 0 }}>{m.title}</h4>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--color-ink-2)", lineHeight: 1.55, margin: 0 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .mtc-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 720px) { .metrics-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* CTA STRIP NAVY */}
      <section className="py-[56px]" style={{ background: "var(--color-navy)" }}>
        <div className="flame-container">
          <div className="flex items-center gap-8 cta-strip-row">
            <p className="text-[clamp(19px,1.55vw,24px)] font-medium flex-1" style={{ color: "#fff", fontFamily: "var(--font-body)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
              Cada espacio tiene su flujo. Tu data debe demostrarlo.<br />
              <span style={{ color: "rgb(255 255 255 / 0.7)", fontWeight: 400 }}>Demo personalizada en 20 minutos.</span>
            </p>
            <a href={t.contactHref} className="cta-btn cta-btn--xl flex-shrink-0" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              {t.requestDemo}
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
        <style>{`
          .cta-btn--xl { font-size: 17px; padding: 16px 32px; }
          @media (max-width: 700px) { .cta-strip-row { flex-direction: column; align-items: flex-start; gap: 20px; } .cta-strip-row > p { flex: none; } }
        `}</style>
      </section>

      {/* UNA SOLUCIÓN PARA TU SECTOR — imagen + 3 mini cards */}
      <section data-flame-sectores style={{ background: "#fff", padding: "96px 0", overflow: "hidden", position: "relative" }}>
        <div className="flame-container" style={{ display: "grid", gridTemplateColumns: "0.78fr 1.22fr", gap: 56, alignItems: "stretch" }}>
          <div>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)", marginBottom: 18 }}>
              Una <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>solución</span> para tu sector
            </h2>
            <p style={{ fontSize: 17, color: "var(--color-ink-2)", lineHeight: 1.6, marginBottom: 36, maxWidth: 520 }}>
              Si eres retail, centro comercial o espacio público, tenemos una solución pensada para ti.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 540 }}>
              {SECTORS.map((s) => (
                <div key={s.title} style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: "18px 20px", background: "var(--color-paper)", border: "1px solid var(--color-rule)", borderRadius: 14, transition: "border-color .25s, background .25s" }}>
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={s.icon} className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "var(--color-navy)", lineHeight: 1.25, margin: "0 0 4px", letterSpacing: "-0.008em" }}>{s.title}</h3>
                    <p style={{ fontSize: 14.5, color: "var(--color-ink-2)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ position: "relative", width: "100%", borderRadius: 8, overflow: "hidden" }}>
              <img src={SECTORS_IMG} alt="Conteo de personas en cualquier espacio físico" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgb(21 22 58 / 0.12) 0%, rgb(12 111 213 / 0.06) 50%, transparent 100%)", mixBlendMode: "multiply", borderRadius: 8, pointerEvents: "none" }} />
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) {
            section[data-flame-sectores] > .flame-container { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* DEPARTAMENTOS */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="mb-14 mx-auto text-center" style={{ maxWidth: 820 }}>
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              Pensado para <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>cualquier área</span>
            </h2>
            <p className="mt-4 text-[clamp(16px,1.15vw,18px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
              Marketing, comercial o TI: Flame entrega los KPIs que cada equipo necesita para decidir mejor. En la misma plataforma.
            </p>
          </div>
          <div className="grid gap-5 dept-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", alignItems: "stretch" }}>
            {DEPARTMENTS.map((d, i) => (
              <article key={i} className="rounded-2xl p-7 flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                  <span style={{ width: 48, height: 48, borderRadius: 12, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={d.icon} className="w-6 h-6" />
                  </span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22, color: "var(--color-navy)", lineHeight: 1.2, margin: 0, letterSpacing: "-0.008em" }}>{d.title}</h3>
                </div>
                <p style={{ fontSize: 14.5, color: "var(--color-ink-2)", lineHeight: 1.6, margin: "0 0 18px" }}>{d.desc}</p>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-accent-deep)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{d.bulletsLabel}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 14.5, color: "var(--color-navy)", lineHeight: 1.5 }}>
                  {d.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--color-accent-deep)", flexShrink: 0 }}>→</span> {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { .dept-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* POR QUÉ ELEGIR FLAME */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.08), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.05), transparent 72%)" }} />
        <div className="flame-container relative z-10">
          <div className="mb-14 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              Por qué elegir <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Flame</span>
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.72)" }}>
              12 años desarrollando analítica para espacios físicos. La plataforma que cientos de marcas usan a diario para decidir con dato real.
            </p>
          </div>
          <div className="grid gap-5 why-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {WHY_FLAME.map((w, i) => (
              <article key={i} className="why-card rounded-2xl p-7 flex flex-col" style={{ background: "rgb(255 255 255 / 0.04)", border: "1px solid rgb(255 255 255 / 0.08)" }}>
                <div className="inline-flex items-center justify-center rounded-[12px] mb-5" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent)" }}>
                  <Icon name={w.icon} className="w-6 h-6" />
                </div>
                <h3 className="text-[19px] font-semibold mb-3" style={{ color: "#fff", letterSpacing: "-0.008em" }}>{w.title}</h3>
                <p className="text-[15px] leading-[1.6]" style={{ color: "rgb(255 255 255 / 0.68)" }}>{w.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .why-grid { grid-template-columns: 1fr !important; } }
          .why-card { transition: transform 420ms, background 420ms, border-color 420ms; }
          .why-card:hover { transform: translateY(-1px); background: rgb(255 255 255 / 0.07) !important; border-color: rgb(255 255 255 / 0.16) !important; }
        `}</style>
      </section>

      {/* TESTIMONIOS marquee */}
      <section className="py-24 overflow-hidden" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(30px,3.2vw,44px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}>
            {t.testimonialsTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.testimonialsTitleHl}</span>
          </h2>
        </div>
        <div className="testimonials-marquee">
          <div className="testimonials-track">
            {[...testimonials, ...testimonials].map((tt, i) => (
              <article key={i} className="testimonial-card rounded-2xl p-8 flex flex-col gap-6" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                <div className="flex items-center" style={{ height: 64 }}>
                  <img src={tt.logo} alt={tt.author} style={{ maxHeight: 56, maxWidth: 180, width: "auto", objectFit: "contain" }} />
                </div>
                <p className="text-[16px] leading-[1.65] flex-1" style={{ color: "var(--color-ink-2)" }}>{tt.quote}</p>
                <div className="pt-5" style={{ borderTop: "1px solid var(--color-rule)" }}>
                  <strong className="block text-[16px]" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em" }}>{tt.author}</strong>
                  <span className="block text-[13.5px] mt-1" style={{ color: "var(--color-ink-3)" }}>{tt.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .testimonials-marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
          .testimonials-track { display: flex; gap: 28px; width: max-content; align-items: stretch; animation: marquee-x 60s linear infinite; }
          .testimonials-track:hover { animation-play-state: paused; }
          .testimonial-card { width: 460px; flex: 0 0 460px; }
          @media (max-width: 700px) { .testimonial-card { width: 320px; flex: 0 0 320px; } .testimonials-track { gap: 18px; } }
        `}</style>
      </section>

      {/* FAQ JSON-LD */}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q.replace(/<[^>]+>/g, "").trim(),
                acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "").trim() },
              })),
            }),
          }}
        />
      )}

      {/* FAQ */}
      <section className="py-24" style={{ background: "var(--color-navy)", color: "white" }}>
        <div className="flame-container">
          <h2 className="text-center mx-auto mb-14 text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
            {t.faqTitle} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{t.faqTitleHl}</span>
          </h2>
          <div className="grid gap-4 faq-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", alignItems: "start" }}>
            {faqs.map((f, i) => (
              <details key={i} className="rounded-2xl p-6 group transition" style={{ background: "#fff" }}>
                <summary className="flex items-start justify-between gap-4 cursor-pointer text-[17px] font-medium list-none" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.35 }}>
                  <span>{f.q}</span>
                  <span className="inline-flex items-center justify-center rounded-full flex-shrink-0 transition" style={{ width: 30, height: 30, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                    <Icon name="plus" className="w-3.5 h-3.5" />
                  </span>
                </summary>
                <div className="mt-5 text-[15.5px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }} dangerouslySetInnerHTML={{ __html: f.a }} />
              </details>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .faq-grid { grid-template-columns: 1fr !important; } }
          details[open] summary span:last-child { background: var(--color-accent) !important; color: var(--color-navy) !important; transform: rotate(45deg); }
        `}</style>
      </section>

      {/* FORMULARIO DEMO */}
      <section id="contact" className="py-24" style={{ background: "#fff", scrollMarginTop: 80 }}>
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
            <DemoFormInline lang={currentLang} variant="demo" gridClass="uc-form-grid" />
          </div>
        </div>
        <style>{`
          .cf-in { min-height: 52px; padding: 14px 18px; font-size: 16px; color: var(--color-navy); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 10px; font-family: inherit; width: 100%; }
          .cf-in:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 4px rgb(49 177 248 / 0.12); }
          @media (max-width: 800px) { .contact-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 560px) {
            .uc-form-grid { grid-template-columns: 1fr !important; }
            .uc-form-grid .col-span-2 { grid-column: span 1 / span 1 !important; }
          }
        `}</style>
      </section>

      <SiteFooter currentLang={currentLang} />
    </>
  );
}
