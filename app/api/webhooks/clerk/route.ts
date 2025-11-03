import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"

export async function POST(req: Request) {
  // Get the webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error("[v0] Missing CLERK_WEBHOOK_SECRET environment variable")
    return new Response("Webhook secret not configured", { status: 500 })
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("[v0] Missing svix headers")
    return new Response("Missing svix headers", { status: 400 })
  }

  // Get the body
  const payload = await req.text()

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the webhook signature
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("[v0] Error verifying webhook:", err)
    return new Response("Invalid signature", { status: 400 })
  }

  console.log("[v0] Webhook event received:", evt.type)

  // Handle the webhook event
  const eventType = evt.type

  try {
    // Handle organization membership created (user subscribed via PricingTable)
    if (eventType === "organizationMembership.created") {
      const { organization, public_user_data } = evt.data
      const userId = public_user_data.user_id

      console.log("[v0] User joined organization:", {
        userId,
        orgId: organization.id,
        orgName: organization.name,
      })

      // Set premium metadata for the user
      const client = await clerkClient()
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          premium: true,
          premiumSince: new Date().toISOString(),
          organizationId: organization.id,
        },
      })

      console.log("[v0] Premium metadata set for user:", userId)

      return new Response(JSON.stringify({ success: true, userId }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Handle organization membership deleted (user unsubscribed)
    if (eventType === "organizationMembership.deleted") {
      const { public_user_data } = evt.data
      const userId = public_user_data.user_id

      console.log("[v0] User left organization:", userId)

      // Remove premium metadata
      const client = await clerkClient()
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          premium: false,
        },
      })

      console.log("[v0] Premium metadata removed for user:", userId)

      return new Response(JSON.stringify({ success: true, userId }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Log unhandled event types
    console.log("[v0] Unhandled webhook event type:", eventType)

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("[v0] Error processing webhook:", error)
    return new Response(
      JSON.stringify({
        error: "Error processing webhook",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
