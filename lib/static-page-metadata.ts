// Helper para generar metadata canónica en páginas estáticas (no posts).
// Centraliza canonical + hreflang + openGraph + twitter cards.

import type { Metadata } from "next";

const SITE = "https://www.flameanalytics.com";
const DEFAULT_OG_IMAGE = "/wp-content/uploads/2026/01/Connect-1-1.png";

export type StaticPageMetaOpts = {
  /** Idioma de la página actual. */
  locale: "es" | "en";
  /** Path relativo de la página actual (con trailing slash). Ej: "/es/sobre-nosotros/". */
  path: string;
  /** Path del equivalente en el otro idioma (con trailing slash). Si no existe, se omite hreflang. */
  altPath?: string;
  /** Title (SEO). 50-60 caracteres óptimo. */
  title: string;
  /** Description (SEO). 150-160 caracteres óptimo. */
  description: string;
  /** Imagen para OG / Twitter. Path relativo o URL absoluta. */
  ogImage?: string;
  /** Tipo OG (default: "website"). */
  ogType?: "website" | "article" | "profile";
  /** robots: noindex, nofollow, etc. */
  robots?: Metadata["robots"];
};

export function staticPageMetadata(opts: StaticPageMetaOpts): Metadata {
  const { locale, path, altPath, title, description, ogImage = DEFAULT_OG_IMAGE, ogType = "website", robots } = opts;
  const otherLocale = locale === "es" ? "en" : "es";
  const images = ogImage.startsWith("http") ? ogImage : `${SITE}${ogImage}`;
  const languages: Record<string, string> = { [locale]: path };
  if (altPath) {
    languages[otherLocale] = altPath;
    languages["x-default"] = locale === "es" ? path : altPath;
  } else {
    languages["x-default"] = path;
  }
  return {
    title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: ogType,
      url: `${SITE}${path}`,
      siteName: "Flame Analytics",
      title,
      description,
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [{ url: images }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [images],
    },
    robots,
  };
}
