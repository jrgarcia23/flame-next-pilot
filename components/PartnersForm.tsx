"use client";

import { useState, FormEvent } from "react";
import { getLeadContext } from "@/lib/lead-context";

const accent = "#31B1F8";
const accentDeep = "#1E89C7";
const navy = "#15163A";

type Props = {
  lang: "es" | "en";
  /** Categoría de partner preseleccionada (Referencia / Empresa / Premium). */
  category?: "referencia" | "empresa" | "premium" | "";
};

const COPY = {
  es: {
    title: "Solicitar información",
    name: "Nombre y apellido",
    email: "Email corporativo",
    phone: "Teléfono",
    company: "Empresa",
    web: "Web",
    country: "País",
    city: "Ciudad / Región",
    typeCompany: "Tipo de empresa (integrador, consultora, agencia…)",
    sector: "Sector",
    sectorsList: ["Retail", "Centros comerciales", "Hotelería", "Espacios públicos", "Banca", "Otro"],
    companySize: "Tamaño de la empresa",
    companySizeOpts: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
    annualIncome: "Facturación anual aproximada",
    annualIncomeOpts: ["< 500k €", "500k - 2M €", "2 - 10M €", "10 - 50M €", "> 50M €"],
    installationCapacity: "¿Tienes capacidad de instalación?",
    yesNoOpts: ["Sí", "No", "Parcial"],
    contacts: "¿Tienes contactos que demanden servicios de location intelligence?",
    message: "Cuéntanos brevemente tu propuesta",
    consent: "Acepto recibir comunicaciones de Flame y he leído la ",
    consentLink: "política de privacidad",
    privacyHref: "/es/politica-de-privacidad/",
    submit: "Solicitar información",
    sending: "Enviando…",
    successTitle: "¡Recibido!",
    successBody: "Nuestro equipo de partners revisa tu solicitud y te responde en 48 h laborables.",
    errReq: "Faltan campos obligatorios",
    errEmail: "Email no válido",
    errNet: "Error de red. Inténtalo de nuevo.",
    errSrv: "No se pudo enviar el formulario.",
    categoryLabel: "Categoría de partner",
  },
  en: {
    title: "Request information",
    name: "Full name",
    email: "Work email",
    phone: "Phone",
    company: "Company",
    web: "Website",
    country: "Country",
    city: "City / Region",
    typeCompany: "Type of company (integrator, consulting, agency…)",
    sector: "Sector",
    sectorsList: ["Retail", "Shopping malls", "Hotels", "Public venues", "Banking", "Other"],
    companySize: "Company size",
    companySizeOpts: ["1-10", "11-50", "51-200", "201-1000", "1000+"],
    annualIncome: "Approximate annual revenue",
    annualIncomeOpts: ["< €500k", "€500k - 2M", "€2 - 10M", "€10 - 50M", "> €50M"],
    installationCapacity: "Do you have installation capacity?",
    yesNoOpts: ["Yes", "No", "Partial"],
    contacts: "Do you have contacts requesting location intelligence services?",
    message: "Briefly describe your proposal",
    consent: "I accept to receive communications from Flame and I have read the ",
    consentLink: "privacy policy",
    privacyHref: "/en/privacy-policy/",
    submit: "Request information",
    sending: "Sending…",
    successTitle: "Got it!",
    successBody: "Our partners team reviews your request and gets back within 48 business hours.",
    errReq: "Required fields missing",
    errEmail: "Invalid email",
    errNet: "Network error. Try again.",
    errSrv: "Could not send the form.",
    categoryLabel: "Partner category",
  },
} as const;

const CATEGORY_LABEL: Record<string, { es: string; en: string }> = {
  referencia: { es: "Referencia", en: "Referral" },
  empresa:    { es: "Empresa",    en: "Business" },
  premium:    { es: "Premium",    en: "Premium" },
  "":         { es: "Sin especificar", en: "Unspecified" },
};

