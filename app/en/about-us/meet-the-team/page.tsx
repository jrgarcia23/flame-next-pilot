import type { Metadata } from "next";
import TeamTemplate from "@/components/templates/TeamTemplate";

export const metadata: Metadata = {
  title: "Meet the team · Flame Analytics",
  description: "Experts in big data, retail, consulting, marketing and engineering. Meet the 13 people behind Flame Analytics.",
  alternates: {
    canonical: "/en/about-us/meet-the-team/",
    languages: {
    en: "/en/about-us/meet-the-team/",
    es: "/es/sobre-nosotros/conoce-al-equipo/",
    "x-default": "/es/sobre-nosotros/conoce-al-equipo/",
  },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/about-us/meet-the-team/",
    siteName: "Flame Analytics",
    title: "Meet the team · Flame Analytics",
    description: "Experts in big data, retail, consulting, marketing and engineering. Meet the 13 people behind Flame Analytics.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet the team · Flame Analytics",
    description: "Experts in big data, retail, consulting, marketing and engineering. Meet the 13 people behind Flame Analytics.",
  },
};

export default function MeetTheTeam() {
  return <TeamTemplate currentLang="en" enHref="/es/sobre-nosotros/conoce-al-equipo/" />;
}
