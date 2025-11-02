"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useUser, useOrganizationList } from "@clerk/nextjs"
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
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })
  const pathname = usePathname()

  const [hasPremium, setHasPremium] = useState(false)
  const [checkComplete, setCheckComplete] = useState(false)
  const [isAutoActivating, setIsAutoActivating] = useState(false)

  useEffect(() => {
    console.log("[v0] ========== PREMIUM CHECK USEEFFECT START ==========")
    const orgsLoading = userMemberships?.isLoading ?? true
    console.log("[v0] isLoaded:", isLoaded, "orgsLoading:", orgsLoading)
    console.log("[v0] user exists:", !!user)
    console.log("[v0] user id:", user?.id)

    if (!isLoaded || orgsLoading) {
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

    // Check for premium flags in metadata
    const hasPremiumInPublic = publicMeta.premium === true
    const hasPremiumInUnsafe = (unsafeMeta as any).premium === true
    const hasActiveSubInPublic =
      publicMeta.subscriptionStatus === "active" || publicMeta.subscriptionStatus === "created"
    const hasActiveSubInUnsafe =
      (unsafeMeta as any).subscriptionStatus === "active" || (unsafeMeta as any).subscriptionStatus === "created"
    const hasFreeTrialInPublic = publicMeta.freeTrialActive === true
    const hasFreeTrialInUnsafe = (unsafeMeta as any).freeTrialActive === true

    // Check organization membership
    const orgCount = userMemberships?.data?.length || 0
    const hasOrganization = orgCount > 0

    console.log("[v0] Premium indicators:")
    console.log("  - premium in publicMetadata:", hasPremiumInPublic)
    console.log("  - premium in unsafeMetadata:", hasPremiumInUnsafe)
    console.log("  - subscriptionStatus active in publicMetadata:", hasActiveSubInPublic)
    console.log("  - subscriptionStatus active in unsafeMetadata:", hasActiveSubInUnsafe)
    console.log("  - freeTrialActive in publicMetadata:", hasFreeTrialInPublic)
    console.log("  - freeTrialActive in unsafeMetadata:", hasFreeTrialInUnsafe)
    console.log("  - organization membership count:", orgCount)
    console.log("  - has organization:", hasOrganization)

    if (hasOrganization && userMemberships?.data) {
      console.log(
        "  - organizations:",
        userMemberships.data.map((m: any) => ({
          name: m.organization.name,
          role: m.role,
        })),
      )
    }

    const hasPremiumMetadata =
      hasPremiumInPublic ||
      hasPremiumInUnsafe ||
      hasActiveSubInPublic ||
      hasActiveSubInUnsafe ||
      hasFreeTrialInPublic ||
      hasFreeTrialInUnsafe

    if (hasOrganization && !hasPremiumMetadata && !isAutoActivating) {
      console.log("[v0] User has organization membership, checking for auto-activation...")
      console.log("[v0] Attempting auto-activation for user with org membership...")
      setIsAutoActivating(true)

      fetch("/api/webhooks/clerk?client=true", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      })
        .then(async (response) => {
          const data = await response.json()
          console.log("[v0] Auto-activation response status:", response.status)
          console.log("[v0] Auto-activation response data:", JSON.stringify(data))

          if (response.ok) {
            console.log("[v0] Auto-activation successful, reloading user...")
            await user.reload()
            console.log("[v0] User reloaded, new metadata:", JSON.stringify(user.publicMetadata))
            setHasPremium(true)
            setCheckComplete(true)
            setIsAutoActivating(false)
          } else {
            console.error("[v0] Auto-activation failed with status:", response.status)
            console.error("[v0] Error details:", JSON.stringify(data))
            setIsAutoActivating(false)
            // Still grant access based on org membership
            setHasPremium(true)
            setCheckComplete(true)
          }
        })
        .catch((error) => {
          console.error("[v0] Auto-activation fetch error:", error.message)
          console.error("[v0] Error stack:", error.stack)
          setIsAutoActivating(false)
          // Still grant access based on org membership
          setHasPremium(true)
          setCheckComplete(true)
        })
      return
    }

    const shouldHavePremium =
      hasPremiumInPublic ||
      hasPremiumInUnsafe ||
      hasActiveSubInPublic ||
      hasActiveSubInUnsafe ||
      hasFreeTrialInPublic ||
      hasFreeTrialInUnsafe ||
      hasOrganization

    console.log("[v0] FINAL DECISION: shouldHavePremium =", shouldHavePremium)
    console.log("[v0] ========== PREMIUM CHECK USEEFFECT END ==========")

    setHasPremium(shouldHavePremium)
    setCheckComplete(true)
  }, [isLoaded, user, userMemberships, isAutoActivating])

  // Public routes that don't require premium
  const publicRoutes = ["/subscribe", "/sign-up", "/sign-in"]
  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route))

  console.log("[v0] Render decision:")
  console.log("  - hasPremium:", hasPremium)
  console.log("  - checkComplete:", checkComplete)
  console.log("  - isPublicRoute:", isPublicRoute)
  console.log("  - pathname:", pathname)
  console.log("  - isAutoActivating:", isAutoActivating)
  console.log("  - will show overlay:", checkComplete && !hasPremium && !isPublicRoute)

  if (isAutoActivating) {
    console.log("[v0] Auto-activating premium, showing loading")
    return <>{children}</>
  }

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
