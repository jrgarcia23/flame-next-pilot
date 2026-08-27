import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { HOTELES_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "[BORRADOR] Hoteles · Flame Analytics",
  robots: { index: false, follow: false },
};

export default function PreviewHoteles() {
  return (
    <>
      <PreviewBanner label="Hoteles" />
      <SectorTemplate cfg={HOTELES_CFG} enHref="/en/hospitality/" />
    </>
  );
}
