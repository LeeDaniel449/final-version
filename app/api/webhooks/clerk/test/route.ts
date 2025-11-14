import { clerkClient } from "@clerk/nextjs/server"

// Simple test endpoint to verify webhook connectivity
export async function GET() {
  console.log("[v0] 🧪 Webhook test endpoint called")
  
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Clerk webhook test endpoint is working",
      timestamp: new Date().toISOString(),
      endpoint: "/api/webhooks/clerk/test",
      mainWebhookUrl: "/api/webhooks/clerk",
      instructions: "Configure your Clerk webhook to point to the main webhook URL",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}

// Manual premium activation endpoint (no webhook signature required)
export async function POST(req: Request) {
  console.log("[v0] 🧪 Manual premium activation requested")
  
  try {
    const body = await req.json()
    const userId = body.userId
    
    if (!userId) {
      return new Response(
        JSON.stringify({
          error: "userId is required",
          example: { userId: "user_xxxxx" },
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
    
    console.log("[v0] Activating premium for user:", userId)
    
    const client = await clerkClient()
    const result = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        premiumActivatedAt: new Date().toISOString(),
        activatedVia: "manual_test_endpoint",
      },
    })
    
    console.log("[v0] ✅ Premium activated successfully!")
    
    return new Response(
      JSON.stringify({
        success: true,
        userId,
        message: "Premium activated via test endpoint",
        metadata: result.publicMetadata,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("[v0] ❌ Error in test endpoint:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to activate premium",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
