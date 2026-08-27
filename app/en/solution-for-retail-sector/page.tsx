import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Data Intelligence for Retail · Flame Analytics",
  description: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
  alternates: {
    canonical: "/en/solution-for-retail-sector/",
    languages: {
    en: "/en/solution-for-retail-sector/",
    es: "/es/solucion-para-el-sector-retail/",
    "x-default": "/es/solucion-para-el-sector-retail/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/solution-for-retail-sector/",
    siteName: "Flame Analytics",
    title: "Data Intelligence for Retail · Flame Analytics",
    description: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Retail-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence for Retail · Flame Analytics",
    description: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
    images: ["/wp-content/uploads/2026/01/Industries_Retail-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Data Intelligence for Retail · Flame Analytics",
  metaDescription: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.png",
  heroBgPosition: "center center",
  heroTitle: "Data Intelligence for Retail",
  heroSub: "At Flame we develop and deploy analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their customers, improve management and lift profitability.",
  pillars: [
    { title: "Drive", desc: "Valuable insight into customer behavior through active monitoring. Knowing actions, preferences and patterns, you make decisions grounded in objective data.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Measure", desc: "Optimize point-of-sale performance for profitability and efficiency. Implement data-based analytics to refine commercial strategy and operate smarter.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Transform", desc: "Improve the retail experience by personalizing every interaction. Increase satisfaction and engagement by offering tailored experiences.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-retail.png",
      imgAlt: "Understand customer behavior",
      title: "Understand customer",
      titleHl: "behavior",
      bullets: [
        "Explore how customers interact at point of sale — traffic and movement patterns, opening hours, staffing, layout and product placement decisions.",
        "Improve shopping experience by identifying preferences and offering exactly what customers want and need.",
        "Build a more loyal, engaged clientele around your brand.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-retail.png",
      imgAlt: "Learn about PoS performance",
      title: "Learn about",
      titleHl: "PoS performance",
      bullets: [
        "Find out how your storefront performs and its attraction/capture capacity.",
        "Discover whether your business location is optimal.",
        "Improve conversion rates, profitability and overall business efficiency.",
        "With Shopper Funnel, measure key performance indicators across the entire customer journey.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-retail.png",
      imgAlt: "Effective location-based marketing",
      title: "Effective location-based",
      titleHl: "marketing",
      bullets: [
        "Send personalized push messages to customers when at the point of sale for unique attention.",
        "Create campaigns based on specific segments (gender, age, zip code) or specific behavior (loyalty, interests).",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-4-retail.png",
      imgAlt: "Optimally manage your locations",
      title: "Optimally manage",
      titleHl: "your locations",
      bullets: [
        "Identify best and worst practices across locations to build the perfect store.",
        "Measure KPIs of every store: external/internal traffic, capture and conversion ratios, and compare them.",
        "Track the performance of all your locations on every key process indicator.",
      ],
    },
  ],
  productsTitle: "Comprehensive products,",
  productsTitleHl: "multiple solutions",
  productsSub: "Measure and improve space performance, understand customer behavior and connect with your visitors.",
  productsBullets: [
    "Measure and improve venue performance",
    "Understand customer behaviour",
    "Connect with your visitors",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc: "Measure outdoor and indoor traffic, track real-time occupancy, and calculate conversion — all in one powerful platform.",
      href: "/en/traffic-insights/",
      cta: "Read more",
      title: "Traffic",
      img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc: "Track customer journeys and interactions to understand in-store behavior and optimize the experience at every touchpoint.",
      href: "/en/customer-journey/",
      cta: "Read more",
      title: "Customer Journey",
      img: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/Group-1.png",
      name: "Connect",
      desc: "Capture visitor data through guest WiFi and launch personalized marketing campaigns based on location, profile and behavior.",
      href: "/en/connect/",
      cta: "Read more",
      title: "Connect",
      img: "/wp-content/uploads/2026/01/Group-1.png",
    },
  ],
  testimonialsIdx: [2, 4, 6],
  faqs: getFaqs("retail", "en"),
  ctaStripBold: "Every store is unique. Your data should prove it.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function SolutionForRetailSectorEN() {
  return <SectorTemplate cfg={cfg} enHref="/es/solucion-para-el-sector-retail/" currentLang="en" />;
}
