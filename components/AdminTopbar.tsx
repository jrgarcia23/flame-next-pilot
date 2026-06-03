import Link from "next/link";

export default function AdminTopbar({ email }: { email: string }) {
  return (
    <header style={{ background: "#fff", borderBottom: "1px solid rgba(15,23,42,0.08)", padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/admin/leads/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img src="/wp-content/uploads/2023/10/flame-logo-black.png" alt="Flame Analytics" style={{ height: 24, width: "auto", display: "block" }} />
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "#6E7488", background: "#F6F7FB", padding: "2px 8px", borderRadius: 999 }}>Back office</span>
        </Link>
        <nav style={{ display: "flex", gap: 4 }}>
          <Link href="/admin/leads/" style={{ fontSize: 13, padding: "6px 12px", borderRadius: 6, fontWeight: 500, background: "#F6F7FB", color: "#15163A", textDecoration: "none" }}>Leads</Link>
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
