"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useUser, useOrganizationList } from "@clerk/nextjs"
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
  const { userMemberships, isLoaded: orgsLoaded } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })
  const pathname = usePathname()

  const [hasPremium, setHasPremium] = useState(true)
  const [checkComplete, setCheckComplete] = useState(false)

  useEffect(() => {
    console.log("[v0] ========== PREMIUM CHECK USEEFFECT START ==========")
    console.log("[v0] isLoaded:", isLoaded, "orgsLoaded:", orgsLoaded)
    console.log("[v0] user exists:", !!user)
    console.log("[v0] user id:", user?.id)

    if (!isLoaded || !orgsLoaded) {
      console.log("[v0] Still loading, granting access by default")
      setHasPremium(true)
      return
    }

    if (!user) {
      console.log("[v0] No user - granting access")
      setHasPremium(true)
      setCheckComplete(true)
      return
    }

    console.log("[v0] User is signed in - automatically granting premium access")
    setHasPremium(true)
    setCheckComplete(true)
    console.log("[v0] ========== PREMIUM CHECK USEEFFECT END ==========")
  }, [isLoaded, orgsLoaded, user, user?.id, userMemberships])

  // Public routes that don't require premium
  const publicRoutes = ["/subscribe", "/sign-up", "/sign-in"]
  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route))

  console.log("[v0] Render decision:")
  console.log("  - hasPremium:", hasPremium)
  console.log("  - checkComplete:", checkComplete)
  console.log("  - isPublicRoute:", isPublicRoute)
  console.log("  - pathname:", pathname)
  console.log("  - will show overlay:", checkComplete && !hasPremium && !isPublicRoute)

  console.log("[v0] Showing children without overlay")
  return <>{children}</>
}
