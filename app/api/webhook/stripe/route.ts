import { NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { clerkClient } from "@clerk/nextjs/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("[v0] Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId

        if (userId && session.subscription) {
          // Update user's Clerk metadata to mark them as premium
          const client = await clerkClient()
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              premium: true,
              stripeSubscriptionId: session.subscription,
              stripeCustomerId: session.customer,
            },
          })
          console.log("[v0] User upgraded to premium:", userId)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          // Remove premium status
          const client = await clerkClient()
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              premium: false,
              stripeSubscriptionId: null,
            },
          })
          console.log("[v0] User premium subscription cancelled:", userId)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          const isPremium = subscription.status === "active" || subscription.status === "trialing"
          const client = await clerkClient()
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              premium: isPremium,
              stripeSubscriptionId: subscription.id,
            },
          })
          console.log("[v0] User subscription updated:", userId, isPremium)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
