import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { BANCOS_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "[BORRADOR] Bancos y sucursales · Flame Analytics",
  robots: { index: false, follow: false },
};

export default function PreviewBancos() {
  return (
    <>
      <PreviewBanner label="Bancos y sucursales" />
      <SectorTemplate cfg={BANCOS_CFG} enHref="/en/" />
    </>
  );
}
