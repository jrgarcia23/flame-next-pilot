"use client";
import { useEffect, useState } from "react";

const COOKIE_KEY = "flame_consent";
const PREFS_KEY = "flame_consent_prefs";

type Lang = "es" | "en";
type Prefs = { necessary: true; analytics: boolean; marketing: boolean };

const DEFAULT_PREFS: Prefs = { necessary: true, analytics: false, marketing: false };

const STR = {
  es: {
    title: "Tu privacidad importa",
    body: "Usamos cookies propias y de terceros para analizar el uso del sitio, personalizar contenidos y medir nuestro marketing. Puedes aceptarlas todas, configurarlas o rechazar las no esenciales.",
    accept: "Aceptar todas",
    reject: "Solo necesarias",
    config: "Configurar",
    policy: "Política de cookies",
    policyHref: "/es/politica-de-cookies/",
    // Modal
    modalTitle: "Configurar cookies",
    modalIntro: "Elige qué tipos de cookies quieres permitir. Las estrictamente necesarias no se pueden desactivar porque garantizan el funcionamiento del sitio.",
    catNecessary: "Estrictamente necesarias",
    catNecessaryDesc: "Requeridas para el funcionamiento básico del sitio: sesión, idioma, seguridad y consentimiento de cookies.",
    catAnalytics: "Analíticas",
    catAnalyticsDesc: "Medición anónima y agregada del uso del sitio (páginas visitadas, tiempo, origen). Nos ayuda a mejorar el contenido.",
    catMarketing: "Marketing",
    catMarketingDesc: "Medición de la efectividad de nuestras campañas y personalización de comunicaciones comerciales.",
    alwaysOn: "Siempre activas",
    save: "Guardar preferencias",
    cancel: "Cancelar",
  },
  en: {
    title: "Your privacy matters",
    body: "We use our own and third-party cookies to analyze site usage, personalize content and measure our marketing. You can accept all, configure or reject non-essential cookies.",
    accept: "Accept all",
    reject: "Necessary only",
    config: "Configure",
    policy: "Cookie policy",
    policyHref: "/en/cookie-policy/",
    modalTitle: "Configure cookies",
    modalIntro: "Choose which types of cookies you want to allow. Strictly necessary ones cannot be disabled because they ensure the site works.",
    catNecessary: "Strictly necessary",
    catNecessaryDesc: "Required for basic site functionality: session, language, security and cookie consent.",
    catAnalytics: "Analytics",
    catAnalyticsDesc: "Anonymous, aggregate measurement of site usage (pages visited, time, origin). Helps us improve content.",
    catMarketing: "Marketing",
    catMarketingDesc: "Measurement of our campaign effectiveness and personalization of commercial communications.",
    alwaysOn: "Always on",
    save: "Save preferences",
    cancel: "Cancel",
  },
};

