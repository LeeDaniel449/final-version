"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { XCircle, AlertCircle } from "lucide-react"

interface EnvStatus {
  clerkPublishableKey: boolean
  clerkSecretKey: boolean
  supabaseUrl: boolean
  supabaseServiceKey: boolean
  postgresUrl: boolean
}

export function EnvDiagnostic() {
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null)

  useEffect(() => {
    async function checkEnv() {
      try {
        const response = await fetch("/api/env-check")
        const data = await response.json()
        setEnvStatus(data)
      } catch (error) {
        console.error("[v0] Failed to check environment variables:", error)
      }
    }
    checkEnv()
  }, [])

  if (!envStatus) return null

  const hasIssues = !envStatus.clerkPublishableKey || !envStatus.supabaseUrl || !envStatus.supabaseServiceKey

  if (!hasIssues) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Configuration Required</AlertTitle>
        <AlertDescription>
          <div className="mt-2 space-y-1 text-sm">
            {!envStatus.clerkPublishableKey && (
              <div className="flex items-center gap-2">
                <XCircle className="h-3 w-3" />
                <span>Missing: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</span>
              </div>
            )}
            {!envStatus.supabaseUrl && (
              <div className="flex items-center gap-2">
                <XCircle className="h-3 w-3" />
                <span>Missing: NEXT_PUBLIC_SUPABASE_URL</span>
              </div>
            )}
            {!envStatus.supabaseServiceKey && (
              <div className="flex items-center gap-2">
                <XCircle className="h-3 w-3" />
                <span>Missing: SUPABASE_SERVICE_ROLE_KEY</span>
              </div>
            )}
          </div>
          <p className="mt-2 text-xs">
            Add these to your Vercel project's environment variables to enable cross-device sync.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  )
}
