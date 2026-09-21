import type { Metadata } from "next";
import SectorTemplate from "@/components/templates/SectorTemplate";
import { WIFI_MALLS_CFG_EN } from "@/lib/campaign-wifi-malls-en";

// Landing de campaña: NO va al sitemap (el sitemap es lista blanca) y no se indexa.
export const metadata: Metadata = {
  title: "Guest WiFi for Shopping Malls · Flame Analytics",
  description:
    "Turn the WiFi your mall already has into a visitor database and a marketing channel. No new hardware, GDPR compliant.",
  robots: { index: false, follow: true },
};

export default function WifiForShoppingMallsCampaignEN() {
  return (
    <SectorTemplate
      cfg={WIFI_MALLS_CFG_EN}
      enHref="/en/wifi-for-shopping-malls/"
      currentLang="en"
    />
  );
}
