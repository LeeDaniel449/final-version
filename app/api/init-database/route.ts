import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ 
        success: false,
        error: 'Missing Supabase credentials' 
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Check if table exists first
    const { data: existingData, error: checkError } = await supabase
      .from('user_data')
      .select('id')
      .limit(1)

    if (!checkError) {
      console.log('[v0] Database table already exists')
      return NextResponse.json({ success: true, message: 'Table already exists' })
    }

    // Table doesn't exist, try to create it
    console.log('[v0] Attempting to create user_data table...')
    
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS user_data (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id TEXT NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_user_data_user_id ON user_data(user_id);

      ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Allow all operations for service role" ON user_data;
      CREATE POLICY "Allow all operations for service role" ON user_data 
        FOR ALL 
        USING (true)
        WITH CHECK (true);
    `

    // Execute SQL using the Postgres connection
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: createTableSQL
    })

    if (createError) {
      console.error('[v0] Failed to create table:', createError)
      return NextResponse.json({ 
        success: false,
        error: 'Please create the table manually in Supabase dashboard',
        sql: createTableSQL
      }, { status: 500 })
    }

    console.log('[v0] Database table created successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[v0] Database initialization error:', error)
    return NextResponse.json({ 
      success: false,
      error: 'Database initialization failed', 
      details: String(error) 
    }, { status: 500 })
  }
}
