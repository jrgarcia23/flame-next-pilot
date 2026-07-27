import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";

// Documento interno de inteligencia competitiva (smart building). PRIVADO + NO INDEXABLE:
// - Vive bajo /admin/ → app/admin/layout.tsx aplica robots noindex/nofollow/nocache.
// - robots.txt (app/robots.ts) hace Disallow: /admin/.
// - No está enlazado en la nav pública ni en el sitemap.
// - Requiere sesión admin (guard abajo).
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false, nocache: true } };

const NAVY = "#15163A", ACCENT = "#1D8BCA", ACCENT_LT = "#31B1F8", INK = "#333A4A", INK2 = "#5A6375", GREY = "#8A92A5";
const GREEN = "#157F3C", AMBER = "#B57300", RED = "#B42318";
const PAPER = "#F6F7FB", RULE = "rgba(15,23,42,0.08)";

type Cap = { label: string; state: "si" | "parcial" | "no"; note: string };
type Comp = {
  name: string; url: string; tracked?: boolean; claim: string;
  links: { label: string; href: string }[];
  caps: { occ: Cap; air: Cap; carbon: Cap; use: Cap };
};

const COMPS: Comp[] = [
  {
    name: "Metrikus", url: "https://www.metrikus.io", claim:
      "El punto único de integración de datos del edificio, agnóstico: se pone SOBRE el BMS/sensores existentes y da la recomendación en lenguaje natural — «el trabajo de un analista, hecho en segundos».",
    links: [
      { label: "Posicionamiento", href: "https://www.metrikus.io/why-metrikus" },
      { label: "Ocupación / puestos", href: "https://www.metrikus.io/use-cases/offices-occupancy-and-capacity" },
      { label: "Calidad de aire (IAQ)", href: "https://www.metrikus.io/use-cases/indoor-air-quality" },
      { label: "ESG / sostenibilidad", href: "https://www.metrikus.io/solutions/sustainable-buildings" },
      { label: "Utilización del espacio", href: "https://www.metrikus.io/solutions/space-optimization" },
      { label: "Versión ES", href: "https://www.metrikus.io/es-es/casos-practicos/calidad-del-aire-interior" },
    ],
    caps: {
      occ: { label: "Ocupación puestos", state: "si", note: "desk occupancy, sensores anónimos" },
      air: { label: "Aire (partículas)", state: "si", note: "temp, humedad, CO2, TVOC, PM2.5" },
      carbon: { label: "Huella carbono", state: "parcial", note: "vía energía, sin motor CO2e" },
      use: { label: "Uso edificio", state: "si", note: "space utilization (fuerte)" },
    },
  },
  {
    name: "Infogrid → Noda", url: "https://www.noda.ai", claim:
      "Era la referencia de «healthy building» (ocupación + aire) y en dic-2024 pivotó a Noda: IA agéntica de energía/carbono para CRE — «el ingeniero de IA que se paga solo». ABANDONÓ ocupación e IAQ.",
    links: [
      { label: "Noda hoy (plataforma)", href: "https://www.noda.ai/platform" },
      { label: "Infogrid histórico · aire (Wayback)", href: "https://web.archive.org/web/2023/https://www.infogrid.io/air-quality-monitoring" },
      { label: "Infogrid histórico · ocupación (Wayback)", href: "https://web.archive.org/web/2023/https://www.infogrid.io/occupancy-monitoring" },
    ],
    caps: {
      occ: { label: "Ocupación puestos", state: "no", note: "descontinuado tras el pivote" },
      air: { label: "Aire (partículas)", state: "no", note: "descontinuado; solo era CO2" },
      carbon: { label: "Huella carbono", state: "si", note: "núcleo actual (Scope 1/2/3)" },
      use: { label: "Uso edificio", state: "parcial", note: "= rendimiento operativo/energético" },
    },
  },
  {
    name: "VergeSense", url: "https://www.vergesense.com", tracked: false, claim:
      "«Occupancy Intelligence» + planificación predictiva (Meridian): alinea el espacio con la demanda. Todo el pitch en $ para el CFO. NO toca aire ni carbono.",
    links: [
      { label: "Analytics de ocupación", href: "https://www.vergesense.com/products/occupancy-intelligence/analytics" },
      { label: "Optimización del espacio", href: "https://www.vergesense.com/solutions/problems-we-solve/space-optimization" },
      { label: "Predictive Planning (Meridian)", href: "https://www.vergesense.com/products/decision-intelligence/predictive-planning" },
    ],
    caps: {
      occ: { label: "Ocupación puestos", state: "si", note: "núcleo · sensor Infinity 95%+" },
      air: { label: "Aire (partículas)", state: "no", note: "sin capacidad ambiental" },
      carbon: { label: "Huella carbono", state: "no", note: "solo «menos m² = menos huella»" },
      use: { label: "Uso edificio", state: "si", note: "núcleo · analítica por planta/edificio" },
    },
  },
  {
    name: "Density", url: "https://www.density.io", tracked: true, claim:
      "Conteo plug & play con radar anónimo: «Always private (unlike cameras) · Always accurate (unlike badge) · Always on». Precio transparente, «maximize the value of every square foot». NO mide aire ni carbono.",
    links: [
      { label: "Atlas for Workplace", href: "https://www.density.io/atlas-for-workplace" },
      { label: "Occupancy planning", href: "https://www.density.io/solutions/occupancy-planning" },
      { label: "Sensor Open Area", href: "https://www.density.io/open-area" },
    ],
    caps: {
      occ: { label: "Ocupación puestos", state: "si", note: "salas, booths y desks (radar)" },
      air: { label: "Aire (partículas)", state: "no", note: "0 métricas ambientales" },
      carbon: { label: "Huella carbono", state: "no", note: "sin producto ESG/carbono" },
      use: { label: "Uso edificio", state: "si", note: "núcleo · right-sizing inmobiliario" },
    },
  },
  {
    name: "Freespace", url: "https://www.afreespace.com", tracked: false, claim:
      "«One platform for every workplace»: sensores (no ópticos) + app de empleado (reservas). +$100M ahorrados. IAQ y carbono presentes pero flojos (sin partículas claras ni panel CO2e).",
    links: [
      { label: "Workplace Analytics", href: "https://www.afreespace.com/platform/workplace-analytics/" },
      { label: "Sensores de ocupación", href: "https://www.afreespace.com/platform/workplace-occupancy-sensors/" },
      { label: "Monitorización CO2", href: "https://www.afreespace.com/news/freespace-co2-monitoring/" },
      { label: "Sensing Net Zero", href: "https://www.afreespace.com/news/sensing-net-zero/" },
    ],
    caps: {
      occ: { label: "Ocupación puestos", state: "si", note: "núcleo · sensores >99% escritorios" },
      air: { label: "Aire (partículas)", state: "parcial", note: "temp/hum/CO2/VOC; partículas flojas" },
      carbon: { label: "Huella carbono", state: "parcial", note: "energía/net-zero, sin CO2e medible" },
      use: { label: "Uso edificio", state: "si", note: "núcleo · Vision™ modelado de espacio" },
    },
  },
  {
    name: "Disruptive Technologies", url: "https://www.disruptive-technologies.com", tracked: false, claim:
      "Sensores diminutos «peel-and-stick», 15 años de batería, anónimos. Modelo PARTNER-LED: es la capa de datos, la app de negocio la ponen otros (Planon, JLL…). No mide partículas ni entrega contabilidad de carbono.",
    links: [
      { label: "Ocupación del espacio", href: "https://www.disruptive-technologies.com/space-occupancy-solution" },
      { label: "Optimización de energía", href: "https://www.disruptive-technologies.com/energy-optimization-solution" },
      { label: "Catálogo de sensores", href: "https://www.disruptive-technologies.com/sensors" },
      { label: "Sensores para ESG", href: "https://www.disruptive-technologies.com/explore/breaking-down-the-sensors-you-need-for-esg-compliance" },
    ],
    caps: {
      occ: { label: "Ocupación puestos", state: "si", note: "desk occupancy 98% (temp+ML)" },
      air: { label: "Aire (partículas)", state: "parcial", note: "temp/hum/CO2; SIN partículas/VOC" },
      carbon: { label: "Huella carbono", state: "parcial", note: "solo fuente de datos, delega" },
      use: { label: "Uso edificio", state: "si", note: "space + energy optimization" },
    },
  },
  {
    name: "Kaiterra", url: "https://www.kaiterra.com", tracked: false, claim:
      "Especialista puro de aire para edificios sanos y certificación WELL: «hasta 9 puntos WELL, los más del mercado». Es el sensor de aire que se integra en el smart building de otros. NO toca ocupación ni carbono.",
    links: [
      { label: "IAQ para edificios", href: "https://www.kaiterra.com/indoor-air-quality-monitor-for-buildings" },
      { label: "Sensedge Mini (métricas)", href: "https://www.kaiterra.com/sensedge-mini-indoor-air-quality-monitor" },
      { label: "Comparativa de hardware", href: "https://www.kaiterra.com/compare-hardware" },
    ],
    caps: {
      occ: { label: "Ocupación puestos", state: "no", note: "no cuenta personas" },
      air: { label: "Aire (partículas)", state: "si", note: "PM2.5/PM10, CO2, TVOC, temp, hum + gases" },
      carbon: { label: "Huella carbono", state: "no", note: "habilitador, no lo mide" },
      use: { label: "Uso edificio", state: "no", note: "no mide uso/aforo" },
    },
  },
];

