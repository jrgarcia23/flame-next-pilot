import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Customer Behavior · Flame Analytics",
  description: "Turn anonymous movement into deep behavioral insight. Understand paths, dwell times and zone interactions so you can shape better experiences and lift in-store ",
};

const cfg: UseCaseConfig = {
  metaTitle: "Customer Behavior · Flame Analytics",
  metaDescription: "Turn anonymous movement into deep behavioral insight. Understand paths, dwell times and zone interactions so you can shape better experiences and lift in-store ",
  heroBgImage: "/wp-content/uploads/2026/01/Customer_behavior-1-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Customer Behavior",
  heroSub: "Turn anonymous movement into deep behavioral insight. Understand paths, dwell times and zone interactions so you can shape better experiences and lift in-store conversion.",
  heroBullets: ["Flow maps", "Zone interactions", "Dwell times", "No biometrics"],
  imageBigSrc: "/wp-content/uploads/2026/01/Customer_behavior_recorte.png",
  imageBigAlt: "Flame Customer Behavior dashboard",
  bigSectionTitle: "More than movement:",
  bigSectionTitleHl: "actionable behavior",
  bigSectionPara1: "Flame Customer Behavior transforms anonymous movement data into deep behavioral insight. Understand visitor paths and interactions across every zone.",
  bigSectionPara2: "Compare traffic between areas and detect what drives attention or conversion, with privacy-safe AI and intuitive dashboards.",
  bigSectionBullets: ["Visitor flow maps", "Zone interactions", "Zone traffic", "Dwell times"],
  benefitsTitle: "of Customer Behavior",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Turn intuition into action plan: where to optimize, when to intervene, and what truly moves the needle.",
  benefits: [
    { icon: "layout", title: "Design spaces that sell", desc: "Use behavior insights to guide visitors and increase in-store conversion." },
    { icon: "behavior", title: "Boost engagement and interest", desc: "See where attention focuses and refine experiences accordingly." },
    { icon: "convert", title: "Improve sales conversion", desc: "Connect movement, attention and sales to optimize placement and design." },
    { icon: "users", title: "Smart marketing decisions", desc: "Segment by behavior and intent for more relevant offers and loyalty." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Cross visitors with operations and sales to discover actionable patterns.",
  metrics: [
    { icon: "behavior", title: "Floor heatmap", desc: "See where customers concentrate and the hot/cold spots in your space." },
    { icon: "dwell", title: "Average time per zone", desc: "How long each area holds visitor attention." },
    { icon: "journey", title: "Top routes traveled", desc: "The most common paths from entrance to exit." },
    { icon: "compare", title: "Cold zones detected", desc: "Underused areas that need rethinking." },
    { icon: "demographics", title: "Aggregate demographics", desc: "Age and gender breakdown, no individual identification." },
    { icon: "calendar", title: "Behavior by hour", desc: "Behavioral changes throughout the day." },
  ],
  testimonialsIdx: [0, 1, 2, 5, 6],
  faqs: [
    { q: "Does this require facial recognition?", a: "No. Flame uses anonymous silhouette detection and movement tracking. There is no facial recognition or biometric data at any point." },
    { q: "What insights can we get?", a: "Heatmaps by floor, top routes, time per zone, interactions between areas, demographic mix and hour-by-hour behavior — all anonymous and aggregate." },
    { q: "Can we measure the impact of layout changes?", a: "Yes. Compare behavior before and after a layout change to quantify the lift in dwell time, conversion or zone traffic." },
    { q: "How is data presented?", a: "Through dashboards with heatmaps, flow maps (Sankey), zone interaction matrices and time-series charts. Exportable to BI tools via API." },
    { q: "Is it GDPR compliant?", a: "Yes. 100% privacy-by-design: anonymous silhouettes, aggregate output, no individual tracking. ISO 27001 certified." },
  ],
  ctaStripBold: "Design spaces that sell, not spaces that just exist.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function CustomerBehaviorEN() {
  return <UseCaseTemplate cfg={cfg} enHref="/es/customer-behavior/" currentLang="en" />;
}
