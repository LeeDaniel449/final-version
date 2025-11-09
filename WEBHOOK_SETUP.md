# Webhook Setup Instructions

## Issue: Premium Status Not Updating

The problem is that **subscriptions are managed by Stripe, not Clerk**. You need to configure a **Stripe webhook**, not a Clerk webhook, to receive subscription events.

## Stripe Webhook Setup

### 1. Get Your Webhook Endpoint URL

Your Stripe webhook endpoint is:
\`\`\`
https://wealthlinkapp.com/api/webhooks/stripe
\`\`\`

### 2. Configure in Stripe Dashboard

1. Go to https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://wealthlinkapp.com/api/webhooks/stripe`
4. Select the following events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)

### 3. Add Environment Variable

Add this environment variable to your Vercel project:
\`\`\`
STRIPE_WEBHOOK_SECRET=whsec_your_signing_secret_here
\`\`\`

### 4. Important: Add Clerk User ID to Subscriptions

When creating Stripe Checkout sessions or subscriptions, you MUST include the Clerk user ID in the metadata:

\`\`\`typescript
const session = await stripe.checkout.sessions.create({
  // ... other parameters
  metadata: {
    clerkUserId: user.id, // ⚠️ REQUIRED!
  },
  subscription_data: {
    metadata: {
      clerkUserId: user.id, // ⚠️ REQUIRED!
    },
  },
})
\`\`\`

Without this, the webhook won't know which user to update.

## Testing

1. Visit `https://wealthlinkapp.com/api/webhooks/stripe` to verify the endpoint is reachable
2. Use Stripe's webhook testing tool to send a test event
3. Check your Vercel logs for webhook processing logs
4. Complete a test subscription purchase
5. Verify premium status updates in your app

## Clerk Webhook (Optional)

The Clerk webhook at `/api/webhooks/clerk` is only needed if you want to handle organization membership events. For subscription-based premium access, use the Stripe webhook.