const stateColor = (s: Cap["state"]) => (s === "si" ? GREEN : s === "parcial" ? AMBER : RED);
const stateLabel = (s: Cap["state"]) => (s === "si" ? "SÍ" : s === "parcial" ? "Parcial" : "No");

const card: React.CSSProperties = { background: "#fff", border: `1px solid ${RULE}`, borderRadius: 14, padding: "22px 24px" };
const badge = (color: string): React.CSSProperties => ({ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color, background: `${color}14`, borderRadius: 999, padding: "3px 10px" });

export default async function CompetenciaSmartBuildingPage() {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/competencia-smart-building/")}`);

  return (
    <div style={{ minHeight: "100vh", background: PAPER, fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: INK }}>
      {/* Barra interna */}
      <div style={{ background: NAVY, color: "#fff", padding: "10px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 800, letterSpacing: "-0.02em", fontSize: 18 }}>FLAME</span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.14)", padding: "3px 9px", borderRadius: 999 }}>Documento interno · no indexar</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12 }}>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>{email}</span>
          <Link href="/admin/" style={{ color: "#fff", textDecoration: "none", background: "rgba(255,255,255,0.14)", padding: "5px 12px", borderRadius: 6, fontSize: 12 }}>← Admin</Link>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 32px 60px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, margin: "0 0 6px" }}>Inteligencia de mercado · Smart building</p>
        <h1 style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em", color: NAVY, margin: "0 0 8px" }}>Competencia en medición de edificios inteligentes</h1>
        <p style={{ fontSize: 15, color: INK2, maxWidth: "70ch", margin: "0 0 8px", lineHeight: 1.55 }}>
          Ocupación de puestos · calidad de aire (temp/humedad/partículas) · huella de carbono · uso del edificio. Quién lo hace, con enlaces exactos a sus páginas y su claim diferencial.
        </p>
        <p style={{ fontSize: 12, color: GREY, margin: "0 0 28px" }}>Fuente: crawl directo de las webs (Crawl4ai / Firecrawl / Wayback) · 27-jul-2026 · Esconzeta</p>

        {/* Whitespace */}
        <div style={{ ...card, borderLeft: `4px solid ${ACCENT}`, marginBottom: 30 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, margin: "0 0 6px" }}>El hueco</p>
          <p style={{ fontSize: 15, color: NAVY, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.5 }}>Nadie une las 4 capacidades a la vez.</p>
          <p style={{ fontSize: 13.5, color: INK2, margin: 0, lineHeight: 1.6 }}>
            Los líderes de ocupación (VergeSense, Density) no miden aire ni carbono. El especialista de aire (Kaiterra) no mide ocupación ni carbono. Las plataformas que intentan unir todo (Metrikus, Freespace, Disruptive) resuelven la huella de carbono flojo (vía energía, sin motor CO2e) y las partículas de forma genérica. Y el que sí lo hacía (Infogrid) se retiró al convertirse en Noda. → Oportunidad para Flame: la única plataforma que une <strong>ocupación + aire (con partículas) + huella de carbono medible + uso del edificio</strong>, sobre su Hypersensor (IA sobre CCTV, sin biometría, RGPD).
          </p>
        </div>

        {/* Fichas por competidor */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: "0 0 16px", letterSpacing: "-0.02em" }}>Las empresas, sus URLs y su claim diferencial</h2>
        <div style={{ display: "grid", gap: 16, marginBottom: 36 }}>
          {COMPS.map((c) => (
            <div key={c.name} style={card}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: 18, fontWeight: 700, color: NAVY, textDecoration: "none", letterSpacing: "-0.01em" }}>{c.name}</a>
                  <a href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, color: ACCENT, textDecoration: "none" }}>{c.url.replace("https://www.", "").replace("https://", "")} ↗</a>
                  {c.tracked && <span style={badge(ACCENT)}>Ya lo monitorizas</span>}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[c.caps.occ, c.caps.air, c.caps.carbon, c.caps.use].map((cap) => (
                    <span key={cap.label} style={badge(stateColor(cap.state))} title={cap.note}>{stateLabel(cap.state)} · {cap.label}</span>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 13.5, color: INK, margin: "0 0 14px", lineHeight: 1.55 }}><strong style={{ color: NAVY }}>Claim diferencial:</strong> {c.claim}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {c.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                    style={{ fontSize: 12, color: NAVY, textDecoration: "none", background: PAPER, border: `1px solid ${RULE}`, borderRadius: 6, padding: "6px 12px" }}>
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Matriz */}
        <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Matriz de cobertura</h2>
        <div style={{ overflowX: "auto", marginBottom: 36 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, minWidth: 720 }}>
            <thead>
              <tr>
                {["Empresa", "Ocupación puestos", "Aire (partículas)", "Huella carbono", "Uso edificio"].map((h) => (
                  <th key={h} style={{ background: NAVY, color: "#fff", textAlign: "left", padding: "10px 12px", fontSize: 11.5, fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPS.map((c) => (
                <tr key={c.name} style={{ borderBottom: `1px solid ${RULE}` }}>
                  <td style={{ padding: "9px 12px", fontWeight: 700, color: NAVY, background: "#fff" }}>{c.name}</td>
                  {[c.caps.occ, c.caps.air, c.caps.carbon, c.caps.use].map((cap) => (
                    <td key={cap.label} style={{ padding: "9px 12px", background: "#fff" }}>
                      <span style={{ fontWeight: 700, color: stateColor(cap.state) }}>{stateLabel(cap.state)}</span>
                      <span style={{ color: INK2 }}> · {cap.note}</span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ background: "#E9F4FC" }}>
                <td style={{ padding: "9px 12px", fontWeight: 700, color: ACCENT }}>FLAME (objetivo)</td>
                <td style={{ padding: "9px 12px", color: ACCENT, fontWeight: 600 }}>Hypersensor / IA CCTV</td>
                <td style={{ padding: "9px 12px", color: ACCENT, fontWeight: 600 }}>a incorporar (con partículas)</td>
                <td style={{ padding: "9px 12px", color: ACCENT, fontWeight: 600 }}>a incorporar (panel CO2e/ESG)</td>
                <td style={{ padding: "9px 12px", color: ACCENT, fontWeight: 600 }}>footfall + zonas → puestos</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Nota tracked */}
        <div style={{ ...card, background: "#FFFDF5", borderColor: "#F3E4B8" }}>
          <p style={{ fontSize: 12.5, color: INK, margin: 0, lineHeight: 1.6 }}>
            <strong style={{ color: NAVY }}>De tu set monitorizado</strong> (RetailNext · Placer.ai · Density · V-Count · Sensormatic): solo <strong>Density</strong> juega en smart building (ocupación/uso, sin aire ni carbono) y <strong>V-Count</strong> tiene landings de «smart-buildings / real-estate» pero solo como conteo de personas. RetailNext y Sensormatic son retail puro; Placer.ai es location intelligence. <strong>Ninguno hace el caso completo.</strong> Los que sí (Metrikus, VergeSense, Freespace, Disruptive, Kaiterra) son un set competitivo distinto, de <em>workplace/facilities</em>, hoy fuera de tu radar.
          </p>
        </div>
      </div>
    </div>
  );
}
