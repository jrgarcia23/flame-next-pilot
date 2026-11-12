import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import Icon from "@/components/templates/Icon";
import AnimatedVisualMerchPanel from "@/components/AnimatedVisualMerchPanel";
import { UseCaseConfig } from "@/lib/page-content";

/**
 * DRAFT — caso de uso nuevo «Visual Merchandising» (módulo de IA de Flame).
 *
 * URL: /preview/visual-merchandising/  (noindex; /preview/ bloqueado en robots.ts)
 * Destino al publicar: /es/visual-merchandising/ y /en/visual-merchandising-analytics/
 *
 * Textos: frases literales del deck «Flame Visual Merchandising» (nov-2026);
 * title, meta y H1 del agente SEO (brain/performance.md, 12-nov-2026).
 * Pendiente de Flame: capturas antes / después completas y autorizadas
 * (las actuales son de la tienda Movistar Alcalá, sacadas del deck), foto de
 * cabecera propia y validación de los textos y las preguntas frecuentes.
 */

export const metadata: Metadata = {
  title: "[DRAFT] Visual merchandising con IA · Flame Analytics",
  description: "Preview interno: caso de uso Visual Merchandising.",
  robots: { index: false, follow: false },
};

const cfg: UseCaseConfig = {
  metaTitle: "Visual merchandising con IA: detecta cambios y mide su efecto",
  metaDescription: "Detecta cada día los cambios en expositores, cartelería y escaparates con las cámaras de tus tiendas y mide su efecto en visitas, tiempo en la zona y atención. Sin imágenes de personas.",
  heroTitle: "Visual merchandising con IA: ve cada cambio en tienda y mide su efecto",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.jpg",
  heroBgPosition: "center center",
  heroSub: "Ve el estado de todas tus tiendas cada día, sin tener que visitarlas. Flame Visual Merchandising captura cada día una imagen limpia de cada zona de la tienda, sin personas. La IA detecta qué ha cambiado y te avisa de lo que importa.",
  heroBullets: ["Captura automática", "Detección de cambios con IA", "Alertas y evidencia", "Sin imágenes de personas"],
  imageBigSrc: "/images/preview/visual-merchandising/comparador.webp",
  imageBigAlt: "Comparador antes y después de Flame Visual Merchandising",
  bigSectionTitle: "Qué ha cambiado, dónde y",
  bigSectionTitleHl: "en qué consiste",
  bigSectionPara1: "Dos capturas de la misma vista, con fecha y hora, y un deslizador para compararlas. La IA marca y numera la zona exacta que ha cambiado, y lo explica con una frase que cualquiera entiende y la categoría del cambio.",
  bigSectionPara2: "Una captura por día y vista. Los días con cambios se señalan y los días de cierre quedan marcados. Cada vista indica si ha cambiado respecto a la escena anterior.",
  bigSectionBullets: ["Antes y después", "Cambio localizado", "Explicado y clasificado", "Línea temporal"],
  benefitsTitle: "el retailer",
  benefitsTitleHl: "Qué gana",
  benefitsSub: "Lo que no se ve no se corrige: una campaña mal implantada, un expositor vacío o un cambio de layout pueden pasar semanas sin que nadie lo detecte.",
  benefits: [
    { icon: "street",   title: "Menos desplazamientos", desc: "La revisión de VM se hace en remoto; las visitas se reservan para formar y corregir." },
    { icon: "clock",    title: "Corrección en un día",  desc: "El problema se ve en la captura siguiente, no en la próxima visita a la tienda." },
    { icon: "calendar", title: "Evidencia con fecha",   desc: "Histórico visual para auditar campañas, acuerdos con marcas e incidencias." },
    { icon: "scale",    title: "Escala a toda la red",  desc: "El mismo control en 10 o en 1.000 tiendas, sin añadir personas." },
  ],
  metricsTitle: "Funcionalidades",
  metricsTitleHl: "disponibles hoy",
  metricsSub: "El equipo de VM escribe la condición tal como la diría. La IA la evalúa en cada nueva captura y avisa solo cuando se cumple, sin revisar imágenes a mano.",
  metrics: [
    { icon: "calendar", title: "Galería diaria",              desc: "Una imagen por día, tienda y cámara. Navega por fechas o salta a un día concreto." },
    { icon: "compare",  title: "Comparador antes / después",  desc: "Desliza entre dos fechas sobre la misma vista para ver la diferencia de un vistazo." },
    { icon: "target",   title: "Cambios localizados",         desc: "Cada cambio se marca y numera en la imagen y se etiqueta por tipo, por ejemplo «Disposición»." },
    { icon: "reports",  title: "Resumen en lenguaje natural", desc: "«Hay un nuevo expositor junto al ventanal. El resto de la tienda sigue igual.»" },
    { icon: "alert",    title: "Alertas «Avísame si…»",       desc: "Reglas escritas como las dirías: «si falta algún dispositivo en la mesa de exposición»." },
    { icon: "eye",      title: "Estado por vista",            desc: "«Sin cambios» o cambios detectados respecto a la escena anterior, en imágenes o en tabla." },
  ],
  testimonialsIdx: [],
  // Preguntas redactadas con datos del deck: pendientes de validar con Flame
  faqs: [
    { q: "¿Hay que instalar cámaras nuevas?", a: "No hace falta. Flame Visual Merchandising usa las cámaras IP que ya tiene la tienda: <strong>CCTV existente o cámaras de analítica Flame</strong>. En la tienda se instala Flame Edge, un equipo ligero que lee las cámaras, y solo necesita una conexión saliente HTTPS hacia el cloud de Flame." },
    { q: "¿Se guardan imágenes de personas?", a: "No. Flame Edge espera a un momento sin personas en plano y envía solo la imagen limpia, con tienda, cámara y hora. <strong>Las imágenes con personas se descartan en la propia tienda: nunca se envían ni se guardan.</strong>" },
    { q: "¿Cada cuánto se revisa cada tienda?", a: "Cada día: <strong>una captura por día y vista</strong>, en el momento del día que se configure para cada tienda. Un problema se ve en la captura siguiente, no en la próxima visita." },
    { q: "¿Qué cambios detecta?", a: "Cambios en cartelería de campaña, escaparates, mesas de exposición, mobiliario y disposición, además de incidencias como <strong>pantallas apagadas, cartelería caída o zonas desordenadas</strong>. Cada cambio se marca en la imagen, se clasifica y se explica con una frase." },
    { q: "¿Cómo se mide el efecto de un cambio?", a: "Visual Merchandising comparte tiendas, cámaras y fechas con el resto de la analítica de Flame. Con la fecha del cambio puedes ver <strong>visitas, tiempo en la zona y atención, antes y después del cambio</strong>, y decidir si extenderlo al resto de la red o revertirlo." },
    { q: "¿Cómo se pone en marcha?", a: "Con un <strong>piloto en un grupo de tiendas representativo</strong>: se eligen las vistas clave (escaparate, mesas y zonas de campaña), se configura la captura, se definen las alertas con el equipo de VM y, tras revisar los resultados, se extiende a la red tienda a tienda." },
  ],
  ctaStripBold: "Cada tienda, cada día, a la vista.",
  ctaStripLight: "Empecemos con un piloto en un grupo de tiendas, usando las cámaras que ya tienen.",
};

