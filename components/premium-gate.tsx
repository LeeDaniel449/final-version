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
  console.log("[v0] ========== PREMIUM GATE COMPONENT RENDERING ==========")

  const { user, isLoaded } = useUser()
  const pathname = usePathname()

  const [hasPremium, setHasPremium] = useState(false)
  const [checkComplete, setCheckComplete] = useState(false)
  const [isCheckingStripe, setIsCheckingStripe] = useState(false)

  useEffect(() => {
    console.log("[v0] ========== PREMIUM CHECK USEEFFECT START ==========")
    console.log("[v0] isLoaded:", isLoaded)
    console.log("[v0] user exists:", !!user)
    console.log("[v0] user id:", user?.id)

    if (!isLoaded) {
      console.log("[v0] Still loading, waiting for data")
      return
    }

    if (!user) {
      console.log("[v0] No user - granting access")
      setHasPremium(true)
      setCheckComplete(true)
      return
    }

    const publicMeta = user.publicMetadata || {}
    const unsafeMeta = user.unsafeMetadata || {}

    console.log("[v0] publicMetadata:", JSON.stringify(publicMeta))
    console.log("[v0] unsafeMetadata:", JSON.stringify(unsafeMeta))

    const hasPremiumInPublic = publicMeta.premium === true
    const hasPremiumInUnsafe = (unsafeMeta as any).premium === true
    const hasActiveSubInPublic =
      publicMeta.subscriptionStatus === "active" || publicMeta.subscriptionStatus === "created"
    const hasActiveSubInUnsafe =
      (unsafeMeta as any).subscriptionStatus === "active" || (unsafeMeta as any).subscriptionStatus === "created"
    const hasFreeTrialInPublic = publicMeta.freeTrialActive === true
    const hasFreeTrialInUnsafe = (unsafeMeta as any).freeTrialActive === true

    console.log("[v0] Premium indicators:")
    console.log("  - premium in publicMetadata:", hasPremiumInPublic)
    console.log("  - premium in unsafeMetadata:", hasPremiumInUnsafe)
    console.log("  - subscriptionStatus active in publicMetadata:", hasActiveSubInPublic)
    console.log("  - subscriptionStatus active in unsafeMetadata:", hasActiveSubInUnsafe)
    console.log("  - freeTrialActive in publicMetadata:", hasFreeTrialInPublic)
    console.log("  - freeTrialActive in unsafeMetadata:", hasFreeTrialInUnsafe)

    const hasMetadataPremium =
      hasPremiumInPublic ||
      hasPremiumInUnsafe ||
      hasActiveSubInPublic ||
      hasActiveSubInUnsafe ||
      hasFreeTrialInPublic ||
      hasFreeTrialInUnsafe

    if (hasMetadataPremium) {
      console.log("[v0] FINAL DECISION: shouldHavePremium = true (from metadata)")
      setHasPremium(true)
      setCheckComplete(true)
      console.log("[v0] ========== PREMIUM CHECK USEEFFECT END ==========")
      return
    }

    if (!isCheckingStripe) {
      console.log("[v0] No premium in metadata, checking Stripe subscriptions...")
      setIsCheckingStripe(true)

      fetch("/api/check-stripe-subscription")
        .then((res) => res.json())
        .then((data) => {
          console.log("[v0] Stripe subscription check result:", data)
          if (data.hasSubscription) {
            console.log("[v0] Active Stripe subscription found, granting premium access")
            setHasPremium(true)
            // Reload user to get updated metadata
            user.reload()
          } else {
            console.log("[v0] No active Stripe subscription found")
            setHasPremium(false)
          }
          setCheckComplete(true)
          setIsCheckingStripe(false)
        })
        .catch((error) => {
          console.error("[v0] Error checking Stripe subscription:", error)
          setHasPremium(false)
          setCheckComplete(true)
          setIsCheckingStripe(false)
        })
    }

    console.log("[v0] ========== PREMIUM CHECK USEEFFECT END ==========")
  }, [isLoaded, user, isCheckingStripe])

  // Public routes that don't require premium
  const publicRoutes = ["/subscribe", "/sign-up", "/sign-in"]
  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route))

  console.log("[v0] Render decision:")
  console.log("  - hasPremium:", hasPremium)
  console.log("  - checkComplete:", checkComplete)
  console.log("  - isPublicRoute:", isPublicRoute)
  console.log("  - pathname:", pathname)
  console.log("  - will show overlay:", checkComplete && !hasPremium && !isPublicRoute)

  if (!checkComplete) {
    console.log("[v0] Still checking premium status, showing loading")
    return <>{children}</>
  }

  if (hasPremium || isPublicRoute) {
    console.log("[v0] Showing children without overlay")
    return <>{children}</>
  }

  console.log("[v0] Showing overlay - user needs premium")
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
