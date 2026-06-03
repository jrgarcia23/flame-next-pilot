// Helpers de auth para /admin: HMAC captcha + rate-limit por email/ip + Supabase Auth client.

import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

const enc = new TextEncoder();

function getSecret(): string {
  const s = process.env.ADMIN_CAPTCHA_SECRET;
  if (!s || s.length < 24) {
    throw new Error("ADMIN_CAPTCHA_SECRET no configurada o demasiado corta (>=24 chars).");
  }
  return s;
}

async function hmac(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(getSecret()), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return Buffer.from(sig).toString("base64url");
}

/** Genera operación aritmética a/b ∈ [1,9] y devuelve enunciado + token firmado. */
export async function makeCaptcha(): Promise<{ question: string; token: string }> {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const op = Math.random() < 0.5 ? "+" : "-";
  const [x, y] = op === "-" && b > a ? [b, a] : [a, b];
  const answer = op === "+" ? x + y : x - y;
  const exp = Date.now() + 5 * 60 * 1000; // 5 min
  const payload = `${answer}.${exp}`;
  const sig = await hmac(payload);
  return { question: `${x} ${op} ${y}`, token: `${payload}.${sig}` };
}

/** Valida respuesta vs cookie firmado, no caducado. */
export async function verifyCaptcha(token: string | undefined, userAnswer: string): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [ansStr, expStr, sig] = parts;
  const payload = `${ansStr}.${expStr}`;
  const expected = await hmac(payload);
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return false;
  const exp = parseInt(expStr, 10);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return (userAnswer || "").trim() === ansStr;
}

const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;
const LOCKOUT_MAX_FAILURES = 5;

export async function checkLockout(email: string, ip: string): Promise<{ locked: boolean; retryInSec: number; failuresInWindow: number }> {
  const supabase = createSupabaseAdminClient();
  const since = new Date(Date.now() - LOCKOUT_WINDOW_MS).toISOString();
  const { data, error } = await supabase
    .from("admin_auth_attempts")
    .select("attempted_at,success")
    .or(`email.eq.${email},ip.eq.${ip}`)
    .gte("attempted_at", since)
    .order("attempted_at", { ascending: false })
    .limit(20);
  if (error) {
    console.error("checkLockout error:", error.message);
    return { locked: false, retryInSec: 0, failuresInWindow: 0 };
  }
  let failures = 0;
  for (const row of data || []) {
    if ((row as { success: boolean }).success) break;
    failures++;
  }
  if (failures >= LOCKOUT_MAX_FAILURES) {
    const oldest = (data || [])[failures - 1] as { attempted_at: string } | undefined;
    const oldestTime = oldest ? new Date(oldest.attempted_at).getTime() : Date.now();
    const unlockAt = oldestTime + LOCKOUT_WINDOW_MS;
    const retryInSec = Math.max(0, Math.ceil((unlockAt - Date.now()) / 1000));
    return { locked: true, retryInSec, failuresInWindow: failures };
  }
  return { locked: false, retryInSec: 0, failuresInWindow: failures };
}

export async function recordAttempt(email: string, ip: string, success: boolean): Promise<void> {
  const supabase = createSupabaseAdminClient();
  await supabase.from("admin_auth_attempts").insert({ email: email.toLowerCase(), ip, success });
}

export function makeSupabaseAuthClient(request: NextRequest, response: NextResponse) {
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
}

export function getClientIp(request: NextRequest): string {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
