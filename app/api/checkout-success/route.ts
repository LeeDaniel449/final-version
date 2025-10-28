import { type NextRequest, NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.redirect(new URL("/pricing", req.url))
    }

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === "paid" && session.metadata?.userId) {
      // Update user's Clerk metadata to grant premium access
      await clerkClient().users.updateUserMetadata(session.metadata.userId, {
        publicMetadata: {
          premium: true,
          subscriptionStatus: "active",
          stripeCustomerId: session.customer,
          stripeSubscriptionId: session.subscription,
        },
      })
    }

    // Redirect to home page
    return NextResponse.redirect(new URL("/?premium=true", req.url))
  } catch (error: any) {
    console.error("[v0] Checkout success error:", error)
    return NextResponse.redirect(new URL("/pricing?error=true", req.url))
  }
}
