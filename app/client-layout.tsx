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
  }, [])

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

  useEffect(() => {
    if (typeof window === "undefined") return

    const performSync = async () => {
      if (!isLoaded) {
        return
      }

      const persistedUserId = typeof window !== "undefined" ? localStorage.getItem("wealthwise_clerk_user_id") : null
      const hasLegacyAuth =
        typeof window !== "undefined" &&
        localStorage.getItem("wealthwise_authenticated") === "true" &&
        localStorage.getItem("wealthwise_current_user")

      if (!user?.id) {
        if (persistedUserId && persistedUserId.startsWith("user_")) {
          if (persistedUserId !== lastSyncedUserId) {
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

      if (typeof window !== "undefined") {
        localStorage.setItem("wealthwise_clerk_user_id", user.id)
      }

      if (user.id === lastSyncedUserId) {
        return
      }

      setLastSyncedUserId(user.id)
      setSyncStatus("syncing")

      userDataManager.setClerkUserId(user.id)

      await performDatabaseSync(user.id)
    }

    performSync()
  }, [user?.id, isLoaded, lastSyncedUserId, forceUIUpdate])

  const performDatabaseSync = async (userId: string) => {
    try {
      const dbData = await userDataManager.loadFromDatabase(userId)

      if (dbData && Object.keys(dbData).length > 0) {
        forceUIUpdate()
        setTimeout(forceUIUpdate, 100)
        setTimeout(forceUIUpdate, 300)
        setTimeout(forceUIUpdate, 500)
        setTimeout(forceUIUpdate, 1000)
      }

      const hasLocalData = userDataManager.hasStartedBudgeting()
      if (hasLocalData) {
        await userDataManager.migrateLocalDataToDatabase(userId)
      }

      setSyncStatus("success")
      setTimeout(() => setSyncStatus("idle"), 3000)
    } catch (error) {
      console.error("[v0] Sync error:", error)
      setSyncStatus("error")
      setTimeout(() => setSyncStatus("idle"), 5000)
    }
  }

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
