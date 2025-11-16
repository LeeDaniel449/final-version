import { createClient } from "@/lib/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

async function ensureTableExists(supabase: any) {
  const { error } = await supabase
    .from("user_data")
    .select("id")
    .limit(1)
  
  return !error || error.code !== "42P01" // 42P01 = table doesn't exist
}

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
    
    const tableExists = await ensureTableExists(supabase)
    if (!tableExists) {
      console.log("[v0] Database table doesn't exist - run setup endpoint first")
      return NextResponse.json({ 
        data: {}, 
        tableNotFound: true,
        setupEndpoint: "/api/setup-database"
      })
    }

    const { data, error } = await supabase
      .from("user_data")
      .select("data")
      .eq("clerk_user_id", userId)
      .single()

    if (error) {
      if (error.code !== "PGRST116") {
        console.error("[v0] Database error:", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    console.log("[v0] Loaded data from database for user:", userId)
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

    const body = await request.json()
    
    if (!userId) {
      const fallbackUserId = body.userId || request.headers.get("x-user-id")
      if (fallbackUserId) {
        userId = fallbackUserId
        userEmail = fallbackUserId
        console.log("[v0] Using fallback user ID for save:", userId)
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    const tableExists = await ensureTableExists(supabase)
    if (!tableExists) {
      console.log("[v0] Database table doesn't exist - data saved locally only")
      return NextResponse.json({ 
        success: true, 
        tableNotFound: true,
        setupEndpoint: "/api/setup-database"
      })
    }

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
      console.error("[v0] Database save error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Data saved successfully to database for user:", userId)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("[v0] API save error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save data" },
      { status: 500 }
    )
  }
}
