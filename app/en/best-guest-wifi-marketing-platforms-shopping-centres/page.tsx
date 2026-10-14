import type { Metadata } from "next";
import DraftComparisonPage, { draftComparisonMetadata } from "@/components/templates/DraftComparisonPage";
import { getDraftComparison } from "@/lib/draft-comparisons";

// BORRADOR pendiente del OK de JR (brief SEO, 14-oct-2026).
// PARA PUBLICAR: poner DRAFT_NOINDEX = false y añadir el slug a STATIC_EN en app/sitemap.ts
// (checklist completo en lib/draft-comparisons.ts).
const DRAFT_NOINDEX = true;

const SLUG = "best-guest-wifi-marketing-platforms-shopping-centres";

export function generateMetadata(): Metadata {
  return draftComparisonMetadata(getDraftComparison(SLUG), DRAFT_NOINDEX);
}

export default function Page() {
  return <DraftComparisonPage d={getDraftComparison(SLUG)} />;
}
