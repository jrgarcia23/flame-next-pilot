// Renderizador determinista de casos de éxito al "nuevo formato" (mo-*).
// Entrada: un JSON por caso/idioma (scripts/casos-exito/data/<slug>.json).
// Salida:  data/elementor/<slug>.html (cuerpo que sirve ElementorPostPage;
//          el header/footer del sitio los pone el propio componente).
//
// Modelo de referencia: MultiÓpticas + Alain Afflelou (aprobados y live).
// Decisión JR: SOLO hero, SIN panel intermedio (mo-mid-figure se omite).
//
// Uso:
//   node scripts/casos-exito/render.mjs data/<archivo>.json   -> escribe el .html
//   node scripts/casos-exito/render.mjs --all                 -> renderiza todos

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..", "..");
const DATA_DIR = path.join(__dirname, "data");
const OUT_DIR = path.join(REPO, "data", "elementor");

// ---------------------------------------------------------------------------
// Bloque <style> (idéntico en todos los casos, scoped a .mo-case-root)
// Copiado verbatim del modelo aprobado (MultiÓpticas).
// ---------------------------------------------------------------------------
const STYLE = `<style>
.mo-case-root {
  --color-navy: #15163a;
  --color-accent: #31b1f8;
  --color-accent-deep: #1d8bca;
  --color-paper: #f3f3f3;
  --color-paper-soft: #f7f8fa;
  --color-ink: #0f172a;
  --color-ink-2: #475569;
  --color-ink-3: #64748b;
  --color-ink-4: #94a3b8;
  --color-rule: rgb(15 23 42 / 0.08);
  --color-rule-strong: rgb(15 23 42 / 0.16);
  --font-display: "Clash Grotesk Variable", "Clash Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Instrument Sans Flame", "Instrument Sans", "Inter", ui-sans-serif, system-ui, sans-serif;
}
.mo-case-root, .mo-case-root *, .mo-case-root *::before, .mo-case-root *::after { box-sizing: border-box; }
.mo-case-root { font-family: var(--font-body); color: var(--color-ink); background: #fff; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
.mo-case-root a { color: var(--color-accent-deep); text-decoration: none; }
.mo-case-root a:hover { color: var(--color-accent); }
.mo-case-root ::selection { background: var(--color-accent); color: #fff; }
.mo-case-root img { max-width: 100%; display: block; }

.mo-btn { display: inline-flex; align-items: center; gap: 8px; border-radius: 4px; font-family: var(--font-body); font-weight: 600; transition: background .15s ease, transform .12s ease, filter .15s ease; }
.mo-btn--sm { font-size: 14px; padding: 10px 18px; }
.mo-btn--lg { font-size: 16px; padding: 16px 28px; }
.mo-btn-accent { background: var(--color-accent); color: #fff; }
.mo-btn-accent:hover { background: var(--color-accent-deep); }
.mo-btn-white { background: #fff; color: var(--color-navy); }
.mo-btn-white:hover { transform: translateY(-2px); }

.mo-eyebrow-wrap { display: inline-flex; flex-direction: column; gap: 12px; }
.mo-eyebrow-bar { width: 44px; height: 3px; background: var(--color-accent); border-radius: 2px; }
.mo-eyebrow-label { font-size: 12.5px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }

.mo-hero { position: relative; background: var(--color-navy); color: #fff; overflow: hidden; }
.mo-hero-glow { position: absolute; top: -180px; right: -120px; width: 520px; height: 520px; background: radial-gradient(circle, rgb(49 177 248 / 0.22) 0%, rgb(49 177 248 / 0) 70%); pointer-events: none; }
.mo-breadcrumb { position: relative; max-width: 1240px; margin: 0 auto; padding: 26px 32px 0; display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgb(255 255 255 / 0.5); font-weight: 500; }
.mo-breadcrumb a { color: inherit; }
.mo-hero-grid { position: relative; max-width: 1240px; margin: 0 auto; padding: 44px 32px 68px; display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
.mo-hero h1 { font-family: var(--font-display); font-weight: 400; font-size: clamp(38px, 4.4vw, 54px); line-height: 1.08; letter-spacing: -0.02em; margin: 0 0 22px; color: #fff; }
.mo-hero .sub { font-size: 18px; line-height: 1.55; color: rgb(255 255 255 / 0.72); max-width: 560px; margin: 0 0 30px; }
.mo-hero-meta-row { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.mo-badge { display: flex; align-items: center; gap: 12px; background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.1); border-radius: 12px; padding: 10px 16px; }
.mo-badge .client { font-family: var(--font-display); font-weight: 700; font-size: 18px; letter-spacing: -0.01em; color: #fff; }
.mo-badge .x { color: rgb(255 255 255 / 0.32); font-size: 15px; }
.mo-badge .flame-word { font-family: var(--font-display); font-weight: 700; font-size: 15px; color: #fff; letter-spacing: -0.01em; }
.mo-hero-dates { display: flex; align-items: center; gap: 16px; font-size: 13.5px; color: rgb(255 255 255 / 0.55); }
.mo-hero-dates span { display: inline-flex; align-items: center; gap: 6px; }
.mo-hero-dates svg { width: 15px; height: 15px; }

.mo-hero-shot-wrap { position: relative; }
.mo-hero-shot { position: relative; border-radius: 18px; overflow: hidden; box-shadow: 0 30px 70px rgb(0 0 0 / 0.45); aspect-ratio: 4/3; border: 1px solid rgb(255 255 255 / 0.1); background: var(--color-paper-soft); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: var(--color-ink-3); }
.mo-hero-shot svg { width: 34px; height: 34px; stroke: var(--color-ink-4); }
.mo-hero-shot .ph-label { font-size: 13px; font-weight: 600; color: var(--color-ink-2); text-align: center; padding: 0 24px; }
.mo-hero-shot-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgb(21 22 58 / 0) 45%, rgb(21 22 58 / 0.55) 100%); pointer-events: none; }
.mo-stat-float { position: absolute; left: -18px; bottom: 26px; background: #fff; color: var(--color-navy); border-radius: 14px; padding: 16px 20px; box-shadow: 0 18px 40px rgb(0 0 0 / 0.35); display: flex; align-items: center; gap: 14px; }
.mo-stat-float .icon-wrap { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 11px; background: rgb(49 177 248 / 0.12); color: var(--color-accent-deep); }
.mo-stat-float .icon-wrap svg { width: 22px; height: 22px; }
.mo-stat-float .value { font-family: var(--font-display); font-weight: 700; font-size: 24px; line-height: 1; color: var(--color-navy); }
.mo-stat-float .label { font-size: 12.5px; color: var(--color-ink-3); font-weight: 500; margin-top: 3px; }

.mo-quote-section { background: var(--color-paper); }
.mo-quote-inner { max-width: 1000px; margin: 0 auto; padding: 72px 32px; text-align: center; }
.mo-quote-inner svg.quote-icon { width: 40px; height: 40px; color: var(--color-accent); }
.mo-quote-inner blockquote { font-family: var(--font-display); font-weight: 400; font-size: clamp(24px, 2.4vw, 32px); line-height: 1.3; letter-spacing: -0.015em; color: var(--color-navy); margin: 22px 0 30px; }
.mo-quote-author { font-size: 14.5px; font-weight: 600; color: var(--color-navy); }
.mo-quote-role { font-size: 13.5px; color: var(--color-ink-3); }

.mo-article-section { background: #fff; }
.mo-lead { max-width: 1000px; margin: 0 auto; padding: 84px 32px 32px; }
.mo-lead p.lead-p { font-family: var(--font-display); font-weight: 400; font-size: 22px; line-height: 1.5; letter-spacing: -0.01em; color: var(--color-navy); margin: 0 0 22px; }
.mo-lead p.lead-p a { color: var(--color-accent-deep); font-weight: 600; border-bottom: 1px solid rgb(29 139 202 / 0.35); }
.mo-lead p.body-p { font-size: 17px; line-height: 1.75; color: var(--color-ink-2); margin: 0 0 20px; }

.mo-article-wrap { max-width: 1000px; margin: 0 auto; padding: 8px 32px 48px; }
.mo-block { padding: 56px 0; border-bottom: 1px solid var(--color-rule); display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 48px; align-items: start; }
.mo-block:last-of-type { padding-bottom: 0; border-bottom: none; }
.mo-block-side { position: sticky; top: 100px; }
.mo-num-row { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
.mo-num { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 11px; background: var(--color-accent); color: #fff; font-family: var(--font-display); font-weight: 700; font-size: 16px; }
.mo-eyebrow-inline { font-size: 12.5px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-accent-deep); }
.mo-block-side h2 { font-family: var(--font-display); font-weight: 400; font-size: 32px; line-height: 1.12; letter-spacing: -0.02em; color: var(--color-navy); margin: 0; }
.mo-block-side .underline-bar { display: block; width: 64px; height: 4px; background: var(--color-accent); border-radius: 2px; margin: 20px 0 0; }
.mo-block-body p { font-size: 17px; line-height: 1.75; color: var(--color-ink-2); margin: 0 0 20px; }
.mo-block-body h3 { font-family: var(--font-display); font-weight: 500; font-size: 22px; line-height: 1.2; letter-spacing: -0.01em; color: var(--color-navy); margin: 0 0 16px; }
.mo-help-list { list-style: none; padding: 0; margin: 0 0 26px; display: flex; flex-direction: column; gap: 12px; }
.mo-help-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 16px; line-height: 1.5; color: var(--color-ink-2); }
.mo-help-list li svg { flex: none; margin-top: 4px; width: 17px; height: 17px; color: var(--color-accent-deep); }
.mo-inline-quote { border-left: 3px solid var(--color-accent); padding: 2px 0 2px 24px; margin: 0; font-family: var(--font-display); font-weight: 400; font-size: 21px; line-height: 1.4; letter-spacing: -0.01em; color: var(--color-navy); }

.mo-mid-figure { margin: 44px 0; }
.mo-mid-shot { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--color-rule); box-shadow: 0 18px 40px rgb(15 23 42 / 0.12); aspect-ratio: 16/8; background: var(--color-paper-soft); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: var(--color-ink-3); }
.mo-mid-figure figcaption { font-size: 13px; color: var(--color-ink-4); margin-top: 12px; text-align: center; }

.mo-kpi-section { background: var(--color-paper); }
.mo-section-inner { max-width: 1240px; margin: 0 auto; padding: 72px 32px; }
.mo-section-head { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.mo-section-head h2 { font-family: var(--font-display); font-weight: 400; font-size: 32px; letter-spacing: -0.02em; margin: 2px 0 0; color: var(--color-navy); }
.mo-kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.mo-kpi-card { background: #fff; border: 1px solid var(--color-rule); border-radius: 16px; padding: 26px 24px; box-shadow: 0 2px 6px rgb(15 23 42 / 0.06); }
.mo-kpi-card .kpi-label { font-size: 11.5px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 14px; }
.mo-kpi-card .kpi-value { font-family: var(--font-display); font-weight: 700; font-size: 44px; line-height: 0.95; letter-spacing: -0.02em; color: var(--color-navy); }
.mo-kpi-card .kpi-value.is-text { font-size: 24px; line-height: 1.15; letter-spacing: -0.01em; }
.mo-kpi-card .kpi-desc { font-size: 13.5px; color: var(--color-ink-3); line-height: 1.45; margin-top: 12px; }

.mo-sol-section { background: var(--color-navy); color: #fff; }
.mo-sol-section .mo-section-head { max-width: 680px; }
.mo-sol-section .mo-section-head h2 { color: #fff; font-size: 34px; line-height: 1.1; }
.mo-sol-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.mo-sol-card { background: rgb(255 255 255 / 0.06); border: 1px solid rgb(255 255 255 / 0.1); border-radius: 16px; padding: 30px 28px; }
.mo-sol-card .icon-wrap { display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; border-radius: 13px; background: rgb(49 177 248 / 0.16); color: var(--color-accent); margin-bottom: 20px; }
.mo-sol-card .icon-wrap svg { width: 25px; height: 25px; }
.mo-sol-card h3 { font-family: var(--font-display); font-weight: 500; font-size: 20px; margin: 0 0 8px; color: #fff; }
.mo-sol-card p { font-size: 14.5px; line-height: 1.55; color: rgb(255 255 255 / 0.7); margin: 0; }

.mo-cta-section { background: var(--color-paper); color: var(--color-ink); }
.mo-cta-grid { max-width: 1240px; margin: 0 auto; padding: 76px 32px; display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; }
.mo-cta-eyebrow { font-size: 12.5px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-accent-deep); margin-bottom: 16px; }
.mo-cta-grid h2 { font-family: var(--font-display); font-weight: 400; font-size: 38px; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 18px; color: var(--color-navy); }
.mo-cta-grid .sub { font-size: 17px; line-height: 1.6; color: var(--color-ink-2); margin: 0; max-width: 560px; }
.mo-cta-right { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; }
.mo-cta-stats { display: flex; align-items: center; gap: 24px; font-size: 14px; color: var(--color-ink-3); font-weight: 500; }
.mo-cta-stats span { display: inline-flex; align-items: center; gap: 7px; }
.mo-cta-stats svg { width: 16px; height: 16px; color: var(--color-accent-deep); }

.mo-related-section { max-width: 1240px; margin: 0 auto; padding: 80px 32px; }
.mo-related-section > h2 { font-family: var(--font-display); font-weight: 400; font-size: 28px; letter-spacing: -0.02em; margin: 0 0 28px; color: var(--color-navy); }
.mo-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.mo-related-card { display: block; background: #fff; border: 1px solid var(--color-rule); border-radius: 16px; overflow: hidden; transition: transform 280ms cubic-bezier(0.22,1,0.36,1), box-shadow 280ms; }
.mo-related-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px -18px rgb(15 23 42 / 0.18); }
.mo-related-cover { aspect-ratio: 1/1; background-size: cover; background-position: center; background-color: var(--color-paper-soft); }
.mo-related-body { padding: 20px; }
.mo-related-body .tag { display: block; font-size: 11.5px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent-deep); margin-bottom: 8px; }
.mo-related-body h3 { font-family: var(--font-display); font-weight: 500; font-size: 18px; line-height: 1.22; color: var(--color-navy); margin: 0 0 8px; transition: color 200ms; }
.mo-related-card:hover .mo-related-body h3 { color: var(--color-accent-deep); }
.mo-related-body .excerpt { font-size: 13.5px; line-height: 1.5; color: var(--color-ink-2); margin: 0 0 8px; }
.mo-related-body .date { font-size: 12px; color: var(--color-ink-3); margin: 0; }

@media (max-width: 900px) {
  .mo-hero-grid, .mo-cta-grid { grid-template-columns: 1fr !important; }
  .mo-block { grid-template-columns: 1fr !important; }
  .mo-block-side { position: static !important; }
  .mo-kpi-grid, .mo-sol-grid, .mo-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
}
@media (max-width: 600px) {
  .mo-kpi-grid, .mo-sol-grid, .mo-related-grid { grid-template-columns: 1fr !important; }
}
</style>`;

