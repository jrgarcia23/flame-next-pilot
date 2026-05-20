import type { Metadata } from "next";
import CommunityListTemplate from "@/components/templates/CommunityListTemplate";
import { getListing } from "@/lib/comunidad";

export const metadata: Metadata = {
  title: "Whitepapers · Comunidad Flame Analytics",
  description: "Estudios y guías en profundidad para decidir con datos en el espacio físico.",
};

export default function WhitepapersList() {
  return (
    <CommunityListTemplate
      title=""
      titleHl="Whitepapers"
      desc="Estudios y guías en profundidad sobre analítica del espacio físico, métricas clave y mejores prácticas para retail, centros comerciales y espacios públicos."
      posts={getListing("whitepapers")}
      enHref="/en/whitepapers/"
      emptyMessage="Estamos preparando los primeros whitepapers de la nueva temporada. Suscríbete a la newsletter para enterarte cuando se publiquen."
    />
  );
}
