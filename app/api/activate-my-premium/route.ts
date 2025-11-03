import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Get the authenticated user
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized - please sign in" }, { status: 401 })
    }

    console.log("[v0] Setting premium for user:", userId)

    // Update the user's metadata to grant premium
    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        premiumActivatedAt: new Date().toISOString(),
      },
    })

    console.log("[v0] Successfully set premium for user:", userId)

    return NextResponse.json({
      success: true,
      message: "Premium activated successfully",
      userId,
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
