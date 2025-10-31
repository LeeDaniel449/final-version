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
    console.error("Error verifying webhook:", err)
    return new Response("Error: Verification failed", { status: 400 })
  }

  const eventType = evt.type

  console.log("[v0] Clerk webhook received:", eventType)
  console.log("[v0] Webhook payload:", JSON.stringify(evt.data, null, 2))

  let userId: string | null = null

  if (eventType === "organizationMembership.created") {
    // For organization membership events, user ID is in public_user_data.user_id
    userId = evt.data.public_user_data?.user_id
  } else if (eventType === "user.updated") {
    // For user events, user ID is in id
    userId = evt.data.id
  }

  if (!userId) {
    console.log("[v0] No user ID found for event type:", eventType)
    return new Response("No user ID found", { status: 200 })
  }

  console.log("[v0] Processing premium activation for user:", userId)

  try {
    const client = await clerkClient()

    // Set premium metadata when user joins an organization or is updated
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        premium: true,
        subscriptionStatus: "active",
        premiumActivatedAt: new Date().toISOString(),
      },
    })

    console.log("[v0] ✅ Premium activated successfully for user:", userId)

    return new Response("Premium activated", { status: 200 })
  } catch (error) {
    console.error("[v0] ❌ Error activating premium:", error)
    return new Response("Error activating premium", { status: 500 })
  }
}
