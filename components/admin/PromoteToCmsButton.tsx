"use client";

import { useState } from "react";

type Props = {
  lang: string;
  slug: string;
  type?: string;
  label?: string;
  style?: React.CSSProperties;
};

export default function PromoteToCmsButton({ lang, slug, type = "post", label = "Editar", style }: Props) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/content/promote-to-cms/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, slug, type }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        alert(`No se pudo abrir el editor: ${data?.error || res.status}`);
        setBusy(false);
        return;
      }
      window.location.href = `/admin/posts/${data.post.id}/`;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      alert(`Error de red: ${msg}`);
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      style={{
        padding: "4px 10px",
        borderRadius: 6,
        fontSize: 11,
        border: "1px solid rgba(15,23,42,0.16)",
        background: "#fff",
        cursor: busy ? "wait" : "pointer",
        color: "#15163A",
        fontFamily: "inherit",
        fontWeight: 500,
        opacity: busy ? 0.6 : 1,
        ...style,
      }}
    >
      {busy ? "Abriendo…" : label}
    </button>
  );
}
