"use client";

import { useState, FormEvent } from "react";
import { getLeadContext } from "@/lib/lead-context";

const accent = "#31B1F8";
const accentDeep = "#1E89C7";
const navy = "#15163A";

type Props = {
  lang: "es" | "en";
  /** Selector de copy / tono del CTA. Default: "demo" */
  variant?: "demo" | "contact" | "partners" | "pilot";
  /** Sufijo CSS para grid responsive (los templates usan distintas clases). */
  gridClass?: string;
  /** Texto del botón (override del default por variant). */
  submitLabel?: string;
};

const COPY = {
  es: {
    name: "Nombre y apellido",
    email: "Email corporativo",
    company: "Empresa",
    sector: "Sector",
    country: "País",
    sectors: ["Centros comerciales", "Espacios públicos", "Retail", "Hostelería", "Otro"],
    consent: "Acepto recibir comunicaciones de Flame y he leído la ",
    consentLink: "política de privacidad",
    privacyHref: "/es/politica-de-privacidad/",
    submitDemo: "Solicitar una demo",
    submitContact: "Enviar mensaje",
    submitPartners: "Quiero ser partner",
    submitPilot: "Solicitar piloto",
    sending: "Enviando…",
    successTitle: "¡Recibido!",
    successBody: "Te respondemos en menos de 24 h laborables. Si no ves nuestro email, revisa la carpeta de spam.",
    errReq: "Rellena los campos obligatorios",
    errEmail: "Email no válido",
    errNet: "Error de red. Inténtalo de nuevo.",
    errSrv: "No se pudo enviar el formulario.",
  },
  en: {
    name: "Full name",
    email: "Work email",
    company: "Company",
    sector: "Sector",
    country: "Country",
    sectors: ["Shopping malls", "Public venues", "Retail", "Hospitality", "Other"],
    consent: "I accept to receive communications from Flame and I have read the ",
    consentLink: "privacy policy",
    privacyHref: "/en/privacy-policy/",
    submitDemo: "Request a demo",
    submitContact: "Send message",
    submitPartners: "I want to be a partner",
    submitPilot: "Request a pilot",
    sending: "Sending…",
    successTitle: "Got it!",
    successBody: "We'll get back to you within 24 business hours. If you don't see our email, check your spam folder.",
    errReq: "Please fill in the required fields",
    errEmail: "Invalid email",
    errNet: "Network error. Try again.",
    errSrv: "Could not send the form.",
  },
} as const;

export default function DemoFormInline({ lang, variant = "demo", gridClass = "", submitLabel }: Props) {
  const t = COPY[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const defaultLabel =
    variant === "partners" ? t.submitPartners :
    variant === "pilot"    ? t.submitPilot :
    variant === "contact"  ? t.submitContact :
                             t.submitDemo;
  const label = submitLabel || defaultLabel;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const empresa = String(fd.get("empresa") || "").trim();

    if (!nombre || !empresa || !email) { setErrorMsg(t.errReq); setStatus("error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg(t.errEmail); setStatus("error"); return; }

    const payload = {
      nombre, email, empresa,
      sector: String(fd.get("sector") || "").trim(),
      pais: String(fd.get("pais") || "").trim(),
      mensaje: `[${variant.toUpperCase()}]`,
      website: String(fd.get("website") || ""),
      ...getLeadContext(),
    };

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setErrorMsg(data?.error || t.errSrv);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg(t.errNet);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={gridClass} style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)", padding: 28, borderRadius: 16, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(49,177,248,0.14)", color: accentDeep, display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 28 }}>✓</div>
        <h3 style={{ fontSize: 21, fontWeight: 500, color: navy, margin: "0 0 10px", letterSpacing: "-0.008em", fontFamily: "var(--font-display)" }}>{t.successTitle}</h3>
        <p style={{ fontSize: 15, color: "var(--color-ink-2)", margin: 0, lineHeight: 1.6 }}>{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 ${gridClass}`} style={{ gridTemplateColumns: "1fr 1fr" }}>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
      <input className="cf-in col-span-2" type="text"  name="nombre"  placeholder={t.name}    required maxLength={200} />
      <select className="cf-in"           name="sector" defaultValue="">
        <option value="" disabled>{t.sector}</option>
        {t.sectors.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <input className="cf-in"            type="email" name="email"   placeholder={t.email}   required maxLength={200} />
      <input className="cf-in"            type="text"  name="empresa" placeholder={t.company} required maxLength={200} />
      <input className="cf-in"            type="text"  name="pais"    placeholder={t.country} maxLength={120} />
      <label className="col-span-2 flex items-start gap-2 text-[13.5px] mt-2" style={{ color: "var(--color-ink-3)" }}>
        <input type="checkbox" name="consent" className="mt-1" style={{ accentColor: accent }} required />
        <span>
          {t.consent}
          <a href={t.privacyHref} style={{ color: accentDeep, borderBottom: "1px solid currentColor" }}>{t.consentLink}</a>.
        </span>
      </label>
      {errorMsg && <p className="col-span-2" style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="col-span-2 mt-3 cta-btn cta-btn--md"
        style={{ background: accent, color: "#fff", fontWeight: 700, width: "fit-content", opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "wait" : "pointer" }}
      >
        {status === "sending" ? t.sending : label}
      </button>
    </form>
  );
}
