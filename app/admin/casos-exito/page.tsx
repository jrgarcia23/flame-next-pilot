import { redirect } from "next/navigation";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import CasosTagsTable, { TagRow } from "@/components/CasosTagsTable";
import { SECTORS, PRODUCTOS, USOS } from "@/app/api/admin/casos-tags/route";
import { readCasosTags } from "@/lib/casos-tags-store";

export const dynamic = "force-dynamic";

export default async function CasosExitoPage() {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/casos-exito/")}`);

  const { doc } = await readCasosTags();
  const rows: TagRow[] = doc.casos.map((c) => ({
    nombre: c.nombre,
    slug: c.slug || "",
    sector: c.sector,
    productos: c.productos,
    casos_de_uso: c.casosDeUso,
    prioridad: c.prioridad ?? 0,
    pendiente: !!c.pendiente,
    nota: c.nota,
  }));

  const wrap: React.CSSProperties = { minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" };
  const inner: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "28px 20px" };

  return (
    <div style={wrap}>
      <AdminTopbar email={email} active="casos" />
      <div style={inner}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Casos de éxito · etiquetas</h1>
        <p style={{ fontSize: 13.5, color: "#6E7488", margin: "0 0 20px" }}>Pon y quita sector, producto y caso de uso en cada caso. Filtra, ordena y edita; los cambios se guardan al instante.</p>
        <CasosTagsTable rows={rows} vocab={{ sector: SECTORS, productos: PRODUCTOS, casosDeUso: USOS }} />
      </div>
    </div>
  );
}
