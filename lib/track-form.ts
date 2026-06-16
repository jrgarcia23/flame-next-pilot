// Tracking de submits de formularios → GA4 (event `generate_lead`).
//
// La conversion action de Google Ads "Flame - GA4 (web) generate_lead" (ENABLED)
// importa automáticamente este event y lo cuenta como conversión. Para reporting
// separado por tipo de form o por LP, GA4 puede filtrar por los parámetros
// `form_type` y `page_path` que pasamos abajo.
//
// Llamar en éxito del submit, ANTES del redirect a la página de gracias.

export type FormType = "demo" | "contact" | "partners" | "event" | "webinar";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackFormSubmit(formType: FormType, lang: "es" | "en" = "es"): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "generate_lead", {
      form_type: formType,
      page_path: window.location.pathname,
      page_location: window.location.href,
      lang,
      value: 1,
      currency: "EUR",
    });
  } catch {
    /* no-op — nunca bloquear el redirect a /gracias-X/ por un fallo de tracking */
  }
}
