// Helpers de JSON-LD para Flame Analytics.
// Centraliza la generación de schema.org para que cada página solo decida QUÉ
// inyectar, no CÓMO componerlo.
//
// Schemas cubiertos:
//   - Organization, WebSite (layout root)
//   - BlogPosting con Person author + Breadcrumb
//   - BreadcrumbList (cualquier página)
//   - FAQPage (servicios + posts con topic FAQ asociado)

import type { BlogPost, Lang } from "./blog";
import type { FaqBlock } from "./faqs";

const SITE = "https://www.flameanalytics.com";

const STRIP_HTML = (s: string) => s.replace(/<[^>]+>/g, "").trim();

// ---------- ORGANIZATION ----------
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Flame Analytics",
  legalName: "Flame Analytics S.L.",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE}/#logo`,
    url: `${SITE}/wp-content/uploads/2023/10/flame-logo-black.png`,
    contentUrl: `${SITE}/wp-content/uploads/2023/10/flame-logo-black.png`,
    caption: "Flame Analytics",
  },
  description:
    "Plataforma de analítica de vídeo con IA para espacios físicos: retail, centros comerciales, hostelería y espacios públicos.",
  foundingDate: "2016",
  founder: { "@type": "Person", name: "Jonathan Solís" },
  email: "info@flameanalytics.com",
  sameAs: [
    "https://www.linkedin.com/company/flame-analytics/",
    "https://twitter.com/flameanalytics",
    "https://www.youtube.com/@flameanalytics",
  ],
};

// ---------- WEBSITE ----------
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Flame Analytics",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: ["es", "en"],
};

// ---------- BREADCRUMB ----------
export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE}${it.url}`,
    })),
  };
}

export function postBreadcrumb(post: BlogPost, lang: Lang): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: lang === "es" ? "Inicio" : "Home", url: `/${lang}/` },
  ];
  if (post.category?.slug) {
    items.push({
      name: post.category.name,
      url: `/${lang}/categoria/${post.category.slug}/`,
    });
  }
  items.push({ name: STRIP_HTML(post.title), url: `/${lang}/${post.slug}/` });
  return items;
}

// ---------- BLOG POSTING ----------
export function blogPostingSchema(post: BlogPost, lang: Lang) {
  const url = `${SITE}/${lang}/${post.slug}/`;
  // Fallback: si el post no tiene hero (algunos importados del WP solo guardaron
  // thumbnail), usar thumbnail. Sin imagen, Google rechaza el rich result.
  const heroOrThumb = post.hero || post.thumbnail || "";
  const image = heroOrThumb
    ? [heroOrThumb.startsWith("http") ? heroOrThumb : `${SITE}${heroOrThumb}`]
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    isPartOf: { "@id": `${SITE}/#website` },
    inLanguage: lang,
    headline: STRIP_HTML(post.title),
    description: post.excerpt || undefined,
    datePublished: post.date,
    dateModified: post.modified,
    // E-E-A-T: autor como Person (cuando se pueda detectar) vs Organization
    author: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Flame Analytics",
      url: SITE,
    },
    publisher: { "@id": `${SITE}/#organization` },
    image,
    articleSection: post.category?.name,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

// ---------- FAQ ----------
export function faqSchema(faq: FaqBlock) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((it) => ({
      "@type": "Question",
      name: STRIP_HTML(it.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: STRIP_HTML(it.a),
      },
    })),
  };
}

// ---------- HELPER: inyectar varios schemas a la vez en JSX ----------
// Uso típico: <SchemaScripts schemas={[breadcrumbSchema(...), faqSchema(...)]} />
export function serializeSchemas(schemas: unknown[]): string {
  return schemas.map((s) => JSON.stringify(s)).join("\n");
}

// Extrae FAQs de un HTML que use <details><summary>...</summary>...</details>
// Si encuentra 3+ pares válidos, devuelve un FAQPage schema; si no, null.
export function faqSchemaFromHtml(html: string): unknown | null {
  const detailsRx = /<details\b[^>]*>([\s\S]*?)<\/details>/gi;
  const items: { q: string; a: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = detailsRx.exec(html)) !== null) {
    const inner = m[1];
    const summary = inner.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i);
    if (!summary) continue;
    const q = STRIP_HTML(summary[1]);
    const rest = inner.replace(summary[0], "");
    const a = STRIP_HTML(rest);
    if (q && a) items.push({ q, a });
  }
  if (items.length < 3) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
