import type { Metadata } from "next";
import CommunityListTemplate from "@/components/templates/CommunityListTemplate";
import { getListing } from "@/lib/comunidad";

export const metadata: Metadata = {
  title: "Blog · Comunidad Flame Analytics",
  description: "Artículos sobre analítica para espacios físicos, retail, hostelería y centros comerciales.",
};

export default function BlogList() {
  return (
    <CommunityListTemplate
      title="Blog"
      titleHl="Flame"
      desc="Artículos sobre analítica para el espacio físico: tendencias de retail, hospitality, centros comerciales y cómo el data intelligence está cambiando la toma de decisiones."
      posts={getListing("blog")}
      enHref="/en/blog/"
    />
  );
}
