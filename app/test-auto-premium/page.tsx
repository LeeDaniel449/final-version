"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function TestAutoPremiumPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [status, setStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    if (isLoaded && user && !hasRun) {
      setHasRun(true)
      runTest()
    }
  }, [isLoaded, user, hasRun])

  async function runTest() {
    setStatus("testing")
    setMessage("Simulating webhook event...")

    try {
      const response = await fetch("/api/test-webhook-simulation", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setStatus("success")
        setMessage("Premium activated! Overlay should disappear now.")

        // Wait 2 seconds then refresh user data and redirect
        setTimeout(() => {
          user?.reload()
          router.push("/")
        }, 2000)
      } else {
        setStatus("error")
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setStatus("error")
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-muted-foreground">You need to be signed in to test premium activation.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold mb-2">Automatic Webhook Test</h1>
          <p className="text-sm text-muted-foreground">
            This page automatically simulates a subscription.updated webhook event when you load it.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted p-4">
            <p className="text-sm font-medium mb-2">Current Status:</p>
            <p className="text-xs">User ID: {user.id}</p>
            <p className="text-xs">Premium: {user.publicMetadata?.premium ? "✅ Active" : "❌ Not Active"}</p>
            <p className="text-xs">Metadata: {JSON.stringify(user.publicMetadata, null, 2) || "{}"}</p>
          </div>

          {status === "testing" && (
            <div className="rounded-lg border border-blue-500 bg-blue-500/10 p-4 text-center">
              <div className="animate-spin inline-block h-6 w-6 border-2 border-current border-t-transparent rounded-full mb-2" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="rounded-lg border border-green-500 bg-green-500/10 p-4 text-center">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">{message}</p>
              <p className="text-xs text-muted-foreground mt-2">Redirecting to homepage...</p>
            </div>
          )}

          {status === "error" && (
            <div className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-center">
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{message}</p>
            </div>
          )}
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <p>
            <strong>What this test does:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Automatically simulates subscription.updated webhook</li>
            <li>Sets publicMetadata.premium = true</li>
            <li>Overlay should disappear immediately</li>
            <li>Redirects you to homepage after success</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
