import { auth, clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log("[v0] TEST: Setting premium for user:", userId)

    const client = await clerkClient()

    // Set premium metadata
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
        premiumActivatedAt: new Date().toISOString(),
        testActivation: true,
      },
    })

    console.log("[v0] TEST: ✅ Premium activated successfully for user:", userId)

    return NextResponse.json({
      success: true,
      message: "Premium activated successfully",
      userId,
      metadata: {
        premium: true,
        subscriptionStatus: "active",
      },
    })
  } catch (error) {
    console.error("[v0] TEST: ❌ Error activating premium:", error)
    return NextResponse.json({ error: "Failed to activate premium", details: error }, { status: 500 })
  }
}
