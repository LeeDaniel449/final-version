-- Add unique constraint to user_id column
ALTER TABLE user_data ADD CONSTRAINT user_data_user_id_key UNIQUE (user_id);

-- Create index for better query performance (if not already exists)
CREATE INDEX IF NOT EXISTS idx_user_data_user_id ON user_data(user_id);
