# Clerk Webhook Setup Guide

## Important: Clerk Does NOT Have Subscription Events

Clerk does not have built-in `subscription.created` or `subscription.updated` events. These are **Stripe** events, not Clerk events.

## Solutions

### Option 1: Use Stripe Webhooks (Recommended for real subscriptions)

If you're using Stripe for payments:
1. Set up a Stripe webhook at `/api/webhooks/stripe`
2. Subscribe to Stripe's `customer.subscription.created` and `customer.subscription.updated` events
3. In those events, update Clerk's publicMetadata

### Option 2: Auto-Grant Premium (Current Setup)

The webhook is now configured to **automatically grant premium to all users** when they sign up:

**Current Behavior:**
- When `user.created` or `user.updated` events are received
- Premium is automatically set to `true` for that user
- The overlay will disappear immediately

**To Configure:**
1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `https://wealthlinkapp.com/api/webhooks/clerk`
3. Subscribe to these events:
   - `user.created`
   - `user.updated`
4. Copy the webhook signing secret
5. Add it as `CLERK_WEBHOOK_SECRET` environment variable

### Option 3: Manual Activation

Visit `/test-auto-premium` while signed in to manually activate premium for your account.

## Testing the Webhook

1. Visit the webhook URL directly: `https://wealthlinkapp.com/api/webhooks/clerk`
   - You should see: `{"status":"ok","message":"Clerk webhook endpoint is reachable"}`

2. Check webhook logs in Clerk dashboard to see if events are being sent

3. Check your server logs (Vercel logs) to see webhook processing details

## Current User ID: user_35EWAMTrU80wnXx9OXPtAEz9QMK

You can manually activate this user's premium status by visiting `/test-auto-premium` while signed in.
