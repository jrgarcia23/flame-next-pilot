import type { MetadataRoute } from "next";

// Host canónico real (con www). El apex 308-redirige a www.
const BASE = "https://www.flameanalytics.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/preview/"],
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