export default function PartnersForm({ lang, category = "" }: Props) {
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

    if (!nombre || !empresa || !email) { setErrorMsg(t.errReq); setStatus("error"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg(t.errEmail); setStatus("error"); return; }

    // Recoger los campos extra del form partners y concatenar en mensaje + telefono
    const phone = String(fd.get("phone") || "").trim();
    const web = String(fd.get("web") || "").trim();
    const country = String(fd.get("country") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const typeCompany = String(fd.get("typeCompany") || "").trim();
    const sector = String(fd.get("sector") || "").trim();
    const companySize = String(fd.get("companySize") || "").trim();
    const annualIncome = String(fd.get("annualIncome") || "").trim();
    const installCap = String(fd.get("installationCapacity") || "").trim();
    const contacts = String(fd.get("contacts") || "").trim();
    const userMsg = String(fd.get("mensaje") || "").trim();

    const fullMessage = [
      `[PARTNERS · ${CATEGORY_LABEL[category]?.[lang] || category}]`,
      web ? `Web: ${web}` : "",
      city ? `Ciudad/Región: ${city}` : "",
      typeCompany ? `Tipo empresa: ${typeCompany}` : "",
      companySize ? `Tamaño: ${companySize}` : "",
      annualIncome ? `Facturación: ${annualIncome}` : "",
      installCap ? `Capacidad instalación: ${installCap}` : "",
      contacts ? `Contactos location intelligence: ${contacts}` : "",
      "",
      userMsg ? `Mensaje:\n${userMsg}` : "",
    ].filter(Boolean).join("\n");

    const payload = {
      nombre, email, empresa, sector, pais: country, telefono: phone,
      mensaje: fullMessage,
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
      // Partners → thank-you de contacto (no creamos gracias-partner separada)
      window.location.href = lang === "en" ? "/en/thank-you-contact/" : "/es/gracias-contacto/";
    } catch {
      setErrorMsg(t.errNet);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)", padding: 32, borderRadius: 16, textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(49,177,248,0.14)", color: accentDeep, display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 500, color: navy, margin: "0 0 12px", letterSpacing: "-0.008em", fontFamily: "var(--font-display)" }}>{t.successTitle}</h3>
        <p style={{ fontSize: 15, color: "var(--color-ink-2)", margin: 0, lineHeight: 1.6 }}>{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl partners-form" style={{ background: "var(--color-paper-soft)", border: "1px solid var(--color-rule)", padding: 32 }}>
      <h3 className="text-[22px] font-medium mb-6" style={{ color: navy, letterSpacing: "-0.008em", fontFamily: "var(--font-display)" }}>{t.title}</h3>
      {category && (
        <p className="text-[13px] mb-5" style={{ color: "var(--color-ink-3)" }}>
          {t.categoryLabel}: <strong style={{ color: accentDeep }}>{CATEGORY_LABEL[category]?.[lang] || category}</strong>
        </p>
      )}
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
      <div className="grid gap-4 partners-form-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <label htmlFor="pf-nombre" className="sr-only">{t.name}</label>
        <input id="pf-nombre" className="cf-in col-span-2" type="text" name="nombre" placeholder={`${t.name} *`} required maxLength={200} autoComplete="name" />
        <label htmlFor="pf-email" className="sr-only">{t.email}</label>
        <input id="pf-email" className="cf-in" type="email" name="email" placeholder={`${t.email} *`} required maxLength={200} autoComplete="email" />
        <label htmlFor="pf-phone" className="sr-only">{t.phone}</label>
        <input id="pf-phone" className="cf-in" type="tel" name="phone" placeholder={t.phone} maxLength={50} autoComplete="tel" />
        <label htmlFor="pf-empresa" className="sr-only">{t.company}</label>
        <input id="pf-empresa" className="cf-in" type="text" name="empresa" placeholder={`${t.company} *`} required maxLength={200} autoComplete="organization" />
        <label htmlFor="pf-web" className="sr-only">{t.web}</label>
        <input id="pf-web" className="cf-in" type="text" name="web" placeholder={t.web} maxLength={200} autoComplete="url" />
        <label htmlFor="pf-country" className="sr-only">{t.country}</label>
        <input id="pf-country" className="cf-in" type="text" name="country" placeholder={t.country} maxLength={120} autoComplete="country-name" />
        <label htmlFor="pf-city" className="sr-only">{t.city}</label>
        <input id="pf-city" className="cf-in" type="text" name="city" placeholder={t.city} maxLength={120} autoComplete="address-level2" />
        <label htmlFor="pf-typeCompany" className="sr-only">{t.typeCompany}</label>
        <input id="pf-typeCompany" className="cf-in col-span-2" type="text" name="typeCompany" placeholder={t.typeCompany} maxLength={200} />
        <label htmlFor="pf-sector" className="sr-only">{t.sector}</label>
        <select id="pf-sector" className="cf-in" name="sector" defaultValue="">
          <option value="" disabled>{t.sector}</option>
          {t.sectorsList.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <label htmlFor="pf-companySize" className="sr-only">{t.companySize}</label>
        <select id="pf-companySize" className="cf-in" name="companySize" defaultValue="">
          <option value="" disabled>{t.companySize}</option>
          {t.companySizeOpts.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <label htmlFor="pf-annualIncome" className="sr-only">{t.annualIncome}</label>
        <select id="pf-annualIncome" className="cf-in" name="annualIncome" defaultValue="">
          <option value="" disabled>{t.annualIncome}</option>
          {t.annualIncomeOpts.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <label htmlFor="pf-installationCapacity" className="sr-only">{t.installationCapacity}</label>
        <select id="pf-installationCapacity" className="cf-in" name="installationCapacity" defaultValue="">
          <option value="" disabled>{t.installationCapacity}</option>
          {t.yesNoOpts.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <label htmlFor="pf-contacts" className="sr-only">{t.contacts}</label>
        <input id="pf-contacts" className="cf-in col-span-2" type="text" name="contacts" placeholder={t.contacts} maxLength={300} />
        <label htmlFor="pf-mensaje" className="sr-only">{t.message}</label>
        <textarea id="pf-mensaje" className="cf-in col-span-2" name="mensaje" placeholder={t.message} rows={4} maxLength={4000} />
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
          style={{ background: accent, color: "#fff", fontWeight: 700, justifyContent: "center", width: "fit-content", opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "wait" : "pointer" }}
        >
          {status === "sending" ? t.sending : t.submit}
        </button>
      </div>
      <style>{`
        @media (max-width: 560px) {
          .partners-form-grid { grid-template-columns: 1fr !important; }
          .partners-form-grid .col-span-2 { grid-column: span 1 / span 1 !important; }
          .partners-form { padding: 20px !important; }
        }
      `}</style>
    </form>
  );
}
