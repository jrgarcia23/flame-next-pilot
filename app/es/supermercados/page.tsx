import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SUPERMERCADOS_CFG } from "@/lib/sector-preview-configs";

const CDN = "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/landings";

export const metadata: Metadata = {
  title: "Data Intelligence para Supermercados · Flame Analytics",
  description: "Optimiza layout, operación y conversión en supermercados con analítica de vídeo e IA: entiende al cliente y mejora el rendimiento.",
  alternates: {
    canonical: "/es/supermercados/",
    languages: {
      es: "/es/supermercados/",
      en: "/en/supermarkets/",
      "x-default": "/es/supermercados/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/supermercados/",
    siteName: "Flame Analytics",
    title: "Data Intelligence para Supermercados · Flame Analytics",
    description: "Optimiza el layout, la operación y la conversión en supermercado con la plataforma de analítica avanzada de Flame.",
    locale: "es_ES",
    images: [{ url: `${CDN}/supermercados-hero.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence para Supermercados · Flame Analytics",
    description: "Optimiza el layout, la operación y la conversión en supermercado con la plataforma de analítica avanzada de Flame.",
    images: [`${CDN}/supermercados-hero.png`],
  },
};

export default function SupermercadosSector() {
  return <SectorTemplate cfg={SUPERMERCADOS_CFG} enHref="/en/supermarkets/" />;
}
