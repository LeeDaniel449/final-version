import type React from "react"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.Wealthlink_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_bWVhc3VyZWQtcGVsaWNhbi0xNC5jbGVyay5hY2NvdW50cy5kZXYk"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
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
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
