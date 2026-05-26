import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import { ProductConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Connect · Flame Analytics",
  description: "Transforms guest WiFi into a powerful marketing channel. Engage visitors in physical spaces, capture contact data and trigger personalized campaigns based on lo",
};

const cfg: ProductConfig = {
  metaTitle: "Connect · Flame Analytics",
  metaDescription: "Transforms guest WiFi into a powerful marketing channel. Engage visitors in physical spaces, capture contact data and trigger personalized campaigns based on lo",
  heroBgImage: "/wp-content/uploads/2026/01/Connect-1-1.png",
  heroEyebrow: "WiFi that drives loyalty and return",
  heroTitle: "Connect",
  heroSub: "Transforms guest WiFi into a powerful marketing channel. Engage visitors in physical spaces, capture contact data and trigger personalized campaigns based on location, frequency and behavior.",
  heroBullets: ["5 features in 1", "Branded portal", "Location marketing", "100% GDPR"],
  benefitsTitle: "Connect: from WiFi access",
  benefitsTitleHl: "to loyalty",
  benefitsSub: "Every connected visitor is a potential lead. Capture, segment and re-engage with real value.",
  benefits: [
    { icon: "wifi", title: "Data capture", desc: "Collect consent-based customer profiles via guest WiFi. Build your own first-party database to understand visitors and power data-driven marketing." },
    { icon: "trending", title: "Engage at the right moment", desc: "Trigger automated campaigns based on visits, geolocation or behavior, synced with your CRM and existing marketing stack." },
    { icon: "convert", title: "Boost conversion", desc: "Turn WiFi access into opportunity: coupons, discounts, loyalty, app install. Measure the funnel from capture to conversion to retention." },
  ],
  featuresTitle: "Discover all our",
  featuresTitleHl: "features",
  featuresSub: "The AI video analytics platform that optimizes decisions and maximizes your value and sales.",
  features: [
    { icon: "wifi", title: "Guest WiFi portal", intro: "Design and deploy fully customizable captive portals with branded landing pages, social login, consent management and dynamic connection flows.", desc: "Build custom forms to capture first-party data easily while delivering a smooth and secure login experience. Manage multiple locations from a single interface and adapt content or design per site.", bullets: ["Branded portals", "Social and email login", "Consent management", "Multi-location with per-site customization"] },
    { icon: "trending", title: "Location marketing", intro: "Intelligently segment audiences and launch automated data-driven campaigns via email, SMS or in-portal messages.", desc: "Build custom workflows triggered by behavior, visit frequency or location to send the right message at the right moment. Combine audience segmentation with location-based marketing to increase engagement, loyalty and conversion.", bullets: ["Email + SMS + in-portal", "Behavior triggers", "Location segmentation", "Automated campaigns"] },
    { icon: "integration", title: "Ecosystem integration", intro: "Integrate Connect seamlessly with your existing marketing ecosystem, CRM, PMS and BI systems to sync customer data and enrich profiles in real time.", desc: "Connect bridges physical and digital channels, enabling unified marketing automation and performance tracking. Use APIs and webhooks to expand connectivity with your favorite tools and streamline operations across teams.", bullets: ["CRM (HubSpot, Salesforce, Brevo)", "Hotel PMS", "BI (Power BI, Looker)", "Open APIs and webhooks"] },
    { icon: "corp", title: "Corporate WiFi access", intro: "Anonymous insight on gender and age distribution of your visitors.", desc: "Use this data to personalize experiences, dynamically adapt content and lift conversion through targeted engagement.", bullets: ["Gender detection", "Age segmentation", "Digital signage integration"] },
    { icon: "connect", title: "Mobile SDK", intro: "Embed WiFi connectivity directly into your mobile app with the Connect SDK to deliver a truly seamless, frictionless experience.", desc: "Enable automatic recognition and access for recurring users, trigger real-time interactions and collect consent-based data fluidly. The SDK lets brands extend Connect into their own mobile ecosystem, blending connectivity, engagement and analytics into one customer experience.", bullets: ["iOS and Android SDK", "Automatic recognition", "Real-time activation", "Engagement + analytics"] },
  ],
  pillarsTitle: "Why choose",
  pillarsTitleHl: "Flame Connect",
  pillarsSub: "Four principles that make Flame the connect platform for companies that scale.",
  pillars: [
    { icon: "integration", title: "Agnostic", desc: "Flame connects with your existing hardware and data sources — CCTV, counters, WiFi or POS — guaranteeing full compatibility and frictionless integration." },
    { icon: "grid", title: "Scalable", desc: "From a single site to thousands, Flame scales effortlessly. Manage every location remotely from a single cloud-based platform." },
    { icon: "compare", title: "Accurate", desc: "Flame proprietary AI delivers accurate and consistent analytics, with decision-ready data across all environments." },
    { icon: "privacy", title: "Privacy", desc: "Flame processes data anonymously without biometric data, ensuring GDPR compliance and full visitor privacy." },
  ],
  testimonialsIdx: [0, 1, 7, 8, 2],
  faqs: [
    { q: "Is it compatible with my current WiFi infrastructure?", a: "Yes. Flame Connect integrates with major network vendors (Cisco, Aruba, Ruckus, Cambium, Ubiquiti, etc.) via standard RADIUS, WPA Enterprise or HTTP redirect protocols." },
    { q: "What email capture rate can we achieve?", a: "With a well-designed portal and a clear incentive (free WiFi, coupon, exclusive content), typical rates are 25 to 40 percent. Without incentive, 8 to 15 percent. Flame includes industry-optimized templates." },
    { q: "How is GDPR consent managed?", a: "Granular consent in the portal: visitors choose what they share and for which purposes. Optional double opt-in. Right to be forgotten with automatic deletion upon request." },
    { q: "Does it support multiple languages?", a: "Yes. Automatic device language detection plus configurable translation to 20+ languages. Each portal can have different variants per language with localized copy." },
    { q: "How much does it cost?", a: "Pricing by number of access points. For a venue with 2 to 3 APs, typically 80 to 150 EUR per month including portal, capture, basic automation and CRM sync. Volume pricing for large networks." },
    { q: "What about MAC randomization?", a: "Flame is optimized for environments with MAC randomization (iOS 14+, Android 11+). Returning visitor identification is based on registered email and behavior patterns, not MAC." },
  ],
  ctaStripBold: "Your WiFi is more than a utility — it's your most underused marketing channel.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function ConnectEN() {
  return <ProductTemplate cfg={cfg} enHref="/es/connect/" currentLang="en" />;
}
