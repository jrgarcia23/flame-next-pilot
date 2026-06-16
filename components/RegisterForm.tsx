"use client";

import { useState, FormEvent } from "react";
import { getLeadContext } from "@/lib/lead-context";

const accent = "#31B1F8";
const accentDeep = "#1E89C7";
const navy = "#15163A";
const ink3 = "#6E7488";

type Sector = "Centros comerciales" | "Retail" | "Otros" | "";

export type RegisterFormProps = {
  /** "events" o "webinars" — define el endpoint /api/<kind>/register */
  kind: "events" | "webinars";
  /** Nombre del evento/webinar fijo (cuando la página es de un único evento) */
  topicName?: string;
  /** Fecha del evento/webinar (ISO opcional) */
  topicDate?: string;
  /** Opciones dropdown si no hay topicName fijo */
  topicOptions?: { value: string; label: string; date?: string }[];
  /** Mostrar campo Cargo (default: true) */
  showCargo?: boolean;
  /** Texto del botón submit */
  submitLabel: string;
  /** href de la política de privacidad */
  privacyHref: string;
  /** Variant: "hero" (fondo blanco card) o "page" (fondo neutro grid 2-col) */
  variant?: "hero" | "page";
};

export default function RegisterForm(p: RegisterFormProps) {
  const isHero = (p.variant || "hero") === "hero";
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const topicKey = p.kind === "events" ? "event_name" : "webinar_name";
    const dateKey = p.kind === "events" ? "event_date" : "webinar_date";

    let topicName = p.topicName || "";
    let topicDate = p.topicDate || "";
    if (!topicName) {
      const selectVal = String(fd.get("topic_select") || "");
      topicName = selectVal;
      const found = p.topicOptions?.find((o) => o.value === selectVal);
      if (found?.date) topicDate = found.date;
    }

    const payload: Record<string, string> = {
      nombre: String(fd.get("nombre") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      empresa: String(fd.get("empresa") || "").trim(),
      cargo: String(fd.get("cargo") || "").trim(),
      sector: String(fd.get("sector") || "").trim(),
      mensaje: String(fd.get("mensaje") || "").trim(),
      website: String(fd.get("website") || ""),
      [topicKey]: topicName,
      [dateKey]: topicDate,
      ...getLeadContext(),
    };

    try {
      const res = await fetch(`/api/${p.kind}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setErrorMsg(data?.error || "No se pudo enviar el formulario.");
        setStatus("error");
        return;
      }
      // Redirect: events → gracias-evento · webinars → gracias-webinar
      const isWebinar = p.kind === "webinars";
      const slug = isWebinar
        ? (p.privacyHref.startsWith("/en/") ? "/en/thank-you-webinar/" : "/es/gracias-webinar/")
        : (p.privacyHref.startsWith("/en/") ? "/en/thank-you-event/"   : "/es/gracias-evento/");
      window.location.href = slug;
    } catch {
      setErrorMsg("Error de red. Inténtalo de nuevo.");
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = isHero
    ? { minHeight: 48, padding: "12px 16px", fontSize: 14.5, color: navy, background: "#fff", border: "1px solid rgba(15,23,42,0.16)", borderRadius: 8, fontFamily: "inherit", width: "100%", outline: "none" }
    : { minHeight: 52, padding: "14px 18px", fontSize: 15.5, color: navy, background: "#fff", border: "1px solid rgba(15,23,42,0.16)", borderRadius: 10, fontFamily: "inherit", width: "100%", outline: "none" };

  if (status === "success") {
    return (
      <div style={{ background: "#fff", padding: 32, borderRadius: 16, boxShadow: "0 24px 60px -20px rgb(0 0 0 / 0.4)", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(49,177,248,0.14)", color: accentDeep, display: "inline-flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 28 }}>✓</div>
        <h3 style={{ fontSize: 22, fontWeight: 500, color: navy, margin: "0 0 12px", letterSpacing: "-0.018em" }}>Inscripción recibida</h3>
        <p style={{ fontSize: 15, color: "#4A4F66", margin: 0, lineHeight: 1.6 }}>Te enviamos un email con los detalles. Si no lo ves, revisa tu carpeta de spam.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3" style={{ gap: isHero ? 12 : 16 }}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} aria-hidden="true" />

      <label htmlFor="rf-nombre" className="sr-only">Nombre</label>
      <input id="rf-nombre" style={inputStyle} type="text" name="nombre" placeholder="Nombre" required autoComplete="name" />
      <label htmlFor="rf-email" className="sr-only">Email</label>
      <input id="rf-email" style={inputStyle} type="email" name="email" placeholder="Email" required autoComplete="email" />
      <label htmlFor="rf-empresa" className="sr-only">Empresa</label>
      <input id="rf-empresa" style={inputStyle} type="text" name="empresa" placeholder="Empresa" required autoComplete="organization" />
      {(p.showCargo !== false) && (
        <>
          <label htmlFor="rf-cargo" className="sr-only">Cargo</label>
          <input id="rf-cargo" style={inputStyle} type="text" name="cargo" placeholder="Cargo" required autoComplete="organization-title" />
        </>
      )}
      <label htmlFor="rf-sector" className="sr-only">Sector</label>
      <select id="rf-sector" style={inputStyle} name="sector" defaultValue="" required>
        <option value="" disabled>Sector</option>
        {p.privacyHref.startsWith("/en/") ? (
          <>
            <option>Retail</option>
            <option>Shopping malls</option>
            <option>Hotels</option>
            <option>Public venues</option>
            <option>Banking</option>
            <option>Other</option>
          </>
        ) : (
          <>
            <option>Retail</option>
            <option>Centros comerciales</option>
            <option>Hotelería</option>
            <option>Espacios públicos</option>
            <option>Banca</option>
            <option>Otro</option>
          </>
        )}
      </select>
      {!p.topicName && p.topicOptions && p.topicOptions.length > 0 && (
        <>
          <label htmlFor="rf-topic" className="sr-only">{p.kind === "events" ? "Evento" : "Webinar"}</label>
          <select id="rf-topic" style={inputStyle} name="topic_select" defaultValue="" required>
            <option value="" disabled>{p.kind === "events" ? "¿A qué evento te inscribes?" : "¿A qué webinar te inscribes?"}</option>
            {p.topicOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </>
      )}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: ink3, marginTop: 4 }}>
        <input type="checkbox" name="consent" style={{ marginTop: 3, accentColor: accent }} required />
        <span>
          Acepto recibir otras comunicaciones de Flame, consulta nuestra{" "}
          <a href={p.privacyHref} style={{ color: accentDeep, borderBottom: "1px solid currentColor" }}>política de privacidad</a>.
        </span>
      </label>

      {errorMsg && <p style={{ fontSize: 13, color: "#DC2626", margin: 0 }}>{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="cta-btn cta-btn--md"
        style={{ background: accent, color: "#fff", fontWeight: 700, justifyContent: "center", marginTop: 4, opacity: status === "sending" ? 0.65 : 1, cursor: status === "sending" ? "wait" : "pointer" }}
      >
        {status === "sending" ? "Enviando…" : p.submitLabel}
      </button>
    </form>
  );
}
