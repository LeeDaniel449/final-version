"use client"

import type React from "react"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export function PremiumGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    // Check if user has premium access via Clerk Billing metadata
    const subscriptionStatus = user?.publicMetadata?.subscriptionStatus as string | undefined
    const isPremium = subscriptionStatus === "active"

    console.log("[v0] Premium guard check:", {
      userId: user?.id,
      subscriptionStatus,
      isPremium,
    })

    // If not premium, redirect to pricing page
    if (!isPremium) {
      router.push("/pricing")
    } else {
      setIsChecking(false)
    }
  }, [user, isLoaded, router])

  // Show loading state while checking
  if (!isLoaded || isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return <>{children}</>
}
