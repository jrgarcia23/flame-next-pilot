"use client";
import { useState, useEffect, useCallback, FormEvent, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function LoginContent() {
  const params = useSearchParams();
  const router = useRouter();
  const errorParam = params.get("error");
  const next = params.get("next") || "/admin/leads/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState<string>("");
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [lockSec, setLockSec] = useState(0);

  const refreshCaptcha = useCallback(async () => {
    setLoadingCaptcha(true);
    setCaptchaAnswer("");
    try {
      const res = await fetch("/api/admin/auth/captcha", { cache: "no-store", credentials: "include" });
      const data = await res.json();
      if (res.ok && data?.question) setCaptchaQuestion(data.question);
      else setCaptchaQuestion("");
    } catch {
      setCaptchaQuestion("");
    } finally {
      setLoadingCaptcha(false);
    }
  }, []);

  useEffect(() => { refreshCaptcha(); }, [refreshCaptcha]);
  useEffect(() => {
    if (lockSec <= 0) return;
    const id = setInterval(() => setLockSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [lockSec]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lockSec > 0) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password, captcha: captchaAnswer.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        router.replace(next.startsWith("/admin") ? next : "/admin/leads/");
        return;
      }
      if (res.status === 429 && data?.locked) {
        setLockSec(Number(data.retryInSec) || 900);
        setErrorMsg(data.error || "Cuenta bloqueada temporalmente.");
      } else {
        setErrorMsg(data?.error || "No se pudo iniciar sesión.");
      }
      setStatus("idle");
      await refreshCaptcha();
    } catch {
      setStatus("idle");
      setErrorMsg("Error de red. Inténtalo de nuevo.");
      await refreshCaptcha();
    }
  }

  const lockMin = Math.floor(lockSec / 60);
  const lockS = lockSec % 60;

  return (
    <div style={{ minHeight: "100vh", background: "#15163A", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ maxWidth: 420, width: "100%", background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 16, padding: 36, textAlign: "center", boxShadow: "0 20px 60px -20px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          <img src="/wp-content/uploads/2023/10/flame-logo-black.png" alt="Flame Analytics" style={{ height: 28, width: "auto", display: "block" }} />
        </div>
        <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 8, color: "#15163A" }}>Acceso interno</h1>
        <p style={{ fontSize: 13, color: "#6E7488", marginBottom: 24, lineHeight: 1.5 }}>
          Back office privado. Solo cuentas autorizadas.
        </p>

        {(errorParam === "not_allowed") && (
          <div style={{ marginBottom: 16, padding: 12, borderRadius: 8, background: "rgba(254,80,0,0.06)", border: "1px solid rgba(254,80,0,0.15)", fontSize: 12, color: "#FE5000" }}>
            Este email no está autorizado.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488", marginBottom: 6 }}>Email</label>
            <input type="email" required autoFocus autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@flameanalytics.com" maxLength={200} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488", marginBottom: 6 }}>Contraseña</label>
            <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" maxLength={200} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488", marginBottom: 6 }}>Verificación</label>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "#F6F7FB", border: "1px solid rgba(15,23,42,0.08)", fontSize: 14, fontFamily: "ui-monospace,SF Mono,Menlo,monospace", letterSpacing: "0.04em", minWidth: 110, justifyContent: "center", userSelect: "none" }}>
                {loadingCaptcha ? "…" : (captchaQuestion ? `${captchaQuestion} =` : "?")}
              </div>
              <input type="text" inputMode="numeric" pattern="-?[0-9]*" required value={captchaAnswer} onChange={(e) => setCaptchaAnswer(e.target.value)} placeholder="?" maxLength={4} style={{ ...inputStyle, flex: 1, textAlign: "center" }} />
              <button type="button" onClick={refreshCaptcha} aria-label="Refrescar" title="Refrescar" style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(15,23,42,0.08)", background: "#fff", fontSize: 14, color: "#6E7488", cursor: "pointer" }}>↻</button>
            </div>
            <p style={{ fontSize: 11, color: "#6E7488", marginTop: 6 }}>Resuelve la operación para verificar que no eres un bot.</p>
          </div>

          <button type="submit" disabled={status === "sending" || lockSec > 0} style={{ width: "100%", padding: "12px 16px", borderRadius: 8, background: lockSec > 0 ? "#6E7488" : "#31B1F8", color: "#fff", fontWeight: 700, fontSize: 14, border: 0, cursor: status === "sending" || lockSec > 0 ? "not-allowed" : "pointer", opacity: status === "sending" || lockSec > 0 ? 0.7 : 1, marginTop: 8, transition: "all 200ms" }}>
            {lockSec > 0 ? `Bloqueado · ${lockMin}:${String(lockS).padStart(2, "0")}` : status === "sending" ? "Verificando…" : "Entrar →"}
          </button>

          {errorMsg && lockSec === 0 && (<p style={{ fontSize: 12, color: "#FE5000", textAlign: "center", margin: 0 }}>{errorMsg}</p>)}
          {lockSec > 0 && (<p style={{ fontSize: 12, color: "#FE5000", textAlign: "center", margin: 0 }}>Demasiados intentos. Vuelve a probar en {lockMin > 0 ? `${lockMin} min ` : ""}{lockS} s.</p>)}
        </form>

        <p style={{ fontSize: 11, color: "#6E7488", marginTop: 20, lineHeight: 1.5 }}>5 intentos fallidos bloquean el acceso 15 minutos.</p>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid rgba(15,23,42,0.1)",
  background: "#fff",
  fontSize: 14,
  color: "#15163A",
  outline: "none",
  fontFamily: "inherit",
};

export default function LoginPage() {
  return (<Suspense fallback={null}><LoginContent /></Suspense>);
}
