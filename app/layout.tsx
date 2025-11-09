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
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Y2xlcmsuaW5zcGlyZWQuc2hhcmstNDIuY2xlcmsuYWNjb3VudHMuZGV2JA"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className={inter.variable}>
        <body className="font-sans">
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
        </body>
      </html>
    </ClerkProvider>
  )
}

export const metadata = {
  generator: "v0.dev",
}
