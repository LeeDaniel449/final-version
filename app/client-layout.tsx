"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { userDataManager } from "@/lib/user-data"

function ClerkUserIdSync() {
  const { user, isLoaded } = useUser()
  const [lastSyncedUserId, setLastSyncedUserId] = useState<string | null>(null)

  useEffect(() => {
    if (user?.id) {
      console.log("[v0] Clerk user authenticated with ID:", user.id)
      userDataManager.setClerkUserId(user.id)

      if (typeof window !== "undefined") {
        localStorage.setItem("wealthwise_clerk_user_id", user.id)
      }
    } else if (isLoaded && !user) {
      console.log("[v0] Clerk loaded - no user signed in")
      userDataManager.setClerkUserId(null)
      if (typeof window !== "undefined") {
        localStorage.removeItem("wealthwise_clerk_user_id")
      }
    }
  }, [user, isLoaded])

  useEffect(() => {
    const syncWithDatabase = async () => {
      // Only sync if user changed or first time
      if (!user?.id || user.id === lastSyncedUserId) return

      const clerkUserId = user.id

      if (!clerkUserId.startsWith("user_")) {
        console.error("[v0] Invalid Clerk user ID format:", clerkUserId)
        return
      }

      console.log("[v0] Initializing database sync for Clerk user:", clerkUserId)
      setLastSyncedUserId(clerkUserId)

      try {
        // Load data from database
        await userDataManager.loadFromDatabase(clerkUserId)
        console.log("[v0] Database data loaded, refreshing UI")

        // Force all components to reload with new data
        window.dispatchEvent(new Event("storage"))
        window.dispatchEvent(new CustomEvent("clerk-user-loaded", { detail: { userId: clerkUserId } }))

        // Check if we need to migrate local data
        const hasLocalData = userDataManager.hasStartedBudgeting()
        if (hasLocalData) {
          console.log("[v0] Migrating local data to database...")
          await userDataManager.migrateLocalDataToDatabase(clerkUserId)
        }
      } catch (error) {
        console.error("[v0] Database sync error:", error)
      }
    }

    if (isLoaded && user?.id) {
      syncWithDatabase()
    }
  }, [user?.id, isLoaded, lastSyncedUserId])

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
        <AppSidebar />
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
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold">Clerk Configuration Required</h2>
          <p className="text-muted-foreground">
            The Clerk publishable key is missing. Please add{" "}
            <code className="bg-muted px-2 py-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> to your environment
            variables.
          </p>
          <p className="text-sm text-muted-foreground">
            Get your key from the{" "}
            <a
              href="https://dashboard.clerk.com/last-active?path=api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              Clerk Dashboard
            </a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <ClerkErrorBoundary>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <ClerkUserIdSync />
        <SidebarProvider>
          <AppSidebar />
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
