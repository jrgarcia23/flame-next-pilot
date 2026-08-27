import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { SUPERMERCADOS_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "[BORRADOR] Supermercados · Flame Analytics",
  robots: { index: false, follow: false },
};

export default function PreviewSupermercados() {
  return (
    <>
      <PreviewBanner label="Supermercados" />
      <SectorTemplate cfg={SUPERMERCADOS_CFG} enHref="/en/supermarkets/" />
    </>
  );
}
