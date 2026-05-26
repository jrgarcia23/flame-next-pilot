import type { Metadata } from "next";
import UseCaseTemplate from "@/components/templates/UseCaseTemplate";
import { UseCaseConfig } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Corporate WiFi Access · Flame Analytics",
  description: "Secure, managed connectivity for employees and guests. Full control over identity, permissions and audit, with seamless integration into your IT stack.",
};

const cfg: UseCaseConfig = {
  metaTitle: "Corporate WiFi Access · Flame Analytics",
  metaDescription: "Secure, managed connectivity for employees and guests. Full control over identity, permissions and audit, with seamless integration into your IT stack.",
  heroBgImage: "/wp-content/uploads/2026/01/corporate_wifi-1-scaled-1.png",
  heroBgPosition: "center center",
  heroTitle: "Corporate WiFi Access",
  heroSub: "Secure, managed connectivity for employees and guests. Full control over identity, permissions and audit, with seamless integration into your IT stack.",
  heroBullets: ["Identity & access", "Audit logs", "APIs", "Enterprise security"],
  imageBigSrc: "/wp-content/uploads/2026/01/Corporate_Wifi_Access_recorte.png",
  imageBigAlt: "Flame Corporate WiFi Access dashboard",
  bigSectionTitle: "Secure access,",
  bigSectionTitleHl: "simple management",
  bigSectionPara1: "Flame Corporate WiFi gives organizations full control over connectivity. Manage credentials, assign time-based permissions and automate user access via APIs.",
  bigSectionPara2: "Provide secure WiFi access for guests and employees, all from a unified platform.",
  bigSectionBullets: ["Credentials management", "Time-based permissions", "API automation", "Unified access"],
  benefitsTitle: "of Corporate WiFi",
  benefitsTitleHl: "Benefits",
  benefitsSub: "Turn intuition into action plan: where to optimize, when to intervene, and what truly moves the needle.",
  benefits: [
    { icon: "grid", title: "Simplify access management", desc: "Manage employee and guest connections with temporary credentials from a central platform." },
    { icon: "privacy", title: "Improve security and compliance", desc: "Only authorized users connect — full privacy, traceability and enterprise-grade security." },
    { icon: "integration", title: "Seamless integration", desc: "Use APIs to automate provisioning and integrate with existing IT or visitor systems." },
    { icon: "users", title: "Improve visitor experience", desc: "Visitors request access via form or host approval — fast, simple and branded." },
  ],
  metricsTitle: "The metrics that change",
  metricsTitleHl: "decisions",
  metricsSub: "Cross visitors with operations and sales to discover actionable patterns.",
  metrics: [
    { icon: "users", title: "Active users", desc: "Connected employees and guests in real time." },
    { icon: "ratio", title: "Employees vs. guests", desc: "Distribution of total network connections." },
    { icon: "behavior", title: "Traffic by area", desc: "Connectivity per location: which offices are most used." },
    { icon: "dwell", title: "Load per access point", desc: "Detect saturated APs and plan infrastructure." },
    { icon: "reports", title: "Auditable logs", desc: "Full compliance traceability." },
    { icon: "alert", title: "Security alerts", desc: "Notifications for unusual access patterns." },
  ],
  testimonialsIdx: [0, 1, 2, 5, 6],
  faqs: [
    { q: "How is access granted to visitors?", a: "Two options: a self-service form filled by the visitor on arrival, or host-approved access where an employee approves the request via app or email." },
    { q: "Does it integrate with our identity provider?", a: "Yes. Native SSO integration with Microsoft Entra ID, Google Workspace, Okta and any SAML 2.0 provider." },
    { q: "Can we set time-based access?", a: "Yes. Credentials can be limited by duration (hourly, daily, weekly), zone, bandwidth or specific time slots." },
    { q: "What audit logs are kept?", a: "Full log of connections, attempts, devices, durations and locations. Exportable to SIEM systems via syslog or API." },
    { q: "Is the network architecture changed?", a: "No. Flame integrates with your existing controller (Cisco, Aruba, Meraki, etc.) without rearchitecting your network." },
  ],
  ctaStripBold: "Enterprise WiFi access with full control.",
  ctaStripLight: "Personalized demo in 20 minutes.",
};

export default function CorporateWifiAccessEN() {
  return <UseCaseTemplate cfg={cfg} enHref="/es/acceso-wifi-corporativo/" currentLang="en" />;
}
