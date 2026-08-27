"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Widget de feedback para la PREVIEW de sectores (equipo comercial).
 * Comentario general o "pinchado" en un punto de la página (captura x/y% + el texto
 * del sitio donde pincha). Envía a /api/feedback (Supabase Storage). Panel: /es/preview-sectores/feedback.
 */
export default function PreviewFeedback({ sectorLabel }: { sectorLabel: string }) {
  const [open, setOpen] = useState(false);
  const [pinning, setPinning] = useState(false);
  const [pin, setPin] = useState<{ x: number; y: number; context: string } | null>(null);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const website = useRef("");

  useEffect(() => {
    try { setAuthor(localStorage.getItem("flame-fb-author") || ""); } catch {}
  }, []);

  // Modo pin: el siguiente clic en la página fija el punto y captura el contexto.
  useEffect(() => {
    if (!pinning) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest(".fb-widget")) return; // ignora clics en el propio widget
      e.preventDefault(); e.stopPropagation();
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      let ctx = "";
      if (el) {
        const head = el.closest("section")?.querySelector("h1,h2,h3")?.textContent || "";
        ctx = (el.textContent || head || "").replace(/\s+/g, " ").trim().slice(0, 120);
      }
      const x = +((e.pageX / document.documentElement.scrollWidth) * 100).toFixed(1);
      const y = +((e.pageY / document.documentElement.scrollHeight) * 100).toFixed(1);
      setPin({ x, y, context: ctx });
      setPinning(false);
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    document.body.style.cursor = "crosshair";
    return () => { document.removeEventListener("click", onClick, true); document.body.style.cursor = ""; };
  }, [pinning]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setStatus("sending");
    try { localStorage.setItem("flame-fb-author", author); } catch {}
    const sector = window.location.pathname.match(/preview-sectores\/([^/]+)/)?.[1] || "general";
    const payload = {
      sector, sector_label: sectorLabel,
      page_url: typeof window !== "undefined" ? window.location.pathname : "",
      author, website: website.current,
      kind: pin ? "pin" : "general",
      x: pin?.x, y: pin?.y,
      body: pin?.context ? `[Sobre: “${pin.context}”] ${body.trim()}` : body.trim(),
    };
    try {
      const r = await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!r.ok) throw new Error();
      setStatus("done"); setBody(""); setPin(null);
      setTimeout(() => { setStatus("idle"); setOpen(false); }, 1800);
    } catch { setStatus("error"); }
  };

  return (
    <div className="fb-widget">
      {pinning && (
        <div className="fb-hint">Haz clic en el punto de la página que quieres comentar…&nbsp;
          <button type="button" onClick={() => setPinning(false)}>cancelar</button>
        </div>
      )}

      {!open && !pinning && (
        <button type="button" className="fb-fab" onClick={() => setOpen(true)} aria-label="Dejar feedback">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Feedback
        </button>
      )}

      {open && (
        <div className="fb-panel">
          <div className="fb-head">
            <strong>Feedback · {sectorLabel}</strong>
            <button type="button" className="fb-x" onClick={() => { setOpen(false); setPin(null); }} aria-label="Cerrar">×</button>
          </div>
          {status === "done" ? (
            <p className="fb-ok">¡Gracias! Feedback enviado. ✅</p>
          ) : (
            <form onSubmit={submit}>
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} onChange={(e) => (website.current = e.target.value)} />
              {pin && <div className="fb-pin">📍 Punto fijado{pin.context ? <>: <span>“{pin.context}”</span></> : null} <button type="button" onClick={() => setPin(null)}>quitar</button></div>}
              <label>Tu nombre</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nombre (equipo comercial)" />
              <label>Comentario</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Qué cambiarías, dudas, errores…" required />
              <div className="fb-actions">
                {!pin && <button type="button" className="fb-pinbtn" onClick={() => { setOpen(false); setPinning(true); }}>📍 Señalar un punto</button>}
                <button type="submit" className="fb-send" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar"}</button>
              </div>
              {status === "error" && <p className="fb-err">No se pudo enviar. Inténtalo de nuevo.</p>}
            </form>
          )}
        </div>
      )}

      <style>{`
        .fb-widget { position: fixed; right: 20px; bottom: 20px; z-index: 900; font-family: var(--font-body); }
        .fb-fab { display: inline-flex; align-items: center; gap: 9px; background: var(--color-accent); color: #fff; border: none; border-radius: 999px; padding: 13px 20px; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 12px 30px -10px rgba(49,177,248,.6); }
        .fb-fab:hover { filter: brightness(.96); }
        .fb-hint { position: fixed; left: 50%; top: 76px; transform: translateX(-50%); background: #15163a; color: #fff; padding: 10px 18px; border-radius: 999px; font-size: 13.5px; font-weight: 600; box-shadow: 0 12px 30px -12px rgba(0,0,0,.5); z-index: 950; }
        .fb-hint button { background: none; border: none; color: var(--color-accent); font-weight: 700; cursor: pointer; text-decoration: underline; }
        .fb-panel { width: 340px; max-width: calc(100vw - 32px); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 16px; box-shadow: 0 30px 70px -24px rgba(9,10,32,.5); overflow: hidden; }
        .fb-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; background: #15163a; color: #fff; }
        .fb-head strong { font-size: 14px; }
        .fb-x { background: none; border: none; color: rgba(255,255,255,.7); font-size: 22px; line-height: 1; cursor: pointer; }
        .fb-panel form { padding: 14px 16px 16px; display: flex; flex-direction: column; }
        .fb-panel label { font-size: 12px; font-weight: 700; color: var(--color-navy); margin: 10px 0 5px; }
        .fb-panel input[type=text], .fb-panel textarea { font-family: inherit; font-size: 14px; padding: 10px 12px; border: 1px solid var(--color-rule-strong); border-radius: 9px; background: var(--color-paper-soft); color: var(--color-ink); resize: vertical; }
        .fb-panel input[type=text]:focus, .fb-panel textarea:focus { outline: none; border-color: var(--color-accent); background: #fff; }
        .fb-pin { font-size: 12.5px; color: var(--color-ink-2); background: rgb(49 177 248 / .1); border-radius: 8px; padding: 8px 10px; margin-bottom: 6px; }
        .fb-pin span { color: var(--color-navy); font-weight: 600; }
        .fb-pin button, .fb-actions .fb-pinbtn { background: none; border: none; color: var(--color-accent-deep); font-weight: 600; cursor: pointer; font-size: 12.5px; }
        .fb-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 14px; }
        .fb-send { background: var(--color-accent); color: #fff; border: none; border-radius: 8px; padding: 11px 20px; font-size: 14px; font-weight: 700; cursor: pointer; }
        .fb-send:disabled { opacity: .6; }
        .fb-ok { padding: 22px 16px; text-align: center; color: var(--color-navy); font-weight: 600; }
        .fb-err { color: #c0392b; font-size: 13px; margin: 8px 0 0; }
      `}</style>
    </div>
  );
}
