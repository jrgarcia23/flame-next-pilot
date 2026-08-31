"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Feedback sobre las páginas de la preview de sectores (como Eleia):
 * pinchar sobre la página marca el punto (marcador visible + captura del texto del sitio) y abre el
 * comentario. Los comentarios propios quedan como PINES NUMERADOS persistentes (localStorage por
 * página) que se pueden releer o borrar. Envía a /api/feedback. Panel: /es/preview-sectores/feedback.
 */
type Pin = { x: number; y: number; px: number; py: number; context: string };
type Mine = { id: string; page_url: string; sector_label: string; x: number | null; y: number | null; context: string; body: string; created_at: string };
type Mode = "closed" | "menu" | "pinning" | "form";
const LS = "flame-fb-mine";

export default function PreviewFeedback({ sectorLabel }: { sectorLabel: string }) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("closed");
  const [pin, setPin] = useState<Pin | null>(null);
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [mine, setMine] = useState<Mine[]>([]);
  const [openDot, setOpenDot] = useState<string | null>(null);
  const [, force] = useState(0);
  const website = useRef("");

  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const loadMine = useCallback(() => {
    try {
      const all = JSON.parse(localStorage.getItem(LS) || "[]") as Mine[];
      setMine(all.filter((m) => m.page_url === window.location.pathname));
    } catch { setMine([]); }
  }, []);

  useEffect(() => {
    setMounted(true);
    try { setAuthor(localStorage.getItem("flame-fb-author") || ""); } catch {}
    loadMine();
    const onResize = () => force((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loadMine]);

  // Modo pin: el siguiente clic en la página fija el punto y captura el contexto.
  useEffect(() => {
    if (mode !== "pinning") return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest(".fb-widget, .fb-dot, .fb-dotpop")) return;
      e.preventDefault(); e.stopPropagation();
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      let ctx = "";
      if (el) {
        const head = el.closest("section")?.querySelector("h1,h2,h3")?.textContent || "";
        ctx = (el.textContent || head || "").replace(/\s+/g, " ").trim().slice(0, 120);
      }
      const x = +((e.pageX / document.documentElement.scrollWidth) * 100).toFixed(2);
      const y = +((e.pageY / document.documentElement.scrollHeight) * 100).toFixed(2);
      setPin({ x, y, px: e.pageX, py: e.pageY, context: ctx });
      setMode("form");
    };
    document.addEventListener("click", onClick, true);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setMode("closed"); };
    document.addEventListener("keydown", esc);
    document.body.style.cursor = "crosshair";
    return () => { document.removeEventListener("click", onClick, true); document.removeEventListener("keydown", esc); document.body.style.cursor = ""; };
  }, [mode]);

  const reset = () => { setMode("closed"); setPin(null); setBody(""); setStatus("idle"); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setStatus("sending");
    try { localStorage.setItem("flame-fb-author", author); } catch {}
    const sector = window.location.pathname.match(/preview-[^/]+\/([^/]+)/)?.[1] || "index";
    const fullBody = pin?.context ? `[Sobre: “${pin.context}”] ${body.trim()}` : body.trim();
    const payload = { sector, sector_label: sectorLabel, page_url: window.location.pathname, author, website: website.current, kind: pin ? "pin" : "general", x: pin?.x, y: pin?.y, body: fullBody };
    try {
      const r = await fetch("/api/feedback/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.ok) throw new Error();
      // guardar como marca propia
      const rec: Mine = { id: d.id, page_url: window.location.pathname, sector_label: sectorLabel, x: pin?.x ?? null, y: pin?.y ?? null, context: pin?.context || "", body: body.trim(), created_at: new Date().toISOString() };
      try { const all = JSON.parse(localStorage.getItem(LS) || "[]"); all.push(rec); localStorage.setItem(LS, JSON.stringify(all)); } catch {}
      setStatus("done"); loadMine();
      setTimeout(reset, 1500);
    } catch { setStatus("error"); }
  };

  const removeMine = async (id: string) => {
    try { const all = (JSON.parse(localStorage.getItem(LS) || "[]") as Mine[]).filter((m) => m.id !== id); localStorage.setItem(LS, JSON.stringify(all)); } catch {}
    setOpenDot(null); loadMine();
    fetch(`/api/feedback/?id=${encodeURIComponent(id)}`, { method: "DELETE" }).catch(() => {});
  };

  const sw = mounted ? document.documentElement.scrollWidth : 0;
  const sh = mounted ? document.documentElement.scrollHeight : 0;
  const pins = mine.filter((m) => m.x != null && m.y != null);

  return (
    <div className="fb-widget">
      {mode === "pinning" && (
        <div className="fb-hint">Haz clic en el punto de la página que quieres comentar
          <button type="button" onClick={() => setMode("closed")}>cancelar (Esc)</button>
        </div>
      )}

      {mode === "closed" && (
        <button type="button" className="fb-fab" onClick={() => setMode("menu")} aria-label="Dejar feedback">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Feedback
          {mine.length > 0 && <span className="fb-count">{mine.length}</span>}
        </button>
      )}

      {mode === "menu" && (
        <div className="fb-menu">
          <div className="fb-head"><strong>Feedback · {sectorLabel}</strong><button type="button" className="fb-x" onClick={reset}>×</button></div>
          <button type="button" className="fb-opt fb-opt--main" onClick={() => setMode("pinning")}>
            📍 <span><b>Comentar en un punto</b><small>Pincha en la zona de la página</small></span>
          </button>
          <button type="button" className="fb-opt" onClick={() => { setPin(null); setMode("form"); }}>
            💬 <span><b>Comentario general</b><small>Sobre la página en conjunto</small></span>
          </button>
          {mine.length > 0 && <div className="fb-mine-note">Ya has dejado {mine.length} comentario{mine.length === 1 ? "" : "s"} en esta página{pins.length ? " · los pines numerados los marcan" : ""}.</div>}
        </div>
      )}

      {mode === "form" && (
        <div className="fb-panel">
          <div className="fb-head"><strong>Feedback · {sectorLabel}</strong><button type="button" className="fb-x" onClick={reset}>×</button></div>
          {status === "done" ? (
            <p className="fb-ok">¡Gracias! Feedback enviado. ✅</p>
          ) : (
            <form onSubmit={submit}>
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }} onChange={(e) => (website.current = e.target.value)} />
              {pin ? (
                <div className="fb-pin">📍 Punto marcado{pin.context ? <>: <span>“{pin.context}”</span></> : null} <button type="button" onClick={() => setMode("pinning")}>cambiar</button></div>
              ) : (
                <div className="fb-pin fb-pin--general">Comentario general · <button type="button" onClick={() => setMode("pinning")}>señalar un punto</button></div>
              )}
              <label>Tu nombre</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nombre (equipo comercial)" />
              <label>Comentario</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Qué cambiarías, dudas, errores…" required autoFocus />
              <div className="fb-actions">
                <button type="button" className="fb-back" onClick={() => setMode("menu")}>← Volver</button>
                <button type="submit" className="fb-send" disabled={status === "sending"}>{status === "sending" ? "Enviando…" : "Enviar"}</button>
              </div>
              {status === "error" && <p className="fb-err">No se pudo enviar. Inténtalo de nuevo.</p>}
            </form>
          )}
        </div>
      )}

      {/* Capa de marcadores en el documento (portal): pin temporal + pines numerados propios */}
      {mounted && createPortal(
        <div className="fb-layer">
          {pin && mode === "form" && <div className="fb-marker" style={{ left: pin.px, top: pin.py }} aria-hidden>📍</div>}
          {pins.map((m, i) => {
            const px = (m.x! / 100) * sw, py = (m.y! / 100) * sh;
            return (
              <div key={m.id} className="fb-dotwrap" style={{ left: px, top: py }}>
                <button type="button" className="fb-dot" onClick={() => setOpenDot(openDot === m.id ? null : m.id)} title="Tu comentario">{i + 1}</button>
                {openDot === m.id && (
                  <div className="fb-dotpop">
                    <div className="fb-dotpop-head"><strong>Tu comentario #{i + 1}</strong><button type="button" onClick={() => setOpenDot(null)}>×</button></div>
                    {m.context && <div className="fb-dotpop-ctx">Sobre: “{m.context}”</div>}
                    <p className="fb-dotpop-body">{m.body}</p>
                    <div className="fb-dotpop-foot"><span>{(() => { try { return new Date(m.created_at).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }); } catch { return ""; } })()}</span><button type="button" className="fb-del" onClick={() => removeMine(m.id)}>Eliminar</button></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>, document.body)}

      <style>{`
        .fb-widget { position: fixed; right: 20px; bottom: 20px; z-index: 10001; font-family: var(--font-body); }
        .fb-fab { position: relative; display: inline-flex; align-items: center; gap: 9px; background: var(--color-accent); color: #fff; border: none; border-radius: 999px; padding: 13px 20px; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 12px 30px -10px rgba(49,177,248,.6); }
        .fb-fab:hover { filter: brightness(.96); }
        .fb-count { position: absolute; top: -6px; right: -6px; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 999px; background: #fe5000; color: #fff; font-size: 12px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,.3); }
        .fb-hint { position: fixed; left: 50%; top: 76px; transform: translateX(-50%); display: inline-flex; gap: 14px; align-items: center; background: #15163a; color: #fff; padding: 11px 20px; border-radius: 999px; font-size: 14px; font-weight: 600; box-shadow: 0 14px 34px -12px rgba(0,0,0,.55); z-index: 10002; }
        .fb-hint button { background: none; border: none; color: var(--color-accent); font-weight: 700; cursor: pointer; text-decoration: underline; }
        .fb-menu, .fb-panel { width: 340px; max-width: calc(100vw - 32px); background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 16px; box-shadow: 0 30px 70px -24px rgba(9,10,32,.5); overflow: hidden; }
        .fb-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; background: #15163a; color: #fff; }
        .fb-head strong { font-size: 14px; }
        .fb-x { background: none; border: none; color: rgba(255,255,255,.7); font-size: 22px; line-height: 1; cursor: pointer; }
        .fb-opt { display: flex; align-items: center; gap: 14px; width: 100%; text-align: left; background: none; border: none; border-bottom: 1px solid var(--color-rule); padding: 16px; font-size: 22px; cursor: pointer; color: var(--color-navy); }
        .fb-opt:hover { background: var(--color-paper-soft); }
        .fb-opt span { display: flex; flex-direction: column; }
        .fb-opt b { font-size: 15px; font-family: var(--font-body); }
        .fb-opt small { font-size: 12.5px; color: var(--color-ink-3); font-weight: 400; }
        .fb-opt--main b { color: var(--color-accent-deep); }
        .fb-mine-note { padding: 12px 16px; font-size: 12.5px; color: var(--color-ink-3); background: var(--color-paper-soft); }
        .fb-panel form { padding: 14px 16px 16px; display: flex; flex-direction: column; }
        .fb-panel label { font-size: 12px; font-weight: 700; color: var(--color-navy); margin: 10px 0 5px; }
        .fb-panel input[type=text], .fb-panel textarea { font-family: inherit; font-size: 14px; padding: 10px 12px; border: 1px solid var(--color-rule-strong); border-radius: 9px; background: var(--color-paper-soft); color: var(--color-ink); resize: vertical; }
        .fb-panel input[type=text]:focus, .fb-panel textarea:focus { outline: none; border-color: var(--color-accent); background: #fff; }
        .fb-pin { font-size: 12.5px; color: var(--color-ink-2); background: rgb(49 177 248 / .1); border-radius: 8px; padding: 8px 10px; }
        .fb-pin--general { background: var(--color-paper); }
        .fb-pin span { color: var(--color-navy); font-weight: 600; }
        .fb-pin button { background: none; border: none; color: var(--color-accent-deep); font-weight: 600; cursor: pointer; font-size: 12.5px; }
        .fb-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 14px; }
        .fb-back { background: none; border: none; color: var(--color-ink-3); font-weight: 600; cursor: pointer; font-size: 13px; }
        .fb-send { background: var(--color-accent); color: #fff; border: none; border-radius: 8px; padding: 11px 22px; font-size: 14px; font-weight: 700; cursor: pointer; }
        .fb-send:disabled { opacity: .6; }
        .fb-ok { padding: 22px 16px; text-align: center; color: var(--color-navy); font-weight: 600; }
        .fb-err { color: #c0392b; font-size: 13px; margin: 8px 0 0; }

        /* Capa de marcadores en el documento */
        .fb-layer { position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: 10000; }
        .fb-marker { position: absolute; transform: translate(-50%, -100%); font-size: 26px; filter: drop-shadow(0 3px 6px rgba(0,0,0,.35)); pointer-events: none; animation: fbdrop .25s ease; }
        @keyframes fbdrop { from { transform: translate(-50%, -140%); opacity: 0; } to { transform: translate(-50%, -100%); opacity: 1; } }
        .fb-dotwrap { position: absolute; transform: translate(-50%, -50%); }
        .fb-dot { width: 28px; height: 28px; border-radius: 999px; background: var(--color-accent); color: #fff; border: 2px solid #fff; font-weight: 700; font-size: 13px; cursor: pointer; box-shadow: 0 4px 12px -2px rgba(9,10,32,.4); display: flex; align-items: center; justify-content: center; }
        .fb-dot:hover { filter: brightness(.95); }
        .fb-dotpop { position: absolute; left: 50%; top: calc(100% + 8px); transform: translateX(-50%); width: 260px; max-width: 80vw; background: #fff; border: 1px solid var(--color-rule-strong); border-radius: 12px; box-shadow: 0 24px 60px -20px rgba(9,10,32,.5); padding: 0; overflow: hidden; }
        .fb-dotpop-head { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--color-navy); color: #fff; font-size: 13px; }
        .fb-dotpop-head button { background: none; border: none; color: rgba(255,255,255,.7); font-size: 18px; cursor: pointer; }
        .fb-dotpop-ctx { padding: 10px 14px 0; font-size: 12px; color: var(--color-ink-3); }
        .fb-dotpop-body { padding: 8px 14px 0; margin: 0; font-size: 13.5px; color: var(--color-ink); line-height: 1.5; white-space: pre-wrap; }
        .fb-dotpop-foot { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; font-size: 12px; color: var(--color-ink-3); }
        .fb-del { background: none; border: none; color: #c0392b; font-weight: 600; cursor: pointer; font-size: 12.5px; }
      `}</style>
    </div>
  );
}
