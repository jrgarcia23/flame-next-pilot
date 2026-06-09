import type { Metadata } from "next";
import HomeRestyleTemplate from "@/components/templates/HomeRestyleTemplate";
import FlameIPadChat from "@/components/FlameIPadChat";
import { HOME_CFG_ES } from "@/lib/home-config";

export const metadata: Metadata = {
  title: "Preview — Flame Analytics",
  robots: { index: false, follow: false },
};

export default function PreviewHomePage() {
  return (
    <HomeRestyleTemplate
      cfg={{ ...HOME_CFG_ES, reportsNode: <FlameIPadChat /> }}
      enHref="/en/"
      currentLang="es"
    />
  );
}
