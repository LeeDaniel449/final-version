"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react"

export default function TestWebhookPage() {
  const { user, isLoaded } = useUser()
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testPremiumAction = async (action: "activate" | "deactivate") => {
    if (!user) {
      setError("You must be signed in to test premium activation")
      return
    }

    setTesting(true)
    setError(null)
    setResult(null)

    try {
      console.log(`[v0] Testing premium ${action} for user:`, user.id)

      const response = await fetch("/api/test-premium-activation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          userId: user.id,
        }),
      })

      const data = await response.json()
      console.log("[v0] Response:", data)

      if (response.ok) {
        setResult(data)
        console.log("[v0] Reloading user to fetch updated metadata...")
        await user.reload()
        console.log("[v0] User reloaded. New metadata:", user.publicMetadata)
      } else {
        setError(`Error: ${data.error || "Unknown error"}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to test premium activation")
      console.error("[v0] Test error:", err)
    } finally {
      setTesting(false)
    }
  }

  const refreshUser = async () => {
    if (!user) return
    setTesting(true)
    try {
      await user.reload()
      console.log("[v0] User data refreshed:", user.publicMetadata)
    } catch (err) {
      console.error("[v0] Error refreshing user:", err)
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
          <AlertDescription>Please sign in to test premium activation.</AlertDescription>
        </Alert>
      </div>
    )
  }

  const hasPremium = user.publicMetadata?.premium === true

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Premium Activation Test</CardTitle>
          <CardDescription>
            Test premium activation/deactivation to verify publicMetadata.premium updates correctly
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Current Status</h3>
              <Button size="sm" variant="outline" onClick={refreshUser} disabled={testing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${testing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
            <p className="text-sm">
              <strong>User ID:</strong> {user.id}
            </p>
            <p className="text-sm mt-1">
              <strong>Premium Status:</strong>{" "}
              {hasPremium ? (
                <span className="text-green-600 font-semibold flex items-center gap-1 inline-flex">
                  <CheckCircle2 className="h-4 w-4" />
                  Active
                </span>
              ) : (
                <span className="text-red-600 font-semibold flex items-center gap-1 inline-flex">
                  <XCircle className="h-4 w-4" />
                  Not Active
                </span>
              )}
            </p>
            <p className="text-sm mt-2">
              <strong>Public Metadata:</strong>
            </p>
            <pre className="text-xs bg-background p-2 rounded mt-1 overflow-auto max-h-40">
              {JSON.stringify(user.publicMetadata, null, 2)}
            </pre>
          </div>

          {/* Test Buttons */}
          <div className="space-y-3">
            <h3 className="font-semibold">Test Premium Actions</h3>
            <div className="flex gap-3">
              <Button
                onClick={() => testPremiumAction("activate")}
                disabled={testing || hasPremium}
                variant="default"
                className="bg-green-600 hover:bg-green-700"
              >
                {testing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                Activate Premium
              </Button>
              <Button
                onClick={() => testPremiumAction("deactivate")}
                disabled={testing || !hasPremium}
                variant="destructive"
              >
                {testing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                Deactivate Premium
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {hasPremium
                ? "Premium is currently active. You can deactivate it to test the overlay."
                : "Premium is currently inactive. Activate it to test overlay removal."}
            </p>
          </div>

          {/* Result */}
          {result && (
            <Alert className="border-green-500 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription>
                <strong>Success!</strong> {result.message}
                <pre className="text-xs mt-2 overflow-auto max-h-40">{JSON.stringify(result.metadata, null, 2)}</pre>
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

          {/* Instructions */}
          <Alert>
            <AlertDescription className="text-sm space-y-2">
              <p>
                <strong>Test Instructions:</strong>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Click "Activate Premium" to set publicMetadata.premium = true</li>
                <li>The overlay should disappear on all pages</li>
                <li>Click "Deactivate Premium" to test the overlay reappearing</li>
                <li>Use the Refresh button to manually fetch latest metadata from Clerk</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-2">
                This endpoint directly updates your Clerk publicMetadata, simulating what the webhook would do when
                receiving subscription events.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
