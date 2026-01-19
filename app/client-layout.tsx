"use client"

import { useRef } from "react"

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

if (typeof window !== "undefined") {
  const originalFetch = window.fetch
  window.fetch = async (...args) => {
    try {
      return await originalFetch(...args)
    } catch (error: any) {
      // Suppress Clerk Origin header errors - they don't affect functionality
      if (error?.message?.includes("Origin header") || error?.message?.includes("origin_missing")) {
        console.log("[v0] Suppressed Clerk Origin header error (expected in iframe environment)")
        return new Response(JSON.stringify({ error: "Origin header missing" }), { status: 400 })
      }
      throw error
    }
  }
}

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

    const syncLegacyUser = async () => {
      const hasLegacyAuth = localStorage.getItem("wealthwise_authenticated") === "true"
      const legacyUser = localStorage.getItem("wealthwise_current_user")

      if (hasLegacyAuth && legacyUser) {
        const legacyUserId = `legacy_${legacyUser}`
        console.log("[v0] 🔄 Syncing legacy user from Supabase:", legacyUserId)

        try {
          setSyncStatus("syncing")
          const dbData = await userDataManager.loadFromDatabase(legacyUserId)

          if (dbData && Object.keys(dbData).length > 0) {
            console.log("[v0] ✅ Loaded legacy user data from Supabase")
            forceUIUpdate()
            setTimeout(forceUIUpdate, 100)
            setTimeout(forceUIUpdate, 300)
            setTimeout(forceUIUpdate, 500)
          } else {
            console.log("[v0] 📭 No data found in Supabase for legacy user")
          }

          setSyncStatus("success")
          setTimeout(() => setSyncStatus("idle"), 3000)
        } catch (error) {
          console.error("[v0] ❌ Failed to sync legacy user:", error)
          setSyncStatus("error")
          setTimeout(() => setSyncStatus("idle"), 5000)
        }
      }
    }

    syncLegacyUser()
  }, [forceUIUpdate])

  useEffect(() => {
    if (typeof window === "undefined") return

    const initSession = async () => {
      try {
        const response = await fetch("/api/session")
        const data = await response.json()

        if (data.userId && data.userId.startsWith("user_")) {
          localStorage.setItem("wealthwise_clerk_user_id", data.userId)
          localStorage.setItem("wealthwise_session_active", "true")
          userDataManager.setClerkUserId(data.userId)
          setLastSyncedUserId(data.userId)
          forceUIUpdate()
          await performDatabaseSync(data.userId)
          return
        }
      } catch (error) {
        console.error("[v0] Failed to check server session:", error)
      }

      const persistedUserId = localStorage.getItem("wealthwise_clerk_user_id")
      const sessionActive = localStorage.getItem("wealthwise_session_active")

      if (persistedUserId && persistedUserId.startsWith("user_") && sessionActive === "true") {
        userDataManager.setClerkUserId(persistedUserId)
        setLastSyncedUserId(persistedUserId)
        forceUIUpdate()
        await performDatabaseSync(persistedUserId)
      }
    }

    initSession()
  }, [forceUIUpdate])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleSignInSuccess = (event: CustomEvent) => {
      const { userId } = event.detail
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

  // Track if initial sync has been performed - use ref to avoid re-render issues
  const initialSyncDoneRef = useRef(false)

  // Define performDatabaseSync BEFORE useEffect that uses it
  const performDatabaseSync = useCallback(async (userId: string) => {
    console.log("[v0] performDatabaseSync CALLED with userId:", userId)
    try {
      console.log("[v0] === STARTING DATABASE SYNC ===")
      console.log("[v0] User ID:", userId)
      setSyncStatus("syncing")
      
      // STEP 0: ALWAYS check for legacy data first and migrate it
      console.log("[v0] Step 0: Checking for legacy data to migrate...")
      await userDataManager.migrateLocalDataToDatabase(userId)
      
      // STEP 1: Load data from Supabase
      console.log("[v0] Step 1: About to call loadFromDatabase...")
      const hasDbData = await userDataManager.loadFromDatabase(userId)
      console.log("[v0] Step 1 COMPLETE - Load from database result:", hasDbData)

      // Always update UI after loading
      forceUIUpdate()
      setTimeout(forceUIUpdate, 100)
      setTimeout(forceUIUpdate, 300)
      setTimeout(forceUIUpdate, 500)
      setTimeout(forceUIUpdate, 1000)

      // STEP 2: Sync current data to database (only if we have data)
      const categories = userDataManager.getBudgetCategories()
      const entries = userDataManager.getBudgetEntries()
      const goals = userDataManager.getGoals()
      
      if (categories.length > 0 || entries.length > 0 || goals.length > 0) {
        console.log("[v0] Step 2: Syncing data to Supabase...")
        console.log("[v0] - Categories:", categories.length)
        console.log("[v0] - Entries:", entries.length)
        console.log("[v0] - Goals:", goals.length)
        await userDataManager.syncToDatabase(userId)
      } else {
        console.log("[v0] Step 2: No local data to sync, skipping upload to prevent overwriting")
      }

      console.log("[v0] === DATABASE SYNC COMPLETE ===")
      setSyncStatus("success")
      setTimeout(() => setSyncStatus("idle"), 3000)
    } catch (error) {
      console.error("[v0] Sync error:", error)
      setSyncStatus("error")
      setTimeout(() => setSyncStatus("idle"), 5000)
    }
  }, [forceUIUpdate])

  useEffect(() => {
    if (typeof window === "undefined") return

    const performSync = async () => {
      if (!isLoaded) {
        console.log("[v0] Clerk not loaded yet, waiting...")
        return
      }

      const persistedUserId = localStorage.getItem("wealthwise_clerk_user_id")
      const hasLegacyAuth =
        localStorage.getItem("wealthwise_authenticated") === "true" &&
        localStorage.getItem("wealthwise_current_user")

      if (!user?.id) {
        if (persistedUserId && persistedUserId.startsWith("user_")) {
          if (persistedUserId !== lastSyncedUserId) {
            console.log("[v0] Using persisted user ID:", persistedUserId)
            setLastSyncedUserId(persistedUserId)
            userDataManager.setClerkUserId(persistedUserId)
            await performDatabaseSync(persistedUserId)
          }
          return
        }

        if (hasLegacyAuth) {
          return
        }

        if (lastSyncedUserId && !persistedUserId && !hasLegacyAuth) {
          userDataManager.setClerkUserId(null)
          setLastSyncedUserId(null)
          setSyncStatus("idle")
        }
        return
      }

      // User is signed in with Clerk
      console.log("[v0] Clerk user detected:", user.id)
      
      localStorage.setItem("wealthwise_clerk_user_id", user.id)
      localStorage.setItem("wealthwise_session_active", "true")
      userDataManager.setClerkUserId(user.id)

      // ALWAYS perform sync on first load for this session
      if (!initialSyncDoneRef.current) {
        console.log("[v0] First sync for this session - loading from Supabase...")
        initialSyncDoneRef.current = true
        setLastSyncedUserId(user.id)
        await performDatabaseSync(user.id)
        return
      }

      // Skip if same user already synced
      if (user.id === lastSyncedUserId) {
        return
      }

      // User changed
      console.log("[v0] User changed, syncing new user:", user.id)
      setLastSyncedUserId(user.id)
      await performDatabaseSync(user.id)
    }

    performSync()
  }, [user?.id, isLoaded, lastSyncedUserId, performDatabaseSync])

  useEffect(() => {
    if (!lastSyncedUserId) return

    const handleDataChange = () => {
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

function AppWithoutClerk({ children }: { children: React.ReactNode }) {
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

function ClerkLoadingWrapper({
  children,
  clerkPublishableKey,
}: {
  children: React.ReactNode
  clerkPublishableKey: string
}) {
  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      appearance={{
        elements: {
          rootBox: "clerk-root-box",
        },
      }}
    >
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
  )
}

export default function ClientLayout({
  children,
  clerkPublishableKey,
}: {
  children: React.ReactNode
  clerkPublishableKey: string
}) {
  if (!clerkPublishableKey) {
    return (
      <>
        <EnvDiagnostic />
        <AppWithoutClerk>{children}</AppWithoutClerk>
      </>
    )
  }

  return <ClerkLoadingWrapper clerkPublishableKey={clerkPublishableKey}>{children}</ClerkLoadingWrapper>
}
