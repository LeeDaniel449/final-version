import { headers } from "next/headers"
import { Webhook } from "svix"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to your environment variables")
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
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
  } catch (err) {
    console.error("[v0] Error verifying webhook:", err)
    return new Response("Error: Verification failed", { status: 400 })
  }

  const eventType = evt.type
  console.log("[v0] Clerk billing webhook received:", eventType)

  // Handle subscription events
  if (eventType === "subscription.created" || eventType === "subscription.updated") {
    const { user_id, status } = evt.data

    console.log("[v0] Subscription event for user:", user_id, "status:", status)

    // Update user metadata when subscription is active
    if (status === "active") {
      try {
        const client = await clerkClient()
        await client.users.updateUserMetadata(user_id, {
          publicMetadata: {
            premium: true,
            subscriptionStatus: "active",
            clerkSubscriptionId: evt.data.id,
          },
        })
        console.log("[v0] Updated user metadata for premium access:", user_id)
      } catch (error) {
        console.error("[v0] Error updating user metadata:", error)
        return new Response("Error: Failed to update user", { status: 500 })
      }
    }
  }

  // Handle subscription cancellation
  if (eventType === "subscription.deleted" || eventType === "subscription.cancelled") {
    const { user_id } = evt.data

    console.log("[v0] Subscription cancelled for user:", user_id)

    try {
      const client = await clerkClient()
      await client.users.updateUserMetadata(user_id, {
        publicMetadata: {
          premium: false,
          subscriptionStatus: "cancelled",
        },
      })
      console.log("[v0] Removed premium access for user:", user_id)
    } catch (error) {
      console.error("[v0] Error updating user metadata:", error)
      return new Response("Error: Failed to update user", { status: 500 })
    }
  }

  return new Response("Webhook processed", { status: 200 })
}
