import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { selectCaseCards } from "@/lib/case-cards";
import { ESPACIOS_CFG, UC_COMMON } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "Espacios públicos · Flame Analytics",
  description: "Mejor experiencia del cliente y rendimiento del lugar. Soluciones de data intelligence para museos, transporte público y universidades con big data e IA.",
  alternates: {
    canonical: "/es/espacios-publicos/",
    languages: {
    es: "/es/espacios-publicos/",
    en: "/en/public-venues/",
    "x-default": "/es/espacios-publicos/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/espacios-publicos/",
    siteName: "Flame Analytics",
    title: "Espacios públicos · Flame Analytics",
    description: "Mejor experiencia del cliente y rendimiento del lugar. Soluciones de data intelligence para museos, transporte público y universidades con big data e IA.",
    locale: "es_ES",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Espacios públicos · Flame Analytics",
    description: "Mejor experiencia del cliente y rendimiento del lugar. Soluciones de data intelligence para museos, transporte público y universidades con big data e IA.",
    images: ["/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg"],
  },
};

export default async function EspaciosPublicosSector() {
  const caseStudies = await selectCaseCards({ sector: "espacios-publicos" });
  return <SectorTemplate cfg={{ ...ESPACIOS_CFG, ...UC_COMMON, caseStudies }} enHref="/en/public-venues/" />;
}
