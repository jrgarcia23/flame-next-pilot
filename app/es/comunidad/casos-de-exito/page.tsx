import type { Metadata } from "next";
import CommunityListTemplate from "@/components/templates/CommunityListTemplate";
import { getListing } from "@/lib/comunidad";

export const metadata: Metadata = {
  title: "Casos de éxito · Comunidad Flame Analytics",
  description: "Cómo retailers, centros comerciales y espacios públicos usan Flame para medir y decidir con datos reales.",
};

export default function CasosList() {
  return (
    <CommunityListTemplate
      title="Casos"
      titleHl="de éxito"
      desc="Historias reales de cómo las marcas usan la analítica de Flame para mejorar tráfico, conversión, ocupación y experiencia del visitante en sus espacios físicos."
      posts={getListing("casos")}
      enHref="/en/case-studies/"
    />
  );
}
