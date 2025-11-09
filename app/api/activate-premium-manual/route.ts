import { clerkClient } from "@clerk/nextjs/server"
import { auth } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  console.log("[v0] ========== MANUAL PREMIUM ACTIVATION ==========")

  try {
    const { userId: authUserId } = await auth()

    console.log("[v0] Authenticated user ID:", authUserId)

    if (!authUserId) {
      console.error("[v0] ❌ No authenticated user")
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] 🚀 Activating premium for user:", authUserId)

    const client = await clerkClient()
    const result = await client.users.updateUserMetadata(authUserId, {
      publicMetadata: {
        premium: true,
        premiumActivatedAt: new Date().toISOString(),
        activationMethod: "manual",
      },
    })

    console.log("[v0] ✅ Premium activated successfully!")
    console.log("[v0] User ID:", result.id)
    console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))

    return new Response(
      JSON.stringify({
        success: true,
        userId: result.id,
        message: "Premium activated successfully",
        metadata: result.publicMetadata,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error("[v0] ❌ Error activating premium:", error)
    return new Response(
      JSON.stringify({
        error: "Error activating premium",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
