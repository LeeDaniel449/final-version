import { Webhook } from "svix"
import { clerkClient } from "@clerk/nextjs/server"

export async function GET() {
  console.log("[v0] ✅ Webhook endpoint GET request - endpoint is reachable!")
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "Clerk webhook endpoint is reachable",
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}

export async function POST(req: Request) {
  console.log("[v0] ========== CLERK WEBHOOK POST RECEIVED ==========")
  console.log("[v0] Timestamp:", new Date().toISOString())

  try {
    const bodyText = await req.text()
    console.log("[v0] Request body received, length:", bodyText.length)

    const isClientTriggered = req.headers.get("X-Client-Trigger") === "true"
    console.log("[v0] Client-triggered:", isClientTriggered)

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    const CLERK_SECRET = process.env.CLERK_SECRET_KEY

    console.log("[v0] Environment variables check:")
    console.log("[v0] - CLERK_WEBHOOK_SECRET:", WEBHOOK_SECRET ? "✅ Set" : "❌ Missing")
    console.log("[v0] - CLERK_SECRET_KEY:", CLERK_SECRET ? "✅ Set" : "❌ Missing")

    if (!CLERK_SECRET) {
      console.error("[v0] ❌ CLERK_SECRET_KEY is not set!")
      return new Response(JSON.stringify({ error: "Clerk secret key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    let payload: any
    try {
      payload = JSON.parse(bodyText)
      console.log("[v0] ✅ Payload parsed successfully")
    } catch (err) {
      console.error("[v0] ❌ Error parsing JSON:", err)
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!isClientTriggered) {
      if (!WEBHOOK_SECRET) {
        console.error("[v0] ❌ CLERK_WEBHOOK_SECRET is not set!")
        return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        })
      }

      const svix_id = req.headers.get("svix-id")
      const svix_timestamp = req.headers.get("svix-timestamp")
      const svix_signature = req.headers.get("svix-signature")

      console.log("[v0] Svix headers:", {
        id: svix_id ? "present" : "missing",
        timestamp: svix_timestamp ? "present" : "missing",
        signature: svix_signature ? "present" : "missing",
      })

      if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("[v0] ❌ Missing svix headers")
        return new Response(JSON.stringify({ error: "Missing svix headers" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }

      const wh = new Webhook(WEBHOOK_SECRET)
      let evt: any

      try {
        evt = wh.verify(bodyText, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        }) as any
        console.log("[v0] ✅ Webhook signature verified")
        payload = evt
      } catch (err) {
        console.error("[v0] ❌ Error verifying webhook:", err)
        return new Response(JSON.stringify({ error: "Verification failed" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }
    } else {
      console.log("[v0] ⚠️ Skipping signature verification for client-triggered call")
    }

    const eventType = payload.type
    console.log("[v0] Event type:", eventType)
    console.log("[v0] Event data keys:", Object.keys(payload.data || {}))

    let userId: string | null = null

    if (
      eventType === "subscription.created" ||
      eventType === "subscription.active" ||
      eventType === "subscription.updated"
    ) {
      userId = payload.data.userId || payload.data.user_id
      console.log("[v0] Extracted user ID from subscription event:", userId)
      console.log("[v0] Subscription status:", payload.data.status)
    } else if (eventType === "organizationMembership.created") {
      userId = payload.data.public_user_data?.user_id
      console.log("[v0] Extracted user ID from organizationMembership.created:", userId)
    } else if (eventType === "user.updated") {
      userId = payload.data.id
      console.log("[v0] Extracted user ID from user.updated:", userId)
    } else {
      console.log("[v0] ⚠️ Unhandled event type:", eventType)
      return new Response(JSON.stringify({ message: "Event type not handled" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!userId) {
      console.log("[v0] ❌ No user ID found for event type:", eventType)
      return new Response(JSON.stringify({ message: "No user ID found" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] 🚀 Processing premium activation for user:", userId)

    try {
      console.log("[v0] Initializing Clerk client...")
      const client = await clerkClient()
      console.log("[v0] ✅ Clerk client initialized successfully")

      let subscriptionStatus = "active"
      if (eventType === "subscription.created") {
        subscriptionStatus = "created"
      } else if (eventType === "subscription.active") {
        subscriptionStatus = "active"
      } else if (eventType === "subscription.updated") {
        subscriptionStatus = payload.data.status || "active"
      }

      console.log("[v0] Updating user metadata...")
      console.log("[v0] Setting subscriptionStatus to:", subscriptionStatus)
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          premium: true,
          subscriptionStatus,
          premiumActivatedAt: new Date().toISOString(),
          subscriptionId: payload.data.id || null,
        },
      })

      console.log("[v0] ✅ Premium activated successfully for user:", userId)
      console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

      return new Response(JSON.stringify({ success: true, userId }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } catch (error) {
      console.error("[v0] ❌ Error activating premium:", error)
      console.error("[v0] Error name:", error instanceof Error ? error.name : "Unknown")
      console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
      console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
      return new Response(
        JSON.stringify({
          error: "Error activating premium",
          details: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("[v0] ❌ Unexpected error in webhook handler:", error)
    console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack trace")
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
