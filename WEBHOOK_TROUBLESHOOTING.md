# Webhook Setup & Troubleshooting Guide

## Current Status

Your Clerk webhook endpoint is correctly configured at:
**`https://wealthlinkapp.com/api/webhooks/clerk`**

### Environment Variables ✅
- `CLERK_WEBHOOK_SECRET`: Set
- `CLERK_SECRET_KEY`: Set
- All required environment variables are configured

## Important: Clerk Subscription Events

**Clerk does not have built-in subscription events.** The events `subscription.created` and `subscription.updated` do not exist in Clerk's webhook system.

### Available Options:

#### Option 1: Use Stripe Webhooks (Recommended)
If you're using Stripe for subscriptions, set up a Stripe webhook instead:
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://wealthlinkapp.com/api/webhooks/stripe`
3. Subscribe to these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

#### Option 2: Manual Activation
Visit `/test-activate` while signed in to manually activate premium status.

#### Option 3: Custom Events (Advanced)
Create custom Clerk events by:
1. Triggering the webhook manually from your subscription logic
2. Including the user_id in the payload
3. Sending POST requests to your webhook endpoint

## Testing Your Webhook

### Test Endpoint Reachability
Visit: `https://wealthlinkapp.com/api/webhooks/clerk`

You should see:
\`\`\`json
{
  "status": "ok",
  "message": "Clerk webhook endpoint is reachable",
  "timestamp": "..."
}
\`\`\`

### Simulate a Subscription Event
Use the test page at `/test-activate` to simulate receiving a subscription event.

## Clerk Dashboard Setup (If Using Custom Events)

1. Go to https://dashboard.clerk.com
2. Navigate to Webhooks
3. Click "Add Endpoint"
4. Enter URL: `https://wealthlinkapp.com/api/webhooks/clerk`
5. Copy the "Signing Secret"
6. Verify `CLERK_WEBHOOK_SECRET` in Vercel matches this secret
7. Subscribe to relevant events (note: subscription events don't exist in Clerk)

## Webhook Payload Format

Your webhook expects this structure:
\`\`\`json
{
  "type": "subscription.created" or "subscription.updated",
  "data": {
    "user_id": "user_xxxxx",
    "status": "active" or "trialing",
    "id": "sub_xxxxx"
  }
}
\`\`\`

## Troubleshooting

### No Server Logs Appearing
- Webhook isn't being called
- Check URL is correct and points to production
- Verify webhook is configured in the sending service

### "Missing svix headers" Error
- The request doesn't include Clerk's signature headers
- Verify you're sending from Clerk's webhook system

### "Verification failed" Error  
- `CLERK_WEBHOOK_SECRET` doesn't match the signing secret
- Copy the exact secret from Clerk dashboard

### Premium Still Not Activating
- Check Vercel function logs for errors
- Verify user_id in the webhook payload matches your Clerk user ID
- Use `/test-activate` to manually activate premium
</parameter>
