import type { CSSProperties } from "react";
import Icon from "./Icon";
import { NAV_ITEMS, FOOTER_COLS, MEGA_PRODUCTS, MEGA_USE_CASES, MEGA_INDUSTRIES, MEGA_COMMUNITY, NavLeaf } from "@/lib/page-content";

function MegaItem({ it }: { it: NavLeaf }) {
  return (
    <a href={it.href} className="mega-item group flex gap-3.5 items-center rounded-lg p-3 transition">
      <span className="mega-icon-frame inline-flex items-center justify-center flex-shrink-0" style={{ width: 48, height: 48 }}>
        <img src={it.iconImg} alt="" width={48} height={48} style={{ width: 48, height: 48, objectFit: "contain", display: "block" }} />
      </span>
      <span className="flex flex-col min-w-0">
        <span className="mega-title text-[14px] font-semibold leading-tight" style={{ color: "var(--color-navy)" }}>{it.label}</span>
        <span className="text-[12.5px] mt-1 leading-[1.45]" style={{ color: "var(--color-ink-3)" }}>{it.desc}</span>
      </span>
    </a>
  );
}

function MegaPanel({ kind }: { kind: "products" | "solutions" | "community" }) {
  const panelStyle: CSSProperties = {
    background: "#fff",
    border: "1px solid var(--color-rule)",
    boxShadow: "0 24px 60px -20px rgb(15 23 42 / 0.18)",
  };
  if (kind === "products") {
    return (
      <div className="rounded-xl p-3" style={{ ...panelStyle, width: 420 }}>
        <div className="flex flex-col gap-1">{MEGA_PRODUCTS.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
    );
  }
  if (kind === "community") {
    return (
      <div className="rounded-xl p-3" style={{ ...panelStyle, width: 420 }}>
        <div className="flex flex-col gap-1">{MEGA_COMMUNITY.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
    );
  }
  // solutions: 2 columnas + CTA — más ancho con aire
  return (
    <div className="rounded-xl p-6 grid gap-6" style={{ ...panelStyle, width: 1080, gridTemplateColumns: "1.5fr 1fr 0.95fr" }}>
      <div>
        <div className="text-[11px] uppercase font-semibold mb-3 px-3" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.1em" }}>Por caso de uso</div>
        <div className="grid grid-cols-2 gap-1">{MEGA_USE_CASES.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
      <div style={{ borderLeft: "1px solid var(--color-rule)", paddingLeft: 24 }}>
        <div className="text-[11px] uppercase font-semibold mb-3 px-3" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.1em" }}>Por industria</div>
        <div className="flex flex-col gap-1">{MEGA_INDUSTRIES.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
      <a href="/es/contacta-draft/" className="mega-cta flex flex-col justify-between rounded-lg p-6" style={{ background: "linear-gradient(140deg, var(--color-navy) 0%, #1f2160 100%)", color: "#fff" }}>
        <div>
          <div className="text-[11px] uppercase font-semibold mb-3" style={{ color: "var(--color-accent)", letterSpacing: "0.1em" }}>¿Necesitas ayuda?</div>
          <div className="text-[19px] font-semibold leading-tight mb-3" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.012em" }}>Hablemos de tu caso</div>
          <p className="text-[13px] leading-[1.55]" style={{ color: "rgb(255 255 255 / 0.7)" }}>Demo personalizada en 20 minutos. Te enseñamos cómo encaja Flame en tu operativa.</p>
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold" style={{ color: "var(--color-accent)" }}>
          Solicita una demo <Icon name="arrow" className="w-3.5 h-3.5" />
        </span>
      </a>
    </div>
  );
}

export function CtaStyles() {
  return (
    <style>{`
      .cta-btn {
        display: inline-flex; align-items: center; gap: 10px;
        border-radius: 4px;
        font-family: var(--font-body); font-weight: 500;
        line-height: 1; letter-spacing: -0.005em;
        border: 1px solid transparent; cursor: pointer;
        transition: background 240ms cubic-bezier(0.22, 1, 0.36, 1),
                    transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
                    box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1),
                    filter 240ms cubic-bezier(0.22, 1, 0.36, 1);
        text-decoration: none !important;
      }
      .cta-btn--sm { font-size: 14px; padding: 10px 18px; }
      .cta-btn--md { font-size: 15px; padding: 12px 22px; }
      .cta-btn--lg { font-size: 16px; padding: 14px 26px; }
      .cta-btn:hover {
        filter: brightness(0.94);
        transform: translateY(-1px);
        box-shadow: 0 6px 16px -10px rgb(15 23 42 / 0.18);
      }
    `}</style>
  );
}

export function SiteHeader({ enHref = "/en/" }: { enHref?: string }) {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: "rgb(21 22 58 / 0.92)",
        backdropFilter: "blur(16px) saturate(140%)",
        WebkitBackdropFilter: "blur(16px) saturate(140%)",
        borderColor: "rgb(255 255 255 / 0.06)",
        color: "white",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="flame-container flex items-center h-16 gap-6">
        <a href="/es/" className="inline-flex items-center">
          <img src="/wp-content/uploads/elementor/thumbs/logo_flame-qfryqe0zsr27wn1jg22ulycihf4wsdke2ytff358i2.png" alt="Flame Analytics" style={{ height: 30, width: "auto", display: "block" }} />
        </a>
        <nav className="hidden lg:flex flex-1 items-center gap-1 ml-4">
          {NAV_ITEMS.map((it) => {
            const isMega = "mega" in it;
            return (
              <div key={it.label} className="nav-item relative">
                {!isMega ? (
                  <a href={(it as { href: string }).href} className="nav-link" style={{ color: "#fff" }}>
                    {it.label}
                  </a>
                ) : (
                  <>
                    <button type="button" className="nav-link inline-flex items-center gap-1.5" style={{ color: "#fff" }}>
                      {it.label}
                      <span style={{ fontSize: 9, lineHeight: 1, transform: "translateY(1px)" }}>▾</span>
                    </button>
                    <div className={`nav-dropdown nav-dropdown--${(it as { mega: string }).mega}`}>
                      <MegaPanel kind={(it as { mega: "products" | "solutions" | "community" }).mega} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </nav>
        <style>{`
          .nav-link {
            display: inline-flex; align-items: center;
            padding: 8px 14px;
            font-family: "Instrument Sans", system-ui, sans-serif;
            font-size: 16px; font-weight: 600; line-height: 1.4;
            color: #fff;
            background: transparent; border: 0; cursor: pointer;
            border-radius: 6px;
            text-decoration: none;
          }
          .nav-link:hover, .nav-link:focus { color: #fff !important; }
          .nav-item .nav-dropdown {
            position: absolute; top: 100%; padding-top: 10px;
            opacity: 0; visibility: hidden; transform: translateY(-4px);
            transition: opacity 200ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
                        visibility 200ms;
            pointer-events: none;
            z-index: 50;
          }
          .nav-dropdown--products,
          .nav-dropdown--community { left: -8px; }
          .nav-dropdown--solutions { left: 50%; transform: translate(-50%, -4px); }
          .nav-item:hover .nav-dropdown,
          .nav-item:focus-within .nav-dropdown {
            opacity: 1; visibility: visible; transform: translateY(0);
            pointer-events: auto;
          }
          .nav-item:hover .nav-dropdown--solutions,
          .nav-item:focus-within .nav-dropdown--solutions { transform: translateX(-50%) translateY(0); }
          .mega-item { transition: background 200ms; }
          .mega-item:hover { background: var(--color-paper-soft); }
          .mega-item:hover .mega-title { color: var(--color-accent-deep) !important; }
          .mega-icon-frame { /* color uniforme: el PNG ya trae circulo gris, no cambiamos el frame en hover */ }
          .mega-cta { transition: filter 200ms, transform 200ms; }
          .mega-cta:hover { filter: brightness(1.06); transform: translateY(-1px); }
        `}</style>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em]" style={{ color: "rgb(255 255 255 / 0.5)" }}>
            <span style={{ color: "#fff" }}>ES</span><span style={{ color: "rgb(255 255 255 / 0.25)" }}>·</span><a href={enHref.startsWith("http") ? enHref : `https://flameanalytics.com${enHref}`} style={{ color: "#fff" }}>EN</a>
          </div>
          <a href="/es/contacta-draft/" className="cta-btn cta-btn--sm" style={{ background: "var(--color-accent)", color: "var(--color-navy)" }}>
            Solicita una demo
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="pt-16 pb-10 border-t" style={{ background: "var(--color-paper)", borderColor: "var(--color-rule)" }}>
      <div className="flame-container">
        <div className="grid gap-10 mb-10 footer-grid" style={{ gridTemplateColumns: "1.4fr repeat(5, 1fr)" }}>
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2">
              <span style={{ width: 22, height: 22, borderRadius: 6, background: "var(--color-navy)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--color-navy)" }}>FLAME</span>
            </div>
            <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--color-ink-2)", maxWidth: "30ch" }}>
              Empowering physical spaces. Convertimos el vídeo en información en tiempo real para retail, espacios públicos y hoteles.
            </p>
          </div>
          {FOOTER_COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[12.5px] font-semibold uppercase tracking-[0.06em] mb-4" style={{ color: "var(--color-navy)" }}>{c.title}</h4>
              <ul className="flex flex-col gap-2.5 text-[14.5px]" style={{ color: "var(--color-ink-3)" }}>
                {c.links.map(([l, h]) => (
                  <li key={l}><a href={h} className="hover:underline">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex flex-wrap items-center justify-between gap-3 text-[12.5px]" style={{ color: "var(--color-ink-4)", borderTop: "1px solid var(--color-rule)" }}>
          <div>2026 © Flame Analytics — All rights reserved</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="/es/politica-de-privacidad-draft/">Política de privacidad</a>
            <a href="/es/politica-de-cookies-draft/">Cookies</a>
            <a href="/es/condiciones-de-uso-draft/">Condiciones de uso</a>
            <a href="/es/informacion-detallada-draft/">Información detallada del tratamiento</a>
            <a href="/es/politica-de-seguridad-de-la-informacion-draft/">Política de seguridad</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 640px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </footer>
  );
}
