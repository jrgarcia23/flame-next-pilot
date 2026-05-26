import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

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
  faqs: [
    { q: "What are the key retail analytics KPIs?", a: "The five fundamental KPIs every retailer should measure: conversion rate (visitors to buyers), footfall (total visitors per period), average dwell time (engagement), capture rate (passers-by entering) and staff performance (sales per employee vs. traffic). Flame provides the first four automatically using existing cameras." },
    { q: "How does retail analytics work with security cameras?", a: "Flame turns security cameras into business intelligence sensors without altering their surveillance role. Hypersensor technology connects via RTSP and applies AI models for people counting, flow patterns, zone analytics and dwell time." },
    { q: "What is the typical ROI of retail analytics?", a: "Clients see ROI in three areas within 90 days: staffing optimization cuts labor 8 to 15 percent. Conversion improvement lifts sales 5 to 12 percent without extra traffic. Marketing attribution eliminates spend on ineffective promotions." },
    { q: "Does it work for small stores or only large chains?", a: "Flame serves both independent stores and enterprise chains. For small stores (1 to 5 locations), 2 to 4 cameras provide people counting and basic traffic analytics from 150 to 400 EUR per month." },
    { q: "How is shopper privacy protected?", a: "Flame is built privacy-by-design. Cameras send video streams to the Flame software, which extracts analytics and discards images immediately. No facial recognition. ISO 27001, GDPR compliant, EU data processing." },
    { q: "How long does deployment take?", a: "5 to 7 days from signing for the first pilot store. 30 to 60 days for 10 to 20 locations. 6 to 12 months for 500+ stores with phased rollout managed by Flame." },
  ],
  ctaStripBold: "Every store is unique. Your data should prove it.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function SolutionForRetailSectorEN() {
  return <SectorTemplate cfg={cfg} enHref="/es/solucion-para-el-sector-retail/" currentLang="en" />;
}
