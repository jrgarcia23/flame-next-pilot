import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import Icon from "@/components/templates/Icon";
import { UseCaseConfig } from "@/lib/page-content";
import { EMBER_VIDEO, EMBER_TRANSCRIPCION as TRANSCRIPCION } from "@/lib/ember-ai";

// Página de Ember AI (asistente para visitantes de centros comerciales), montada como vista previa sin indexar.
// Los textos salen del vídeo y de la presentación «Ember AI: cómo funciona» (12-nov-2026).
// Title, descripción, H1 y H2 según el criterio del agente SEO (12-nov-2026). Al publicarla de verdad:
// ruta /es/asistente-ia-centros-comerciales/ (EN /en/ai-assistant-for-shopping-malls/), quitar noindex y «[DRAFT]»,
// añadir canonical y hreflang, par en lib/lang-pairs.ts y sitemap, (el vídeo ya está en /videos/ember-ai/, compartido con /es/ember-ai/).
const META_DESC = "Ember AI responde a los visitantes de tu centro comercial por chat o WhatsApp: tiendas, rutas sobre el plano, ofertas y horarios. Sin descargar nada.";
export const metadata: Metadata = {
  title: "[DRAFT] Asistente de IA para centros comerciales · Ember AI",
  description: META_DESC,
  robots: { index: false, follow: false },
};

