import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[BORRADOR] Páginas de sector · Flame Analytics",
  robots: { index: false, follow: false },
};

const SECTORS: Array<{ label: string; desc: string; href: string; status: "live" | "draft" }> = [
  { label: "Centros comerciales", desc: "Ya publicado con el nuevo modelo.", href: "/es/solucion-para-centros-comerciales/", status: "live" },
  { label: "Retail", desc: "Borrador para revisión.", href: "/es/preview-sectores/retail/", status: "draft" },
  { label: "Supermercados", desc: "Borrador para revisión.", href: "/es/preview-sectores/supermercados/", status: "draft" },
  { label: "Hoteles", desc: "Borrador para revisión.", href: "/es/preview-sectores/hoteles/", status: "draft" },
  { label: "Espacios públicos", desc: "Borrador para revisión.", href: "/es/preview-sectores/espacios-publicos/", status: "draft" },
  { label: "Bancos y sucursales", desc: "Nuevo sector (gap de competencia). Borrador para revisión.", href: "/es/preview-sectores/bancos/", status: "draft" },
  { label: "Transporte y aeropuertos", desc: "Nuevo sector (gap de competencia). Borrador para revisión.", href: "/es/preview-sectores/transporte/", status: "draft" },
];

export default function PreviewIndex() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--color-navy)", color: "#fff", fontFamily: "var(--font-body)", padding: "clamp(48px, 8vw, 96px) 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <span style={{ display: "inline-block", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16 }}>
          Borrador interno · No publicado
        </span>
        <h1 style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(30px, 4.5vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1.08, margin: "0 0 18px" }}>
          Páginas de sector: nuevo modelo
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgb(255 255 255 / 0.78)", maxWidth: "62ch", margin: "0 0 12px" }}>
          Revisión para el equipo comercial. Estas páginas usan el nuevo modelo (problemas del sector → capacidades → casos). El contenido es real; las fotos de las capacidades destacadas son provisionales donde aún no hay foto específica del sector.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgb(255 255 255 / 0.5)", margin: "0 0 40px" }}>
          Estas URLs son privadas (noindex, no enlazadas desde la web). Las páginas públicas actuales no se han modificado.
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          {SECTORS.map((s) => (
            <a key={s.href} href={s.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, background: "rgb(255 255 255 / 0.05)", border: "1px solid rgb(255 255 255 / 0.12)", borderRadius: 16, padding: "22px 26px", textDecoration: "none", color: "#fff" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 21, letterSpacing: "-0.01em" }}>{s.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 999, background: s.status === "live" ? "rgb(49 177 248 / 0.18)" : "rgb(254 80 0 / 0.2)", color: s.status === "live" ? "var(--color-accent)" : "#ffb38a" }}>
                    {s.status === "live" ? "Publicado" : "Borrador"}
                  </span>
                </div>
                <span style={{ fontSize: 14, color: "rgb(255 255 255 / 0.6)" }}>{s.desc}</span>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontWeight: 600, color: "var(--color-accent)", flexShrink: 0 }}>
                Ver
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
