import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
import { RETAIL_CFG, UC_COMMON } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "Data Intelligence para Retail · Flame Analytics",
  description: "Mejora el rendimiento de cada tienda con datos accionables. Analítica + marketing para retail basados en IA, vídeo y big data.",
  alternates: {
    canonical: "/es/solucion-para-el-sector-retail/",
    languages: {
    es: "/es/solucion-para-el-sector-retail/",
    en: "/en/solution-for-retail-sector/",
    "x-default": "/es/solucion-para-el-sector-retail/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/solucion-para-el-sector-retail/",
    siteName: "Flame Analytics",
    title: "Data Intelligence para Retail · Flame Analytics",
    description: "Mejora el rendimiento de cada tienda con datos accionables. Analítica + marketing para retail basados en IA, vídeo y big data.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Retail-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence para Retail · Flame Analytics",
    description: "Mejora el rendimiento de cada tienda con datos accionables. Analítica + marketing para retail basados en IA, vídeo y big data.",
    images: ["/wp-content/uploads/2026/01/Industries_Retail-1.jpg"],
  },
};

export default async function RetailSector() {
  const caseStudies = await selectCaseCards({ sector: "retail" });
  return <SectorTemplate cfg={{ ...RETAIL_CFG, ...UC_COMMON, caseStudies }} enHref="/en/solution-for-retail-sector/" />;
}
