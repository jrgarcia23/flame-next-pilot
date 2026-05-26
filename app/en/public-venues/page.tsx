import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Public Venues · Flame Analytics",
  description: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy digital marketing and analytics solut",
};

const cfg: SectorConfig = {
  metaTitle: "Public Venues · Flame Analytics",
  metaDescription: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy digital marketing and analytics solut",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Public_venues-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Public Venues",
  heroSub: "Enhance data intelligence for public venues, unlocking valuable insights for better decision-making. We develop and deploy digital marketing and analytics solutions powered by big data and AI to make the right decisions in real time and deliver a safe, satisfying experience.",
  pillars: [
    { title: "Advanced", desc: "Software for route planning and resource optimization, designed specifically for public transport systems.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Real-time", desc: "Analysis of visitor flow and digital marketing insights for informed decisions in museums.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Empower", desc: "University campuses with real-time analytics and digital marketing strategies enabling informed decision-making.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
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
  testimonialsIdx: [0, 5, 7],
  faqs: [
    { q: "Does Flame work in transport vehicles?", a: "Yes. Flame analytics work on cameras inside public transport vehicles (buses, trams, trains) to count boarding and alighting passengers per stop with high accuracy." },
    { q: "How does it handle large public venues?", a: "Flame unifies multiple cameras into a single venue view with full coverage. Tested in stadiums, museums and large public buildings." },
    { q: "Is it GDPR compliant for public spaces?", a: "Yes. Anonymous detection, no facial recognition, no individual tracking. Specifically validated for public-space deployments in EU jurisdictions." },
    { q: "Can it help with safety and compliance?", a: "Yes. Real-time occupancy thresholds and alerts ensure compliance with capacity regulations and help operational teams respond to crowd situations." },
    { q: "What is the typical deployment timeline?", a: "For a museum or university campus, 2 to 4 weeks from signing. Transport networks deploy per route with 1 to 2 months ramp." },
  ],
  ctaStripBold: "Real-time data for decisions that improve the experience.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function PublicVenuesEN() {
  return <SectorTemplate cfg={cfg} enHref="/es/espacios-publicos/" currentLang="en" />;
}
