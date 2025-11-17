import { createClient } from '@supabase/supabase-js'
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase credentials')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export async function GET(request: Request) {
  try {
    let userId: string | null = null

    try {
      const authResult = await auth()
      userId = authResult.userId
    } catch (error) {
      // Clerk auth not available
    }

    if (!userId) {
      const fallbackUserId = request.headers.get("x-user-id")
      if (fallbackUserId) {
        userId = fallbackUserId
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from("user_data")
      .select("data")
      .eq("user_id", userId)
      .maybeSingle()

    if (error) {
      console.error("[v0] Database error:", error.message)
      return NextResponse.json({ data: {}, error: error.message })
    }

    if (!data) {
      console.log("[v0] No data found in database")
      return NextResponse.json({ data: {} })
    }

    return NextResponse.json({ data: data.data || {} })
  } catch (error: any) {
    console.error("[v0] GET error:", error)
    return NextResponse.json({ data: {}, error: error.message })
  }
}

export async function POST(request: Request) {
  try {
    let userId: string | null = null

    try {
      const authResult = await auth()
      userId = authResult.userId
    } catch (error) {
      // Clerk auth not available
    }

    const body = await request.json()
    
    if (!userId) {
      const fallbackUserId = body.userId || request.headers.get("x-user-id")
      if (fallbackUserId) {
        userId = fallbackUserId
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createAdminClient()
    
    const { data: existingData } = await supabase
      .from("user_data")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle()

    let error
    if (existingData) {
      // Update existing record
      const result = await supabase
        .from("user_data")
        .update({
          data: body.data || {},
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId)
      error = result.error
    } else {
      // Insert new record
      const result = await supabase
        .from("user_data")
        .insert({
          user_id: userId,
          data: body.data || {},
          updated_at: new Date().toISOString(),
        })
      error = result.error
    }

    if (error) {
      console.error("[v0] Save error:", error.message)
      return NextResponse.json({ success: false, error: error.message })
    }

    console.log("[v0] Successfully saved data to database for user:", userId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] POST error:", error)
    return NextResponse.json({ success: false, error: error.message })
  }
}
