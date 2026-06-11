import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import CookieBanner from "@/components/templates/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const SITE = "https://www.flameanalytics.com";

export const metadata: Metadata = {
  title: "Flame Analytics · AI video analytics for retail",
  description:
    "Transformamos el vídeo en información en tiempo real para tu negocio. Tráfico, ocupación, customer journey y conversión, sin biometría y RGPD por diseño.",
  metadataBase: new URL(SITE),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Lang dinámico por URL: el middleware inyecta `x-flame-lang` para todas las
  // rutas /es/* o /en/*. Fallback "es" (mercado principal). Esto resuelve el bug
  // en el que las páginas /en/* tenían <html lang="es"> hardcoded.
  const h = await headers();
  const lang = h.get("x-flame-lang") === "en" ? "en" : "es";
  return (
    <html lang={lang} className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Microsoft Clarity — session recording + heatmaps */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "x5flki4zju");`,
          }}
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
