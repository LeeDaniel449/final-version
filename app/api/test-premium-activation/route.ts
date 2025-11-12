import { clerkClient } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  console.log("[v0] ========== TEST PREMIUM ACTIVATION ==========")

  try {
    const { userId: authUserId } = await auth()

    if (!authUserId) {
      console.error("[v0] ❌ User not authenticated")
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const body = await req.json()
    const { action, userId } = body

    // Use authenticated user ID if no specific userId provided
    const targetUserId = userId || authUserId

    console.log("[v0] Action:", action)
    console.log("[v0] Target User ID:", targetUserId)

    const client = await clerkClient()

    if (action === "activate") {
      console.log("[v0] 🚀 Activating premium for user:", targetUserId)

      const result = await client.users.updateUserMetadata(targetUserId, {
        publicMetadata: {
          premium: true,
          premiumActivatedAt: new Date().toISOString(),
          activatedBy: "test-endpoint",
        },
      })

      console.log("[v0] ✅ Premium activated successfully!")
      console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))

      return new Response(
        JSON.stringify({
          success: true,
          userId: targetUserId,
          message: "Premium activated",
          metadata: result.publicMetadata,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      )
    } else if (action === "deactivate") {
      console.log("[v0] 🚀 Deactivating premium for user:", targetUserId)

      const result = await client.users.updateUserMetadata(targetUserId, {
        publicMetadata: {
          premium: false,
          premiumDeactivatedAt: new Date().toISOString(),
          deactivatedBy: "test-endpoint",
        },
      })

      console.log("[v0] ✅ Premium deactivated successfully!")
      console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))

      return new Response(
        JSON.stringify({
          success: true,
          userId: targetUserId,
          message: "Premium deactivated",
          metadata: result.publicMetadata,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      )
    } else {
      console.error("[v0] ❌ Invalid action:", action)
      return new Response(JSON.stringify({ error: "Invalid action. Use 'activate' or 'deactivate'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (error) {
    console.error("[v0] ❌ Error in test activation:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to update premium status",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
