import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
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
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Banking-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Banking · Flame Analytics",
    description: "Footfall, queue and real-use analytics for branch networks with video AI, no biometrics and GDPR-compliant.",
    images: ["/wp-content/uploads/2026/01/Industries_Banking-1.jpg"],
  },
};

export default async function BankingSectorEN() {
  const caseStudies = await selectCaseCards({ sector: "banca" }, { lang: "en" });
  return <SectorTemplate cfg={{ ...BANCOS_CFG_EN, caseStudies }} enHref="/es/banca/" currentLang="en" />;
}
