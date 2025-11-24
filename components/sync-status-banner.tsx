"use client"

import { AlertCircle, CheckCircle, Cloud } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useEffect, useState } from "react"

export function SyncStatusBanner() {
  const [authState, setAuthState] = useState<{
    isLoaded: boolean
    isSignedIn: boolean
    email: string | null
  }>({
    isLoaded: false,
    isSignedIn: false,
    email: null,
  })

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Try to access Clerk from window if available
        const clerk = (window as any).__clerk_frontend_api || (window as any).Clerk

        if (clerk && clerk.user) {
          setAuthState({
            isLoaded: true,
            isSignedIn: true,
            email: clerk.user.emailAddresses?.[0]?.emailAddress || null,
          })
        } else {
          setAuthState({
            isLoaded: true,
            isSignedIn: false,
            email: null,
          })
        }
      } catch (error) {
        // If Clerk isn't available, assume not signed in
        setAuthState({
          isLoaded: true,
          isSignedIn: false,
          email: null,
        })
      }
    }

    // Check immediately
    checkAuth()

    // Check periodically in case user signs in
    const interval = setInterval(checkAuth, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!authState.isLoaded) {
    return null
  }

  if (!authState.isSignedIn) {
    return (
      <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950/20">
        <AlertCircle className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-900 dark:text-orange-100">Data Not Syncing Across Devices</AlertTitle>
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          You are not signed in. Your data is only saved locally on this device.{" "}
          <Link href="/sign-in" className="font-semibold underline">
            Sign in
          </Link>{" "}
          to sync your progress across all your devices.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
        <Cloud className="h-4 w-4" />
        Syncing Across Devices
      </AlertTitle>
      <AlertDescription className="text-green-800 dark:text-green-200">
        {authState.email ? (
          <>
            Signed in as <strong>{authState.email}</strong>. Your data automatically syncs across all devices where
            you're signed in.
          </>
        ) : (
          "Your data automatically syncs across all devices where you're signed in."
        )}
      </AlertDescription>
    </Alert>
  )
}
