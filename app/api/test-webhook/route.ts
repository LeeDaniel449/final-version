import { auth } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  console.log("[v0] ========== TEST WEBHOOK ENDPOINT CALLED ==========")

  const { userId } = await auth()

  if (!userId) {
    console.log("[v0] ❌ No authenticated user")
    return new Response("Unauthorized", { status: 401 })
  }

  console.log("[v0] Testing webhook logic for user:", userId)

  try {
    const client = await clerkClient()

    // Simulate what the webhook does: set premium metadata
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
        premiumActivatedAt: new Date().toISOString(),
        activatedVia: "test-endpoint",
      },
    })

    console.log("[v0] ✅ Test webhook: Premium activated successfully for user:", userId)

    return new Response(
      JSON.stringify({
        success: true,
        message: "Premium activated via test endpoint",
        userId,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("[v0] ❌ Test webhook error:", error)
    return new Response(
      JSON.stringify({
        success: false,
        error: String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
