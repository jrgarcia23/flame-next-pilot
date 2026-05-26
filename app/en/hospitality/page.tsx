import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Hospitality · Flame Analytics",
  description: "Comprehensive data analytics to gain valuable insight into customer behavior. We develop and deploy digital marketing and analytics solutions powered by big dat",
};

const cfg: SectorConfig = {
  metaTitle: "Hospitality · Flame Analytics",
  metaDescription: "Comprehensive data analytics to gain valuable insight into customer behavior. We develop and deploy digital marketing and analytics solutions powered by big dat",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Hospitality-1.png",
  heroBgPosition: "center center",
  heroTitle: "Hospitality",
  heroSub: "Comprehensive data analytics to gain valuable insight into customer behavior. We develop and deploy digital marketing and analytics solutions powered by big data and AI to help hotels capture new customers and build loyalty.",
  pillars: [
    { title: "Achieve", desc: "Significant increase in sales and a base of satisfied customers through strategic business approaches.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Generate", desc: "Direct bookings for your hotel, fostering a direct and profitable relationship with guests.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Personalize", desc: "Every customer experience by tailoring each stay to unique preferences and needs.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-hosp.png",
      imgAlt: "Fast and secure connection",
      title: "Fast and secure",
      titleHl: "connection",
      bullets: [
        "Offer a fast, simple connection experience without cumbersome captive portal logins.",
        "Provide reliable service to hotel guests across rooms, lounges and common areas through secure WiFi.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-hosp.png",
      imgAlt: "Enrich your CRM",
      title: "Enrich your",
      titleHl: "CRM",
      bullets: [
        "Automatically enrich your hotel CRM with contact information for every guest, increasing the value of bookings made through Booking, TripAdvisor and similar platforms.",
        "If you do not have a CRM, use Connect — the marketing/campaign module included with Flame.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-hosp.png",
      imgAlt: "PMS integration",
      title: "PMS",
      titleHl: "integration",
      bullets: [
        "Automate WiFi service management through PMS integration on a single platform.",
        "Make Guest WiFi simpler for the guest and more manageable for the hotel through PMS integration.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-4-hosp.png",
      imgAlt: "Send personalized offers",
      title: "Send personalized",
      titleHl: "offers",
      bullets: [
        "Increase incremental revenue per room by promoting other hotel areas that improve guest experience.",
        "Inform guests of available services (bar, restaurant, spa) during their stay, adapted to zone and time of day.",
        "Drive cross-sell and upgrades for future bookings — late checkout, parking upgrades, room upgrades — recognizing each guest as unique.",
      ],
    },
  ],
  productsTitle: "Comprehensive products,",
  productsTitleHl: "multiple solutions",
  productsSub: "Measure and improve space performance, understand customer behavior and connect with your visitors.",
  products: [
    {
      title: "Traffic",
      desc: "Measure outdoor and indoor footfall, track real-time occupancy and calculate conversion — all in one powerful platform.",
      href: "/en/traffic-insights/",
      img: "/wp-content/uploads/2026/01/Traffic2-1.png",
    },
    {
      title: "Customer Journey",
      desc: "Track customer journeys and interactions to understand in-store behavior and optimize the experience at every touchpoint.",
      href: "/en/customer-journey/",
      img: "/wp-content/uploads/2026/01/Customer_journey2-scaled-1.png",
    },
    {
      title: "Connect",
      desc: "Capture visitor data through guest WiFi and launch personalized marketing campaigns based on location, profile and behavior.",
      href: "/en/connect/",
      img: "/wp-content/uploads/2026/01/Connect-1-1.png",
    },
  ],
  testimonialsIdx: [3, 5, 6],
  faqs: [
    { q: "How does Guest WiFi work in our hotel?", a: "Flame Connect deploys a captive portal that guests use to access the WiFi. The portal can be branded with your hotel identity and captures consent-based data for marketing and CRM enrichment." },
    { q: "Can we integrate with our PMS?", a: "Yes. Native integrations with major PMS systems (Opera, Mews, Cloudbeds, etc.) plus REST APIs for custom integrations." },
    { q: "What data do we collect from guests?", a: "Only what guests explicitly consent to share: name, email, language preference and optionally birthday or interests. Fully GDPR compliant." },
    { q: "How long does deployment take?", a: "Typically 1 to 2 weeks for a single hotel. Chain rollouts can deploy 10 to 50 hotels per month with phased onboarding." },
    { q: "What ROI should we expect?", a: "Hotels typically see direct booking lift of 5 to 12 percent within 6 months through email and SMS campaigns to captured contacts. Cross-sell campaigns add 3 to 8 percent incremental revenue per room." },
  ],
  ctaStripBold: "Turn your WiFi into the direct channel with every guest.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function HospitalityEN() {
  return <SectorTemplate cfg={cfg} enHref="/es/hoteles/" currentLang="en" />;
}
