import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { ProductConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Traffic · Flame Analytics",
  description: "Turn physical traffic into data-driven business decisions. Flame transforms people movement in your spaces into actionable insight that powers performance.",
};

const cfg: ProductConfig = {
  metaTitle: "Traffic · Flame Analytics",
  metaDescription: "Turn physical traffic into data-driven business decisions. Flame transforms people movement in your spaces into actionable insight that powers performance.",
  heroEyebrow: "Beyond a people counter sensor",
  heroTitle: "Traffic",
  heroSub: "Turn physical traffic into data-driven business decisions. Flame transforms people movement in your spaces into actionable insight that powers performance.",
  heroBullets: ["6 features in 1", "99% accuracy", "+500 stores measured", "No biometrics"],
  benefitsTitle: "Physical traffic =",
  benefitsTitleHl: "business decisions",
  benefitsSub: "Real-time actionable insight to optimize conversion, occupancy and operations.",
  benefits: [
    { icon: "trending", title: "Boost conversion and profitability", desc: "Follow every funnel step — from visits to sales — and act in real time to turn more traffic into measurable results." },
    { icon: "occupancy", title: "Optimize occupancy and experience", desc: "Prevent crowding, manage flow live and measure the real impact of your promotions with precise footfall data." },
    { icon: "users", title: "Drive smarter operations", desc: "Segment traffic by zones, detect peaks and adjust staff and hours to improve efficiency across every location." },
  ],
  featuresTitle: "Discover all our",
  featuresTitleHl: "features",
  featuresSub: "Six modules covering the full traffic cycle: from outdoor passers-by to in-store sales conversion.",
  features: [
    { icon: "count", title: "People counting", intro: "Measure footfall with precision by hour, day, entrance and zone.", desc: "Identify which access points contribute most to traffic and discover behavioral patterns using AI. Predict visitor flows, detect peak hours and days, and benchmark performance across locations using absolute, relative and historical data.", bullets: ["Line in/out counting", "Staff exclusion (tag, app, exclusion zones, IoT button, dwell time)", "Loitering and U-turn detection near entrance", "Group counting", "Zone counting"] },
    { icon: "occupancy", title: "Occupancy", intro: "Monitor live occupancy across your spaces and react instantly to footfall levels.", desc: "Identify trends, anticipate peak moments and automate actions through integration with signage and counting systems. Stay compliant, improve efficiency and increase safety across all locations.", bullets: ["Real-time occupancy control", "Occupancy alerts", "Monitoring from mobile app", "Digital signage integration"] },
    { icon: "street", title: "Street traffic", intro: "Measure outdoor footfall to know how many people pass by and how many actually enter.", desc: "Evaluate your storefront impact, improve window attraction and boost capture rates with data on what is happening outside your venue.", bullets: ["Pedestrian traffic measurement", "Storefront attraction analysis", "Capture rate (passer-by to visitor)"] },
    { icon: "demographics", title: "Demographics", intro: "Anonymous insight on gender and age distribution of your visitors.", desc: "Use this data to personalize experiences, dynamically adapt content and lift conversion through targeted engagement.", bullets: ["Gender detection", "Age group classification", "Digital signage integration"] },
    { icon: "convert", title: "Conversion", intro: "Connect visitor analytics with sales data to reveal the full conversion funnel.", desc: "Track key metrics like capture rate, conversion rate and average ticket by location. Benchmark performance and turn insight into revenue-generating actions.", bullets: ["Sales integration", "Conversion funnel analysis", "Sales conversion rate tracking", "Capture rate (passer-by to customer)"] },
    { icon: "vehicle", title: "Vehicle counting", intro: "Track vehicle flows to understand access patterns, optimize parking and link car traffic with store visits.", desc: "Ideal for shopping centers, retail parks and large venues looking to improve efficiency and overall visitor experience.", bullets: ["Vehicle flow count and tracking", "Entry/exit pattern analysis"] },
  ],
  pillarsTitle: "Why choose",
  pillarsTitleHl: "Flame Traffic",
  pillarsSub: "Four principles that make Flame the traffic platform for companies that scale.",
  pillars: [
    { icon: "integration", title: "Agnostic", desc: "Flame connects with your existing hardware and data sources — CCTV, counters, WiFi or POS — guaranteeing full compatibility and frictionless integration." },
    { icon: "grid", title: "Scalable", desc: "From a single site to thousands, Flame scales effortlessly. Manage every location remotely from a single cloud-based platform." },
    { icon: "compare", title: "Accurate", desc: "Flame proprietary AI delivers accurate and consistent analytics, with decision-ready data across all environments." },
    { icon: "privacy", title: "Privacy", desc: "Flame processes data anonymously without biometric data, ensuring GDPR compliance and full visitor privacy." },
  ],
  testimonialsIdx: [0, 1, 7, 8, 2],
  faqs: [
    { q: "What is footfall analytics and why does it matter in retail?", a: "Footfall analytics measures the movement of people in a physical space, capturing key data like unique visitors, dwell time, flow patterns and behavior. In retail it is fundamental: it lets you make data-driven decisions on layout, staffing, promotion impact and the actual conversion rate from visitor to buyer." },
    { q: "What is zone counting and how can it improve my store layout?", a: "Zone counting divides the physical space into independent areas and measures traffic, dwell time and conversion for each. It surfaces hot zones, underused cold zones and traffic distribution, helping you reorganize layout, reposition products and measure the direct sales impact of every change." },
    { q: "How can footfall data optimize staffing?", a: "Footfall data reveals real visit patterns by hour, weekday and season. Cross-referencing this with shift productivity gives you the optimal staff-to-traffic ratio. Chains using Flame typically reduce labor costs 8 to 15 percent by reassigning shifts to peak demand." },
    { q: "What is retail conversion analytics?", a: "Retail conversion analytics measures the share of store visitors that actually buy. It is the physical equivalent of digital conversion rate. Flame links traffic data (cameras) with POS data to compute real conversion by hour, day, zone and category." },
    { q: "Does weather affect footfall and can analytics account for it?", a: "Weather has a direct measurable impact on foot traffic — rainy days can reduce visits 20 to 40 percent. Flame integrates with weather APIs to correlate traffic with conditions and isolate the weather effect from other factors." },
    { q: "Can traffic data be exported to my BI tools?", a: "Yes. Flame exposes REST APIs, webhooks and native connectors for major BI platforms: Power BI, Looker, Tableau, Snowflake, BigQuery and cloud data lakes." },
  ],
  ctaStripBold: "Turn every camera into an intelligence sensor.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function TrafficInsightsEN() {
  return <ProductTemplate cfg={cfg} enHref="/es/analitica-trafico/" currentLang="en" />;
}
