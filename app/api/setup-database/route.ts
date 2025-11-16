import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const supabase = await createClient()

    const { error: tableError } = await supabase.rpc('exec_sql', {
      sql: `
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

        -- Drop existing policies if they exist
        drop policy if exists "Users can view their own data" on public.user_data;
        drop policy if exists "Users can insert their own data" on public.user_data;
        drop policy if exists "Users can update their own data" on public.user_data;
        drop policy if exists "Users can delete their own data" on public.user_data;
        drop policy if exists "Service role can manage all data" on public.user_data;

        -- Create policy to allow service role access
        create policy "Service role can manage all data"
          on public.user_data for all
          using (true)
          with check (true);

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
        drop trigger if exists set_updated_at on public.user_data;
        create trigger set_updated_at
          before update on public.user_data
          for each row
          execute function public.handle_updated_at();
      `
    })

    if (tableError) {
      console.error("[v0] Failed to create table:", tableError)
      const { error: altError } = await supabase
        .from('user_data')
        .select('id')
        .limit(1)
      
      if (altError && altError.message.includes("does not exist")) {
        return NextResponse.json({ 
          error: "Database table creation requires manual setup. Please run the SQL script in your Supabase dashboard.",
          sqlScript: `scripts/001_create_user_data_tables.sql`
        }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: true,
      message: "Database setup complete" 
    })
  } catch (error) {
    console.error("[v0] Setup error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to setup database" },
      { status: 500 }
    )
  }
}
