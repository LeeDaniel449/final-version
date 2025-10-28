"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

function checkPremiumStatus(user: any): boolean {
  console.log("[v0] Full user object:", {
    id: user.id,
    publicMetadata: user.publicMetadata,
    privateMetadata: user.privateMetadata,
    unsafeMetadata: user.unsafeMetadata,
    organizationMemberships: user.organizationMemberships,
  })

  const publicMetadata = user.publicMetadata

  if (!publicMetadata) {
    console.log("[v0] No publicMetadata found")
    return false
  }

  // Check for direct premium flag
  if (publicMetadata.premium === true) {
    console.log("[v0] Premium detected via premium flag")
    return true
  }

  // Check for Clerk Billing subscription status
  if (publicMetadata.subscriptionStatus === "active") {
    console.log("[v0] Premium detected via subscriptionStatus")
    return true
  }

  // Check for subscriptions array (Clerk Billing format)
  if (Array.isArray(publicMetadata.subscriptions) && publicMetadata.subscriptions.length > 0) {
    const hasActive = publicMetadata.subscriptions.some((sub: any) => sub.status === "active")
    if (hasActive) {
      console.log("[v0] Premium detected via subscriptions array")
      return true
    }
  }

  // Check for subscription object
  if (publicMetadata.subscription?.status === "active") {
    console.log("[v0] Premium detected via subscription object")
    return true
  }

  if (publicMetadata.stripeSubscriptionId) {
    console.log("[v0] Premium detected via stripeSubscriptionId")
    return true
  }

  if (publicMetadata.clerkSubscriptionId) {
    console.log("[v0] Premium detected via clerkSubscriptionId")
    return true
  }

  console.log("[v0] No premium indicators found in metadata")
  return false
}

export function PremiumGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    // If not signed in, redirect to sign-in
    if (!user) {
      console.log("[v0] User not signed in, redirecting to sign-in")
      router.replace("/sign-in")
      return
    }

    const hasPremium = checkPremiumStatus(user)

    console.log("[v0] Premium check result:", {
      userId: user.id,
      hasPremium,
    })

    if (!hasPremium) {
      console.log("[v0] User does not have premium, redirecting to pricing")
      router.replace("/pricing")
      return
    }

    // User has premium, allow access
    console.log("[v0] User has premium, granting access")
    setIsChecking(false)
  }, [user, isLoaded, router])

  // Show loading state while checking
  if (!isLoaded || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-purple/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
