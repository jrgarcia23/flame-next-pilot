// Sirve una imagen de Supabase Storage a través del endpoint de transformación
// (render/image) en vez del objeto crudo: redimensiona y entrega WebP al navegador.
// Las carátulas de casos son PNG de 1000px (~2 MB); en tarjeta a 600px WebP pesan ~55 KB.
// URLs que no sean de Supabase Storage (p.ej. /wp-content/…) se devuelven intactas.

export function coverUrl(src: string, width = 600, quality = 65): string {
  if (!src) return src;
  const marker = "/storage/v1/object/public/";
  const i = src.indexOf(marker);
  if (i === -1) return src;
  const rendered = src.slice(0, i) + "/storage/v1/render/image/public/" + src.slice(i + marker.length);
  const sep = rendered.includes("?") ? "&" : "?";
  // resize=contain conserva la proporción (sin él, el modo 'cover' por defecto deforma
  // p.ej. una carátula 1000x1000 a 600x1000 y la tarjeta la recorta).
  return `${rendered}${sep}width=${width}&quality=${quality}&resize=contain`;
}
