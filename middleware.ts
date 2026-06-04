import { NextRequest, NextResponse } from "next/server";

// Solo se ejecuta en la raíz "/" y "/index.html". El resto pasa intacto.
export const config = {
  matcher: ["/"],
};

const SUPPORTED = ["es", "en"] as const;
const DEFAULT_LANG: typeof SUPPORTED[number] = "en"; // fallback cuando no hay match

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
  return NextResponse.redirect(url, 307); // 307 (no cacheable por Google como permanente)
}