const cfg: UseCaseConfig = {
  metaTitle: "Asistente de IA para centros comerciales · Ember AI",
  metaDescription: META_DESC,
  heroTitle: "Ember AI: el asistente de IA de tu centro comercial",
  heroBgImage: "/ember-ai/hero.webp",
  heroBgPosition: "right center",
  heroSub: "Ember AI es el asistente de IA para los visitantes de tu centro comercial. Responde por el chat del centro o por WhatsApp a lo que preguntan: dónde está una tienda, cómo llegar, qué ofertas hay o a qué hora abre. Y a ti te cuenta qué buscan y qué no encuentran.",
  heroBullets: ["Sin descargar nada", "Chat del centro o WhatsApp", "Ruta sobre el plano", "Hasta seis idiomas"],
  imageBigSrc: "/ember-ai/entrada-cartel.webp",
  imageBigAlt: "Integraciones de Flame con las herramientas del centro comercial",
  bigSectionTitle: "Se integra con todo tu",
  bigSectionTitleHl: "ecosistema",
  bigSectionEyebrow: "Integraciones con CRM, Guest WiFi, mapas y wayfinding, web y app",
  bigSectionPara1: "Flame se conecta con las herramientas que tu centro ya usa: los datos entran y salen sin trabajo manual.",
  bigSectionPara2: "Así, las tiendas, las ofertas y los eventos del asistente se actualizan solos. Integración mediante API abierta, conectores y feeds de datos.",
  bigSectionBullets: ["Un solo panel", "API abierta", "Conectores", "Feeds de datos"],
  benefitsTitle: "el asistente virtual: tiendas, rutas, ofertas y horarios",
  benefitsTitleHl: "Qué responde",
  benefitsSub: "El visitante pregunta con sus palabras y el asistente le responde al momento, con el contenido de tu centro.",
  benefits: [
    { icon: "journey",  title: "Le lleva hasta la tienda desde donde está", desc: "Planta, local, ruta sobre el plano e indicaciones paso a paso." },
    { icon: "calendar", title: "Ofertas, eventos y horarios",               desc: "Ofertas vigentes con sus fechas, recomendaciones para comer, eventos y servicios del centro." },
    { icon: "users",    title: "En su idioma",                              desc: "Español, inglés, francés, portugués, catalán y gallego. Tú eliges cuáles activas." },
    { icon: "grid",     title: "Con un menú de accesos directos",           desc: "Tiendas, eventos, horario y aparcamiento a un toque, además de las preguntas sugeridas." },
  ],
  metricsTitle: "Contenido, imagen y analítica de conversaciones, desde el panel de",
  metricsTitleHl: "Flame",
  metricsSub: "Tú decides qué sabe y cómo se ve. Y cada conversación te deja información: qué preguntan los visitantes, qué buscan y no encuentran, y desde qué cartel lo hacen.",
  metrics: [
    { icon: "integration", title: "El contenido se actualiza solo",        desc: "Desde tu web, un feed de datos, una hoja de cálculo o el plano del centro. Lo que corrijas a mano se respeta." },
    { icon: "eye",         title: "Con la imagen de tu centro",            desc: "Figura, colores, saludo y versiones de temporada, como Navidad o Black Friday." },
    { icon: "layout",      title: "Un QR por cartel",                      desc: "Para el chat y para WhatsApp, ligado a un punto del plano. Y una línea de código para ponerlo en tu web." },
    { icon: "alert",       title: "Lo que buscan y no encuentran",         desc: "Demanda que el centro no cubre o contenido que falta." },
    { icon: "trending",    title: "Qué interesa más",                      desc: "Temas, tiendas y categorías más mostradas." },
    { icon: "street",      title: "Desde qué cartel",                      desc: "Qué puntos del centro generan más conversaciones." },
  ],
  testimonialsIdx: [],
  faqs: [
    { q: "¿El visitante tiene que descargar una aplicación?", a: "No. El chat del centro se abre en el navegador del móvil y, si lo prefiere, puede hablar por WhatsApp." },
    { q: "¿Desde dónde entra el visitante al asistente?", a: "Desde un cartel con código QR, desde la web del centro (un botón que se instala con una línea de código) o desde el portal del WiFi de invitados, al conectarse." },
    { q: "¿En qué idiomas atiende?", a: "En español, inglés, francés, portugués, catalán y gallego. El centro elige cuáles activa." },
    { q: "¿De dónde sale la información que da el asistente?", a: "Del contenido de tu centro: tiendas, ofertas, eventos e información práctica. Llega desde las fuentes que conectas (tu web, un feed de datos, una hoja de cálculo o el plano) y se actualiza solo. Lo que corrijas a mano en el panel se respeta aunque la fuente cambie." },
    { q: "¿Puede llevar al visitante hasta una tienda?", a: "Sí. Le indica la planta y el local y le dibuja la ruta sobre el plano desde el cartel donde escaneó, con indicaciones paso a paso. La ruta necesita el plano del centro conectado." },
    { q: "¿Qué aprende el centro de las conversaciones?", a: "Qué preguntan los visitantes, qué buscan y no encuentran, qué tiendas y categorías interesan más y desde qué cartel empiezan." },
  ],
  ctaStripBold: "El asistente de tu centro comercial.",
  ctaStripLight: "Pide una demo con el contenido de tu centro.",
  relatedGuidesTitle: "Más sobre centros comerciales y WiFi de invitados",
  relatedGuides: [
    { href: "/es/solucion-para-centros-comerciales/", tag: "Sector", title: "Analítica para centros comerciales", desc: "Big data e IA para optimizar el tenant mix y la experiencia del visitante." },
    { href: "/es/marketing-wifi-para-invitados/", tag: "Producto", title: "Portal cautivo del WiFi de invitados", desc: "Convierte tu WiFi para invitados en un canal de marketing." },
    { href: "/es/recorrido-del-cliente/", tag: "Producto", title: "Recorrido del visitante", desc: "Recorridos y tiempo de permanencia dentro del centro." },
  ],
};


const VIDEO_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Ember AI: cómo funciona el asistente de IA para centros comerciales",
  description: META_DESC,
  thumbnailUrl: "https://www.flameanalytics.com" + EMBER_VIDEO.poster,
  contentUrl: "https://www.flameanalytics.com" + EMBER_VIDEO.src,
  uploadDate: "2026-11-12",
  duration: "PT2M3S",
  inLanguage: "es",
  transcript: TRANSCRIPCION.join(" "),
};

