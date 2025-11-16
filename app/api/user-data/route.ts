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
          user_id TEXT UNIQUE NOT NULL,
          email TEXT,
          data JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_user_data_user_id ON user_data(user_id);
        
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

    const supabase = await createClient()
    
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

    const supabase = await createClient()
    
    const { error } = await supabase
      .from("user_data")
      .upsert({
        user_id: userId,
        data: body.data || {},
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "user_id"
      })

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
