import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient, getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import AdminTopbar from "@/components/AdminTopbar";
import CasosTagsTable, { TagRow } from "@/components/CasosTagsTable";
import { SECTORS, PRODUCTOS, USOS } from "@/app/api/admin/casos-tags/route";

export const dynamic = "force-dynamic";

type JsonCaso = {
  nombre: string; slug?: string; sector?: string[]; productos?: string[];
  casosDeUso?: string[]; prioridad?: number; pendiente?: boolean; nota?: string;
};

// Fallback: lee los tags del fichero versionado del repo (fuente de verdad),
// para poder VER/filtrar/ordenar aunque la tabla de Supabase aún no exista.
function readTagsFromFile(): TagRow[] {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "data", "case-studies-tags.json"), "utf-8");
    const { casos } = JSON.parse(raw) as { casos: JsonCaso[] };
    return (casos || []).map((c) => ({
      nombre: c.nombre,
      slug: c.slug || "",
      sector: c.sector || [],
      productos: c.productos || [],
      casos_de_uso: c.casosDeUso || [],
      prioridad: c.prioridad ?? 0,
      pendiente: !!c.pendiente,
      nota: c.nota || "",
    }));
  } catch {
    return [];
  }
}

export default async function CasosExitoPage() {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) redirect(`/admin/login/?next=${encodeURIComponent("/admin/casos-exito/")}`);

  const db = createSupabaseAdminClient();
  const { data, error } = await db.from("case_study_tags").select("*").order("nombre", { ascending: true });

  // Con tabla → editable. Sin tabla (o vacía) → fallback al JSON en solo-lectura.
  const hasTable = !error && Array.isArray(data);
  const rows: TagRow[] = hasTable && data!.length ? (data as TagRow[]) : readTagsFromFile();
  const readOnly = !hasTable;

  const wrap: React.CSSProperties = { minHeight: "100vh", background: "#F6F7FB", fontFamily: '-apple-system, "Segoe UI", "Inter", sans-serif', color: "#15163A" };
  const inner: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "28px 20px" };

  return (
    <div style={wrap}>
      <AdminTopbar email={email} active="casos" />
      <div style={inner}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 4px" }}>Casos de éxito · etiquetas</h1>
        <p style={{ fontSize: 13.5, color: "#6E7488", margin: "0 0 20px" }}>Sector, producto y caso de uso de cada caso. Filtra y ordena; {readOnly ? "la edición se activa al crear la tabla en Supabase." : "los cambios se guardan al instante."}</p>
        {readOnly && (
          <div style={{ background: "#FFF3D6", border: "1px solid #F5D98B", borderRadius: 12, padding: "14px 18px", fontSize: 13, lineHeight: 1.6, color: "#7a4f00", marginBottom: 18 }}>
            <b>Modo solo-lectura.</b> Estás viendo los tags del fichero del repo. Para poder <b>editar</b> desde aquí, ejecuta una vez este SQL en el editor SQL de Supabase (proyecto Flame) y recarga:
            <pre style={{ marginTop: 10, padding: 14, background: "#15163A", color: "#dbe4ff", borderRadius: 8, overflowX: "auto", fontSize: 12 }}>{`create table if not exists public.case_study_tags (
  nombre text primary key, slug text not null default '',
  sector text[] not null default '{}', productos text[] not null default '{}',
  casos_de_uso text[] not null default '{}', prioridad int not null default 0,
  pendiente boolean not null default false, nota text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.case_study_tags enable row level security;
create policy "case_study_tags_read" on public.case_study_tags for select using (true);`}</pre>
            Después, se puebla con <code>node scripts/casos-exito/upsert-tags.mjs</code>.
          </div>
        )}
        <CasosTagsTable rows={rows} vocab={{ sector: SECTORS, productos: PRODUCTOS, casosDeUso: USOS }} readOnly={readOnly} />
      </div>
    </div>
  );
}
