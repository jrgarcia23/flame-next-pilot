import type { Metadata } from "next";
import HomeRestyleTemplate from "@/components/templates/HomeRestyleTemplate";
import { HOME_CFG_ES } from "@/lib/home-config";

export const metadata: Metadata = {
  title: "Flame Analytics · Analítica de vídeo con IA para espacios físicos",
  description:
    "Transformamos el vídeo en información en tiempo real para tu negocio. Tráfico, ocupación, customer journey y conversión, sin biometría y RGPD por diseño.",
  alternates: {
    canonical: "/es/",
    languages: { es: "/es/", en: "/en/", "x-default": "/es/" },
  },
};

export default function HomeESPage() {
  return <HomeRestyleTemplate cfg={HOME_CFG_ES} enHref="/en/" currentLang="es" />;
}
