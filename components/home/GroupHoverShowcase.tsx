"use client";
import { useState } from "react";
import Icon from "@/components/templates/Icon";
import type { HomeUseCase } from "@/lib/home-use-cases";
import { HOME_USE_CASE_MEDIA } from "@/lib/home-use-cases";

type Group = { title: string; hl: string; sub: string; uc: HomeUseCase[] };

// D3: zigzag por bloques donde la captura cambia según el caso que señalas.
export default function GroupHoverShowcase({ groups }: { groups: Group[] }) {
  return (
    <div className="ghs">
      {groups.map((g, gi) => <Row key={g.title} g={g} gi={gi} />)}
      <style>{`
        .ghs { display: flex; flex-direction: column; gap: 80px; }
        .ghs-row { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
        .ghs-row.is-rev { grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); }
        .ghs-row.is-rev .ghs-media { order: 2; }
        .ghs-media { position: relative; aspect-ratio: 16 / 10; border-radius: 20px; overflow: hidden; background: var(--color-paper); border: 1px solid var(--color-rule); box-shadow: 0 24px 50px -30px rgb(15 23 42 / 0.35); }
        .ghs-media span { position: absolute; inset: 0; background-size: cover; background-position: center top; opacity: 0; transition: opacity 350ms ease; }
        .ghs-media span.is-on { opacity: 1; }
        .ghs-num { display: block; font: 500 15px var(--font-display); color: var(--color-accent-deep); letter-spacing: 0.06em; margin-bottom: 10px; }
        .ghs-h3 { font: 400 clamp(24px, 2.2vw, 32px)/1.15 var(--font-display); letter-spacing: -0.015em; color: var(--color-navy); margin: 0 0 10px; }
        .ghs-h3 b { color: var(--color-accent); font-weight: 500; }
        .ghs-sub { font-size: 16px; line-height: 1.6; color: var(--color-ink-2); margin: 0 0 22px; }
        .ghs-item { display: grid; grid-template-columns: 40px 1fr 18px; gap: 14px; align-items: center; padding: 14px 12px; border-radius: 12px; color: var(--color-navy); text-decoration: none; border: 1px solid transparent; transition: background 200ms ease, border-color 200ms ease; }
        .ghs-item img { width: 40px; height: 40px; }
        .ghs-item strong { display: block; font-size: 16.5px; font-weight: 600; }
        .ghs-item small { display: block; font-size: 14px; color: var(--color-ink-2); margin-top: 2px; }
        .ghs-item.is-on { background: #fff; border-color: rgb(49 177 248 / 0.5); box-shadow: 0 10px 24px -18px rgb(15 23 42 / 0.3); }
        .ghs-arrow { color: var(--color-accent-deep); opacity: 0; transition: opacity 200ms ease; }
        .ghs-item.is-on .ghs-arrow { opacity: 1; }
        @media (max-width: 900px) { .ghs-row, .ghs-row.is-rev { grid-template-columns: 1fr; } .ghs-row.is-rev .ghs-media { order: 0; } }
        @media (prefers-reduced-motion: reduce) { .ghs-media span, .ghs-item, .ghs-arrow { transition: none !important; } }
      `}</style>
    </div>
  );
}

function Row({ g, gi }: { g: Group; gi: number }) {
  const [on, setOn] = useState(0);
  return (
    <div className={`ghs-row${gi % 2 ? " is-rev" : ""}`}>
      <div className="ghs-media">
        {g.uc.map((u, k) => <span key={u.href} className={k === on ? "is-on" : ""} style={{ backgroundImage: `url('${HOME_USE_CASE_MEDIA[u.href]?.shot}')` }} />)}
      </div>
      <div>
        <span className="ghs-num">0{gi + 1}</span>
        <h3 className="ghs-h3">{g.title} <b>{g.hl}</b></h3>
        <p className="ghs-sub">{g.sub}</p>
        <div>
          {g.uc.map((u, k) => (
            <a key={u.href} href={u.href} className={`ghs-item${k === on ? " is-on" : ""}`} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
              <img src={u.iconImg} alt="" width={40} height={40} />
              <span><strong>{u.title}</strong><small>{u.intro}</small></span>
              <Icon name="arrow" className="w-4 h-4 ghs-arrow" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
