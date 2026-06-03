import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "People Counting · Flame Analytics",
  description: "Measure footfall across entrances, floors and venues with AI-powered video analytics. Get the visibility you need to optimize operations, plan resources efficie",
};

const cfg: UseCaseConfig = {
  metaTitle: "People Counting · Flame Analytics",
  metaDescription: "Measure footfall across entrances, floors and venues with AI-powered video analytics. Get the visibility you need to optimize operations, plan resources efficie",
  heroBgImage: "/wp-content/uploads/2026/01/people_counting-1-1-1-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "People Counting",
  heroSub: "Measure footfall across entrances, floors and venues with AI-powered video analytics. Get the visibility you need to optimize operations, plan resources efficiently and boost conversion across every physical space.",
  heroBullets: ["99% accuracy", "+500 stores measured", "12 countries", "No biometrics"],
  imageBigSrc: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  imageBigAlt: "Flame People Counting dashboard",
  bigSectionTitle: "Beyond counting:",
  bigSectionTitleHl: "intelligence on your footfall",
  bigSectionPara1: "Flame People Counting turns raw counts into actionable insight. Explore trends, compare locations and monitor visitor flow through intuitive dashboards built for operations and marketing teams.",
  bigSectionPara2: "Real-time decisions, with precision and privacy built in. No construction, no biometrics. Works with your existing POS, ERP and BI stack.",
  bigSectionBullets: ["Street traffic", "Venue traffic", "Capture rate", "Staff exclusion"],
  benefitsTitle: "of People Counting",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Turn intuition into action plan: where to optimize, when to intervene, and what truly moves the needle.",
  benefits: [
    { icon: "eye", title: "Understand your real footfall", desc: "Full visibility on how many people visit, when, and how trends evolve over time." },
    { icon: "users", title: "Efficient staffing and operations", desc: "Plan shifts and service levels based on real data. Cut waste, keep service high." },
    { icon: "grid", title: "Compare locations easily", desc: "Benchmark stores, floors and networks to surface best practices and gaps." },
    { icon: "trending", title: "Boost conversion and profitability", desc: "Link visitor data with sales and unlock the actions that lift ROI." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Cross visitors with operations and sales to discover actionable patterns.",
  metrics: [
    { icon: "clock", title: "Total and hourly footfall", desc: "Real visits day by day, hour by hour. Spot real peaks and valleys." },
    { icon: "convert", title: "Visit-to-sale conversion rate", desc: "Cross traffic with POS. Know what % of visitors actually buys." },
    { icon: "calendar", title: "Weekly patterns and peak hours", desc: "Identify critical moments to align staff and stock." },
    { icon: "compare", title: "Store-to-store benchmark", desc: "Find top stores and replicate their playbook across the network." },
    { icon: "dwell", title: "Average time in store", desc: "Key indicator of engagement and store experience." },
    { icon: "ratio", title: "Staff-to-traffic ratio", desc: "Right-size staff per shift. Reduce mis-allocated hours." },
  ],
  testimonialsIdx: [0, 1, 2, 5, 6],
  faqs: getFaqs("people-counting", "en"),
  ctaStripBold: "Start counting visitors with real accuracy.",
  ctaStripLight: "Live people counting in 7 days.",
};

export default function PeopleCountingEN() {
  return <UseCaseTemplate cfg={cfg} enHref="/es/cuenta-personas/" currentLang="en" />;
}
