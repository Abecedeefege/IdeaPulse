import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

let browserClient: SupabaseClient | null = null;

export const supabaseBrowser = (): SupabaseClient => {
  if (!browserClient) {
    browserClient = createBrowserClient(url, anon) as unknown as SupabaseClient;
  }
  return browserClient;
};

export function supabaseServer() {
  if (!service) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for server");
  return createClient(url, service, { auth: { persistSession: false } });
}
