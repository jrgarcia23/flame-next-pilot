"use client";

import { useState, FormEvent } from "react";
import Icon from "@/components/templates/Icon";
import { getLeadContext } from "@/lib/lead-context";

const accent = "#31B1F8";
const accentDeep = "#1E89C7";
const navy = "#15163A";

type Props = {
  lang: "es" | "en";
};

const COPY = {
  es: {
    title: "Solicita una demo",
    nombre: "Nombre y apellido",
    email: "Email corporativo",
    empresa: "Empresa",
    cargo: "Cargo",
    sector: "Sector",
    sectors: ["Retail", "Centros comerciales", "Hotelería", "Espacios públicos", "Banca", "Otro"],
    pais: "País",
    ubicaciones: "Número de ubicaciones",
    ubicacionesOpts: ["1", "2-10", "11-50", "51-200", "200+"],
    mensaje: "Cuéntanos brevemente qué buscas",
    consent: "Acepto recibir comunicaciones de Flame y he leído la ",
    consentLink: "política de privacidad",
    privacyHref: "/es/politica-de-privacidad/",
    submit: "Solicitar una demo",
    sending: "Enviando…",
    successTitle: "¡Recibido!",
    successBody: "Te confirmamos hueco en menos de 24 h laborables. Si no ves nuestro email, revisa la carpeta de spam.",
    errorRequired: "Por favor rellena los campos obligatorios",
    errorEmail: "Email no válido",
    errorNetwork: "Error de red. Inténtalo de nuevo.",
    errorServer: "No se pudo enviar el formulario.",
  },
  en: {
    title: "Request a demo",
    nombre: "Full name",
    email: "Work email",
    empresa: "Company",
    cargo: "Role",
    sector: "Sector",
    sectors: ["Retail", "Shopping malls", "Hotels", "Public venues", "Banking", "Other"],
    pais: "Country",
    ubicaciones: "Number of locations",
    ubicacionesOpts: ["1", "2-10", "11-50", "51-200", "200+"],
    mensaje: "Tell us briefly what you are looking for",
    consent: "I accept to receive communications from Flame and I have read the ",
    consentLink: "privacy policy",
    privacyHref: "/en/privacy-policy/",
    submit: "Request a demo",
    sending: "Sending…",
    successTitle: "Got it!",
    successBody: "We'll confirm a slot within 24 business hours. If you don't see our email, check your spam folder.",
    errorRequired: "Please fill in the required fields",
    errorEmail: "Invalid email",
    errorNetwork: "Network error. Please try again.",
    errorServer: "Could not send the form.",
  },
} as const;

export default function ContactForm({ lang }: Props) {
  const t = COPY[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const empresa = String(fd.get("empresa") || "").trim();

    if (!nombre || !empresa || !email) { setErrorMsg(t.errorRequired); setStatus("error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg(t.errorEmail); setStatus("error"); return; }

    const cargo = String(fd.get("cargo") || "").trim();
    const sector = String(fd.get("sector") || "").trim();
    const pais = String(fd.get("pais") || "").trim();
    const ubicaciones = String(fd.get("ubicaciones") || "").trim();
    const mensajeUser = String(fd.get("mensaje") || "").trim();
    const website = String(fd.get("website") || "");

    // Combinar cargo + ubicaciones en "mensaje" para que llegue a Resend/Supabase sin cambiar el schema del endpoint.
    const mensajeFinal = [
      cargo ? `Cargo: ${cargo}` : "",
      ubicaciones ? `Ubicaciones: ${ubicaciones}` : "",
      mensajeUser ? `\n${mensajeUser}` : "",
    ].filter(Boolean).join("\n");

    const payload = {
      nombre, email, empresa, sector, pais,
      mensaje: mensajeFinal,
      website,
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
        setErrorMsg(data?.error || t.errorServer);
        setStatus("error");
        return;
      }
      // Redirect a la página de gracias específica de contacto
      window.location.href = lang === "en" ? "/en/thank-you-contact/" : "/es/gracias-contacto/";
    } catch {
      setErrorMsg(t.errorNetwork);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl contact-form-card" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)", padding: 32, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(49,177,248,0.14)", color: accentDeep, display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 500, color: navy, margin: "0 0 12px", letterSpacing: "-0.008em", fontFamily: "var(--font-display)" }}>{t.successTitle}</h3>
        <p style={{ fontSize: 15, color: "var(--color-ink-2)", margin: 0, lineHeight: 1.6 }}>{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl contact-form-card" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)", padding: 32 }}>
      <h3 className="text-[22px] font-medium mb-6" style={{ color: navy, letterSpacing: "-0.008em", fontFamily: "var(--font-display)" }}>{t.title}</h3>
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
      <div className="grid gap-4 contact-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <label htmlFor="cf-nombre" className="sr-only">{t.nombre}</label>
        <input id="cf-nombre" className="cf-in col-span-2" type="text" name="nombre" placeholder={t.nombre} required maxLength={200} autoComplete="name" />
        <label htmlFor="cf-email" className="sr-only">{t.email}</label>
        <input id="cf-email" className="cf-in" type="email" name="email" placeholder={t.email} required maxLength={200} autoComplete="email" />
        <label htmlFor="cf-empresa" className="sr-only">{t.empresa}</label>
        <input id="cf-empresa" className="cf-in" type="text" name="empresa" placeholder={t.empresa} required maxLength={200} autoComplete="organization" />
        <label htmlFor="cf-cargo" className="sr-only">{t.cargo}</label>
        <input id="cf-cargo" className="cf-in" type="text" name="cargo" placeholder={t.cargo} maxLength={200} autoComplete="organization-title" />
        <label htmlFor="cf-sector" className="sr-only">{t.sector}</label>
        <select id="cf-sector" className="cf-in" name="sector" defaultValue="">
          <option value="" disabled>{t.sector}</option>
          {t.sectors.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <label htmlFor="cf-pais" className="sr-only">{t.pais}</label>
        <input id="cf-pais" className="cf-in col-span-2" type="text" name="pais" placeholder={t.pais} maxLength={120} autoComplete="country-name" />
        <label htmlFor="cf-ubicaciones" className="sr-only">{t.ubicaciones}</label>
        <select id="cf-ubicaciones" className="cf-in col-span-2" name="ubicaciones" defaultValue="">
          <option value="" disabled>{t.ubicaciones}</option>
          {t.ubicacionesOpts.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <label htmlFor="cf-mensaje" className="sr-only">{t.mensaje}</label>
        <textarea id="cf-mensaje" className="cf-in col-span-2" name="mensaje" placeholder={t.mensaje} rows={3} maxLength={4000} />
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
          className="col-span-2 mt-3 cta-btn cta-btn--lg"
          style={{ background: accent, color: "#fff", fontWeight: 700, justifyContent: "center", opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "wait" : "pointer" }}
        >
          {status === "sending" ? t.sending : (<>{t.submit} <Icon name="arrow" className="w-4 h-4" /></>)}
        </button>
      </div>
    </form>
  );
}