// ---------------------------------------------------------------------------
// Iconos (SVG inline). Clave -> path interno de un <svg 24x24 stroke>.
// ---------------------------------------------------------------------------
const ICONS = {
  trend: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  grid: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="9" x2="9" y2="9"/><line x1="15" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>',
  wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  map: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
};
const svg = (key) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[key] || ICONS.trend}</svg>`;

const QUOTE_ICON = '<svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031C2 20.612 2.5 21 3 21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h.75c0 2.25.25 4-3.75 4v2c0 .607.5 1 1 1z"/></svg>';
const CAL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
const CLK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
const GLOBE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
const CLIENTS_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>';
const HELP_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
const ARROW_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

// ---------------------------------------------------------------------------
// Textos boilerplate por idioma (verbatim del modelo aprobado)
// ---------------------------------------------------------------------------
const L = {
  es: {
    home: "Inicio", catUrl: "/es/categoria/casos-de-exito/", catLabel: "Casos de éxito",
    elCaso: "El caso", cifras: "El proyecto en cifras", sols: "Soluciones utilizadas",
    relatedTitle: "Otros casos de éxito", flameWord: "FLAME", flameBadge: "Flame",
    ctaEyebrow: "Demo personalizada · 20 minutos",
    ctaH2: "Convierte el tráfico físico en decisiones de negocio",
    ctaSub: "Te enseñamos cómo Flame mide tráfico, conversión y perfil de audiencia en tus tiendas, malls u hoteles. Caso real de tu sector, sin biometría y con RGPD por diseño.",
    ctaBtn: "Solicitar demo", ctaUrl: "/es/contacta/",
    stat1: "12 países", stat2: "+90 clientes B2B",
  },
  en: {
    home: "Home", catUrl: "/en/category/case-studies/", catLabel: "Case studies",
    elCaso: "The case", cifras: "The project in numbers", sols: "Solutions used",
    relatedTitle: "Other success stories", flameWord: "FLAME", flameBadge: "Flame",
    ctaEyebrow: "Personalized demo · 20 minutes",
    ctaH2: "Turn physical footfall into business decisions",
    ctaSub: "We show you how Flame measures footfall, conversion and audience profile in your stores, malls or hotels. A real case from your sector, with no biometrics and GDPR by design.",
    ctaBtn: "Request a demo", ctaUrl: "/en/contact-us/",
    stat1: "12 countries", stat2: "90+ B2B clients",
  },
};

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------
function heroShot(hero) {
  if (hero && hero.img) {
    return `<div class="mo-hero-shot" style="background-image:url('${hero.img}');background-size:cover;background-position:center;">
        <div class="mo-hero-shot-overlay"></div>
      </div>`;
  }
  // Placeholder (JR cambia la imagen a mano)
  return `<div class="mo-hero-shot">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <span class="ph-label">${hero && hero.phLabel ? hero.phLabel : "Imagen del caso"}</span>
        <div class="mo-hero-shot-overlay"></div>
      </div>`;
}

function renderBlockBody(items) {
  const out = [];
  for (const it of items) {
    if (it.p !== undefined) out.push(`          <p>${it.p}</p>`);
    else if (it.h3 !== undefined) out.push(`          <h3>${it.h3}</h3>`);
    else if (it.quote !== undefined) out.push(`          <blockquote class="mo-inline-quote">${it.quote}</blockquote>`);
    else if (it.list !== undefined) {
      const lis = it.list.map(li => `            <li>${HELP_SVG}${li}</li>`).join("\n");
      out.push(`          <ul class="mo-help-list">\n${lis}\n          </ul>`);
    }
  }
  return out.join("\n");
}

function render(d) {
  const t = L[d.lang];
  if (!t) throw new Error(`lang inválido: ${d.lang}`);

  const blocks = d.blocks.map(b => `
      <div class="mo-block"${b.id ? ` id="${b.id}"` : ""}>
        <div class="mo-block-side">
          <div class="mo-num-row">
            <span class="mo-num">${b.num}</span>
            <span class="mo-eyebrow-inline">${b.eyebrow}</span>
          </div>
          <h2>${b.h2}</h2>
          <span class="underline-bar"></span>
        </div>
        <div class="mo-block-body">
