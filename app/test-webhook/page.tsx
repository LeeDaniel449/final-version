"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function TestWebhookPage() {
  const { user, isLoaded } = useUser()
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testWebhook = async (eventType: "subscription.created" | "subscription.updated") => {
    if (!user) {
      setError("You must be signed in to test the webhook")
      return
    }

    setTesting(true)
    setError(null)
    setResult(null)

    try {
      // Simulate the webhook payload structure
      const webhookPayload = {
        type: eventType,
        data: {
          user_id: user.id,
          status: "active",
          id: `sub_test_${Date.now()}`,
        },
      }

      console.log("[v0] Simulating webhook with payload:", webhookPayload)

      // Call our webhook endpoint
      const response = await fetch("/api/webhooks/clerk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Note: In production, these headers would come from Clerk
          "svix-id": `msg_test_${Date.now()}`,
          "svix-timestamp": Math.floor(Date.now() / 1000).toString(),
          "svix-signature": "test_signature",
        },
        body: JSON.stringify(webhookPayload),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        // Reload the user to get updated metadata
        await user.reload()
      } else {
        setError(`Webhook returned error: ${data.error || "Unknown error"}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to test webhook")
      console.error("[v0] Webhook test error:", err)
    } finally {
      setTesting(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>Please sign in to test the webhook functionality.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const hasPremium = user.publicMetadata?.premium === true

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Webhook Test Page</CardTitle>
          <CardDescription>
            Test Clerk subscription webhook events to activate/deactivate premium access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Current Status</h3>
            <p className="text-sm">
              <strong>User ID:</strong> {user.id}
            </p>
            <p className="text-sm">
              <strong>Premium Status:</strong>{" "}
              {hasPremium ? (
                <span className="text-green-600 font-semibold">Active ✓</span>
              ) : (
                <span className="text-red-600 font-semibold">Not Active ✗</span>
              )}
            </p>
            <p className="text-sm mt-2">
              <strong>Metadata:</strong>
            </p>
            <pre className="text-xs bg-background p-2 rounded mt-1 overflow-auto">
              {JSON.stringify(user.publicMetadata, null, 2)}
            </pre>
          </div>

          {/* Test Buttons */}
          <div className="space-y-3">
            <h3 className="font-semibold">Simulate Webhook Events</h3>
            <div className="flex gap-3">
              <Button onClick={() => testWebhook("subscription.created")} disabled={testing} variant="default">
                {testing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Test subscription.created
              </Button>
              <Button onClick={() => testWebhook("subscription.updated")} disabled={testing} variant="default">
                {testing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Test subscription.updated
              </Button>
            </div>
          </div>

          {/* Result */}
          {result && (
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>Success!</strong> Webhook processed successfully.
                <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(result, null, 2)}</pre>
              </AlertDescription>
            </Alert>
          )}

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Important Note */}
          <Alert>
            <AlertDescription className="text-sm">
              <strong>Important:</strong> This page simulates webhook events for testing. In production, subscription
              events would come from Stripe (not Clerk). Clerk doesn't have built-in subscription events. See
              WEBHOOK_TROUBLESHOOTING.md for setup instructions.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
