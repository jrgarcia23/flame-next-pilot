import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { rateLimit, getClientIpForRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const FROM = process.env.LEAD_FROM_EMAIL || "Flame Analytics <onboarding@resend.dev>";
const NOTIFY = (process.env.LEAD_NOTIFY_EMAIL || "jrgarcia@flameanalytics.com").split(",").map((s) => s.trim()).filter(Boolean);

async function sendEmail(payload: { from: string; to: string[]; subject: string; html: string; replyTo?: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[events/register] RESEND_API_KEY missing, skipping email");
    return { error: "RESEND_API_KEY missing" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: payload.from, to: payload.to, subject: payload.subject, html: payload.html, reply_to: payload.replyTo }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: { status: res.status, ...data } };
    return { id: data?.id };
  } catch (err) {
    return { error: err };
  }
}

function escapeHtml(s: string) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const ip = getClientIpForRateLimit(req);
  const rl = rateLimit(`events:${ip}`, 5, 300);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }
  const body = await req.json().catch(() => ({}));
  const {
    nombre = "", email = "", empresa = "", cargo = "", sector = "", pais = "",
    mensaje = "", event_name = "", event_date,
    website,
    pagina = "events", pageUrl = "", pagePath = "", referrer = "",
    utm_source = "", utm_medium = "", utm_campaign = "", utm_term = "", utm_content = "",
    gclid = "", fbclid = "", msclkid = "",
    source = "", medium = "", campaign = "",
    ga_client_id = "",
  } = body as Record<string, string>;

  if (website) return NextResponse.json({ ok: true }); // honeypot
  if (!nombre || !empresa || !email || !event_name) return NextResponse.json({ error: "Campos obligatorios" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Email no válido" }, { status: 400 });
  if (nombre.length > 200 || empresa.length > 200) return NextResponse.json({ error: "Datos demasiado largos" }, { status: 400 });

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createSupabaseAdminClient();
      await supabase.from("event_registrations").insert({
        nombre, email, empresa, cargo, sector, pais, mensaje, event_name, event_date: event_date || null,
        pagina, page_url: pageUrl, page_path: pagePath, referrer,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        gclid, fbclid, msclkid, source, medium, campaign, ga_client_id,
      });
    } catch (err) {
      console.error("[events/register] supabase insert error", { message: err instanceof Error ? err.message : "unknown" });
    }
  }

  const when = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid", dateStyle: "long", timeStyle: "short" });
  const notifyHtml = `<!DOCTYPE html><html><body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#F6F7FB;padding:24px;color:#15163A">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #E1E5EE;padding:28px">
      <p style="font-size:11px;color:#31B1F8;text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin:0 0 6px">Nueva inscripción · Evento</p>
      <h1 style="font-size:22px;margin:0 0 18px">${escapeHtml(event_name)}</h1>
      <p style="font-size:13px;color:#6E7488;margin:0 0 24px">${escapeHtml(when)}</p>
      <p style="font-size:14px;line-height:1.6"><b>Nombre:</b> ${escapeHtml(nombre)}<br><b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br><b>Empresa:</b> ${escapeHtml(empresa)}<br><b>Cargo:</b> ${escapeHtml(cargo)}<br><b>Sector:</b> ${escapeHtml(sector)}</p>
      ${mensaje ? `<p style="font-size:14px;color:#4A4F66;line-height:1.6;margin-top:18px"><b>Mensaje:</b><br>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>` : ""}
    </div>
  </body></html>`;
  const autoReplyHtml = `<!DOCTYPE html><html><body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#F6F7FB;padding:24px;color:#15163A">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #E1E5EE;padding:28px">
      <h1 style="font-size:22px;margin:0 0 14px">Inscripción recibida ✅</h1>
      <p style="font-size:15px;line-height:1.6;color:#4A4F66">Hola ${escapeHtml((nombre.split(" ")[0]) || "")}, hemos recibido tu inscripción a <strong style="color:#15163A">${escapeHtml(event_name)}</strong>. Te confirmamos plaza en menos de 24 h laborables con los detalles logísticos.</p>
      <p style="font-size:14px;color:#4A4F66;line-height:1.6;margin-top:18px">Un saludo,<br><strong style="color:#15163A">El equipo de Flame Analytics</strong></p>
    </div>
  </body></html>`;

  try {
    await Promise.all([
      sendEmail({ from: FROM, to: NOTIFY, replyTo: email, subject: `Nueva inscripción · ${event_name}`, html: notifyHtml }),
      sendEmail({ from: FROM, to: [email], subject: `Inscripción recibida — ${event_name}`, html: autoReplyHtml }),
    ]);
  } catch (err) {
    console.error("[events/register] email batch threw", { message: err instanceof Error ? err.message : "unknown" });
  }

  return NextResponse.json({ ok: true });
}
