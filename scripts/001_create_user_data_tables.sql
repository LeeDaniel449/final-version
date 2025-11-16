-- Create user_data table to store all user progress
create table if not exists public.user_data (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null unique,
  email text,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.user_data enable row level security;

-- RLS Policies - users can only access their own data
create policy "Users can view their own data"
  on public.user_data for select
  using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "Users can insert their own data"
  on public.user_data for insert
  with check (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "Users can update their own data"
  on public.user_data for update
  using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "Users can delete their own data"
  on public.user_data for delete
  using (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create index for faster lookups
create index if not exists idx_user_data_clerk_user_id on public.user_data(clerk_user_id);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updated_at
create trigger set_updated_at
  before update on public.user_data
  for each row
  execute function public.handle_updated_at();
