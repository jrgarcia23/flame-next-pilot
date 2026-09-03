import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { TRANSPORTE_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "Transporte y aeropuertos · Flame Analytics",
  description: "Analítica de flujos de pasajeros, ocupación y colas para aeropuertos, estaciones e intercambiadores con IA de vídeo, sin biometría y conforme al RGPD. Anticipa aglomeraciones y planifica el personal.",
  alternates: {
    canonical: "/es/transporte-y-aeropuertos/",
    languages: {
      es: "/es/transporte-y-aeropuertos/",
      en: "/en/transport-and-airports/",
      "x-default": "/es/transporte-y-aeropuertos/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/transporte-y-aeropuertos/",
    siteName: "Flame Analytics",
    title: "Transporte y aeropuertos · Flame Analytics",
    description: "Analítica de flujos de pasajeros, ocupación y colas para aeropuertos, estaciones e intercambiadores con IA de vídeo, sin biometría y conforme al RGPD.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Transport-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transporte y aeropuertos · Flame Analytics",
    description: "Analítica de flujos de pasajeros, ocupación y colas para aeropuertos, estaciones e intercambiadores con IA de vídeo, sin biometría y conforme al RGPD.",
    images: ["/wp-content/uploads/2026/01/Industries_Transport-1.jpg"],
  },
};

export default function TransporteAeropuertosSector() {
  return <SectorTemplate cfg={TRANSPORTE_CFG} enHref="/en/transport-and-airports/" />;
}
