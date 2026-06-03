// CSV builder + Supabase fetcher genérico para admin export endpoints.
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function buildCsv(rows: Record<string, unknown>[], columns: string[]): string {
  const lines = [columns.map(csvCell).join(",")];
  for (const row of rows) {
    lines.push(columns.map((c) => csvCell(row[c])).join(","));
  }
  return "﻿" + lines.join("\r\n"); // BOM para Excel
}

export async function fetchForExport(table: string, ids?: number[], maxRows = 5000) {
  const supabase = createSupabaseAdminClient();
  let q = supabase.from(table).select("*").order("created_at", { ascending: false }).limit(maxRows);
  if (ids && ids.length > 0) q = q.in("id", ids);
  const { data } = await q;
  return (data || []) as Record<string, unknown>[];
}

export function csvResponse(csv: string, filename: string) {
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

export function parseIdsParam(idsRaw: string | null): number[] | undefined {
  if (!idsRaw) return undefined;
  const ids: number[] = [];
  for (const s of idsRaw.split(",")) {
    const n = Number(s.trim());
    if (Number.isInteger(n) && n > 0) ids.push(n);
  }
  return ids.length ? ids : undefined;
}
