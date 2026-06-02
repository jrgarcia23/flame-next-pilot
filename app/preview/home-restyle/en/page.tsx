import type { Metadata } from "next";
import HomeRestyleTemplate from "@/components/templates/HomeRestyleTemplate";
import { HOME_CFG_EN } from "@/lib/home-config";

export const metadata: Metadata = {
  title: "Home restyle (preview EN) · Flame Analytics",
  description: "Preview of the EN restyle — same config as the production /en/ home.",
  robots: { index: false, follow: false },
};

export default function HomeRestyleENPreview() {
  return <HomeRestyleTemplate cfg={HOME_CFG_EN} enHref="/preview/home-restyle/en/" currentLang="en" />;
}
