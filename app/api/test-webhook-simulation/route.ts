import { clerkClient } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"

export async function POST() {
  console.log("[v0] ========== AUTOMATIC WEBHOOK TEST ==========")

  try {
    const { userId } = await auth()

    if (!userId) {
      console.log("[v0] ❌ No user signed in")
      return new Response(
        JSON.stringify({
          success: false,
          error: "No user signed in",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    console.log("[v0] User ID:", userId)
    console.log("[v0] Simulating subscription.updated event...")

    const client = await clerkClient()

    // Check current status
    const user = await client.users.getUser(userId)
    console.log("[v0] Current publicMetadata:", JSON.stringify(user.publicMetadata))

    // Update to premium
    const result = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        premiumActivatedAt: new Date().toISOString(),
        subscriptionId: "test_sub_" + Date.now(),
        subscriptionStatus: "active",
      },
    })

    console.log("[v0] ✅ Premium activated automatically!")
    console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
    console.log("[v0] ========== TEST COMPLETE ==========")

    return new Response(
      JSON.stringify({
        success: true,
        message: "Premium activated automatically via webhook simulation",
        userId: result.id,
        metadata: result.publicMetadata,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("[v0] ❌ Error in test:", error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
