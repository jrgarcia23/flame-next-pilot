// Comparativas EN (briefs SEO #6 y #10, 14-oct-2026) servidas como rutas propias,
// FUERA de data/blog.json: así no aparecen en el listado del blog, en categorías,
// en "posts relacionados" ni en el sitemap mientras JR no dé el OK.
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
  post: BlogPost;
  seoTitle: string;
  seoDescription: string;
};

const CATEGORY = { slug: "tips-retail", name: "Tips" };

export const DRAFT_COMPARISONS: Record<string, DraftComparison> = {
  "best-guest-wifi-marketing-platforms-shopping-centres": {
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
      hero: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2024/01/customer-engagement-guest-wifi-marketing.png",
      thumbnail: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2024/01/customer-engagement-guest-wifi-marketing.png",
      category: CATEGORY,
      link_legacy: "",
    },
  },
  "retailnext-alternatives": {
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
      date: "2026-10-14T10:00:00",
      modified: "2026-10-14T10:00:00",
      hero: "https://www.flameanalytics.com/wp-content/uploads/2026/01/people_counting-1-1-1-scaled-1.png",
      thumbnail: "https://www.flameanalytics.com/wp-content/uploads/2026/01/people_counting-1-1-1-scaled-1.png",
      category: CATEGORY,
      link_legacy: "",
    },
  },
};

export function getDraftComparison(slug: string): DraftComparison {
  const d = DRAFT_COMPARISONS[slug];
  if (!d) throw new Error(`Draft comparison not found: ${slug}`);
  return d;
}
