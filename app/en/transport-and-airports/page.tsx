import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { TRANSPORTE_CFG_EN } from "@/lib/sector-configs-en";

export const metadata: Metadata = {
  title: "Transport and airports · Flame Analytics",
  description: "Passenger-flow, capacity and queue analytics for airports, stations and interchanges with video AI, no biometrics and GDPR-compliant. Anticipate crowds and plan staff.",
  alternates: {
    canonical: "/en/transport-and-airports/",
    languages: {
      en: "/en/transport-and-airports/",
      es: "/es/transporte-y-aeropuertos/",
      "x-default": "/es/transporte-y-aeropuertos/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/transport-and-airports/",
    siteName: "Flame Analytics",
    title: "Transport and airports · Flame Analytics",
    description: "Passenger-flow, capacity and queue analytics for airports, stations and interchanges with video AI, no biometrics and GDPR-compliant.",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Transport-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transport and airports · Flame Analytics",
    description: "Passenger-flow, capacity and queue analytics for airports, stations and interchanges with video AI, no biometrics and GDPR-compliant.",
    images: ["/wp-content/uploads/2026/01/Industries_Transport-1.jpg"],
  },
};

export default function TransportAirportsSectorEN() {
  return <SectorTemplate cfg={TRANSPORTE_CFG_EN} enHref="/es/transporte-y-aeropuertos/" currentLang="en" />;
}
