import type { Metadata } from "next";
import Icon from "@/components/templates/Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import DemoFormInline from "@/components/DemoFormInline";
import { EMBER_VIDEO, EMBER_TRANSCRIPCION } from "@/lib/ember-ai";

// Página para enviar por correo a clientes: introducción corta y el vídeo «Ember AI: cómo funciona».
// Fuera del índice, del menú y del sitemap: es una página para compartir, no la página de producto
// (esa irá en /es/asistente-ia-centros-comerciales/ cuando se publique; hoy en /preview/ember-ai/).
const TITLE = "Ember AI: así funciona el asistente de tu centro comercial";
const DESC = "Vídeo de dos minutos: cómo Ember AI responde a los visitantes de tu centro comercial por chat o WhatsApp y qué te cuenta de lo que buscan.";
const URL = "https://www.flameanalytics.com/es/ember-ai/";

export const metadata: Metadata = {
  title: "Ember AI: así funciona · Flame Analytics",
  description: DESC,
  robots: { index: false, follow: true },
  alternates: { canonical: "/es/ember-ai/" },
  openGraph: {
    type: "video.other",
    url: URL,
    siteName: "Flame Analytics",
    title: TITLE,
    description: DESC,
    locale: "es_ES",
    images: [{ url: EMBER_VIDEO.poster, width: 1920, height: 1080, alt: "Ember AI, el asistente de tu centro comercial" }],
    videos: [{ url: EMBER_VIDEO.src, width: 1920, height: 1080, type: "video/mp4" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: [EMBER_VIDEO.poster] },
};

const VIDEO_LD = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Ember AI: cómo funciona el asistente de IA para centros comerciales",
  description: DESC,
  thumbnailUrl: "https://www.flameanalytics.com" + EMBER_VIDEO.poster,
  contentUrl: "https://www.flameanalytics.com" + EMBER_VIDEO.src,
  uploadDate: EMBER_VIDEO.uploadDate,
  duration: EMBER_VIDEO.duration,
  inLanguage: "es",
  transcript: EMBER_TRANSCRIPCION.join(" "),
};

const PUNTOS = ["Sin descargar nada", "Chat del centro o WhatsApp", "Ruta sobre el plano", "Hasta seis idiomas"];

const H_STYLE: React.CSSProperties = { letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" };
const HL: React.CSSProperties = { color: "var(--color-accent)", fontWeight: 500 };

export default function EmberAiVideoPage() {
  return (
    <>
      <link rel="preload" as="image" href={EMBER_VIDEO.poster} fetchPriority="high" />
      <CtaStyles />
      <SiteHeader enHref="/en/" currentLang="es" />

      {/* INTRODUCCIÓN + VÍDEO */}
      <section style={{ background: "var(--color-navy)", color: "#fff", padding: "clamp(64px, 7vw, 104px) 0 clamp(64px, 7vw, 104px)" }}>
        <div className="flame-container">
          <div className="mx-auto" style={{ maxWidth: 1080 }}>
            <p className="text-[14px] font-bold mb-4" style={{ color: "var(--color-accent)", letterSpacing: "0.18em", textTransform: "uppercase" }}>Vídeo · 2 minutos</p>
            <h1 className="text-[clamp(38px,4.8vw,60px)] font-normal mb-6" style={{ ...H_STYLE, color: "#fff", maxWidth: "20ch" }}>
              Ember AI: así funciona el asistente de tu <span style={HL}>centro comercial</span>
            </h1>
            <div className="ember-intro" style={{ maxWidth: "70ch" }}>
              <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.6] mb-4" style={{ color: "rgb(255 255 255 / 0.82)" }}>
                Ember AI es el asistente de IA para los visitantes de tu centro comercial. Entran desde un cartel con código QR, desde la web del centro o al conectarse al WiFi de invitados, y preguntan por el chat del centro o por WhatsApp: dónde está una tienda, cómo llegar, qué ofertas hay o a qué hora abre.
              </p>
              <p className="text-[clamp(17px,1.35vw,19px)] leading-[1.6]" style={{ color: "rgb(255 255 255 / 0.82)" }}>
                Tú lo gestionas desde el panel de Flame y cada conversación te cuenta qué buscan tus visitantes y qué no encuentran. En este vídeo te lo enseñamos en dos minutos.
              </p>
            </div>
            <ul className="ember-puntos" style={{ listStyle: "none", padding: 0, margin: "28px 0 40px" }}>
              {PUNTOS.map((b) => (
                <li key={b} className="inline-flex items-center gap-2.5 text-[16px]" style={{ color: "rgb(255 255 255 / 0.92)" }}>
                  <span className="inline-flex items-center justify-center rounded-full" style={{ width: 24, height: 24, background: "rgb(49 177 248 / 0.2)", color: "var(--color-accent)", flexShrink: 0 }}>
                    <Icon name="check" className="w-4 h-4" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <video
              src={EMBER_VIDEO.src}
              poster={EMBER_VIDEO.poster}
              controls
              playsInline
              preload="metadata"
              aria-label="Vídeo: cómo funciona Ember AI, el asistente para visitantes de centros comerciales"
              style={{ width: "100%", height: "auto", aspectRatio: "16 / 9", display: "block", borderRadius: 18, boxShadow: "0 40px 90px -40px rgb(0 0 0 / 0.7)", border: "1px solid rgb(255 255 255 / 0.12)", background: "#0f1030" }}
            />
            <details style={{ marginTop: 22 }}>
              <summary className="text-[15px] font-semibold" style={{ color: "rgb(255 255 255 / 0.85)", cursor: "pointer" }}>Transcripción del vídeo</summary>
              <div style={{ marginTop: 14, maxWidth: "78ch" }}>
                {EMBER_TRANSCRIPCION.map((t, i) => (
                  <p key={i} className="text-[15.5px] leading-[1.7]" style={{ color: "rgb(255 255 255 / 0.72)", marginBottom: 10 }}>{t}</p>
                ))}
              </div>
            </details>
            <div style={{ marginTop: 40 }}>
              <a href="#contact" className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
                Solicita una demo
                <Icon name="arrow" className="w-4 h-4" />
              </a>
            </div>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_LD) }} />
          </div>
        </div>
        <style>{`
          .ember-puntos { display: grid; grid-template-columns: repeat(4, max-content); gap: 12px 26px; }
          @media (max-width: 900px) { .ember-puntos { grid-template-columns: repeat(2, max-content); } }
          @media (max-width: 520px) { .ember-puntos { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* FORMULARIO DEMO */}
      <section id="contact" className="py-24" style={{ background: "#fff", scrollMarginTop: 80 }}>
        <div className="flame-container">
          <div className="grid gap-14 items-start contact-grid" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
            <div>
              <h2 className="text-[clamp(34px,3.6vw,52px)] font-normal mb-5" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}>
                ¿Lo vemos con el contenido de <span style={HL}>tu centro</span>?
              </h2>
              <p className="text-[17px] leading-relaxed" style={{ color: "var(--color-ink-2)" }}>
                Déjanos tus datos y te enseñamos Ember AI con las tiendas, ofertas y eventos de tu centro comercial.
              </p>
            </div>
            <DemoFormInline lang="es" variant="demo" gridClass="uc-form-grid" />
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

      <SiteFooter currentLang="es" />
    </>
  );
}
