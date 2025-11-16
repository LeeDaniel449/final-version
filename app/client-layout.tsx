"use client"

import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"

const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  ""

const hasValidClerkKey = CLERK_PUBLISHABLE_KEY && CLERK_PUBLISHABLE_KEY.length > 0

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [clerkReady, setClerkReady] = useState(false)

  useEffect(() => {
    const originalError = console.error
    console.error = (...args: any[]) => {
      const message = String(args[0])
      if (message.includes("ClerkJS:") || (message.includes("Clerk") && message.includes("Something went wrong"))) {
        return
      }
      originalError.apply(console, args)
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = String(event.reason?.message || event.reason || "")
      if (message.includes("ClerkJS:") || message.includes("clerk")) {
        event.preventDefault()
      }
    }

    window.addEventListener("unhandledrejection", handleRejection)

    const timeout = setTimeout(() => {
      setClerkReady(true)
      console.log("[v0] Clerk initialization timeout - continuing without auth")
    }, 2000)

    return () => {
      console.error = originalError
      window.removeEventListener("unhandledrejection", handleRejection)
      clearTimeout(timeout)
    }
  }, [])

  if (!hasValidClerkKey) {
    console.log("[v0] No valid Clerk key - rendering without authentication")
    return (
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
    )
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          rootBox: "clerk-root",
        },
      }}
      telemetry={false}
    >
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
