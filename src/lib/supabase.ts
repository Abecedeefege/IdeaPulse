import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;

let browserClient: SupabaseClient | null = null;

export const supabaseBrowser = () => {
  if (!browserClient) {
    browserClient = createClient(url, anon);
  }
  return browserClient;
};

export function supabaseServer() {
  if (!service) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for server");
  return createClient(url, service, { auth: { persistSession: false } });
}
