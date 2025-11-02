import { NextResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    console.log("[v0] Force activating premium for user:", userId)

    const client = await clerkClient()

    await client.users.updateUser(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
        premiumActivatedAt: new Date().toISOString(),
        forceActivated: true,
      },
    })

    console.log("[v0] Premium force activated successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error force activating premium:", error)
    return NextResponse.json(
      { error: "Failed to activate premium", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
