import { createClient } from '@supabase/supabase-js'
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    console.error('[v0] Missing NEXT_PUBLIC_SUPABASE_URL')
    throw new Error('Missing Supabase URL')
  }
  
  if (!supabaseServiceKey) {
    console.error('[v0] Missing SUPABASE_SERVICE_ROLE_KEY')
    throw new Error('Missing Supabase service role key')
  }

  try {
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  } catch (error) {
    console.error('[v0] Failed to create Supabase client:', error)
    throw error
  }
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

    let supabase
    try {
      supabase = createAdminClient()
    } catch (error: any) {
      console.error('[v0] Database error:', error.message)
      return NextResponse.json({ data: {}, error: 'Database connection failed' })
    }
    
    const { data, error } = await supabase
      .from("user_data")
      .select("data, updated_at")
      .eq("user_id", userId)
      .order('updated_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error("[v0] Database error:", error.message)
      return NextResponse.json({ data: {}, error: error.message })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ data: {} })
    }

    return NextResponse.json({ data: data[0].data || {} })
  } catch (error: any) {
    console.error("[v0] Database error:", error)
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

    let supabase
    try {
      supabase = createAdminClient()
    } catch (error: any) {
      console.error('[v0] Database error:', error.message)
      return NextResponse.json({ success: false, error: 'Database connection failed' })
    }
    
    const { data: existingData } = await supabase
      .from("user_data")
      .select("id")
      .eq("user_id", userId)
      .order('created_at', { ascending: false })

    let error
    if (existingData && existingData.length > 0) {
      const result = await supabase
        .from("user_data")
        .update({
          data: body.data || {},
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingData[0].id)
      error = result.error

      if (existingData.length > 1) {
        const duplicateIds = existingData.slice(1).map(row => row.id)
        await supabase
          .from("user_data")
          .delete()
          .in("id", duplicateIds)
        console.log(`[v0] Deleted ${duplicateIds.length} duplicate rows for user: ${userId}`)
      }
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
    console.error("[v0] Save error:", error)
    return NextResponse.json({ success: false, error: error.message })
  }
}
