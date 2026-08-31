import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { BANCOS_CFG_EN } from "@/lib/sector-configs-en";

export const metadata: Metadata = {
  title: "Banking · Flame Analytics",
  description: "Footfall, queue and real-use analytics for branch networks with video AI, no biometrics and GDPR-compliant. Size tellers and advisers and cut waits.",
  alternates: {
    canonical: "/en/banking/",
    languages: {
      en: "/en/banking/",
      es: "/es/banca/",
      "x-default": "/es/banca/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/banking/",
    siteName: "Flame Analytics",
    title: "Banking · Flame Analytics",
    description: "Footfall, queue and real-use analytics for branch networks with video AI, no biometrics and GDPR-compliant.",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Traffic2-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Banking · Flame Analytics",
    description: "Footfall, queue and real-use analytics for branch networks with video AI, no biometrics and GDPR-compliant.",
    images: ["/wp-content/uploads/2026/01/Traffic2-1.png"],
  },
};

export default function BankingSectorEN() {
  return <SectorTemplate cfg={BANCOS_CFG_EN} enHref="/es/banca/" currentLang="en" />;
}
