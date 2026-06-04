import type { Metadata } from "next";
import TeamTemplate from "@/components/templates/TeamTemplate";

export const metadata: Metadata = {
  title: "Conoce al equipo · Flame Analytics",
  description: "Expertos en big data, retail, consultoría, marketing e ingeniería. Conoce a las 13 personas detrás de Flame Analytics.",
  alternates: {
    canonical: "/es/sobre-nosotros/conoce-al-equipo/",
    languages: {
    es: "/es/sobre-nosotros/conoce-al-equipo/",
    en: "/en/about-us/meet-the-team/",
    "x-default": "/es/sobre-nosotros/conoce-al-equipo/",
  },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/es/sobre-nosotros/conoce-al-equipo/",
    siteName: "Flame Analytics",
    title: "Conoce al equipo · Flame Analytics",
    description: "Expertos en big data, retail, consultoría, marketing e ingeniería. Conoce a las 13 personas detrás de Flame Analytics.",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conoce al equipo · Flame Analytics",
    description: "Expertos en big data, retail, consultoría, marketing e ingeniería. Conoce a las 13 personas detrás de Flame Analytics.",
  },
};

export default function ConoceAlEquipo() {
  return <TeamTemplate currentLang="es" enHref="/en/about-us/meet-the-team/" />;
}
