import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  console.log("[v0] ========== MANUAL PREMIUM ACTIVATION ==========")

  try {
    const body = await req.json()
    const { userId } = body

    if (!userId) {
      console.log("[v0] ❌ No user ID provided in request")
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] Activating premium for user:", userId)

    const client = await clerkClient()
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
        premiumActivatedAt: new Date().toISOString(),
        manualActivation: true,
      },
    })

    console.log("[v0] ✅ Premium activated successfully")

    return new Response(JSON.stringify({ success: true, message: "Premium activated successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("[v0] ❌ Error activating premium:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to activate premium",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
