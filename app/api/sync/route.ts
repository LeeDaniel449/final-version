import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const syncToken = cookieStore.get("sync_token")?.value

    if (!syncToken) {
      return NextResponse.json({ user: null, data: null })
    }

    const supabase = createClient()

    // Get user data from database using sync token
    const { data, error } = await supabase.from("user_data").select("*").eq("user_id", syncToken).single()

    if (error || !data) {
      return NextResponse.json({ user: syncToken, data: null })
    }

    return NextResponse.json({
      user: syncToken,
      data: data.data,
    })
  } catch (error) {
    console.error("[Server] Sync error:", error)
    return NextResponse.json({ user: null, data: null })
  }
}

export async function POST(request: Request) {
  try {
    const { userId, data: userData } = await request.json()

    if (!userId) {
      return NextResponse.json({ success: false, error: "No user ID" }, { status: 400 })
    }

    const supabase = createClient()

    // Upsert data to database
    const { error } = await supabase.from("user_data").upsert({
      user_id: userId,
      data: userData,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("[Server] Save error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Set sync token cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set("sync_token", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })

    return response
  } catch (error) {
    console.error("[Server] Sync error:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
