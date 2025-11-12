"use client"

import type React from "react"
import { Suspense, useEffect } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"

const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_bWVhc3VyZWQtcGVsaWNhbi0xNC5jbGVyay5hY2NvdW50cy5kZXYk"

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const originalError = console.error
    console.error = (...args: any[]) => {
      const message = String(args[0])
      if (message.includes("ClerkJS:") || (message.includes("Clerk") && message.includes("Something went wrong"))) {
        return // Suppress Clerk initialization errors
      }
      originalError.apply(console, args)
    }

    // Suppress unhandled promise rejections from Clerk
    const handleRejection = (event: PromiseRejectionEvent) => {
      const message = String(event.reason?.message || event.reason || "")
      if (message.includes("ClerkJS:") || message.includes("clerk")) {
        event.preventDefault() // Suppress the error
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

// Default export for compatibility
export default ClientLayout
