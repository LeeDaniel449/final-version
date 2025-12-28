import { createBrowserClient } from "@supabase/ssr"

// Create a Supabase client for browser use
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Get current user from Supabase
export async function getCurrentUser() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

// Sign in with Clerk user ID to Supabase
export async function signInWithClerkId(clerkUserId: string) {
  const supabase = createClient()

  // Use Clerk user ID as the key for Supabase session
  const { data, error } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        clerk_user_id: clerkUserId,
      },
    },
  })

  if (error) {
    console.error("[v0] Supabase sign-in error:", error)
    return null
  }

  return data.user
}
