import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { rateLimit, getClientIpForRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const FROM = process.env.LEAD_FROM_EMAIL || "Flame Analytics <onboarding@resend.dev>";
const NOTIFY = (process.env.LEAD_NOTIFY_EMAIL || "jrgarcia@flameanalytics.com")
  .split(",").map((s) => s.trim()).filter(Boolean);

const SITE_URL = "https://www.flameanalytics.com";
const LOGO_URL = `${SITE_URL}/wp-content/uploads/2023/10/flame-logo-black.png`;
const BRAND = {
  accent: "#31B1F8",
  accentDeep: "#1E89C7",
  navy: "#15163A",
  orange: "#FE5000",
  heading: "#15163A",
  body: "#4A4F66",
  muted: "#6E7488",
  warm: "#F6F7FB",
  border: "#E1E5EE",
};

function escapeHtml(s: string) {
  return (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function sendEmail(payload: { from: string; to: string[]; subject: string; html: string; replyTo?: string; headers?: Record<string, string> }): Promise<{ id?: string; error?: unknown }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[contact] RESEND_API_KEY no configurada, salto envío email");
    return { error: "RESEND_API_KEY missing" };
  }
  try {
    const body: Record<string, unknown> = { from: payload.from, to: payload.to, subject: payload.subject, html: payload.html };
    if (payload.replyTo) body.reply_to = payload.replyTo;
    if (payload.headers) body.headers = payload.headers;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { error: { status: res.status, ...data } };
    return { id: data?.id };
  } catch (err) {
    return { error: err };
  }
}

function emailHeader() {
  return `
    <tr><td style="padding:28px 32px 20px;background:#fff;border-bottom:1px solid ${BRAND.border}">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="vertical-align:middle">
          <img src="${LOGO_URL}" alt="Flame Analytics" height="28" style="display:block;border:0;outline:none;text-decoration:none" />
        </td>
      </tr></table>
    </td></tr>`;
}
function emailFooter() {
  return `
    <tr><td style="padding:24px 32px;background:${BRAND.warm};border-top:1px solid ${BRAND.border};text-align:center">
      <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:${BRAND.muted};line-height:1.6">
        © ${new Date().getFullYear()} Flame Analytics —
        <a href="${SITE_URL}" style="color:${BRAND.accentDeep};text-decoration:none">flameanalytics.com</a>
      </p>
    </td></tr>`;
}
function row(label: string, value: string, isMono = false) {
  if (!value) return "";
  const valueStyle = isMono
    ? `font-family:'SF Mono',Consolas,Menlo,monospace;font-size:12px;color:${BRAND.heading};word-break:break-all`
    : `font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;color:${BRAND.heading}`;
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};vertical-align:top;width:140px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.06em;font-weight:600">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};${valueStyle}">${value}</td>
  </tr>`;
}
function sectionHeader(title: string, color: string) {
  return `<tr><td colspan="2" style="padding:24px 0 12px">
    <p style="margin:0;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:${color};text-transform:uppercase;letter-spacing:0.1em;font-weight:700">${escapeHtml(title)}</p>
  </td></tr>`;
}

function notificationHtml(p: Record<string, string>, when: string) {
  const subject = `Nuevo lead Flame — ${p.empresa}${p.sector ? " · " + p.sector : ""}`;
  return { subject, html: `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:32px 16px;background:${BRAND.warm};font-family:'Helvetica Neue',Arial,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid ${BRAND.border};box-shadow:0 8px 24px rgba(0,0,0,0.04)">
    ${emailHeader()}
    <tr><td style="padding:32px">
      <p style="margin:0 0 6px;font-size:11px;color:${BRAND.accent};text-transform:uppercase;letter-spacing:0.12em;font-weight:700">Nuevo lead</p>
      <h1 style="margin:0 0 6px;font-size:24px;line-height:1.25;letter-spacing:-0.02em;color:${BRAND.heading};font-weight:600">${escapeHtml(p.empresa)}</h1>
      <p style="margin:0 0 24px;font-size:13px;color:${BRAND.muted}">${escapeHtml(when)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        ${sectionHeader("Datos del contacto", BRAND.accent)}
        ${row("Nombre", escapeHtml(p.nombre))}
        ${row("Email", `<a href="mailto:${escapeHtml(p.email)}" style="color:${BRAND.accentDeep};text-decoration:none">${escapeHtml(p.email)}</a>`)}
        ${row("Empresa", escapeHtml(p.empresa))}
        ${row("Sector", escapeHtml(p.sector))}
        ${row("País", escapeHtml(p.pais))}
        ${row("Teléfono", escapeHtml(p.telefono))}
        ${p.mensaje ? row("Mensaje", escapeHtml(p.mensaje).replace(/\n/g, "<br/>")) : ""}
        ${sectionHeader("Origen del lead", BRAND.orange)}
        ${row("Página", escapeHtml(p.pagina))}
        ${p.pageUrl ? row("URL", `<a href="${escapeHtml(p.pageUrl)}" style="color:${BRAND.accentDeep};text-decoration:none;font-size:12px;word-break:break-all">${escapeHtml(p.pageUrl)}</a>`) : ""}
        ${row("Fuente", escapeHtml(p.source))}
        ${row("Medio", escapeHtml(p.medium))}
        ${p.campaign && p.campaign !== "(not set)" ? row("Campaña", escapeHtml(p.campaign)) : ""}
        ${p.utm_term ? row("Término", escapeHtml(p.utm_term)) : ""}
        ${p.utm_content ? row("Contenido", escapeHtml(p.utm_content)) : ""}
        ${p.referrer ? row("Referrer", `<span style="font-size:12px;word-break:break-all">${escapeHtml(p.referrer)}</span>`) : ""}
        ${p.gclid ? row("GCLID (Google Ads)", escapeHtml(p.gclid), true) : ""}
        ${p.fbclid ? row("FBCLID (Meta Ads)", escapeHtml(p.fbclid), true) : ""}
        ${p.msclkid ? row("MSCLKID (Bing Ads)", escapeHtml(p.msclkid), true) : ""}
        ${p.ga_client_id ? row("GA4 Client ID", escapeHtml(p.ga_client_id), true) : ""}
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px"><tr><td>
        <a href="mailto:${escapeHtml(p.email)}?subject=Re%3A%20Tu%20solicitud%20en%20Flame%20Analytics" style="display:inline-block;padding:13px 24px;background:${BRAND.accent};color:#fff;font-size:14px;font-weight:700;border-radius:8px;text-decoration:none">Responder al lead →</a>
      </td></tr></table>
    </td></tr>
    ${emailFooter()}
  </table>
</body></html>` };
}

function autoReplyHtml(p: Record<string, string>) {
  const subject = "Hemos recibido tu solicitud — Flame Analytics";
  const firstName = (p.nombre || "").split(" ")[0] || "";
  return { subject, html: `<!DOCTYPE html>
<html lang="es"><head><meta charset="UTF-8"/><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:32px 16px;background:${BRAND.warm};font-family:'Helvetica Neue',Arial,sans-serif">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid ${BRAND.border};box-shadow:0 8px 24px rgba(0,0,0,0.04)">
    ${emailHeader()}
    <tr><td style="padding:36px 32px">
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;letter-spacing:-0.02em;color:${BRAND.heading};font-weight:600">Hola ${escapeHtml(firstName)}, hemos recibido tu solicitud ✅</h1>
      <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${BRAND.body}">Gracias por contactar con Flame Analytics. Un especialista revisará tu caso y se pondrá en contacto contigo en <strong style="color:${BRAND.heading}">menos de 24 horas laborables</strong> para agendar una demo de 20 minutos.</p>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:${BRAND.body}">Te atenderá alguien del equipo que conoce el producto y los casos reales — no un comercial.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0"><tr>
        <td style="padding:18px 20px;background:${BRAND.warm};border-radius:10px;border-left:3px solid ${BRAND.accent}">
          <p style="margin:0 0 4px;font-size:11px;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.08em;font-weight:600">Mientras tanto</p>
          <p style="margin:0;font-size:14px;color:${BRAND.body};line-height:1.6">Puedes explorar <a href="${SITE_URL}/es/hypersensor/" style="color:${BRAND.accentDeep};text-decoration:none;font-weight:500">Hypersensor</a>, ver <a href="${SITE_URL}/es/sobre-nosotros/" style="color:${BRAND.accentDeep};text-decoration:none;font-weight:500">quiénes somos</a> o leer el <a href="${SITE_URL}/es/blog/" style="color:${BRAND.accentDeep};text-decoration:none;font-weight:500">blog</a>.</p>
        </td>
      </tr></table>
      <p style="margin:0;font-size:14px;color:${BRAND.body};line-height:1.65">Un saludo,<br/><strong style="color:${BRAND.heading}">El equipo de Flame Analytics</strong></p>
    </td></tr>
    ${emailFooter()}
  </table>
</body></html>` };
}

export async function POST(req: NextRequest) {
  // Rate limit: 8 envíos / 5 min por IP. Usuario legítimo manda 1 form, atacante saturando se corta.
  const ip = getClientIpForRateLimit(req);
  const rl = rateLimit(`contact:${ip}`, 8, 300);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Inténtalo en unos minutos." },
      { status: 429, headers: { "Retry-After": String(rl.resetInSec) } }
    );
  }

  const body = await req.json().catch(() => ({}));
  const {
    nombre = "", empresa = "", email = "",
    sector = "", mensaje = "", telefono = "", pais = "",
    pagina = "home", website,
    pageUrl = "", pagePath = "", referrer = "",
    utm_source = "", utm_medium = "", utm_campaign = "", utm_term = "", utm_content = "",
    gclid = "", fbclid = "", msclkid = "",
    source = "", medium = "", campaign = "",
    ga_client_id = "",
  } = body as Record<string, string>;

  // Honeypot
  if (website) return NextResponse.json({ ok: true });

  if (!nombre || !empresa || !email) {
    return NextResponse.json({ error: "Campos obligatorios" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email no válido" }, { status: 400 });
  }
  if (nombre.length > 200 || empresa.length > 200 || (mensaje && mensaje.length > 4000)) {
    return NextResponse.json({ error: "Datos demasiado largos" }, { status: 400 });
  }

  // Persist en Supabase (si está configurado)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const supabase = createSupabaseAdminClient();
      const { error: dbError } = await supabase.from("leads").insert({
        nombre, empresa, email, sector, telefono, pais, mensaje, pagina,
        page_url: pageUrl, page_path: pagePath, referrer,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content,
        gclid, fbclid, msclkid,
        source, medium, campaign,
        ga_client_id,
      });
      // Log sanitizado: solo código + mensaje, sin objeto completo (no leakea registros PII a Vercel logs)
      if (dbError) console.error("[contact] supabase insert error", { code: dbError.code, message: dbError.message });
    } catch (err) {
      console.error("[contact] supabase exception", { message: err instanceof Error ? err.message : "unknown" });
    }
  }

  const when = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid", dateStyle: "long", timeStyle: "short" });
  const data: Record<string, string> = {
    nombre, empresa, email, sector, telefono, pais, mensaje, pagina,
    pageUrl, pagePath, referrer,
    utm_source, utm_medium, utm_campaign, utm_term, utm_content,
    gclid, fbclid, msclkid,
    source: source || "(unknown)", medium: medium || "(unknown)", campaign: campaign || "(not set)",
    ga_client_id,
  };

  const notify = notificationHtml(data, when);
  const autoReply = autoReplyHtml(data);

  // CRÍTICO: await Promise.all. En Vercel serverless las promesas tras return
  // se abortan al cerrar el container. Caso documentado: 2 leads Hoteles Estelar
  // perdidos en Neodoc, fix d164faa 1-jun.
  try {
    const [notifyRes, autoRes] = await Promise.all([
      sendEmail({ from: FROM, to: NOTIFY, replyTo: email, subject: notify.subject, html: notify.html }),
      sendEmail({ from: FROM, to: [email], subject: autoReply.subject, html: autoReply.html, headers: { "Auto-Submitted": "auto-replied" } }),
    ]);
    // Logs sanitizados: solo metadatos del error, no el objeto completo.
    if (notifyRes.error) console.error("[contact] notify error", typeof notifyRes.error === "object" ? { type: "send_failed" } : { type: "missing_config" });
    if (autoRes.error) console.error("[contact] autoreply error", typeof autoRes.error === "object" ? { type: "send_failed" } : { type: "missing_config" });
  } catch (err) {
    console.error("[contact] send batch threw", { message: err instanceof Error ? err.message : "unknown" });
  }

  return NextResponse.json({ ok: true });
}
