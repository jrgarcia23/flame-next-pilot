import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/templates/CookieBanner";

export const metadata: Metadata = {
  title: "Flame Analytics · AI video analytics for retail",
  description:
    "Transformamos el vídeo en información en tiempo real para tu negocio. Tráfico, ocupación, customer journey y conversión, sin biometría y RGPD por diseño.",
  metadataBase: new URL("https://flameanalytics.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
