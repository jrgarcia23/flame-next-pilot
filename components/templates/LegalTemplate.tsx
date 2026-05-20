import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";

export default function LegalTemplate({
  enHref,
  title,
  lastUpdate,
  bodyHtml,
}: {
  enHref: string;
  title: string;
  lastUpdate: string;
  bodyHtml: string;
}) {
  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} />

      {/* HERO compacto */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)",
          color: "white",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(48px, 5vw, 64px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(800px 400px at 50% -10%, rgb(49 177 248 / 0.14), transparent 65%)" }} />
        <div className="flame-container relative z-10">
          <span className="inline-block text-[14px] font-mono uppercase tracking-[0.18em] mb-5 pb-1.5" style={{ color: "var(--color-accent)", borderBottom: "1px solid rgb(49 177 248 / 0.4)" }}>
            Legal
          </span>
          <h1 className="text-[clamp(36px,4.8vw,60px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.08, fontFamily: "var(--font-display)", maxWidth: "22ch" }}>
            {title}
          </h1>
          <p className="mt-4 text-[14px] font-mono" style={{ color: "rgb(255 255 255 / 0.55)" }}>
            Última actualización: {lastUpdate}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-20" style={{ background: "#fff" }}>
        <div className="flame-container">
          <article
            className="legal-body mx-auto"
            style={{ maxWidth: 720 }}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </div>
        <style>{`
          .legal-body { font-size: 16px; line-height: 1.7; color: var(--color-ink); font-family: var(--font-body); }
          .legal-body h2 { font-family: var(--font-display); font-weight: 500; font-size: clamp(22px, 2vw, 28px); margin: 2.4em 0 0.6em; letter-spacing: -0.012em; color: var(--color-navy); }
          .legal-body h3 { font-family: var(--font-display); font-weight: 500; font-size: clamp(18px, 1.5vw, 22px); margin: 1.8em 0 0.4em; color: var(--color-navy); }
          .legal-body p { margin: 0 0 1.1em; color: var(--color-ink-2); }
          .legal-body ul, .legal-body ol { padding-left: 1.4em; margin: 0 0 1.1em; }
          .legal-body li { margin: 0.4em 0; color: var(--color-ink-2); }
          .legal-body strong { color: var(--color-navy); font-weight: 600; }
          .legal-body a { color: var(--color-accent-deep); border-bottom: 1px solid currentColor; }
          .legal-body a:hover { color: var(--color-accent); }
        `}</style>
      </section>

      <SiteFooter />
    </>
  );
}
