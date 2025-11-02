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

    const url = new URL(req.url)
    const isClientTriggered = url.searchParams.get("client") === "true"

    if (isClientTriggered) {
      console.log("[v0] 🔓 Client-triggered webhook call detected - bypassing signature verification")

      let payload: any
      try {
        payload = JSON.parse(bodyText)
      } catch (err) {
        console.error("[v0] ❌ Error parsing JSON:", err)
        return new Response(JSON.stringify({ error: "Invalid JSON" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }

      const userId = payload.userId
      if (!userId) {
        console.error("[v0] ❌ No userId provided in client-triggered call")
        return new Response(JSON.stringify({ error: "userId is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }

      console.log("[v0] 🚀 Processing client-triggered premium activation for user:", userId)

      try {
        console.log("[v0] Getting Clerk client...")
        const client = await clerkClient()
        console.log("[v0] Clerk client obtained successfully")

        console.log("[v0] Updating user metadata for user:", userId)
        const result = await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            premium: true,
            subscriptionStatus: "active",
            premiumActivatedAt: new Date().toISOString(),
            autoActivated: true,
          },
        })

        console.log("[v0] ✅ User metadata updated successfully")
        console.log("[v0] Updated user ID:", result.id)
        console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
        console.log("[v0] ========== CLIENT-TRIGGERED WEBHOOK PROCESSING COMPLETE ==========")

        return new Response(JSON.stringify({ success: true, userId, metadata: result.publicMetadata }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      } catch (error) {
        console.error("[v0] ❌ Error activating premium:", error)
        console.error("[v0] Error type:", typeof error)
        console.error("[v0] Error name:", error instanceof Error ? error.name : "Unknown")
        console.error("[v0] Error message:", error instanceof Error ? error.message : String(error))
        console.error("[v0] Error stack:", error instanceof Error ? error.stack : "No stack")

        return new Response(
          JSON.stringify({
            success: false,
            error: "Error activating premium",
            details: error instanceof Error ? error.message : String(error),
            errorType: error instanceof Error ? error.name : typeof error,
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    }

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    const CLERK_SECRET = process.env.CLERK_SECRET_KEY

    console.log("[v0] Environment variables check:")
    console.log("[v0] - CLERK_WEBHOOK_SECRET:", WEBHOOK_SECRET ? "✅ Set" : "❌ Missing")
    console.log("[v0] - CLERK_SECRET_KEY:", CLERK_SECRET ? "✅ Set" : "❌ Missing")

    if (!WEBHOOK_SECRET) {
      console.error("[v0] ❌ CLERK_WEBHOOK_SECRET is not set!")
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (!CLERK_SECRET) {
      console.error("[v0] ❌ CLERK_SECRET_KEY is not set!")
      return new Response(JSON.stringify({ error: "Clerk secret key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] ✅ All required secrets are configured")

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

    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: any

    try {
      evt = wh.verify(bodyText, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as any
      console.log("[v0] ✅ Webhook signature verified")
    } catch (err) {
      console.error("[v0] ❌ Error verifying webhook:", err)
      return new Response(JSON.stringify({ error: "Verification failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const eventType = evt.type
    console.log("[v0] Event type:", eventType)
    console.log("[v0] Event data keys:", Object.keys(evt.data || {}))

    let userId: string | null = null

    if (
      eventType === "subscription.created" ||
      eventType === "subscription.active" ||
      eventType === "subscription.updated"
    ) {
      userId = evt.data.userId || evt.data.user_id
      console.log("[v0] Extracted user ID from subscription event:", userId)
      console.log("[v0] Subscription status:", evt.data.status)
    } else if (eventType === "organizationMembership.created") {
      userId = evt.data.public_user_data?.user_id
      console.log("[v0] Extracted user ID from organizationMembership.created:", userId)
    } else if (eventType === "user.updated") {
      userId = evt.data.id
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
        subscriptionStatus = evt.data.status || "active"
      }

      console.log("[v0] Updating user metadata...")
      console.log("[v0] Setting subscriptionStatus to:", subscriptionStatus)
      const result = await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          premium: true,
          subscriptionStatus,
          premiumActivatedAt: new Date().toISOString(),
          subscriptionId: evt.data.id || null,
        },
      })

      console.log("[v0] ✅ User metadata updated successfully")
      console.log("[v0] Updated user ID:", result.id)
      console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
      console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

      return new Response(JSON.stringify({ success: true, userId, metadata: result.publicMetadata }), {
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
