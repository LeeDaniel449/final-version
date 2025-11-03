"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
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
      const response = await fetch("/api/activate-my-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message })
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

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Activate Premium Access</CardTitle>
          <CardDescription>Grant premium access to your account</CardDescription>
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
