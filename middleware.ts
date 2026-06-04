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

function pickLang(acceptLanguage: string | null): typeof SUPPORTED[number] {
  if (!acceptLanguage) return DEFAULT_LANG;

  // Accept-Language: "es-ES,es;q=0.9,en-US;q=0.8,en;q=0.7"
  const items = acceptLanguage
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart?.startsWith("q=") ? parseFloat(qPart.slice(2)) : 1;
      // "es-ES" → "es"
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

export function middleware(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  const lang = pickLang(acceptLanguage);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}/`;
  // 308: redirect permanente que preserva el método. Google lo trata como 301 para
  // canonicalización y consolida señales en /es/ o /en/. 307 era temporal y Google
  // mantenía indexando la raíz "/" sin idioma como URL separada.
  return NextResponse.redirect(url, 308);
}
