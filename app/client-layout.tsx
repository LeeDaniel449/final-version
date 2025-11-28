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
  const [lastSyncedUserId, setLastSyncedUserId] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

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
      console.log("[v0] 🎉 USER SIGNED IN - STARTING DATABASE SYNC")
      console.log("[v0] User ID:", user.id)
      console.log("[v0] User Email:", user.primaryEmailAddress?.emailAddress)
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
      console.log("[v0] 📥 Loading data from Supabase database...")
      const dbData = await userDataManager.loadFromDatabase(userId)

      if (dbData && Object.keys(dbData).length > 0) {
        console.log("[v0] ✅ Database data loaded!")
        console.log("[v0]   Categories:", dbData.budgetCategories?.length || 0)
        console.log("[v0]   Entries:", dbData.budgetEntries?.length || 0)
        console.log("[v0]   Goals:", dbData.goals?.length || 0)
        console.log("[v0]   Completed modules:", dbData.userProgress?.completedModules?.length || 0)

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("storage"))
          window.dispatchEvent(new CustomEvent("userDataUpdated"))

          setTimeout(() => {
            window.dispatchEvent(new Event("storage"))
            window.dispatchEvent(new CustomEvent("userDataUpdated"))
          }, 100)

          setTimeout(() => {
            window.dispatchEvent(new Event("storage"))
            window.dispatchEvent(new CustomEvent("userDataUpdated"))
          }, 500)
        }
      } else {
        console.log("[v0] 📭 No existing data in database")
      }

      console.log("[v0] 📤 Checking for local data to upload...")
      const hasLocalData = userDataManager.hasStartedBudgeting()
      if (hasLocalData) {
        console.log("[v0] Found local data - uploading to Supabase...")
        await userDataManager.migrateLocalDataToDatabase(userId)
        console.log("[v0] ✅ Local data uploaded to cloud")
      }

      console.log("[v0] ========================================")
      console.log("[v0] ✅ SYNC COMPLETE!")
      console.log("[v0] ========================================")

      setSyncStatus("success")
      setTimeout(() => setSyncStatus("idle"), 3000)
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
      window.addEventListener("userDataUpdated", handleDataChange)
      return () => {
        window.removeEventListener("userDataUpdated", handleDataChange)
      }
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
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
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
