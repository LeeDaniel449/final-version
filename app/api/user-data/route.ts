import { createClient } from "@/lib/supabase/server"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

async function ensureTableExists(supabase: any): Promise<boolean> {
  try {
    // Try to query the table
    const { error: checkError } = await supabase
      .from("user_data")
      .select("id")
      .limit(1)
    
    // Table exists
    if (!checkError || !checkError.message?.includes("Could not find the table")) {
      console.log("[v0] Table user_data exists")
      return true
    }
    
    // Table doesn't exist - create it
    console.log("[v0] Creating user_data table...")
    
    // Use raw SQL to create table
    const { error: createError } = await supabase.rpc('exec_raw_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS user_data (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          clerk_user_id TEXT UNIQUE NOT NULL,
          email TEXT,
          data JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_user_data_clerk_user_id ON user_data(clerk_user_id);
        
        ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;
        
        DROP POLICY IF EXISTS "Allow all operations" ON user_data;
        CREATE POLICY "Allow all operations" ON user_data FOR ALL USING (true) WITH CHECK (true);
      `
    })
    
    if (createError) {
      console.error("[v0] Failed to create table:", createError)
      return false
    }
    
    console.log("[v0] Table created successfully!")
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
    
    const tableExists = await ensureTableExists(supabase)
    if (!tableExists) {
      console.log("[v0] Table creation failed, returning empty data")
      return NextResponse.json({ data: {}, tableNotFound: true })
    }

    const { data, error } = await supabase
      .from("user_data")
      .select("data")
      .eq("clerk_user_id", userId)
      .single()

    if (error) {
      // No data found for this user yet
      if (error.code === "PGRST116") {
        console.log("[v0] No data found for user, returning empty")
        return NextResponse.json({ data: {} })
      }
      
      console.error("[v0] Database error:", error.message)
      return NextResponse.json({ data: {}, error: error.message })
    }

    console.log("[v0] Successfully loaded data from database")
    return NextResponse.json({ data: data?.data || {} })
  } catch (error: any) {
    console.error("[v0] GET error:", error)
    return NextResponse.json({ data: {}, error: error.message })
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
    
    const tableExists = await ensureTableExists(supabase)
    if (!tableExists) {
      console.log("[v0] Table creation failed, cannot save data")
      return NextResponse.json({ success: false, tableNotFound: true })
    }

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
      console.error("[v0] Save error:", error.message)
      return NextResponse.json({ success: false, error: error.message })
    }

    console.log("[v0] Successfully saved data to database")
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] POST error:", error)
    return NextResponse.json({ success: false, error: error.message })
  }
}
