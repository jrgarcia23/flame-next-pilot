import type { Metadata } from "next";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import GuidesResourcesSection from "@/components/GuidesResourcesSection";

export const metadata: Metadata = {
  title: "Bloque Guías y recursos (preview) · Flame Analytics",
  description:
    "Preview interno del bloque de interlinking home→guías pilar. No indexable.",
  robots: { index: false, follow: false },
};

function PreviewNote({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--color-navy)", color: "rgb(255 255 255 / 0.85)", padding: "14px 0" }}>
      <div className="flame-container" style={{ fontSize: 14, letterSpacing: "0.01em" }}>
        {children}
      </div>
    </div>
  );
}

export default function HomeGuiasPreview() {
  return (
    <>
      <CtaStyles />
      <SiteHeader enHref="/preview/home-guias/" currentLang="es" />
      <PreviewNote>
        <strong style={{ color: "#31b1f8" }}>PREVIEW INTERNO</strong> · Bloque
        &quot;Guías y recursos&quot; para la parte baja de la home (se insertaría
        entre el formulario de demo y el footer). Página noindex, fuera del
        sitemap. Abajo, versión ES y versión EN.
      </PreviewNote>
      <GuidesResourcesSection lang="es" />
      <PreviewNote>
        <strong style={{ color: "#31b1f8" }}>VERSIÓN EN</strong> · &quot;Guides &amp;
        resources&quot; para la home inglesa (/en/).
      </PreviewNote>
      <GuidesResourcesSection lang="en" />
      <SiteFooter currentLang="es" />
    </>
  );
}
