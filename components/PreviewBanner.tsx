// Barra de aviso para las páginas de PREVIEW interna (no publicadas). noindex + no enlazadas.
import PreviewFeedback from "./PreviewFeedback";

export default function PreviewBanner({ label }: { label: string }) {
  return (
    <>
      <div style={{ background: "#fe5000", color: "#fff", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.01em", textAlign: "center", padding: "9px 16px", position: "relative", zIndex: 60 }}>
        BORRADOR PARA REVISIÓN INTERNA · No publicado · {label} —{" "}
        <a href="/es/preview-sectores/" style={{ color: "#fff", textDecoration: "underline" }}>ver todos los sectores</a>
      </div>
      <PreviewFeedback sectorLabel={label} />
    </>
  );
}
