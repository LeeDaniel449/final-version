"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ClerkProvider, useUser, useClerk } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { userDataManager } from "@/lib/user-data"
import { EnvDiagnostic } from "@/components/env-diagnostic"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

function SafeSidebar({ hasClerk }: { hasClerk: boolean }) {
  if (!hasClerk) {
    // When no Clerk, render AppSidebar without Clerk hooks being called
    return <AppSidebar disableClerk />
  }

  // When Clerk exists, AppSidebar will be inside ClerkProvider
  return <AppSidebar />
}

function ClerkUserIdSync() {
  const { user, isLoaded } = useUser()
  const clerk = useClerk()
  const [lastSyncedUserId, setLastSyncedUserId] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

  useEffect(() => {
    if (!isLoaded) return

    const checkServerSession = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const data = await response.json()

        if (data.authenticated && data.userId && data.userId !== lastSyncedUserId) {
          console.log("[v0] ⚡ SERVER SESSION FOUND USER:", data.userId)
          setLastSyncedUserId(data.userId)
          setSyncStatus("syncing")
          userDataManager.setClerkUserId(data.userId)
          await performDatabaseSync(data.userId)
        }
      } catch (error) {
        console.error("[v0] Server session check error:", error)
      }
    }

    // Check immediately
    checkServerSession()

    // Check every 5 seconds
    const interval = setInterval(checkServerSession, 5000)

    return () => clearInterval(interval)
  }, [isLoaded, lastSyncedUserId])

  useEffect(() => {
    if (!isLoaded || !clerk) return

    const checkForUser = async () => {
      try {
        // Force reload the session
        await clerk.session?.reload()

        // Check if user exists through multiple methods
        const clerkUser = clerk.user
        const sessionUser = clerk.session?.user

        const detectedUser = clerkUser || sessionUser

        if (detectedUser?.id && detectedUser.id !== lastSyncedUserId) {
          console.log("[v0] ⚡ CLIENT CHECK FOUND USER:", detectedUser.id)
          console.log("[v0] User email:", detectedUser.primaryEmailAddress?.emailAddress)
          setLastSyncedUserId(detectedUser.id)
          setSyncStatus("syncing")
          userDataManager.setClerkUserId(detectedUser.id)
          await performDatabaseSync(detectedUser.id)
        }
      } catch (error) {
        console.error("[v0] User check error:", error)
      }
    }

    // Check immediately
    checkForUser()

    // Check every 3 seconds
    const interval = setInterval(checkForUser, 3000)

    // Check when page becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkForUser()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isLoaded, clerk, lastSyncedUserId])

  useEffect(() => {
    const performSync = async () => {
      if (!isLoaded) {
        console.log("[v0] Clerk loading...")
        return
      }

      if (!user?.id) {
        console.log("[v0] Clerk loaded - no user signed in")
        if (lastSyncedUserId) {
          console.log("[v0] User signed out - clearing sync")
          userDataManager.setClerkUserId(null)
          setLastSyncedUserId(null)
          setSyncStatus("idle")
        }
        return
      }

      if (user.id === lastSyncedUserId) {
        return
      }

      console.log("[v0] ========================================")
      console.log("[v0] USER SIGNED IN - STARTING SYNC")
      console.log("[v0] User ID:", user.id)
      console.log("[v0] ========================================")

      setLastSyncedUserId(user.id)
      setSyncStatus("syncing")
      userDataManager.setClerkUserId(user.id)

      await performDatabaseSync(user.id)
    }

    performSync()
  }, [user?.id, isLoaded, lastSyncedUserId])

  const performDatabaseSync = async (userId: string) => {
    try {
      console.log("[v0] ========================================")
      console.log("[v0] 🔄 STARTING CROSS-DEVICE SYNC")
      console.log("[v0] User ID:", userId)
      console.log("[v0] ========================================")

      console.log("[v0] Step 1: Loading data from Supabase database...")
      const dbData = await userDataManager.loadFromDatabase(userId)

      if (dbData && Object.keys(dbData).length > 0) {
        console.log("[v0] ✅ Database data loaded successfully!")
        console.log("[v0]   📁 Categories:", dbData.budgetCategories?.length || 0)
        console.log("[v0]   💰 Entries:", dbData.budgetEntries?.length || 0)
        console.log("[v0]   🎯 Goals:", dbData.goals?.length || 0)
        console.log("[v0]   📚 Completed modules:", dbData.userProgress?.completedModules?.length || 0)
      } else {
        console.log("[v0] 📭 No data in database (first time on this device)")
      }

      console.log("[v0] Step 2: Refreshing all UI components...")
      if (typeof window !== "undefined") {
        // Fire multiple refresh events to ensure all components update
        window.dispatchEvent(new Event("storage"))
        window.dispatchEvent(new CustomEvent("clerk-user-loaded", { detail: { userId } }))
        window.dispatchEvent(new CustomEvent("userDataUpdated"))
        window.dispatchEvent(new CustomEvent("storageChanged"))

        // Delayed refreshes to catch any lazy-loaded components
        setTimeout(() => {
          window.dispatchEvent(new Event("storage"))
          window.dispatchEvent(new CustomEvent("userDataUpdated"))
        }, 100)

        setTimeout(() => {
          window.dispatchEvent(new Event("storage"))
          window.dispatchEvent(new CustomEvent("userDataUpdated"))
        }, 500)

        setTimeout(() => {
          window.dispatchEvent(new Event("storage"))
          window.dispatchEvent(new CustomEvent("userDataUpdated"))
        }, 1000)
      }

      console.log("[v0] Step 3: Checking for local data to migrate...")
      const hasLocalData = userDataManager.hasStartedBudgeting()
      if (hasLocalData) {
        console.log("[v0] 📤 Found local data - uploading to Supabase...")
        await userDataManager.migrateLocalDataToDatabase(userId)
        console.log("[v0] ✅ Local data uploaded to cloud")
      } else {
        console.log("[v0] No local data to migrate")
      }

      console.log("[v0] ========================================")
      console.log("[v0] ✅ CROSS-DEVICE SYNC COMPLETE!")
      console.log("[v0] Your data is now synced across all devices")
      console.log("[v0] ========================================")

      setSyncStatus("success")

      setTimeout(() => setSyncStatus("idle"), 5000)
    } catch (error) {
      console.error("[v0] ❌ Sync error:", error)
      setSyncStatus("error")
      setTimeout(() => setSyncStatus("idle"), 5000)
    }
  }

  useEffect(() => {
    if (!lastSyncedUserId) return

    const handleDataChange = () => {
      console.log("[v0] Data changed - auto-syncing to database...")
      userDataManager.syncToDatabase(lastSyncedUserId)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleDataChange)
      return () => window.removeEventListener("storage", handleDataChange)
    }
  }, [lastSyncedUserId])

  if (syncStatus !== "idle" && lastSyncedUserId) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Alert className="w-auto shadow-lg">
          {syncStatus === "syncing" && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertTitle>Syncing data...</AlertTitle>
              <AlertDescription>Loading your progress from the cloud</AlertDescription>
            </>
          )}
          {syncStatus === "success" && (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle>Synced!</AlertTitle>
              <AlertDescription>Your data is up to date across all devices</AlertDescription>
            </>
          )}
          {syncStatus === "error" && (
            <>
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle>Sync failed</AlertTitle>
              <AlertDescription>Please check your connection and try again</AlertDescription>
            </>
          )}
        </Alert>
      </div>
    )
  }

  return null
}

function ClerkErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message?.includes("Clerk") || event.message?.includes("failed_to_load_clerk_js_timeout")) {
        console.error("[v0] Clerk loading error caught:", event.message)
        setHasError(true)
        event.preventDefault()
      }
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    console.log("[v0] Clerk failed to load, rendering app without authentication")
    return (
      <SidebarProvider>
        <SafeSidebar hasClerk={false} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1 p-4 md:p-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Production Configuration Required</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>
                    Your app is missing required environment variables in production. To enable cross-device data sync:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to your Vercel project settings</li>
                    <li>Navigate to Environment Variables</li>
                    <li>Add the following variables:</li>
                  </ol>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs space-y-1 mt-2">
                    <div>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_clerk_key</div>
                    <div>CLERK_SECRET_KEY = your_clerk_secret</div>
                    <div>NEXT_PUBLIC_SUPABASE_URL = your_supabase_url</div>
                    <div>SUPABASE_SERVICE_ROLE_KEY = your_supabase_key</div>
                  </div>
                  <p className="text-sm mt-2">
                    Get your Clerk keys from{" "}
                    <a
                      href="https://dashboard.clerk.com/last-active?path=api-keys"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Clerk Dashboard
                    </a>
                  </p>
                </AlertDescription>
              </Alert>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return <>{children}</>
}

export default function ClientLayout({
  children,
  clerkPublishableKey,
}: {
  children: React.ReactNode
  clerkPublishableKey: string
}) {
  console.log(
    "[v0] Clerk key received from server:",
    clerkPublishableKey ? `Key found (${clerkPublishableKey.substring(0, 15)}...)` : "No key found",
  )

  if (!clerkPublishableKey) {
    return (
      <>
        <EnvDiagnostic />
        <SidebarProvider>
          <SafeSidebar hasClerk={false} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </header>
            <main className="flex-1 p-4 md:p-6">
              <div className="max-w-2xl mx-auto space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Production Configuration Required</AlertTitle>
                  <AlertDescription className="space-y-2">
                    <p>
                      Your app is missing required environment variables in production. To enable cross-device data
                      sync:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-sm">
                      <li>Go to your Vercel project settings</li>
                      <li>Navigate to Environment Variables</li>
                      <li>Add the following variables:</li>
                    </ol>
                    <div className="bg-muted p-3 rounded-md font-mono text-xs space-y-1 mt-2">
                      <div>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_clerk_key</div>
                      <div>CLERK_SECRET_KEY = your_clerk_secret</div>
                      <div>NEXT_PUBLIC_SUPABASE_URL = your_supabase_url</div>
                      <div>SUPABASE_SERVICE_ROLE_KEY = your_supabase_key</div>
                    </div>
                    <p className="text-sm mt-2">
                      Get your Clerk keys from{" "}
                      <a
                        href="https://dashboard.clerk.com/last-active?path=api-keys"
                        className="underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Clerk Dashboard
                      </a>
                    </p>
                  </AlertDescription>
                </Alert>
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </>
    )
  }

  return (
    <ClerkErrorBoundary>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <ClerkUserIdSync />
        <SidebarProvider>
          <SafeSidebar hasClerk={true} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
            </header>
            <main className="flex-1 p-4 md:p-6">
              <Suspense fallback={<div>Loading...</div>}>
                <PremiumGate>{children}</PremiumGate>
              </Suspense>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ClerkProvider>
    </ClerkErrorBoundary>
  )
}
