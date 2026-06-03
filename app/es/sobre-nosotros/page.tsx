import type { Metadata } from "next";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { ABOUT_BODY_HTML, ABOUT_CSS_LINKS } from "@/data/about-body-es";

export const metadata: Metadata = {
  title: "Quiénes somos · Flame Analytics",
  description: "Flame Analytics: plataforma de análisis avanzado para espacios físicos. Equipo, misión, reconocimientos, prensa e inversores.",
  alternates: {
    canonical: "/es/sobre-nosotros/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

export default function SobreNosotrosEs() {
  return (
    <>
      {/* CSS de Elementor del live para que el body clonado renderice idéntico */}
      {ABOUT_CSS_LINKS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <CtaStyles />
      <SiteHeader enHref="/en/about-us/" currentLang="es" />
      <main dangerouslySetInnerHTML={{ __html: ABOUT_BODY_HTML }} />
      <SiteFooter />
    </>
  );
}
