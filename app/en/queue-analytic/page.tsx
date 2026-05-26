import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Queue Analytics · Flame Analytics",
  description: "Reduce waiting, prevent drop-offs and keep customers happy. Monitor queues in real time and anticipate service needs before they become problems.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Queue Analytics · Flame Analytics",
  metaDescription: "Reduce waiting, prevent drop-offs and keep customers happy. Monitor queues in real time and anticipate service needs before they become problems.",
  heroBgImage: "/wp-content/uploads/2026/01/Queue_analytics.png",
  heroBgPosition: "center center",
  heroTitle: "Queue Analytics",
  heroSub: "Reduce waiting, prevent drop-offs and keep customers happy. Monitor queues in real time and anticipate service needs before they become problems.",
  heroBullets: ["Real-time queues", "Wait alerts", "API integration", "No biometrics"],
  imageBigSrc: "/wp-content/uploads/2026/01/Queue-Analytics_recorte.png",
  imageBigAlt: "Flame Queue Analytics dashboard",
  bigSectionTitle: "Reduce waits,",
  bigSectionTitleHl: "prevent drop-offs",
  bigSectionPara1: "Flame Queue Analytics measures occupancy, wait times and abandonment rates across service areas.",
  bigSectionPara2: "Visualize queue performance in real time, receive alerts when thresholds are crossed, and automate responses via APIs and integrations.",
  bigSectionBullets: ["Real-time status", "Queue occupancy", "Wait time", "Real-time activation"],
  benefitsTitle: "of Queue Analytics",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Turn intuition into action plan: where to optimize, when to intervene, and what truly moves the needle.",
  benefits: [
    { icon: "eye", title: "Monitor queues in real time", desc: "Continuously control queue length, wait times and flow during peak hours." },
    { icon: "alert", title: "Prevent drop-offs", desc: "Identify long waits in advance, trigger automated alerts and reduce abandonment." },
    { icon: "users", title: "Optimize service and staff", desc: "Use queue data to dynamically adjust staffing and improve responsiveness." },
    { icon: "integration", title: "Automate and integrate", desc: "Connect via API to trigger staff notifications, signage and CRM updates." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Cross visitors with operations and sales to discover actionable patterns.",
  metrics: [
    { icon: "queue", title: "Current queue per point", desc: "Visualize each checkout, kiosk or service area in real time." },
    { icon: "dwell", title: "Average wait time", desc: "How long the visitor really waits." },
    { icon: "trending", title: "Abandonment rate", desc: "% of customers leaving without being served." },
    { icon: "alert", title: "Saturation alerts", desc: "Automated notifications to reinforce staff in real time." },
    { icon: "calendar", title: "History by time slot", desc: "Patterns by hour and day for smarter scheduling." },
    { icon: "compare", title: "Checkout comparison", desc: "Detect which counters underperform." },
  ],
  testimonialsIdx: [0, 1, 2, 5, 6],
  faqs: [
    { q: "How is queue length detected?", a: "Through AI video analysis on existing CCTV. Flame measures queue size, occupancy of waiting areas and average wait time without needing physical sensors." },
    { q: "Can it trigger automatic actions?", a: "Yes. When thresholds are crossed, Flame can send alerts to staff, update digital signage or trigger workflows via API to your CRM or workforce management system." },
    { q: "How accurate are the wait time measurements?", a: "Above 95% accuracy in standard service environments. The model accounts for group behavior and varied queue shapes." },
    { q: "Does it work in multi-counter setups?", a: "Yes. Each counter can be tracked independently with its own metrics and alerts, plus cross-counter comparisons." },
    { q: "Is it GDPR compliant?", a: "Yes. Anonymous silhouette detection, aggregate output only." },
  ],
  ctaStripBold: "Reduce waits. Recover lost revenue at the queue.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function QueueAnalyticEN() {
  return <UseCaseTemplate cfg={cfg} enHref="/es/analitica-de-colas/" currentLang="en" />;
}
