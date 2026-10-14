// Comparativas EN (briefs SEO #6 y #10, 14-oct-2026) servidas como rutas propias,
// FUERA de data/blog.json. PUBLICADAS el 14-oct-2026 con OK de JR: con `listed: true`
// entran en el listado del blog EN y en relacionados (lib/blog.ts) sin crear otra URL;
// el sitemap las recoge por STATIC_EN (app/sitemap.ts).
//
// ============================ PARA PUBLICARLAS ============================
// 1. En app/en/<slug>/page.tsx de cada pieza: poner DRAFT_NOINDEX = false
//    (o borrar la línea `robots` de generateMetadata).
// 2. En app/sitemap.ts: añadir los dos slugs a STATIC_EN
//    ("best-guest-wifi-marketing-platforms-shopping-centres", "retailnext-alternatives").
// 3. Actualizar `date`/`modified` abajo a la fecha real de publicación.
// 4. Retirar el borrador antiguo `mejor-software-wifi-marketing-2026-comparativa`
//    (sigue en draft en blog.json: no publicarlo aparte, brief #6).
// 5. Enlaces entrantes (brief): desde /en/guest-wifi-marketing/, /en/connect/,
//    /en/solution-for-shopping-malls/ (WiFi) y desde la comparativa de conteo y los
//    dos posts de "retailnext video analytics" (RetailNext alternatives).
// ==========================================================================

import type { BlogPost } from "@/lib/blog";
import { html as wifiHtml } from "@/data/draft-comparisons/best-guest-wifi-marketing-platforms-shopping-centres";
import { html as retailnextHtml } from "@/data/draft-comparisons/retailnext-alternatives";

export type DraftComparison = {
  // true = publicada: aparece en el listado del blog EN (categoría "blog") y en relacionados
  // vía lib/blog.ts (getCategoryListing / getRelatedPosts). Su URL sigue siendo la ruta propia.
  listed: boolean;
  post: BlogPost;
  seoTitle: string;
  seoDescription: string;
};

// Categoría "blog": la misma de los posts EN del listado /en/community/#blog y /en/category/blog/.
const CATEGORY = { slug: "blog", name: "Blog" };

export const DRAFT_COMPARISONS: Record<string, DraftComparison> = {
  "best-guest-wifi-marketing-platforms-shopping-centres": {
    listed: true,
    seoTitle: "Best Guest WiFi Marketing Platforms for Shopping Centres (2026)",
    seoDescription:
      "Purple, Aislelabs, Cloud4Wi and Flame Analytics compared for European shopping centres: captive portal, GDPR consent, CRM integration and visitor analytics.",
    post: {
      id: 990601,
      slug: "best-guest-wifi-marketing-platforms-shopping-centres",
      lang: "en",
      type: "post",
      title: "Best guest WiFi marketing platforms for shopping centres in Europe",
      excerpt:
        "Purple, Aislelabs, Cloud4Wi and Flame Analytics compared for European shopping centres: captive portal, GDPR consent, CRM integration and visitor analytics.",
      html: wifiHtml,
      date: "2026-10-14T10:00:00",
      modified: "2026-10-14T10:00:00",
      hero: "/wp-content/uploads/2026/10/guest-wifi-platforms-cover.webp",
      thumbnail: "/wp-content/uploads/2026/10/guest-wifi-platforms-cover.webp",
      category: CATEGORY,
      link_legacy: "",
    },
  },
  "retailnext-alternatives": {
    listed: true,
    seoTitle: "RetailNext Alternatives in 2026: 5 Options Compared for Europe",
    seoDescription:
      "Looking at RetailNext? Compare Flame Analytics, V-Count, FootfallCam, ShopperTrak and Xovis on technology, existing cameras, GDPR and multi-country deployment.",
    post: {
      id: 991001,
      slug: "retailnext-alternatives",
      lang: "en",
      type: "post",
      title: "RetailNext alternatives: 5 options compared for European retail and shopping centres",
      excerpt:
        "Looking at RetailNext? Compare Flame Analytics, V-Count, FootfallCam, ShopperTrak and Xovis on technology, existing cameras, GDPR and multi-country deployment.",
      html: retailnextHtml,
      // JR 14-oct-2026: fecha antigua para que salga a mitad de la página 2 del listado EN
      // (hueco entre 24-feb-2025 y 3-feb-2025) y fuera del bloque Blog de /en/community/.
      // dateModified (schema) sigue en la publicación real.
      date: "2025-02-14T10:00:00",
      modified: "2026-10-14T10:30:00",
      hero: "/wp-content/uploads/2026/10/retailnext-alternatives-cover.webp",
      thumbnail: "/wp-content/uploads/2026/10/retailnext-alternatives-cover.webp",
      category: CATEGORY,
      link_legacy: "",
    },
  },
};

// Posts publicados para listados (categoría, comunidad y relacionados).
export function listedComparisonPosts(): BlogPost[] {
  return Object.values(DRAFT_COMPARISONS).filter(d => d.listed).map(d => d.post);
}

export function getDraftComparison(slug: string): DraftComparison {
  const d = DRAFT_COMPARISONS[slug];
  if (!d) throw new Error(`Draft comparison not found: ${slug}`);
  return d;
}
