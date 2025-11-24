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

  useEffect(() => {
    const performSync = async () => {
      if (!isLoaded) {
        console.log("[v0] Waiting for Clerk to load...")
        return
      }

      if (!user?.id) {
        console.log("[v0] No authenticated user detected")
        userDataManager.setClerkUserId(null)
        return
      }

      // Skip if already synced for this user
      if (user.id === lastSyncedUserId) {
        return
      }

      console.log("[v0] ========================================")
      console.log("[v0] USER AUTHENTICATED - STARTING SYNC")
      console.log("[v0] User ID:", user.id)
      console.log("[v0] Email:", user.primaryEmailAddress?.emailAddress)
      console.log("[v0] ========================================")

      setLastSyncedUserId(user.id)
      userDataManager.setClerkUserId(user.id)

      try {
        // Load data from database
        console.log("[v0] Loading data from database...")
        const dbData = await userDataManager.loadFromDatabase(user.id)

        if (dbData && Object.keys(dbData).length > 0) {
          console.log("[v0] ✓ Database data loaded successfully")
          console.log("[v0] Categories:", dbData.budgetCategories?.length || 0)
          console.log("[v0] Entries:", dbData.budgetEntries?.length || 0)
          console.log("[v0] Goals:", dbData.goals?.length || 0)
        } else {
          console.log("[v0] No existing data in database")
        }

        // Force UI refresh
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("storage"))
          window.dispatchEvent(new CustomEvent("clerk-user-loaded", { detail: { userId: user.id } }))
        }

        // Migrate any local data
        const hasLocalData = userDataManager.hasStartedBudgeting()
        if (hasLocalData) {
          console.log("[v0] Migrating local data to database...")
          await userDataManager.migrateLocalDataToDatabase(user.id)
          console.log("[v0] ✓ Migration complete")
        }

        console.log("[v0] ========================================")
        console.log("[v0] ✓ SYNC COMPLETE - DATA READY")
        console.log("[v0] ========================================")
      } catch (error) {
        console.error("[v0] ✗ Sync error:", error)
      }
    }

    performSync()
  }, [user?.id, isLoaded, lastSyncedUserId])

  useEffect(() => {
    if (!user?.id) return

    const handleDataChange = () => {
      console.log("[v0] Local data changed - syncing to database...")
      userDataManager.syncToDatabase(user.id)
    }

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleDataChange)
      return () => window.removeEventListener("storage", handleDataChange)
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
