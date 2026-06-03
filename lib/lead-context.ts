// Helper para capturar UTMs, referrer, ga_client_id y demás contexto del lead.
// Llamar desde un Client Component justo antes de POSTear al endpoint.

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

  const utm_source   = get("utm_source");
  const utm_medium   = get("utm_medium");
  const utm_campaign = get("utm_campaign");
  const utm_term     = get("utm_term");
  const utm_content  = get("utm_content");
  const gclid        = get("gclid");
  const fbclid       = get("fbclid");
  const msclkid      = get("msclkid");

  let source = utm_source;
  let medium = utm_medium;
  const campaign = utm_campaign;
  if (!source) {
    if (gclid) { source = "google"; }
    else if (fbclid) { source = "facebook"; }
    else if (msclkid) { source = "bing"; }
    else if (referrer) {
      try {
        const r = new URL(referrer);
        const host = r.hostname.replace(/^www\./, "");
        source = host.split(".")[0] || "(direct)";
      } catch { source = "(direct)"; }
    } else {
      source = "(direct)";
    }
  }
  if (!medium) {
    if (gclid || fbclid || msclkid) medium = "cpc";
    else if (referrer) medium = "referral";
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
