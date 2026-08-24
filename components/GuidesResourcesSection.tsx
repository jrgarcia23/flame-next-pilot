/**
 * GuidesResourcesSection — bloque "Guías y recursos" para la parte baja
 * de la home (entre el formulario de demo y el footer).
 *
 * Objetivo SEO: la home no enlaza hoy a ninguna guía pilar (0/32 links
 * internos). Este bloque reparte autoridad de la home hacia las guías
 * que ya rankean o deben rankear (KPIs centro comercial = kw nº1).
 *
 * De momento SOLO se usa en /preview/home-guias/ (noindex). Integración
 * en la home real: renderizarlo en HomeRestyleTemplate justo antes de
 * <SiteFooter/> cuando JR dé el OK.
 */

import Icon from "@/components/templates/Icon";

type Guide = {
  tag: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
};

const GUIDES_ES: Guide[] = [
  {
    tag: "KPIs",
    icon: "trending",
    title: "Los 10 KPIs que todo centro comercial debe medir",
    desc: "La guía de referencia para dirección de centros: qué medir, por qué y con qué datos.",
    href: "/es/los-10-kpis-que-todo-centro-comercial-debe-medir/",
  },
  {
    tag: "Guía",
    icon: "count",
    title: "Cuenta personas en retail: sistemas y tecnologías",
    desc: "Cómo funciona cada tecnología de conteo y cuál encaja mejor en tu tienda.",
    href: "/es/cuenta-personas-retail-guia-completa/",
  },
  {
    tag: "Comparativa",
    icon: "compare",
    title: "Mejor sistema de conteo de personas 2026: comparativa",
    desc: "Los principales sistemas del mercado comparados: precisión, precios y criterios de elección.",
    href: "/es/mejor-sistema-conteo-personas-2026-comparativa/",
  },
  {
    tag: "Marketing",
    icon: "users",
    title: "Marketing de fidelización: 10 consejos prácticos",
    desc: "Estrategias probadas para convertir visitantes en clientes que vuelven.",
    href: "/es/marketing-de-fidelizacion-10-consejos-para-fidelizar-clientes/",
  },
  {
    tag: "Tendencias",
    icon: "mall",
    title: "Centros comerciales del futuro: estudios y tendencias",
    desc: "Datos y estudios sobre hacia dónde evoluciona el centro comercial.",
    href: "/es/centros-comerciales-del-futuro-estudios-y-tendencias/",
  },
];

const GUIDES_EN: Guide[] = [
  {
    tag: "Guide",
    icon: "count",
    title: "People counting systems: complete buyer's guide 2026",
    desc: "Every counting technology explained, with clear criteria to choose the right one.",
    href: "/en/people-counting-systems-complete-guide/",
  },
  {
    tag: "Comparison",
    icon: "compare",
    title: "Best people counting software for retail",
    desc: "The leading platforms compared: features, accuracy, pricing and fit.",
    href: "/en/best-people-counting-software-retail/",
  },
  {
    tag: "GDPR",
    icon: "privacy",
    title: "GDPR and video analytics: compliance guide",
    desc: "How to deploy video analytics in shopping malls while staying fully compliant.",
    href: "/en/gdpr-video-analytics-compliance-guide-shopping-malls/",
  },
  {
    tag: "AI",
    icon: "eye",
    title: "AI in retail analytics: physical store intelligence",
    desc: "How artificial intelligence turns store video into everyday decisions.",
    href: "/en/ai-retail-analytics-physical-stores/",
  },
];

const COPY = {
  es: {
    title: "Guías y",
    titleHl: "recursos",
    sub: "Las guías de referencia de Flame para medir, comparar y decidir con datos en espacios físicos.",
    cta: "Leer la guía",
    guides: GUIDES_ES,
    cols: 3,
  },
  en: {
    title: "Guides &",
    titleHl: "resources",
    sub: "Flame's reference guides to measure, compare and decide with data across physical spaces.",
    cta: "Read the guide",
    guides: GUIDES_EN,
    cols: 2,
  },
} as const;

export default function GuidesResourcesSection({ lang }: { lang: "es" | "en" }) {
  const c = COPY[lang];
  return (
    <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
      <div className="flame-container">
        <div className="text-center mx-auto mb-12" style={{ maxWidth: 820 }}>
          <h2
            className="text-[clamp(28px,3vw,40px)] font-medium mb-4"
            style={{ color: "var(--color-navy)", letterSpacing: "-0.014em", lineHeight: 1.15, fontFamily: "var(--font-display)" }}
          >
            {c.title} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{c.titleHl}</span>
          </h2>
          <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.55] mx-auto" style={{ color: "var(--color-ink-2)" }}>
            {c.sub}
          </p>
        </div>
        <div
          className={`grid gap-5 guides-grid guides-grid-${c.cols}`}
          style={{
            gridTemplateColumns: `repeat(${c.cols}, 1fr)`,
            ...(c.cols === 2 ? { maxWidth: 900, marginInline: "auto" } : {}),
          }}
        >
          {c.guides.map((g) => (
            <a key={g.href} href={g.href} className="guide-card rounded-2xl p-6 flex flex-col" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center rounded-[12px]" style={{ width: 44, height: 44, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                  <Icon name={g.icon} className="w-5.5 h-5.5" />
                </span>
                <span className="text-[12px] font-bold uppercase" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.14em" }}>
                  {g.tag}
                </span>
              </div>
              <h3 className="text-[19px] font-normal mb-2.5" style={{ color: "var(--color-navy)", letterSpacing: "-0.012em", lineHeight: 1.25, fontFamily: "var(--font-display)" }}>
                {g.title}
              </h3>
              <p className="text-[14.5px] leading-[1.6] flex-1 mb-5" style={{ color: "var(--color-ink-2)" }}>
                {g.desc}
              </p>
              <span className="guide-cta inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: "var(--color-accent-deep)" }}>
                {c.cta} <Icon name="arrow" className="w-3.5 h-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) { .guides-grid-3 { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .guides-grid { grid-template-columns: 1fr !important; max-width: 460px !important; margin-inline: auto !important; } }
        .guide-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1); text-decoration: none; }
        .guide-card:hover { transform: translateY(-2px); border-color: var(--color-rule-strong) !important; box-shadow: 0 14px 32px -18px rgb(15 23 42 / 0.14); }
        .guide-card .guide-cta { transition: gap 420ms cubic-bezier(0.22, 1, 0.36, 1); }
        .guide-card:hover .guide-cta { gap: 10px; }
      `}</style>
    </section>
  );
}
