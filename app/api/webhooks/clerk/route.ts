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
    console.log("[v0] Event data keys:", Object.keys(evt.data || {}))
    console.log("[v0] Full event data structure:", JSON.stringify(evt.data, null, 2))

    if (eventType === "subscription.updated" || eventType === "subscription.created") {
      const userId =
        evt.data.user_id ||
        evt.data.userId ||
        evt.data.object?.user_id ||
        evt.data.object?.customer_id ||
        evt.data.metadata?.user_id ||
        evt.data.metadata?.userId ||
        evt.data.metadata?.clerk_user_id

      const subscriptionStatus = evt.data.status || evt.data.object?.status
      const subscriptionId = evt.data.id || evt.data.object?.id

      console.log("[v0] 🎉 Subscription event:", eventType)
      console.log("[v0] Extracted User ID:", userId)
      console.log("[v0] Subscription ID:", subscriptionId)
      console.log("[v0] Subscription Status:", subscriptionStatus)
      console.log("[v0] Checked locations for user ID:", {
        "evt.data.user_id": evt.data.user_id,
        "evt.data.userId": evt.data.userId,
        "evt.data.object?.user_id": evt.data.object?.user_id,
        "evt.data.object?.customer_id": evt.data.object?.customer_id,
        "evt.data.metadata?.user_id": evt.data.metadata?.user_id,
        "evt.data.metadata?.userId": evt.data.metadata?.userId,
        "evt.data.metadata?.clerk_user_id": evt.data.metadata?.clerk_user_id,
      })

      if (!userId) {
        console.error("[v0] ❌ No user ID found in subscription event")
        console.error("[v0] Full payload for debugging:", JSON.stringify(evt, null, 2))
        return new Response(
          JSON.stringify({
            error: "No user ID found",
            debug: {
              eventType,
              dataKeys: Object.keys(evt.data || {}),
              searchedLocations: [
                "evt.data.user_id",
                "evt.data.userId",
                "evt.data.object?.user_id",
                "evt.data.object?.customer_id",
                "evt.data.metadata?.user_id",
                "evt.data.metadata?.userId",
                "evt.data.metadata?.clerk_user_id",
              ],
            },
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      const shouldActivatePremium = subscriptionStatus === "active" || subscriptionStatus === "trialing"

      console.log("[v0] Should activate premium:", shouldActivatePremium)

      if (shouldActivatePremium) {
        console.log("[v0] 🚀 Activating premium for user:", userId)

        try {
          const client = await clerkClient()
          console.log("[v0] ✅ Clerk client initialized")

          const result = await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              premium: true,
              premiumActivatedAt: new Date().toISOString(),
              subscriptionId: subscriptionId,
              subscriptionStatus: subscriptionStatus,
            },
          })

          console.log("[v0] ✅ Premium activated successfully!")
          console.log("[v0] User ID:", result.id)
          console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
          console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

          return new Response(
            JSON.stringify({
              success: true,
              userId,
              message: "Premium activated",
              metadata: result.publicMetadata,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          )
        } catch (error) {
          console.error("[v0] ❌ Error activating premium:", error)
          console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
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
      } else {
        console.log("[v0] 🚀 Deactivating premium for user:", userId)

        try {
          const client = await clerkClient()
          console.log("[v0] ✅ Clerk client initialized")

          const result = await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              premium: false,
              premiumDeactivatedAt: new Date().toISOString(),
              subscriptionId: subscriptionId,
              subscriptionStatus: subscriptionStatus,
            },
          })

          console.log("[v0] ✅ Premium deactivated successfully!")
          console.log("[v0] User ID:", result.id)
          console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
          console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

          return new Response(
            JSON.stringify({
              success: true,
              userId,
              message: "Premium deactivated",
              metadata: result.publicMetadata,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          )
        } catch (error) {
          console.error("[v0] ❌ Error deactivating premium:", error)
          console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
          return new Response(
            JSON.stringify({
              error: "Error deactivating premium",
              details: error instanceof Error ? error.message : String(error),
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          )
        }
      }
    } else if (eventType === "organizationMembership.deleted") {
      const userId = evt.data.public_user_data?.user_id

      console.log("[v0] 👋 User left organization")
      console.log("[v0] User ID:", userId)

      if (!userId) {
        console.error("[v0] ❌ No user ID found in organizationMembership.deleted event")
        return new Response(JSON.stringify({ error: "No user ID found" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }

      console.log("[v0] 🚀 Deactivating premium for user:", userId)

      try {
        const client = await clerkClient()
        console.log("[v0] ✅ Clerk client initialized")

        const result = await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            premium: false,
            premiumDeactivatedAt: new Date().toISOString(),
          },
        })

        console.log("[v0] ✅ Premium deactivated successfully!")
        console.log("[v0] User ID:", result.id)
        console.log("[v0] New publicMetadata:", JSON.stringify(result.publicMetadata))
        console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

        return new Response(
          JSON.stringify({
            success: true,
            userId,
            message: "Premium deactivated",
            metadata: result.publicMetadata,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )
      } catch (error) {
        console.error("[v0] ❌ Error deactivating premium:", error)
        console.error("[v0] Error details:", error instanceof Error ? error.message : String(error))
        return new Response(
          JSON.stringify({
            error: "Error deactivating premium",
            details: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    } else {
      console.log("[v0] ⚠️ Unhandled event type:", eventType)
      return new Response(
        JSON.stringify({
          message: "Event type not handled",
          eventType,
        }),
        {
          status: 200,
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
