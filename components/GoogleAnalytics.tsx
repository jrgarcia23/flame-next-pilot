"use client";

import Script from "next/script";
import { useEffect } from "react";
import { persistAttributionFromURL } from "@/lib/attribution";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-SF7P1Q5BV2";
const ADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "AW-11095510705";
const PREFS_KEY = "flame_consent_prefs";

type Prefs = { necessary?: true; analytics?: boolean; marketing?: boolean };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Google Analytics 4 con Consent Mode v2.
 *
 * - Por defecto, analytics_storage = denied (cumplimiento GDPR).
 * - Cuando el usuario acepta cookies en el CookieBanner, escuchamos el evento
 *   `flame-consent-updated` y mandamos `gtag('consent', 'update', ...)`.
 * - GA4 carga siempre el script pero solo manda hits cuando hay consent.
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Persistir gclid/UTMs del URL en localStorage para no perder atribución
    // si el visitante navega antes de rellenar el form (lib/lead-context.ts
    // hace fallback a esto cuando el submit no tiene parámetros en la URL).
    persistAttributionFromURL();

    // Cuando GA4 esté listo, mandar el client_id a Clarity como Custom Tag.
    // Permite buscar en Clarity la sesión exacta de cada lead (filter:
    // Custom Tag → ga_client_id = <valor del lead en BD>) y ver la grabación.
    const sendClarityTag = () => {
      try {
        const w = window as unknown as {
          clarity?: (cmd: string, ...args: unknown[]) => void;
          gtag?: (cmd: string, id: string, params: Record<string, unknown>) => void;
        };
        if (typeof w.clarity !== "function" || typeof w.gtag !== "function") return;
        // gtag('get') tiene firma variadic (4 args) — castear a relaxed type
        // para evitar TS2554 contra el tipo de window.gtag declarado en globals.
        const gtagAny = w.gtag as unknown as (...args: unknown[]) => void;
        gtagAny("get", GA_ID, "client_id", (cid: unknown) => {
          if (typeof cid === "string" && cid && w.clarity) {
            w.clarity("set", "ga_client_id", cid);
          }
        });
      } catch { /* gtag get aún no disponible: silencioso */ }
    };
    // Pequeño delay para asegurar que gtag y clarity hayan cargado.
    const tagTimer = window.setTimeout(sendClarityTag, 2000);

    // Si el usuario ya tenía un consent guardado, propagarlo a gtag al montar.
    const apply = (prefs: Prefs) => {
      if (typeof window.gtag !== "function") return;
      window.gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
      });
    };

    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) apply(JSON.parse(raw));
    } catch { /* localStorage bloqueado, no hacemos nada */ }

    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<Prefs>).detail;
      if (detail) apply(detail);
    };
    window.addEventListener("flame-consent-updated", onUpdate);
    return () => {
      window.removeEventListener("flame-consent-updated", onUpdate);
      window.clearTimeout(tagTimer);
    };
  }, []);

  return (
    <>
      {/* Defaults restrictivos ANTES de cargar gtag — consent denied por defecto */}
      <Script id="ga-consent-default" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('consent', 'default', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          wait_for_update: 500
        });
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { anonymize_ip: true });
        gtag('config', '${ADS_ID}');
      `}</Script>
    </>
  );
}
