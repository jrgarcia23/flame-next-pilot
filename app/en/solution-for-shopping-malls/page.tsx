import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Data Intelligence for Shopping Malls · Flame Analytics",
  description: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to he",
  alternates: {
    canonical: "/en/solution-for-shopping-malls/",
    languages: {
    en: "/en/solution-for-shopping-malls/",
    es: "/es/solucion-para-centros-comerciales/",
    "x-default": "/es/solucion-para-centros-comerciales/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/solution-for-shopping-malls/",
    siteName: "Flame Analytics",
    title: "Data Intelligence for Shopping Malls · Flame Analytics",
    description: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to he",
    locale: "en_US",
    images: [{ url: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence for Shopping Malls · Flame Analytics",
    description: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to he",
    images: ["/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png"],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Data Intelligence for Shopping Malls · Flame Analytics",
  metaDescription: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to he",
  heroBgImage: "/wp-content/uploads/2026/01/Industries_Malls2-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Data Intelligence for Shopping Malls",
  heroSub: "Analytics solutions tailored for malls worldwide. We develop and deploy analytics solutions powered by big data and AI to help shopping centers understand their customers.",
  pillars: [
    { title: "Drive", desc: "Comprehensive understanding of customer behavior through data analysis. By observing preferences and interactions, you gain insight for better customer-centric decisions and strategies.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Measure", desc: "Continuously improve overall mall performance through ongoing evaluation and improvement initiatives, ensuring operational excellence and optimal results.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Transform", desc: "The customer experience. Design a personalized, seamless experience inside the mall, tailoring services and offers to individual preferences.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: "/wp-content/uploads/2026/01/benefit-1-malls.png",
      imgAlt: "Understand customer behavior",
      title: "Understand customer",
      titleHl: "behavior",
      bullets: [
        "Improve leasing strategy of each mall thanks to advanced analytics and big data.",
        "Understand visitor behavior and offer the best experience and brand mix.",
        "Unify the portfolio analysis providing the best tools to your teams.",
        "Drive sales and optimize profitability and efficiency with precise data.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-2-malls.png",
      imgAlt: "Measure and improve mall performance",
      title: "Measure and improve",
      titleHl: "mall performance",
      bullets: [
        "Optimize and plan mall operations (cleaning, maintenance, security) based on visitor flow data. Maximize the value of your venue.",
        "Improve tenant relations by providing relevant real-time visitor information.",
        "Offer the best experience. Discover common journeys, quantify traffic and dwell time per zone, generate heatmaps and define occupancy alerts.",
      ],
    },
    {
      img: "/wp-content/uploads/2026/01/benefit-3-malls.png",
      imgAlt: "Lift customer experience and loyalty",
      title: "Lift customer experience",
      titleHl: "and loyalty",
      bullets: [
        "Capture valuable contacts. Provide secure, seamless WiFi for visitors and enable personalized campaigns.",
        "Launch real-time campaigns based on location and user behavior.",
        "Improve user experience by simplifying loyalty program participation with ticket scanning for automatic data capture.",
        "Unify customer profiles and optimize marketing campaigns. Connect seamlessly with major CRM platforms.",
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
  testimonialsIdx: [0, 1, 7, 8],
  faqs: getFaqs("shopping-malls", "en"),
  ctaStripBold: "Turn footfall into value for tenants and visitors.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function SolutionForShoppingMallsEN() {
  return <SectorTemplate cfg={cfg} enHref="/es/solucion-para-centros-comerciales/" currentLang="en" />;
}
