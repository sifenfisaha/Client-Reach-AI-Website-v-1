import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;
let clientInitialized = false;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Environment variables missing - client will be null
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    clientInitialized = true;
  }
} catch (error) {
  // Failed to initialize - client will be null
  clientInitialized = false;
}

export { supabase };

export function isSupabaseClientAvailable(): boolean {
  return clientInitialized && supabase !== null;
}
