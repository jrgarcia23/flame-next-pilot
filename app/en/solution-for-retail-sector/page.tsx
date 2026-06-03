import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Data Intelligence for Retail · Flame Analytics",
  description: "At Flame we develop and deploy digital marketing and analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
};

const cfg: SectorConfig = {
  metaTitle: "Data Intelligence for Retail · Flame Analytics",
  metaDescription: "At Flame we develop and deploy digital marketing and analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their cust",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Retail-1.png",
  heroBgPosition: "center center",
  heroTitle: "Data Intelligence for Retail",
  heroSub: "At Flame we develop and deploy digital marketing and analytics solutions for physical spaces. Thanks to big data and AI, we help retailers understand their customers, improve management and lift profitability.",
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
  testimonialsIdx: [2, 4, 6],
  faqs: getFaqs("retail", "en"),
  ctaStripBold: "Every store is unique. Your data should prove it.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function SolutionForRetailSectorEN() {
  return <SectorTemplate cfg={cfg} enHref="/es/solucion-para-el-sector-retail/" currentLang="en" />;
}
