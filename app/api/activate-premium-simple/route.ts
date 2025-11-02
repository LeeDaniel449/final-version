import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("[v0] ========== SIMPLE PREMIUM ACTIVATION ==========")

    // Get the authenticated user
    const { userId } = await auth()

    if (!userId) {
      console.log("[v0] No authenticated user")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Activating premium for user:", userId)

    // Update user metadata to set premium status
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        premiumActivatedAt: new Date().toISOString(),
      },
    })

    console.log("[v0] Successfully activated premium for user:", userId)

    return NextResponse.json({
      success: true,
      message: "Premium activated successfully",
    })
  } catch (error) {
    console.error("[v0] Error activating premium:", error)
    return NextResponse.json(
      {
        error: "Failed to activate premium",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
