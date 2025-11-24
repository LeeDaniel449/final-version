import { NextResponse } from "next/server"

export async function GET() {
  const envStatus = {
    clerkPublishableKey: !!(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
      process.env.CLERK_PUBLISHABLE_KEY
    ),
    clerkSecretKey: !!(process.env.CLERK_SECRET_KEY || process.env.Wealthlink_CLERK_SECRET_KEY),
    supabaseUrl: !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.POSTGRES_URL),
    supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    postgresUrl: !!process.env.POSTGRES_URL,
  }

  return NextResponse.json(envStatus)
}
