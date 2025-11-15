import { clerkClient } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function POST(req: Request) {
  console.log("[v0] ========== STRIPE WEBHOOK POST RECEIVED ==========")
  console.log("[v0] Timestamp:", new Date().toISOString())

  try {
    const bodyText = await req.text()
    const sig = req.headers.get("stripe-signature")

    const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET

    console.log("[v0] Environment variables check:")
    console.log("[v0] - STRIPE_WEBHOOK_SECRET:", WEBHOOK_SECRET ? "✅ Set" : "❌ Missing")
    console.log("[v0] - STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "✅ Set" : "❌ Missing")
    console.log("[v0] - Stripe signature:", sig ? "✅ Present" : "❌ Missing")

    if (!WEBHOOK_SECRET) {
      console.error("[v0] ❌ STRIPE_WEBHOOK_SECRET is not set!")
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!sig) {
      console.error("[v0] ❌ Missing stripe-signature header")
      return new Response(JSON.stringify({ error: "Missing signature" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(bodyText, sig, WEBHOOK_SECRET)
      console.log("[v0] ✅ Webhook signature verified")
      console.log("[v0] Event type:", event.type)
    } catch (err) {
      console.error("[v0] ❌ Webhook signature verification failed:", err)
      return new Response(
        JSON.stringify({
          error: "Webhook signature verification failed",
          details: err instanceof Error ? err.message : String(err),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Handle subscription events
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string
      const subscriptionStatus = subscription.status
      const subscriptionId = subscription.id

      console.log("[v0] 📦 Subscription event:", event.type)
      console.log("[v0] Customer ID:", customerId)
      console.log("[v0] Subscription ID:", subscriptionId)
      console.log("[v0] Subscription Status:", subscriptionStatus)

      // Get the Clerk user ID from subscription metadata
      const clerkUserId = subscription.metadata?.clerkUserId

      if (!clerkUserId) {
        console.error("[v0] ❌ No Clerk user ID found in subscription metadata")
        return new Response(
          JSON.stringify({
            error: "No Clerk user ID in subscription metadata",
            hint: "Make sure to add clerkUserId to subscription metadata when creating subscriptions",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      console.log("[v0] Clerk User ID from metadata:", clerkUserId)

      // Determine if premium should be active
      const shouldActivatePremium = subscriptionStatus === "active" || subscriptionStatus === "trialing"

      console.log("[v0] Should activate premium:", shouldActivatePremium)

      try {
        const client = await clerkClient()
        console.log("[v0] ✅ Clerk client initialized")

        const result = await client.users.updateUserMetadata(clerkUserId, {
          publicMetadata: {
            premium: shouldActivatePremium,
            plan: shouldActivatePremium ? 'premium' : null,
            premiumUpdatedAt: new Date().toISOString(),
            subscriptionId: subscriptionId,
            subscriptionStatus: subscriptionStatus,
            stripeCustomerId: customerId,
          },
        })

        console.log("[v0] ✅ Premium status updated:", shouldActivatePremium ? "ACTIVATED" : "DEACTIVATED")
        console.log("[v0] User ID:", result.id)
        console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
        console.log("[v0] ========== STRIPE WEBHOOK PROCESSING COMPLETE ==========")

        return new Response(
          JSON.stringify({
            success: true,
            clerkUserId,
            premium: shouldActivatePremium,
            message: shouldActivatePremium ? "Premium activated" : "Premium deactivated",
            metadata: result.publicMetadata,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )
      } catch (error) {
        console.error("[v0] ❌ Error updating user premium status:", error)
        console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
        return new Response(
          JSON.stringify({
            error: "Error updating premium status",
            details: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    }

    // Handle checkout session completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const customerId = session.customer as string
      const subscriptionId = session.subscription as string
      const clerkUserId = session.metadata?.clerkUserId

      console.log("[v0] 🎉 Checkout completed!")
      console.log("[v0] Customer ID:", customerId)
      console.log("[v0] Subscription ID:", subscriptionId)
      console.log("[v0] Clerk User ID:", clerkUserId)

      if (!clerkUserId) {
        console.error("[v0] ❌ No Clerk user ID found in checkout session metadata")
        return new Response(
          JSON.stringify({
            error: "No Clerk user ID in session metadata",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      if (subscriptionId) {
        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId as string)

        try {
          const client = await clerkClient()
          const result = await client.users.updateUserMetadata(clerkUserId, {
            publicMetadata: {
              premium: true,
              plan: 'premium',
              premiumActivatedAt: new Date().toISOString(),
              subscriptionId: subscriptionId,
              subscriptionStatus: subscription.status,
              stripeCustomerId: customerId,
            },
          })

          console.log("[v0] ✅ Premium activated after checkout!")
          console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
          console.log("[v0] ========== STRIPE WEBHOOK PROCESSING COMPLETE ==========")

          return new Response(
            JSON.stringify({
              success: true,
              clerkUserId,
              message: "Premium activated",
              metadata: result.publicMetadata,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          )
        } catch (error) {
          console.error("[v0] ❌ Error activating premium:", error)
          return new Response(
            JSON.stringify({
              error: "Error activating premium",
              details: error instanceof Error ? error.message : String(error),
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          )
        }
      }
    }

    console.log("[v0] ⚠️ Unhandled event type:", event.type)
    return new Response(
      JSON.stringify({
        received: true,
        eventType: event.type,
        message: "Event received but not handled",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("[v0] ❌ Unexpected error in Stripe webhook handler:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

export async function GET() {
  console.log("[v0] ✅ Stripe webhook endpoint GET request - endpoint is reachable!")
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Stripe webhook endpoint is reachable",
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
