import Link from "next/link";

export type ContentSubTab = "posts" | "new" | "media";

const TABS: { key: ContentSubTab; label: string; href: string }[] = [
  { key: "posts", label: "Todos los posts", href: "/admin/content/" },
  { key: "new",   label: "+ Crear nuevo",   href: "/admin/posts/new/" },
  { key: "media", label: "Imágenes",        href: "/admin/media/" },
];

export default function ContentSubnav({ active }: { active: ContentSubTab }) {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid rgba(15,23,42,0.06)", padding: "0 28px" }}>
      <nav style={{ display: "flex", gap: 4, maxWidth: 1400, margin: "0 auto" }}>
        {TABS.map((t) => {
          const isActive = t.key === active;
          return (
            <Link
              key={t.key}
              href={t.href}
              style={{
                fontSize: 13,
                padding: "12px 14px",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#15163A" : "#6E7488",
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #31B1F8" : "2px solid transparent",
                marginBottom: -1,
              }}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
