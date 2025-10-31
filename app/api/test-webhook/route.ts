import { NextResponse } from "next/server"

export async function GET() {
  console.log("[v0] ========== WEBHOOK TEST ENDPOINT ==========")

  // Check if webhook secret is set
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

  if (!webhookSecret) {
    return NextResponse.json(
      {
        success: false,
        error: "CLERK_WEBHOOK_SECRET is not set in environment variables",
        instructions: "Add CLERK_WEBHOOK_SECRET to your Vercel environment variables and redeploy",
      },
      { status: 500 },
    )
  }

  console.log("[v0] ✅ Webhook secret is configured")
  console.log("[v0] Webhook secret starts with:", webhookSecret.substring(0, 10) + "...")

  return NextResponse.json({
    success: true,
    message: "Webhook endpoint is ready",
    webhookUrl: "/api/webhooks/clerk",
    secretConfigured: true,
    secretPrefix: webhookSecret.substring(0, 10) + "...",
    instructions: [
      "1. Go to Clerk Dashboard → Webhooks",
      "2. Verify your webhook endpoint URL is correct",
      "3. Click 'Send Test Event' and select 'organizationMembership.created'",
      "4. Check your app logs for webhook processing messages",
      "5. Look for logs starting with '[v0] ========== CLERK WEBHOOK RECEIVED =========='",
    ],
  })
}
