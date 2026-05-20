import type { Metadata } from "next";
import CommunityListTemplate from "@/components/templates/CommunityListTemplate";
import { getListing } from "@/lib/comunidad";

export const metadata: Metadata = {
  title: "Webinars · Comunidad Flame Analytics",
  description: "Sesiones en vídeo con expertos sobre data intelligence aplicada al espacio físico.",
};

export default function WebinarsList() {
  return (
    <CommunityListTemplate
      title=""
      titleHl="Webinars"
      desc="Sesiones en vídeo con clientes, partners y nuestro equipo sobre cómo extraer valor real de los datos en retail, hostelería y centros comerciales."
      posts={getListing("webinars")}
      enHref="/en/webinars/"
    />
  );
}
