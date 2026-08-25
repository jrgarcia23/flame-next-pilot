import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { rateLimit, getClientIpForRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// Descarga de "ficha de solución" (lead magnet). Guarda el lead en la MISMA tabla
// `leads` que el form de contacto (source="ficha") y avisa a JR por email (Resend).
// El PDF ya lo sirve el cliente; aquí solo persistimos el contacto + notificamos.

const FROM = process.env.LEAD_FROM_EMAIL || "Flame Analytics <onboarding@resend.dev>";
const NOTIFY = (process.env.LEAD_NOTIFY_EMAIL || "jrgarcia@flameanalytics.com")
  .split(",").map((s) => s.trim()).filter(Boolean);
const SITE_URL = "https://www.flameanalytics.com";

function escapeHtml(s: string) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function sendEmail(payload: { to: string[]; subject: string; html: string; replyTo?: string; headers?: Record<string, string> }) {
  if (!process.env.RESEND_API_KEY) return { error: "RESEND_API_KEY missing" };
  try {
    const body: Record<string, unknown> = { from: FROM, to: payload.to, subject: payload.subject, html: payload.html };
    if (payload.replyTo) body.reply_to = payload.replyTo;
    if (payload.headers) body.headers = payload.headers;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return res.ok ? { id: data?.id } : { error: { status: res.status } };
  } catch (err) {
    return { error: err };
  }
}

export async function POST(req: NextRequest) {
  // Rate limit: 6 descargas / 5 min por IP.
  const ip = getClientIpForRateLimit(req);
  const rl = rateLimit(`ficha:${ip}`, 6, 300);
  if (!rl.ok) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Inténtalo en unos minutos." }, { status: 429, headers: { "Retry-After": String(rl.resetInSec) } });
  }

  const body = (await req.json().catch(() => ({}))) as Record<string, string>;
  const {
    nombre = "", email = "", solucion = "", pdf = "", website,
    pageUrl = "", pagePath = "", referrer = "",
    utm_source = "", utm_medium = "", utm_campaign = "", utm_term = "", utm_content = "",
    gclid = "", fbclid = "", msclkid = "",
    source = "", medium = "", campaign = "", ga_client_id = "",
  } = body;

  // Honeypot
  if (website) return NextResponse.json({ ok: true });

  if (!nombre || !email) {
    return NextResponse.json({ error: "Campos obligatorios" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email no válido" }, { status: 400 });
  }
  if (nombre.length > 200 || email.length > 200 || solucion.length > 200) {
    return NextResponse.json({ error: "Datos demasiado largos" }, { status: 400 });
  }

  const pagina = solucion ? `Ficha: ${solucion}` : "Ficha de solución";

  // Persist en Supabase — MISMA tabla `leads` que el form de contacto (source="ficha")
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createSupabaseAdminClient();
      const { error: dbError } = await supabase.from("leads").insert({
        nombre, empresa: "", email, sector: "", telefono: "", pais: "",
        mensaje: `Descarga de ficha de solución${solucion ? `: ${solucion}` : ""}`,
        pagina,
        page_url: pageUrl, page_path: pagePath, referrer,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        gclid, fbclid, msclkid,
        source: source || "ficha", medium: medium || "download", campaign,
        ga_client_id,
      });
      if (dbError) console.error("[ficha] supabase insert error", { code: dbError.code, message: dbError.message });
    } catch (err) {
      console.error("[ficha] supabase exception", { message: err instanceof Error ? err.message : "unknown" });
    }
  }

  // Aviso a JR (Resend) — no bloquea la respuesta más de lo necesario (await para no perderlo en serverless)
  const when = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid", dateStyle: "long", timeStyle: "short" });
  const pdfUrl = pdf && pdf.startsWith("/") ? `${SITE_URL}${pdf}` : pdf;
  const notifyHtml = `<!DOCTYPE html><html lang="es"><body style="margin:0;padding:28px 16px;background:#F6F7FB;font-family:'Helvetica Neue',Arial,sans-serif">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #E1E5EE;overflow:hidden">
      <tr><td style="padding:28px 32px">
        <p style="margin:0 0 6px;font-size:11px;color:#31B1F8;text-transform:uppercase;letter-spacing:.12em;font-weight:700">Descarga de ficha</p>
        <h1 style="margin:0 0 4px;font-size:22px;color:#15163A;font-weight:600">${escapeHtml(solucion || "Ficha de solución")}</h1>
        <p style="margin:0 0 20px;font-size:13px;color:#6E7488">${escapeHtml(when)}</p>
        <p style="margin:0 0 8px;font-size:14px;color:#15163A"><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
        <p style="margin:0 0 8px;font-size:14px;color:#15163A"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}" style="color:#1E89C7">${escapeHtml(email)}</a></p>
        ${pageUrl ? `<p style="margin:0 0 8px;font-size:12px;color:#6E7488"><strong>Origen:</strong> ${escapeHtml(pageUrl)}</p>` : ""}
        <p style="margin:16px 0 0;font-size:12px;color:#6E7488">Guardado en Supabase (leads · source=ficha).</p>
      </td></tr>
    </table></body></html>`;

  const autoHtml = `<!DOCTYPE html><html lang="es"><body style="margin:0;padding:28px 16px;background:#F6F7FB;font-family:'Helvetica Neue',Arial,sans-serif">
    <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #E1E5EE;overflow:hidden">
      <tr><td style="padding:32px">
        <h1 style="margin:0 0 14px;font-size:22px;color:#15163A;font-weight:600">Aquí tienes tu ficha ✅</h1>
        <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#4A4F66">Gracias por tu interés en <strong>${escapeHtml(solucion || "Flame")}</strong>. Puedes descargar la ficha en PDF desde este enlace:</p>
        ${pdfUrl ? `<p style="margin:0 0 22px"><a href="${escapeHtml(pdfUrl)}" style="display:inline-block;padding:13px 24px;background:#31B1F8;color:#fff;font-size:15px;font-weight:700;border-radius:8px;text-decoration:none">Descargar ficha (PDF)</a></p>` : ""}
        <p style="margin:0;font-size:14px;color:#4A4F66;line-height:1.6">Si quieres verlo aplicado a tu caso, respóndenos a este email y agendamos una demo de 20 minutos.</p>
      </td></tr>
    </table></body></html>`;

  try {
    await Promise.all([
      sendEmail({ to: NOTIFY, replyTo: email, subject: `Descarga de ficha — ${solucion || "solución"}`, html: notifyHtml }),
      sendEmail({ to: [email], subject: `Tu ficha de ${solucion || "solución"} — Flame Analytics`, html: autoHtml, headers: { "Auto-Submitted": "auto-replied" } }),
    ]);
  } catch (err) {
    console.error("[ficha] send batch threw", { message: err instanceof Error ? err.message : "unknown" });
  }

  return NextResponse.json({ ok: true });
}
