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
      <div className="rounded-xl p-3 mega-panel-products" style={{ ...panelStyle, width: "min(420px, calc(100vw - 32px))" }}>
        <div className="flex flex-col gap-1">{MEGA_PRODUCTS.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
    );
  }
  if (kind === "community") {
    return (
      <div className="rounded-xl p-3 mega-panel-community" style={{ ...panelStyle, width: "min(420px, calc(100vw - 32px))" }}>
        <div className="flex flex-col gap-1">{MEGA_COMMUNITY.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
    );
  }
  return (
    <div className="rounded-xl p-6 mega-panel-solutions" style={{ ...panelStyle, width: "min(1080px, calc(100vw - 24px))" }}>
      <div className="solutions-grid">
        <div>
          <div className="text-[11px] uppercase font-semibold mb-3 px-3" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.1em" }}>Por caso de uso</div>
          <div className="grid grid-cols-2 gap-1 use-cases-inner">{MEGA_USE_CASES.map((it) => <MegaItem key={it.href} it={it} />)}</div>
        </div>
        <div className="industries-col" style={{ borderLeft: "1px solid var(--color-rule)", paddingLeft: 24 }}>
          <div className="text-[11px] uppercase font-semibold mb-3 px-3" style={{ color: "var(--color-accent-deep)", letterSpacing: "0.1em" }}>Por industria</div>
          <div className="flex flex-col gap-1">{MEGA_INDUSTRIES.map((it) => <MegaItem key={it.href} it={it} />)}</div>
        </div>
        <a href="/es/contacta/" className="mega-cta flex flex-col justify-between rounded-lg p-6" style={{ background: "linear-gradient(140deg, var(--color-navy) 0%, #1f2160 100%)", color: "#fff" }}>
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
      <style>{`
        .solutions-grid { display: grid; gap: 24px; grid-template-columns: 1.5fr 1fr 0.95fr; }
        @media (max-width: 1280px) { .solutions-grid { grid-template-columns: 1.4fr 1fr 0.9fr; gap: 16px; } }
        @media (max-width: 1024px) {
          .solutions-grid { grid-template-columns: 1fr 1fr; }
          .solutions-grid .mega-cta { grid-column: 1 / -1; }
          .industries-col { border-left: 0 !important; padding-left: 0 !important; border-top: 1px solid var(--color-rule); padding-top: 16px; }
        }
      `}</style>
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
          .nav-link,
          .nav-link:hover,
          .nav-link:focus,
          .nav-link:visited,
          .nav-link:active {
            display: inline-flex; align-items: center;
            padding: 8px 14px;
            font-family: "Instrument Sans", system-ui, sans-serif !important;
            font-size: 16px !important; font-weight: 600 !important; line-height: 1.4 !important;
            color: #fff !important;
            background: transparent !important; border: 0; cursor: pointer;
            border-radius: 6px;
            text-decoration: none !important;
          }
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
          /* Solutions: fija al viewport (no overflow nunca), centrada con max-width */
          .nav-dropdown--solutions {
            position: fixed; top: 64px; left: 12px; right: 12px; padding-top: 10px;
            display: flex; justify-content: center;
          }
          @media (min-width: 1500px) {
            .nav-dropdown--solutions {
              position: absolute; top: 100%; left: 50%; right: auto;
              transform: translate(-50%, -4px);
              display: block;
            }
            .nav-item:hover .nav-dropdown--solutions,
            .nav-item:focus-within .nav-dropdown--solutions { transform: translateX(-50%) translateY(0); }
          }
          .nav-item:hover .nav-dropdown,
          .nav-item:focus-within .nav-dropdown {
            opacity: 1; visibility: visible; transform: translateY(0);
            pointer-events: auto;
          }
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
          <a href="/es/contacta/" className="cta-btn cta-btn--sm hidden sm:inline-flex" style={{ background: "var(--color-accent)", color: "var(--color-navy)" }}>
            Solicita una demo
          </a>
          {/* Mobile hamburger */}
          <details className="mobile-nav lg:hidden">
            <summary aria-label="Abrir menú" className="mobile-burger" style={{ width: 40, height: 40, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 6, color: "#fff", listStyle: "none" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7"  x2="20" y2="7"/>
                <line x1="4" y1="12" x2="20" y2="12"/>
                <line x1="4" y1="17" x2="20" y2="17"/>
              </svg>
            </summary>
            <div className="mobile-drawer">
              <a href="/es/" className="m-section-title">Producto</a>
              {MEGA_PRODUCTS.map(it => <a key={it.href} href={it.href} className="m-link">{it.label}</a>)}
              <div className="m-section-title">Soluciones · casos de uso</div>
              {MEGA_USE_CASES.map(it => <a key={it.href} href={it.href} className="m-link">{it.label}</a>)}
              <div className="m-section-title">Soluciones · industrias</div>
              {MEGA_INDUSTRIES.map(it => <a key={it.href} href={it.href} className="m-link">{it.label}</a>)}
              <a href="/es/hypersensor/" className="m-link m-link--top">Hypersensor</a>
              <a href="/es/partners/" className="m-link">Partners</a>
              <div className="m-section-title">Comunidad</div>
              {MEGA_COMMUNITY.map(it => <a key={it.href} href={it.href} className="m-link">{it.label}</a>)}
              <a href="/es/sobre-nosotros/" className="m-link m-link--top">Nosotros</a>
              <a href="/es/contacta/" className="m-cta">Solicita una demo</a>
            </div>
          </details>
        </div>
      </div>
      <style>{`
        .mobile-nav summary::-webkit-details-marker { display: none; }
        .mobile-nav summary::marker { display: none; }
        .mobile-nav .mobile-burger:hover { background: rgb(255 255 255 / 0.08); }
        .mobile-nav[open] .mobile-drawer {
          position: fixed; top: 64px; left: 0; right: 0; bottom: 0;
          background: rgb(21 22 58 / 0.98); backdrop-filter: blur(20px);
          padding: 24px; overflow-y: auto; z-index: 60;
        }
        .mobile-drawer { display: none; }
        .mobile-nav[open] .mobile-drawer { display: block; }
        .m-section-title {
          display: block; margin: 18px 0 8px 0; font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: var(--color-accent); text-decoration: none;
        }
        .m-link {
          display: block; padding: 12px 12px; font-size: 16px; font-weight: 500;
          color: #fff; text-decoration: none; border-radius: 6px;
        }
        .m-link:hover, .m-link:focus { background: rgb(255 255 255 / 0.06); color: #fff; }
        .m-link--top { margin-top: 18px; font-weight: 600; }
        .m-cta {
          display: block; margin-top: 28px; padding: 14px 22px;
          background: var(--color-accent); color: var(--color-navy);
          font-weight: 600; font-size: 16px;
          border-radius: 4px; text-align: center; text-decoration: none;
        }
      `}</style>
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
            <a href="/es/politica-de-privacidad/">Política de privacidad</a>
            <a href="/es/politica-de-cookies/">Cookies</a>
            <a href="/es/condiciones-de-uso/">Condiciones de uso</a>
            <a href="/es/informacion-detallada/">Información detallada del tratamiento</a>
            <a href="/es/politica-de-seguridad-de-la-informacion/">Política de seguridad</a>
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
