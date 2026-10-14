import type { Metadata } from "next";
import DraftComparisonPage, { draftComparisonMetadata } from "@/components/templates/DraftComparisonPage";
import { getDraftComparison } from "@/lib/draft-comparisons";

// PUBLICADA el 14-oct-2026 con OK de JR (brief SEO).
// Publicada: DRAFT_NOINDEX = false y slug en STATIC_EN de app/sitemap.ts.
// (checklist completo en lib/draft-comparisons.ts).
const DRAFT_NOINDEX = false;

const SLUG = "best-guest-wifi-marketing-platforms-shopping-centres";

export function generateMetadata(): Metadata {
  return draftComparisonMetadata(getDraftComparison(SLUG), DRAFT_NOINDEX);
}

export default function Page() {
  return <DraftComparisonPage d={getDraftComparison(SLUG)} />;
}
