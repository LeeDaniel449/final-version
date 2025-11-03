"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

export default function SetPremiumPage() {
  const { user } = useUser()
  const [targetUserId, setTargetUserId] = useState("")
  const [premium, setPremium] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/set-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, premium }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message })
      } else {
        setResult({ success: false, message: data.error || "Failed to set premium status" })
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

  const setCurrentUserPremium = async () => {
    if (!user?.id) return
    setTargetUserId(user.id)
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/set-premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId: user.id, premium: true }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, message: data.message })
        // Reload the page after 2 seconds to refresh user data
        setTimeout(() => window.location.reload(), 2000)
      } else {
        setResult({ success: false, message: data.error || "Failed to set premium status" })
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

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Set Premium Status</CardTitle>
          <CardDescription>Grant or revoke premium access for users</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick action for current user */}
          {user && (
            <div className="p-4 bg-muted rounded-lg space-y-3">
              <div>
                <p className="text-sm font-medium">Your User ID:</p>
                <p className="text-xs text-muted-foreground font-mono">{user.id}</p>
              </div>
              <Button onClick={setCurrentUserPremium} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting Premium...
                  </>
                ) : (
                  "Grant Premium to My Account"
                )}
              </Button>
            </div>
          )}

          {/* Manual form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">Target User ID</Label>
              <Input
                id="userId"
                type="text"
                placeholder="user_xxxxxxxxxxxxx"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="premium">Premium Status</Label>
              <select
                id="premium"
                value={premium ? "true" : "false"}
                onChange={(e) => setPremium(e.target.value === "true")}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="true">Grant Premium (true)</option>
                <option value="false">Revoke Premium (false)</option>
              </select>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Set Premium Status"
              )}
            </Button>
          </form>

          {/* Result message */}
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
