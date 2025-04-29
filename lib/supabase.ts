import type { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { CookieOptions } from "@supabase/auth-helpers-nextjs"

// Define types for our singleton
type SupabaseClient = ReturnType<typeof createClient>

// Global instances to ensure we only create one client per environment
const browserClient: SupabaseClient | null = null

// Create a single supabase client for the browser with proper session persistence
export const createBrowserClient = () => {
  // For client components, use the client component client which handles cookies properly
  return createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options: {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  })
}

// Create a server component client that can access cookies
export const createServerClient = () => {
  // For server components, use the server component client
  return createServerComponentClient({ cookies })
}

// Cookie configuration for secure session handling
export const cookieOptions: CookieOptions = {
  name: "sb-session",
  lifetime: 60 * 60 * 24 * 7, // 1 week
  domain: process.env.NODE_ENV === "production" ? process.env.DOMAIN : "localhost",
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
}
