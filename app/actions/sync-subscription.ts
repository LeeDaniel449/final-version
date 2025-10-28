"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

export async function syncSubscriptionStatus() {
  try {
    const { userId } = await auth()

    if (!userId) {
      console.log("[v0] No user ID found")
      return { success: false, hasPremium: false }
    }

    console.log("[v0] Syncing subscription for user:", userId)

    // Check if user has an active subscription via Clerk Billing API
    const client = await clerkClient()
    const subscription = await client.billing.getUserBillingSubscription(userId)

    console.log("[v0] Subscription data:", JSON.stringify(subscription, null, 2))

    // Check if subscription is active
    const isActive = subscription?.status === "active"

    console.log("[v0] Subscription is active:", isActive)

    // Update user's publicMetadata with premium status
    if (isActive) {
      await client.users.updateUser(userId, {
        publicMetadata: {
          premium: true,
          subscriptionStatus: "active",
          subscriptionId: subscription.id,
        },
      })
      console.log("[v0] Updated user metadata with premium status")
    }

    return { success: true, hasPremium: isActive }
  } catch (error) {
    console.error("[v0] Error syncing subscription:", error)
    return { success: false, hasPremium: false, error: String(error) }
  }
}
