// Sirve una imagen de Supabase Storage reducida a través del optimizador de imágenes
// de Next (/_next/image, en Vercel), que redimensiona y entrega WebP/AVIF al navegador.
// Las carátulas de casos son PNG de 1000px (~0,7-2 MB); en tarjeta a 640px pesan ~50 KB.
//
// 26-nov-2026: antes se usaba el endpoint render/image de Supabase, pero devuelve 403
// FeatureNotEnabled (la transformación no está activa en el proyecto) y las tarjetas de
// «Casos de éxito» salían en blanco. El host está permitido en next.config.ts
// (images.remotePatterns) y las calidades usadas, en images.qualities.
// URLs que no sean de Supabase Storage (p.ej. /wp-content/…) se devuelven intactas.

// Anchos que acepta el optimizador (deviceSizes por defecto de Next); otro ancho da 400.
const WIDTHS = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

export function coverUrl(src: string, width = 600, quality = 65): string {
  if (!src) return src;
  if (!src.includes("/storage/v1/object/public/")) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  // Con barra final: con trailingSlash:true, /_next/image sin ella responde 308 (un salto extra).
  return `/_next/image/?url=${encodeURIComponent(src)}&w=${w}&q=${quality}`;
}
