import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";
import { BlogPost, categoryLabel, formatDate, shortExcerpt, Lang } from "@/lib/blog";
import { getCategoryMeta, POSTS_PER_PAGE } from "@/lib/category-meta";
import { sanitizeTitle } from "@/lib/sanitize-title";

type Props = {
  lang: Lang;
  categorySlug: string;
  posts: BlogPost[];          // ya filtrados por categoría, ordenados por fecha desc
  currentPage: number;         // 1-indexed
};

export default function CategoryListTemplate({ lang, categorySlug, posts, currentPage }: Props) {
  const meta = getCategoryMeta(categorySlug);
  const label = categoryLabel(categorySlug, lang);
  const tagline = lang === "en" ? meta.taglineEn : meta.taglineEs;
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const pageItems = posts.slice(start, start + POSTS_PER_PAGE);

  const basePath = lang === "es"
    ? `/es/categoria/${categorySlug}/`
    : `/en/category/${categorySlug}/`;
  const homePath = lang === "es" ? "/es/" : "/en/";
  const communityPath = lang === "es" ? "/es/comunidad/" : "/en/community/";

  // Helper para link a página N
  const pageHref = (n: number) => (n === 1 ? basePath : `${basePath}page/${n}/`);

  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={lang} />

      {/* HERO con imagen de fondo + texto alineado a la izquierda al borde del flame-container */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)", color: "#fff",
          paddingTop: "clamp(80px, 9vw, 120px)",
          paddingBottom: "clamp(48px, 5vw, 72px)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `url('${meta.heroImg}')`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgb(21 22 58 / 0.96) 0%, rgb(21 22 58 / 0.86) 45%, rgb(21 22 58 / 0.6) 100%)" }}
        />
        <div className="flame-container relative z-10">
          <nav className="text-[14px] mb-5" style={{ color: "rgb(255 255 255 / 0.6)" }}>
            <a href={homePath} style={{ color: "inherit" }}>{lang === "en" ? "Home" : "Inicio"}</a>
            <span className="mx-2">›</span>
            <a href={communityPath} style={{ color: "inherit" }}>{lang === "en" ? "Community" : "Comunidad"}</a>
          </nav>
          <h1
            className="text-[clamp(36px,4.6vw,60px)] font-normal mb-4"
            style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.05, fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{label}</span>
          </h1>
          <p
            className="text-[clamp(16px,1.25vw,18px)] leading-[1.55]"
            style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "58ch" }}
          >
            {tagline}
          </p>
        </div>
      </section>

      {/* GRID 4 cols × 5 rows (20 por página) */}
      <section className="py-16" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-7 cat-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
            {pageItems.map((p) => {
              const img = p.thumbnail || p.hero;
              return (
                <a
                  key={p.slug}
                  href={`/${lang}/${p.slug}/`}
                  className="group block rounded-2xl overflow-hidden cat-card"
                  style={{ background: "#fff", border: "1px solid var(--color-rule)" }}
                >
                  {img && (
                    <div
                      style={{ aspectRatio: "1/1", background: `url('${img}') center/cover` }}
                    />
                  )}
                  <div className="p-5">
                    <p
                      className="text-[11.5px] uppercase font-semibold mb-2"
                      style={{ color: "var(--color-accent-deep)", letterSpacing: "0.08em" }}
                    >
                      {label}
                    </p>
                    <h3
                      className="font-medium mb-2 group-hover:text-[--color-accent-deep] transition"
                      style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.22 }}
                      dangerouslySetInnerHTML={{ __html: sanitizeTitle(p.title) }}
                    />
                    <p className="text-[13.5px] mb-2" style={{ color: "var(--color-ink-2)" }}>
                      {shortExcerpt(p.html, 100)}
                    </p>
                    <p className="text-[12px]" style={{ color: "var(--color-ink-3)" }}>
                      {formatDate(p.date, lang)}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <nav className="pagination mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
              {/* Prev */}
              {safePage > 1 && (
                <a href={pageHref(safePage - 1)} className="page-link" rel="prev">‹ {lang === "en" ? "Prev" : "Anterior"}</a>
              )}
              {/* Numbers (compact: 1 … prev current next … last) */}
              {buildPagesArray(safePage, totalPages).map((n, i) =>
                n === "…" ? (
                  <span key={`gap-${i}`} className="page-gap">…</span>
                ) : n === safePage ? (
                  <span key={n} className="page-link is-current" aria-current="page">{n}</span>
                ) : (
                  <a key={n} href={pageHref(n as number)} className="page-link">{n}</a>
                )
              )}
              {/* Next */}
              {safePage < totalPages && (
                <a href={pageHref(safePage + 1)} className="page-link" rel="next">{lang === "en" ? "Next" : "Siguiente"} ›</a>
              )}
            </nav>
          )}
        </div>
        <style>{`
          @media (max-width: 1100px) { .cat-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 780px)  { .cat-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 460px)  { .cat-grid { grid-template-columns: 1fr !important; max-width: 360px; margin: 0 auto; } }
          .cat-card { transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms; }
          .cat-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px -18px rgb(15 23 42 / 0.18); }
          .page-link {
            display: inline-flex; align-items: center; justify-content: center;
            min-width: 40px; height: 40px; padding: 0 12px;
            border-radius: 8px; font-size: 14.5px; font-weight: 600;
            color: var(--color-ink-2); text-decoration: none;
            background: #fff; border: 1px solid var(--color-rule);
            transition: background 180ms, color 180ms, border-color 180ms;
          }
          .page-link:hover { background: var(--color-paper-soft); color: var(--color-navy); border-color: var(--color-rule-strong); }
          .page-link.is-current { background: var(--color-navy); color: #fff; border-color: var(--color-navy); cursor: default; }
          .page-gap { color: var(--color-ink-3); padding: 0 4px; }
        `}</style>
      </section>

      <SiteFooter currentLang={lang} />
    </>
  );
}

// Construye array tipo [1, "…", 4, 5, 6, "…", 12] con elipsis cuando hay muchas páginas.
function buildPagesArray(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let n = Math.max(2, current - 1); n <= Math.min(total - 1, current + 1); n++) {
    pages.push(n);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}
