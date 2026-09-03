import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { CENTROS_CFG_EN } from "@/lib/sector-configs-en";

export const metadata: Metadata = {
  title: "Data Intelligence for Shopping Malls · Flame Analytics",
  description: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to he",
  alternates: {
    canonical: "/en/solution-for-shopping-malls/",
    languages: {
    en: "/en/solution-for-shopping-malls/",
    es: "/es/solucion-para-centros-comerciales/",
    "x-default": "/es/solucion-para-centros-comerciales/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/solution-for-shopping-malls/",
    siteName: "Flame Analytics",
    title: "Data Intelligence for Shopping Malls · Flame Analytics",
    description: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to he",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Malls2-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence for Shopping Malls · Flame Analytics",
    description: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to he",
    images: ["/wp-content/uploads/2026/01/Industries_Malls2-1.jpg"],
  },
};

export default function ShoppingMallsSectorEN() {
  return <SectorTemplate cfg={CENTROS_CFG_EN} enHref="/es/solucion-para-centros-comerciales/" currentLang="en" />;
}
