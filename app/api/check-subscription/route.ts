import { NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
})

export async function GET() {
  try {
    console.log("[v0] [check-subscription] API called")

    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      console.log("[v0] [check-subscription] No user found")
      return NextResponse.json({ hasSubscription: false })
    }

    console.log("[v0] [check-subscription] Checking subscription for user:", userId)
    console.log("[v0] [check-subscription] User email:", user.emailAddresses[0]?.emailAddress)

    const email = user.emailAddresses[0]?.emailAddress
    if (!email) {
      console.log("[v0] [check-subscription] No email found")
      return NextResponse.json({ hasSubscription: false })
    }

    // Search for customer by email
    console.log("[v0] [check-subscription] Searching Stripe for customer with email:", email)
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

    if (customers.data.length === 0) {
      console.log("[v0] [check-subscription] No Stripe customer found")
      return NextResponse.json({ hasSubscription: false })
    }

    const customer = customers.data[0]
    console.log("[v0] [check-subscription] Found Stripe customer:", customer.id)

    // Check for active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    })

    console.log("[v0] [check-subscription] Active subscriptions found:", subscriptions.data.length)

    if (subscriptions.data.length > 0) {
      console.log("[v0] [check-subscription] User has active subscription")
      return NextResponse.json({
        hasSubscription: true,
        subscriptionId: subscriptions.data[0].id,
        customerId: customer.id,
      })
    }

    console.log("[v0] [check-subscription] No active subscriptions")
    return NextResponse.json({ hasSubscription: false })
  } catch (error) {
    console.error("[v0] [check-subscription] Error checking subscription:", error)
    return NextResponse.json({ hasSubscription: false, error: String(error) })
  }
}
