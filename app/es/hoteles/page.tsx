import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { HOTELES_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "Hoteles · Flame Analytics",
  description: "Mejora la gestión hotelera y aumenta la satisfacción y fidelidad de los huéspedes. Análisis integral de datos para hoteles con big data e IA.",
  alternates: {
    canonical: "/es/hoteles/",
    languages: {
    es: "/es/hoteles/",
    en: "/en/hospitality/",
    "x-default": "/es/hoteles/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/hoteles/",
    siteName: "Flame Analytics",
    title: "Hoteles · Flame Analytics",
    description: "Mejora la gestión hotelera y aumenta la satisfacción y fidelidad de los huéspedes. Análisis integral de datos para hoteles con big data e IA.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoteles · Flame Analytics",
    description: "Mejora la gestión hotelera y aumenta la satisfacción y fidelidad de los huéspedes. Análisis integral de datos para hoteles con big data e IA.",
    images: ["/wp-content/uploads/2026/01/Industries_Hospitality-1.png"],
  },
};

export default function HotelesSector() {
  return <SectorTemplate cfg={HOTELES_CFG} enHref="/en/hospitality/" />;
}
