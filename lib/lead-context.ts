// Helper para capturar UTMs, referrer, ga_client_id y demás contexto del lead.
// Llamar desde un Client Component justo antes de POSTear al endpoint.
//
// IMPORTANTE: Hace fallback a lib/attribution.ts (localStorage) cuando la URL
// del submit no tiene gclid/utm_* — necesario porque la mayoría de leads de
// Ads aterrizan en una LP, navegan, y rellenan el form en otra página. Sin
// este fallback, todos los leads de Ads aparecen como "referral interno".

import { getStoredAttribution } from "./attribution";

export type LeadContext = {
  pagina: string;
  pageUrl: string;
  pagePath: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  source: string;
  medium: string;
  campaign: string;
  ga_client_id: string;
};

function readCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const m = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
  return m ? decodeURIComponent(m[1]) : "";
}

function readGaClientId(): string {
  // _ga cookie: "GA1.X.<client_id>.<timestamp>". Client_id = parte intermedia.
  const ga = readCookie("_ga");
  if (!ga) return "";
  const parts = ga.split(".");
  if (parts.length >= 4) return `${parts[2]}.${parts[3]}`;
  return ga;
}

export function getLeadContext(paginaOverride?: string): LeadContext {
  if (typeof window === "undefined") {
    return { pagina: paginaOverride || "", pageUrl: "", pagePath: "", referrer: "", utm_source: "", utm_medium: "", utm_campaign: "", utm_term: "", utm_content: "", gclid: "", fbclid: "", msclkid: "", source: "", medium: "", campaign: "", ga_client_id: "" };
  }
  const params = new URLSearchParams(window.location.search);
  const get = (k: string) => params.get(k) || "";
  const referrer = document.referrer || "";

  // Fallback al localStorage cuando URL no trae nada (lead llegó por Ads y
  // navegó antes de rellenar el form). Persistido por persistAttributionFromURL().
  const stored = getStoredAttribution();
  const fb = (urlVal: string, key: keyof NonNullable<typeof stored>) =>
    urlVal || (stored ? String(stored[key] || "") : "");

  const utm_source   = fb(get("utm_source"),   "utm_source");
  const utm_medium   = fb(get("utm_medium"),   "utm_medium");
  const utm_campaign = fb(get("utm_campaign"), "utm_campaign");
  const utm_term     = fb(get("utm_term"),     "utm_term");
  const utm_content  = fb(get("utm_content"),  "utm_content");
  const gclid        = fb(get("gclid"),        "gclid");
  const fbclid       = fb(get("fbclid"),       "fbclid");
  const msclkid      = fb(get("msclkid"),      "msclkid");

  let source = utm_source;
  let medium = utm_medium;
  const campaign = utm_campaign;
  // Detectar referrer interno (mismo host que la página actual) — no aporta info real.
  const ownHost = typeof window !== "undefined" ? window.location.hostname.replace(/^www\./, "") : "";
  let refHost = "";
  let refIsInternal = false;
  if (referrer) {
    try {
      const r = new URL(referrer);
      refHost = r.hostname.replace(/^www\./, "");
      refIsInternal = !!ownHost && refHost === ownHost;
    } catch { /* referrer malformado */ }
  }

  if (!source) {
    if (gclid) { source = "google"; }
    else if (fbclid) { source = "facebook"; }
    else if (msclkid) { source = "bing"; }
    else if (refHost && !refIsInternal) {
      // Para referrals externos guardamos el host completo (no solo "google" o "facebook"),
      // así distinguimos chatgpt.com, perplexity.ai, linkedin.com, etc.
      source = refHost;
    } else {
      // Referrer interno o sin referrer → desconocido / direct
      source = referrer ? "(unknown)" : "(direct)";
    }
  }
  if (!medium) {
    if (gclid || fbclid || msclkid) medium = "cpc";
    else if (refHost && !refIsInternal) medium = "referral";
    else if (refIsInternal) medium = "(unknown)";
    else medium = "(none)";
  }

  return {
    pagina: paginaOverride || window.location.pathname,
    pageUrl: window.location.href,
    pagePath: window.location.pathname,
    referrer,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    gclid, fbclid, msclkid,
    source, medium, campaign,
    ga_client_id: readGaClientId(),
  };
}
