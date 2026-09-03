import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { RETAIL_CFG_EN } from "@/lib/sector-configs-en";

export const metadata: Metadata = {
  title: "Data Intelligence for Retail · Flame Analytics",
  description: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
  alternates: {
    canonical: "/en/solution-for-retail-sector/",
    languages: {
    en: "/en/solution-for-retail-sector/",
    es: "/es/solucion-para-el-sector-retail/",
    "x-default": "/es/solucion-para-el-sector-retail/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/solution-for-retail-sector/",
    siteName: "Flame Analytics",
    title: "Data Intelligence for Retail · Flame Analytics",
    description: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Retail-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence for Retail · Flame Analytics",
    description: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
    images: ["/wp-content/uploads/2026/01/Industries_Retail-1.jpg"],
  },
};

export default function RetailSectorEN() {
  return <SectorTemplate cfg={RETAIL_CFG_EN} enHref="/es/solucion-para-el-sector-retail/" currentLang="en" />;
}
