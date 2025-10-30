import { type NextRequest, NextResponse } from "next/server"
import { clerkClient, currentUser } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user already has premium or active trial
    if (
      user.publicMetadata?.premium === true ||
      user.publicMetadata?.subscriptionStatus === "active" ||
      user.publicMetadata?.freeTrialActive === true
    ) {
      return NextResponse.json({ error: "User already has access" }, { status: 400 })
    }

    // Set free trial to expire in 14 days
    const trialExpiresAt = new Date()
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 14)

    const client = await clerkClient()
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        freeTrialActive: true,
        freeTrialStartedAt: new Date().toISOString(),
        freeTrialExpiresAt: trialExpiresAt.toISOString(),
      },
    })

    console.log("[v0] Free trial activated for user:", user.id)

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
