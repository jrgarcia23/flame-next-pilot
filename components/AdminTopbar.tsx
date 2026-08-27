import Link from "next/link";

export type AdminSection = "leads" | "descargas" | "events" | "webinars" | "content" | "media";

const NAV: { key: AdminSection; label: string; href: string }[] = [
  { key: "leads",     label: "Leads",         href: "/admin/leads/" },
  { key: "descargas", label: "Descargas PDF", href: "/admin/descargas/" },
  { key: "events",    label: "Eventos",       href: "/admin/events/" },
  { key: "webinars", label: "Webinar",    href: "/admin/webinars/" },
  { key: "content",  label: "Contenidos", href: "/admin/content/" },
  { key: "media",    label: "Imágenes",   href: "/admin/media/" },
];

export default function AdminTopbar({ email, active = "leads" }: { email: string; active?: AdminSection }) {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid rgba(15,23,42,0.08)", padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/admin/leads/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/wp-content/uploads/2023/10/flame-logo-black.png" alt="Flame Analytics" style={{ height: 24, width: "auto", display: "block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488", background: "#F6F7FB", padding: "2px 8px", borderRadius: 999 }}>Back office</span>
        </Link>
        <nav style={{ display: "flex", gap: 4 }}>
          {NAV.map((n) => {
            const isActive = n.key === active;
            return (
              <Link
                key={n.key}
                href={n.href}
                style={{
                  fontSize: 13,
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontWeight: 500,
                  background: isActive ? "#F6F7FB" : "transparent",
                  color: isActive ? "#15163A" : "#6E7488",
                  textDecoration: "none",
                }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 12, color: "#6E7488" }}>{email}</span>
        <form action="/admin/logout/" method="post" style={{ margin: 0 }}>
          <button type="submit" style={{ fontSize: 12, color: "#6E7488", padding: "6px 12px", borderRadius: 6, border: 0, background: "transparent", cursor: "pointer" }}>Cerrar sesión</button>
        </form>
      </div>
    </header>
  );
}
