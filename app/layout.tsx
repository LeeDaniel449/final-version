import type React from "react"
import { Suspense } from "react"
import { ClerkProvider } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { PremiumGate } from "@/components/premium-gate"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogIn, UserPlus } from "lucide-react"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const CLERK_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_YXJ0aXN0aWMtZGVlci0xNS5jbGVyay5hY2NvdW50cy5kZXYk"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/subscribe"
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
                <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4 sticky top-0 z-10 justify-between">
                  <SidebarTrigger className="-ml-1" />

                  <div className="flex items-center gap-2">
                    <SignedOut>
                      <Link href="/sign-in">
                        <Button variant="outline" size="sm">
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/sign-up">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Sign Up
                        </Button>
                      </Link>
                    </SignedOut>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </div>
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
