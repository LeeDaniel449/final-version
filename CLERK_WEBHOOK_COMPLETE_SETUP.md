# Complete Clerk Webhook Setup Guide

## Current Webhook Endpoint

**URL:** `https://wealthlinkapp.com/api/webhooks/clerk`

This endpoint is ready to receive webhooks from Clerk and will automatically activate premium status.

## Step-by-Step Setup in Clerk Dashboard

### 1. Access Clerk Dashboard Webhooks
1. Go to https://dashboard.clerk.com
2. Select your **PRODUCTION** instance (not Development)
3. Navigate to **Webhooks** in the sidebar
4. Click **Add Endpoint**

### 2. Configure the Endpoint
- **Endpoint URL:** `https://wealthlinkapp.com/api/webhooks/clerk`
- **Description:** Premium activation webhook
- **Events to subscribe to:**
  - ✅ `user.created`
  - ✅ `user.updated`
  - ✅ `subscription.created` (if available)
  - ✅ `subscription.updated` (if available)

### 3. Get the Signing Secret
1. After creating the endpoint, Clerk will show you a **Signing Secret**
2. Copy this secret (starts with `whsec_...`)
3. Add it to your Vercel environment variables as `CLERK_WEBHOOK_SECRET`

### 4. Verify Environment Variables in Vercel
Make sure these are set in your Vercel project:
- `CLERK_WEBHOOK_SECRET` - The signing secret from step 3
- `CLERK_SECRET_KEY` - Your Clerk secret key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key

## How Premium Activation Works

### For Subscription Events (subscription.created/subscription.updated)
When Clerk sends subscription events, the webhook will:
1. Extract the user ID from the event payload
2. Check if subscription status is `active`, `trialing`, or `paid`
3. Set `publicMetadata.premium = true` for the user
4. The overlay will immediately disappear

**Important:** Subscription events must include the user ID in one of these fields:
- `evt.data.user_id`
- `evt.data.metadata.clerk_user_id`
- `evt.data.object.metadata.clerk_user_id`

### For User Events (user.created/user.updated)
When Clerk sends user events, the webhook will:
1. Check if the user's metadata already has premium indicators:
   - `publicMetadata.premium === true`
   - `publicMetadata.isPremium === true`
   - `publicMetadata.subscriptionStatus === "active"`
2. If found, sync and confirm premium status
3. The overlay will disappear

## Testing the Webhook

### Method 1: Test from Clerk Dashboard
1. Go to your webhook in Clerk dashboard
2. Click "Send Test Event"
3. Choose `user.updated` event type
4. Click "Send"
5. Check the response - should show 200 OK

### Method 2: Use the Test Page
Visit `/test-auto-premium` while signed in to immediately activate premium

### Method 3: Manually Trigger User Update
When you update a user's metadata in Clerk to include premium indicators, the webhook will automatically sync the status.

## Troubleshooting

### Webhook says "Failed" in Clerk Dashboard
Check the response body in Clerk's webhook logs:
- **400 "No user ID found"** - Subscription events need user_id in metadata
- **400 "Missing svix headers"** - Clerk is not sending proper webhook headers
- **500 "Webhook secret not configured"** - CLERK_WEBHOOK_SECRET not set in Vercel

### No Server Logs Appearing
- Verify the webhook URL is correct: `https://wealthlinkapp.com/api/webhooks/clerk`
- Check Clerk dashboard shows the webhook as "Active"
- Verify you're in Production mode in Clerk (not Development)
- Ensure the webhook was created after deploying to Vercel

### Overlay Still Shows After Webhook Success
1. Check webhook response in Clerk - should show `"premium": true`
2. Refresh the page to reload user metadata
3. Check browser console for `[v0] PremiumGate` logs
4. Verify `publicMetadata.premium === true` using the debug info

## Current Webhook Status

The webhook endpoint is fully functional and will:
✅ Verify Clerk signatures using CLERK_WEBHOOK_SECRET
✅ Handle user.created and user.updated events
✅ Handle subscription.created and subscription.updated events
✅ Automatically activate premium when conditions are met
✅ Log all activity for debugging
✅ Return proper HTTP status codes

**Next Action:** Configure the webhook in Clerk Production dashboard following the steps above.
</md>
