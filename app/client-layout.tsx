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
  const [syncAttempted, setSyncAttempted] = useState(false)

  useEffect(() => {
    if (user?.id) {
      console.log("[v0] Clerk user authenticated:", user.id)
      userDataManager.setClerkUserId(user.id)

      if (typeof window !== "undefined") {
        localStorage.setItem("wealthwise_current_user", user.id)
        sessionStorage.setItem("wealthwise_session_user", user.id)
        console.log("[v0] Stored Clerk user ID in storage:", user.id)
      }
    } else if (isLoaded && !user) {
      console.log("[v0] Clerk loaded but no user signed in")
      userDataManager.setClerkUserId(null)
    }
  }, [user, isLoaded])

  useEffect(() => {
    if (typeof window === "undefined" || syncAttempted) return

    const initializeDatabaseSync = async () => {
      // Check if user is available (don't wait for isLoaded)
      const clerkUserId = user?.id

      if (!clerkUserId) {
        // Wait a bit longer for Clerk to potentially load
        if (!isLoaded) {
          console.log("[v0] Clerk still loading, waiting...")
          return
        }
        console.log("[v0] No Clerk user - database sync disabled")
        setSyncAttempted(true)
        return
      }

      console.log("[v0] Starting database sync for user:", clerkUserId)
      setSyncAttempted(true)

      try {
        // Load data from database
        console.log("[v0] Loading data from database...")
        const dbData = await userDataManager.loadFromDatabase(clerkUserId)

        if (dbData && Object.keys(dbData).length > 0) {
          console.log("[v0] Database data loaded, updating localStorage...")
          // Force a page refresh to load the data
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("storage"))
          }
        }

        // Check for local data to sync
        const hasLocalData = userDataManager.hasStartedBudgeting()
        if (hasLocalData) {
          console.log("[v0] Local data found, syncing to database...")
          await userDataManager.syncToDatabase(clerkUserId)
        }
      } catch (error) {
        console.error("[v0] Database sync error:", error)
      }
    }

    // Try immediately, then retry after delays
    initializeDatabaseSync()

    const timer1 = setTimeout(initializeDatabaseSync, 1000)
    const timer2 = setTimeout(initializeDatabaseSync, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [user, isLoaded, syncAttempted])

  return null
}

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    userDataManager.syncUserIdAcrossBrowserContexts()
  }, [])

  useEffect(() => {
    const originalError = console.error
    console.error = (...args: any[]) => {
      const message = String(args[0])
      if (message.includes("ClerkJS:") || message.includes("Clerk") || message.includes("clerk")) {
        return
      }
      originalError.apply(console, args)
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = String(event.reason?.message || event.reason || "")
      if (message.includes("ClerkJS:") || message.includes("Clerk") || message.includes("clerk")) {
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleRejection)

    return () => {
      console.error = originalError
      window.removeEventListener("unhandledrejection", handleRejection)
    }
  }, [])

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          rootBox: "clerk-root",
        },
      }}
      telemetry={false}
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <ClerkUserIdSync />
      <SidebarProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 sticky top-0 z-10">
              <SidebarTrigger className="-ml-1" />
            </header>
            <main className="flex-1 overflow-auto">
              <PremiumGate>{children}</PremiumGate>
            </main>
          </SidebarInset>
        </Suspense>
      </SidebarProvider>
    </ClerkProvider>
  )
}

export default ClientLayout
