import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";

export const metadata: Metadata = {
  title: "Flame · Piloto Next · Navegación",
  description: "Punto único de entrada para navegar el piloto de Flame en Next.js. Páginas rediseñadas, clones literales y pendientes.",
};

type LinkItem = { label: string; href: string; status: "design" | "literal" | "pending"; note?: string };
type Section = { title: string; subtitle: string; items: LinkItem[] };

const SECTIONS: Section[] = [
  {
    title: "Home",
    subtitle: "Página principal del site",
    items: [
      { label: "Home (clon literal del live)",                              href: "/es/home-draft/",                                                  status: "literal", note: "Idéntica a flameanalytics.com/es/" },
    ],
  },
  {
    title: "Productos",
    subtitle: "ProductTemplate · 11 bloques (hero, beneficios, plataforma, funcionalidades, pilares Characteristics-1, sectores, testimonios, FAQ, form)",
    items: [
      { label: "Traffic",          href: "/es/analitica-trafico-draft/", status: "design" },
      { label: "Customer Journey", href: "/es/customer-journey-draft/",  status: "design" },
      { label: "Connect",          href: "/es/connect-draft/",           status: "design" },
      { label: "Hypersensor",      href: "/es/hypersensor/",             status: "literal", note: "Sin tocar, igual que live" },
    ],
  },
  {
    title: "Soluciones / Casos de uso",
    subtitle: "UseCaseTemplate · 10 bloques (hero+logos, beneficios, sección imagen+texto, métricas, CTA strip, sectores, testimonios, FAQ, form)",
    items: [
      { label: "People Counting",      href: "/es/cuenta-personas-draft/",                  status: "design" },
      { label: "Conversion Analytics", href: "/es/conversion-analytics-draft/",             status: "design" },
      { label: "Customer Behavior",    href: "/es/customer-behavior-draft/",                status: "design" },
      { label: "Occupancy Management", href: "/es/gestion-ocupacion-draft/",                status: "design" },
      { label: "Queue Analytics",      href: "/es/analitica-de-colas-draft/",               status: "design" },
      { label: "Restroom Management",  href: "/es/gestion-de-aseos-draft/",                 status: "design" },
      { label: "Guest Wifi Marketing", href: "/es/marketing-wifi-para-invitados-draft/",    status: "design" },
      { label: "Corporate Wifi Access",href: "/es/acceso-wifi-corporativo-draft/",          status: "design" },
    ],
  },
  {
    title: "Sectores",
    subtitle: "UseCaseTemplate adaptada · Contenido específico por industria",
    items: [
      { label: "Retail",              href: "/es/solucion-para-el-sector-retail-draft/",    status: "design" },
      { label: "Centros comerciales", href: "/es/solucion-para-centros-comerciales-draft/", status: "design" },
      { label: "Hoteles",             href: "/es/hoteles-draft/",                           status: "design" },
      { label: "Espacios públicos",   href: "/es/espacios-publicos-draft/",                 status: "design" },
    ],
  },
  {
    title: "Corporativas",
    subtitle: "Contacto, eventos, agradecimientos, partners",
    items: [
      { label: "Contacto",            href: "/es/contacta-draft/",       status: "design", note: "ContactTemplate" },
      { label: "Eventos y Webinars",  href: "/es/flame-eventos-draft/",  status: "design", note: "EventsTemplate" },
      { label: "Gracias (genérica)",  href: "/es/gracias-draft/",        status: "design", note: "ThanksTemplate" },
      { label: "Partners",            href: "/es/partners/",             status: "literal", note: "Sin tocar, igual que live" },
      { label: "Sobre nosotros",      href: "/es/sobre-nosotros/",       status: "pending", note: "Pendiente rediseño" },
      { label: "Conoce al equipo",    href: "/es/sobre-nosotros/conoce-al-equipo/", status: "pending", note: "Pendiente rediseño" },
      { label: "Comunidad (hub)",     href: "/es/comunidad/",            status: "pending", note: "Pendiente rediseño" },
    ],
  },
  {
    title: "Legales",
    subtitle: "LegalTemplate · Layout sobrio para textos largos",
    items: [
      { label: "Política de privacidad",                href: "/es/politica-de-privacidad-draft/",                 status: "design" },
      { label: "Política de cookies",                   href: "/es/politica-de-cookies-draft/",                    status: "design" },
      { label: "Condiciones de uso",                    href: "/es/condiciones-de-uso-draft/",                     status: "design" },
      { label: "Política de seguridad de la información", href: "/es/politica-de-seguridad-de-la-informacion-draft/", status: "design" },
      { label: "Información detallada (tratamiento de datos)", href: "/es/informacion-detallada-draft/",            status: "design" },
    ],
  },
];

