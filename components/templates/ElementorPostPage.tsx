import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { BlogPost, Lang } from "@/lib/blog";
import type { ElementorPostContent } from "@/lib/elementor-special-posts";

/**
 * Renderiza un post Elementor preservando su maquetación original tal cual
 * estaba en el demo. Carga los CSS Elementor críticos desde el demo (mientras
 * siga online) y muestra el HTML extraído como bloque dangerouslySetInnerHTML.
 *
 * Mantiene SiteHeader/SiteFooter de Flame Next para que la navegación de la
 * web siga siendo coherente.
 */
export default function ElementorPostPage({
  lang, post, content,
}: { lang: Lang; post: BlogPost; content: ElementorPostContent }) {
  const enHref = lang === "es" ? `/en/` : `/es/`;
  // En casos de éxito el hero muestra la carátula (cuadrada, misma que el listado):
  // el shot pasa a 1:1 y se quita el overlay para que se vea completa y sin oscurecer.
  const isCase = ["casos-de-exito", "case-studies", "retail-case-studies", "shopping-malls-case-studies"].includes(post.category?.slug || "");
  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={lang} enHref={enHref} />

      {/* CSS Elementor cargados desde el demo (cross-origin OK para stylesheets).
          Si el demo deja de servirlos en el futuro, hay que copiar estos archivos a public/. */}
      {content.cssUrls.map((url, i) => (
        <link key={i} rel="stylesheet" href={url} />
      ))}
      {content.inlineCss && (
        <style dangerouslySetInnerHTML={{ __html: content.inlineCss }} />
      )}

      <main
        className="elementor-special-post"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />

      {/* Re-escritura puntual para que el contenido Elementor se asiente bien sin
          chocar con los estilos globales de Flame (font-family, line-height base). */}
      <style>{`
        .elementor-special-post { font-family: "Roboto", "Roboto Slab", "Helvetica Neue", Arial, sans-serif; line-height: 1.5; color: #15163A; }
        .elementor-special-post img { max-width: 100%; height: auto; }
        .elementor-special-post .elementor-widget-text-editor p { margin-bottom: 1em; }
        /* Casos de éxito atemporales: ocultar la fecha de las tarjetas de "otros casos". */
        .elementor-special-post .date { display: none !important; }
      `}</style>
      {isCase && (
        <style>{`
          .elementor-special-post .mo-hero-shot { aspect-ratio: 1 / 1 !important; }
          .elementor-special-post .mo-hero-shot-overlay { display: none !important; }
        `}</style>
      )}

      <SiteFooter currentLang={lang} />
    </>
  );
}
