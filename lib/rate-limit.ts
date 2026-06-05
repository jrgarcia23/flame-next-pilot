// Rate limiter en memoria simple para endpoints públicos de formularios.
// Limitación: en Vercel serverless cada lambda tiene su propio Map (no es global, no compartido
// entre instancias). Suficiente para frenar abuso obvio (1 IP enviando 100/min); no es DDoS shield.
//
// Para defensa más sólida: migrar a @upstash/ratelimit + Redis. Pendiente decisión JR sobre coste.

import { NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000; // GC simple: vaciamos el map si crece demasiado.

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetInSec: number;
};

/**
 * Comprueba y consume 1 ticket del bucket de la IP.
 * @param key Identificador (normalmente IP) sobre el que aplicar el límite.
 * @param limit Máximo de requests permitidas en la ventana.
 * @param windowSec Tamaño de la ventana en segundos.
 */
export function rateLimit(key: string, limit: number, windowSec: number): RateLimitResult {
  if (buckets.size > MAX_BUCKETS) buckets.clear();
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowSec * 1000;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetInSec: windowSec };
  }
  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  const resetInSec = Math.max(0, Math.ceil((existing.resetAt - now) / 1000));
  return { ok: existing.count <= limit, remaining, resetInSec };
}

/** Extrae IP del cliente desde headers de Vercel/proxies. */
export function getClientIpForRateLimit(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
