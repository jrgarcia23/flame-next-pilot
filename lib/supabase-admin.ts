// Clientes Supabase para el back office /admin de Flame.
// Solo server-side. La service_role NUNCA llega al cliente.

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/** Cliente con cookies (auth state en RSC, server actions, route handlers). */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // En RSC puro, set() lanza. El middleware ya refresca cookies, lo ignoramos.
        }
      },
    },
  });
}

/** Cliente admin con service_role: salta RLS. Solo server-side desde /admin. */
export function createSupabaseAdminClient() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Whitelist de emails autorizados para entrar al back office. */
export function getAllowedEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS || "";
  return raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

export function isEmailAllowed(email: string): boolean {
  if (!email) return false;
  return getAllowedEmails().includes(email.trim().toLowerCase());
}

export async function getCurrentUserEmail(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.email || null;
}
