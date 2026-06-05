import type { CSSProperties } from "react";
import Icon from "./Icon";
import { NAV_ITEMS, FOOTER_COLS, FOOTER_COLS_EN, FOOTER_LEGAL_ES, FOOTER_LEGAL_EN, FOOTER_COPY, MEGA_PRODUCTS, MEGA_USE_CASES, MEGA_INDUSTRIES, MEGA_COMMUNITY, NavLeaf } from "@/lib/page-content";

function MegaItem({ it }: { it: NavLeaf }) {
  return (
    <a href={it.href} className="mega-item flex items-start rounded-lg transition" style={{ padding: "10px 12px", gap: 10 }}>
      <span className="inline-flex items-center justify-center flex-shrink-0" style={{ width: 36, height: 36 }}>
        <img src={it.iconImg} alt="" width={36} height={36} style={{ width: 36, height: 36, objectFit: "contain", display: "block" }} />
      </span>
      <span className="flex flex-col min-w-0 flex-1" style={{ paddingTop: 1 }}>
        <span className="mega-title" style={{ color: "var(--color-navy)" }}>{it.label}</span>
        <span className="mega-desc" style={{ color: "var(--color-ink-3)" }}>{it.desc}</span>
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
      <div className="rounded-xl p-4 mega-panel-products" style={{ ...panelStyle, width: "min(460px, calc(100vw - 32px))" }}>
        <div className="flex flex-col gap-1.5">{MEGA_PRODUCTS.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
    );
  }
  if (kind === "community") {
    return (
      <div className="rounded-xl p-4 mega-panel-community" style={{ ...panelStyle, width: "min(460px, calc(100vw - 32px))" }}>
        <div className="flex flex-col gap-1.5">{MEGA_COMMUNITY.map((it) => <MegaItem key={it.href} it={it} />)}</div>
      </div>
    );
  }
  return (
    <div className="rounded-xl mega-panel-solutions" style={{ ...panelStyle, width: "min(1430px, calc(100vw - 24px))", padding: "24px 26px" }}>
      <div className="solutions-grid">
        <div className="use-cases-col">
          <div className="mega-eyebrow">Por caso de uso</div>
          <div className="use-cases-inner">{MEGA_USE_CASES.map((it) => <MegaItem key={it.href} it={it} />)}</div>
        </div>
        <div className="industries-col">
          <div className="mega-eyebrow">Por industria</div>
          <div className="flex flex-col gap-1">{MEGA_INDUSTRIES.map((it) => <MegaItem key={it.href} it={it} />)}</div>
        </div>
      </div>
      <style>{`
        .solutions-grid { display: grid; gap: 28px; grid-template-columns: 2fr 1.4fr; align-items: start; }
        .use-cases-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px; }
        .industries-col { border-left: 1px solid var(--color-rule); padding-left: 24px; }
        .mega-eyebrow { font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.14em; color: var(--color-accent-deep); margin-bottom: 14px; padding-left: 12px; }
        @media (max-width: 1300px) {
          .mega-panel-solutions { width: min(760px, calc(100vw - 24px)) !important; }
          .solutions-grid { grid-template-columns: 1fr; gap: 24px; }
          .industries-col { border-left: 0 !important; padding-left: 0 !important; border-top: 1px solid var(--color-rule); padding-top: 24px; }
        }
        @media (max-width: 640px) {
          .use-cases-inner { grid-template-columns: 1fr; }
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
      /* Mega-menu items — globales para que Products, Solutions y Community compartan */
      .mega-title {
        font-size: 14px; font-weight: 600; line-height: 1.25; color: var(--color-navy);
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .mega-desc {
        font-size: 12.5px; line-height: 1.4; margin-top: 3px; color: var(--color-ink-3);
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        overflow: hidden; word-wrap: break-word; overflow-wrap: anywhere;
        min-height: calc(12.5px * 1.4 * 2);
      }
      @media (max-width: 640px) {
        .mega-title { white-space: normal; }
        .mega-desc { -webkit-line-clamp: 1; min-height: calc(12.5px * 1.4); }
      }
    `}</style>
  );
}

