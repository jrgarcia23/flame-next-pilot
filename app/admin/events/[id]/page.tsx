import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createSupabaseAdminClient, getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import { DeleteRegistrationButton } from "@/components/RegistrationDetail";

export const dynamic = "force-dynamic";

function fmt(date: string | null): string {
  if (!date) return "—";
  return new Date(date).toLocaleString("es-ES", { timeZone: "Europe/Madrid", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Row({ label, value, mono = false }: { label: string; value: string | null | React.ReactNode; mono?: boolean }) {
  if (!value) return null;
  return (
    <>
      <dt style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.04em", color: "#6E7488", fontWeight: 600, paddingTop: 2 }}>{label}</dt>
      <dd style={{ fontSize: 13, color: "#15163A", margin: 0, wordBreak: "break-word", lineHeight: 1.5, ...(mono ? { fontFamily: 'ui-monospace,"SF Mono",Menlo,monospace', fontSize: 11, color: "#4A4F66" } : {}) }}>{value}</dd>
    </>
  );
}

const accentDeep = "#1E89C7";
const orange = "#FE5000";

export default async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent(`/admin/events/${id}/`)}`);

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase.from("event_registrations").select("*").eq("id", parseInt(id)).single();
  if (error || !data) notFound();
  const reg = data as Record<string, string | null>;

  return (
    <div style={{ minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" }}>
      <AdminTopbar email={email} active="events" />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "28px 32px" }}>
        <Link href="/admin/events/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color: "#6E7488", textDecoration: "none", marginBottom: 12, padding: "4px 8px", borderRadius: 6 }}>
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Volver a eventos
        </Link>
        <p style={{ fontSize: 12, color: "#6E7488", margin: "0 0 4px 0" }}>
          <Link href="/admin/events/" style={{ color: "#6E7488", textDecoration: "none" }}>Inicio · Eventos</Link> · #{reg.id}
        </p>

        <div style={{ background: "#fff", border: "1px solid rgba(15,23,42,0.08)", borderRadius: 12, overflow: "hidden", marginTop: 12 }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(15,23,42,0.08)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 4px 0" }}>{reg.empresa}</h1>
              <p style={{ fontSize: 12, color: "#6E7488", margin: 0 }}>
                Inscripción #{reg.id} ·{" "}
                <a href={`mailto:${reg.email}`} style={{ color: accentDeep, textDecoration: "none" }}>{reg.email}</a>
                {" · "}{fmt(reg.created_at as string)}
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <a href={`mailto:${reg.email}?subject=Re%3A%20Tu%20inscripci%C3%B3n%20a%20${encodeURIComponent(reg.event_name || "")}`} style={{ padding: "8px 14px", borderRadius: 6, background: "#31B1F8", color: "#fff", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>Responder por email</a>
              <DeleteRegistrationButton id={parseInt(id)} apiPath="/api/admin/events/" backTo="/admin/events/" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="lead-grid">
            <div style={{ padding: "24px 28px", borderRight: "1px solid rgba(15,23,42,0.08)" }}>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accentDeep, margin: "0 0 16px 0" }}>Datos del inscrito</h4>
              <dl style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "10px 16px", fontSize: 13, margin: 0 }}>
                <Row label="Nombre" value={reg.nombre} />
                <Row label="Email" value={<a href={`mailto:${reg.email}`} style={{ color: accentDeep, textDecoration: "none" }}>{reg.email}</a>} />
                <Row label="Empresa" value={reg.empresa} />
                <Row label="Cargo" value={reg.cargo} />
                <Row label="Sector" value={reg.sector} />
                <Row label="País" value={reg.pais} />
              </dl>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: accentDeep, margin: "24px 0 12px 0" }}>Evento</h4>
              <dl style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "10px 16px", fontSize: 13, margin: 0 }}>
                <Row label="Nombre" value={reg.event_name} />
                <Row label="Fecha" value={reg.event_date ? fmt(reg.event_date) : null} />
              </dl>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: orange, margin: "0 0 16px 0" }}>Origen y analítica</h4>
              <dl style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "10px 16px", fontSize: 13, margin: 0 }}>
                <Row label="Página" value={reg.pagina} />
                <Row label="URL" value={reg.page_url ? <a href={reg.page_url} target="_blank" rel="noopener" style={{ color: accentDeep, textDecoration: "none", fontFamily: 'ui-monospace,"SF Mono",Menlo,monospace', fontSize: 11, wordBreak: "break-all" }}>{reg.page_url}</a> : null} />
                <Row label="Path" value={reg.page_path} mono />
                <Row label="Fuente" value={reg.source} />
                <Row label="Medio" value={reg.medium} />
                <Row label="Campaña" value={reg.campaign && reg.campaign !== "(not set)" ? reg.campaign : null} />
                <Row label="UTM Source" value={reg.utm_source} mono />
                <Row label="UTM Medium" value={reg.utm_medium} mono />
                <Row label="UTM Campaign" value={reg.utm_campaign} mono />
                <Row label="UTM Term" value={reg.utm_term} mono />
                <Row label="UTM Content" value={reg.utm_content} mono />
                <Row label="Referrer" value={reg.referrer} mono />
                <Row label="GCLID" value={reg.gclid} mono />
                <Row label="FBCLID" value={reg.fbclid} mono />
                <Row label="MSCLKID" value={reg.msclkid} mono />
                <Row label="GA4 Client ID" value={reg.ga_client_id} mono />
              </dl>
            </div>
          </div>

          {reg.mensaje && (
            <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(15,23,42,0.08)" }}>
              <h4 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6E7488", margin: "0 0 12px 0" }}>Mensaje</h4>
              <p style={{ fontSize: 14, color: "#4A4F66", lineHeight: 1.65, whiteSpace: "pre-wrap", margin: 0 }}>{reg.mensaje}</p>
            </div>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 800px) {
          .lead-grid { grid-template-columns: 1fr !important; }
          .lead-grid > div:first-child { border-right: 0 !important; border-bottom: 1px solid rgba(15,23,42,0.08); }
        }
      `}} />
    </div>
  );
}
