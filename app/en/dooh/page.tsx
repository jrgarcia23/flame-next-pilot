import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

// ──────────────────────────────────────────────────────────────────────────
// DOOH · Use case (DRAFT — noindex, not linked from header).
// Validate with JR before publishing. To publish:
//   1) Remove robots: { index: false } below
//   2) Add the link in the header/footer if relevant
//   3) Confirm or replace the hero image (currently uses the malls one)
// ──────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "DOOH Measurement · Retail Media for Shopping Malls · Flame Analytics",
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
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DOOH Measurement · Retail Media · Flame Analytics",
    description: "Measure the real audience of your DOOH screens, monetise your inventory and prove ROI to advertisers.",
    images: ["/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "DOOH · Flame Analytics",
  metaDescription: "Measure the real audience of your DOOH screens and monetise your inventory with audited data.",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Measure the real audience of your DOOH screens and monetise your inventory",
  heroSub: "Digital advertising has been measurable for years. In-venue DOOH advertising hasn't. Flame gives shopping malls, retailers and media owners the measurement layer they need to sell their inventory to premium brands: real impressions, unique reach, frequency, demographics and drive-to-store attribution. Audited. On top of your existing camera infrastructure. No facial recognition.",
  pillars: [
    { title: "Measure",   desc: "Real audience in front of every screen, in real time. Impressions, unique reach, frequency, dwell time and anonymous demographics (age and gender).", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Monetise",  desc: "Package and sell your inventory using metrics that brands and agencies understand and demand. Same rigor as digital — applied to the physical world.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Prove",     desc: "Connect every campaign to real visitor behaviour: who saw it, how many times, how many later visited the advertised store.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-malls.png",
      imgAlt: "Turn your screens into a measurable media asset",
      title: "Turn your screens into a measurable",
      titleHl: "media asset",
      bullets: [
        "Real audience impressions per screen, not CMS estimates. The metric every retail media buyer expects today.",
        "Unique reach, frequency, dwell time, share of voice and demographic mix (age and gender) per screen, zone or circuit.",
        "Aggregated and anonymous by design. No facial recognition, no identification of individuals. GDPR by design.",
        "Reports ready for your media kit and to send to advertisers and agencies after every campaign.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-malls.png",
      imgAlt: "Prove ROI to brands",
      title: "Prove real ROI to brands and their",
      titleHl: "agencies",
      bullets: [
        "Drive-to-store: incremental visits to the advertised store amongst exposed visitors compared to non-exposed.",
        "Campaign attribution: link the creative played, the spot, the screen and the audience to the visitor behaviour that follows inside the venue.",
        "Brand uplift and repeat: how often a single visitor has seen the campaign across their journey through the venue.",
        "Lift against control groups: replicate the measurement model brands already demand in their digital and retail media campaigns.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-malls.png",
      imgAlt: "Deploy over existing infrastructure",
      title: "Fast deployment over your existing",
      titleHl: "infrastructure",
      bullets: [
        "Works with your existing camera network. We don't force you to swap hardware or double the investment you already made in VMS.",
        "On-site processing when you need it, cloud when it helps. You decide where the data lives.",
        "Integration with your signage CMS (Broadsign, BrightSign, Scala, Korbyt…) and with pDOOH platforms (Hivestack/Perion, VIOOH, Place Exchange).",
        "Retail media support and consultancy team in English and Spanish — not a canned ticket system across time zones.",
      ],
    },
  ],
  productsTitle: "Three products to build your",
  productsTitleHl: "retail media network",
  productsSub: "Flame's measurement layer is built on three products already deployed across 90+ clients in 12 countries. What's different for DOOH is how we combine them and the reports we deliver to the brands.",
  productsBullets: [
    "Measure your inventory and audience",
    "Prove the impact of each campaign",
    "Activate loyalty programs and first-party data",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc: "Real audience, dwell time, occupancy and anonymous demographics per screen. The foundation of your auditable impressions and your rate card.",
      href: "/en/people-counting/",
      cta: "See Traffic",
      title: "Traffic",
      img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc: "Path and behaviour of visitors exposed to a campaign. Drive-to-store, frequency and trajectories to prove lift to brands.",
      href: "/en/customer-behavior/",
      cta: "See Customer Journey",
      title: "Customer Journey",
      img: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/Group-1.png",
      name: "Connect",
      desc: "First-party visitor data via guest WiFi and venue loyalty. Activate personalised DOOH campaigns and re-engage exposed visitors via mobile or email.",
      href: "/en/guest-wifi-marketing/",
      cta: "See Connect",
      title: "Connect",
      img: "/wp-content/uploads/2026/01/Group-1.png",
    },
  ],
  testimonialsIdx: [0, 1, 7, 8],
  faqs: getFaqs("shopping-malls", "en"),
  ctaStripBold: "Ready to turn your screens into a retail media business?",
  ctaStripLight: "Free DOOH potential audit of your venue. 30 minutes.",
};

export default function DoohSectorDraft() {
  return <SectorTemplate cfg={cfg} enHref="/en/dooh/" />;
}
