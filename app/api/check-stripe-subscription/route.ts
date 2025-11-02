import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ hasSubscription: false, error: "Not authenticated" }, { status: 401 })
    }

    // Get the user's email from Clerk
    const { clerkClient } = await import("@clerk/nextjs/server")
    const client = await clerkClient()
    const user = await client.users.getUser(userId)

    if (!user.emailAddresses || user.emailAddresses.length === 0) {
      return NextResponse.json({ hasSubscription: false, error: "No email found" }, { status: 400 })
    }

    const email = user.emailAddresses[0].emailAddress

    console.log("[v0] Checking Stripe subscriptions for email:", email)

    // Search for customers by email
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    if (customers.data.length === 0) {
      console.log("[v0] No Stripe customer found for email:", email)
      return NextResponse.json({ hasSubscription: false })
    }

    const customer = customers.data[0]
    console.log("[v0] Found Stripe customer:", customer.id)

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    })

    const hasActiveSubscription = subscriptions.data.length > 0

    console.log("[v0] Active subscriptions found:", hasActiveSubscription)

    if (hasActiveSubscription) {
      // Update user metadata with premium status
      await client.users.updateUser(userId, {
        publicMetadata: {
          premium: true,
          stripeCustomerId: customer.id,
          stripeSubscriptionId: subscriptions.data[0].id,
        },
      })
      console.log("[v0] Updated user metadata with premium status")
    }

    return NextResponse.json({
      hasSubscription: hasActiveSubscription,
      customerId: customer.id,
      subscriptionId: hasActiveSubscription ? subscriptions.data[0].id : null,
    })
  } catch (error) {
    console.error("[v0] Error checking Stripe subscription:", error)
    return NextResponse.json(
      {
        hasSubscription: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
