import { type NextRequest, NextResponse } from "next/server"
import { auth, clerkClient } from "@clerk/nextjs/server"

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { targetUserId, premium } = body

    if (!targetUserId || typeof premium !== "boolean") {
      return NextResponse.json(
        { error: "Missing or invalid parameters. Required: targetUserId (string), premium (boolean)" },
        { status: 400 },
      )
    }

    console.log("[v0] Setting premium status for user:", targetUserId, "to:", premium)

    // Update the target user's metadata
    const client = await clerkClient()
    await client.users.updateUserMetadata(targetUserId, {
      publicMetadata: {
        premium: premium,
      },
    })

    console.log("[v0] Successfully updated premium status")

    return NextResponse.json({
      success: true,
      message: `Premium status set to ${premium} for user ${targetUserId}`,
    })
  } catch (error) {
    console.error("[v0] Error setting premium status:", error)
    return NextResponse.json(
      { error: "Failed to set premium status", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
