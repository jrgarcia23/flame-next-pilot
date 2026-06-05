import { NextRequest, NextResponse } from "next/server";

// Solo se ejecuta en la raíz "/" y "/index.html". El resto pasa intacto.
export const config = {
  matcher: ["/"],
};

const SUPPORTED = ["es", "en"] as const;
// Mercado principal Flame: España. Googlebot suele venir sin Accept-Language o con
// "en-US" (US datacenters): el fallback debe ser /es/ para no enviar el crawler
// principal al idioma secundario. Coincide con hreflang x-default = /es/.
const DEFAULT_LANG: typeof SUPPORTED[number] = "es";

function pickFromAcceptLanguage(acceptLanguage: string | null): typeof SUPPORTED[number] {
  if (!acceptLanguage) return DEFAULT_LANG;

  // Accept-Language: "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7"
  const items = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart?.startsWith("q=") ? parseFloat(qPart.slice(2)) : 1;
      const base = lang.toLowerCase().split("-")[0];
      return { lang: base, q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of items) {
    if ((SUPPORTED as readonly string[]).includes(lang)) {
      return lang as typeof SUPPORTED[number];
    }
  }
  return DEFAULT_LANG;
}

/**
 * Decide idioma con prioridad:
 *  1. Cookie de preferencia explícita (si el usuario eligió antes con el switcher).
 *  2. Geo IP España → /es/ (mercado principal: si estás en ES, ves ES aunque tu
 *     macOS esté en inglés y mande Accept-Language: en-US,en;q=0.9,es;q=0.8).
 *  3. Accept-Language del navegador (resto del mundo).
 *  4. DEFAULT_LANG = "es".
 */
function pickLang(request: NextRequest): typeof SUPPORTED[number] {
  // 1. Cookie de preferencia explícita
  const cookieLang = request.cookies.get("flame_lang")?.value;
  if (cookieLang === "es" || cookieLang === "en") return cookieLang;

  // 2. Geo IP — Vercel inyecta x-vercel-ip-country (ISO 3166-1 alpha-2)
  const country = request.headers.get("x-vercel-ip-country");
  if (country === "ES") return "es";

  // 3 + 4. Accept-Language o default
  return pickFromAcceptLanguage(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const lang = pickLang(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}/`;
  // 307 (temporal) en vez de 308 (permanente): el destino DEPENDE de
  // cookie + geo IP + Accept-Language, así que no podemos dejar que el
  // navegador cachee el redirect. Si el usuario cambia de idioma con el
  // switcher (cookie actualizada), el siguiente acceso a "/" debe reflejarlo.
  // 308 hacía que Chrome/Edge cachearan permanentemente el primer redirect.
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "no-store, must-revalidate");
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}
