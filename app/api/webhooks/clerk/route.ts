import { headers } from "next/headers"
import { Webhook } from "svix"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  console.log("[v0] ========== CLERK WEBHOOK RECEIVED ==========")
  console.log("[v0] Timestamp:", new Date().toISOString())

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error("[v0] ❌ CLERK_WEBHOOK_SECRET is not set!")
    throw new Error("Please add CLERK_WEBHOOK_SECRET to your environment variables")
  }

  console.log("[v0] ✅ Webhook secret is configured")

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  console.log("[v0] Svix headers:", {
    id: svix_id ? "present" : "missing",
    timestamp: svix_timestamp ? "present" : "missing",
    signature: svix_signature ? "present" : "missing",
  })

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("[v0] ❌ Missing svix headers")
    return new Response("Error: Missing svix headers", { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

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
    return new Response("Error: Verification failed", { status: 400 })
  }

  const eventType = evt.type

  console.log("[v0] Event type:", eventType)
  console.log("[v0] Full event data:", JSON.stringify(evt.data, null, 2))

  let userId: string | null = null

  if (
    eventType === "subscription.created" ||
    eventType === "subscription.active" ||
    eventType === "subscription.updated"
  ) {
    // For subscription events, user ID is in userId field
    userId = evt.data.userId || evt.data.user_id
    console.log("[v0] Extracted user ID from subscription event:", userId)
    console.log("[v0] Subscription status:", evt.data.status)
    console.log("[v0] Subscription ID:", evt.data.id)
  } else if (eventType === "organizationMembership.created") {
    // For organization membership events, user ID is in public_user_data.user_id
    userId = evt.data.public_user_data?.user_id
    console.log("[v0] Extracted user ID from organizationMembership.created:", userId)
  } else if (eventType === "user.updated") {
    // For user events, user ID is in id
    userId = evt.data.id
    console.log("[v0] Extracted user ID from user.updated:", userId)
  } else {
    console.log("[v0] ⚠️ Unhandled event type:", eventType)
  }

  if (!userId) {
    console.log("[v0] ❌ No user ID found for event type:", eventType)
    return new Response("No user ID found", { status: 200 })
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

    return new Response("Premium activated", { status: 200 })
  } catch (error) {
    console.error("[v0] ❌ Error activating premium:", error)
    console.error("[v0] Error details:", JSON.stringify(error, null, 2))
    return new Response("Error activating premium", { status: 500 })
  }
}
