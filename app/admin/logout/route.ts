import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://flame-next.vercel.app";

export async function POST() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/admin/login/", SITE), { status: 303 });
}

export function GET() {
  return NextResponse.redirect(new URL("/admin/leads/", SITE));
}
