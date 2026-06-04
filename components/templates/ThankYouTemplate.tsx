import Icon from "./Icon";
import { CtaStyles, SiteHeader, SiteFooter } from "./SiteChrome";

type Props = {
  currentLang: "es" | "en";
  enHref: string;
  eyebrow: string;
  title: string;
  titleHl: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  nextSteps?: { icon: string; title: string; desc: string }[];
  /** Imagen de fondo del hero (relative path en /public). Opcional. */
  heroImage?: string;
};

export default function ThankYouTemplate({
  currentLang, enHref, eyebrow, title, titleHl, body,
  primaryCta, secondaryCta, nextSteps, heroImage,
}: Props) {
  return (
    <>
      <CtaStyles />
      <SiteHeader currentLang={currentLang} enHref={enHref} />

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "var(--color-navy)", color: "white",
          paddingTop: "clamp(80px, 9vw, 140px)", paddingBottom: "clamp(60px, 6vw, 100px)",
        }}
      >
        {heroImage && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: `url('${heroImage}')`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: heroImage
              ? "linear-gradient(180deg, rgb(21 22 58 / 0.62) 0%, rgb(21 22 58 / 0.85) 60%, var(--color-navy) 100%)"
              : "radial-gradient(900px 500px at 50% -10%, rgb(49 177 248 / 0.18), transparent 62%), radial-gradient(700px 450px at 50% 120%, rgb(49 177 248 / 0.10), transparent 72%)",
          }}
        />
        <div className="flame-container relative z-10 text-center" style={{ maxWidth: 760 }}>
          {/* Check badge */}
          <div className="inline-flex items-center justify-center rounded-full mb-8" style={{ width: 72, height: 72, background: "rgba(49,177,248,0.15)", border: "2px solid rgba(49,177,248,0.35)" }}>
            <span style={{ color: "var(--color-accent)", fontSize: 36, lineHeight: 1, fontWeight: 700 }}>✓</span>
          </div>
          <p className="mb-4 font-medium" style={{ color: "var(--color-accent)", fontSize: 13, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-body)" }}>
            {eyebrow}
          </p>
          <h1 className="text-[clamp(40px,5vw,64px)] font-normal mb-6" style={{ color: "#fff", letterSpacing: "-0.022em", lineHeight: 1.06, fontFamily: "var(--font-display)" }}>
            {title} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{titleHl}</span>
          </h1>
          <p className="mx-auto text-[clamp(17px,1.35vw,19px)] leading-[1.55] mb-10" style={{ color: "rgb(255 255 255 / 0.84)", maxWidth: "56ch" }}>
            {body}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={primaryCta.href} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
              {primaryCta.label} <Icon name="arrow" className="w-4 h-4" />
            </a>
            {secondaryCta && (
              <a href={secondaryCta.href} className="cta-btn cta-btn--lg" style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", fontWeight: 600 }}>
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* NEXT STEPS (opcional) */}
      {nextSteps && nextSteps.length > 0 && (
        <section className="py-20" style={{ background: "var(--color-paper)" }}>
          <div className="flame-container">
            <div className="text-center mb-12">
              <h2 className="font-normal" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: "clamp(26px, 2.8vw, 36px)", letterSpacing: "-0.018em" }}>
                {currentLang === "es" ? "¿Y ahora qué?" : "What's next?"}
              </h2>
            </div>
            <div className="grid gap-6 ty-grid" style={{ gridTemplateColumns: `repeat(${nextSteps.length}, 1fr)`, maxWidth: 1100, margin: "0 auto" }}>
              {nextSteps.map((s, i) => (
                <article key={i} className="rounded-2xl p-7" style={{ background: "#fff", border: "1px solid var(--color-rule)" }}>
                  <span className="inline-flex items-center justify-center rounded-[12px] mb-4" style={{ width: 48, height: 48, background: "rgb(49 177 248 / 0.12)", color: "var(--color-accent-deep)" }}>
                    <Icon name={s.icon} className="w-6 h-6" />
                  </span>
                  <h3 className="font-medium mb-2" style={{ color: "var(--color-navy)", fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "-0.012em", lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ color: "var(--color-ink-2)", fontSize: 15, lineHeight: 1.6 }}>{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 900px) { .ty-grid { grid-template-columns: 1fr !important; max-width: 480px !important; } }
          `}</style>
        </section>
      )}

      <SiteFooter currentLang={currentLang} />
    </>
  );
}
