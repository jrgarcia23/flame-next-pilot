"use client";

import { useEffect, useState } from "react";

type Item = { id: string; created_at: string; sector: string; sector_label?: string; page_url?: string; author?: string | null; kind: string; x?: number | null; y?: number | null; body: string };

export default function FeedbackPanel() {
  const [token, setToken] = useState("");
  const [input, setInput] = useState("");
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token") || "";
    if (t) { setToken(t); setInput(t); }
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true); setError("");
    fetch(`/api/feedback?token=${encodeURIComponent(token)}`)
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((d) => setItems(d.items || []))
      .catch((s) => setError(s === 401 ? "Token incorrecto." : "Error al cargar."))
      .finally(() => setLoading(false));
  }, [token]);

  const fmt = (iso: string) => { try { return new Date(iso).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" }); } catch { return iso; } };

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-paper)", fontFamily: "var(--font-body)", padding: "clamp(32px,6vw,72px) 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "clamp(26px,3.6vw,40px)", color: "var(--color-navy)", letterSpacing: "-0.02em", margin: "0 0 6px" }}>Feedback de la preview de sectores</h1>
        <p style={{ color: "var(--color-ink-2)", margin: "0 0 28px", fontSize: 15 }}>Comentarios del equipo comercial sobre los borradores.</p>

        {!token && (
          <form onSubmit={(e) => { e.preventDefault(); setToken(input.trim()); }} style={{ display: "flex", gap: 10, marginBottom: 24 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Token de acceso" style={{ flex: 1, padding: "12px 14px", borderRadius: 9, border: "1px solid var(--color-rule-strong)", fontSize: 15 }} />
            <button type="submit" style={{ background: "var(--color-navy)", color: "#fff", border: "none", borderRadius: 9, padding: "0 22px", fontWeight: 700, cursor: "pointer" }}>Ver</button>
          </form>
        )}

        {loading && <p style={{ color: "var(--color-ink-3)" }}>Cargando…</p>}
        {error && <p style={{ color: "#c0392b", fontWeight: 600 }}>{error}</p>}

        {items && (
          <>
            <p style={{ color: "var(--color-ink-3)", fontSize: 13.5, marginBottom: 16 }}>{items.length} comentario{items.length === 1 ? "" : "s"}</p>
            <div style={{ display: "grid", gap: 14 }}>
              {items.map((it) => (
                <article key={it.id} style={{ background: "#fff", border: "1px solid var(--color-rule)", borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-accent-deep)", background: "rgb(49 177 248 / 0.12)", borderRadius: 999, padding: "3px 10px" }}>{it.sector_label || it.sector}</span>
                    {it.kind === "pin" && <span style={{ fontSize: 12, color: "var(--color-ink-3)" }}>📍 punto{it.x != null ? ` (${it.x}%, ${it.y}%)` : ""}</span>}
                    <span style={{ marginLeft: "auto", fontSize: 12.5, color: "var(--color-ink-3)" }}>{fmt(it.created_at)}</span>
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--color-ink)", margin: "0 0 8px", whiteSpace: "pre-wrap" }}>{it.body}</p>
                  <div style={{ fontSize: 12.5, color: "var(--color-ink-3)" }}>
                    {it.author ? <strong style={{ color: "var(--color-navy)" }}>{it.author}</strong> : <em>Anónimo</em>}
                    {it.page_url && <> · <a href={it.page_url} target="_blank" rel="noopener" style={{ color: "var(--color-accent-deep)" }}>{it.page_url}</a></>}
                  </div>
                </article>
              ))}
              {items.length === 0 && <p style={{ color: "var(--color-ink-3)" }}>Aún no hay comentarios.</p>}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
