"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { userDataManager } from "@/lib/user-data"

const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_ZW5hYmxlZC1lYWdsZS0yNy5jbGVyay5hY2NvdW50cy5kZXYk"

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
        console.log("[v0] Clerk user ID stored:", user.id)
      }
    } else if (isLoaded && !user) {
      console.log("[v0] Clerk loaded - no user signed in")
      userDataManager.setClerkUserId(null)
      if (typeof window !== "undefined") {
        localStorage.removeItem("wealthwise_clerk_user_id")
      }
    } else if (!isLoaded) {
      console.log("[v0] Waiting for Clerk to load...")
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
        console.log("[v0] Loading data from database for user:", clerkUserId)
        const dbData = await userDataManager.loadFromDatabase(clerkUserId)

        if (dbData && Object.keys(dbData).length > 0) {
          console.log("[v0] Database data found - loaded successfully")
          window.dispatchEvent(new Event("storage"))
        } else {
          console.log("[v0] No database data found - checking for local data to migrate")

          const hasLocalData = userDataManager.hasStartedBudgeting()
          if (hasLocalData) {
            console.log("[v0] Migrating local data to database...")
            await userDataManager.syncToDatabase(clerkUserId)
            console.log("[v0] Local data migrated successfully")
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

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
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

export default ClientLayout
