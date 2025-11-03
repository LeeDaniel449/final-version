import { clerkClient } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function POST(req: Request) {
  console.log("[v0] ========== MANUAL PREMIUM ACTIVATION ==========")

  try {
    const body = await req.json()
    const { userId } = body

    if (!userId) {
      console.log("[v0] ❌ No user ID provided in request")
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] Activating premium for user:", userId)

    const client = await clerkClient()

    const user = await client.users.getUser(userId)
    const publicMetadata = user.publicMetadata || {}

    console.log("[v0] User metadata:", publicMetadata)

    const stripeCustomerId = publicMetadata.stripeCustomerId as string | undefined
    const stripeSubscriptionId = publicMetadata.stripeSubscriptionId as string | undefined

    if (!stripeCustomerId || !stripeSubscriptionId) {
      console.log("[v0] ❌ No Stripe subscription found for user")
      return new Response(
        JSON.stringify({
          error: "No active subscription found",
          message: "You must subscribe through the payment form before activating premium access.",
        }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    console.log("[v0] Found Stripe subscription:", stripeSubscriptionId)

    try {
      const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId)
      console.log("[v0] Stripe subscription status:", subscription.status)

      if (subscription.status !== "active" && subscription.status !== "trialing") {
        console.log("[v0] ❌ Subscription is not active:", subscription.status)
        return new Response(
          JSON.stringify({
            error: "Subscription not active",
            message: `Your subscription status is "${subscription.status}". Please ensure your payment is complete.`,
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      console.log("[v0] ✅ Subscription verified as active")
    } catch (stripeError) {
      console.error("[v0] ❌ Error verifying Stripe subscription:", stripeError)
      return new Response(
        JSON.stringify({
          error: "Failed to verify subscription",
          message: "Could not verify your subscription with Stripe. Please contact support.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...publicMetadata,
        premium: true,
        subscriptionStatus: "active",
        premiumActivatedAt: new Date().toISOString(),
        manualActivation: true,
      },
    })

    console.log("[v0] ✅ Premium activated successfully")

    return new Response(JSON.stringify({ success: true, message: "Premium activated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("[v0] ❌ Error activating premium:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to activate premium",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
