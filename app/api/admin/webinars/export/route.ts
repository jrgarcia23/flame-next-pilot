import { NextRequest } from "next/server";
import { getCurrentUserEmail, isEmailAllowed } from "@/lib/supabase-admin";
import { buildCsv, csvResponse, fetchForExport, parseIdsParam } from "@/lib/csv-export";

export const dynamic = "force-dynamic";

const COLS = [
  "id", "created_at", "nombre", "empresa", "email", "cargo", "sector", "pais",
  "webinar_name", "webinar_date", "mensaje",
  "pagina", "page_url", "page_path", "referrer",
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "gclid", "fbclid", "msclkid",
  "source", "medium", "campaign", "ga_client_id",
];

export async function GET(req: NextRequest) {
  const email = await getCurrentUserEmail();
  if (!email || !isEmailAllowed(email)) return new Response("Unauthorized", { status: 401 });

  const url = new URL(req.url);
  const ids = parseIdsParam(url.searchParams.get("ids"));
  const rows = await fetchForExport("webinar_registrations", ids);
  const csv = buildCsv(rows, COLS);
  const stamp = new Date().toISOString().slice(0, 10);
  return csvResponse(csv, `flame-webinars-${stamp}.csv`);
}
