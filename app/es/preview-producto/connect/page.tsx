import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { cfg as connectCfg } from "@/app/es/connect/page";

export const metadata: Metadata = {
  title: "[BORRADOR] Connect + ficha de producto · Flame",
  robots: { index: false, follow: false },
};

// Mismo config real de Connect + la descarga de ficha de producto (provisional: PDF Marketing WiFi).
const cfg = {
  ...connectCfg,
  fichaPdf: "/fichas/connect.pdf",
  fichaTitle: "Connect",
  fichaHook: "Cómo el WiFi para invitados capta contactos, segmenta y activa campañas: la ficha de Connect en un PDF.",
};

export default function PreviewConnect() {
  return (
    <>
      <PreviewBanner label="Connect (ficha de producto)" />
      <ProductTemplate cfg={cfg} enHref="/en/connect/" />
    </>
  );
}
