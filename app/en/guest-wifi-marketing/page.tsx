import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Guest WiFi Marketing · Flame Analytics",
  description: "Turn connectivity into engagement. Combine a fully customizable captive portal builder with marketing automation to convert WiFi access into measurable marketin",
};

const cfg: UseCaseConfig = {
  metaTitle: "Guest WiFi Marketing · Flame Analytics",
  metaDescription: "Turn connectivity into engagement. Combine a fully customizable captive portal builder with marketing automation to convert WiFi access into measurable marketin",
  heroBgImage: "/wp-content/uploads/2026/01/guest_wifi-2-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Guest WiFi Marketing",
  heroSub: "Turn connectivity into engagement. Combine a fully customizable captive portal builder with marketing automation to convert WiFi access into measurable marketing outcomes.",
  heroBullets: ["Captive portals", "Marketing automation", "GDPR compliant", "CRM integration"],
  imageBigSrc: "/wp-content/uploads/2026/01/Guest_wifi.png",
  imageBigAlt: "Flame Guest WiFi Marketing dashboard",
  bigSectionTitle: "From connection to",
  bigSectionTitleHl: "actionable marketing",
  bigSectionPara1: "Flame Connect combines a fully customizable captive portal builder with advanced marketing automation.",
  bigSectionPara2: "Design branded login experiences, manage consent and trigger real-time campaigns based on visit patterns and location. Integrate seamlessly with your CRM or PMS.",
  bigSectionBullets: ["Custom login flows", "Social login", "Landing pages", "Location-based"],
  benefitsTitle: "of Guest WiFi Marketing",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Turn intuition into action plan: where to optimize, when to intervene, and what truly moves the needle.",
  benefits: [
    { icon: "wifi", title: "Data capture", desc: "Collect consent-based customer profiles via WiFi and build your own GDPR-compliant audience database." },
    { icon: "trending", title: "Engage at the right moment", desc: "Trigger automated campaigns when customers connect, visit or return." },
    { icon: "users", title: "Personalize experiences", desc: "Tailor messages and offers based on demographic and behavioral data." },
    { icon: "integration", title: "Integration with your ecosystem", desc: "Sync profiles with CRM, PMS and marketing automation tools." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Cross visitors with operations and sales to discover actionable patterns.",
  metrics: [
    { icon: "users", title: "Unique connections", desc: "Real number of devices connected to your network." },
    { icon: "wifi", title: "Captured leads", desc: "Valid emails and contacts with GDPR consent." },
    { icon: "dwell", title: "Dwell time per visit", desc: "How long the user spends connected." },
    { icon: "demographics", title: "Aggregate demographics", desc: "Age, gender and behavior patterns." },
    { icon: "trending", title: "Campaign conversion", desc: "How many users click and convert per campaign." },
    { icon: "calendar", title: "Re-visit rate", desc: "% of visitors returning to your space." },
  ],
  testimonialsIdx: [0, 1, 2, 5, 6],
  faqs: [
    { q: "Is it compatible with my WiFi infrastructure?", a: "Yes. Flame Connect works with major network vendors (Cisco, Aruba, Ruckus, Cambium, Ubiquiti, etc.) via standard RADIUS, WPA Enterprise or HTTP redirect protocols." },
    { q: "What email capture rate can we expect?", a: "With a well-designed portal and a clear incentive (free WiFi, coupon, exclusive content), typical capture rates are 25–40%. Without incentive, 8–15%." },
    { q: "How is GDPR consent managed?", a: "Granular consent in the portal: the visitor selects what to share and for which purposes. Optional double opt-in. Right to be forgotten with automatic deletion upon request." },
    { q: "Does it support multiple languages?", a: "Yes. Automatic device language detection plus configurable translation in 20+ languages with localized copy per language." },
    { q: "What about MAC randomization?", a: "Flame is optimized for environments with MAC randomization (iOS 14+, Android 11+). Returning visitor identification is based on registered email and behavioral patterns." },
  ],
  ctaStripBold: "Your WiFi is more than a utility — it's your most underused marketing channel.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function GuestWifiMarketingEN() {
  return <UseCaseTemplate cfg={cfg} enHref="/es/marketing-wifi-para-invitados/" currentLang="en" />;
}