${renderBlockBody(b.body)}
        </div>
      </div>`).join("\n");

  // Valor "numérico/corto" -> 44px; valor conceptual largo (>11 chars) -> 24px, para
  // que no desborde la tipografía grande. Mantiene el contenido fiel a la fuente.
  const cifras = d.cifras.map(c => {
    const isText = (c.value || "").replace(/&[a-z]+;/g, "x").length > 11;
    return `      <div class="mo-kpi-card">
        <div class="kpi-label">${c.label}</div>
        <div class="kpi-value${isText ? " is-text" : ""}">${c.value}</div>
        <div class="kpi-desc">${c.desc}</div>
      </div>`;
  }).join("\n");

  const sols = d.soluciones.map(s => `      <div class="mo-sol-card">
        <span class="icon-wrap">${svg(s.icon)}</span>
        <h3>${s.h3}</h3>
        <p>${s.p}</p>
      </div>`).join("\n");

  const related = d.related.map(r => `    <a href="${r.href}" class="mo-related-card">
      <div class="mo-related-cover"${r.img ? ` style="background-image:url('${r.img}');"` : ""}></div>
      <div class="mo-related-body">
        <span class="tag">${t.catLabel}</span>
        <h3>${r.h3}</h3>
        ${r.excerpt ? `<p class="excerpt">${r.excerpt}</p>` : ""}
        ${r.date ? `<p class="date">${r.date}</p>` : ""}
      </div>
    </a>`).join("\n");

  const elCasoParas = d.elCaso.map((p, i) => {
    const cls = i === 0 ? "lead-p" : "body-p";
    const last = i === d.elCaso.length - 1 ? ' style="margin-bottom:0;"' : "";
    return `    <p class="${cls}"${last}>${p}</p>`;
  }).join("\n");

  const quoteRole = d.quote.role ? `\n    <div class="mo-quote-role">${d.quote.role}</div>` : "";

  return `${STYLE}
