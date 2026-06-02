import type { Metadata } from "next";
import HomeTemplate, { HomeConfig } from "@/components/templates/HomeTemplate";

export const metadata: Metadata = {
  title: "Home redesign (preview EN) · Flame Analytics",
  description: "Preview of the English home redesign.",
  robots: { index: false, follow: false },
};

const cfg: HomeConfig = {
  heroEyebrow: "AI video analytics",
  heroTitle: "Real-time intelligence for every",
  heroTitleHl: "physical space",
  heroSub: "Flame turns video and guest WiFi from your retail store, shopping mall, hotel or public venue into actionable insight on traffic, conversion, behavior and occupancy. No biometrics. GDPR by design.",
  heroPrimaryCta: "Request a demo",
  heroSecondaryCta: "Explore products",
  heroSecondaryHref: "/en/traffic-insights/",
  heroImage: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  heroImageAlt: "Flame Analytics dashboard in real time",
  stats: [
    { value: "99 %", label: "Counting accuracy" },
    { value: "+500", label: "Stores measured" },
    { value: "12",   label: "Countries" },
    { value: "GDPR", label: "Privacy by design" },
  ],
  productsTitle: "One platform,",
  productsTitleHl: "three products",
  productsSub: "Combine Traffic, Customer Journey and Connect in a single panel to understand what is happening in your spaces — and why.",
  products: [
    { icon: "traffic", tagline: "Traffic and conversion",       name: "Traffic",          desc: "Measure inside and outside traffic and compute true conversion by joining with POS. Compare stores, hours, days and campaigns.", href: "/en/traffic-insights/",  cta: "Discover Traffic" },
    { icon: "journey", tagline: "Journeys and dwell time",      name: "Customer Journey", desc: "Track customer journeys, dwell time and heatmaps by zone. Optimize layout, windows and operations with real data.",       href: "/en/customer-journey/",  cta: "Discover Customer Journey" },
    { icon: "connect", tagline: "WiFi marketing",               name: "Connect",          desc: "Turn guest WiFi into capture, segmentation and activation. Captive portals, enriched leads and measurable campaigns.",       href: "/en/connect/",            cta: "Discover Connect" },
  ],
  bigEyebrow: "Decisions powered by real data",
  bigTitle: "Data that powers your",
  bigTitleHl: "operations",
  bigImage: "/wp-content/uploads/2026/01/People-Counting_recorte.png",
  bigImageAlt: "Flame dashboard with real-time KPIs",
  bigPara1: "Flame unifies traffic, conversion, occupancy and behavior in a single dashboard. Benchmark stores, floors or sites against the same yardstick — without waiting for the month-end report.",
  bigPara2: "Plug into POS, ERP and BI without construction work and without replacing your stack. Your teams keep working where they already do, but with real data instead of guesswork.",
  bigBullets: ["Real time", "Multi-store benchmarking", "POS / ERP integration", "No construction, no cabling"],
  privacyTitle: "Privacy first.",
  privacyTitleHl: "Performance driven.",
  privacySub: "Flame is engineered from day one to comply with GDPR and local regulation. No facial recognition, no individual tracking, no biometrics.",
  privacyPoints: [
    { icon: "privacy",     title: "No biometrics",        desc: "Anonymous person detection. We do not identify faces and do not store individual images." },
    { icon: "eye",         title: "On-edge anonymization", desc: "Processing happens on the device. Only aggregated metrics reach the cloud — never video." },
    { icon: "integration", title: "Frictionless integration", desc: "Native connectors for POS, ERP, BI and data lakes. Open APIs and webhooks for your stack." },
    { icon: "trending",    title: "Measurable results",   desc: "Clear KPIs from week one: traffic, conversion, occupancy, journey. No never-ending projects." },
  ],
  testimonialsIdx: [0, 1, 2, 3, 4, 5, 6, 7],
  faqs: [
    { q: "What do I need to install in my store or venue?", a: "A compatible camera and an internet connection. Flame Hypersensor processes locally and only sends aggregated metrics. <strong>No construction or extra cabling</strong> in most cases." },
    { q: "Is it GDPR compliant?",                            a: "Yes. Flame does not use facial recognition or biometrics. Person detection is anonymous and processing happens on the device. GDPR and local regulation by design." },
    { q: "How long until I see results?",                    a: "First metrics (traffic, occupancy) are available from installation day. Benchmark and trend reports require a 7-14 day baseline." },
    { q: "Does it integrate with my POS, ERP or BI?",        a: "Yes. We have native connectors for major POS systems (Cegid, Microsoft Dynamics, SAP, etc.), ERPs and BI tools (Power BI, Tableau, Looker). Open API and webhooks are also available." },
    { q: "Does it work for hotels and public venues?",       a: "Yes. Beyond retail and shopping malls, Flame operates in hotels, museums, sports venues, transport hubs and public administrations — each sector with its own configuration." },
    { q: "How much does it cost?",                           a: "Pricing depends on the number of cameras and modules. Book a free 20-minute demo and we will send a tailored quote within 48h." },
  ],
  ctaStripBold: "20 minutes to understand what is happening in your space.",
  ctaStripLight: "Personalized demo with your data and your use case.",
};

export default function HomeNewENPage() {
  return <HomeTemplate cfg={cfg} enHref="/preview/home-new/en/" currentLang="en" />;
}
