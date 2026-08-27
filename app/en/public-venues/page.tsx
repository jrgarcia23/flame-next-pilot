import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Public Venues · Flame Analytics",
  description: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solut",
  alternates: {
    canonical: "/en/public-venues/",
    languages: {
    en: "/en/public-venues/",
    es: "/es/espacios-publicos/",
    "x-default": "/es/espacios-publicos/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/public-venues/",
    siteName: "Flame Analytics",
    title: "Public Venues · Flame Analytics",
    description: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solut",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Public Venues · Flame Analytics",
    description: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solut",
    images: ["/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Public Venues · Flame Analytics",
  metaDescription: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solut",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Public Venues",
  heroSub: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy analytics solutions powered by big data and AI to make the right decisions in real time and deliver a safe, satisfying experience.",
  pillars: [
    { title: "Advanced", desc: "Software for route planning and resource optimization, designed specifically for public transport systems.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Real-time", desc: "Analysis of visitor flow and data insights for informed decisions in museums.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Empower", desc: "University campuses with real-time analytics enabling informed decision-making.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-public.png",
      imgAlt: "Museums",
      title: "",
      titleHl: "Museums",
      bullets: [
        "Detect specific situations and take concrete corrective actions.",
        "Improve the profitability and effectiveness of your physical space while creating a happier, more loyal and more engaged visitor.",
        "Personalize customer experience. Reduce queue waits, send personalized offers in the museum shop, and more.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-public.png",
      imgAlt: "Public transport",
      title: "Public",
      titleHl: "transport",
      bullets: [
        "Know each user individually: which stop they board, how long they stay in the vehicle, where they get off.",
        "Improve resource planning.",
        "Take the best decisions to deliver optimal service.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-public.png",
      imgAlt: "Universities",
      title: "",
      titleHl: "Universities",
      bullets: [
        "Get real-time estimation of each campus building occupancy.",
        "Notify students of building occupancy on info screens and mobile apps.",
        "Get insights on real usage of available space and proactively know activity levels across zones.",
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
  testimonialsIdx: [0, 5, 7],
  faqs: getFaqs("public-venues", "en"),
  ctaStripBold: "Real-time data for decisions that improve the experience.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function PublicVenuesEN() {
  return <SectorTemplate cfg={cfg} enHref="/es/espacios-publicos/" currentLang="en" />;
}
