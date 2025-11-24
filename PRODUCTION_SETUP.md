# Production Setup Guide

Your app requires specific environment variables to be set in your Vercel production deployment for cross-device data sync to work.

## Required Environment Variables

### 1. Clerk Authentication

Add these variables to your Vercel project:

\`\`\`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
\`\`\`

**Where to get these:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/last-active?path=api-keys)
2. Copy your Publishable Key and Secret Key
3. Add them to Vercel Environment Variables

### 2. Supabase Database

Add these variables to your Vercel project:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL=postgresql://...
\`\`\`

**Where to get these:**
1. Go to your [Supabase Project Settings](https://app.supabase.com/project/_/settings/api)
2. Copy the Project URL and Service Role Key
3. Copy the Database Connection String from Database Settings
4. Add them to Vercel Environment Variables

## How to Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
   - **Value**: Your actual key/value
   - **Environment**: Select `Production`, `Preview`, and `Development`
4. Click **Save**
5. **Redeploy your application** for changes to take effect

## Verifying Setup

After adding the environment variables and redeploying:

1. Visit your production site
2. Check the browser console for environment variable status
3. If you see a red banner at the bottom right, some variables are still missing
4. The banner will show exactly which variables need to be added

## How Cross-Device Sync Works

Once properly configured:

1. **Sign in with Clerk** on any device
2. All your budget data, goals, and progress are saved to Supabase
3. **Sign in on another device** with the same account
4. Your data automatically loads from the database
5. Changes on any device sync immediately to all other devices

## Troubleshooting

### "Clerk publishable key is missing"
- Make sure `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set in Vercel
- Redeploy after adding the variable

### "Data doesn't sync between devices"
- Ensure you're signed in with the same Clerk account on both devices
- Check that Supabase environment variables are set
- Check browser console for sync errors

### "Database sync error"
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check that your Supabase project is active
- Ensure RLS policies are enabled on the `user_data` table
\`\`\`

```tsx file="" isHidden
