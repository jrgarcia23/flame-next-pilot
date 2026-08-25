"use client";

import { useEffect, useState } from "react";

/**
 * Modal de captura + descarga de la "ficha de solución" (PDF) de una página de caso de uso.
 * Se activa cuando cfg.fichaPdf existe en UseCaseTemplate. Engancha todos los botones con
 * clase `.fx-dl` (hero + banda navy): al pulsar, abre el modal; al enviar, sirve el PDF.
 *
 * TODO(lead): enviar { name, email } a ActiveCampaign (misma vía que el form de contacto)
 * antes de servir el PDF. De momento la descarga es directa para "ver cómo queda".
 */
export default function FichaDownload({
  pdfHref,
  title,
  lang = "es",
}: {
  pdfHref: string;
  title: string;
  lang?: "es" | "en";
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const T =
    lang === "en"
      ? {
          eyebrow: "Solution datasheet",
          heading: `Download the ${title} datasheet`,
          sub: "Leave your name and work email and we'll send you the PDF datasheet (technology, metrics and use cases). No spam.",
          name: "Name",
          namePh: "Your name",
          email: "Work email",
          emailPh: "name@company.com",
          consent: "I accept the privacy policy and to receive communications from Flame.",
          submit: "Download datasheet (PDF)",
          doneTitle: "Done! Your download has started.",
          doneSub: "If it doesn't start,",
          doneLink: "download it here",
        }
      : {
          eyebrow: "Ficha de solución",
          heading: `Descarga la ficha de ${title}`,
          sub: "Déjanos tu nombre y email de trabajo y te enviamos la ficha en PDF (tecnología, métricas y casos). Sin spam.",
          name: "Nombre",
          namePh: "Tu nombre",
          email: "Email de trabajo",
          emailPh: "nombre@empresa.com",
          consent: "Acepto la política de privacidad y recibir comunicaciones de Flame.",
          submit: "Descargar ficha (PDF)",
          doneTitle: "¡Listo! Tu descarga ha comenzado.",
          doneSub: "Si no empieza,",
          doneLink: "descárgala aquí",
        };

  // Engancha los botones .fx-dl (server-rendered) para abrir el modal
  useEffect(() => {
    const openModal = (e: Event) => {
      e.preventDefault();
      setDone(false);
      setOpen(true);
    };
    const els = Array.from(document.querySelectorAll<HTMLElement>(".fx-dl"));
    els.forEach((el) => el.addEventListener("click", openModal));
    return () => els.forEach((el) => el.removeEventListener("click", openModal));
  }, []);

  // Bloquea scroll + cierre con Escape mientras el modal está abierto
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const startDownload = () => {
    const a = document.createElement("a");
    a.href = pdfHref;
    a.setAttribute("download", "");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      nombre: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      website: String(fd.get("website") || ""), // honeypot
      solucion: title,
      pdf: pdfHref,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      pagePath: typeof window !== "undefined" ? window.location.pathname : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    };
    // El lead se guarda en Supabase (tabla leads, source="ficha") + aviso a JR.
    // Best-effort: la descarga ocurre igualmente aunque la red falle.
    try {
      await fetch("/api/ficha/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* no bloquear la descarga */
    }
    startDownload();
    setDone(true);
  };

  if (!open) return null;

  return (
    <div className="fx-modal" role="dialog" aria-modal="true" aria-label={T.heading}>
      <div className="fx-ov" onClick={() => setOpen(false)} />
      <div className="fx-card">
        <button className="fx-x" aria-label="Cerrar" onClick={() => setOpen(false)}>
          ×
        </button>
        <span className="fx-eb">{T.eyebrow}</span>

        {done ? (
          <div className="fx-done">
            <div className="fx-check" aria-hidden>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>{T.doneTitle}</h3>
            <p className="fx-sub">
              {T.doneSub}{" "}
              <a href={pdfHref} onClick={startDownload}>
                {T.doneLink}
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <h3>{T.heading}</h3>
            <p className="fx-sub">{T.sub}</p>
            <form onSubmit={onSubmit}>
              {/* honeypot anti-spam: invisible para humanos */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              <label>{T.name}</label>
              <input type="text" name="name" required placeholder={T.namePh} />
              <label>{T.email}</label>
              <input type="email" name="email" required placeholder={T.emailPh} />
              <div className="fx-chk">
                <input type="checkbox" required />
                <span>{T.consent}</span>
              </div>
              <button className="fx-submit" type="submit">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {T.submit}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        .fx-modal { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .fx-ov { position: absolute; inset: 0; background: rgb(9 10 32 / 0.62); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); }
        .fx-card { position: relative; width: 100%; max-width: 460px; background: #fff; border-radius: 18px; padding: 34px 34px 30px; box-shadow: 0 40px 90px -30px rgb(9 10 32 / 0.5); animation: fx-in .22s cubic-bezier(0.22,1,0.36,1); }
        @keyframes fx-in { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
        .fx-x { position: absolute; top: 14px; right: 16px; width: 34px; height: 34px; border: none; background: transparent; color: var(--color-ink-3); font-size: 26px; line-height: 1; cursor: pointer; border-radius: 8px; }
        .fx-x:hover { background: var(--color-paper); color: var(--color-navy); }
        .fx-eb { font-family: var(--font-display); font-weight: 600; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--color-accent-deep); }
        .fx-card h3 { font-family: var(--font-display); font-weight: 400; font-size: 24px; letter-spacing: -0.02em; line-height: 1.15; color: var(--color-navy); margin: 12px 0 8px; }
        .fx-sub { font-size: 14.5px; line-height: 1.55; color: var(--color-ink-2); margin: 0 0 20px; }
        .fx-card form { display: flex; flex-direction: column; }
        .fx-card label { font-size: 13px; font-weight: 600; color: var(--color-navy); margin: 12px 0 6px; }
        .fx-card input[type="text"], .fx-card input[type="email"] { font-family: var(--font-body); font-size: 15px; padding: 12px 14px; border-radius: 8px; border: 1px solid var(--color-rule-strong); background: var(--color-paper-soft); color: var(--color-ink); }
        .fx-card input[type="text"]:focus, .fx-card input[type="email"]:focus { outline: none; border-color: var(--color-accent); background: #fff; }
        .fx-chk { display: flex; gap: 10px; align-items: flex-start; margin: 16px 0 4px; font-size: 13px; line-height: 1.45; color: var(--color-ink-2); }
        .fx-chk input { margin-top: 2px; }
        .fx-chk a { color: var(--color-accent-deep); }
        .fx-submit { display: inline-flex; align-items: center; justify-content: center; gap: 10px; margin-top: 18px; font-family: var(--font-body); font-weight: 700; font-size: 16px; padding: 15px 24px; border-radius: 6px; border: none; background: var(--color-accent); color: #fff; cursor: pointer; transition: filter .15s, transform .12s; }
        .fx-submit:hover { filter: brightness(.95); transform: translateY(-1px); }
        .fx-done { text-align: center; padding: 8px 0 4px; }
        .fx-check { width: 54px; height: 54px; margin: 14px auto 6px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgb(49 177 248 / 0.14); color: var(--color-accent-deep); }
        .fx-done h3 { margin: 6px 0 8px; }
      `}</style>
    </div>
  );
}
