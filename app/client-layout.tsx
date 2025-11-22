"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ClerkProvider, useUser } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { userDataManager } from "@/lib/user-data"

const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""

if (!CLERK_PUBLISHABLE_KEY) {
  console.error("[v0] No Clerk publishable key found in environment variables")
}

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
  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <div className="max-w-md rounded-lg border border-red-300 bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-red-900">Clerk Configuration Required</h2>
          <p className="mb-4 text-sm text-red-700">
            The Clerk publishable key is missing. Please add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment
            variables.
          </p>
          <p className="text-xs text-red-600">
            Get your key at:{" "}
            <a
              href="https://dashboard.clerk.com/last-active?path=api-keys"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clerk Dashboard
            </a>
          </p>
        </div>
      </div>
    )
  }

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