<div class="mo-case-root"><section class="mo-hero">
  <div class="mo-hero-glow"></div>
  <div class="mo-breadcrumb">
    <a href="/${d.lang}/">${t.home}</a><span>›</span><a href="${t.catUrl}" style="color:rgb(255 255 255 / 0.72);">${t.catLabel}</a>
  </div>
  <div class="mo-hero-grid">
    <div>
      <div class="mo-eyebrow-wrap" style="margin-bottom:24px;">
        <span class="mo-eyebrow-bar"></span>
        <span class="mo-eyebrow-label" style="color:var(--color-accent);">${d.eyebrow}</span>
      </div>
      <h1>${d.h1}</h1>
      <p class="sub">${d.sub}</p>
      <div class="mo-hero-meta-row">
        <div class="mo-badge">
          <span class="client">${d.badge.client}</span>
          <span class="x">×</span>
          <span class="flame-word">${t.flameWord}</span>
        </div>
        <div class="mo-hero-dates">
          <span>${CAL_SVG} ${d.badge.date}</span>
          <span>${CLK_SVG} ${d.badge.readTime}</span>
        </div>
      </div>
    </div>
    <div class="mo-hero-shot-wrap">
      ${heroShot(d.hero)}
    </div>
  </div>
</section>


<section class="mo-quote-section">
  <div class="mo-quote-inner">
    ${QUOTE_ICON}
    <blockquote>&ldquo;${d.quote.text}&rdquo;</blockquote>
    <div class="mo-eyebrow-bar" style="margin:0 auto 20px;"></div>
    <div class="mo-quote-author">${d.quote.author}</div>${quoteRole}
  </div>
