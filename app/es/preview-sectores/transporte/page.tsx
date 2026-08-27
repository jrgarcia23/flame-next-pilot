import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { TRANSPORTE_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "[BORRADOR] Transporte y aeropuertos · Flame Analytics",
  robots: { index: false, follow: false },
};

export default function PreviewTransporte() {
  return (
    <>
      <PreviewBanner label="Transporte y aeropuertos" />
      <SectorTemplate cfg={TRANSPORTE_CFG} enHref="/en/" />
    </>
  );
}
