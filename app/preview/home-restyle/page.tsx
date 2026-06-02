import type { Metadata } from "next";
import HomeRestyleTemplate from "@/components/templates/HomeRestyleTemplate";
import { HOME_CFG_ES } from "@/lib/home-config";

export const metadata: Metadata = {
  title: "Home restyle (preview ES) · Flame Analytics",
  description: "Preview del restyle ES — misma config que la home productiva en /es/.",
  robots: { index: false, follow: false },
};

export default function HomeRestyleESPreview() {
  return <HomeRestyleTemplate cfg={HOME_CFG_ES} enHref="/preview/home-restyle/en/" currentLang="es" />;
}
