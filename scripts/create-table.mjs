import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Make sure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTable() {
  console.log('🔧 Creating user_data table...')
  
  const { data, error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS public.user_data (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL UNIQUE,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can manage their own data" ON public.user_data;
      
      CREATE POLICY "Users can manage their own data" 
        ON public.user_data 
        FOR ALL 
        USING (true)
        WITH CHECK (true);
    `
  })

  if (error) {
    console.error('❌ Error:', error.message)
    console.log('\n📋 Please run this SQL manually in your Supabase SQL Editor:')
    console.log('\n' + `
CREATE TABLE IF NOT EXISTS public.user_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_data ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own data" ON public.user_data;

CREATE POLICY "Users can manage their own data" 
  ON public.user_data 
  FOR ALL 
  USING (true)
  WITH CHECK (true);
    `.trim() + '\n')
    process.exit(1)
  }

  console.log('✅ Table created successfully!')
}

createTable()
