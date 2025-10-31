import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { clerkClient } from "@clerk/nextjs/server"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  console.log("[v0] Stripe webhook received")

  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    console.error("[v0] No stripe signature found")
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    console.log("[v0] Webhook signature verified, event type:", event.type)
  } catch (err) {
    console.error("[v0] Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    console.log("[v0] Checkout session completed:", session.id)
    console.log("[v0] Session metadata:", session.metadata)

    const clerkUserId = session.metadata?.clerkUserId

    if (!clerkUserId) {
      console.error("[v0] No Clerk user ID in session metadata")
      return NextResponse.json({ error: "No user ID" }, { status: 400 })
    }

    try {
      // Update Clerk user metadata to grant premium access
      const client = await clerkClient()
      await client.users.updateUserMetadata(clerkUserId, {
        publicMetadata: {
          premium: true,
          subscriptionStatus: "active",
          stripeSessionId: session.id,
          activatedAt: new Date().toISOString(),
        },
      })

      console.log("[v0] Premium access granted to user:", clerkUserId)
      return NextResponse.json({ success: true })
    } catch (err) {
      console.error("[v0] Failed to update user metadata:", err)
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }
  }

  console.log("[v0] Unhandled event type:", event.type)
  return NextResponse.json({ received: true })
}
