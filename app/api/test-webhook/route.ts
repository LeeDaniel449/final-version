import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  console.log("[v0] ========== TEST WEBHOOK ENDPOINT CALLED ==========")

  try {
    const body = await req.json()
    const userId = body.userId

    if (!userId) {
      console.log("[v0] ❌ No user ID provided in request")
      return new Response(
        JSON.stringify({
          success: false,
          error: "No user ID provided",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    console.log("[v0] Testing webhook logic for user:", userId)

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
