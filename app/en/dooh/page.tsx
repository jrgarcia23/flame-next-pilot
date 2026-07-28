import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

const PREVIEW_TOKEN = "jr2026";

// ──────────────────────────────────────────────────────────────────────────
// DOOH · Solution (DRAFT — noindex, not linked from header).
// Validate with JR before publishing. To publish:
//   1) Remove robots: { index: false } below
//   2) Add the link in the header/footer if relevant
//   3) Confirm or replace the hero image (now uses the people counting one)
// ──────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "DOOH Measurement · Retail Media for your screens · Flame Analytics",
  description: "Measure the real audience of your DOOH screens, monetise your inventory and prove ROI to advertisers. Audited metrics, no facial recognition, on top of your existing camera network.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/en/dooh/",
    languages: {
      es: "/es/dooh/",
      en: "/en/dooh/",
      "x-default": "/es/dooh/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/dooh/",
    siteName: "Flame Analytics",
    title: "DOOH Measurement · Retail Media · Flame Analytics",
    description: "Measure the real audience of your DOOH screens, monetise your inventory and prove ROI to advertisers.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOOH Measurement · Retail Media · Flame Analytics",
    description: "Measure the real audience of your DOOH screens, monetise your inventory and prove ROI to advertisers.",
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "DOOH · Flame Analytics",
  metaDescription: "Audited DOOH audience measurement and retail media analytics.",
  heroTitle: "DOOH Measurement",
  heroBgImage: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/landings/dooh-hero-v3.webp",
  heroBgPosition: "center center",
  heroSub: "Turn your digital screens into a real retail media business. Flame measures the audience walking past every screen, proves ROI to brands and delivers the reports you need to share verified data with your advertisers. The same rigor digital advertising already demands, applied to the physical world.",
  heroBullets: ["90+ B2B clients", "12 countries", "On top of your cameras", "No facial recognition"],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Flame Analytics DOOH measurement dashboard",
  bigSectionTitle: "From the CMS playlist to the real",
  bigSectionTitleHl: "impression",
  bigSectionPara1: "Retailers and brands investing in retail media no longer accept estimates. They want to know how many people stood in front of each screen, with what profile, and how many later visited the advertised store.",
  bigSectionPara2: "Flame turns your camera network into an audited measurement layer for your DOOH inventory. No extra hardware, no facial recognition, aggregated and anonymous data under GDPR, and integration with the main signage CMS and DOOH platforms. The venue stops selling estimated impressions and starts selling verified audience.",
  bigSectionBullets: ["Real impressions", "Drive to store", "Anonymous demographics", "Campaign reports"],
  benefitsTitle: "of measuring your DOOH with Flame",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Move from selling screens to selling audiences. The difference between a retail media program that scales and a digital signage network that doesn't is whether you can prove the data.",
  benefits: [
    { icon: "trending",    title: "Raise your inventory price",                  desc: "Sell with audited audience, not estimates. Your rate card stops tracking inflation and starts tracking the real value you deliver." },
    { icon: "convert",     title: "Prove ROI to brands and agencies",            desc: "Measure visits, dwell time and movement between zones. Compare traffic and conversion across pre/post campaign periods, by zone or by store." },
    { icon: "integration", title: "Connect to DOOH and your CMS",                desc: "Analytics layer independent of the hardware and the CMS. We complement any DOOH stack and integrate with the systems you already use." },
    { icon: "privacy",     title: "No facial recognition · GDPR by design",      desc: "No facial recognition, no biometric data, fully compliant with privacy regulations such as GDPR." },
  ],
  metricsTitle: "The metrics you need to",
  metricsTitleHl: "show",
  metricsSub: "Premium brands ask for these. If your rate card can't deliver them, you stay in the filler inventory. Flame measures and reports them per campaign, screen and zone.",
  metrics: [
    { icon: "eye",          title: "Real impression measurement", desc: "How many people were actually in front of each screen at every time of day. No estimates." },
    { icon: "demographics", title: "Customer typology",           desc: "Gender and age band distribution per screen. Aggregated and anonymous, ready to report with full accuracy." },
    { icon: "dwell",        title: "Dwell time and attention",    desc: "Average time in front of the screen and percentage of effective attention. Impression quality, not just quantity." },
    { icon: "convert",      title: "Drive-to-store and lift",     desc: "Incremental visits to the advertised store amongst exposed vs non-exposed visitors. The full loop every advertiser asks for." },
    { icon: "reports",      title: "Campaign reports",            desc: "Report ready to send after every campaign, with the key results per screen and zone." },
  ],
  testimonialsIdx: [6, 3, 2],
  faqs: getFaqs("shopping-malls", "en"),
  ctaStripBold: "Ready to turn your screens into a retail media business?",
  ctaStripLight: "Free DOOH potential audit of your venue. 30 minutes.",
};

export default async function DoohSolutionDraft({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const sp = await searchParams;
  if (sp.preview !== PREVIEW_TOKEN) notFound();
  return <UseCaseTemplate cfg={cfg} enHref={`/en/dooh/?preview=${PREVIEW_TOKEN}`} />;
}
