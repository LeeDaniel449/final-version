import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error("[v0] Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      const userId = session.metadata?.userId

      if (userId) {
        try {
          // Update user's Clerk metadata to mark them as premium
          const client = await clerkClient()
          await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              premium: true,
              stripeCustomerId: session.customer,
              subscriptionId: session.subscription,
            },
          })
          console.log("[v0] User premium status updated:", userId)
        } catch (error) {
          console.error("[v0] Error updating user metadata:", error)
        }
      }
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object
      const customerId = subscription.customer

      try {
        // Find user by Stripe customer ID and remove premium status
        const client = await clerkClient()
        const users = await client.users.getUserList()
        const user = users.data.find((u) => u.publicMetadata?.stripeCustomerId === customerId)

        if (user) {
          await client.users.updateUserMetadata(user.id, {
            publicMetadata: {
              premium: false,
            },
          })
          console.log("[v0] User premium status removed:", user.id)
        }
      } catch (error) {
        console.error("[v0] Error removing premium status:", error)
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
