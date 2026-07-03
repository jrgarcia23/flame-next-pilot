import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mantenimiento · Flame Analytics",
  description: "Estamos haciendo mejoras. Volvemos enseguida.",
  robots: { index: false, follow: false },
};

const HERO_BG = "/wp-content/uploads/2026/01/Traffic2-1.png";
const LOGO = "/wp-content/uploads/2023/10/flame-logo-white.png";

export default function Mantenimiento() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--color-navy, #15163a)",
        backgroundImage: `url('${HERO_BG}')`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "32px",
        textAlign: "center",
        fontFamily: "var(--font-display, system-ui, -apple-system, Segoe UI, sans-serif)",
      }}
    >
      <link rel="preload" as="image" href={HERO_BG} fetchPriority="high" />

      {/* Overlay navy degradado */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgb(21 22 58 / 0.92) 0%, rgb(21 22 58 / 0.85) 50%, rgb(12 111 213 / 0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Glow azul radial sutil */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "60vw",
          height: "60vw",
          maxWidth: 900,
          maxHeight: 900,
          borderRadius: "50%",
          background: "rgb(49 177 248 / 0.18)",
          filter: "blur(120px)",
          top: "10%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680 }}>
        <img
          src={LOGO}
          alt="Flame Analytics"
          style={{ width: 200, height: "auto", margin: "0 auto 56px", display: "block" }}
        />

        <p
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgb(49 177 248)",
            marginBottom: 24,
          }}
        >
          Mantenimiento programado
        </p>

        <h1
          style={{
            fontSize: "clamp(38px, 5.6vw, 64px)",
            fontWeight: 400,
            letterSpacing: "-0.022em",
            lineHeight: 1.06,
            margin: "0 0 24px",
          }}
        >
          Estamos haciendo{" "}
          <span style={{ color: "rgb(49 177 248)", fontWeight: 500 }}>mejoras</span>.
        </h1>

        <p
          style={{
            fontSize: "clamp(17px, 1.4vw, 19px)",
            lineHeight: 1.55,
            color: "rgb(255 255 255 / 0.78)",
            margin: "0 auto 40px",
            maxWidth: 540,
            fontFamily: "var(--font-body, system-ui, -apple-system, Segoe UI, sans-serif)",
          }}
        >
          Estamos actualizando Flame Analytics para mejorar tu experiencia. Volvemos
          enseguida. Gracias por tu paciencia.
        </p>

        <a
          href="mailto:info@flameanalytics.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            background: "rgb(255 255 255 / 0.08)",
            border: "1px solid rgb(255 255 255 / 0.2)",
            borderRadius: 10,
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "-0.005em",
            transition: "background 0.2s, border-color 0.2s",
          }}
        >
          info@flameanalytics.com
        </a>

        <p
          style={{
            marginTop: 56,
            fontSize: 13,
            color: "rgb(255 255 255 / 0.45)",
            letterSpacing: "0.02em",
          }}
        >
          © {new Date().getFullYear()} Flame Analytics
        </p>
      </div>
    </main>
  );
}
