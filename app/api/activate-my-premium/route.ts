import { type NextRequest, NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(request: NextRequest) {
  console.log("[v0] ========== SIMPLE PREMIUM ACTIVATION ==========")

  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      console.error("[v0] ❌ No userId provided in request")
      return NextResponse.json({ error: "userId is required" }, { status: 400 })
    }

    console.log("[v0] Activating premium for user:", userId)

    const client = await clerkClient()
    const result = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
        premiumActivatedAt: new Date().toISOString(),
        manuallyActivated: true,
      },
    })

    console.log("[v0] ✅ Premium activated successfully")
    console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))

    return NextResponse.json({
      success: true,
      message: "Premium activated successfully",
      metadata: result.publicMetadata,
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
