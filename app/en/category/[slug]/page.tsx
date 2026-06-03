import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaStyles, SiteHeader, SiteFooter } from "@/components/templates/SiteChrome";
import { getCategoryListing, getAllCategories, categoryLabel, formatDate, shortExcerpt } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories("en").map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const label = categoryLabel(slug, "en");
  return {
    title: `${label} · Flame Analytics Community`,
    description: `${label} articles on Flame Analytics: analysis, case studies and industry news.`,
    alternates: { canonical: `/en/category/${slug}/` },
  };
}

export default async function CategoryEn({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getCategoryListing(slug, "en");
  if (!posts.length) return notFound();
  const label = categoryLabel(slug, "en");
  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang="en" />

      <section className="relative overflow-hidden" style={{ background: "var(--color-navy)", color: "white", paddingTop: "clamp(72px, 8.4vw, 116px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <div className="flame-container relative z-10" style={{ maxWidth: 900 }}>
          <nav className="text-[14px] mb-5" style={{ color: "rgb(255 255 255 / 0.6)" }}>
            <a href="/en/" style={{ color: "inherit" }}>Home</a>
            <span className="mx-2">›</span>
            <a href="/en/community/" style={{ color: "inherit" }}>Community</a>
          </nav>
          <h1 className="text-[clamp(34px,4vw,52px)] font-normal mb-3" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.1, fontFamily: "var(--font-display)" }}>
            <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{label}</span>
          </h1>
          <p className="text-[16px]" style={{ color: "rgb(255 255 255 / 0.78)" }}>{posts.length} articles</p>
        </div>
      </section>

      <section className="py-16" style={{ background: "var(--color-paper)" }}>
        <div className="flame-container">
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {posts.map(p => (
              <a key={p.slug} href={`/en/${p.slug}/`} className="block group rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                {p.hero && <div style={{ aspectRatio: "16/9", background: `url('${p.hero}') center/cover` }} />}
                <div className="p-6">
                  <p className="text-[12px] uppercase font-semibold mb-2" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.08em" }}>{label}</p>
                  <h3 className="font-medium mb-2 group-hover:text-[--color-accent-deep] transition" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 19, lineHeight: 1.25 }} dangerouslySetInnerHTML={{ __html: p.title }} />
                  <p className="text-[14px] mb-2" style={{ color: "var(--color-ink-2)" }}>{shortExcerpt(p.html, 110)}</p>
                  <p className="text-[12.5px]" style={{ color: "var(--color-ink-3)" }}>{formatDate(p.date, "en")}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
