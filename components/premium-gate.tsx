"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

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
  const [hasPremium, setHasPremium] = useState(true) // Default to true to avoid flash

  useEffect(() => {
    if (isLoaded && user) {
      const premium =
        user.publicMetadata?.premium === true ||
        user.publicMetadata?.subscriptionStatus === "active" ||
        user.publicMetadata?.freeTrialActive === true
      setHasPremium(true) // Always set to true to disable the gate
      console.log("[v0] Premium status:", premium)
      console.log("[v0] User metadata:", user.publicMetadata)
      console.log("[v0] Premium gate disabled - all users have access")
    }
  }, [isLoaded, user])

  const publicRoutes = ["/subscribe", "/sign-up", "/sign-in"]
  const isPublicRoute = publicRoutes.some((route) => pathname?.startsWith(route))

  return <>{children}</>
}
