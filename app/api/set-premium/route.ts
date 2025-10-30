import { type NextRequest, NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
      },
    })

    console.log("[v0] User manually set to premium:", userId)

    return NextResponse.json({ success: true, message: "Premium status activated" })
  } catch (error) {
    console.error("[v0] Set premium error:", error)
    return NextResponse.json({ error: "Failed to set premium status" }, { status: 500 })
  }
}
