import Icon from "@/components/templates/Icon";
import type { HomeUseCase } from "@/lib/home-use-cases";
import { HOME_USE_CASE_MEDIA } from "@/lib/home-use-cases";

// Opción A4 (elegida por JR, 22-oct): acordeón horizontal de fotos. Las 9 franjas empiezan iguales;
// la que se señala (ratón o foco de teclado) se abre y muestra el caso. En móvil, lista vertical.
export default function UseCaseAccordion({ items, lang }: { items: HomeUseCase[]; lang: "es" | "en" }) {
  const cta = lang === "en" ? "Explore use case" : "Ver caso de uso";
  return (
    <div className="uca">
      {items.map((u) => (
        <a key={u.href} href={u.href} className="uca-p" style={{ backgroundImage: `url('${HOME_USE_CASE_MEDIA[u.href]?.photo}')` }}>
          <span className="uca-veil" />
          <span className="uca-closed"><img src={u.iconImg} alt="" width={40} height={40} /><span>{u.title}</span></span>
          <span className="uca-open">
            <img src={u.iconImg} alt="" width={44} height={44} />
            <span className="uca-t">{u.title}</span>
            <span className="uca-i">{u.intro}</span>
            <span className="uca-cta">{cta} <Icon name="arrow" className="w-4 h-4" /></span>
          </span>
        </a>
      ))}
      <style>{`
        .uca { display: flex; gap: 10px; height: 460px; }
        .uca-p { position: relative; flex: 1 1 0; min-width: 0; border-radius: 18px; overflow: hidden; background-size: cover; background-position: center; color: #fff; text-decoration: none; transition: flex-grow 500ms cubic-bezier(0.22, 1, 0.36, 1); }
        .uca:hover .uca-p, .uca:focus-within .uca-p { flex-grow: 0.7; }
        .uca .uca-p:hover, .uca .uca-p:focus-visible { flex-grow: 5; }
        .uca-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(21 22 58 / 0.35), rgb(21 22 58 / 0.92)); }
        .uca-closed { position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 12px; transition: opacity 250ms ease; }
        .uca-closed img { width: 40px; height: 40px; }
        .uca-closed span { writing-mode: vertical-rl; transform: rotate(180deg); font-weight: 600; font-size: 15px; white-space: nowrap; }
        .uca-open { position: absolute; left: 0; right: 0; bottom: 0; padding: 28px; display: flex; flex-direction: column; gap: 8px; opacity: 0; min-width: 320px; transition: opacity 300ms ease 100ms; }
        .uca-open img { width: 44px; height: 44px; }
        .uca-t { font: 500 26px/1.15 var(--font-display); }
        .uca-i { font-size: 15px; color: rgb(255 255 255 / 0.85); max-width: 380px; }
        .uca-cta { display: inline-flex; gap: 6px; align-items: center; font-weight: 600; font-size: 14px; color: var(--color-accent); margin-top: 6px; }
        .uca .uca-p:hover .uca-open, .uca .uca-p:focus-visible .uca-open { opacity: 1; }
        .uca .uca-p:hover .uca-closed, .uca .uca-p:focus-visible .uca-closed { opacity: 0; }
        @media (max-width: 900px) {
          .uca { flex-direction: column; height: auto; }
          .uca-p, .uca:hover .uca-p, .uca .uca-p:hover { flex: none; height: 200px; }
          .uca-closed { display: none; }
          .uca-open { opacity: 1 !important; min-width: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .uca-p, .uca-open, .uca-closed { transition: none !important; } }
      `}</style>
    </div>
  );
}
