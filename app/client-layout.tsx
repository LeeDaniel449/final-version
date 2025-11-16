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
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i)
  const webkit = !!ua.match(/WebKit/i)
  return iOS && webkit && !ua.match(/CriOS/i)
}

function ClerkUserIdSync() {
  const { user, isLoaded } = useUser()
  const [hasPromptedRefresh, setHasPromptedRefresh] = useState(false)
  const [hasLoadedFromDB, setHasLoadedFromDB] = useState(false)

  useEffect(() => {
    if (isLoaded && user?.id && !hasLoadedFromDB) {
      console.log("[v0] Clerk loaded successfully - setting user ID:", user.id)
      userDataManager.setClerkUserId(user.id)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('wealthwise_current_user', user.primaryEmailAddress?.emailAddress || user.id)
        sessionStorage.setItem('wealthwise_session_user', user.primaryEmailAddress?.emailAddress || user.id)
      }
      
      setHasLoadedFromDB(true)
    } else if (isLoaded && !user) {
      console.log("[v0] Clerk loaded but no user signed in")
      userDataManager.setClerkUserId(null)
    }
  }, [isLoaded, user, hasLoadedFromDB])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const checkFallbackAuth = async () => {
      const localUser = localStorage.getItem('wealthwise_current_user')
      const sessionUser = sessionStorage.getItem('wealthwise_session_user')
      const authenticated = localStorage.getItem("wealthwise_authenticated") === "true" ||
                           sessionStorage.getItem("wealthwise_session_in") === "true"
      
      const fallbackUserId = localUser || sessionUser
      
      if (fallbackUserId && authenticated && !user?.id && !hasLoadedFromDB) {
        console.log("[v0] Using fallback authentication - loading from database for:", fallbackUserId)
        userDataManager.setClerkUserId(fallbackUserId)
        setHasLoadedFromDB(true)
      }
    }
    
    const timeout = setTimeout(checkFallbackAuth, 6000)
    return () => clearTimeout(timeout)
  }, [user?.id, hasLoadedFromDB])

  useEffect(() => {
    if (isIOSSafari() && !hasPromptedRefresh) {
      const timeout = setTimeout(() => {
        if (!isLoaded) {
          console.log("[v0] Clerk not loaded on iOS Safari - refreshing page")
          setHasPromptedRefresh(true)
          window.location.reload()
        }
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [isLoaded, hasPromptedRefresh])

  useEffect(() => {
    const userId = user?.id || localStorage.getItem('wealthwise_current_user') || 
                   sessionStorage.getItem('wealthwise_session_user')
    
    if (!userId) return

    const syncInterval = setInterval(() => {
      console.log("[v0] Auto-syncing to database...")
      userDataManager.setClerkUserId(userId)
    }, 30000)

    return () => clearInterval(syncInterval)
  }, [user?.id])

  return null
}

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    console.log("[v0] Device is iOS Safari:", isIOSSafari())
    console.log("[v0] Clerk publishable key available:", !!CLERK_PUBLISHABLE_KEY)
    
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
