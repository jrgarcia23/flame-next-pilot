import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { BANCOS_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "Bancos y sucursales · Flame Analytics",
  description: "Analítica de afluencia, colas y uso real para redes de oficinas bancarias con IA de vídeo, sin biometría y conforme al RGPD. Dimensiona cajeros y gestores y reduce esperas.",
  alternates: {
    canonical: "/es/banca/",
    languages: {
      es: "/es/banca/",
      en: "/en/banking/",
      "x-default": "/es/banca/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/banca/",
    siteName: "Flame Analytics",
    title: "Bancos y sucursales · Flame Analytics",
    description: "Analítica de afluencia, colas y uso real para redes de oficinas bancarias con IA de vídeo, sin biometría y conforme al RGPD.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Traffic2-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bancos y sucursales · Flame Analytics",
    description: "Analítica de afluencia, colas y uso real para redes de oficinas bancarias con IA de vídeo, sin biometría y conforme al RGPD.",
    images: ["/wp-content/uploads/2026/01/Traffic2-1.png"],
  },
};

export default function BancaSector() {
  return <SectorTemplate cfg={BANCOS_CFG} enHref="/en/banking/" />;
}