function persist(value: "accepted" | "rejected" | "configured", prefs: Prefs) {
  try {
    localStorage.setItem(COOKIE_KEY, value);
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    const maxAge = 60 * 60 * 24 * 180; // 180 days
    document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
    // Notifica al GoogleAnalytics component que el consent ha cambiado para actualizar gtag.
    window.dispatchEvent(new CustomEvent("flame-consent-updated", { detail: prefs }));
  } catch {}
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/es/";
    setLang(path.startsWith("/en/") ? "en" : "es");
    try {
      const v = localStorage.getItem(COOKIE_KEY);
      if (!v) setOpen(true);
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) setPrefs({ ...DEFAULT_PREFS, ...JSON.parse(saved) });
    } catch {
      setOpen(true);
    }
  }, []);

  const acceptAll = () => { persist("accepted", { necessary: true, analytics: true, marketing: true }); setOpen(false); setConfigOpen(false); };
  const rejectAll = () => { persist("rejected", { necessary: true, analytics: false, marketing: false }); setOpen(false); setConfigOpen(false); };
  const savePrefs = () => { persist("configured", prefs); setOpen(false); setConfigOpen(false); };

  if (!open && !configOpen) return null;
  const t = STR[lang];

  return (
    <>
      {/* Banner */}
      {open && !configOpen && (
        <div className="flame-cookie-banner" role="dialog" aria-label={t.title}>
          <div className="flame-cookie-inner">
            <div className="flame-cookie-text">
              <div className="flame-cookie-title">{t.title}</div>
              <p className="flame-cookie-body">
                {t.body}{" "}
                <a href={t.policyHref} className="flame-cookie-link">{t.policy}</a>.
              </p>
            </div>
            <div className="flame-cookie-actions">
              <button type="button" className="flame-cookie-btn flame-cookie-btn--ghost" onClick={rejectAll}>{t.reject}</button>
              <button type="button" className="flame-cookie-btn flame-cookie-btn--ghost" onClick={() => setConfigOpen(true)}>{t.config}</button>
              <button type="button" className="flame-cookie-btn flame-cookie-btn--primary" onClick={acceptAll}>{t.accept}</button>
            </div>
          </div>
        </div>
      )}

      {/* Config modal */}
      {configOpen && (
        <div className="flame-cookie-modal-overlay" role="dialog" aria-modal="true" aria-label={t.modalTitle}>
          <div className="flame-cookie-modal">
            <div className="flame-cookie-modal-header">
              <h2 className="flame-cookie-modal-title">{t.modalTitle}</h2>
              <button type="button" className="flame-cookie-modal-close" aria-label="Cerrar" onClick={() => setConfigOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
              </button>
            </div>
            <p className="flame-cookie-modal-intro">{t.modalIntro}</p>

            <ul className="flame-cookie-cats">
              <li className="flame-cookie-cat">
                <div className="flame-cookie-cat-head">
                  <div>
                    <div className="flame-cookie-cat-name">{t.catNecessary}</div>
                    <p className="flame-cookie-cat-desc">{t.catNecessaryDesc}</p>
                  </div>
                  <span className="flame-cookie-badge">{t.alwaysOn}</span>
                </div>
              </li>
              <li className="flame-cookie-cat">
                <div className="flame-cookie-cat-head">
                  <div>
                    <div className="flame-cookie-cat-name">{t.catAnalytics}</div>
                    <p className="flame-cookie-cat-desc">{t.catAnalyticsDesc}</p>
                  </div>
                  <label className="flame-cookie-switch">
                    <input type="checkbox" checked={prefs.analytics} onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} />
                    <span className="flame-cookie-switch-track"></span>
                  </label>
                </div>
              </li>
              <li className="flame-cookie-cat">
                <div className="flame-cookie-cat-head">
                  <div>
                    <div className="flame-cookie-cat-name">{t.catMarketing}</div>
                    <p className="flame-cookie-cat-desc">{t.catMarketingDesc}</p>
                  </div>
                  <label className="flame-cookie-switch">
                    <input type="checkbox" checked={prefs.marketing} onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })} />
                    <span className="flame-cookie-switch-track"></span>
                  </label>
                </div>
              </li>
            </ul>

            <div className="flame-cookie-modal-actions">
              <button type="button" className="flame-cookie-btn flame-cookie-btn--ghost" onClick={() => { setConfigOpen(false); setOpen(true); }}>{t.cancel}</button>
              <button type="button" className="flame-cookie-btn flame-cookie-btn--primary" onClick={savePrefs}>{t.save}</button>
            </div>
            <a href={t.policyHref} className="flame-cookie-link flame-cookie-modal-policy">{t.policy} →</a>
          </div>
        </div>
      )}

      <style>{`
        .flame-cookie-banner {
          position: fixed; bottom: 16px; left: 16px; right: 16px;
          z-index: 9999;
          background: rgb(21 22 58 / 0.97);
          backdrop-filter: blur(20px) saturate(140%);
          -webkit-backdrop-filter: blur(20px) saturate(140%);
          border: 1px solid rgb(255 255 255 / 0.08);
          border-radius: 14px;
          box-shadow: 0 24px 60px -20px rgb(0 0 0 / 0.4);
          color: #fff;
          font-family: "Instrument Sans", system-ui, sans-serif;
          animation: flame-cookie-in 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .flame-cookie-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 18px 22px;
          display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
        }
        .flame-cookie-text { flex: 1; min-width: 260px; }
        .flame-cookie-title { font-size: 15px; font-weight: 600; letter-spacing: -0.005em; margin-bottom: 4px; color: #fff; }
        .flame-cookie-body { font-size: 13.5px; line-height: 1.5; color: rgb(255 255 255 / 0.74); margin: 0; max-width: 78ch; }
        .flame-cookie-link { color: #31b1f8; border-bottom: 1px solid currentColor; text-decoration: none; }
        .flame-cookie-link:hover { color: #fff; }
        .flame-cookie-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .flame-cookie-btn {
          font-family: inherit;
          font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
          padding: 10px 16px; border-radius: 4px;
          cursor: pointer; border: 1px solid transparent;
          transition: transform 180ms, background 180ms, color 180ms, border-color 180ms, opacity 180ms, filter 180ms, box-shadow 180ms;
        }
        .flame-cookie-btn:hover { transform: translateY(-1px); }
        .flame-cookie-btn--ghost {
          background: transparent;
          border-color: rgb(255 255 255 / 0.14);
          color: rgb(255 255 255 / 0.6);
          font-weight: 400;
        }
        .flame-cookie-btn--ghost:hover { background: rgb(255 255 255 / 0.05); color: rgb(255 255 255 / 0.85); border-color: rgb(255 255 255 / 0.22); }
        .flame-cookie-btn--primary {
          background: #31b1f8; color: #15163A; border-color: transparent;
          font-size: 14.5px; font-weight: 600;
          padding: 12px 28px;
          box-shadow: 0 4px 14px -4px rgb(49 177 248 / 0.5);
        }
        .flame-cookie-btn--primary:hover { filter: brightness(1.05); box-shadow: 0 6px 18px -4px rgb(49 177 248 / 0.6); }

        /* Modal */
        .flame-cookie-modal-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgb(15 17 38 / 0.6);
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          font-family: "Instrument Sans", system-ui, sans-serif;
          animation: flame-cookie-fade 220ms ease-out;
        }
        .flame-cookie-modal {
          background: #fff; color: #15163A;
          width: 100%; max-width: 540px; max-height: 88vh; overflow-y: auto;
          border-radius: 14px;
          padding: 28px;
          box-shadow: 0 32px 80px -16px rgb(0 0 0 / 0.45);
          animation: flame-cookie-zoom 240ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .flame-cookie-modal-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 10px; }
        .flame-cookie-modal-title { font-family: "Clash Grotesk Variable", system-ui, sans-serif; font-size: 24px; font-weight: 500; letter-spacing: -0.015em; color: #15163A; margin: 0; }
        .flame-cookie-modal-close { width: 36px; height: 36px; border: 0; background: transparent; cursor: pointer; color: #5b6473; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; transition: background 180ms, color 180ms; }
        .flame-cookie-modal-close:hover { background: #F2F4F6; color: #15163A; }
        .flame-cookie-modal-intro { font-size: 14px; line-height: 1.55; color: #5b6473; margin: 0 0 22px; }
        .flame-cookie-cats { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 4px; }
        .flame-cookie-cat { padding: 18px 0; border-top: 1px solid #E1E5EE; }
        .flame-cookie-cat:first-child { border-top: 1px solid #E1E5EE; }
        .flame-cookie-cat-head { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
        .flame-cookie-cat-name { font-size: 15px; font-weight: 600; color: #15163A; letter-spacing: -0.005em; margin-bottom: 4px; }
        .flame-cookie-cat-desc { font-size: 13px; line-height: 1.55; color: #5b6473; margin: 0; max-width: 56ch; }
        .flame-cookie-badge { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; padding: 6px 10px; background: #F2F4F6; color: #5b6473; border-radius: 4px; white-space: nowrap; }

        /* Switch */
        .flame-cookie-switch { position: relative; display: inline-block; width: 44px; height: 24px; flex-shrink: 0; cursor: pointer; }
        .flame-cookie-switch input { opacity: 0; width: 0; height: 0; }
        .flame-cookie-switch-track {
          position: absolute; inset: 0;
          background: #c8cdd6; border-radius: 999px;
          transition: background 200ms;
        }
        .flame-cookie-switch-track::after {
          content: ""; position: absolute;
          width: 18px; height: 18px; left: 3px; top: 3px;
          background: #fff; border-radius: 50%;
          box-shadow: 0 1px 3px rgb(0 0 0 / 0.18);
          transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .flame-cookie-switch input:checked + .flame-cookie-switch-track { background: #31b1f8; }
        .flame-cookie-switch input:checked + .flame-cookie-switch-track::after { transform: translateX(20px); }

        .flame-cookie-modal-actions { display: flex; gap: 10px; margin-top: 24px; justify-content: flex-end; flex-wrap: wrap; }
        .flame-cookie-modal-actions .flame-cookie-btn--ghost {
          color: #5b6473; border-color: #E1E5EE;
        }
        .flame-cookie-modal-actions .flame-cookie-btn--ghost:hover { background: #F2F4F6; color: #15163A; border-color: #c8cdd6; }
        .flame-cookie-modal-policy { display: inline-block; margin-top: 18px; font-size: 13px; color: #1b8bd6; border-bottom-color: rgb(27 139 214 / 0.3); }
        .flame-cookie-modal-policy:hover { color: #15163A; border-bottom-color: currentColor; }

        @media (max-width: 700px) {
          .flame-cookie-banner { bottom: 8px; left: 8px; right: 8px; }
          .flame-cookie-inner { padding: 16px; gap: 14px; }
          .flame-cookie-actions { width: 100%; flex-direction: column; }
          .flame-cookie-btn { width: 100%; text-align: center; }
          .flame-cookie-modal { padding: 22px; max-height: 92vh; }
          .flame-cookie-modal-title { font-size: 21px; }
          .flame-cookie-modal-actions { flex-direction: column-reverse; }
          .flame-cookie-modal-actions .flame-cookie-btn { width: 100%; }
        }
        @keyframes flame-cookie-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes flame-cookie-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes flame-cookie-zoom { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
    </>
  );
}
