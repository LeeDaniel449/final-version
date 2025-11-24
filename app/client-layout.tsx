"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { userDataManager } from "@/lib/user-data"
import { EnvDiagnostic } from "@/components/env-diagnostic"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

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
  const [lastSyncedUserId, setLastSyncedUserId] = useState<string | null>(null)
  const [hasAttemptedSync, setHasAttemptedSync] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastSignin = localStorage.getItem("wealthwise_last_signin")
      const storedUserId = localStorage.getItem("wealthwise_clerk_user_id")

      console.log("[v0] Session check on mount:", {
        lastSignin: lastSignin ? new Date(Number.parseInt(lastSignin)).toISOString() : "never",
        storedUserId: storedUserId || "none",
        clerkLoaded: isLoaded,
        clerkUser: user?.id || "none",
      })
    }
  }, [])

  useEffect(() => {
    console.log("[v0] Clerk state changed:", {
      isLoaded,
      hasUser: !!user,
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    })
  }, [user, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      if (user?.id) {
        console.log("[v0] ✓ Clerk user authenticated:", user.id)
        console.log("[v0] ✓ User email:", user.primaryEmailAddress?.emailAddress)
        userDataManager.setClerkUserId(user.id)

        if (typeof window !== "undefined") {
          localStorage.setItem("wealthwise_clerk_user_id", user.id)
          localStorage.setItem("wealthwise_authenticated", "true")
          localStorage.setItem("wealthwise_last_auth_check", Date.now().toString())
          window.dispatchEvent(new CustomEvent("clerk-auth-changed", { detail: { userId: user.id } }))
        }
      } else {
        console.log("[v0] ✗ Clerk loaded but no user signed in")

        if (typeof window !== "undefined") {
          const storedUserId = localStorage.getItem("wealthwise_clerk_user_id")
          const lastSignin = localStorage.getItem("wealthwise_last_signin")

          if (storedUserId && lastSignin) {
            const timeSinceSignin = Date.now() - Number.parseInt(lastSignin)
            const hoursAgo = timeSinceSignin / (1000 * 60 * 60)

            console.log("[v0] ⚠️ Session mismatch detected:", {
              storedUser: storedUserId,
              hoursAgo: hoursAgo.toFixed(1),
              suggestion: "User may need to sign in again",
            })
          }

          localStorage.removeItem("wealthwise_clerk_user_id")
          localStorage.removeItem("wealthwise_authenticated")
        }

        userDataManager.setClerkUserId(null)
      }
    }
  }, [user, isLoaded])

  useEffect(() => {
    const syncWithDatabase = async () => {
      if (!isLoaded) {
        console.log("[v0] Waiting for Clerk to load...")
        return
      }

      if (!user?.id) {
        console.log("[v0] No authenticated user - skipping sync")
        return
      }

      // Prevent duplicate syncs for same user
      if (user.id === lastSyncedUserId && hasAttemptedSync) {
        console.log("[v0] Already synced for this user")
        return
      }

      const clerkUserId = user.id

      if (!clerkUserId.startsWith("user_")) {
        console.error("[v0] ✗ Invalid Clerk user ID format:", clerkUserId)
        return
      }

      console.log("[v0] ========================================")
      console.log("[v0] STARTING DATABASE SYNC")
      console.log("[v0] User ID:", clerkUserId)
      console.log("[v0] Email:", user.primaryEmailAddress?.emailAddress)
      console.log("[v0] ========================================")

      setLastSyncedUserId(clerkUserId)
      setHasAttemptedSync(true)

      try {
        console.log("[v0] Step 1: Loading data from database...")
        const dbData = await userDataManager.loadFromDatabase(clerkUserId)

        if (dbData && Object.keys(dbData).length > 0) {
          console.log("[v0] ✓ Database data loaded:", {
            categories: dbData.budgetCategories?.length || 0,
            entries: dbData.budgetEntries?.length || 0,
            goals: dbData.goals?.length || 0,
          })
        } else {
          console.log("[v0] No existing data in database for this user")
        }

        console.log("[v0] Step 2: Triggering UI refresh...")
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("storage"))
          window.dispatchEvent(new CustomEvent("clerk-user-loaded", { detail: { userId: clerkUserId } }))
          setTimeout(() => {
            window.dispatchEvent(new Event("storage"))
          }, 100)
        }

        const hasLocalData = userDataManager.hasStartedBudgeting()
        if (hasLocalData) {
          console.log("[v0] Step 3: Found local data, migrating to database...")
          await userDataManager.migrateLocalDataToDatabase(clerkUserId)
          console.log("[v0] ✓ Local data migration complete")
        } else {
          console.log("[v0] Step 3: No local data to migrate")
        }

        console.log("[v0] Step 4: Final UI refresh...")
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("storage"))
        }

        console.log("[v0] ========================================")
        console.log("[v0] ✓ DATABASE SYNC COMPLETE")
        console.log("[v0] ========================================")
      } catch (error) {
        console.error("[v0] ✗ Database sync error:", error)
      }
    }

    syncWithDatabase()
  }, [user?.id, isLoaded, lastSyncedUserId, hasAttemptedSync])

  useEffect(() => {
    if (!user?.id) return

    const handleStorageChange = () => {
      console.log("[v0] Data changed - syncing to database...")
      userDataManager.syncToDatabase(user.id)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange)
      return () => window.removeEventListener("storage", handleStorageChange)
    }
  }, [user?.id])

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
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
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
