"use client";
import { useState } from "react";
import Icon from "./Icon";
import type { UCItem } from "./SectorUseCases";

// Explorador de casos de uso con pestañas: fila de tabs (icono + título) + panel del seleccionado.
export default function SectorUseCasesTabs({ items, currentLang = "es" }: { items: UCItem[]; currentLang?: "es" | "en" }) {
  const [sel, setSel] = useState(0);
  const u = items[sel] || items[0];
  const see = currentLang === "en" ? "See use case" : "Ver caso de uso";
  const icon = (it: UCItem, size: number) =>
    it.img
      ? <img src={it.img} alt="" style={{ width: size, height: size, objectFit: "contain", display: "block" }} />
      : <span className="uct-svg" dangerouslySetInnerHTML={{ __html: it.svg || "" }} />;
  return (
    <div className="uct">
      <div className="uct-tabs" role="tablist">
        {items.map((it, i) => (
          <button key={i} type="button" role="tab" aria-selected={i === sel} className={`uct-tab${i === sel ? " is-active" : ""}`} onClick={() => setSel(i)}>
            {icon(it, 22)}<span>{it.title}</span>
          </button>
        ))}
      </div>
      <div className="uct-panel">
        <span className="uct-pico">{icon(u, 46)}</span>
        <div className="uct-pbody">
          <h3>{u.title}</h3>
          <p>{u.desc}</p>
          <a href={u.href} className="cta-btn cta-btn--lg" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>{see} <Icon name="arrow" className="w-4 h-4" /></a>
        </div>
      </div>
      <style>{`
        .uct-svg svg { width:22px; height:22px; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; color: var(--color-accent-deep); }
        .uct-tabs { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:22px; }
        .uct-tab { display:inline-flex; align-items:center; gap:9px; padding:11px 16px; border:1px solid var(--color-rule); border-radius:12px; background:#fff; cursor:pointer; font-family: var(--font-display); font-weight:500; font-size:15px; letter-spacing:-.01em; color: var(--color-ink-2); transition: border-color .2s, color .2s, background .2s, box-shadow .2s; }
        .uct-tab:hover { border-color: rgb(49 177 248 / .5); color: var(--color-navy); }
        .uct-tab.is-active { border-color: var(--color-accent); color: var(--color-navy); background: rgb(49 177 248 / .07); box-shadow: 0 8px 20px -14px rgb(49 177 248 / .5); }
        .uct-panel { display:flex; gap:26px; align-items:flex-start; padding:34px 36px; border:1px solid var(--color-rule); border-radius:20px; background: var(--color-paper-soft); }
        .uct-pico { flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; width:76px; height:76px; border-radius:18px; background:#fff; border:1px solid var(--color-rule); }
        .uct-pbody { flex:1; min-width:0; }
        .uct-pbody h3 { font-family: var(--font-display); font-weight:500; font-size:24px; letter-spacing:-.015em; color: var(--color-navy); margin:0 0 10px; line-height:1.15; }
        .uct-pbody p { font-size:16px; line-height:1.6; color: var(--color-ink-2); margin:0 0 20px; max-width:62ch; }
        @media (max-width: 680px){ .uct-panel { flex-direction:column; gap:18px; padding:26px 22px; } }
      `}</style>
    </div>
  );
}
