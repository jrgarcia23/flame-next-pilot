import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { UI } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Partners · Flame Analytics",
  description: "Únete al programa de partners de Flame: hardware agnóstico, SaaS escalable, asesoramiento técnico y desarrollos a medida para llevar la analítica de espacios físicos a tus clientes.",
  alternates: {
    canonical: "/es/partners/",
    languages: { es: "/es/partners/", en: "/en/partners/", "x-default": "/es/partners/" },
  },
};

const currentLang = "es" as const;
const enHref = "/en/partners/";

type Pillar = { icon: string; title: string; body: string };

const PILLARS: Pillar[] = [
  {
    icon: "grid",
    title: "Hardware agnóstico para plataformas cloud",
    body: "Flame es compatible con los principales fabricantes de cámaras y sensores del mercado. Eliges la infraestructura que mejor encaja para implantar, renovar o ampliar sin amarrarte a un único proveedor. Cisco Meraki, Axis, Hikvision, Dahua, Hanwha, Bosch o equipos propios: si tienes red IP, Flame trabaja con ella.",
  },
  {
    icon: "trending",
    title: "Solución SaaS robusta y escalable",
    body: "Plataforma cloud que escala desde un único punto de venta hasta redes de cientos de tiendas, centros comerciales o espacios públicos. Sin servidores en tienda, sin mantenimiento físico: actualizaciones continuas, dashboards en tiempo real y arquitectura preparada para crecer con tus clientes.",
  },
  {
    icon: "users",
    title: "Asesoramiento especializado",
    body: "Acompañamiento técnico desde la fase consultiva. Analizamos las necesidades del cliente, definimos la arquitectura de captura, calibramos las métricas relevantes y formamos a tu equipo. La diferencia entre un sensor más y una decisión de negocio.",
  },
  {
    icon: "integration",
    title: "Desarrollos e integraciones a medida",
    body: "API documentada, webhooks y conectores para CRM, BI, ERP, TPV, marketing automation o sistemas verticales. Desarrollamos integraciones específicas cuando el caso lo justifica, para que Flame conviva con el stack que ya tienes en cada cliente.",
  },
];

