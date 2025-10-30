import { type NextRequest, NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Set free trial to expire in 14 days
    const trialExpiresAt = new Date()
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 14)

    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        freeTrialActive: true,
        freeTrialExpiresAt: trialExpiresAt.toISOString(),
      },
    })

    console.log("[v0] Free trial activated for user:", userId, "expires:", trialExpiresAt.toISOString())

    return NextResponse.json({
      success: true,
      message: "Free trial activated",
      expiresAt: trialExpiresAt.toISOString(),
    })
  } catch (error) {
    console.error("[v0] Start free trial error:", error)
    return NextResponse.json({ error: "Failed to start free trial" }, { status: 500 })
  }
}