</section>


<section class="mo-article-section" id="historia">
  <div class="mo-lead">
    <div class="mo-eyebrow-wrap" style="margin-bottom:24px;">
      <span class="mo-eyebrow-bar"></span>
      <span class="mo-eyebrow-label" style="color:var(--color-accent-deep);">${t.elCaso}</span>
    </div>
${elCasoParas}
  </div>

  <div class="mo-article-wrap">
    <article>
${blocks}
    </article>
  </div>
</section>


<section class="mo-kpi-section">
  <div class="mo-section-inner">
    <div class="mo-section-head">
      <span class="mo-eyebrow-bar"></span>
      <span class="mo-eyebrow-label" style="color:var(--color-accent-deep);">${t.cifras}</span>
      <h2>${d.cifrasTitle}</h2>
    </div>
    <div class="mo-kpi-grid">
${cifras}
    </div>
  </div>
</section>


<section class="mo-sol-section">
  <div class="mo-section-inner">
    <div class="mo-section-head">
      <span class="mo-eyebrow-bar"></span>
      <span class="mo-eyebrow-label" style="color:var(--color-accent);">${t.sols}</span>
      <h2>${d.solTitle}</h2>
    </div>
    <div class="mo-sol-grid">
${sols}
    </div>
  </div>
</section>