export default function PartnersEs() {
  const t = UI[currentLang];

  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          backgroundColor: "#15163A",
          backgroundImage: "url('/wp-content/uploads/2026/01/Partners2-scaled-1.png')",
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
            background: "linear-gradient(90deg, rgb(21 22 58 / 0.78) 0%, rgb(21 22 58 / 0.55) 55%, rgb(21 22 58 / 0.35) 100%)",
          }}
        />
        <div className="flame-container relative z-10">
          <div style={{ maxWidth: 760 }}>
            <p
              className="mb-4 font-medium"
              style={{
                color: "var(--color-accent)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px,2vw,30px)",
                letterSpacing: "-0.012em",
                lineHeight: 1.2,
              }}
            >
              Programa de Partners
            </p>
            <h1
              className="mb-7 font-normal"
              style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,4.2vw,60px)",
                letterSpacing: "-0.022em",
                lineHeight: 1.08,
              }}
            >
              Lleva la analítica de espacios físicos{" "}
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>a tus clientes</span>
            </h1>
            <p
              className="text-[clamp(17px,1.25vw,19px)] font-normal mb-9"
              style={{
                color: "rgb(255 255 255 / 0.85)",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.005em",
                lineHeight: 1.6,
              }}
            >
              Súmate a la red de integradores, consultores y partners tecnológicos que despliegan Flame en retail, centros comerciales, hospitality y espacios públicos. Hardware agnóstico, SaaS escalable y soporte técnico real para que cierres proyectos con margen y diferenciación.
            </p>
            <a
              href="#contact"
              className="cta-btn cta-btn--lg"
              style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}
            >
              Quiero ser partner
              <Icon name="arrow" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* PILLARS — 4 cards (clon de hypersensor benefits) */}
      <section className="py-[80px]" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="text-center mx-auto mb-14" style={{ maxWidth: 820 }}>
            <h2
              className="text-[clamp(32px,3.4vw,48px)] font-normal mb-6"
              style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}
            >
              Por qué partner con{" "}
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>Flame</span>
            </h2>
            <p className="text-[clamp(17px,1.25vw,19px)] leading-relaxed mx-auto" style={{ color: "var(--color-ink-2)", maxWidth: "64ch" }}>
              Una plataforma técnica seria detrás, un canal comercial sin guerras de margen y un equipo que ayuda a aterrizar cada proyecto.
            </p>
          </div>
          <div className="grid gap-6 p-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {PILLARS.map((p, i) => (
              <article
                key={i}
                className="benefit-card rounded-2xl p-8"
                style={{ background: "#fff", border: "1px solid var(--color-rule)" }}
              >
                <div
                  className="benefit-icon inline-flex items-center justify-center rounded-[12px] mb-5"
                  style={{ width: 52, height: 52, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}
                >
                  <Icon name={p.icon} className="w-6 h-6" />
                </div>
                <h3
                  className="text-[22px] font-medium mb-4"
                  style={{ color: "var(--color-navy)", letterSpacing: "-0.012em", lineHeight: 1.2, fontFamily: "var(--font-display)" }}
                >
                  {p.title}
                </h3>
                <p className="text-[16px] leading-[1.65]" style={{ color: "var(--color-ink-2)" }}>
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .p-grid { grid-template-columns: 1fr !important; } }
          .benefit-card { transition: transform 420ms ease, background 420ms ease, border-color 420ms ease, box-shadow 420ms ease; }
          .benefit-card:hover { transform: translateY(-1px); background: var(--color-paper-soft) !important; border-color: var(--color-rule-strong) !important; box-shadow: 0 6px 18px -10px rgb(15 23 42 / 0.08); }
          .benefit-card .benefit-icon { transition: background 420ms ease, color 420ms ease; }
          .benefit-card:hover .benefit-icon { background: rgb(49 177 248 / 0.18) !important; color: var(--color-accent) !important; }
        `}</style>
      </section>

      {/* FORM — campos espejo del live (WPCF7 partner application) */}
      <section className="py-[80px]" id="contact" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2
                className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5"
                style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}
              >
                Únete al{" "}
                <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>canal Flame</span>
              </h2>
              <p className="text-[17px] leading-relaxed mb-6" style={{ color: "var(--color-ink-2)" }}>
                Cuéntanos sobre tu empresa, mercado y capacidad de despliegue.{" "}
                <strong style={{ color: "var(--color-navy)" }}>Te respondemos en 24 h laborables</strong>{" "}
                con una primera lectura del encaje y siguientes pasos.
              </p>
              <p className="text-[15px] font-semibold mb-2" style={{ color: "var(--color-navy)" }}>
                Sin compromiso, sin discurso comercial.
              </p>
            </div>
            <form className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <input className="cf-in" type="text" name="your-name" placeholder="Nombre" required />
              <input className="cf-in" type="email" name="your-email" placeholder="Email" required />
              <input className="cf-in" type="tel" name="your-phone" placeholder="Teléfono" required />
              <input className="cf-in" type="text" name="your-company" placeholder="Empresa" required />
              <input className="cf-in" type="text" name="your-web" placeholder="Web" required />
              <input className="cf-in" type="text" name="your-country" placeholder="País" required />
              <input className="cf-in" type="text" name="your-city" placeholder="Ciudad, región" required />
              <input className="cf-in" type="text" name="your-type" placeholder="Tipo de empresa" required />
              <select className="cf-in" name="your-sector" defaultValue="" required>
                <option value="" disabled>Sector</option>
                <option>Centros comerciales</option>
                <option>Espacios públicos</option>
                <option>Retail</option>
                <option>Hospitality</option>
                <option>Otros</option>
              </select>
              <input className="cf-in" type="text" name="your-size" placeholder="Tamaño de la empresa" required />
              <input className="cf-in" type="text" name="your-annual" placeholder="Facturación anual" required />
              <input className="cf-in" type="text" name="your-installation" placeholder="¿Tienes capacidad de instalación?" required />
              <input className="cf-in col-span-2" type="text" name="your-contacts" placeholder="¿Tienes contactos que demanden el servicio de localización?" required />
              <textarea className="cf-in col-span-2" name="your-message" placeholder="Mensaje" rows={5} required style={{ minHeight: 140, resize: "vertical" }} />
              <label
                className="col-span-2 flex items-start gap-2 text-[13.5px] mt-2"
                style={{ color: "var(--color-ink-3)" }}
              >
                <input type="checkbox" name="consent" className="mt-1" style={{ accentColor: "var(--color-accent)" }} required />
                <span>
                  {t.consent}{" "}
                  <a href={t.privacyHref} style={{ color: "var(--color-accent-deep)", borderBottom: "1px solid currentColor" }}>
                    {t.privacy}
                  </a>
                  .
                </span>
              </label>
              <button
                type="submit"
                className="col-span-2 mt-3 cta-btn cta-btn--md"
                style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700, width: "fit-content" }}
              >
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
