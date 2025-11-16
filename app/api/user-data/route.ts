import { createClient } from "@/lib/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    let userId: string | null = null
    let userEmail: string | null = null

    try {
      const authResult = await auth()
      userId = authResult.userId
      userEmail = authResult.user?.emailAddresses?.[0]?.emailAddress || null
    } catch (error) {
      console.log("[v0] Clerk auth not available, checking fallback auth")
    }

    if (!userId) {
      const fallbackUserId = request.headers.get("x-user-id")
      if (fallbackUserId) {
        userId = fallbackUserId
        userEmail = fallbackUserId
        console.log("[v0] Using fallback user ID:", userId)
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("user_data")
      .select("data")
      .eq("clerk_user_id", userId)
      .single()

    if (error) {
      if (error.message.includes("Could not find the table")) {
        console.log("[v0] Database table not created yet - returning empty data")
        return NextResponse.json({ data: {}, tableNotFound: true })
      }
      if (error.code !== "PGRST116") {
        console.error("[v0] Database error:", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ data: data?.data || {} })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    let userId: string | null = null
    let userEmail: string | null = null

    try {
      const authResult = await auth()
      userId = authResult.userId
      userEmail = authResult.user?.emailAddresses?.[0]?.emailAddress || null
    } catch (error) {
      console.log("[v0] Clerk auth not available, checking fallback auth")
    }

    if (!userId) {
      const body = await request.json()
      const fallbackUserId = body.userId || request.headers.get("x-user-id")
      if (fallbackUserId) {
        userId = fallbackUserId
        userEmail = fallbackUserId
        console.log("[v0] Using fallback user ID for save:", userId)
        request = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: JSON.stringify(body)
        })
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("user_data")
      .upsert({
        clerk_user_id: userId,
        email: userEmail,
        data: body.data || {},
      }, {
        onConflict: "clerk_user_id"
      })
      .select()
      .single()

    if (error) {
      if (error.message.includes("Could not find the table")) {
        console.log("[v0] Database table not created yet - data saved locally only")
        return NextResponse.json({ success: true, tableNotFound: true })
      }
      console.error("[v0] Database save error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Data saved successfully for user:", userId)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] API save error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save data" },
      { status: 500 }
    )
  }
}
