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
    console.log("[v0] Full event data:", JSON.stringify(evt.data, null, 2))

    if (eventType !== "user.updated") {
      console.log("[v0] ⚠️ Event type not supported:", eventType)
      console.log("[v0] Only user.updated events are processed")
      return new Response(
        JSON.stringify({
          received: true,
          message: "Only user.updated events are processed",
          eventType,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    const userId = evt.data?.id

    console.log("[v0] 👤 user.updated event received")
    console.log("[v0] User ID:", userId)

    if (!userId) {
      console.error("[v0] ❌ No user ID found in user.updated event")
      return new Response(JSON.stringify({ error: "No user ID found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const userMetadata = evt.data?.public_metadata || evt.data?.publicMetadata || {}
    const hasPremium = userMetadata.premium === true

    console.log("[v0] Current user metadata:", JSON.stringify(userMetadata, null, 2))
    console.log("[v0] Premium status in metadata:", hasPremium)

    if (hasPremium) {
      console.log("[v0] ✅ Premium detected in metadata - syncing status")

      try {
        const client = await clerkClient()

        const result = await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            ...userMetadata,
            premium: true,
            plan: 'premium',
            premiumActivatedAt: userMetadata.premiumActivatedAt || new Date().toISOString(),
            lastWebhookSync: new Date().toISOString(),
          },
        })

        console.log("[v0] ✅ Premium status synced successfully!")
        console.log("[v0] Updated metadata:", JSON.stringify(result.publicMetadata, null, 2))
        console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

        return new Response(
          JSON.stringify({
            success: true,
            userId,
            premium: true,
            message: "Premium status synced from user.updated event",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )
      } catch (error) {
        console.error("[v0] ❌ Error syncing premium status:", error)
        return new Response(
          JSON.stringify({
            error: "Error syncing premium status",
            userId,
            details: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    } else {
      console.log("[v0] ℹ️ No premium flag in user metadata")
      return new Response(
        JSON.stringify({
          success: true,
          userId,
          message: "user.updated event processed - no premium flag in metadata",
          premium: false,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
  } catch (error) {
    console.error("[v0] ❌ Unexpected error in webhook handler:", error)
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
