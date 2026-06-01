"use client";
import { useEffect, useState } from "react";

const COOKIE_KEY = "flame_consent";

type Lang = "es" | "en";
const STR = {
  es: {
    title: "Tu privacidad importa",
    body: "Usamos cookies propias y de terceros para analizar el uso del sitio, personalizar contenidos y medir nuestro marketing. Puedes aceptarlas todas, configurarlas o rechazar las no esenciales.",
    accept: "Aceptar todas",
    reject: "Solo necesarias",
    config: "Configurar",
    policy: "Política de cookies",
    policyHref: "/es/politica-de-cookies/",
  },
  en: {
    title: "Your privacy matters",
    body: "We use our own and third-party cookies to analyze site usage, personalize content and measure our marketing. You can accept all, configure or reject non-essential cookies.",
    accept: "Accept all",
    reject: "Necessary only",
    config: "Configure",
    policy: "Cookie policy",
    policyHref: "/en/cookie-policy/",
  },
};

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "/es/";
    setLang(path.startsWith("/en/") ? "en" : "es");
    try {
      const v = localStorage.getItem(COOKIE_KEY);
      if (!v) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  const persist = (value: "accepted" | "rejected" | "configured") => {
    try {
      localStorage.setItem(COOKIE_KEY, value);
      const maxAge = 60 * 60 * 24 * 180; // 180 days
      document.cookie = `${COOKIE_KEY}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
    } catch {}
    setOpen(false);
  };

  if (!open) return null;
  const t = STR[lang];

  return (
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
          <button type="button" className="flame-cookie-btn flame-cookie-btn--ghost" onClick={() => persist("rejected")}>{t.reject}</button>
          <button type="button" className="flame-cookie-btn flame-cookie-btn--ghost" onClick={() => persist("configured")}>{t.config}</button>
          <button type="button" className="flame-cookie-btn flame-cookie-btn--primary" onClick={() => persist("accepted")}>{t.accept}</button>
        </div>
      </div>
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
        .flame-cookie-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .flame-cookie-btn {
          font-family: inherit;
          font-size: 13.5px; font-weight: 500; letter-spacing: -0.005em;
          padding: 10px 16px; border-radius: 4px;
          cursor: pointer; border: 1px solid transparent;
          transition: transform 180ms, background 180ms, color 180ms, border-color 180ms, opacity 180ms;
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
        @media (max-width: 700px) {
          .flame-cookie-banner { bottom: 8px; left: 8px; right: 8px; }
          .flame-cookie-inner { padding: 16px; gap: 14px; }
          .flame-cookie-actions { width: 100%; flex-direction: column; }
          .flame-cookie-btn { width: 100%; text-align: center; }
        }
        @keyframes flame-cookie-in {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
