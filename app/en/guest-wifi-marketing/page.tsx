import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import AnimatedDashboardImage from "@/components/AnimatedDashboardImage";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Guest WiFi Marketing & Captive Portal Platform · Flame",
  description: "Branded captive portal, GDPR consent and automated WiFi marketing synced with HubSpot or Salesforce. For malls, retail and hotels. Demo in 20 min.",
  alternates: {
    canonical: "/en/guest-wifi-marketing/",
    languages: {
    en: "/en/guest-wifi-marketing/",
    es: "/es/marketing-wifi-para-invitados/",
    "x-default": "/es/marketing-wifi-para-invitados/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/guest-wifi-marketing/",
    siteName: "Flame Analytics",
    title: "Guest WiFi Marketing & Captive Portal Platform · Flame",
    description: "Branded captive portal, GDPR consent and automated WiFi marketing synced with HubSpot or Salesforce. For malls, retail and hotels. Demo in 20 min.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guest WiFi Marketing & Captive Portal Platform · Flame",
    description: "Branded captive portal, GDPR consent and automated WiFi marketing synced with HubSpot or Salesforce. For malls, retail and hotels. Demo in 20 min.",
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "Guest WiFi Marketing & Captive Portal Platform · Flame",
  metaDescription: "Branded captive portal, GDPR consent and automated WiFi marketing synced with HubSpot or Salesforce. For malls, retail and hotels. Demo in 20 min.",
  heroBgImage: "/wp-content/uploads/2026/01/guest_wifi-2-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Guest WiFi marketing and captive portal platform",
  heroSub: "Flame Connect turns your guest WiFi into a marketing channel: a branded captive portal captures contacts with granular GDPR consent, and automated email, SMS or in-portal campaigns follow every visit. Built for shopping centres, retail and hotels, it runs on your current network and syncs with HubSpot, Salesforce or any tool via API.",
  heroBullets: ["Branded captive portal", "WiFi marketing automation", "Granular GDPR consent", "HubSpot & Salesforce"],
  imageBigSrc: "/wp-content/uploads/2026/01/Guest_wifi.png",
  imageBigAlt: "Flame Connect guest WiFi marketing dashboard",
  bigSectionTitle: "From connection to",
  bigSectionTitleHl: "actionable marketing",
  bigSectionPara1: "Flame Connect combines a fully customisable captive portal builder with marketing automation. Design branded login experiences, manage consent and trigger real-time campaigns based on visit patterns and location, integrated with your CRM or PMS.",
  bigSectionPara2: "Automate guest marketing with WiFi data: workflows triggered by a first visit, a fifth visit or a 14-day absence send the right email, SMS or in-portal message without manual work. Profiles and consents sync with your CRM, so WiFi marketing automation runs inside the tools your team already uses.",
  bigSectionBullets: ["Custom login flows", "Social and email login", "Behaviour triggers", "Location-based campaigns"],
  benefitsTitle: "of a captive portal for WiFi marketing",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Four reasons shopping centres, retailers and hotels turn guest WiFi into their own marketing channel.",
  benefits: [
    { icon: "wifi", title: "Capture 25-40% of WiFi users", desc: "With a well designed portal and a clear incentive, typical capture rates are 25-40% (8-15% without one). Build your own first-party database." },
    { icon: "users", title: "Granular GDPR consent", desc: "Visitors choose what to share and for which purposes. Optional double opt-in and automatic deletion on request." },
    { icon: "trending", title: "Campaigns by visit and frequency", desc: "Trigger email, SMS or in-portal messages on first visits, repeat visits or absences, filtered by location and time slot." },
    { icon: "integration", title: "HubSpot, Salesforce and API", desc: "Sync profiles, consents and visit history with HubSpot or Salesforce, or with any tool through the REST API and webhooks." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Guest WiFi analytics that connect visits with marketing results.",
  metrics: [
    { icon: "users", title: "Unique connections", desc: "Real number of devices connected to your network." },
    { icon: "wifi", title: "Captured leads", desc: "Valid emails and contacts with GDPR consent." },
    { icon: "dwell", title: "Dwell time per visit", desc: "How long the user stays connected." },
    { icon: "demographics", title: "Aggregate demographics", desc: "Age, gender and behaviour patterns." },
    { icon: "trending", title: "Campaign conversion", desc: "How many users click and convert per campaign." },
    { icon: "calendar", title: "Re-visit rate", desc: "% of visitors returning to your space." },
  ],
  // Sin testimonios: TESTIMONIALS_ALL está en español y esta página es EN (brief SEO #7).
  testimonialsIdx: [],
  casesTitle: "Guest WiFi marketing in real venues",
  caseStudies: [
    { href: "/en/oasiz-madrid-implements-flame-analytics-to-identify-and-connect-with-its-customers-in-an-agile-way/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2022/08/centro-comercial-oasiz-madrid.png", title: "Oasiz Madrid connects with its visitors through guest WiFi", excerpt: "The 280,000 m2 shopping and leisure resort uses Flame guest WiFi onboarding to grow its database with demographic and contact insights.", date: "" },
    { href: "/en/case-study-enhancing-customer-loyalty-in-shopping-centers-with-cbre-spain-and-connect-mall-edition/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2024/11/cbre-spain-shopping-centers-loyalty-system-connect-mall-flame-analytics.png", title: "CBRE Spain builds loyalty with Connect Mall Edition", excerpt: "Rolled out across all the shopping centres CBRE manages in Spain, starting at Parc Central, to reward loyalty and capture purchase data.", date: "" },
    { href: "/en/success-story-repsol-and-flame-analytics-transform-the-experience-in-1000-gas-stations/", img: "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/2025/03/repsol-service-stations-connectivity-flame-connect-flame-analytics-2.png", title: "Repsol deploys Flame Connect in 1,000+ service stations", excerpt: "Guest WiFi across more than 1,000 stations in Spain so customers can pay with Waylet, with analytics on connections and usage.", date: "" },
  ],
  relatedGuidesTitle: "Guest WiFi resources",
  relatedGuides: [
    { href: "/en/connect/", tag: "Product", title: "Flame Connect", desc: "The full guest WiFi product: branded portals, campaigns, CRM and BI integrations and the mobile SDK." },
    { href: "/en/wifi-tracking-the-best-tool-for-generate-loyalty-and-engagement/", tag: "Guide", title: "WiFi tracking for loyalty and engagement", desc: "How repeat-visit data from WiFi helps identify loyal customers and personalise their experience." },
    { href: "/en/corporate-wifi-access/", tag: "Different need", title: "Corporate WiFi access", desc: "Looking for secure WiFi for employees and guests rather than marketing? See corporate WiFi access." },
  ],
  faqs: [
    { q: "What is a captive portal for WiFi marketing?", a: "A captive portal is the login page visitors see before using your guest WiFi. In WiFi marketing it becomes a capture point: visitors sign in with email or social login, accept granular consent and become contacts with visit data attached (when, how often and how long they stay). Flame Connect lets you brand the portal, add promotions and manage consent from one platform, and turns guest WiFi analytics into campaigns that improve customer engagement." },
    { q: "Can guest WiFi marketing be automated with my CRM?", a: "Yes. Flame Connect syncs profiles, consents and visit history with HubSpot or Salesforce, and with any other tool through its REST API and webhooks. Campaigns can run automatically on behaviour, such as a first visit, a fifth visit or a 14-day absence, or manually with filters by location, frequency and time slot." },
    { q: "Is it compatible with my WiFi infrastructure?", a: "Yes. Flame Connect works with major network vendors (Cisco, Aruba, Ruckus, Cambium, Ubiquiti and others) via standard RADIUS, WPA Enterprise or HTTP redirect protocols. There is no need to replace access points or add hardware." },
    { q: "What email capture rate can we expect?", a: "With a well designed portal and a clear incentive (free WiFi, a coupon or exclusive content), typical capture rates are 25-40%. Without an incentive, 8-15%." },
    { q: "How is GDPR consent managed?", a: "Granular consent in the portal: the visitor selects what to share and for which purposes. Optional double opt-in. Right to be forgotten with automatic deletion on request." },
    { q: "Does it support multiple languages?", a: "Yes. Automatic device language detection plus configurable translation into 20+ languages, with localised copy per language." },
    { q: "What about MAC randomisation?", a: "Flame is optimised for environments with MAC randomisation (iOS 14+, Android 11+). Returning visitors are identified through the registered email and behavioural patterns." },
  ],
  ctaStripBold: "Your WiFi is more than a utility: it is your most underused marketing channel.",
  ctaStripLight: "Personalised demo in 20 minutes.",
  fichaPdf: "/fichas/guest-wifi-marketing.pdf",
  fichaHook: "Turn guest WiFi into data, segmentation and campaigns.",
};

export default function GuestWifiMarketingEN() {
  return (
    <UseCaseTemplate
      cfg={cfg}
      enHref="/es/marketing-wifi-para-invitados/" currentLang="en"
      bigSectionVisualOverride={
        <AnimatedDashboardImage
          src="/wp-content/uploads/2026/01/Guest_wifi.png"
          alt="Flame dashboard"
          storageKey="flame-guest-wifi"
          elements={[
            { id: "ov1", kind: "overlay", label: "Reveal completo",
              left: 53.96, top: 21.51, right: 27.25, bottom: 13.88,
              delay: 0, animation: "fade" },
          ]}
        />
      }
    />
  );
}
