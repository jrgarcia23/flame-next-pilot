import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Occupancy Management · Flame Analytics",
  description: "Keep your venues balanced, efficient and safe. Live and historical capacity visibility with privacy-respecting analytics — and automated alerts when thresholds ",
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
  faqs: [
    { q: "Is it suitable for capacity regulation?", a: "Yes. Flame provides auditable reporting with timestamps, occupancy levels per zone and event logs accepted by administrative inspections in major European markets." },
    { q: "Can it close access automatically when capacity is reached?", a: "Yes, via integration with turnstiles, occupancy traffic lights or digital signage. Flame sends API or webhook signals when configured thresholds are hit." },
    { q: "Does it work in venues without cameras?", a: "Yes. Flame integrates with people counters, beam sensors and WiFi probes as additional sources besides existing CCTV." },
    { q: "Can we monitor multiple zones at once?", a: "Yes. Each zone has its own configuration, threshold and dashboard, with cross-zone comparisons available." },
    { q: "Is the data GDPR compliant?", a: "Yes. Anonymous silhouettes, aggregate output, no individual tracking. ISO 27001 certified." },
  ],
  ctaStripBold: "Real-time occupancy, no inspection surprises.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function OccupancyManagementEN() {
  return <UseCaseTemplate cfg={cfg} enHref="/es/gestion-ocupacion/" currentLang="en" />;
}
