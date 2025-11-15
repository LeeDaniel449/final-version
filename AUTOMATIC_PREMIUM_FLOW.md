# Automatic Premium Activation Flow

This document explains how premium status is automatically activated when a user subscribes.

## Complete Flow

1. **User Subscribes via Stripe**
   - User completes checkout with Stripe
   - Checkout session MUST include `metadata: { clerkUserId: user.id }`

2. **Stripe Sends Webhook** → `/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`
   - Stripe webhook extracts `clerkUserId` from subscription/session metadata
   - Updates Clerk user's publicMetadata: `premium: true`

3. **Clerk Detects Metadata Change**
   - Clerk automatically sends `user.updated` event

4. **Clerk Sends Webhook** → `/api/webhooks/clerk`
   - Event: `user.updated`
   - Clerk webhook reads `publicMetadata.premium` from the event
   - Ensures premium status is properly synced (idempotent operation)

5. **Overlay Disappears**
   - PremiumGate component reads `user.publicMetadata.premium`
   - If `premium === true`, overlay is hidden
   - User gets full access immediately

## Required Setup

### 1. Stripe Webhook Configuration
- URL: `https://wealthlinkapp.com/api/webhooks/stripe`
- Events to subscribe:
  - `checkout.session.completed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- Add `STRIPE_WEBHOOK_SECRET` to Vercel environment variables

### 2. Clerk Webhook Configuration
- URL: `https://wealthlinkapp.com/api/webhooks/clerk`
- Events to subscribe:
  - `user.updated` (ONLY THIS EVENT)
- Add `CLERK_WEBHOOK_SECRET` to Vercel environment variables

### 3. Stripe Checkout Implementation
When creating a Stripe checkout session, ALWAYS include the Clerk user ID:

\`\`\`typescript
const session = await stripe.checkout.sessions.create({
  metadata: {
    clerkUserId: user.id  // ← CRITICAL: Must include this
  },
  // ... other checkout options
})
\`\`\`

## Testing the Flow

### Option 1: Use Test Activation Page
Visit `/activate` while signed in to instantly activate premium for testing.

### Option 2: Simulate Stripe Webhook Locally
Use Stripe CLI to forward webhooks to localhost:
\`\`\`bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
stripe trigger checkout.session.completed
\`\`\`

### Option 3: Test in Production
1. Complete a real Stripe checkout
2. Check Stripe webhook logs for successful delivery
3. Check Clerk webhook logs for `user.updated` event
4. Verify overlay disappears immediately

## Troubleshooting

### Overlay Still Shows After Payment
- Check Stripe webhook logs: Did it update Clerk metadata?
- Check Clerk webhook logs: Did `user.updated` event fire?
- Verify `STRIPE_WEBHOOK_SECRET` and `CLERK_WEBHOOK_SECRET` are set correctly
- Confirm checkout session included `clerkUserId` in metadata

### Clerk Webhook Shows "Failed"
- Only `user.updated` events should be processed
- All other event types return 200 OK but are ignored
- Check that Clerk webhook is subscribed to `user.updated` only

### Premium Not Persisting
- Verify Clerk publicMetadata is actually being updated
- Check if subscription status is `active` or `trialing`
- Ensure Stripe webhook successfully updated metadata before Clerk webhook fired

## Environment Variables Required

\`\`\`env
# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...
\`\`\`

## Current Status

✅ Stripe webhook: Configured and ready
✅ Clerk webhook: Configured for `user.updated` only
✅ Automatic metadata update: Working
✅ Premium detection: Working
✅ Overlay removal: Working

**The flow is fully automatic. No manual intervention needed once webhooks are configured.**
