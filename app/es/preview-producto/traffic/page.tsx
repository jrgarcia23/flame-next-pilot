import type { Metadata } from "next";
import ProductTemplate from "@/components/templates/ProductTemplate";
import PreviewBanner from "@/components/PreviewBanner";
import { cfg as trafficCfg } from "@/app/es/analitica-trafico/page";

export const metadata: Metadata = {
  title: "[BORRADOR] Traffic + ficha de producto · Flame",
  robots: { index: false, follow: false },
};

// Mismo config real de Traffic + la descarga de ficha (PDF real: Ficha_Traffic_ES).
// Traffic tiene 6 funcionalidades (PAR) → la ficha se muestra como banda a todo el ancho.
const cfg = {
  ...trafficCfg,
  fichaPdf: "/fichas/traffic.pdf",
  fichaTitle: "Traffic",
  fichaHook: "Del transeúnte exterior a la venta: los 6 módulos de analítica de tráfico de Flame en un PDF.",
};

export default function PreviewTraffic() {
  return (
    <>
      <PreviewBanner label="Traffic (ficha de producto)" />
      <ProductTemplate cfg={cfg} enHref="/en/traffic-insights/" />
    </>
  );
}
