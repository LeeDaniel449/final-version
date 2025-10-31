"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export function PremiumGate({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const pathname = usePathname()

  const [hasPremium, setHasPremium] = useState(true)

  useEffect(() => {
    console.log("[v0] ========== PREMIUM GATE DEBUG START ==========")
    console.log("[v0] PremiumGate useEffect triggered")
    console.log("[v0] isLoaded:", isLoaded)
    console.log("[v0] user exists:", !!user)
    console.log("[v0] user?.id:", user?.id)

    if (isLoaded) {
      if (user) {
        console.log("[v0] Full user object keys:", Object.keys(user))
        console.log("[v0] user.publicMetadata:", JSON.stringify(user.publicMetadata, null, 2))
        console.log("[v0] user.unsafeMetadata:", JSON.stringify(user.unsafeMetadata, null, 2))

        // Check multiple possible locations for premium flag
        const premiumFromPublic = user.publicMetadata?.premium === true
        const premiumFromUnsafe = (user.unsafeMetadata as any)?.premium === true

        console.log("[v0] Premium from publicMetadata:", premiumFromPublic)
        console.log("[v0] Premium from unsafeMetadata:", premiumFromUnsafe)

        const hasPremiumAccess = premiumFromPublic || premiumFromUnsafe
        console.log("[v0] Final premium status:", hasPremiumAccess)

        setHasPremium(hasPremiumAccess)
      } else {
        console.log("[v0] No user signed in - allowing access")
        setHasPremium(true)
      }
    } else {
      console.log("[v0] Clerk not loaded yet")
    }
    console.log("[v0] ========== PREMIUM GATE DEBUG END ==========")
  }, [isLoaded, user, user?.id])

  // Public routes that don't require premium
  const publicRoutes = ["/subscribe", "/sign-up", "/sign-in"]
  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route))

  console.log(
    "[v0] PremiumGate render - hasPremium:",
    hasPremium,
    "isPublicRoute:",
    isPublicRoute,
    "pathname:",
    pathname,
  )

  if (!isLoaded || hasPremium || isPublicRoute) {
    return <>{children}</>
  }

  // Only show overlay for signed-in users without premium
  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="pointer-events-none blur-sm select-none">{children}</div>

      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="mx-4 max-w-lg rounded-lg border bg-card p-8 text-center shadow-lg">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <LockIcon />
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