// Deck, diapositiva 13
const STEPS = [
  { icon: "eye",      title: "Detectas el cambio", desc: "Nuevo expositor junto al ventanal, miércoles 28." },
  { icon: "traffic",  title: "Mides el efecto",    desc: "Visitas, tiempo en la zona y atención, antes y después del cambio." },
  { icon: "trending", title: "Decides",            desc: "Extender el cambio al resto de la red o revertirlo, con datos." },
];

// Deck, diapositiva 12
const USE_CASES = [
  { title: "Lanzamiento de campaña", desc: "El día D, saber en qué tiendas está implantada la nueva cartelería y en cuáles no." },
  { title: "Mesas de exposición",    desc: "Aviso si falta un terminal de demostración o un producto clave en la mesa." },
  { title: "Cambios de layout",      desc: "Detectar cambios de mobiliario o disposición no previstos, como un expositor nuevo." },
  { title: "Escaparates",            desc: "Verificar el cambio de escaparate y que se mantiene durante toda la campaña." },
  { title: "Acuerdos con marcas",    desc: "Evidencia de que los espacios y expositores pactados con proveedores se respetan." },
  { title: "Incidencias en tienda",  desc: "Pantallas apagadas, cartelería caída o zonas desordenadas que nadie había reportado." },
];

function AfterMetrics() {
  return (
    <>
      {/* VER EL CAMBIO Y MEDIR SU EFECTO (navy) */}
      <section style={{ background: "var(--color-navy)", color: "#fff", padding: "clamp(72px, 7vw, 104px) 0" }}>
        <div className="flame-container">
          <div className="text-center mx-auto" style={{ maxWidth: 760, marginBottom: 48 }}>
            <h2 className="text-[clamp(30px,3.2vw,46px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "var(--font-display)", textWrap: "balance" }}>
              Ver el cambio y medir su efecto <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>en la misma plataforma</span>
            </h2>
            <p className="mt-5 text-[clamp(16px,1.2vw,18px)] leading-relaxed" style={{ color: "rgb(255 255 255 / 0.75)" }}>
              Visual Merchandising comparte tiendas, cámaras y fechas con el resto de la analítica de Flame: zonas, recorridos, mapas de calor y atención al cliente.
            </p>
          </div>
          <ol className="vm-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="vm-step">
                <div className="vm-step-top">
                  <span className="vm-step-icon"><Icon name={s.icon} className="w-5 h-5" /></span>
                  <span className="vm-step-n">0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          .vm-steps { list-style:none; margin:0; padding:0; display:grid; grid-template-columns: repeat(3, 1fr); gap: 20px; counter-reset: s; }
          .vm-step { position:relative; background: rgb(255 255 255 / 0.05); border:1px solid rgb(255 255 255 / 0.12); border-radius:16px; padding: 26px 26px 28px; }
          .vm-step:not(:last-child)::after { content:""; position:absolute; top:50%; right:-15px; width:10px; height:10px; border-top:2px solid var(--color-accent); border-right:2px solid var(--color-accent); transform: translateY(-50%) rotate(45deg); }
          .vm-step-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; }
          .vm-step-icon { display:inline-flex; align-items:center; justify-content:center; width:44px; height:44px; border-radius:10px; background: rgb(49 177 248 / 0.16); color: var(--color-accent); }
          .vm-step-n { font-family: var(--font-display); font-size:14px; letter-spacing:0.12em; color: rgb(255 255 255 / 0.45); }
          .vm-step h3 { font-size:20px; font-weight:600; color:#fff; margin:0 0 8px; letter-spacing:-0.005em; }
          .vm-step p { font-size:15.5px; line-height:1.6; color: rgb(255 255 255 / 0.75); margin:0; }
          @media (max-width: 860px) {
            .vm-steps { grid-template-columns: 1fr; gap: 14px; max-width: 520px; margin: 0 auto; }
            .vm-step:not(:last-child)::after { top:auto; bottom:-12px; right:auto; left:50%; transform: translateX(-50%) rotate(135deg); }
          }
        `}</style>
      </section>

      {/* CASOS DE USO */}
      <section className="py-24" style={{ background: "#fff" }}>
        <div className="flame-container">
          <div className="mb-12 max-w-[720px]">
            <h2 className="text-[clamp(32px,3.4vw,48px)] font-normal" style={{ color: "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
              Casos de <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>uso</span>
            </h2>
          </div>
          <div className="vm-uc-grid">
            {USE_CASES.map((u) => (
              <article key={u.title} className="vm-uc">
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          .vm-uc-grid { display:grid; grid-template-columns: repeat(3, 1fr); border-top:1px solid var(--color-rule); }
          .vm-uc { padding: 28px 28px 30px 0; border-bottom:1px solid var(--color-rule); }
          .vm-uc:not(:nth-child(3n+1)) { padding-left: 28px; border-left:1px solid var(--color-rule); }
          .vm-uc h3 { font-family: var(--font-display); font-size:21px; font-weight:500; color: var(--color-navy); letter-spacing:-0.01em; margin:0 0 8px; }
          .vm-uc p { font-size:15.5px; line-height:1.6; color: var(--color-ink-2); margin:0; }
          @media (max-width: 900px) {
            .vm-uc-grid { grid-template-columns: 1fr 1fr; }
            .vm-uc, .vm-uc:not(:nth-child(3n+1)) { padding: 24px 22px 26px 0; border-left:none; }
            .vm-uc:nth-child(2n) { padding-left: 22px; border-left:1px solid var(--color-rule); }
          }
          @media (max-width: 560px) {
            .vm-uc-grid { grid-template-columns: 1fr; }
            .vm-uc, .vm-uc:nth-child(2n) { padding: 22px 0; border-left:none; }
          }
        `}</style>
      </section>
    </>
  );
}

export default function VisualMerchandisingPreview() {
  return (
    <UseCaseTemplate
      cfg={cfg}
      enHref="/en/"
      bigSectionVisualOverride={<AnimatedVisualMerchPanel />}
      afterMetrics={<AfterMetrics />}
    />
  );
}
