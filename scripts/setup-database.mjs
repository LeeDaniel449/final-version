import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('Setting up database...')
  
  // Create user_data table
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS user_data (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id TEXT NOT NULL,
        data JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE UNIQUE INDEX IF NOT EXISTS user_data_user_id_idx ON user_data(user_id);

      ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Users can read own data" ON user_data;
      CREATE POLICY "Users can read own data" ON user_data FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Users can insert own data" ON user_data;
      CREATE POLICY "Users can insert own data" ON user_data FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Users can update own data" ON user_data;
      CREATE POLICY "Users can update own data" ON user_data FOR UPDATE USING (true);
    `
  })

  if (error) {
    console.error('Error setting up database:', error)
    process.exit(1)
  }

  console.log('Database setup complete!')
}

setupDatabase()
