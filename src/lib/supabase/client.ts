import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check for service role key (should NOT be used in client-side code)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (serviceRoleKey && process.env.NODE_ENV === "development") {
  console.warn(
    "⚠️ SUPABASE_SERVICE_ROLE_KEY is set but should NOT be used in client-side code. Use NEXT_PUBLIC_SUPABASE_ANON_KEY instead."
  );
}

// Create Supabase client with error handling
let supabase: SupabaseClient | null = null;
let clientInitialized = false;

try {
  // Validate environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "⚠️ Supabase environment variables are missing. Forms will not work until configured."
      );
      console.warn(
        "Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
      );
    }
  } else {
    // Verify we're using ANON key, not service role key
    // ANON keys typically start with 'eyJ' (JWT format) and are JWT tokens
    // Service role keys are longer and have different structure
    const isAnonKey = supabaseAnonKey.startsWith("eyJ");
    const isServiceRoleKey =
      supabaseAnonKey.length > 200 && !supabaseAnonKey.startsWith("eyJ");

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Supabase Client Initialization:");
      console.log("  - URL:", supabaseUrl);
      console.log("  - Key Type: ANON (client-side)");
      console.log("  - Key Length:", supabaseAnonKey.length);
      console.log("  - Key Prefix:", supabaseAnonKey.substring(0, 20) + "...");
      console.log(
        "  - Appears to be ANON key:",
        isAnonKey ? "✅ Yes" : "❌ No"
      );

      if (isServiceRoleKey) {
        console.error(
          "❌ ERROR: Service role key detected! This should NEVER be used in client-side code."
        );
        console.error("  - Use NEXT_PUBLIC_SUPABASE_ANON_KEY instead");
        console.error(
          "  - Service role keys bypass RLS and are a security risk"
        );
      }

      if (!isAnonKey && !isServiceRoleKey) {
        console.warn(
          "⚠️ Key format is unusual. Ensure you're using the correct ANON key from Supabase dashboard."
        );
      }
    }

    // Create and export Supabase client
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    clientInitialized = true;

    if (process.env.NODE_ENV === "development") {
      console.log("✅ Supabase client initialized successfully");
    }
  }
} catch (error) {
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Failed to initialize Supabase client:", error);
    if (error instanceof Error) {
      console.error("  - Error message:", error.message);
      console.error("  - Error stack:", error.stack);
    }
  }
  clientInitialized = false;
}

// Export client (may be null if initialization failed)
export { supabase };

// Export helper to check if client is available
export function isSupabaseClientAvailable(): boolean {
  return clientInitialized && supabase !== null;
}