function StatusBadge({ status, note }: { status: "design" | "literal" | "pending"; note?: string }) {
  const map = {
    design:  { label: "Rediseñada",     bg: "rgb(34 197 94 / 0.12)",  color: "#16a34a" },
    literal: { label: "Clon literal",   bg: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" },
    pending: { label: "Pendiente",      bg: "rgb(245 158 11 / 0.12)", color: "#d97706" },
  };
  const m = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.14em] font-medium" style={{ color: m.color }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: m.color }} />
      {m.label}
      {note && <span className="ml-2 text-[11px] normal-case tracking-normal font-normal opacity-75" style={{ color: "var(--color-ink-3)" }}>· {note}</span>}
    </span>
  );
}

export default function PilotoIndex() {
  const totals = SECTIONS.reduce((acc, s) => {
    s.items.forEach((it) => { acc[it.status]++; });
    return acc;
  }, { design: 0, literal: 0, pending: 0 });

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref="/en/" />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(48px, 5vw, 64px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 50% -10%, rgb(49 177 248 / 0.18), transparent 65%)" }} />
        <div className="flame-container relative z-10 text-center">
          <span className="inline-block text-[14px] font-mono uppercase tracking-[0.18em] mb-6 pb-1.5" style={{ color: "var(--color-accent)", borderBottom: "1px solid rgb(49 177 248 / 0.4)" }}>
            Piloto Next · Mayo 2026
          </span>
          <h1 className="text-[clamp(40px,5.2vw,68px)] font-normal mx-auto mb-5" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)", maxWidth: "20ch" }}>
            Mapa de navegación del <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>piloto</span>
          </h1>
          <p className="mx-auto text-[clamp(17px,1.35vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "62ch" }}>
            Todas las páginas del site Next, organizadas. Click en cualquier card para abrir la página.
          </p>
          <div className="inline-flex flex-wrap items-center gap-6 mt-9 px-7 py-5 rounded-2xl" style={{ background: "rgb(255 255 255 / 0.04)", border: "1px solid rgb(255 255 255 / 0.08)" }}>
            <div className="flex items-center gap-2 text-[14px]" style={{ color: "rgb(255 255 255 / 0.85)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <strong>{totals.design}</strong> rediseñadas
            </div>
            <div className="flex items-center gap-2 text-[14px]" style={{ color: "rgb(255 255 255 / 0.85)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-accent)" }} />
              <strong>{totals.literal}</strong> clon literal
            </div>
            <div className="flex items-center gap-2 text-[14px]" style={{ color: "rgb(255 255 255 / 0.85)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
              <strong>{totals.pending}</strong> pendientes
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-20" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container flex flex-col gap-14">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <div className="mb-7">
                <h2 className="text-[clamp(26px,2.4vw,32px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.015em", fontFamily: "var(--font-display)", lineHeight: 1.15 }}>
                  {s.title}
                </h2>
                <p className="mt-2 text-[14.5px]" style={{ color: "var(--color-ink-3)" }}>
                  {s.subtitle}
                </p>
              </div>
              <div className="grid gap-4 sec-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                {s.items.map((it) => (
                  <a
                    key={it.href}
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="page-card rounded-2xl p-6 flex flex-col gap-3"
                    style={{ background: "#fff", border: "1px solid var(--color-rule)" }}
                  >
                    <StatusBadge status={it.status} note={it.note} />
                    <h3 className="text-[17px] font-semibold flex items-center justify-between gap-2" style={{ color: "var(--color-navy)", letterSpacing: "-0.005em", lineHeight: 1.3 }}>
                      <span>{it.label}</span>
                      <Icon name="arrow" className="w-4 h-4 flex-shrink-0 page-arrow" style={{ color: "var(--color-accent-deep)" }} />
                    </h3>
                    <code className="text-[12.5px] font-mono break-all" style={{ color: "var(--color-ink-3)" }}>
                      {it.href}
                    </code>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 1000px) { .sec-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 640px)  { .sec-grid { grid-template-columns: 1fr !important; } }
          .page-card { transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1), border-color 420ms, box-shadow 420ms; text-decoration: none !important; }
          .page-card:hover { transform: translateY(-1px); border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .page-card .page-arrow { transition: transform 420ms; }
          .page-card:hover .page-arrow { transform: translateX(3px); }
        `}</style>
      </section>

      {/* CTA volver al home Flame */}
      <section className="py-16" style={{ background: "var(--color-navy)", color: "white", textAlign: "center" }}>
        <div className="flame-container">
          <p className="text-[clamp(18px,1.4vw,22px)] font-medium" style={{ color: "#fff", fontFamily: "var(--font-body)" }}>
            ¿Quieres ver cómo se verá la home rediseñada?{" "}
            <span style={{ color: "rgb(255 255 255 / 0.65)" }}>El clon literal está disponible como referencia.</span>
          </p>
          <div className="mt-7 inline-flex flex-wrap gap-3 justify-center">
            <a href="/es/home-draft/" className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "var(--color-navy)" }}>
              Ver home (clon)
              <Icon name="arrow" className="w-4 h-4" />
            </a>
            <a href="/es/cuenta-personas-draft/" className="cta-btn cta-btn--lg" style={{ background: "transparent", color: "#fff", border: "1px solid rgb(255 255 255 / 0.2)" }}>
              Ver caso de uso ejemplo
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
