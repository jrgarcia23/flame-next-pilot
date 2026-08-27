import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { RETAIL_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "[BORRADOR] Retail · Flame Analytics",
  robots: { index: false, follow: false },
};

export default function PreviewRetail() {
  return (
    <>
      <PreviewBanner label="Retail" />
      <SectorTemplate cfg={RETAIL_CFG} enHref="/en/solution-for-retail-sector/" />
    </>
  );
}
