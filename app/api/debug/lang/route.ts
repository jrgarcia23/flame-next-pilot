import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Endpoint de diagnóstico de detección de idioma.
 * Muestra qué Accept-Language manda el navegador, qué país detecta Vercel
 * por IP y qué decisión tomaría el middleware con esos inputs.
 */
export function GET(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  const country = request.headers.get("x-vercel-ip-country");
  const city = request.headers.get("x-vercel-ip-city");
  const userAgent = request.headers.get("user-agent");

  // Replicamos la lógica del middleware
  const SUPPORTED = ["es", "en"] as const;
  const items = (acceptLanguage || "")
    .split(",")
    .map((part) => {
      const [lang, qPart] = part.trim().split(";");
      const q = qPart?.startsWith("q=") ? parseFloat(qPart.slice(2)) : 1;
      const base = (lang || "").toLowerCase().split("-")[0];
      return { raw: lang, lang: base, q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const browserPick =
    items.find((i) => (SUPPORTED as readonly string[]).includes(i.lang))?.lang || "es (default)";

  const hasSpanish = items.some((i) => i.lang === "es");
  const isInSpain = country === "ES";
  const finalDecision = isInSpain ? "es (geo: España)" : browserPick;

  return NextResponse.json({
    headers: {
      "accept-language": acceptLanguage,
      "x-vercel-ip-country": country,
      "x-vercel-ip-city": city ? decodeURIComponent(city) : null,
      "user-agent": userAgent,
    },
    parsed: items,
    browserPick,
    hasSpanish,
    isInSpain,
    finalDecision,
    explanation:
      "Lo que verá el middleware: " +
      (isInSpain
        ? "estás en España → /es/ (geo override)"
        : `Accept-Language elige '${browserPick}'`),
  });
}