<section class="mo-cta-section" id="demo">
  <div class="mo-cta-grid">
    <div>
      <div class="mo-cta-eyebrow">${t.ctaEyebrow}</div>
      <h2>${t.ctaH2}</h2>
      <p class="sub">${t.ctaSub}</p>
    </div>
    <div class="mo-cta-right">
      <a href="${t.ctaUrl}" class="mo-btn mo-btn--lg mo-btn-accent">${t.ctaBtn} ${ARROW_SVG}</a>
      <div class="mo-cta-stats">
        <span>${GLOBE_SVG} ${t.stat1}</span>
        <span>${CLIENTS_SVG} ${t.stat2}</span>
      </div>
    </div>
  </div>
</section>


<section class="mo-related-section">
  <h2>${t.relatedTitle}</h2>
  <div class="mo-related-grid">
${related}
  </div>
</section>
</div>`;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------
function build(jsonPath) {
  const d = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const html = render(d);
  const outPath = path.join(OUT_DIR, `${d.slug}.html`);
  fs.writeFileSync(outPath, html);
  return { slug: d.slug, lang: d.lang, bytes: html.length, outPath };
}

// CLI: solo cuando se ejecuta render.mjs directamente (no al importarlo desde merge.mjs)
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const arg = process.argv[2];
  if (!arg) {
    console.error("uso: node render.mjs <data/archivo.json> | --all");
    process.exit(1);
  }
  if (arg === "--all") {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".json"));
    for (const f of files) {
      const r = build(path.join(DATA_DIR, f));
      console.log(`${String(r.bytes).padStart(6)}  ${r.lang}  ${r.slug}`);
    }
  } else {
    const r = build(path.isAbsolute(arg) ? arg : path.join(__dirname, arg));
    console.log(`OK ${r.bytes} bytes -> ${r.outPath}`);
  }
}

export { render };
