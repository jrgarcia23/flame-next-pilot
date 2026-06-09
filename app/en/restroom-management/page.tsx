import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import AnimatedDashboardImage from "@/components/AnimatedDashboardImage";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Restroom Management · Flame Analytics",
  description: "Keep your facilities clean, efficient and always ready. Combine people-counting sensors and a mobile app to automate cleaning cycles based on actual usage.",
  alternates: {
    canonical: "/en/restroom-management/",
    languages: {
    en: "/en/restroom-management/",
    es: "/es/gestion-de-aseos/",
    "x-default": "/es/gestion-de-aseos/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/restroom-management/",
    siteName: "Flame Analytics",
    title: "Restroom Management · Flame Analytics",
    description: "Keep your facilities clean, efficient and always ready. Combine people-counting sensors and a mobile app to automate cleaning cycles based on actual usage.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restroom Management · Flame Analytics",
    description: "Keep your facilities clean, efficient and always ready. Combine people-counting sensors and a mobile app to automate cleaning cycles based on actual usage.",
  },
};

const cfg: UseCaseConfig = {
  metaTitle: "Restroom Management · Flame Analytics",
  metaDescription: "Keep your facilities clean, efficient and always ready. Combine people-counting sensors and a mobile app to automate cleaning cycles based on actual usage.",
  heroBgImage: "/wp-content/uploads/2026/01/restroom-1-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Restroom Management",
  heroSub: "Keep your facilities clean, efficient and always ready. Combine people-counting sensors and a mobile app to automate cleaning cycles based on actual usage.",
  heroBullets: ["Real-time monitoring", "Mobile app", "Cleaning alerts", "Audit logs"],
  imageBigSrc: "/wp-content/uploads/2026/01/Restroom-Management_3.png",
  imageBigAlt: "Flame Restroom Management dashboard",
  bigSectionTitle: "Cleaning driven by",
  bigSectionTitleHl: "actual usage",
  bigSectionPara1: "Flame Restroom Management combines counting sensors and a mobile app to automate cleaning cycles based on real usage.",
  bigSectionPara2: "Get alerts, log interventions and analyze patterns over time, improving efficiency, hygiene and visitor satisfaction across all your spaces.",
  bigSectionBullets: ["Counting sensors", "Cleaning mobile app", "Automatic alerts", "Usage patterns"],
  benefitsTitle: "of Restroom Management",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Turn intuition into action plan: where to optimize, when to intervene, and what truly moves the needle.",
  benefits: [
    { icon: "eye", title: "Monitor usage in real time", desc: "Track visits per restroom to know exactly when cleaning or maintenance is required." },
    { icon: "alert", title: "Automated cleaning alerts", desc: "Notify staff when each usage threshold is hit to keep hygiene without waste." },
    { icon: "connect", title: "Smart mobile app for staff", desc: "Cleaning teams confirm interventions, reset counters and see status in real time." },
    { icon: "reports", title: "Complete traceability and reporting", desc: "Full record of cleaning actions and usage for compliance and accountability." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Cross visitors with operations and sales to discover actionable patterns.",
  metrics: [
    { icon: "eye", title: "Usage per restroom", desc: "Visits per facility, by zone or hour." },
    { icon: "clock", title: "Time since last cleaning", desc: "Trace how long since each intervention." },
    { icon: "alert", title: "Threshold alerts", desc: "Automatic notifications at configured usage levels." },
    { icon: "reports", title: "Cleaning history", desc: "Audit log of every intervention, ready for inspection." },
    { icon: "ratio", title: "Cost per use", desc: "Real cost-efficiency of cleaning operations." },
    { icon: "compare", title: "Restroom benchmark", desc: "Compare facilities to detect anomalies." },
  ],
  testimonialsIdx: [0, 1, 2, 5, 6],
  faqs: [
    { q: "How does the cleaning trigger work?", a: "You set a usage threshold per restroom. When reached, Flame sends a notification to the cleaning team via the mobile app with priority and location info." },
    { q: "Does it work without staff app?", a: "The app is recommended for full traceability. Without it, alerts can be sent via email, SMS or to existing facility management systems via API." },
    { q: "Can we customize cleaning frequencies?", a: "Yes. Each restroom can have its own threshold, schedule and priority. Different rules for peak hours, weekends or events." },
    { q: "What sensors does it use?", a: "Flame works with existing IP cameras at restroom entrances or dedicated people-counting sensors. No biometrics, fully anonymous." },
    { q: "Is it compatible with our FM system?", a: "Yes, via REST API and webhooks. Native integrations available for major facility management platforms." },
  ],
  ctaStripBold: "Clean smarter, not more often.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function RestroomManagementEN() {
  return (
    <UseCaseTemplate
      cfg={cfg}
      enHref="/es/gestion-de-aseos/" currentLang="en"
      bigSectionVisualOverride={
        <AnimatedDashboardImage
          src="/wp-content/uploads/2026/01/Restroom-Management_3.png"
          alt="Flame dashboard"
          storageKey="flame-restroom"
          elements={[
            { id: "ov1", kind: "overlay", label: "Full reveal",
              left: 60.42, top: 15.21, right: 16.07, bottom: 12.83,
              delay: 0, animation: "fade" },
            { id: "overlay-mq6pl2v0", kind: "overlay", label: "Overlay 2",
              left: 7.99, top: 57.25, right: 50.35, bottom: 14.06,
              delay: 300, animation: "wipe-right" },
            { id: "overlay-mq6plw5m", kind: "overlay", label: "Overlay 3",
              left: 17.03, top: 22.84, right: 73.65, bottom: 68.45,
              delay: 600, animation: "wipe-right" },
            { id: "overlay-mq6pm5xx", kind: "overlay", label: "Overlay 4",
              left: 17.08, top: 41.29, right: 73.91, bottom: 50.01,
              delay: 900, animation: "wipe-right" },
            { id: "overlay-mq6pmif1", kind: "overlay", label: "Overlay 5",
              left: 32.54, top: 28.93, right: 52.68, bottom: 51.96,
              delay: 1200, animation: "wipe-right" },
            { id: "counter-mq6pn0m4", kind: "counter", label: "Counter 11.337",
              left: 6.02, top: 21.55, right: 85.78, bottom: 72.77,
              delay: 200, value: 11337, decimals: 0, thousandsSep: ".",
              prefix: "", suffix: "",
              fontSize: 18, fontWeight: 600, color: "#15163A", align: "left", duration: 1600 },
            { id: "counter-mq6pnos2", kind: "counter", label: "Counter 428",
              left: 6.07, top: 40.28, right: 87.09, bottom: 54.17,
              delay: 200, value: 428, decimals: 0, thousandsSep: ",",
              prefix: "", suffix: "",
              fontSize: 18, fontWeight: 600, color: "#15163A", align: "left", duration: 1600 },
          ]}
        />
      }
    />
  );
}
