"use client";
import { useState } from "react";
import Icon from "@/components/templates/Icon";
import type { HomeUseCase } from "@/lib/home-use-cases";
import { HOME_USE_CASE_MEDIA } from "@/lib/home-use-cases";

// Opción C: selector. Lista de los 9 casos a la izquierda, panel con captura real del dashboard a la derecha.
export default function UseCaseTabs({ items, lang }: { items: HomeUseCase[]; lang: "es" | "en" }) {
  const [i, setI] = useState(0);
  const u = items[i];
  const media = HOME_USE_CASE_MEDIA[u.href];
  return (
    <div className="uct">
      <div className="uct-list" role="tablist" aria-label={lang === "en" ? "Use cases" : "Casos de uso"}>
        {items.map((it, k) => (
          <button key={it.href} role="tab" aria-selected={k === i} className={`uct-tab${k === i ? " is-on" : ""}`} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
            <img src={it.iconImg} alt="" width={36} height={36} />
            <span>{it.title}</span>
            <Icon name="arrow" className="w-4 h-4 uct-tab-arrow" />
          </button>
        ))}
      </div>
      <div className="uct-panel" role="tabpanel">
        <div className="uct-shot" style={{ backgroundImage: `url('${media?.shot}')` }} />
        <div className="uct-body">
          <h3 className="uct-title">{u.title}</h3>
          <p className="uct-intro">{u.intro}</p>
          <p className="uct-desc">{u.desc}</p>
          <ul className="uct-bul">
            {u.bullets.map((b) => (
              <li key={b}><span className="uct-check"><Icon name="check" className="w-3 h-3" /></span>{b}</li>
            ))}
          </ul>
          <a href={u.href} className="cta-btn cta-btn--md" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
            {lang === "en" ? "Explore use case" : "Ver caso de uso"} <Icon name="arrow" className="w-4 h-4" />
          </a>
        </div>
      </div>
      <style>{`
        .uct { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 8fr); gap: 28px; align-items: stretch; }
        .uct-list { display: flex; flex-direction: column; gap: 4px; }
        .uct-tab { display: grid; grid-template-columns: 36px 1fr 18px; gap: 14px; align-items: center; text-align: left; padding: 12px 14px; border-radius: 12px; border: 1px solid transparent; background: transparent; color: var(--color-navy); font: 600 16px var(--font-body); cursor: pointer; transition: background 200ms ease, border-color 200ms ease; }
        .uct-tab img { width: 36px; height: 36px; display: block; }
        .uct-tab:hover { background: var(--color-paper-soft); }
        .uct-tab.is-on { background: #fff; border-color: rgb(49 177 248 / 0.55); box-shadow: 0 10px 24px -18px rgb(15 23 42 / 0.3); }
        .uct-tab-arrow { color: var(--color-accent-deep); opacity: 0; transition: opacity 200ms ease; }
        .uct-tab.is-on .uct-tab-arrow { opacity: 1; }
        .uct-panel { display: grid; grid-template-rows: 300px auto; border-radius: 20px; overflow: hidden; background: #fff; border: 1px solid var(--color-rule); }
        .uct-shot { background-size: cover; background-position: center top; background-color: var(--color-paper); border-bottom: 1px solid var(--color-rule); }
        .uct-body { padding: 28px 32px 32px; }
        .uct-title { font: 500 clamp(24px, 2.2vw, 30px) var(--font-display); color: var(--color-navy); letter-spacing: -0.015em; margin: 0 0 10px; }
        .uct-intro { font-size: 16.5px; font-weight: 600; color: var(--color-navy); margin: 0 0 8px; }
        .uct-desc { font-size: 15.5px; line-height: 1.65; color: var(--color-ink-2); margin: 0 0 16px; }
        .uct-bul { list-style: none; padding: 0; margin: 0 0 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; }
        .uct-bul li { display: flex; gap: 8px; align-items: flex-start; font-size: 14.5px; color: var(--color-navy); }
        .uct-check { display: inline-flex; width: 18px; height: 18px; align-items: center; justify-content: center; border-radius: 999px; background: rgb(49 177 248 / 0.14); color: var(--color-accent-deep); flex-shrink: 0; margin-top: 2px; }
        @media (max-width: 900px) { .uct { grid-template-columns: 1fr; } .uct-list { display: grid; grid-template-columns: 1fr 1fr; } .uct-panel { grid-template-rows: 200px auto; } }
        @media (max-width: 560px) { .uct-list { grid-template-columns: 1fr; } .uct-bul { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .uct-tab, .uct-tab-arrow { transition: none !important; } }
      `}</style>
    </div>
  );
}
