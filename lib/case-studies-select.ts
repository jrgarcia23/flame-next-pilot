// Selector de casos de éxito por etiquetas (sector / caso de uso / producto).
// Fuente: data/case-studies-tags.json. Lógica de "incluir otros": si una sección
// no llega a `limit` con los casos que casan, se completa con TODOS los demás casos
// (por prioridad). Ver data/case-studies-tags.json (_meta) para el vocabulario.

import tagsData from "@/data/case-studies-tags.json";

export type CaseTag = {
  nombre: string;
  slug: string;
  slugEn?: string;
  sector: string[];
  productos: string[];
  casosDeUso: string[];
  prioridad?: number;
  pendiente?: boolean;
  revisar?: boolean;
  nota?: string;
};

export type CaseFilter = { sector?: string; casoDeUso?: string; producto?: string };

const CASES: CaseTag[] = (tagsData as { casos: CaseTag[] }).casos;

function matches(c: CaseTag, f: CaseFilter): boolean {
  if (f.sector && !c.sector.includes(f.sector)) return false;
  if (f.casoDeUso && !c.casosDeUso.includes(f.casoDeUso)) return false;
  if (f.producto && !c.productos.includes(f.producto)) return false;
  return true;
}

const byPrioridad = (a: CaseTag, b: CaseTag) => (b.prioridad ?? 0) - (a.prioridad ?? 0);

/**
 * Devuelve hasta `limit` casos para una sección:
 *  1) los que casan con el filtro, ordenados por prioridad;
 *  2) si faltan, se completan con el resto de casos (relleno "otros"), por prioridad.
 * Por defecto solo casos con página publicada (slug no vacío).
 * Cada resultado lleva `esRelleno` para poder distinguirlo visualmente si se quiere.
 */
export function selectCases(
  f: CaseFilter,
  limit = 3,
  soloConPagina = true,
): Array<CaseTag & { esRelleno: boolean }> {
  const pool = CASES.filter((c) => !soloConPagina || c.slug);
  const nativos = pool.filter((c) => matches(c, f)).sort(byPrioridad);
  const out: Array<CaseTag & { esRelleno: boolean }> = nativos
    .slice(0, limit)
    .map((c) => ({ ...c, esRelleno: false }));
  if (out.length < limit) {
    const usados = new Set(out.map((c) => c.slug || c.nombre));
    const relleno = pool.filter((c) => !usados.has(c.slug || c.nombre)).sort(byPrioridad);
    for (const c of relleno) {
      if (out.length >= limit) break;
      out.push({ ...c, esRelleno: true });
    }
  }
  return out;
}

export function allCaseTags(): CaseTag[] {
  return CASES;
}
