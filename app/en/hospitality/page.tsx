import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { HOTELES_CFG_EN } from "@/lib/sector-configs-en";

export const metadata: Metadata = {
  title: "Hospitality · Flame Analytics",
  description: "Comprehensive data analytics to gain valuable insight into customer behavior. We develop and deploy analytics solutions powered by big dat",
  alternates: {
    canonical: "/en/hospitality/",
    languages: {
    en: "/en/hospitality/",
    es: "/es/hoteles/",
    "x-default": "/es/hoteles/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/hospitality/",
    siteName: "Flame Analytics",
    title: "Hospitality · Flame Analytics",
    description: "Comprehensive data analytics to gain valuable insight into customer behavior. We develop and deploy analytics solutions powered by big dat",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Hospitality-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hospitality · Flame Analytics",
    description: "Comprehensive data analytics to gain valuable insight into customer behavior. We develop and deploy analytics solutions powered by big dat",
    images: ["/wp-content/uploads/2026/01/Industries_Hospitality-1.jpg"],
  },
};

export default function HospitalitySectorEN() {
  return <SectorTemplate cfg={HOTELES_CFG_EN} enHref="/es/hoteles/" currentLang="en" />;
}
