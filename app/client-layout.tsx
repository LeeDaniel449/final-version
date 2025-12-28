"use client"

import type React from "react"
import { Suspense, useEffect, useState, useCallback } from "react"
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
    return <AppSidebar disableClerk />
  }
  return <AppSidebar />
}

function ClerkUserIdSync() {
  const { user, isLoaded } = useUser()
  const [lastSyncedUserId, setLastSyncedUserId] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "success" | "error">("idle")

  const forceUIUpdate = useCallback(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("storage"))
      window.dispatchEvent(new CustomEvent("userDataUpdated"))
      window.dispatchEvent(new CustomEvent("forceRefresh"))
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const initSession = async () => {
      console.log("[v0] 🚀 Initializing session on mount...")

      try {
        console.log("[v0] 🍪 Checking server session cookie...")
        const response = await fetch("/api/session")
        const data = await response.json()

        console.log("[v0] 🍪 Server session response:", {
          hasUserId: !!data.userId,
          authenticated: data.authenticated,
          userId: data.userId ? `${data.userId.substring(0, 15)}...` : "none",
        })

        if (data.userId && data.userId.startsWith("user_")) {
          console.log("[v0] ✅ Found valid server session - restoring immediately")
          localStorage.setItem("wealthwise_clerk_user_id", data.userId)
          localStorage.setItem("wealthwise_session_active", "true")
          userDataManager.setClerkUserId(data.userId)
          setLastSyncedUserId(data.userId)
          forceUIUpdate()

          console.log("[v0] 📥 Loading data from Supabase...")
          await performDatabaseSync(data.userId)
          return // Session restored successfully
        }
      } catch (error) {
        console.error("[v0] ❌ Failed to check server session:", error)
      }

      const persistedUserId = localStorage.getItem("wealthwise_clerk_user_id")
      const sessionActive = localStorage.getItem("wealthwise_session_active")

      console.log("[v0] 📦 localStorage check:", {
        hasUserId: !!persistedUserId,
        sessionActive: sessionActive === "true",
        userId: persistedUserId ? `${persistedUserId.substring(0, 15)}...` : "none",
        isValid: persistedUserId?.startsWith("user_") || false,
      })

      if (persistedUserId && persistedUserId.startsWith("user_") && sessionActive === "true") {
        console.log("[v0] ✅ Found persisted session in localStorage")
        userDataManager.setClerkUserId(persistedUserId)
        setLastSyncedUserId(persistedUserId)
        forceUIUpdate()

        console.log("[v0] 📥 Loading data from Supabase...")
        await performDatabaseSync(persistedUserId)
      } else {
        console.log("[v0] ❌ No valid session found - user needs to sign in")
      }
    }

    initSession()
  }, []) // Only run once on mount

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleSignInSuccess = (event: CustomEvent) => {
      const { userId } = event.detail
      console.log("[v0] 🎉 Sign-in event received! User ID:", userId)
      if (userId && userId.startsWith("user_")) {
        localStorage.setItem("wealthwise_clerk_user_id", userId)
        userDataManager.setClerkUserId(userId)
        setLastSyncedUserId(userId)
        performDatabaseSync(userId)
      }
    }

    window.addEventListener("clerk-signin-success", handleSignInSuccess as EventListener)
    return () => {
      window.removeEventListener("clerk-signin-success", handleSignInSuccess as EventListener)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const performSync = async () => {
      if (!isLoaded) {
        console.log("[v0] ⏳ Clerk loading...")
        return
      }

      const persistedUserId = typeof window !== "undefined" ? localStorage.getItem("wealthwise_clerk_user_id") : null
      const hasLegacyAuth =
        typeof window !== "undefined" &&
        localStorage.getItem("wealthwise_authenticated") === "true" &&
        localStorage.getItem("wealthwise_current_user")

      if (!user?.id) {
        console.log("[v0] 🔓 Clerk loaded - no active session")

        if (persistedUserId && persistedUserId.startsWith("user_")) {
          console.log("[v0] 🔄 Using persisted session from localStorage:", `${persistedUserId.substring(0, 15)}...`)
          console.log("[v0] 📥 User data will load with persisted ID")

          if (persistedUserId !== lastSyncedUserId) {
            console.log("[v0] ⚠️ Persisted ID doesn't match last synced - re-syncing")
            setLastSyncedUserId(persistedUserId)
            userDataManager.setClerkUserId(persistedUserId)
            await performDatabaseSync(persistedUserId)
          } else {
            console.log("[v0] ✅ Already synced with persisted ID")
          }
          return
        }

        if (hasLegacyAuth) {
          console.log("[v0] 🔐 Legacy authentication active - preserving user data")
          return
        }

        if (lastSyncedUserId && !persistedUserId) {
          console.log("[v0] 🧹 User signed out - clearing sync")
          userDataManager.setClerkUserId(null)
          setLastSyncedUserId(null)
          setSyncStatus("idle")
        } else {
          console.log("[v0] User not signed in - showing zero data")
        }
        return
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("wealthwise_clerk_user_id", user.id)
        console.log("[v0] 💾 Persisted Clerk user ID to localStorage")
      }

      if (user.id === lastSyncedUserId) {
        console.log("[v0] ✅ Already synced for this user")
        return
      }

      console.log("[v0] ========================================")
      console.log("[v0] 🔐 USER SIGNED IN - STARTING DATABASE SYNC")
      console.log("[v0] 👤 User ID:", `${user.id.substring(0, 15)}...`)
      console.log("[v0] 📧 User Email:", user.primaryEmailAddress?.emailAddress)
      console.log("[v0] ========================================")

      setLastSyncedUserId(user.id)
      setSyncStatus("syncing")

      userDataManager.setClerkUserId(user.id)

      await performDatabaseSync(user.id)
    }

    performSync()
  }, [user?.id, isLoaded, lastSyncedUserId, forceUIUpdate])

  const performDatabaseSync = async (userId: string) => {
    try {
      console.log("[v0] 🔄 Loading data from Supabase database...")
      const dbData = await userDataManager.loadFromDatabase(userId)

      if (dbData && Object.keys(dbData).length > 0) {
        console.log("[v0] ✅ Database data loaded successfully!")
        console.log("[v0]   📊 Categories:", dbData.budgetCategories?.length || 0)
        console.log("[v0]   💰 Entries:", dbData.budgetEntries?.length || 0)
        console.log("[v0]   🎯 Goals:", dbData.goals?.length || 0)
        console.log("[v0]   📚 Completed modules:", dbData.userProgress?.completedModules?.length || 0)

        forceUIUpdate()
        setTimeout(forceUIUpdate, 100)
        setTimeout(forceUIUpdate, 300)
        setTimeout(forceUIUpdate, 500)
        setTimeout(forceUIUpdate, 1000)
      } else {
        console.log("[v0] 📭 No existing data in database")
      }

      console.log("[v0] 🔍 Checking for local data to upload...")
      const hasLocalData = userDataManager.hasStartedBudgeting()
      if (hasLocalData) {
        console.log("[v0] 📤 Found local data - uploading to Supabase...")
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
      console.log("[v0] 💾 Data changed - auto-syncing to database...")
      userDataManager.syncToDatabase(lastSyncedUserId).catch(console.error)
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
