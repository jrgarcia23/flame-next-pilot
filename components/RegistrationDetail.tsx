"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteRegistrationButton({ id, apiPath, backTo }: { id: number; apiPath: string; backTo: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!window.confirm("¿Eliminar este registro? Esta acción no se puede deshacer.")) return;
    setPending(true);
    try {
      const res = await fetch(apiPath, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids: [id] }) });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        alert(j?.error || "Error al borrar.");
        setPending(false); return;
      }
      router.replace(backTo);
    } catch {
      alert("Error de red al borrar.");
      setPending(false);
    }
  }

  return (
    <button type="button" onClick={handleDelete} disabled={pending} style={{ padding: "8px 14px", borderRadius: 6, background: "#fff", color: "#DC2626", border: "1px solid #FECACA", fontSize: 12, fontWeight: 600, cursor: pending ? "not-allowed" : "pointer", opacity: pending ? 0.6 : 1 }}>
      {pending ? "Eliminando…" : "Eliminar"}
    </button>
  );
}
