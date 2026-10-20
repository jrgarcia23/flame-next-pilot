import type { Metadata } from "next";
import HomeRestyleTemplate from "@/components/templates/HomeRestyleTemplate";
import { HOME_CFG_ES } from "@/lib/home-config";
import { selectCaseCards } from "@/lib/case-cards";

export const metadata: Metadata = {
  title: "[DRAFT] Home v2 · compacta · Flame Analytics",
  description: "Preview interno de la home con casos de uso como bloque protagonista.",
  robots: { index: false, follow: false },
};

export default async function HomeV2Preview() {
  const caseStudies = await selectCaseCards({});
  return <HomeRestyleTemplate cfg={HOME_CFG_ES} enHref="/en/" currentLang="es" v2={{ advantages: "compact", caseStudies }} />;
}
