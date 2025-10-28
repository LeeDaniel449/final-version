"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

    // Check if user has premium
    const publicMetadata = user.publicMetadata || {}
    const hasPremium =
      publicMetadata.premium === true ||
      publicMetadata.subscriptionStatus === "active" ||
      (Array.isArray(publicMetadata.subscriptions) &&
        publicMetadata.subscriptions.some((sub: any) => sub.status === "active")) ||
      publicMetadata.subscription?.status === "active"

    console.log("[v0] Premium check:", {
      userId: user.id,
      hasPremium,
      metadata: publicMetadata,
    })

    if (!hasPremium) {
      console.log("[v0] User does not have premium, redirecting to pricing")
      router.replace("/pricing")
      return
    }

    setIsChecking(false)
  }, [user, isLoaded, router])

  if (!isLoaded || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
