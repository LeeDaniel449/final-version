import { type NextRequest, NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.redirect(new URL("/subscribe", req.url))
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid" && session.metadata?.userId) {
      const client = await clerkClient()
      await client.users.updateUserMetadata(session.metadata.userId, {
        publicMetadata: {
          premium: true,
          subscriptionStatus: "active",
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
        },
      })

      console.log("[v0] User upgraded to premium:", session.metadata.userId)
    }

    return NextResponse.redirect(new URL("/", req.url))
  } catch (error) {
    console.error("[v0] Checkout success error:", error)
    return NextResponse.redirect(new URL("/subscribe", req.url))
  }
}
