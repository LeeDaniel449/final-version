import { Webhook } from "svix"
import { clerkClient } from "@clerk/nextjs/server"

export async function GET() {
  console.log("[v0] Webhook endpoint GET request received")
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
  try {
    console.log("[v0] ========== CLERK WEBHOOK RECEIVED ==========")
    console.log("[v0] Timestamp:", new Date().toISOString())
    console.log("[v0] Request URL:", req.url)
    console.log("[v0] Request method:", req.method)

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
      console.error("[v0] ❌ CLERK_WEBHOOK_SECRET is not set!")
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[v0] ✅ Webhook secret is configured")

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

    const payload = await req.json()
    const body = JSON.stringify(payload)

    console.log("[v0] Payload received, size:", body.length, "bytes")

    const wh = new Webhook(WEBHOOK_SECRET)

    let evt: any

    try {
      evt = wh.verify(body, {
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
      const client = await clerkClient()

      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          premium: true,
          subscriptionStatus: "active",
          premiumActivatedAt: new Date().toISOString(),
          subscriptionId: evt.data.id || null,
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
      return new Response(JSON.stringify({ error: "Error activating premium" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (error) {
    console.error("[v0] ❌ Unexpected error in webhook handler:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
