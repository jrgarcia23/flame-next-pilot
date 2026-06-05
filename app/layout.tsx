import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/templates/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const SITE = "https://www.flameanalytics.com";

export const metadata: Metadata = {
  title: "Flame Analytics · AI video analytics for retail",
  description:
    "Transformamos el vídeo en información en tiempo real para tu negocio. Tráfico, ocupación, customer journey y conversión, sin biometría y RGPD por diseño.",
  metadataBase: new URL(SITE),
};

// Organization + WebSite JSON-LD globales (siempre presentes en todas las páginas).
// Patrón canónico schema.org para SaaS B2B.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Flame Analytics",
  legalName: "Flame Analytics S.L.",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE}/#logo`,
    url: `${SITE}/wp-content/uploads/2023/10/flame-logo-black.png`,
    contentUrl: `${SITE}/wp-content/uploads/2023/10/flame-logo-black.png`,
    caption: "Flame Analytics",
  },
  description:
    "Plataforma de analítica de vídeo con IA para espacios físicos: retail, centros comerciales, hostelería y espacios públicos.",
  foundingDate: "2016",
  founder: { "@type": "Person", name: "Jonathan Solís" },
  email: "info@flameanalytics.com",
  sameAs: [
    "https://www.linkedin.com/company/flame-analytics/",
    "https://twitter.com/flameanalytics",
    "https://www.youtube.com/@flameanalytics",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Flame Analytics",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: ["es", "en"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
