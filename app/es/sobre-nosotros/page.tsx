import type { Metadata } from "next";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { ABOUT_BODY_HTML, ABOUT_BODY_CLASS, ABOUT_INLINE_CSS, ABOUT_CSS_LINKS } from "@/data/about-body-es";

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
      {/* CSS externos del live (Elementor + theme + plugins necesarios) */}
      {ABOUT_CSS_LINKS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      {/* Inline CSS del head del live (Elementor critical CSS + :root vars + custom CSS) */}
      <style dangerouslySetInnerHTML={{ __html: ABOUT_INLINE_CSS }} />
      <CtaStyles />
      <SiteHeader enHref="/en/about-us/" currentLang="es" />
      {/* Wrapper con las body classes Elementor para que las CSS rules con selectores body.X funcionen */}
      <div className={ABOUT_BODY_CLASS} dangerouslySetInnerHTML={{ __html: ABOUT_BODY_HTML }} />
      <SiteFooter />
    </>
  );
}
