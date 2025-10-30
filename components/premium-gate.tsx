"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { Lock } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PremiumGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()
  const [hasPremium, setHasPremium] = useState(true) // Default to true to avoid flash

  useEffect(() => {
    if (isLoaded && user) {
      const premium = user.publicMetadata?.premium === true || user.publicMetadata?.subscriptionStatus === "active"
      setHasPremium(premium)
      console.log("[v0] Premium status:", premium)
    }
  }, [isLoaded, user])

  const publicRoutes = ["/subscribe", "/sign-up", "/sign-in"]
  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route))

  // Show content while loading, if user has premium, or on public routes
  if (!isLoaded || hasPremium || isPublicRoute) {
    return <>{children}</>
  }

  // Show overlay for non-premium users on protected pages
  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="pointer-events-none blur-sm select-none">{children}</div>

      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="mx-4 max-w-lg rounded-lg border bg-card p-8 text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Lock className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">Subscribe to Unlock</h2>
          <p className="mb-6 text-muted-foreground">
            Get premium access to unlock all features including AI-powered financial advice, portfolio optimization, and
            personalized learning paths.
          </p>
          <Link
            href="/subscribe"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  )
}
