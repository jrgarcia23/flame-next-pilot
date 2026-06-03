import type { Metadata } from "next";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { ABOUT_BODY_HTML, ABOUT_CSS_LINKS } from "@/data/about-body-en";

export const metadata: Metadata = {
  title: "About us · Flame Analytics",
  description: "Flame Analytics: advanced analytics platform for physical spaces. Team, mission, recognition, press and investors.",
  alternates: {
    canonical: "/en/about-us/",
    languages: { es: "/es/sobre-nosotros/", en: "/en/about-us/", "x-default": "/es/sobre-nosotros/" },
  },
};

export default function AboutUsEn() {
  return (
    <>
      {ABOUT_CSS_LINKS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      <CtaStyles />
      <SiteHeader enHref="/es/sobre-nosotros/" currentLang="en" />
      <main dangerouslySetInnerHTML={{ __html: ABOUT_BODY_HTML }} />
      <SiteFooter />
    </>
  );
}
