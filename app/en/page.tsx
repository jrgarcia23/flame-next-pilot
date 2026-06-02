import type { Metadata } from "next";
import HomeRestyleTemplate from "@/components/templates/HomeRestyleTemplate";
import { HOME_CFG_EN } from "@/lib/home-config";

export const metadata: Metadata = {
  title: "Flame Analytics · AI video analytics for physical spaces",
  description:
    "Turning video into real-time insights for your business. Traffic, occupancy, customer journey and conversion — no biometrics, GDPR by design.",
  alternates: {
    canonical: "/en/",
    languages: { es: "/es/", en: "/en/", "x-default": "/es/" },
  },
};

export default function HomeENPage() {
  return <HomeRestyleTemplate cfg={HOME_CFG_EN} enHref="/en/" currentLang="en" />;
}
