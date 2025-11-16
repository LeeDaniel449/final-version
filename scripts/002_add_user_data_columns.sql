-- Add missing columns to user_data table
ALTER TABLE user_data 
ADD COLUMN IF NOT EXISTS user_id TEXT NOT NULL,
ADD COLUMN IF NOT EXISTS data JSONB NOT NULL DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_data_user_id ON user_data(user_id);

-- Update RLS policy to use the new user_id column
DROP POLICY IF EXISTS "Users can manage their own data" ON user_data;

CREATE POLICY "Users can manage their own data" ON user_data
FOR ALL
USING (user_id = current_setting('request.jwt.claim.sub', true)::text OR user_id = current_setting('app.user_id', true)::text)
WITH CHECK (user_id = current_setting('request.jwt.claim.sub', true)::text OR user_id = current_setting('app.user_id', true)::text);

-- Allow service role full access
CREATE POLICY "Service role has full access" ON user_data
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
