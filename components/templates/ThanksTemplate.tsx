import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";

export default function ThanksTemplate({
  enHref,
  title,
  subtitle,
  body,
  nextSteps,
  currentLang = "es",
}: {
  enHref: string;
  title: string;
  subtitle: string;
  body: string;
  nextSteps?: { label: string; href: string }[];
  currentLang?: "es" | "en";
}) {
  return (
    <>
      <CtaStyles />
      <SiteHeader enHref={enHref} currentLang={currentLang} />

      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background: "var(--color-navy)",
          color: "white",
          minHeight: "70vh",
          paddingTop: "clamp(72px, 8.4vw, 116px)",
          paddingBottom: "clamp(72px, 8.4vw, 116px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 50% -10%, rgb(49 177 248 / 0.2), transparent 65%), radial-gradient(700px 400px at 50% 110%, rgb(49 177 248 / 0.1), transparent 70%)" }} />
        <div className="flame-container relative z-10 text-center mx-auto">
          <span className="inline-flex items-center justify-center rounded-full mx-auto mb-7" style={{ width: 84, height: 84, background: "rgb(49 177 248 / 0.16)", color: "var(--color-accent)" }}>
            <Icon name="check" className="w-10 h-10" />
          </span>
          <span className="block text-[14px] font-mono uppercase tracking-[0.18em] mb-5" style={{ color: "var(--color-accent)" }}>
            {subtitle}
          </span>
          <h1 className="mx-auto text-[clamp(36px,4.8vw,60px)] font-normal" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.08, fontFamily: "var(--font-display)", maxWidth: "20ch" }}>
            {title}
          </h1>
          <p className="mx-auto mt-6 text-[clamp(17px,1.35vw,19px)] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.82)", maxWidth: "60ch" }}>
            {body}
          </p>
          {nextSteps && nextSteps.length > 0 && (
            <div className="mt-10 inline-flex flex-wrap gap-3 justify-center">
              {nextSteps.map((s, i) => (
                <a key={i} href={s.href} className={i === 0 ? "cta-btn cta-btn--lg" : "cta-btn cta-btn--lg"} style={i === 0 ? { background: "var(--color-accent)", color: "var(--color-navy)" } : { background: "transparent", color: "#fff", border: "1px solid rgb(255 255 255 / 0.2)" }}>
                  {s.label}
                  {i === 0 && <Icon name="arrow" className="w-4 h-4" />}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
