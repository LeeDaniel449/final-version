"use server"

import { clerkClient } from "@clerk/nextjs/server"

export async function activatePremium(userId: string) {
  try {
    console.log("[v0] Manually activating premium for user:", userId)

    // Update user's publicMetadata to set premium flag
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
      },
    })

    console.log("[v0] Successfully activated premium for user:", userId)

    return {
      success: true,
      message: "Premium activated successfully",
    }
  } catch (error) {
    console.error("[v0] Error activating premium:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to activate premium",
    }
  }
}
