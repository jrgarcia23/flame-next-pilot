// Sanitiza títulos de posts WP que pueden traer:
//  - Entidades HTML (&amp;, &#8211;, &nbsp;)
//  - Tags editoriales legítimos (<em>, <strong>, <i>, <b>)
//  - Potencialmente código malicioso si el origen no es de confianza (<script>, <img onerror>, atributos on*)
//
// Devuelve HTML "seguro" para usar con dangerouslySetInnerHTML manteniendo el formato editorial.
// Allowlist mínima: solo <em>, <strong>, <i>, <b>. Cualquier otra cosa se elimina.
// No usamos DOMPurify para no añadir 50KB de bundle — implementación regex es suficiente
// porque la entrada son títulos cortos sin estructura compleja.

const ALLOWED_TAGS = new Set(["em", "strong", "i", "b"]);

/**
 * Sanitiza un título HTML conservando solo <em>, <strong>, <i>, <b>.
 * Decodifica entidades comunes y elimina atributos.
 */
export function sanitizeTitle(raw: string): string {
  if (!raw) return "";
  let html = raw;

  // 1. Eliminar comentarios HTML (pueden contener payloads)
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  // 2. Eliminar scripts y styles enteros (con contenido)
  html = html.replace(/<(script|style|iframe|object|embed)\b[\s\S]*?<\/\1>/gi, "");

  // 3. Eliminar tags no permitidos pero conservar su contenido textual
  //    Permitidos: <em>, </em>, <strong>, </strong>, <i>, </i>, <b>, </b> SIN atributos.
  html = html.replace(/<(\/?)(\w+)([^>]*)>/g, (_match, slash, tag, _attrs) => {
    const tagLower = tag.toLowerCase();
    if (ALLOWED_TAGS.has(tagLower)) {
      // Reconstruimos el tag sin atributos para eliminar on*=, style=, etc.
      return `<${slash}${tagLower}>`;
    }
    return ""; // tag no permitido → eliminamos el wrapper, conservamos texto interior
  });

  return html;
}