export function SiteHeader({ enHref = "/en/", currentLang = "es" }: { enHref?: string; currentLang?: "es" | "en" }) {
  const otherLangCode = currentLang === "es" ? "EN" : "ES";
  const currentLangCode = currentLang === "es" ? "ES" : "EN";
  // enHref always points to "the other language version". Keep as local path.
  const otherHref = enHref;
  return (
    <>
    {/* Mobile toggle FUERA del header (evita atrapar el drawer en el stacking context del backdrop-filter) */}
    <input id="mb-toggle" type="checkbox" className="mb-toggle" aria-hidden="true" />
    <header
      className="sticky top-0 border-b"
      style={{
        zIndex: 9999,
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
            const megaHref = isMega ? (it as { href?: string }).href : undefined;
            return (
              <div key={it.label} className="nav-item relative">
                {!isMega ? (
                  <a href={(it as { href: string }).href} className="nav-link" style={{ color: "#fff" }}>
                    {it.label}
                  </a>
                ) : (
                  <>
                    {megaHref ? (
                      // Mega item con href: clickeable + despliega dropdown al hover
                      <a href={megaHref} className="nav-link inline-flex items-center gap-1.5" style={{ color: "#fff" }}>
                        {it.label}
                        <span style={{ fontSize: 9, lineHeight: 1, transform: "translateY(1px)" }}>▾</span>
                      </a>
                    ) : (
                      <button type="button" className="nav-link inline-flex items-center gap-1.5" style={{ color: "#fff" }}>
                        {it.label}
                        <span style={{ fontSize: 9, lineHeight: 1, transform: "translateY(1px)" }}>▾</span>
                      </button>
                    )}
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
            font-family: var(--font-body) !important;
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
          /* Solutions: SIEMPRE fijo al viewport y centrado horizontalmente — nunca overflow */
          .nav-dropdown--solutions {
            position: fixed; top: 64px; left: 12px; right: 12px; padding-top: 12px;
            display: flex; justify-content: center;
          }
          /* Bridge invisible bajo cada nav-link para no perder hover al bajar al dropdown */
          .nav-item > a.nav-link::after,
          .nav-item > button.nav-link::after {
            content: ''; position: absolute; top: 100%; left: -12px; right: -12px; height: 14px; background: transparent;
          }
          .mega-item:hover { background: var(--color-paper-soft); }
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
            <span style={{ color: "#fff" }}>{currentLangCode}</span><span style={{ color: "rgb(255 255 255 / 0.4)" }}>|</span><a href={otherHref} style={{ color: "rgb(255 255 255 / 0.6)" }}>{otherLangCode}</a>
          </div>
          <a href={currentLang === "en" ? "/en/#contact" : "/es/#contact"} className="cta-btn cta-btn--sm hidden sm:inline-flex" style={{ background: "var(--color-accent)", color: "#fff", fontWeight: 700 }}>
            {currentLang === "en" ? "Request a demo" : "Solicita una demo"}
          </a>
          {/* Mobile burger — el checkbox toggle vive FUERA del header */}
          <label htmlFor="mb-toggle" className="mb-burger lg:hidden" aria-label={currentLang === "en" ? "Open menu" : "Abrir menú"}>
            <span className="mb-burger-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="4" y1="7"  x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </span>
            <span className="mb-burger-close">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </span>
          </label>
        </div>
      </div>
      <style>{`
        /* ========= MOBILE MENU (checkbox-driven, no JS, slide drawer) ========= */
        .mb-toggle { position: absolute; left: -9999px; opacity: 0; pointer-events: none; }
        .mb-burger {
          display: inline-flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 6px;
          color: #fff; cursor: pointer; position: relative; z-index: 100002;
        }
        .mb-burger:hover { background: rgb(255 255 255 / 0.08); }
        .mb-burger-close { display: none; }
        .mb-toggle:checked ~ .mb-burger .mb-burger-icon { display: none; }
        .mb-toggle:checked ~ .mb-burger .mb-burger-close { display: inline-flex; }
        .mb-backdrop {
          position: fixed; inset: 0;
          background: rgb(8 9 26 / 0.6); backdrop-filter: blur(4px);
          opacity: 0; visibility: hidden; transition: opacity 240ms, visibility 240ms;
          z-index: 100000; cursor: pointer;
        }
        .mb-toggle:checked ~ .mb-backdrop { opacity: 1; visibility: visible; }
        .mb-drawer {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(360px, 90vw); max-width: 100vw;
          background: linear-gradient(180deg, #15163A 0%, #0e0f29 100%);
          color: #fff;
          transform: translateX(100%); transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 100001; overflow-y: auto; overflow-x: hidden;
          box-shadow: -16px 0 40px -10px rgb(0 0 0 / 0.4);
          padding-top: 64px; /* deja paso al header */
          -webkit-overflow-scrolling: touch;
        }
        .mb-toggle:checked ~ .mb-drawer { transform: translateX(0); }
        body:has(.mb-toggle:checked) { overflow: hidden; }
        .mb-drawer-inner { padding: 20px 22px 32px; display: flex; flex-direction: column; gap: 6px; }

        /* Lang switcher arriba */
        .mb-langs {
          display: flex; align-items: center; gap: 10px; padding: 4px 6px 12px;
          border-bottom: 1px solid rgb(255 255 255 / 0.08);
          margin-bottom: 16px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.1em;
        }
        .mb-lang { color: rgb(255 255 255 / 0.45); text-decoration: none; padding: 6px 10px; border-radius: 4px; }
        .mb-lang.is-active { color: #fff; background: rgb(49 177 248 / 0.18); }
        .mb-lang-sep { color: rgb(255 255 255 / 0.3); }

        /* Sección colapsable */
        .mb-section { border-bottom: 1px solid rgb(255 255 255 / 0.06); }
        .mb-section summary { list-style: none; cursor: pointer; }
        .mb-section summary::-webkit-details-marker { display: none; }
        .mb-summary {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 12px; font-size: 16px; font-weight: 600;
          color: #fff; cursor: pointer; min-height: 48px;
        }
        .mb-chev { font-size: 10px; opacity: 0.55; transition: transform 200ms; }
        .mb-section[open] .mb-chev { transform: rotate(180deg); }
        .mb-sub { padding: 4px 8px 18px; display: flex; flex-direction: column; gap: 2px; }
        .mb-sub-eyebrow {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.14em; color: var(--color-accent);
          padding: 8px 8px 6px;
        }
        .mb-sub-eyebrow.mt-2 { margin-top: 8px; }
        .mb-sublink {
          display: flex; flex-direction: column; gap: 2px;
          padding: 10px 8px; border-radius: 6px;
          color: rgb(255 255 255 / 0.92); text-decoration: none;
          font-size: 15px; min-height: 44px;
        }
        .mb-sublink:hover, .mb-sublink:focus { background: rgb(255 255 255 / 0.05); }
        .mb-sublink-title { font-weight: 600; }
        .mb-sublink-desc { font-size: 12.5px; color: rgb(255 255 255 / 0.55); line-height: 1.35; }

        /* Top-level links (Hypersensor, Partners, Nosotros) */
        .mb-toplink {
          display: block; padding: 16px 12px; min-height: 48px;
          font-size: 16px; font-weight: 600; color: #fff;
          text-decoration: none; border-bottom: 1px solid rgb(255 255 255 / 0.06);
        }
        .mb-toplink:hover, .mb-toplink:focus { background: rgb(255 255 255 / 0.04); }

        /* CTA sticky abajo */
        .mb-cta {
          display: flex; align-items: center; justify-content: center;
          margin-top: 22px; padding: 14px 24px;
          background: var(--color-accent); color: #fff;
          font-weight: 700; font-size: 16px;
          border-radius: 4px; text-decoration: none;
          min-height: 52px;
          box-shadow: 0 8px 24px -8px rgb(49 177 248 / 0.4);
        }
        .mb-cta:hover { filter: brightness(0.94); }

        /* deshabilitado en desktop */
        @media (min-width: 1024px) {
          .mb-burger, .mb-backdrop, .mb-drawer { display: none !important; }
        }

        /* === Estilos legacy (compatibilidad) === */
        .m-cta {
          display: block; margin-top: 28px; padding: 14px 22px;
          background: var(--color-accent); color: var(--color-navy);
          font-weight: 600; font-size: 16px;
          border-radius: 4px; text-align: center; text-decoration: none;
        }
      `}</style>
    </header>
    {/* Backdrop oscuro detrás del drawer — FUERA del header para escapar de su stacking context */}
    <label htmlFor="mb-toggle" className="mb-backdrop" aria-hidden="true"></label>
    {/* Drawer slide-in desde la derecha — FUERA del header */}
    <aside className="mb-drawer" aria-label={currentLang === "en" ? "Mobile navigation" : "Navegación móvil"}>
      <div className="mb-drawer-inner">
        {/* TOP: lang switcher */}
        <div className="mb-langs">
          <a href={currentLang === "es" ? "/es/" : otherHref} className={`mb-lang ${currentLang === "es" ? "is-active" : ""}`}>ES</a>
          <span className="mb-lang-sep">·</span>
          <a href={currentLang === "en" ? "/en/" : otherHref} className={`mb-lang ${currentLang === "en" ? "is-active" : ""}`}>EN</a>
        </div>

        {/* PRODUCTO (collapse) */}
        <details className="mb-section">
          <summary className="mb-summary">{currentLang === "en" ? "Product" : "Producto"}<span className="mb-chev">▾</span></summary>
          <div className="mb-sub">
            {MEGA_PRODUCTS.map(it => (
              <a key={it.href} href={it.href} className="mb-sublink">
                <span className="mb-sublink-title">{it.label}</span>
                <span className="mb-sublink-desc">{it.desc}</span>
              </a>
            ))}
          </div>
        </details>

        {/* SOLUCIONES (collapse) */}
        <details className="mb-section">
          <summary className="mb-summary">{currentLang === "en" ? "Solutions" : "Soluciones"}<span className="mb-chev">▾</span></summary>
          <div className="mb-sub">
            <p className="mb-sub-eyebrow">{currentLang === "en" ? "By use case" : "Por caso de uso"}</p>
            {MEGA_USE_CASES.map(it => (
              <a key={it.href} href={it.href} className="mb-sublink">
                <span className="mb-sublink-title">{it.label}</span>
              </a>
            ))}
            <p className="mb-sub-eyebrow mt-2">{currentLang === "en" ? "By industry" : "Por industria"}</p>
            {MEGA_INDUSTRIES.map(it => (
              <a key={it.href} href={it.href} className="mb-sublink">
                <span className="mb-sublink-title">{it.label}</span>
              </a>
            ))}
          </div>
        </details>

        <a href={currentLang === "en" ? "/en/hypersensor/" : "/es/hypersensor/"} className="mb-toplink">Hypersensor</a>
        <a href={currentLang === "en" ? "/en/partners/" : "/es/partners/"} className="mb-toplink">Partners</a>
        <a href={currentLang === "en" ? "/en/community/" : "/es/comunidad/"} className="mb-toplink">{currentLang === "en" ? "Community" : "Comunidad"}</a>
        <a href={currentLang === "en" ? "/en/about-us/" : "/es/sobre-nosotros/"} className="mb-toplink">{currentLang === "en" ? "About us" : "Nosotros"}</a>

        {/* CTA sticky abajo */}
        <a href={currentLang === "en" ? "/en/#contact" : "/es/#contact"} className="mb-cta">
          {currentLang === "en" ? "Request a demo" : "Solicita una demo"}
        </a>
      </div>
    </aside>
    </>
  );
}

export function SiteFooter({ currentLang = "es" }: { currentLang?: "es" | "en" } = {}) {
  const cols = currentLang === "en" ? FOOTER_COLS_EN : FOOTER_COLS;
  const legal = currentLang === "en" ? FOOTER_LEGAL_EN : FOOTER_LEGAL_ES;
  const copy = FOOTER_COPY[currentLang];
  return (
    <footer className="pt-16 pb-10 border-t" style={{ background: "var(--color-paper)", borderColor: "var(--color-rule)" }}>
      <div className="flame-container">
        <div className="grid gap-10 mb-10 footer-grid" style={{ gridTemplateColumns: "1.4fr repeat(5, 1fr)" }}>
          <div className="flex flex-col gap-4">
            <a href={copy.homeHref} className="inline-flex items-center">
              <img src="/wp-content/uploads/2023/10/flame-logo-black.png" alt="Flame Analytics" style={{ height: 36, width: "auto", display: "block" }} />
            </a>
            <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--color-ink-2)", maxWidth: "30ch" }}>
              {copy.desc}
            </p>
          </div>
          {cols.map((c) => (
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
          <div>2026 © Flame Analytics — {copy.rights}</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid > div:first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 420px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
