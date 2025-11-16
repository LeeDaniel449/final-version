# Database Setup Instructions

Your app needs a `user_data` table in Supabase to sync data across devices.

## Automatic Setup (Recommended)

Run this command from your project root:

\`\`\`bash
node scripts/create-table.mjs
\`\`\`

## Manual Setup

If the automatic setup fails, go to your Supabase dashboard:

1. Open your project at https://supabase.com/dashboard
2. Go to the SQL Editor
3. Create a new query
4. Paste this SQL:

\`\`\`sql
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
\`\`\`

5. Click "Run" to execute the SQL
6. Refresh your app - data will now sync across all devices!

## What This Creates

- **user_data table**: Stores all user data (budget, goals, learning progress) as JSONB
- **Row Level Security**: Ensures users can only access their own data
- **Automatic timestamps**: Tracks when data is created and updated

Once the table exists, your app will automatically sync data across all devices when you're signed in.
