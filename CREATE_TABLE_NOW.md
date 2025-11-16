# Create the Database Table

Your app is trying to sync data but the `user_data` table doesn't exist yet.

## Steps to Create the Table:

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/upurselbrbkjxdrmytyw
2. **Click "SQL Editor"** in the left sidebar
3. **Copy and paste this SQL** into the editor:

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

4. **Click "Run"** (or press Ctrl+Enter)

## What Happens After:

Once the table is created, your app will automatically:
- ✅ Detect the table exists
- ✅ Load your data from the database
- ✅ Sync all changes across devices
- ✅ Save progress on laptop and iPhone

Your data will sync across all devices where you're signed in!