// Cuatro fases del cierre de la presentación.
const PASOS = [
  { n: "01", title: "Conecta",     desc: "Tus fuentes: web, feed, hoja de cálculo o plano." },
  { n: "02", title: "Personaliza", desc: "Nombre, saludo, colores y figura." },
  { n: "03", title: "Publica",     desc: "Carteles con QR para el chat y WhatsApp, y código en tu web." },
  { n: "04", title: "Mide",        desc: "Preguntas, búsquedas sin respuesta y satisfacción." },
];

// Textos literales del diseño «Se integra con todo tu ecosistema».
const ECO: Array<{ icon: string; title: string; desc: string; chips: string[] }> = [
  { icon: "users",       title: "CRM y fidelización",   desc: "Cada visita enriquece la ficha de tu cliente.",            chips: ["HubSpot", "Salesforce", "Placewise", "…"] },
  { icon: "wifi",        title: "Guest WiFi",           desc: "Une el registro WiFi con lo que buscan tus visitantes.",   chips: ["Portal cautivo", "Registro"] },
  { icon: "connect",     title: "Mensajería",           desc: "Atiende a tus visitantes en el canal que ya usan.",        chips: ["WhatsApp"] },
  { icon: "journey",     title: "Mapas y wayfinding",   desc: "Rutas sobre el plano y posicionamiento indoor.",           chips: ["Situm", "Mappedin", "Pointr"] },
  { icon: "mall",        title: "Web y app del centro", desc: "Tiendas, ofertas y eventos en todos tus canales.",         chips: ["Web", "App"] },
  { icon: "integration", title: "Datos y sistemas",     desc: "API abierta: tus datos entran y salen, sin silos.",        chips: ["API", "Bases de datos"] },
];

const ENTRADAS = [
  { img: "/ember-ai/entrada-cartel.webp", alt: "Cartel con el código QR del asistente pegado en el escaparate de una tienda", title: "Cartel con QR",     desc: "Lo escanea con la cámara del móvil, en cualquier punto del centro." },
  { img: "/ember-ai/entrada-web.webp",    alt: "Web del centro con el botón del asistente y el chat abierto",                 title: "Web del centro",    desc: "Un botón en la página, con una línea de código." },
  { img: "/ember-ai/entrada-wifi.webp",   alt: "Portal del WiFi de invitados con el botón del asistente",                     title: "WiFi de invitados", desc: "Desde el portal cautivo, al conectarse.", href: "/es/marketing-wifi-para-invitados/", hrefLabel: "Portal cautivo del WiFi de invitados" },
];

const CANALES = [
  { title: "Sin descargar nada",                  desc: "Se abre en el navegador del móvil o en su WhatsApp." },
  { title: "Pregunta como habla",                 desc: "Escribe lo que necesita o toca una de las preguntas sugeridas." },
  { title: "Respuesta con la ficha de la tienda", desc: "Planta, local, horario de hoy y acceso directo a cómo llegar." },
];

