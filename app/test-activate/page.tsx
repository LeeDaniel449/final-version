"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function TestActivatePage() {
  const { user, isLoaded } = useUser()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const activatePremium = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/activate-premium-manual", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        // Force user refresh to get updated metadata
        await user?.reload()
      } else {
        setError(data.error || "Failed to activate premium")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>Please sign in to activate premium</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const hasPremium = user.publicMetadata?.premium === true

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Manual Premium Activation</CardTitle>
          <CardDescription>Test endpoint to manually activate premium status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Current Status</h3>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">User ID:</span>
                <code className="text-sm">{user.id}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Premium Status:</span>
                {hasPremium ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Active
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-600">
                    <XCircle className="h-4 w-4" />
                    Not Active
                  </span>
                )}
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium">Metadata:</span>
                <pre className="text-xs bg-background p-2 rounded flex-1 overflow-auto">
                  {JSON.stringify(user.publicMetadata, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <Button onClick={activatePremium} disabled={loading || hasPremium} className="w-full" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Activating Premium...
              </>
            ) : hasPremium ? (
              "Premium Already Active"
            ) : (
              "Activate Premium Now"
            )}
          </Button>

          {result && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Success!</h4>
              <pre className="text-xs text-green-800 dark:text-green-200 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-4 rounded-lg">
              <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Error</h4>
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">About This Test Page</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              This page manually activates premium by directly calling the Clerk API to update your publicMetadata. In
              production, this should happen automatically when the Clerk webhook receives subscription.created or
              subscription.updated events.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
