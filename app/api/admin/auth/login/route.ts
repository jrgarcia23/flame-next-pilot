import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/supabase-admin";
import { checkLockout, recordAttempt, verifyCaptcha, makeSupabaseAuthClient, getClientIp } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

async function jitter(min = 300, max = 600) {
  const ms = min + Math.floor(Math.random() * (max - min));
  await new Promise((r) => setTimeout(r, ms));
}

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string; captcha?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  const captchaAnswer = (body.captcha || "").trim();
  const ip = getClientIp(request);

  if (!email || !password || !captchaAnswer) {
    await jitter();
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  if (email.length > 200 || password.length > 200 || captchaAnswer.length > 8) {
    await jitter();
    return NextResponse.json({ error: "Datos demasiado largos" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await jitter();
    return NextResponse.json({ error: "Email no válido" }, { status: 400 });
  }

  const captchaToken = request.cookies.get("fl_captcha")?.value;
  const captchaOk = await verifyCaptcha(captchaToken, captchaAnswer);
  if (!captchaOk) {
    await jitter();
    return NextResponse.json({ error: "Verificación incorrecta. Refresca el código y prueba de nuevo." }, { status: 400 });
  }

  const lockout = await checkLockout(email, ip);
  if (lockout.locked) {
    await jitter();
    return NextResponse.json(
      { error: "Demasiados intentos. Cuenta bloqueada temporalmente.", locked: true, retryInSec: lockout.retryInSec },
      { status: 429 }
    );
  }

  if (!isEmailAllowed(email)) {
    await recordAttempt(email, ip, false);
    await jitter();
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  const supabase = makeSupabaseAuthClient(request, response);

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data?.user) {
    await recordAttempt(email, ip, false);
    await jitter();
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  if (!isEmailAllowed(data.user.email || "")) {
    await supabase.auth.signOut();
    await recordAttempt(email, ip, false);
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  await recordAttempt(email, ip, true);
  response.cookies.set("fl_captcha", "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
