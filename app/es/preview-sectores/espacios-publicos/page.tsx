import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { ESPACIOS_CFG } from "@/lib/sector-preview-configs";

export const metadata: Metadata = {
  title: "[BORRADOR] Espacios públicos · Flame Analytics",
  robots: { index: false, follow: false },
};

export default function PreviewEspacios() {
  return (
    <>
      <PreviewBanner label="Espacios públicos" />
      <SectorTemplate cfg={ESPACIOS_CFG} enHref="/en/public-venues/" />
    </>
  );
}
