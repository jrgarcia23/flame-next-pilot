import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

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
  heroBgImage: "/wp-content/uploads/2026/01/people_counting-1-1-1-scaled-1.png",
  heroBgPosition: "center center",
  heroSub: "Turn your digital screens into a real retail media business. Flame measures the audience walking past every screen, proves ROI to brands and delivers the reports your media kit needs to sell to premium advertisers. The same rigor digital advertising already demands, applied to the physical world.",
  heroBullets: ["90+ B2B clients", "12 countries", "On top of your cameras", "No facial recognition"],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Flame Analytics DOOH measurement dashboard",
  bigSectionTitle: "From the CMS playlist to the real",
  bigSectionTitleHl: "impression",
  bigSectionPara1: "Brands investing in retail media no longer buy inventory based on OTS estimated from venue footfall. They want to know how many people were actually in front of your screen during every campaign slot, who they were and how many later visited the advertised store. Flame delivers that audited measurement layer on top of your existing camera network.",
  bigSectionPara2: "When you have that data, your rate card goes up, your pitch to brands has proof, your agency understands what it's buying, and your venue stops being an aspirational media owner and becomes a real one. Everything aggregated, anonymous, with no facial recognition, and compatible with your signage CMS and with pDOOH platforms.",
  bigSectionBullets: ["Real impressions", "Anonymous demographics", "Drive-to-store", "Per-campaign reports"],
  benefitsTitle: "of measuring your DOOH with Flame",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Move from selling screens to selling audiences. The difference between a retail media program that scales and a digital signage network that doesn't is whether you can prove the data.",
  benefits: [
    { icon: "trending",    title: "Raise your inventory price",                  desc: "Sell with audited audience, not estimates. Your rate card stops tracking inflation and starts tracking the real value you deliver." },
    { icon: "convert",     title: "Prove ROI to brands and agencies",            desc: "Drive-to-store, repeat exposure and lift against a control group. The same language those brands already demand from their digital campaigns." },
    { icon: "integration", title: "Connect to pDOOH and your CMS",               desc: "Integration with Broadsign, BrightSign, Scala, Korbyt and programmatic platforms (Hivestack/Perion, VIOOH, Place Exchange). We plug into your stack." },
    { icon: "privacy",     title: "No facial recognition · GDPR by design",      desc: "Aggregated and anonymous data right from the camera. Nothing identifiable leaves the venue. Real compliance, not privacy marketing." },
  ],
  metricsTitle: "The metrics your media kit needs to",
  metricsTitleHl: "show",
  metricsSub: "Premium brands ask for these. If your rate card can't deliver them, you stay in the filler inventory. Flame measures and reports them per campaign, screen and zone.",
  metrics: [
    { icon: "eye",          title: "Real audience impressions",   desc: "Real people in front of each screen during each slot of the campaign — not estimates derived from venue footfall." },
    { icon: "users",        title: "Unique reach and frequency",  desc: "How many unique visitors saw the campaign and how often. The foundation of any retail media plan." },
    { icon: "demographics", title: "Anonymous demographics",      desc: "Gender and age band distribution per screen. Aggregated, no identification, ready to report to the brand." },
    { icon: "dwell",        title: "Dwell time and attention",    desc: "Average time in front of the screen and percentage of effective attention. Impression quality, not just quantity." },
    { icon: "convert",      title: "Drive-to-store and lift",     desc: "Incremental visits to the advertised store amongst exposed vs non-exposed visitors. The full loop every advertiser asks for." },
    { icon: "reports",      title: "Per-campaign reports",        desc: "Output ready to send to the brand and the agency after every campaign: screens, slots, impressions, demographics and outcomes." },
  ],
  testimonialsIdx: [6, 3, 2],
  faqs: getFaqs("shopping-malls", "en"),
  ctaStripBold: "Ready to turn your screens into a retail media business?",
  ctaStripLight: "Free DOOH potential audit of your venue. 30 minutes.",
};

export default function DoohSolutionDraft() {
  return <UseCaseTemplate cfg={cfg} enHref="/en/dooh/" />;
}
