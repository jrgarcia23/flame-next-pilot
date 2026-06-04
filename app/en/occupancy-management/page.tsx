import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

import { getFaqs } from "@/lib/live-faqs";
export const metadata: Metadata = {
  title: "Occupancy Management · Flame Analytics",
  description: "Keep your venues balanced, efficient and safe. Live and historical capacity visibility with privacy-respecting analytics — and automated alerts when thresholds ",
  alternates: {
    canonical: "/en/occupancy-management/",
    languages: {
    en: "/en/occupancy-management/",
    es: "/es/gestion-ocupacion/",
    "x-default": "/es/gestion-ocupacion/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/occupancy-management/",
    siteName: "Flame Analytics",
    title: "Occupancy Management · Flame Analytics",
    description: "Keep your venues balanced, efficient and safe. Live and historical capacity visibility with privacy-respecting analytics — and automated alerts when thresholds ",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Occupancy Management · Flame Analytics",
    description: "Keep your venues balanced, efficient and safe. Live and historical capacity visibility with privacy-respecting analytics — and automated alerts when thresholds ",
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "Occupancy Management · Flame Analytics",
  metaDescription: "Keep your venues balanced, efficient and safe. Live and historical capacity visibility with privacy-respecting analytics — and automated alerts when thresholds ",
  heroBgImage: "/wp-content/uploads/2026/01/Occupancy_management-1-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Occupancy Management",
  heroSub: "Keep your venues balanced, efficient and safe. Live and historical capacity visibility with privacy-respecting analytics — and automated alerts when thresholds are crossed.",
  heroBullets: ["Live occupancy", "Automated alerts", "Multi-zone", "GDPR compliant"],
  imageBigSrc: "/wp-content/uploads/2026/01/Occupancy-Management_recorte.png",
  imageBigAlt: "Flame Occupancy Management dashboard",
  bigSectionTitle: "Live visibility,",
  bigSectionTitleHl: "live decisions",
  bigSectionPara1: "Flame Occupancy visualizes live and historical capacity levels with accurate, privacy-respecting analytics. Real-time dashboards to track comfort, capacity and flow.",
  bigSectionPara2: "Automate alerts and signage when thresholds are crossed to guarantee efficiency and an impeccable visitor experience.",
  bigSectionBullets: ["Real-time monitoring", "Occupancy alerts", "Mobile app", "Digital signage integration"],
  benefitsTitle: "of Occupancy Management",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Turn intuition into action plan: where to optimize, when to intervene, and what truly moves the needle.",
  benefits: [
    { icon: "eye", title: "Real-time occupancy visibility", desc: "Monitor live occupancy in venues, floors or zones to keep comfort and safety." },
    { icon: "trending", title: "Anticipate demand and adjust", desc: "Predict peaks and dynamically adapt staff, cleaning and access policies." },
    { icon: "users", title: "Improve the visitor experience", desc: "Avoid crowding and ensure optimal flow for a smoother visit." },
    { icon: "grid", title: "Optimize space usage", desc: "Analyze patterns to balance resources and reduce idle capacity." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Cross visitors with operations and sales to discover actionable patterns.",
  metrics: [
    { icon: "occupancy", title: "Live occupancy", desc: "Real-time count per zone, floor or venue." },
    { icon: "alert", title: "Thresholds and alerts", desc: "Automated notifications when capacity is reached." },
    { icon: "calendar", title: "Predicted peaks", desc: "Anticipate the busiest moments based on historical data." },
    { icon: "reports", title: "Compliance reporting", desc: "Auditable documentation for occupancy regulations." },
    { icon: "compare", title: "Zone comparison", desc: "Detect which areas underperform or saturate." },
    { icon: "integration", title: "Real-time integration", desc: "API and webhooks to automate signage and access." },
  ],
  testimonialsIdx: [0, 1, 2, 5, 6],
  faqs: getFaqs("occupancy", "en"),
  ctaStripBold: "Real-time occupancy, no inspection surprises.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function OccupancyManagementEN() {
  return <UseCaseTemplate cfg={cfg} enHref="/es/gestion-ocupacion/" currentLang="en" />;
}
