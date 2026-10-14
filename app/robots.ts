import type { MetadataRoute } from "next";

// Host canónico real (con www). El apex 308-redirige a www.
const BASE = "https://www.flameanalytics.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/ ya NO se bloquea (14-oct-2026): es el CSS/JS que Googlebot y Bingbot
        // necesitan para renderizar; bloquearlo inflaba "Bloqueada por robots.txt" en GSC
        // y en Bing (de ~550 a 1.279). Los ficheros llevan X-Robots-Tag: noindex
        // (next.config.ts) para que no entren al índice.
        disallow: ["/api/", "/admin/", "/preview/"],
      },
      // Crawlers de IA permitidos explícitamente (citaciones LLM RAG en tiempo real)
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
