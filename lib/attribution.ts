// Persistencia de atribución (Ads/UTMs) entre navegaciones.
//
// Problema que resuelve: getLeadContext() solo lee de la URL actual del submit.
// Si el visitante aterriza con ?gclid=... y navega antes de rellenar el form,
// el lead se guarda SIN gclid → falsamente atribuido a "referral interno".
//
// Solución: al cargar cualquier página, si la URL trae parámetros de atribución
// los persistimos en localStorage. getLeadContext lee del URL y, si está vacío,
// hace fallback al localStorage.

const STORAGE_KEY = "flame_attribution";
const TTL_DAYS = 90; // ventana de atribución estándar Google Ads

export type StoredAttribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  fbclid: string;
  msclkid: string;
  first_landing_page: string;
  first_landing_referrer: string;
  saved_at: number; // epoch ms
};

const FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "msclkid"] as const;

function readUrlParams(): Partial<StoredAttribution> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Partial<StoredAttribution> = {};
  let hasAny = false;
  for (const f of FIELDS) {
    const v = params.get(f) || "";
    if (v) { out[f] = v; hasAny = true; }
  }
  if (!hasAny) return {};
  out.first_landing_page = window.location.pathname;
  out.first_landing_referrer = document.referrer || "";
  out.saved_at = Date.now();
  return out;
}

/**
 * Llamar al cargar cualquier página (componente client global, p.ej. en
 * GoogleAnalytics.tsx). Si la URL trae gclid/utm_*, lo persiste en localStorage.
 * No sobrescribe si ya hay datos no expirados (first-touch attribution).
 */
export function persistAttributionFromURL(): void {
  if (typeof window === "undefined") return;
  try {
    const fromUrl = readUrlParams();
    if (Object.keys(fromUrl).length === 0) return; // nada nuevo en URL

    const existing = getStoredAttribution();
    // Si ya hay atribución no expirada → respetamos first-touch (más valioso que last-touch).
    if (existing && existing.gclid) return;

    // Merge: lo que faltaba en URL hereda del existente.
    const merged: StoredAttribution = {
      utm_source: fromUrl.utm_source || existing?.utm_source || "",
      utm_medium: fromUrl.utm_medium || existing?.utm_medium || "",
      utm_campaign: fromUrl.utm_campaign || existing?.utm_campaign || "",
      utm_term: fromUrl.utm_term || existing?.utm_term || "",
      utm_content: fromUrl.utm_content || existing?.utm_content || "",
      gclid: fromUrl.gclid || existing?.gclid || "",
      fbclid: fromUrl.fbclid || existing?.fbclid || "",
      msclkid: fromUrl.msclkid || existing?.msclkid || "",
      first_landing_page: fromUrl.first_landing_page || existing?.first_landing_page || "",
      first_landing_referrer: fromUrl.first_landing_referrer || existing?.first_landing_referrer || "",
      saved_at: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch { /* localStorage bloqueado o JSON malformado: no podemos hacer nada */ }
}

/**
 * Lee la atribución persistida. Devuelve null si no hay o está expirada.
 */
export function getStoredAttribution(): StoredAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredAttribution;
    const ageMs = Date.now() - (data.saved_at || 0);
    if (ageMs > TTL_DAYS * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
