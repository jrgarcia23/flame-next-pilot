import type { Metadata } from "next";
import HomeRestyleTemplate from "@/components/templates/HomeRestyleTemplate";
import { HOME_CFG_EN } from "@/lib/home-config";
import { selectCaseCards } from "@/lib/case-cards";

export const metadata: Metadata = {
  title: "[DRAFT] Home v2 · features (EN) · Flame Analytics",
  description: "Internal preview of the EN home with use cases as the lead block.",
  robots: { index: false, follow: false },
};

export default async function HomeV2PreviewEN() {
  const caseStudies = await selectCaseCards({}, { lang: "en" });
  return <HomeRestyleTemplate cfg={HOME_CFG_EN} enHref="/preview/home-v2-funcionalidades/" currentLang="en" v2={{ advantages: "none", layout: "funcs", caseStudies }} />;
}
