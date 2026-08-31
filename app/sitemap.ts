import type { MetadataRoute } from "next";
import { getAllPostsAsync, getAllWhitepapers, getAllCategories } from "@/lib/blog";

// Host canónico con www. El apex 308-redirige a www → mantener consistencia
// entre canonical, sitemap y URLs servidas. Hardcodeado para evitar que
// NEXT_PUBLIC_SITE_URL en Vercel (sin www) genere sitemap inconsistente
// con el canonical → GSC rechaza el sitemap por redirects 308.
const BASE = "https://www.flameanalytics.com";

const STATIC_ES = [
  "", "comunidad", "sobre-nosotros", "contacta", "partners", "hypersensor",
  "solucion-para-centros-comerciales", "solucion-para-el-sector-retail", "supermercados", "hoteles", "espacios-publicos", "banca", "transporte-y-aeropuertos",
  "conteo-personas", "analitica-conversion", "analitica-de-colas", "analitica-trafico",
  "comportamiento-del-cliente", "recorrido-del-cliente", "gestion-de-aseos", "gestion-ocupacion",
  "acceso-wifi-corporativo", "marketing-wifi-para-invitados", "connect",
  "informacion-detallada", "piloto", "flame-eventos", "inscripcion-en-eventos", "inscripcion-webinars",
  "politica-de-privacidad", "politica-de-cookies", "politica-de-seguridad-de-la-informacion",
  "condiciones-de-uso",
];
const STATIC_EN = [
  "", "community", "about-us", "contact-us", "partners", "hypersensor",
  "solution-for-shopping-malls", "solution-for-retail-sector", "supermarkets", "hospitality", "public-venues", "banking", "transport-and-airports",
  "people-counting", "conversion-analytics", "queue-analytic", "traffic-insights",
  "customer-behavior", "customer-journey", "restroom-management", "occupancy-management",
  "corporate-wifi-access", "guest-wifi-marketing", "connect",
  "detailed-information", "flame-events",
  "privacy-policy", "cookie-policy", "information-security", "terms-of-use",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const out: MetadataRoute.Sitemap = [];

  // Static pages — SIN lastmod: antes emitían la fecha del build (cada deploy
  // "hoy"), un lastmod falso constante que hace que Google desconfíe del
  // lastmod de TODO el sitemap. Mejor omitirlo donde no hay fecha real y
  // reservar lastmod para posts/whitepapers, que sí la tienen (2026-08-24).
  for (const p of STATIC_ES) out.push({ url: `${BASE}/es/${p}${p ? "/" : ""}`, changeFrequency: "weekly", priority: p === "" ? 1.0 : 0.8 });
  for (const p of STATIC_EN) out.push({ url: `${BASE}/en/${p}${p ? "/" : ""}`, changeFrequency: "weekly", priority: p === "" ? 1.0 : 0.8 });

  // Blog posts ES + EN
  for (const lang of ["es", "en"] as const) {
    for (const post of await getAllPostsAsync(lang)) {
      out.push({
        url: `${BASE}/${lang}/${post.slug}/`,
        lastModified: (post.modified || post.date).split("T")[0],
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

  // Categorías — sin lastmod por la misma razón que las estáticas
  for (const lang of ["es", "en"] as const) {
    const prefix = lang === "es" ? "categoria" : "category";
    for (const c of getAllCategories(lang)) {
      out.push({
        url: `${BASE}/${lang}/${prefix}/${c.slug}/`,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  return out;
}