const H2: React.CSSProperties = { letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" };
const H2_CLASS = "text-[clamp(32px,3.4vw,48px)] font-normal";
const HL: React.CSSProperties = { color: "var(--color-accent)", fontWeight: 500 };

function EcoGrid() {
  return (
    <div className="eco-grid">
      {ECO.map((e) => (
        <article key={e.title} className="rounded-2xl" style={{ background: "#fff", border: "1px solid var(--color-rule)", padding: 22 }}>
          <div className="inline-flex items-center justify-center rounded-[12px] mb-4" style={{ width: 44, height: 44, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
            <Icon name={e.icon} className="w-5 h-5" />
          </div>
          <h3 className="text-[18px] font-semibold mb-2" style={{ color: "var(--color-navy)", lineHeight: 1.25 }}>{e.title}</h3>
          <p className="text-[15px] leading-[1.55] mb-4" style={{ color: "var(--color-ink-2)" }}>{e.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {e.chips.map((c) => (
              <span key={c} className="text-[13px] font-semibold" style={{ padding: "4px 11px", borderRadius: 999, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>{c}</span>
            ))}
          </div>
        </article>
      ))}
      <style>{`
        .eco-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        @media (max-width: 560px) { .eco-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}

function AfterHero() {
  return (
    <>
      {/* VÍDEO «Ember AI: cómo funciona» (2 min, con locución) */}
      <section style={{ background: "var(--color-navy)", padding: "clamp(48px, 5vw, 72px) 0 clamp(56px, 6vw, 88px)" }}>
        <div className="flame-container">
          <div className="mx-auto" style={{ maxWidth: 1080 }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-accent)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Cómo funciona</p>
            <h2 className={`${H2_CLASS} mb-8`} style={{ ...H2, color: "#fff" }}>
              Ember AI, en <span style={HL}>dos minutos</span>
            </h2>
            <video
              src={EMBER_VIDEO.src}
              poster={EMBER_VIDEO.poster}
              controls
              playsInline
              preload="metadata"
              aria-label="Vídeo: cómo funciona Ember AI, el asistente para visitantes de centros comerciales"
              style={{ width: "100%", height: "auto", aspectRatio: "16 / 9", display: "block", borderRadius: 18, boxShadow: "0 40px 90px -40px rgb(0 0 0 / 0.7)", border: "1px solid rgb(255 255 255 / 0.12)", background: "#0f1030" }}
            />
            <details className="ember-tr" style={{ marginTop: 22 }}>
              <summary className="text-[15px] font-semibold" style={{ color: "rgb(255 255 255 / 0.85)", cursor: "pointer" }}>Transcripción del vídeo</summary>
              <div style={{ marginTop: 14, maxWidth: "78ch" }}>
                {TRANSCRIPCION.map((t, i) => (
                  <p key={i} className="text-[15.5px] leading-[1.7]" style={{ color: "rgb(255 255 255 / 0.72)", marginBottom: 10 }}>{t}</p>
                ))}
              </div>
            </details>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_LD) }} />
          </div>
        </div>
      </section>

      {/* TRES ENTRADAS: cartel, web y WiFi */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="text-center mb-14 mx-auto" style={{ maxWidth: 760 }}>
            <h2 className={H2_CLASS} style={{ ...H2, color: "var(--color-navy)" }}>
              <span style={HL}>Tres formas de entrar:</span> código QR, web del centro y WiFi de invitados
            </h2>
            <p className="mt-5 text-[clamp(17px,1.25vw,19px)] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
              El visitante entra desde donde esté: desde un cartel, desde la web del centro o al conectarse al WiFi. Sin descargar nada.
            </p>
          </div>
          <div className="ent-grid">
            {ENTRADAS.map((e) => (
              <article key={e.title} className="rounded-2xl overflow-hidden" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)" }}>
                <img src={e.img} alt={e.alt} width={1036} height={578} loading="lazy" style={{ width: "100%", height: "auto", display: "block" }} />
                <div style={{ padding: "22px 26px 26px" }}>
                  <h3 className="text-[21px] font-semibold mb-2" style={{ color: "var(--color-navy)", lineHeight: 1.25 }}>{e.title}</h3>
                  <p className="text-[16px] leading-[1.6]" style={{ color: "var(--color-ink-2)" }}>{e.desc}</p>
                  {"href" in e && e.href && (
                    <a href={e.href} className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold" style={{ color: "var(--color-accent-deep)", marginTop: 12 }}>
                      {e.hrefLabel} <Icon name="arrow" className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 44 }}>
            <p className="text-[14px] font-bold" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Un mismo asistente, en el canal que elija</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 18 }}>
              {["Chat del centro", "WhatsApp"].map((c) => (
                <span key={c} className="text-[17px] font-semibold" style={{ padding: "11px 26px", borderRadius: 999, background: "rgb(49 177 248 / 0.14)", color: "var(--color-navy)" }}>{c}</span>
              ))}
            </div>
            <p className="text-[13.5px]" style={{ color: "var(--color-ink-3)", marginTop: 26 }}>La web y el portal del WiFi son imágenes ilustrativas; el botón y el chat son los del producto.</p>
          </div>
        </div>
        <style>{`
          .ent-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
          @media (max-width: 900px) { .ent-grid { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; } }
        `}</style>
      </section>

      {/* DOS CANALES: chat del centro y WhatsApp */}
      <section className="py-24" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="can-grid">
            <div>
              <h2 className={`${H2_CLASS} mb-5`} style={{ ...H2, color: "var(--color-navy)" }}>
                Chat del centro o chatbot de <span style={HL}>WhatsApp</span>, sin descargar ninguna app
              </h2>
              <p className="text-[clamp(17px,1.25vw,19px)] leading-relaxed mb-9" style={{ color: "var(--color-ink-2)" }}>
                Elige el canal y pregunta con sus palabras.
              </p>
              <ul className="grid gap-6">
                {CANALES.map((c) => (
                  <li key={c.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span className="inline-flex items-center justify-center rounded-full" style={{ width: 28, height: 28, marginTop: 2, background: "rgb(49 177 248 / 0.15)", color: "var(--color-accent-deep)", flexShrink: 0 }}>
                      <Icon name="check" className="w-4 h-4" />
                    </span>
                    <span>
                      <strong className="text-[18px] font-semibold" style={{ display: "block", color: "var(--color-navy)", lineHeight: 1.3 }}>{c.title}</strong>
                      <span className="text-[16px] leading-[1.6]" style={{ display: "block", color: "var(--color-ink-2)", marginTop: 4 }}>{c.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[13.5px]" style={{ color: "var(--color-ink-3)", marginTop: 34 }}>Pantallas del producto, con datos de ejemplo. La de WhatsApp es una recreación.</p>
            </div>
            <div className="can-phones">
              {[
                { img: "/ember-ai/movil-chat.webp", alt: "Móvil con el chat del centro: respuesta y ficha de la tienda", label: "Chat del centro", w: 640, h: 1306 },
                { img: "/ember-ai/movil-whatsapp.webp", alt: "Móvil con la misma conversación por WhatsApp", label: "WhatsApp", w: 640, h: 1296 },
              ].map((p) => (
                <figure key={p.label} style={{ margin: 0, textAlign: "center" }}>
                  <img src={p.img} alt={p.alt} width={p.w} height={p.h} loading="lazy" style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 30px 40px rgb(21 22 58 / 0.22))" }} />
                  <figcaption className="text-[15px] font-semibold" style={{ color: "var(--color-accent-deep)", marginTop: 16 }}>{p.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          .can-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: clamp(36px, 5vw, 80px); align-items: center; }
          .can-phones { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(16px, 2.4vw, 36px); max-width: 600px; margin: 0 auto; align-items: end; }
          @media (max-width: 900px) { .can-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>
    </>
  );
}

function PuestaEnMarcha() {
  return (
    <section className="py-24" style={{ background: "var(--color-navy)", color: "#fff" }}>
      <div className="flame-container">
        <h2 className={`${H2_CLASS} text-center mx-auto mb-14`} style={{ ...H2, color: "#fff", maxWidth: 820 }}>
          Cómo <span style={HL}>poner en marcha</span> el asistente en tu centro comercial
        </h2>
        <ol className="pasos-grid" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {PASOS.map((p) => (
            <li key={p.n} className="rounded-2xl" style={{ background: "var(--color-navy-soft)", border: "1px solid rgb(255 255 255 / 0.1)", padding: "26px 26px 30px" }}>
              <span className="text-[28px] font-medium" style={{ display: "block", color: "var(--color-accent)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{p.n}</span>
              <h3 className="text-[21px] font-semibold" style={{ color: "#fff", margin: "16px 0 8px", lineHeight: 1.25 }}>{p.title}</h3>
              <p className="text-[16px] leading-[1.6]" style={{ color: "rgb(255 255 255 / 0.78)" }}>{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
      <style>{`
        .pasos-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
        @media (max-width: 1000px) { .pasos-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 560px) { .pasos-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}

export default function EmberAiPreview() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/" bigSectionVisualOverride={<EcoGrid />} afterHero={<AfterHero />} afterMetrics={<PuestaEnMarcha />} />;
}
