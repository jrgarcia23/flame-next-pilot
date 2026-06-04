import type { MetadataRoute } from "next";
import { getAllPosts, getAllWhitepapers, getAllCategories } from "@/lib/blog";

// Host canónico con www. El apex 308-redirige a www → mantener consistencia
// entre canonical, sitemap y URLs servidas.
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.flameanalytics.com";

const STATIC_ES = [
  "", "comunidad", "sobre-nosotros", "contacta", "partners", "hypersensor",
  "solucion-para-centros-comerciales", "solucion-para-el-sector-retail", "hoteles", "espacios-publicos",
  "cuenta-personas", "analitica-conversion", "analitica-de-colas", "analitica-trafico",
  "customer-behavior", "customer-journey", "gestion-de-aseos", "gestion-ocupacion",
  "acceso-wifi-corporativo", "marketing-wifi-para-invitados", "connect",
  "informacion-detallada", "piloto", "flame-eventos", "inscripcion-en-eventos", "inscripcion-webinars",
  "politica-de-privacidad", "politica-de-cookies", "politica-de-seguridad-de-la-informacion",
  "condiciones-de-uso",
];
const STATIC_EN = [
  "", "community", "about-us", "contact-us", "partners", "hypersensor",
  "solution-for-shopping-malls", "solution-for-retail-sector", "hospitality", "public-venues",
  "people-counting", "conversion-analytics", "queue-analytic", "traffic-insights",
  "customer-behavior", "customer-journey", "restroom-management", "occupancy-management",
  "corporate-wifi-access", "guest-wifi-marketing", "connect",
  "detailed-information", "flame-events",
  "privacy-policy", "cookie-policy", "information-security", "terms-of-use",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split("T")[0];
  const out: MetadataRoute.Sitemap = [];

  // Static pages
  for (const p of STATIC_ES) out.push({ url: `${BASE}/es/${p}${p ? "/" : ""}`, lastModified: today, changeFrequency: "weekly", priority: p === "" ? 1.0 : 0.8 });
  for (const p of STATIC_EN) out.push({ url: `${BASE}/en/${p}${p ? "/" : ""}`, lastModified: today, changeFrequency: "weekly", priority: p === "" ? 1.0 : 0.8 });

  // Blog posts ES + EN
  for (const lang of ["es", "en"] as const) {
    for (const post of getAllPosts(lang)) {
      out.push({
        url: `${BASE}/${lang}/${post.slug}/`,
        lastModified: post.modified.split("T")[0],
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Whitepapers ES + EN
  for (const lang of ["es", "en"] as const) {
    for (const wp of getAllWhitepapers(lang)) {
      out.push({
        url: `${BASE}/${lang}/whitepaper/${wp.slug}/`,
        lastModified: wp.modified.split("T")[0],
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  // Categorías
  for (const lang of ["es", "en"] as const) {
    const prefix = lang === "es" ? "categoria" : "category";
    for (const c of getAllCategories(lang)) {
      out.push({
        url: `${BASE}/${lang}/${prefix}/${c.slug}/`,
        lastModified: today,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  return out;
}
