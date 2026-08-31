import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SUPERMERCADOS_CFG_EN } from "@/lib/sector-configs-en";

const CDN = "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/landings";

export const metadata: Metadata = {
  title: "Data Intelligence for Supermarkets · Flame Analytics",
  description: "Optimise layout, operations and conversion in your supermarket. Advanced analytics solutions combining video and AI to understand customers, improve performance and connect with visitors.",
  alternates: {
    canonical: "/en/supermarkets/",
    languages: {
      es: "/es/supermercados/",
      en: "/en/supermarkets/",
      "x-default": "/es/supermercados/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/supermarkets/",
    siteName: "Flame Analytics",
    title: "Data Intelligence for Supermarkets · Flame Analytics",
    description: "Optimise layout, operations and conversion in your supermarket with Flame's advanced analytics platform.",
    locale: "en_US",
    images: [{ url: `${CDN}/supermercados-hero.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence for Supermarkets · Flame Analytics",
    description: "Optimise layout, operations and conversion in your supermarket with Flame's advanced analytics platform.",
    images: [`${CDN}/supermercados-hero.png`],
  },
};

export default function SupermarketsSectorEN() {
  return <SectorTemplate cfg={SUPERMERCADOS_CFG_EN} enHref="/es/supermercados/" currentLang="en" />;
}
