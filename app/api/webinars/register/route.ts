import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { rateLimit, getClientIpForRateLimit } from "@/lib/rate-limit";
import { getWebinarAcConfig, syncWebinarRegistration, isAutomationActive } from "@/lib/activecampaign";

export const dynamic = "force-dynamic";

const FROM = process.env.LEAD_FROM_EMAIL || "Flame Analytics <onboarding@resend.dev>";
const NOTIFY = (process.env.LEAD_NOTIFY_EMAIL || "jrgarcia@flameanalytics.com").split(",").map((s) => s.trim()).filter(Boolean);

async function sendEmail(payload: { from: string; to: string[]; subject: string; html: string; replyTo?: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[webinars/register] RESEND_API_KEY missing, skipping email");
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
  const rl = rateLimit(`webinars:${ip}`, 5, 300);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }
  const body = await req.json().catch(() => ({}));
  const {
    nombre = "", email = "", empresa = "", cargo = "", sector = "", pais = "",
    mensaje = "", webinar_name = "", webinar_date,
    website,
    pagina = "events", pageUrl = "", pagePath = "", referrer = "",
    utm_source = "", utm_medium = "", utm_campaign = "", utm_term = "", utm_content = "",
    gclid = "", fbclid = "", msclkid = "",
    source = "", medium = "", campaign = "",
    ga_client_id = "",
  } = body as Record<string, string>;

  if (website) { console.warn("[webinars/register] honeypot activado (campo 'website' relleno; posible autofill del navegador) — email:", email); return NextResponse.json({ ok: true }); } // honeypot
  if (!nombre || !empresa || !email || !webinar_name) return NextResponse.json({ error: "Campos obligatorios" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Email no válido" }, { status: 400 });
  if (nombre.length > 200 || empresa.length > 200) return NextResponse.json({ error: "Datos demasiado largos" }, { status: 400 });

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createSupabaseAdminClient();
      const { error: insErr } = await supabase.from("webinar_registrations").insert({
        nombre, email, empresa, cargo, sector, pais, mensaje, webinar_name, webinar_date: webinar_date || null,
        pagina, page_url: pageUrl, page_path: pagePath, referrer,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        gclid, fbclid, msclkid, source, medium, campaign, ga_client_id,
      });
      // supabase-js NO lanza excepción en error de insert: hay que revisar .error o el lead se pierde en silencio.
      if (insErr) console.error("[webinars/register] supabase insert FAILED:", insErr.message, "| email:", email, "| webinar:", webinar_name);
    } catch (err) {
      console.error("[webinars/register] supabase insert error", { message: err instanceof Error ? err.message : "unknown" });
    }
  }

  // Webinars gestionados en ActiveCampaign: la etiqueta dispara el flujo de inscritos, que envía la confirmación.
  const acCfg = getWebinarAcConfig(webinar_name);
  let acOk = false;
  let acFlowActive = false;
  if (acCfg) {
    try {
      acOk = await syncWebinarRegistration(acCfg, { email, nombre });
    } catch (err) {
      console.error("[webinars/register] ActiveCampaign sync FAILED", { message: err instanceof Error ? err.message : "unknown", webinar: webinar_name });
    }
    if (acOk) acFlowActive = await isAutomationActive(acCfg.automationId);
  }

  const when = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid", dateStyle: "long", timeStyle: "short" });
  const notifyHtml = `<!DOCTYPE html><html><body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#F6F7FB;padding:24px;color:#15163A">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #E1E5EE;padding:28px">
      <p style="font-size:11px;color:#31B1F8;text-transform:uppercase;letter-spacing:0.12em;font-weight:700;margin:0 0 6px">Nueva inscripción · Webinar</p>
      <h1 style="font-size:22px;margin:0 0 18px">${escapeHtml(webinar_name)}</h1>
      <p style="font-size:13px;color:#6E7488;margin:0 0 24px">${escapeHtml(when)}</p>
      <p style="font-size:14px;line-height:1.6"><b>Nombre:</b> ${escapeHtml(nombre)}<br><b>Email:</b> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br><b>Empresa:</b> ${escapeHtml(empresa)}<br><b>Cargo:</b> ${escapeHtml(cargo)}<br><b>Sector:</b> ${escapeHtml(sector)}</p>
      ${mensaje ? `<p style="font-size:14px;color:#4A4F66;line-height:1.6;margin-top:18px"><b>Mensaje:</b><br>${escapeHtml(mensaje).replace(/\n/g, "<br>")}</p>` : ""}
    </div>
  </body></html>`;
  const autoReplyHtml = `<!DOCTYPE html><html><body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#F6F7FB;padding:24px;color:#15163A">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #E1E5EE;padding:28px">
      <h1 style="font-size:22px;margin:0 0 14px">Inscripción recibida ✅</h1>
      <p style="font-size:15px;line-height:1.6;color:#4A4F66">Hola ${escapeHtml((nombre.split(" ")[0]) || "")}, hemos recibido tu inscripción al webinar <strong style="color:#15163A">${escapeHtml(webinar_name)}</strong>. Te confirmamos plaza en menos de 24 h laborables con los detalles logísticos.</p>
      <p style="font-size:14px;color:#4A4F66;line-height:1.6;margin-top:18px">Un saludo,<br><strong style="color:#15163A">El equipo de Flame Analytics</strong></p>
    </div>
  </body></html>`;

  const autoReplyEnHtml = `<!DOCTYPE html><html><body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#F6F7FB;padding:24px;color:#15163A">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;border:1px solid #E1E5EE;padding:28px">
      <h1 style="font-size:22px;margin:0 0 14px">Registration received ✅</h1>
      <p style="font-size:15px;line-height:1.6;color:#4A4F66">Hi ${escapeHtml((nombre.split(" ")[0]) || "")}, we have received your registration for the webinar <strong style="color:#15163A">${escapeHtml(webinar_name)}</strong>. ${acCfg?.when ? ` It takes place on <strong style="color:#15163A">${escapeHtml(acCfg.when)}</strong>.` : ""}${acCfg?.joinLinks?.length ? " You can join live from either link:" : " We will email you the access links shortly."}</p>
      ${(acCfg?.joinLinks || []).map((l) => `<p style="font-size:15px;margin:8px 0"><a href="${escapeHtml(l.url)}" style="color:#1F8FD6;font-weight:600">${escapeHtml(l.label)}</a></p>`).join("")}
      <p style="font-size:14px;color:#4A4F66;line-height:1.6;margin-top:18px">Best regards,<br><strong style="color:#15163A">The Flame Analytics team</strong></p>
    </div>
  </body></html>`;

  const mails = [sendEmail({ from: FROM, to: NOTIFY, replyTo: email, subject: `Nueva al webinar · ${webinar_name}${acCfg && !acOk ? " · ⚠️ NO entró en ActiveCampaign" : ""}`, html: notifyHtml })];
  // Si AC ha dado de alta al inscrito y el flujo de inscritos está activo, la confirmación la envía AC;
  // si no, auto-reply de respaldo en el idioma del webinar.
  if (!(acOk && acFlowActive)) {
    mails.push(acCfg?.lang === "en"
      ? sendEmail({ from: FROM, to: [email], subject: `Registration received: ${webinar_name}`, html: autoReplyEnHtml })
      : sendEmail({ from: FROM, to: [email], subject: `Inscripción recibida — ${webinar_name}`, html: autoReplyHtml }));
  }

  try {
    await Promise.all(mails);
  } catch (err) {
    console.error("[webinars/register] email batch threw", { message: err instanceof Error ? err.message : "unknown" });
  }

  return NextResponse.json({ ok: true });
}
