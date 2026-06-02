import type { Metadata } from "next";
import HomeRestyleTemplate, { HomeRestyleConfig } from "@/components/templates/HomeRestyleTemplate";

export const metadata: Metadata = {
  title: "Home restyle (preview EN) · Flame Analytics",
  description: "Same structure as the current home, with the new Next redesign styling.",
  robots: { index: false, follow: false },
};

const cfg: HomeRestyleConfig = {
  heroSupertitle: "Empowering",
  heroSupertitleHl: "Physical Spaces",
  heroHeadline: "Transforming video into real-time insights for your business",
  heroCta: "Request a demo",
  videoWebm: "/wp-content/uploads/2026/01/Demo-web-HIGH-2-720.webm",
  videoMp4: "/wp-content/uploads/2026/01/Demo-web-HIGH-720.mp4",

  stepsTitle: "Seamless AI Video Analytics for",
  stepsTitleHl: "Shopping Malls",
  stepsSub: "Actionable insight to optimize traffic, performance and experience across your spaces",
  steps: [
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-141-rhd6b8zyg2yz9z5cada9knj2k0hyuzcw7d9y04gp5c.png",   bgImg: "/wp-content/uploads/elementor/thumbs/Group-142-rhd6b8zwk3vn796mm7avcxzmptvchjbwa25liv9x4y.png",   title: "Connect seamlessly",   desc: "Plug Flame into your existing infrastructure (cameras and people counters) with a plug-and-play installation that just works, with no extra hardware or complex deployments." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-73-1-1-rhd6b9xsmx09ll3z4vow55aj5edc2ogmjhxfhefas6.png", bgImg: "/wp-content/uploads/elementor/thumbs/Group-143-rhd6b9xqqxwxiv59gpphxfr3b7qpp8fmm6t3058iyq.png",   title: "Configure your logic", desc: "Define zones, counting lines, heatmaps, demographics and business rules through an intuitive interface, without coding or technical configuration." },
    { iconImg: "/wp-content/uploads/elementor/thumbs/Group-81-rhd6bbthmigrtifyvbli2mbmnwzs70acuws2i6bmva.png",    bgImg: "/wp-content/uploads/elementor/thumbs/Group-144-rhd6bbtf4lzi632j5qir2fa0hzhg4mn3ag41yp5qma.png",   title: "Measure what matters", desc: "Access real-time insights to understand customer behavior, optimize space performance and improve the overall experience across any physical environment." },
  ],

  productsTitle: "Data driven for",
  productsTitleHl: "smart spaces",
  products: [
    { iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png", name: "Traffic",          desc: "Measure inside and outside traffic, monitor occupancy in real time and compute conversion, all from a single, complete platform.",                  href: "/en/traffic-insights/",  cta: "Discover Traffic" },
    { iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",                                       name: "Customer Journey", desc: "Analyze customer journeys and interactions to understand in-store behavior and optimize the experience at every touchpoint.",                         href: "/en/customer-journey/",  cta: "Discover Customer Journey" },
    { iconImg: "/wp-content/uploads/2026/01/Group-1.png",                                                     name: "Connect",          desc: "Capture visitor data through guest WiFi and launch personalized marketing campaigns based on location, profile and behavior.",                          href: "/en/connect/",            cta: "Discover Connect" },
  ],

  advantageTitle: "The Flame advantage",
  advantageSub: "Advanced AI video analytics engineered for privacy, accuracy and performance.",

  privacyTitle: "Privacy-first.",
  privacyTitleHl: "Performance-driven.",
  privacyBody: "Flame is engineered from day one to comply with GDPR and local regulation. No facial recognition, no individual tracking: person detection is anonymous and processing happens on the device. Only aggregated metrics reach the cloud — never video.",
  privacyImg: "/wp-content/uploads/2026/01/Home_traffic.webp",
  privacyImgAlt: "Flame traffic dashboard with privacy by design",
  privacyCta: "Read more",
  privacyHref: "/en/detailed-information/",

  reportsTitle: "Powerful reporting,",
  reportsTitleHl: "smarter decisions.",
  reportsBody: "Benchmark stores, floors or sites against the same yardstick — without waiting for the month-end report. Traffic, conversion, occupancy and behavior unified in a single panel with real-time views and exports to Power BI, Tableau or Looker.",
  reportsImg: "/wp-content/uploads/2026/01/Home_Dashboard.png",
  reportsImgAlt: "Flame dashboard with advanced metrics",
  reportsCta: "See demo",
  reportsHref: "/en/contact-us/",

  integrationTitle: "Seamless integration.",
  integrationTitleHl: "Agnostic by design.",
  integrationBody: "Flame integrates with your current stack: POS (Cegid, Microsoft Dynamics, SAP), ERP, BI (Power BI, Tableau, Looker) and data lakes. Native connectors, open REST API and webhooks. No construction, no replacements, no never-ending projects.",
  integrationImg: "/wp-content/uploads/2026/01/Mask-group3.png",
  integrationImgAlt: "Diagram of Flame integrations with POS / ERP / BI stack",
  integrationCta: "Read more",
  integrationHref: "/en/detailed-information/",

  testimonialsTitle: "Trusted by the",
  testimonialsTitleHl: "best brands",
  testimonialsIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8],

  industriesTitle: "Solutions for any",
  industriesTitleHl: "Industry",
  industriesSub: "Flame Analytics is an advanced smart analytics platform designed to support a wide range of industries and sectors.",

  communityTitle: "Join the",
  communityTitleHl: "Flame community",
  communitySub: "Where content becomes value for the community: stories, ideas and learnings with impact.",
  communityCards: [
    { icon: "users",    title: "Case studies", href: "/en/community/case-studies/", img: "/wp-content/uploads/2025/09/Cases.png" },
    { icon: "calendar", title: "Webinars",     href: "/en/community/webinars/",     img: "/wp-content/uploads/2025/09/Webinar1.png" },
    { icon: "reports",  title: "Whitepapers",  href: "/en/community/whitepapers/",  img: "/wp-content/uploads/2025/09/Whitepaper1.png" },
  ],
};

export default function HomeRestyleENPage() {
  return <HomeRestyleTemplate cfg={cfg} enHref="/preview/home-restyle/en/" currentLang="en" />;
}
