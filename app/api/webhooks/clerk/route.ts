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

    if (eventType === "user.created" || eventType === "user.updated") {
      const userId = evt.data?.id

      console.log("[v0] 👤 User event received:", eventType)
      console.log("[v0] User ID:", userId)

      if (!userId) {
        console.error("[v0] ❌ No user ID found in user event")
        return new Response(JSON.stringify({ error: "No user ID found" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }

      const userMetadata = evt.data?.public_metadata || evt.data?.publicMetadata || {}
      const currentPremiumStatus = userMetadata.premium === true

      console.log("[v0] Current user metadata:", JSON.stringify(userMetadata))
      console.log("[v0] Current premium status:", currentPremiumStatus)

      const hasPremiumIndicator =
        userMetadata.premium === true ||
        userMetadata.isPremium === true ||
        userMetadata.subscriptionStatus === "active" ||
        userMetadata.subscriptionStatus === "trialing"

      console.log("[v0] Premium indicator found in metadata:", hasPremiumIndicator)

      if (hasPremiumIndicator) {
        try {
          const client = await clerkClient()

          const result = await client.users.updateUserMetadata(userId, {
            publicMetadata: {
              ...userMetadata,
              premium: true,
              premiumActivatedAt: userMetadata.premiumActivatedAt || new Date().toISOString(),
              lastWebhookEvent: eventType,
              lastWebhookTimestamp: new Date().toISOString(),
            },
          })

          console.log("[v0] ✅ Premium status synced successfully!")
          console.log("[v0] User ID:", result.id)
          console.log("[v0] Premium: true")
          console.log("[v0] Updated metadata:", JSON.stringify(result.publicMetadata, null, 2))
          console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

          return new Response(
            JSON.stringify({
              success: true,
              userId,
              premium: true,
              message: "Premium status synced",
              metadata: result.publicMetadata,
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
        console.log("[v0] ℹ️ No premium indicator in user metadata")
        return new Response(
          JSON.stringify({
            success: true,
            userId,
            message: "User event processed, no premium indicator found",
            premium: currentPremiumStatus,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    }

    if (eventType === "subscription.updated" || eventType === "subscription.created") {
      console.log("[v0] 🔔 Subscription event detected!")
      console.log("[v0] Full subscription event payload:", JSON.stringify(evt, null, 2))

      const userId =
        evt.data?.user_id ||
        evt.data?.userId ||
        evt.data?.id ||
        evt.data?.object?.user_id ||
        evt.data?.object?.userId ||
        evt.data?.object?.customer_id ||
        evt.data?.object?.metadata?.clerk_user_id ||
        evt.data?.object?.metadata?.user_id ||
        evt.data?.metadata?.clerk_user_id ||
        evt.data?.metadata?.user_id ||
        evt.data?.metadata?.userId

      console.log("[v0] Extracted User ID:", userId)
      console.log("[v0] All checked paths for user ID:", {
        "evt.data.user_id": evt.data?.user_id,
        "evt.data.userId": evt.data?.userId,
        "evt.data.id": evt.data?.id,
        "evt.data.object.user_id": evt.data?.object?.user_id,
        "evt.data.object.customer_id": evt.data?.object?.customer_id,
        "evt.data.object.metadata.clerk_user_id": evt.data?.object?.metadata?.clerk_user_id,
        "evt.data.metadata.clerk_user_id": evt.data?.metadata?.clerk_user_id,
      })

      if (!userId) {
        console.warn("[v0] ⚠️ No user ID found in subscription event - event accepted but no action taken")
        console.warn("[v0] To activate premium from subscription events, include one of these in the payload:")
        console.warn("[v0] - evt.data.user_id")
        console.warn("[v0] - evt.data.metadata.clerk_user_id")
        console.warn("[v0] - evt.data.object.metadata.clerk_user_id")
        
        return new Response(
          JSON.stringify({
            success: true,
            message: "Subscription event received but no user_id found",
            hint: "Include user_id or metadata.clerk_user_id in the payload to activate premium",
            eventType,
            timestamp: new Date().toISOString(),
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )
      }

      const subscriptionStatus = evt.data?.status || evt.data?.object?.status || "active"
      const shouldActivatePremium =
        subscriptionStatus === "active" || subscriptionStatus === "trialing" || subscriptionStatus === "paid"

      console.log("[v0] Subscription status:", subscriptionStatus)
      console.log("[v0] Will activate premium:", shouldActivatePremium)

      try {
        const client = await clerkClient()

        await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            premium: shouldActivatePremium,
            premiumUpdatedAt: new Date().toISOString(),
            subscriptionStatus: subscriptionStatus,
            lastWebhookEvent: eventType,
          },
        })

        console.log("[v0] ✅ Premium status updated from subscription event!")
        console.log("[v0] ========== WEBHOOK PROCESSING COMPLETE ==========")

        return new Response(
          JSON.stringify({
            success: true,
            userId,
            premium: shouldActivatePremium,
            message: shouldActivatePremium ? "Premium activated" : "Premium deactivated",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )
      } catch (error) {
        console.error("[v0] ❌ Error updating premium status:", error)
        return new Response(
          JSON.stringify({
            error: "Error updating premium status",
            details: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        )
      }
    }

    if (eventType === "organizationMembership.deleted") {
      const userId = evt.data.public_user_data?.user_id

      console.log("[v0] 👋 User left organization, User ID:", userId)

      if (!userId) {
        console.error("[v0] ❌ No user ID found")
        return new Response(JSON.stringify({ error: "No user ID found" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      }

      try {
        const client = await clerkClient()

        const result = await client.users.updateUserMetadata(userId, {
          publicMetadata: {
            premium: false,
            premiumDeactivatedAt: new Date().toISOString(),
          },
        })

        console.log("[v0] ✅ Premium deactivated successfully!")

        return new Response(
          JSON.stringify({
            success: true,
            userId,
            message: "Premium deactivated",
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        )
      } catch (error) {
        console.error("[v0] ❌ Error deactivating premium:", error)
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
