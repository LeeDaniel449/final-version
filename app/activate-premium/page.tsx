"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ActivatePremiumPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const activatePremium = async () => {
    if (!user?.id) {
      setResult({ success: false, message: "User ID not available" })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: "Premium activated successfully!" })
        // Reload user data and redirect after 2 seconds
        setTimeout(async () => {
          await user?.reload()
          router.push("/")
        }, 2000)
      } else {
        setResult({ success: false, message: data.error || "Failed to activate premium" })
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Network error: " + (error instanceof Error ? error.message : String(error)),
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to activate premium</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const hasPremium = user.publicMetadata?.premium === true
  const webhookUrl = typeof window !== "undefined" ? `${window.location.origin}/api/webhooks/clerk` : ""

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 space-y-6">
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-blue-900">Clerk Webhook Configuration</CardTitle>
          <CardDescription className="text-blue-700">
            Configure your Clerk webhook to automatically activate premium when users subscribe
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium text-blue-900">Steps to configure:</p>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>
                Go to your{" "}
                <a
                  href="https://dashboard.clerk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline inline-flex items-center gap-1"
                >
                  Clerk Dashboard
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>Navigate to Webhooks section</li>
              <li>Click "Add Endpoint"</li>
              <li>
                Enter this URL: <code className="bg-blue-100 px-2 py-1 rounded text-xs font-mono">{webhookUrl}</code>
              </li>
              <li>
                Subscribe to the event: <code className="bg-blue-100 px-2 py-1 rounded">subscription.updated</code>
              </li>
              <li>Save the webhook and copy the signing secret</li>
              <li>
                Add the signing secret to your environment variables as{" "}
                <code className="bg-blue-100 px-2 py-1 rounded">CLERK_WEBHOOK_SECRET</code>
              </li>
            </ol>
          </div>
          <Alert className="bg-blue-100 border-blue-300">
            <AlertDescription className="text-blue-900">
              Once configured, premium will be automatically activated when subscription.updated events are received
              with status "active" or "trialing"
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Premium Activation</CardTitle>
          <CardDescription>Activate premium manually if the webhook is not yet configured</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div>
              <p className="text-sm font-medium">Your User ID:</p>
              <p className="text-xs text-muted-foreground font-mono">{user.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Current Premium Status:</p>
              <p className="text-xs text-muted-foreground">{hasPremium ? "✅ Active" : "❌ Not Active"}</p>
            </div>
          </div>

          {!hasPremium && (
            <Button onClick={activatePremium} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Activating Premium...
                </>
              ) : (
                "Activate Premium Now"
              )}
            </Button>
          )}

          {hasPremium && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Premium is already active on your account!</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
