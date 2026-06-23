import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { SectorConfig } from "@/lib/page-content";
import { getFaqs } from "@/lib/live-faqs";

const CDN = "https://uryoqblopkijfqnzquhm.supabase.co/storage/v1/object/public/blog-media/landings";

export const metadata: Metadata = {
  title: "Data Intelligence for Supermarkets · Flame Analytics",
  description: "Optimise layout, operations and conversion in your supermarket. Advanced analytics solutions combining video and AI to understand customers, improve performance and connect with visitors.",
  alternates: {
    canonical: "/en/supermarkets/",
    languages: {
      es: "/es/supermercados/",
      en: "/en/supermarkets/",
      "x-default": "/es/supermercados/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://www.flameanalytics.com/en/supermarkets/",
    siteName: "Flame Analytics",
    title: "Data Intelligence for Supermarkets · Flame Analytics",
    description: "Optimise layout, operations and conversion in your supermarket with Flame's advanced analytics platform.",
    locale: "en_US",
    images: [{ url: `${CDN}/supermercados-hero.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Intelligence for Supermarkets · Flame Analytics",
    description: "Optimise layout, operations and conversion in your supermarket with Flame's advanced analytics platform.",
    images: [`${CDN}/supermercados-hero.png`],
  },
};

const cfg: SectorConfig = {
  metaTitle: "Supermarkets · Flame Analytics",
  metaDescription: "Advanced analytics on customer behaviour, operations and conversion for supermarkets.",
  heroBgImage: `${CDN}/supermercados-hero.png`,
  heroBgPosition: "center center",
  heroTitle: "Data intelligence for supermarkets",
  heroSub: "Flame combines video and a wide range of data with AI to improve decision-making and performance in every supermarket: understand customer behaviour, measure the performance of your spaces and connect with your visitors.",
  pillars: [
    { title: "Understand", desc: "Real customer behaviour across aisles, sections and shelves. Map journeys, detect hotspots and discover where purchase decisions happen.", iconImg: "/wp-content/uploads/2026/01/Vector-12.png" },
    { title: "Measure",    desc: "The performance of every square metre of your supermarket. Compare stores, identify high- and low-performance zones, and connect in-store behaviour with sales.", iconImg: "/wp-content/uploads/2026/01/ep_operation.png" },
    { title: "Connect",    desc: "With your visitors from the first digital touchpoint. Capture data via WiFi and captive portal, identify returning vs new customers, and trigger real-time campaigns.", iconImg: "/wp-content/uploads/2026/01/Vector-13.png" },
  ],
  sections: [
    {
      img: `${CDN}/supermercados-layout.png`,
      imgAlt: "Optimise supermarket layout and zone performance",
      title: "Optimise layout and zone",
      titleHl: "performance",
      bullets: [
        "Customer flow: analyse traffic, journeys and movement patterns to understand how shoppers move through the supermarket and how they make decisions.",
        "Zone analytics: measure traffic and dwell time per section to detect high- and low-performance areas.",
        "Shelf analytics: identify product interaction levels along each shelf and the zones that draw the most attention.",
        "Visual merchandising: evaluate the impact of layout and product display on customer behaviour.",
        "In-store conversion: detect where sales are generated (or lost) and optimise performance and average ticket.",
      ],
    },
    {
      img: `${CDN}/supermercados-customer.png`,
      imgAlt: "Real-time supermarket operational efficiency",
      title: "Real-time operational",
      titleHl: "efficiency",
      bullets: [
        "Traffic peaks: identify high-demand moments and anticipate operational needs.",
        "Queue management: reduce wait times, detect checkout saturation and improve the payment experience.",
        "Staff planning: align resources with real traffic and operational load.",
        "Zone saturation: detect bottlenecks and areas with excessive customer concentration.",
        "Continuous monitoring: visualise the state of the supermarket in real time to take immediate decisions.",
      ],
    },
    {
      img: `${CDN}/supermercados-impact.png`,
      imgAlt: "Turn supermarket traffic into customer relationships",
      title: "Turn traffic into customer",
      titleHl: "relationships",
      bullets: [
        "Guest WiFi: the first digital touchpoint to identify and connect with the visitor.",
        "Captive WiFi portal: capture and validate customer data GDPR-compliant and build your own first-party database.",
        "Customer identification: distinguish new vs returning visitors to understand behaviour, frequency and value.",
        "Real-time communication: trigger campaigns and messages during the visit based on context.",
        "Flame AI Agent: analyse the data and generate insights and automatic operational recommendations.",
      ],
    },
  ],
  productsTitle: "Integrated products,",
  productsTitleHl: "three levers",
  productsSub: "Measure and improve space performance, understand customer behaviour and connect with your visitors. Three products designed to build the retail operation of the modern supermarket.",
  productsBullets: [
    "Optimise layout and zone performance",
    "Real-time operational efficiency",
    "Turn traffic into customer relationships",
  ],
  products: [
    {
      iconImg: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
      name: "Traffic",
      desc: "Measure traffic inside and outside the supermarket, monitor occupancy in real time and measure conversion — all from a single platform.",
      href: "/en/traffic-insights/",
      cta: "Learn more",
      title: "Traffic",
      img: "/wp-content/uploads/elementor/thumbs/soles-rhd6bfkrxpa4y2pmucbbusoajb9e3ds7eidp13y7a4.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
      name: "Customer Journey",
      desc: "Analyse journeys and interactions across sections and shelves to understand in-store behaviour and optimise the experience at every touchpoint.",
      href: "/en/customer-journey/",
      cta: "Learn more",
      title: "Customer Journey",
      img: "/wp-content/uploads/2026/01/road-route-map-icon-1.png",
    },
    {
      iconImg: "/wp-content/uploads/2026/01/Group-1.png",
      name: "Connect",
      desc: "Collect visitor data through guest WiFi and launch personalised marketing campaigns based on their location, profile and behaviour.",
      href: "/en/connect/",
      cta: "Learn more",
      title: "Connect",
      img: "/wp-content/uploads/2026/01/Group-1.png",
    },
  ],
  testimonialsIdx: [0, 1, 7, 8],
  faqs: getFaqs("shopping-malls", "en"),
  ctaStripBold: "Turn every aisle, every shelf and every checkout into actionable data.",
  ctaStripLight: "Personalised demo in 20 minutes.",
};

export default function SupermarketsSector() {
  return <SectorTemplate cfg={cfg} enHref="/en/supermarkets/" />;
}
