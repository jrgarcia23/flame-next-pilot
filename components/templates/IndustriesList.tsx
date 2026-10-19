import Icon from "./Icon";

type Industry = { icon: string; title: string; href: string };

// Sección "Soluciones para cualquier industria" estática: título a la izquierda y los sectores
// como lista tipo menú en 2 columnas (opción F, JR 15-oct-2026). tone="dark" sobre navy
// (casos de uso), tone="light" sobre paper (productos, que vienen de Pilares en navy).
export default function IndustriesList({ items, title, titleHl, sub, tone = "dark" }: { items: Industry[]; title: string; titleHl: string; sub: string; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <section className={`py-16 relative overflow-hidden ind-list ind-list--${tone}`} style={{ background: dark ? "var(--color-navy)" : "var(--color-paper)", color: dark ? "white" : "var(--color-navy)" }}>
      {dark && <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(900px 500px at 12% -10%, rgb(49 177 248 / 0.08), transparent 62%), radial-gradient(700px 450px at 88% 110%, rgb(49 177 248 / 0.05), transparent 72%)" }} />}
      <div className="flame-container relative z-10 uc-ind">
        <div>
          <h2 className="text-[clamp(30px,3vw,42px)] font-normal" style={{ color: dark ? "#fff" : "var(--color-navy)", letterSpacing: "-0.02em", lineHeight: 1.08, fontFamily: "var(--font-display)" }}>
            {title} <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{titleHl}</span>
          </h2>
          <p className="mt-4 text-[clamp(16px,1.15vw,18px)] leading-relaxed" style={{ color: dark ? "rgb(255 255 255 / 0.72)" : "var(--color-ink-2)" }}>
            {sub}
          </p>
        </div>
        <ul className="uc-ind-list">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="uc-ind-link">
                <span className="uc-ind-icon"><Icon name={it.icon} className="w-5 h-5" /></span>
                <span className="uc-ind-name">{it.title}</span>
                <Icon name="arrow" className="w-4 h-4 uc-ind-arrow" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .uc-ind { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(28px, 5vw, 80px); align-items: center; }
        .uc-ind-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; column-gap: 32px; }
        .uc-ind-link { display: grid; grid-template-columns: 36px 1fr 20px; gap: 14px; align-items: center; padding: 14px 4px; transition: padding 250ms ease, color 250ms ease; }
        .ind-list--dark .uc-ind-link { border-bottom: 1px solid rgb(255 255 255 / 0.13); color: #fff; }
        .ind-list--light .uc-ind-link { border-bottom: 1px solid var(--color-rule); color: var(--color-navy); }
        .uc-ind-link:hover { padding-left: 10px; color: var(--color-accent) !important; }
        .ind-list--light .uc-ind-link:hover { color: var(--color-accent-deep) !important; }
        .uc-ind-icon { display: inline-flex; width: 36px; height: 36px; align-items: center; justify-content: center; border-radius: 10px; background: rgb(49 177 248 / 0.14); color: var(--color-accent); }
        .ind-list--light .uc-ind-icon { color: var(--color-accent-deep); }
        .uc-ind-name { font-size: 17px; font-weight: 600; }
        .uc-ind-arrow { color: var(--color-accent); opacity: 0.6; transition: transform 250ms ease, opacity 250ms ease; }
        .uc-ind-link:hover .uc-ind-arrow { transform: translateX(3px); opacity: 1; }
        @media (max-width: 900px) { .uc-ind { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .uc-ind-list { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .uc-ind-link, .uc-ind-arrow { transition: none !important; } }
      `}</style>
    </section>
  );
}
