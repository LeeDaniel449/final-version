import type React from "react"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// For production deployment on wealthlinkapp.com
const CLERK_PUBLISHABLE_KEY = "pk_live_Y2xlcmsud2VhbHRobGlua2FwcC5jb20k"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="/pricing"
      signUpFallbackRedirectUrl="/pricing"
      appearance={{
        elements: {
          rootBox: "mx-auto",
          card: "shadow-none",
        },
      }}
    >
      <html lang="en" className={inter.variable}>
        <body className="font-sans">
          <SidebarProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 sticky top-0 z-10">
                  <SidebarTrigger className="-ml-1" />
                </header>
                <main className="flex-1 overflow-auto">{children}</main>
              </SidebarInset>
            </Suspense>
          </SidebarProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}

export const metadata = {
  generator: "v0.dev",
}
