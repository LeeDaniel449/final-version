import { createClient } from "@/lib/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

async function ensureTableExists(supabase: any) {
  try {
    // Check if table exists
    const { error: checkError } = await supabase
      .from("user_data")
      .select("id")
      .limit(1)
    
    // If table exists, return true
    if (!checkError || checkError.code !== "PGRST204") {
      return true
    }
    
    // Table doesn't exist, create it automatically
    console.log("[v0] Creating user_data table automatically...")
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS user_data (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        clerk_user_id text UNIQUE NOT NULL,
        email text,
        data jsonb DEFAULT '{}'::jsonb,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );
      
      CREATE INDEX IF NOT EXISTS idx_user_data_clerk_user_id ON user_data(clerk_user_id);
      CREATE INDEX IF NOT EXISTS idx_user_data_email ON user_data(email);
    `
    
    const { error: createError } = await supabase.rpc('exec_sql', { 
      sql: createTableSQL 
    })
    
    if (createError) {
      console.error("[v0] Failed to create table:", createError)
      return false
    }
    
    console.log("[v0] Table created successfully")
    return true
  } catch (error) {
    console.error("[v0] Error in ensureTableExists:", error)
    return false
  }
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
      // Clerk auth not available
    }

    if (!userId) {
      const fallbackUserId = request.headers.get("x-user-id")
      if (fallbackUserId) {
        userId = fallbackUserId
        userEmail = fallbackUserId
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
      // Table doesn't exist or no data found
      if (error.code === "PGRST116" || error.code === "42P01" || error.message.includes("Could not find the table")) {
        return NextResponse.json({ data: {}, tableNotFound: true })
      }
      return NextResponse.json({ data: {} })
    }

    return NextResponse.json({ data: data?.data || {} })
  } catch (error) {
    return NextResponse.json({ data: {}, tableNotFound: true })
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
      // Clerk auth not available
    }

    const body = await request.json()
    
    if (!userId) {
      const fallbackUserId = body.userId || request.headers.get("x-user-id")
      if (fallbackUserId) {
        userId = fallbackUserId
        userEmail = fallbackUserId
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("user_data")
      .upsert({
        clerk_user_id: userId,
        email: userEmail,
        data: body.data || {},
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "clerk_user_id"
      })

    if (error) {
      // Table doesn't exist - return success but indicate no table
      if (error.code === "42P01" || error.message.includes("Could not find the table")) {
        return NextResponse.json({ success: true, tableNotFound: true })
      }
      return NextResponse.json({ success: false })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: true, tableNotFound: true })
  }
}
