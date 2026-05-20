import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flame Analytics",
  description: "Empowering physical spaces.",
  other: { refresh: "0; url=/es/" },
};

export default function RootPage() {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="refresh" content="0; url=/es/" />
        <link rel="canonical" href="/es/" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#15163A",
          color: "white",
        }}
      >
        <p>
          Redirecting to{" "}
          <a href="/es/" style={{ color: "#31b1f8" }}>
            /es/
          </a>
          …
        </p>
      </body>
    </html>
  );
}
