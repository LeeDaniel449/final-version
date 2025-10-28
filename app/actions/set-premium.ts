"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

export async function setPremiumStatus() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return { success: false, error: "Not authenticated" }
    }

    console.log("[v0] Setting premium status for user:", userId)

    // Update user's publicMetadata to set premium flag
    await clerkClient().users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
      },
    })

    console.log("[v0] Premium status set successfully")

    return { success: true }
  } catch (error) {
    console.error("[v0] Error setting premium status:", error)
    return { success: false, error: String(error) }
  }
}
