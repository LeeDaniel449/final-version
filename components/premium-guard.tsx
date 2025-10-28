"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { syncSubscriptionStatus } from "@/app/actions/sync-subscription"

function checkPremiumStatus(user: any): boolean {
  const publicMetadata = user.publicMetadata

  if (!publicMetadata) {
    return false
  }

  // Check for direct premium flag
  if (publicMetadata.premium === true) {
    return true
  }

  // Check for Clerk Billing subscription status
  if (publicMetadata.subscriptionStatus === "active") {
    return true
  }

  // Check for subscriptions array (Clerk Billing format)
  if (Array.isArray(publicMetadata.subscriptions) && publicMetadata.subscriptions.length > 0) {
    const hasActive = publicMetadata.subscriptions.some((sub: any) => sub.status === "active")
    if (hasActive) {
      return true
    }
  }

  // Check for subscription object
  if (publicMetadata.subscription?.status === "active") {
    return true
  }

  return false
}

export function PremiumGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)
  const [hasSynced, setHasSynced] = useState(false)

  useEffect(() => {
    async function checkAccess() {
      if (!isLoaded) return

      // If not signed in, redirect to sign-in
      if (!user) {
        console.log("[v0] User not signed in, redirecting to sign-in")
        router.replace("/sign-in")
        return
      }

      let hasPremium = checkPremiumStatus(user)

      console.log("[v0] Initial premium check:", {
        userId: user.id,
        hasPremium,
        metadata: user.publicMetadata,
      })

      if (!hasPremium && !hasSynced) {
        console.log("[v0] No premium in metadata, syncing from Clerk Billing...")
        setHasSynced(true)

        const result = await syncSubscriptionStatus(user.id)
        console.log("[v0] Sync result:", result)

        if (result.success && result.hasPremium) {
          // Reload user data to get updated metadata
          await user.reload()
          hasPremium = checkPremiumStatus(user)
          console.log("[v0] After sync, premium status:", hasPremium)
        }
      }

      if (!hasPremium) {
        console.log("[v0] User does not have premium, redirecting to pricing")
        router.replace("/pricing")
        return
      }

      // User has premium, allow access
      console.log("[v0] User has premium, granting access")
      setIsChecking(false)
    }

    checkAccess()
  }, [user, isLoaded, router, hasSynced])

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
