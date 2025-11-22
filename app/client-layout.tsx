"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { userDataManager } from "@/lib/user-data"

const CLERK_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""

console.log("[v0] Clerk key check:", CLERK_KEY ? `Key found (${CLERK_KEY.substring(0, 15)}...)` : "No key found")
console.log("[v0] Available env check:", {
  standard: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  wealthlink: !!process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
})

function isIOSSafari() {
  if (typeof window === "undefined") return false
  const ua = window.navigator.userAgent
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
  const webkit = !!ua.match(/WebKit/i)
  return iOS && webkit && !ua.match(/CriOS/i)
}

function ClerkUserIdSync() {
  const { user, isLoaded } = useUser()
  const [syncInitialized, setSyncInitialized] = useState(false)

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
    if (syncInitialized || !user?.id) return

    const syncWithDatabase = async () => {
      const clerkUserId = user.id

      if (!clerkUserId.startsWith("user_")) {
        console.error("[v0] Invalid Clerk user ID format:", clerkUserId)
        return
      }

      console.log("[v0] Initializing database sync for Clerk user:", clerkUserId)
      setSyncInitialized(true)

      try {
        const dbData = await userDataManager.loadFromDatabase(clerkUserId)

        if (dbData && Object.keys(dbData).length > 0) {
          console.log("[v0] Database data loaded successfully")
          window.dispatchEvent(new Event("storage"))
        } else {
          const hasLocalData = userDataManager.hasStartedBudgeting()
          if (hasLocalData) {
            console.log("[v0] Migrating local data to database...")
            await userDataManager.syncToDatabase(clerkUserId)
          }
        }
      } catch (error) {
        console.error("[v0] Database sync error:", error)
      }
    }

    syncWithDatabase()
  }, [user?.id, syncInitialized])

  return null
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  if (!CLERK_KEY) {
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
    <ClerkProvider publishableKey={CLERK_KEY}>
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
  )
}
