// Notifica a la Google Indexing API cuando se publica/actualiza contenido, para
// autoindexar al instante (sin esperar al rastreo del sitemap ni al cron diario).
//
// Requisitos:
//  - Env GOOGLE_INDEXING_SA = JSON de la service account (o su base64).
//    La SA debe ser OWNER de la propiedad flameanalytics.com en Search Console
//    (la misma que usa el cron diario de reindexación).
//  - Server-only (usa la private_key). Nunca importar desde componentes "use client".

import "server-only";
import crypto from "crypto";

type SA = { client_email: string; private_key: string };

function b64url(input: string): string {
  return Buffer.from(input).toString("base64url");
}

function loadServiceAccount(): SA | null {
  const raw = process.env.GOOGLE_INDEXING_SA;
  if (!raw) return null;
  try {
    const json = raw.trim().startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf8");
    const sa = JSON.parse(json) as Partial<SA>;
    if (!sa.client_email || !sa.private_key) return null;
    return { client_email: sa.client_email, private_key: sa.private_key };
  } catch {
    return null;
  }
}

async function getAccessToken(sa: SA): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const payload = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  const signature = signer.sign(sa.private_key, "base64url");
  const jwt = `${header}.${payload}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  if (!res.ok) {
    console.error("[indexing] token error", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as { access_token?: string };
  return data.access_token || null;
}

/**
 * Avisa a Google de que una URL se ha publicado o actualizado. No lanza nunca:
 * si algo falla, lo registra y devuelve false para no romper el guardado del post.
 */
export async function notifyGoogleIndexing(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<boolean> {
  const sa = loadServiceAccount();
  if (!sa) {
    console.warn("[indexing] GOOGLE_INDEXING_SA no configurada; se omite la autoindexación");
    return false;
  }
  try {
    const token = await getAccessToken(sa);
    if (!token) return false;
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ url, type }),
    });
    if (!res.ok) {
      console.error("[indexing] publish error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[indexing] error", e instanceof Error ? e.message : e);
    return false;
  }
}
