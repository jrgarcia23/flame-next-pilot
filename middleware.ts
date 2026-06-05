import { NextRequest, NextResponse } from "next/server";

// Matcher amplio: necesitamos ejecutar el middleware tanto en "/" (redirect raíz)
// como en /es/* y /en/* (inyectar header x-flame-lang que lee el root layout).
// Excluimos rutas internas de Next, API, archivos estáticos y embeds.
export const config = {
  matcher: [
    "/((?!_next/|api/|embeds/|wp-content/|fonts/|favicon|robots|sitemap|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|otf|mp4|webm|pdf|xml|txt|json)$).*)",
  ],
};

const SUPPORTED = ["es", "en"] as const;
type Lang = typeof SUPPORTED[number];
// Mercado principal Flame: España. Googlebot suele venir sin Accept-Language o con
// "en-US" (US datacenters): el fallback debe ser /es/ para no enviar el crawler
// principal al idioma secundario. Coincide con hreflang x-default = /es/.
const DEFAULT_LANG: Lang = "es";

function pickFromAcceptLanguage(acceptLanguage: string | null): Lang {
  if (!acceptLanguage) return DEFAULT_LANG;
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
    if ((SUPPORTED as readonly string[]).includes(lang)) return lang as Lang;
  }
  return DEFAULT_LANG;
}

function pickLang(request: NextRequest): Lang {
  const cookieLang = request.cookies.get("flame_lang")?.value;
  if (cookieLang === "es" || cookieLang === "en") return cookieLang;
  const country = request.headers.get("x-vercel-ip-country");
  if (country === "ES") return "es";
  return pickFromAcceptLanguage(request.headers.get("accept-language"));
}

function langFromPath(pathname: string): Lang | null {
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Raíz "/" → redirect al idioma adecuado (lógica previa, sin cambios)
  if (pathname === "/") {
    const lang = pickLang(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${lang}/`;
    const response = NextResponse.redirect(url, 307);
    response.headers.set("Cache-Control", "no-store, must-revalidate");
    response.headers.set("Vary", "Accept-Language, Cookie");
    return response;
  }

  // 2. Cualquier otra ruta /es/* o /en/* → pasa intacta pero con header
  //    x-flame-lang inyectado para que el root layout pueda setear <html lang>.
  const pathLang = langFromPath(pathname);
  if (pathLang) {
    const response = NextResponse.next();
    response.headers.set("x-flame-lang", pathLang);
    // Necesitamos que el header sobreviva al server component que lo lee:
    // Next replica request headers en el RequestStore, así que también lo
    // inyectamos en la request para que `headers()` lo vea.
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-flame-lang", pathLang);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}
