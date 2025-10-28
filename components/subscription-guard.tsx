"use client"

import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

interface SubscriptionGuardProps {
  children: ReactNode
}

export function SubscriptionGuard({ children }: SubscriptionGuardProps) {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        console.log("[v0] User not signed in, redirecting to sign-up")
        router.replace("/sign-up")
        return
      }

      const hasPremium =
        user.publicMetadata?.premium === true ||
        user.publicMetadata?.subscriptionStatus === "active" ||
        user.publicMetadata?.subscription?.status === "active"

      if (!hasPremium) {
        console.log("[v0] User does not have premium subscription, redirecting to subscribe")
        router.replace("/subscribe")
      }
    }
  }, [isLoaded, user, router])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const hasPremium =
    user.publicMetadata?.premium === true ||
    user.publicMetadata?.subscriptionStatus === "active" ||
    user.publicMetadata?.subscription?.status === "active"

  if (!hasPremium) {
    return null
  }

  return <>{children}</>
}
