import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { ESPACIOS_CFG_EN } from "@/lib/sector-configs-en";

export const metadata: Metadata = {
  title: "Public Venues · Flame Analytics",
  description: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solut",
  alternates: {
    canonical: "/en/public-venues/",
    languages: {
    en: "/en/public-venues/",
    es: "/es/espacios-publicos/",
    "x-default": "/es/espacios-publicos/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/public-venues/",
    siteName: "Flame Analytics",
    title: "Public Venues · Flame Analytics",
    description: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solut",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Public Venues · Flame Analytics",
    description: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solut",
    images: ["/wp-content/uploads/2026/01/Industries_Public_venues-1.jpg"],
  },
};

export default function PublicVenuesSectorEN() {
  return <SectorTemplate cfg={ESPACIOS_CFG_EN} enHref="/es/espacios-publicos/" currentLang="en" />;
}
