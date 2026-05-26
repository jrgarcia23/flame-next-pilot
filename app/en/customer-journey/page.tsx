import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { ProductConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Customer Journey · Flame Analytics",
  description: "Analyze and improve shopping experiences and customer flow through advanced behavioral insights. Optimize layout, boost engagement and measure the full visitor ",
};

const cfg: ProductConfig = {
  metaTitle: "Customer Journey · Flame Analytics",
  metaDescription: "Analyze and improve shopping experiences and customer flow through advanced behavioral insights. Optimize layout, boost engagement and measure the full visitor ",
  heroBgImage: "/wp-content/uploads/2026/01/Customer_journey2-scaled-1.png",
  heroEyebrow: "Turn visitor behavior into better experiences",
  heroTitle: "Customer Journey",
  heroSub: "Analyze and improve shopping experiences and customer flow through advanced behavioral insights. Optimize layout, boost engagement and measure the full visitor journey, from entry to conversion.",
  heroBullets: ["7 features in 1", "Flow maps", "Real-time <60s", "No biometrics"],
  benefitsTitle: "Customer Journey connects",
  benefitsTitleHl: "movement and outcome",
  benefitsSub: "Every step of the visitor explained: where, how long, what attracts and how the journey ends.",
  benefits: [
    { icon: "behavior", title: "Optimize store design", desc: "Use movement patterns and dwell time data to design smarter layouts, place products effectively and improve traffic flow." },
    { icon: "trending", title: "Boost performance", desc: "Track the full visitor journey, link every interaction to business outcomes and discover where to generate more value." },
    { icon: "users", title: "Understand segments", desc: "Differentiate behavior by visitor type — recurring, occasional or passer-by — and tailor your strategy to each profile." },
  ],
  featuresTitle: "Discover all our",
  featuresTitleHl: "features",
  featuresSub: "The AI video analytics platform that optimizes decisions and maximizes your value and sales.",
  features: [
    { icon: "journey", title: "Visitor flow maps", intro: "Visualize how visitors move through your space, from entrances to key zones.", desc: "Use these insights to optimize layouts, smooth traffic flow, improve signage strategy and create frictionless journeys that boost engagement and conversion.", bullets: ["Entry to key-zone flows", "Journey Sankey diagrams", "Signage optimization", "Friction reduction"] },
    { icon: "integration", title: "Zone interaction", intro: "Analyze how each zone connects with the rest by measuring inbound and outbound traffic.", desc: "Understand which areas attract visitors, which generate flow and how movement is distributed across your space. Use this data to optimize layout, improve signage and maximize zone-to-zone conversion.", bullets: ["Zone inbound traffic", "Zone outbound traffic", "Inter-zone attraction", "Inter-zone conversion"] },
    { icon: "dwell", title: "Zone traffic and dwell time", intro: "Measure how visitors move and how long they stay in each zone.", desc: "Identify high-traffic areas, optimize layout and displays, and understand engagement levels to improve flow, visibility and overall performance.", bullets: ["Zone traffic", "Average dwell time", "Top hotspots", "Cold zone identification"] },
    { icon: "convert", title: "Zone conversion", intro: "Go beyond traditional sales conversion by measuring zone-level performance.", desc: "Connect Flame to your POS to link traffic with transactions, or analyze conversion directly from in-store behavior — from zone visits to checkout to staff interactions.", bullets: ["POS integration", "Zone conversion", "Sale attribution", "Behavior-based analysis (no POS)"] },
    { icon: "behavior", title: "Heatmaps", intro: "Monitor how customers interact with your space through detailed heatmaps that highlight movement density and dwell time.", desc: "Detect high-traffic areas, optimize underused zones and make informed decisions to improve store design, product placement and customer experience.", bullets: ["Floor heatmap", "Movement density", "Dwell time", "Time comparison"] },
    { icon: "queue", title: "Queue analysis", intro: "Monitor queues in real time, anticipate service needs and act before problems escalate.", desc: "Reduce waits and avoid visitor loss by tracking queue length, occupancy and staff efficiency, ensuring a smoother checkout across all locations.", bullets: ["Queue occupancy", "Size monitoring", "Wait time measurement", "Alerts and digital signage integration"] },
    { icon: "clock", title: "Visit duration", intro: "Measure how long visitors stay to evaluate engagement, layout effectiveness and sales potential.", desc: "Visit duration is a key behavior signal. Optimize product placement, staff allocation and promotions based on how people actually move and dwell.", bullets: ["Average visit duration", "Correlation with conversion", "Store comparisons", "Historical benchmarks"] },
  ],
  pillarsTitle: "Why choose",
  pillarsTitleHl: "Flame Customer Journey",
  pillarsSub: "Four principles that make Flame the customer journey platform for companies that scale.",
  pillars: [
    { icon: "integration", title: "Agnostic", desc: "Flame connects with your existing hardware and data sources — CCTV, counters, WiFi or POS — guaranteeing full compatibility and frictionless integration." },
    { icon: "grid", title: "Scalable", desc: "From a single site to thousands, Flame scales effortlessly. Manage every location remotely from a single cloud-based platform." },
    { icon: "compare", title: "Accurate", desc: "Flame proprietary AI delivers accurate and consistent analytics, with decision-ready data across all environments." },
    { icon: "privacy", title: "Privacy", desc: "Flame processes data anonymously without biometric data, ensuring GDPR compliance and full visitor privacy." },
  ],
  testimonialsIdx: [0, 1, 7, 8, 2],
  faqs: [
    { q: "What sets Customer Journey apart from traditional heatmaps?", a: "Traditional heatmaps only show concentration of presence. Customer Journey adds sequence, time and attribution: the order zones are visited, how long is spent in each and whether the visit ended in purchase." },
    { q: "Does it work in large multi-floor venues?", a: "Yes, especially well. Flame merges data from multiple cameras into a unified view of the full journey, even across floors. Useful for large venues and shopping centers." },
    { q: "How does it identify recurring visitors without biometrics?", a: "Through aggregate behavior patterns: visit frequency, observed WiFi devices and habitual hours. No individual identification — just visitor typology like recurring vs. occasional." },
    { q: "Does it work in low-light environments?", a: "Yes. Flame AI models are trained for variable conditions (cinemas, nighttime venues, outdoors at different hours). Accuracy stays above 90 percent in standard low-light scenarios." },
    { q: "Is it GDPR compliant?", a: "One hundred percent. No biometrics, no facial recognition, no individual identification. Only anonymous silhouettes and statistical aggregates. Approved by DPOs in European deployments." },
    { q: "How long does implementation take?", a: "After signing: 5 to 7 days for basic data, 2 to 4 weeks for fine journey calibration. POS integration typically adds 1 to 2 weeks." },
  ],
  ctaStripBold: "Design spaces that sell, not spaces that just take up room.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function CustomerJourneyEN() {
  return <ProductTemplate cfg={cfg} enHref="/es/customer-journey/" currentLang="en" />;
}
